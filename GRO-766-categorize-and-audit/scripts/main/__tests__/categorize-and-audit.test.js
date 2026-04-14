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
  applyCategoryOverride,
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

// ── Unit: baby_food exclusion ─────────────────────────────────────────────────

test('"Gerber Stage 1 Baby Food" is audit-excluded as baby_food and included=false', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'Gerber Stage 1 Baby Food',
    brand:         'gerber',
    category_slug: null,
    included:      true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].audit_action, 'exclude');
  assert.equal(catalog[0].audit_reason, 'baby_food');
  assert.equal(catalog[0].included,     false);
});

test('"Beech-Nut Stage 2 Baby Food" is audit-excluded as baby_food', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'Beech-Nut Stage 2 Baby Food, Apple, 4 oz Jar',
    brand:         'beech-nut',
    category_slug: null,
    included:      true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].audit_action, 'exclude');
  assert.equal(catalog[0].audit_reason, 'baby_food');
  assert.equal(catalog[0].included,     false);
});

// ── Unit: frozen_dessert exclusion + Nestle Quik syrup override ───────────────

test('"Haagen-Dazs Vanilla Ice Cream" is audit-excluded as frozen_dessert', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'Haagen-Dazs Vanilla Ice Cream',
    brand:         'haagen-dazs',
    category_slug: 'pantry-staples',   // mirrors the real upstream mis-assignment
    included:      true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].audit_action, 'exclude');
  assert.equal(catalog[0].audit_reason, 'frozen_dessert');
  assert.equal(catalog[0].included,     false);
});

test('"Nestlé NESQUIK Chocolate Syrup For Milk Or Ice Cream" is NOT excluded (syrup override)', () => {
  const rules = loadRealRules();
  const res = auditProduct({
    name_en: 'Nestlé NESQUIK Chocolate Syrup For Milk Or Ice Cream',
    brand:   'nestlé nesquik',
  }, rules.auditRules);
  assert.equal(res, null, 'syrup override should have kept this product');
});

test('"IMUSA Garlic Press" is audit-excluded as non_food_kitchen_tools', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'IMUSA Garlic Press',
    brand:         'imusa',
    category_slug: 'produce',
    included:      true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].audit_action, 'exclude');
  assert.equal(catalog[0].audit_reason, 'non_food_kitchen_tools');
  assert.equal(catalog[0].included,     false);
});

test('"Vaseline Healing Jelly Original" is audit-excluded as non_food_personal_care', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'Vaseline Healing Jelly Original',
    brand:         'vaseline',
    category_slug: null,
    included:      true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].audit_action, 'exclude');
  assert.equal(catalog[0].audit_reason, 'non_food_personal_care');
  assert.equal(catalog[0].included,     false);
});

// ── Unit: regression — alcohol still excluded ─────────────────────────────────

test('regression: alcohol exclusion still flips `included` to false', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'Angry Orchard Crisp Apple Hard Cider',
    brand:         'angry orchard',
    category_slug: null,
    included:      true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].audit_action, 'exclude');
  assert.equal(catalog[0].audit_reason, 'alcohol');
  assert.equal(catalog[0].included,     false);
});

// ── Unit: category_overrides (reconcile-slug reassignment) ────────────────────

test('"Sara Lee Dutch Apple Pie" is overridden from pantry-staples to bread-bakery', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:       'Sara Lee Dutch Apple Pie',
    brand:         'sara lee',
    category_slug: 'pantry-staples',   // mirrors the real upstream assignment
    category_source: 'reconcile',
    included:      true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].category_slug,   'bread-bakery');
  assert.equal(catalog[0].category_source, 'override');
});

test('"Applegate Breakfast Sausage" is overridden to meat-seafood', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:         'Applegate Chicken & Sage Breakfast Sausage',
    brand:           'applegate',
    category_slug:   'cereal-snacks',
    category_source: 'reconcile',
    included:        true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].category_slug,   'meat-seafood');
  assert.equal(catalog[0].category_source, 'override');
});

test('"Jif Creamy Peanut Butter" is overridden to pantry-staples', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:         'Jif Creamy Peanut Butter',
    brand:           'jif',
    category_slug:   'cereal-snacks',
    category_source: 'reconcile',
    included:        true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].category_slug,   'pantry-staples');
  assert.equal(catalog[0].category_source, 'override');
});

test('"Cotton Candy Grapes" is overridden to produce', () => {
  const rules = loadRealRules();
  const catalog = [{
    name_en:         'Cotton Candy Grapes',
    brand:           null,
    category_slug:   'cereal-snacks',
    category_source: 'reconcile',
    included:        true,
  }];
  processCatalog(catalog, rules);
  assert.equal(catalog[0].category_slug,   'produce');
  assert.equal(catalog[0].category_source, 'override');
});

// ── Unit: bread-bakery override does NOT catch Pot Pie or Pumpkin Pie Spice ──

test('"Marie Callender\'s Chicken Pot Pie" is NOT reassigned to bread-bakery', () => {
  const rules = loadRealRules();
  const res = applyCategoryOverride({
    name_en: "Marie Callender's Chicken Pot Pie Large Size Frozen Meal",
    brand:   "marie callender's",
  }, rules.categoryOverrides);
  // Either no override fires, or any override that fires is NOT bread-bakery.
  if (res) {
    assert.notEqual(res.slug, 'bread-bakery', 'pot pie should not land in bakery');
  }
});

test('"McCormick Pumpkin Pie Spice" is NOT reassigned to bread-bakery', () => {
  const rules = loadRealRules();
  const res = applyCategoryOverride({
    name_en: 'McCormick Pumpkin Pie Spice',
    brand:   'mccormick',
  }, rules.categoryOverrides);
  if (res) {
    assert.notEqual(res.slug, 'bread-bakery');
  }
});

// ── Unit: frozen_dessert does NOT catch chicken drumsticks ────────────────────

test('"Perdue Chicken Drumsticks" is NOT excluded as frozen_dessert', () => {
  const rules = loadRealRules();
  const res = auditProduct({
    name_en: 'Perdue Chicken Drumsticks Value Pack',
    brand:   'perdue',
  }, rules.auditRules);
  assert.equal(res, null);
});

test('"Klondike Potatoes" (produce, not ice cream) is NOT excluded as frozen_dessert', () => {
  const rules = loadRealRules();
  const res = auditProduct({
    name_en: 'Klondike Potatoes, Petite, Red-Yellow Fleshed',
    brand:   'klondike',
  }, rules.auditRules);
  assert.equal(res, null);
});

// ── Unit: keyword regex handles non-word endings ──────────────────────────────

test('keyword "9m+" matches "Earth Best Beef Medley 9m+"', () => {
  const { buildKeywordRegex } = require('../categorize-and-audit.js');
  const re = buildKeywordRegex('9m+');
  assert.equal(re.test("Earth Best Beef Medley 9m+"), true);
});

test('keyword "Stage 1" does NOT match "Stage 10"', () => {
  const { buildKeywordRegex } = require('../categorize-and-audit.js');
  const re = buildKeywordRegex('Stage 1');
  assert.equal(re.test('Product Stage 10 Advanced'), false);
  assert.equal(re.test('Product Stage 1 Baby'),      true);
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
