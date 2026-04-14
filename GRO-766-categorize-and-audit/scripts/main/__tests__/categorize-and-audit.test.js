/**
 * Tests for scripts/main/categorize-and-audit.js
 *
 * Uses Node's built-in test runner (node:test) so no extra dependency is
 * needed. Run with:
 *
 *   node --test scripts/main/__tests__/categorize-and-audit.test.js
 */

const test    = require('node:test');
const assert  = require('node:assert/strict');
const fs      = require('node:fs');
const path    = require('node:path');
const os      = require('node:os');
const crypto  = require('node:crypto');

const {
  run,
  compileRules,
  inferCategory,
  auditProduct,
  processCatalog,
} = require('../categorize-and-audit.js');

// ── Shared fixtures ──────────────────────────────────────────────────────────

function loadRealRules() {
  const yaml = require('js-yaml');
  const p = path.join(__dirname, '..', '..', '..', 'categorization-rules.yaml');
  return compileRules(yaml.load(fs.readFileSync(p, 'utf8')));
}

function withTempCatalog(products, fn) {
  const tmp       = fs.mkdtempSync(path.join(os.tmpdir(), 'cat-audit-'));
  const catalog   = path.join(tmp, 'reconciled-catalog.json');
  const report    = path.join(tmp, 'categorization-audit.md');
  const rulesPath = path.join(__dirname, '..', '..', '..', 'categorization-rules.yaml');
  fs.writeFileSync(catalog, JSON.stringify(products, null, 2));
  try {
    return fn({ catalogPath: catalog, reportPath: report, rulesPath, tmp });
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function sha(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

// ── Unit: already-slugged is left untouched ───────────────────────────────────

test('already-slugged product is untouched, only category_source is set', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:         'English Seedless Cucumber',
    brand:           null,
    category_slug:   'produce',
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].category_slug, 'produce');
  assert.equal(catalog[0].category_source, 'reconcile');
  assert.equal(catalog[0].audit_action, 'keep');
  assert.equal(catalog[0].audit_reason, null);
});

// ── Unit: produce inference ───────────────────────────────────────────────────

test('"Anjou Pear" → produce via keyword rule', () => {
  const rules = loadRealRules();
  const hit = inferCategory({ name_en: 'Anjou Pear', brand: null }, rules.categoryRules);
  assert.equal(hit.slug, 'produce');
});

test('"Fuji Apple" → produce via keyword rule', () => {
  const rules = loadRealRules();
  const hit = inferCategory({ name_en: 'Fuji Apple', brand: null }, rules.categoryRules);
  assert.equal(hit.slug, 'produce');
});

// ── Unit: audit exclusion for alcohol ─────────────────────────────────────────

test('"Angry Orchard Crisp Apple Hard Cider" is audit-excluded as alcohol', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'Angry Orchard Crisp Apple Hard Cider',
    brand:         'angry orchard',
    category_slug: null,
  }];
  processCatalog(catalog, rules);
  // It might or might not get a category assigned; the audit is what matters.
  assert.equal(catalog[0].audit_action, 'exclude');
  assert.equal(catalog[0].audit_reason, 'alcohol');
});

test('"Flying Embers Mango Margarita" is audit-excluded as alcohol', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'Flying Embers Mango Margarita',
    brand:         'flying embers',
    category_slug: null,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].audit_action, 'exclude');
  assert.equal(catalog[0].audit_reason, 'alcohol');
});

// ── Unit: pantry-staples inference ────────────────────────────────────────────

test('"Barilla Gemelli - Non-GMO Pasta..." → pantry-staples', () => {
  const rules = loadRealRules();
  const hit = inferCategory({
    name_en: 'Barilla Gemelli - Non-GMO Pasta Made with Durum Wheat Semolina & Kosher Certified',
    brand:   'barilla',
  }, rules.categoryRules);
  assert.equal(hit.slug, 'pantry-staples');
});

// ── Unit: audit rule does NOT get fooled by false positives ───────────────────

test('"Apple Cider Vinegar" is NOT excluded (vinegar, not hard cider)', () => {
  const rules = loadRealRules();
  const res = auditProduct({ name_en: 'Bragg Organic Apple Cider Vinegar' }, rules.auditRules);
  assert.equal(res, null);
});

test('"Eggplant" does NOT match Egg rule (word boundary)', () => {
  const rules = loadRealRules();
  const hit = inferCategory({ name_en: 'Fresh Eggplant', brand: null }, rules.categoryRules);
  // Eggplant should fall to produce via "Eggplant"? We don't have Eggplant in
  // produce keywords... we do. So it lands in produce.
  assert.equal(hit.slug, 'produce');
});

// ── Unit: truly unknown stays null ────────────────────────────────────────────

test('Product with no keyword match keeps category_slug null, source=manual', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'ZZZZZ Mystery Item',
    brand:         null,
    category_slug: null,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].category_slug, null);
  assert.equal(catalog[0].category_source, 'manual');
  assert.equal(catalog[0].audit_action, 'keep');
});

// ── Integration: idempotency ──────────────────────────────────────────────────

test('running the script twice produces identical output', () => {
  const products = [
    { name_en: 'Anjou Pear',                              brand: null,            category_slug: null },
    { name_en: 'Angry Orchard Crisp Apple Hard Cider',    brand: 'angry orchard', category_slug: null },
    { name_en: 'Barilla Gemelli Pasta',                   brand: 'barilla',       category_slug: null },
    { name_en: 'English Seedless Cucumber',               brand: null,            category_slug: 'produce' },
    { name_en: 'ZZZZZ Mystery Item',                      brand: null,            category_slug: null },
  ];

  withTempCatalog(products, ({ catalogPath, reportPath, rulesPath }) => {
    run({ catalogPath, reportPath, rulesPath });
    const sha1 = sha(catalogPath);
    run({ catalogPath, reportPath, rulesPath });
    const sha2 = sha(catalogPath);
    assert.equal(sha1, sha2, 'catalog sha drifted between runs');
  });
});

// ── Integration: dry-run does not mutate ──────────────────────────────────────

test('--dry-run does not mutate the catalog file or write the report', () => {
  const products = [
    { name_en: 'Anjou Pear',                              brand: null,            category_slug: null },
    { name_en: 'Angry Orchard Crisp Apple Hard Cider',    brand: 'angry orchard', category_slug: null },
  ];

  withTempCatalog(products, ({ catalogPath, reportPath, rulesPath }) => {
    const before = fs.readFileSync(catalogPath, 'utf8');
    run({ catalogPath, reportPath, rulesPath, dryRun: true });
    const after = fs.readFileSync(catalogPath, 'utf8');
    assert.equal(before, after, 'dry-run wrote to catalog');
    assert.equal(fs.existsSync(reportPath), false, 'dry-run wrote a report');
  });
});

// ── Integration: end-to-end counts on a tiny fixture ──────────────────────────

test('end-to-end: mixed fixture categorizes and audits correctly', () => {
  const products = [
    { name_en: 'Anjou Pear',                              brand: null,            category_slug: null },
    { name_en: 'Angry Orchard Crisp Apple Hard Cider',    brand: 'angry orchard', category_slug: null },
    { name_en: 'Barilla Gemelli Pasta',                   brand: 'barilla',       category_slug: null },
    { name_en: 'English Seedless Cucumber',               brand: null,            category_slug: 'produce' },
    { name_en: 'ZZZZZ Mystery Item',                      brand: null,            category_slug: null },
    { name_en: 'Bragg Apple Cider Vinegar',               brand: 'bragg',         category_slug: null },
    { name_en: 'Marlboro Cigarette',                      brand: 'marlboro',      category_slug: null },
  ];

  withTempCatalog(products, ({ catalogPath, reportPath, rulesPath }) => {
    const { stats } = run({ catalogPath, reportPath, rulesPath });
    assert.equal(stats.total,           7);
    assert.equal(stats.alreadySlugged,  1);        // cucumber (already had slug)
    assert.ok(stats.inferredSlug      >= 3);       // pear, pasta, vinegar — cider may hit alcohol first
    // "Mystery Item" has no category match; "Marlboro Cigarette" has no
    // category keyword (cigarette is only in the audit rules) so it's also
    // unknown for categorization purposes.
    assert.equal(stats.stillUnknown,    2);
    assert.ok(stats.excludeTotal      >= 2);       // hard cider + cigarette
    assert.ok(stats.auditByLabel.alcohol >= 1);
    assert.ok(stats.auditByLabel.tobacco >= 1);
    assert.ok(fs.existsSync(reportPath));
  });
});
