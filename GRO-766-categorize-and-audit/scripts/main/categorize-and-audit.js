#!/usr/bin/env node
/**
 * categorize-and-audit.js
 *
 * Idempotent, re-runnable pipeline step that:
 *   1. Fills in `category_slug` for products that reconcile.js left null by
 *      inferring from brand + name keyword rules.
 *   2. Audits every product against exclusion rules (alcohol, tobacco, gift
 *      cards, pet food, hot prepared) and tags them with an audit_action.
 *   3. Writes a human-readable report to output/categorization-audit.md.
 *
 * Inputs:
 *   - output/reconciled-catalog.json
 *   - categorization-rules.yaml
 *
 * Outputs (mutated in place for the catalog):
 *   - output/reconciled-catalog.json — every product now has:
 *       category_slug:    string | null
 *       category_source:  "reconcile" | "inferred" | "manual"
 *       audit_action:     "keep" | "exclude"
 *       audit_reason:     string | null
 *   - output/categorization-audit.md
 *
 * Idempotency: running the script twice produces identical output. Running
 * with --dry-run prints the summary without writing either file.
 *
 * Usage:
 *   node scripts/main/categorize-and-audit.js
 *   node scripts/main/categorize-and-audit.js --dry-run
 */

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');
const yaml   = require('js-yaml');

const ROOT       = path.join(__dirname, '..', '..');
const CATALOG    = path.join(ROOT, 'output', 'reconciled-catalog.json');
const RULES_YAML = path.join(ROOT, 'categorization-rules.yaml');
const REPORT_MD  = path.join(ROOT, 'output', 'categorization-audit.md');

// ── Keyword matching ──────────────────────────────────────────────────────────
//
// We match keywords as whole-word, case-insensitive phrases inside `name_en`.
// This is slightly stricter than the plain-substring interpretation in order
// to avoid obvious false positives (e.g. "Egg" incorrectly matching
// "Eggplant", or "Apple" matching "Pineapple"). Hyphens, spaces, and other
// non-alphanumeric characters inside a keyword are preserved literally.

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildKeywordRegex(keyword) {
  // Match the keyword as a whole phrase, case-insensitively, tolerating a
  // trailing `s` or `es` on the last token so that "Potato" catches
  // "Potatoes", "Peach" catches "Peaches", and "Apple" catches "Apples". A
  // leading `\b` is still required so "Apple" does NOT match "Pineapple".
  //
  // Multi-word keywords ("Green Bean") also tolerate the plural suffix on
  // the final word.
  const escaped = escapeRegex(keyword);
  return new RegExp(`\\b${escaped}(?:es|s)?\\b`, 'i');
}

// Compile the rules once up front so hot-loop matching stays cheap.
function compileRules(rules) {
  const categoryRules = [];
  for (const [slug, cfg] of Object.entries(rules.category_rules || {})) {
    const keywords = (cfg.keywords || []).map(k => ({
      keyword: k,
      re:      buildKeywordRegex(k),
    }));
    const brands = (cfg.brands || []).map(b => b.toLowerCase());
    categoryRules.push({ slug, keywords, brands });
  }

  const auditRules = [];
  for (const entry of rules.audit?.exclude_patterns || []) {
    const keywords = (entry.keywords || []).map(k => ({
      keyword: k,
      re:      buildKeywordRegex(k),
    }));
    const overrides = (entry.overrides || []).map(k => ({
      keyword: k,
      re:      buildKeywordRegex(k),
    }));
    auditRules.push({ label: entry.label, keywords, overrides });
  }

  return { categoryRules, auditRules };
}

function inferCategory(product, categoryRules) {
  const name  = product.name_en || '';
  const brand = (product.brand || '').toLowerCase();

  // Brand match takes priority — a known brand wins outright.
  for (const rule of categoryRules) {
    if (brand && rule.brands.includes(brand)) {
      return { slug: rule.slug, matchedBy: `brand:${brand}` };
    }
  }

  // Fall back to keyword match. First hit wins; order matters in the YAML.
  for (const rule of categoryRules) {
    for (const kw of rule.keywords) {
      if (kw.re.test(name)) {
        return { slug: rule.slug, matchedBy: `keyword:${kw.keyword}` };
      }
    }
  }
  return null;
}

function auditProduct(product, auditRules) {
  const name = product.name_en || '';
  for (const rule of auditRules) {
    // Short-circuit if the product name hits a per-rule override phrase (e.g.
    // "Non-Alcoholic Beer", "Vodka Sauce") — these keep alcohol keywords in
    // their name but aren't actually alcohol products.
    let overridden = false;
    for (const ov of rule.overrides || []) {
      if (ov.re.test(name)) { overridden = true; break; }
    }
    if (overridden) continue;

    for (const kw of rule.keywords) {
      if (kw.re.test(name)) {
        return { label: rule.label, matchedBy: kw.keyword };
      }
    }
  }
  return null;
}

// ── Catalog processing ────────────────────────────────────────────────────────

function processCatalog(catalog, compiledRules) {
  const { categoryRules, auditRules } = compiledRules;

  const stats = {
    total:                 catalog.length,
    alreadySlugged:        0,
    inferredSlug:          0,
    stillUnknown:          0,
    inferredBySlug:        {},   // slug → count
    inferredSamples:       {},   // slug → [names]
    unknownSamples:        [],
    auditByLabel:          {},   // label → count
    auditSamples:          {},   // label → [names]
    keepTotal:             0,
    excludeTotal:          0,
  };

  const SAMPLE_LIMIT = 20;

  for (const p of catalog) {
    // ── Categorization ──────────────────────────────────────────────────────
    //
    // Idempotency contract:
    //   - A product with `category_slug` set AND `category_source` missing
    //     (or "reconcile") was produced upstream by reconcile.js — we leave
    //     the slug alone and stamp it as "reconcile".
    //   - A product whose prior `category_source` is "inferred" or "manual"
    //     is re-evaluated against the current rules so that rule edits flow
    //     through on re-run. This keeps the output byte-stable across runs
    //     when rules haven't changed.
    const priorSource      = p.category_source;
    const hadReconcileSlug = p.category_slug && (!priorSource || priorSource === 'reconcile');

    if (hadReconcileSlug) {
      p.category_source = 'reconcile';
      stats.alreadySlugged++;
    } else {
      // Drop any slug we might have inferred on a previous run before
      // re-running inference — otherwise stale slugs from removed rules would
      // stick around forever.
      if (priorSource === 'inferred') p.category_slug = null;

      const hit = inferCategory(p, categoryRules);
      if (hit) {
        p.category_slug   = hit.slug;
        p.category_source = 'inferred';
        stats.inferredSlug++;
        stats.inferredBySlug[hit.slug]  = (stats.inferredBySlug[hit.slug] || 0) + 1;
        const bucket = stats.inferredSamples[hit.slug] ||= [];
        if (bucket.length < SAMPLE_LIMIT) bucket.push(p.name_en);
      } else {
        // Leave category_slug as null; this product needs a human decision.
        p.category_slug   = null;
        p.category_source = 'manual';
        stats.stillUnknown++;
        if (stats.unknownSamples.length < SAMPLE_LIMIT) {
          stats.unknownSamples.push({
            name:  p.name_en,
            brand: p.brand,
            dept:  p.instacart_department,
          });
        }
      }
    }

    // ── Audit ───────────────────────────────────────────────────────────────
    const hit = auditProduct(p, auditRules);
    if (hit) {
      p.audit_action = 'exclude';
      p.audit_reason = hit.label;
      stats.excludeTotal++;
      stats.auditByLabel[hit.label] = (stats.auditByLabel[hit.label] || 0) + 1;
      const bucket = stats.auditSamples[hit.label] ||= [];
      if (bucket.length < SAMPLE_LIMIT) bucket.push(p.name_en);
    } else {
      p.audit_action = 'keep';
      p.audit_reason = null;
      stats.keepTotal++;
    }
  }

  return stats;
}

// ── Report ────────────────────────────────────────────────────────────────────

function renderReport(stats, meta) {
  const lines = [];
  lines.push('# Catalog Categorization + Audit Report');
  lines.push('');
  lines.push(`Generated: ${meta.generatedAt}`);
  lines.push(`Input: ${stats.total.toLocaleString()} records`);
  lines.push(`Rules: ${meta.rulesPath}`);
  lines.push('');

  lines.push('## Categorization');
  lines.push(`- Already had slug (reconcile source): ${stats.alreadySlugged.toLocaleString()}`);
  lines.push(`- Slug inferred from rules: ${stats.inferredSlug.toLocaleString()}`);
  lines.push(`- Still null — needs manual review: ${stats.stillUnknown.toLocaleString()}`);
  lines.push('');

  lines.push('### Inferred by slug');
  const inferredSlugs = Object.keys(stats.inferredBySlug).sort(
    (a, b) => stats.inferredBySlug[b] - stats.inferredBySlug[a]
  );
  if (inferredSlugs.length === 0) {
    lines.push('_(none — everything was already categorized upstream)_');
  } else {
    for (const slug of inferredSlugs) {
      const count   = stats.inferredBySlug[slug];
      const samples = (stats.inferredSamples[slug] || []).slice(0, 20).join(', ');
      lines.push(`- **${slug}**: ${count} items — e.g. ${samples}`);
    }
  }
  lines.push('');

  lines.push('### Still unknown (manual review needed)');
  if (stats.unknownSamples.length === 0) {
    lines.push('_(none)_');
  } else {
    for (const u of stats.unknownSamples) {
      lines.push(`- ${u.name} (brand: ${u.brand || '—'}, dept: ${u.dept || '—'})`);
    }
    if (stats.stillUnknown > stats.unknownSamples.length) {
      lines.push(`- _...and ${stats.stillUnknown - stats.unknownSamples.length} more_`);
    }
  }
  lines.push('');

  lines.push('## Audit exclusions');
  const auditLabels = Object.keys(stats.auditByLabel).sort(
    (a, b) => stats.auditByLabel[b] - stats.auditByLabel[a]
  );
  if (auditLabels.length === 0) {
    lines.push('_(no audit exclusions triggered)_');
  } else {
    for (const label of auditLabels) {
      const count   = stats.auditByLabel[label];
      const samples = (stats.auditSamples[label] || []).slice(0, 20).join(', ');
      lines.push(`- **${label}**: ${count} — ${samples}`);
    }
  }
  lines.push('');

  lines.push('## Totals after this pass');
  const categorizedKeep = stats.keepTotal - stats.stillUnknown;
  lines.push(`- Keep + categorized: ${categorizedKeep.toLocaleString()}`);
  lines.push(`- Drop (audit excluded): ${stats.excludeTotal.toLocaleString()}`);
  lines.push(`- Unknown category (still kept, flagged): ${stats.stillUnknown.toLocaleString()}`);
  lines.push('');

  return lines.join('\n');
}

// ── Public entry point ────────────────────────────────────────────────────────

function run({ dryRun = false, catalogPath = CATALOG, rulesPath = RULES_YAML, reportPath = REPORT_MD } = {}) {
  const catalog       = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const rules         = yaml.load(fs.readFileSync(rulesPath, 'utf8'));
  const compiledRules = compileRules(rules);

  const stats = processCatalog(catalog, compiledRules);
  const report = renderReport(stats, {
    generatedAt: new Date().toISOString(),
    rulesPath,
  });

  if (!dryRun) {
    fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
    fs.writeFileSync(reportPath, report);
  }

  return { catalog, stats, report };
}

// ── CLI ───────────────────────────────────────────────────────────────────────

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  const { stats, report } = run({ dryRun });

  console.log('=== categorize-and-audit ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN (no files written)' : 'WRITE'}`);
  console.log(`Total records:    ${stats.total}`);
  console.log(`Already slugged:  ${stats.alreadySlugged}`);
  console.log(`Inferred slug:    ${stats.inferredSlug}`);
  console.log(`Still null:       ${stats.stillUnknown}`);
  console.log(`Audit keep:       ${stats.keepTotal}`);
  console.log(`Audit exclude:    ${stats.excludeTotal}`);
  if (!dryRun) {
    console.log(`Catalog written:  ${CATALOG}`);
    console.log(`Report written:   ${REPORT_MD}`);
  }
  console.log('\n--- Report preview ---\n');
  console.log(report);
}

module.exports = {
  run,
  compileRules,
  inferCategory,
  auditProduct,
  processCatalog,
  renderReport,
  buildKeywordRegex,
};
