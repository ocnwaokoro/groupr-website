#!/usr/bin/env node
/**
 * curate-snap-catalog.js
 *
 * Reads output/full-catalog.json (7,364 products) and produces:
 *   - output/groupr-snap-catalog.json   (all fields + curationScore)
 *   - output/groupr-snap-products.csv   (Groupr CSV, on_sale always false)
 *   - GRO-705-catalog-scraping/curation/included.yaml
 *   - GRO-705-catalog-scraping/curation/excluded.yaml
 *
 * Run: cd devenv-main/scraper && node scripts/main/curate-snap-catalog.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// ── Paths ─────────────────────────────────────────────────────────────────────
const ROOT          = path.join(__dirname, '..', '..');
const CONFIG_PATH   = path.join(ROOT, 'curation-config.yaml');
const INPUT_JSON    = path.join(ROOT, 'output/full-catalog.json');
const OUT_JSON      = path.join(ROOT, 'output/groupr-snap-catalog.json');
const OUT_CSV       = path.join(ROOT, 'output/groupr-snap-products.csv');
const CURATION_DIR  = path.join(ROOT, 'GRO-705-catalog-scraping/curation');
const INCLUDED_YAML = path.join(CURATION_DIR, 'included.yaml');
const EXCLUDED_YAML = path.join(CURATION_DIR, 'excluded.yaml');

// ── Load curation config from YAML ────────────────────────────────────────────
const cfg = yaml.load(fs.readFileSync(CONFIG_PATH, 'utf8'));

const DROP_SUBCATEGORIES = new Set(cfg.drop_subcategories || []);
const DROP_DEPARTMENTS = new Set(cfg.drop_departments || []);

const BRAND_WHITELIST = cfg.brand_whitelist || [];
const BRAND_BLACKLIST = cfg.brand_blacklist || [];

const toPattern = b => new RegExp(b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
const WHITELIST_PATTERNS = BRAND_WHITELIST.map(toPattern);
const BLACKLIST_PATTERNS = BRAND_BLACKLIST.map(toPattern);

const ENERGY_DRINK_BRANDS = cfg.energy_drink_brands || [];
const ENERGY_DRINK_PATTERNS = ENERGY_DRINK_BRANDS.map(toPattern);

// Build SUBCAT_LIMITS from config (exclude the 'default' key)
const defaultLimit = (cfg.subcategory_limits && cfg.subcategory_limits.default) || 20;
const SUBCAT_LIMITS = {};
if (cfg.subcategory_limits) {
  for (const [k, v] of Object.entries(cfg.subcategory_limits)) {
    if (k !== 'default') SUBCAT_LIMITS[k] = v;
  }
}

const FORCE_INCLUDE = (cfg.force_includes || []).map(fi => ({
  matchers: fi.matchers.map(String),
  subCat: fi.subCat,
  label: fi.label,
  ...(fi.sizeMatch ? { sizeMatch: fi.sizeMatch } : {}),
}));

const DEPARTMENT_TO_CATEGORY = cfg.department_categories || {};
const CATEGORY_NAMES = {};
if (cfg.category_names) {
  for (const [k, v] of Object.entries(cfg.category_names)) CATEGORY_NAMES[Number(k)] = v;
}
const CATEGORY_SLUGS = {};
if (cfg.category_slugs) {
  for (const [k, v] of Object.entries(cfg.category_slugs)) CATEGORY_SLUGS[Number(k)] = v;
}
const DEPARTMENT_FRIENDLY = cfg.department_friendly_names || {};

// Scoring weights from config
const SCORE = cfg.scoring || {};
const PRICE_WEIGHT     = SCORE.price_weight     || 40;
const WHITELIST_BOOST  = SCORE.whitelist_boost   || 30;
const POSITION_HIGH    = SCORE.position_high     || 20;
const POSITION_LOW     = SCORE.position_low      || 10;
const BLACKLIST_PENALTY = SCORE.blacklist_penalty || -20;

// Brand caps
const BRAND_CAP_DEFAULT = (cfg.brand_caps && cfg.brand_caps.default) || 2;
const BRAND_CAP_FORCE   = (cfg.brand_caps && cfg.brand_caps.force_included) || 3;

function getSubCategory(product) {
  const loc = product.inStoreItemLocation?.viewSection?.locationString;
  if (loc && loc.trim()) return loc.trim();
  const dept = product._department || '';
  return DEPARTMENT_FRIENDLY[dept] || dept || 'Unknown';
}

function getPrice(product) {
  const ps = product.price?.viewSection?.itemCard?.priceString;
  if (ps) {
    const m = ps.match(/\$([\d.]+)/);
    if (m) return parseFloat(m[1]);
  }
  return 0;
}

function getCategoryId(product) {
  const dept = product._department || '';
  const location = getSubCategory(product);

  if (dept === 'n-frozen-71377') {
    if (/^Frozen (Fruit|Vegetables|Broccoli|Corn|Green Beans|Spinach|Squash|Peas|Mixed Vegetables|Mango|Peaches|Strawberries|Yucca|Edamame|Plantain|Lima Beans|Brussels Sprouts|Carrots|Cauliflower|Blueberries|Cherries|Mixed Berries|Smoothie Mix)/i.test(location)) {
      return 1;
    }
    if (/^Frozen (Meat|Seafood|Chicken|Beef|Fish|Shrimp|Tilapia|Salmon|Mussels)/i.test(location) ||
        location === 'Frozen Meat Alternatives') {
      return 2;
    }
    if (location === 'Frozen Breakfast') return 5;
    if (location === 'Frozen Breads') return 6;
    if (location === 'Frozen Beverages') return 7;
    return 3;
  }

  return DEPARTMENT_TO_CATEGORY[dept] || 3;
}

function isWhitelistBrand(brandName) {
  if (!brandName) return false;
  return WHITELIST_PATTERNS.some(pat => pat.test(brandName));
}

function isBlacklistBrand(brandName) {
  if (!brandName) return false;
  return BLACKLIST_PATTERNS.some(pat => pat.test(brandName));
}

function isEnergyDrink(product) {
  const name = product.name || '';
  const brand = product.brandName || '';
  return ENERGY_DRINK_PATTERNS.some(pat => pat.test(name) || pat.test(brand));
}

function isGlassBottle(product) {
  return /glass bottle/i.test(product.name || '');
}

/**
 * Strip size info from a product name to get a "base name" for dedup.
 * E.g. "Barilla Spaghetti 16 oz" -> "Barilla Spaghetti"
 */
function getBaseName(name) {
  if (!name) return '';
  // Remove trailing size patterns like "16 oz", "2 lb", "1.5 gal", "12 ct", "6 pack", etc.
  return name
    .replace(/\s*,?\s*\d+(\.\d+)?\s*(oz|lb|lbs|fl\s*oz|gal|ct|count|each|ml|l|g|kg|pt|qt|pack|pk|liter|liters)\b\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchesForceInclude(product, fi) {
  const name = product.name || '';
  const nameMatch = fi.matchers.every(m => name.toLowerCase().includes(m.toLowerCase()));
  if (!nameMatch) return false;
  // Optional size match (e.g. "2 L")
  if (fi.sizeMatch) {
    const size = product.size || '';
    return size.toLowerCase() === fi.sizeMatch.toLowerCase();
  }
  return true;
}

// ── CSV helpers ───────────────────────────────────────────────────────────────

const UNIT_TRANSLATIONS = {
  'oz':    { es: 'oz',    plural_en: 'oz',    plural_es: 'oz' },
  'lb':    { es: 'lb',    plural_en: 'lbs',   plural_es: 'lbs' },
  'lbs':   { es: 'lbs',   plural_en: 'lbs',   plural_es: 'lbs' },
  'fl oz': { es: 'fl oz', plural_en: 'fl oz', plural_es: 'fl oz' },
  'gal':   { es: 'gal',   plural_en: 'gal',   plural_es: 'gal' },
  'ct':    { es: 'ud',    plural_en: 'ct',    plural_es: 'uds' },
  'count': { es: 'ud',    plural_en: 'count', plural_es: 'uds' },
  'each':  { es: 'ud',    plural_en: 'each',  plural_es: 'uds' },
  'ml':    { es: 'ml',    plural_en: 'ml',    plural_es: 'ml' },
  'l':     { es: 'l',     plural_en: 'l',     plural_es: 'l' },
  'g':     { es: 'g',     plural_en: 'g',     plural_es: 'g' },
  'kg':    { es: 'kg',    plural_en: 'kg',    plural_es: 'kg' },
  'pt':    { es: 'pt',    plural_en: 'pt',    plural_es: 'pt' },
  'qt':    { es: 'qt',    plural_en: 'qt',    plural_es: 'qt' },
  'pack':  { es: 'paq',   plural_en: 'packs', plural_es: 'paqs' },
};

function parseWeight(sizeStr) {
  if (!sizeStr) return { weight: null, unit: null };
  const m = sizeStr.match(/^([\d.]+)\s*(.+)$/);
  if (!m) return { weight: null, unit: null };
  return { weight: parseFloat(m[1]), unit: m[2].trim().toLowerCase() };
}

function parsePriceCents(priceString) {
  if (!priceString) return 0;
  const m = priceString.match(/\$([\d.]+)/);
  if (!m) return 0;
  return Math.round(parseFloat(m[1]) * 100);
}

function csvEscape(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// ── YAML helper ───────────────────────────────────────────────────────────────

function yamlEscape(str) {
  if (!str) return '""';
  if (/[:#\[\]{}&*!|>',@`]/.test(str) || str.includes('"') || str.startsWith(' ') || str.endsWith(' ')) {
    return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  return str;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

console.log('Reading full catalog...');
const catalog = JSON.parse(fs.readFileSync(INPUT_JSON, 'utf8'));
console.log(`Input products: ${catalog.length}`);

// ── Step 1: Assign instacart position (order within sub-category) ────────────
// Products appear in Instacart API order; track position per sub-category.
const positionCounters = {};
for (const product of catalog) {
  const subCat = getSubCategory(product);
  if (!positionCounters[subCat]) positionCounters[subCat] = 0;
  product._instacartPosition = positionCounters[subCat]++;
}

// ── Step 2: Filter out dropped departments and sub-categories ────────────────
const droppedProducts = [];
const droppedReasons = {};
let afterFilter = [];

for (const product of catalog) {
  const dept = product._department || '';
  const subCat = getSubCategory(product);

  if (DROP_DEPARTMENTS.has(dept)) {
    droppedProducts.push(product);
    droppedReasons[product.id] = `Dropped department: ${dept}`;
    continue;
  }
  if (DROP_SUBCATEGORIES.has(subCat)) {
    droppedProducts.push(product);
    droppedReasons[product.id] = `Dropped sub-category: ${subCat}`;
    continue;
  }
  // No ice cream by name (allow syrup/sauce/topping that mention ice cream as a use case)
  if (/ice cream/i.test(product.name || '') && !/syrup|sauce|topping|scoop|for milk/i.test(product.name || '')) {
    droppedProducts.push(product);
    droppedReasons[product.id] = 'Ice cream (name match)';
    continue;
  }
  // No glass bottles
  if (isGlassBottle(product)) {
    droppedProducts.push(product);
    droppedReasons[product.id] = 'Glass bottle';
    continue;
  }
  // No energy drinks
  if (isEnergyDrink(product)) {
    droppedProducts.push(product);
    droppedReasons[product.id] = 'Energy drink';
    continue;
  }
  afterFilter.push(product);
}

console.log(`After filtering dropped categories/glass/energy: ${afterFilter.length} (dropped ${catalog.length - afterFilter.length})`);

// ── Step 3: Group by sub-category ────────────────────────────────────────────
const subCatGroups = {};
for (const product of afterFilter) {
  const subCat = getSubCategory(product);
  if (!subCatGroups[subCat]) subCatGroups[subCat] = [];
  subCatGroups[subCat].push(product);
}

console.log(`Sub-categories remaining: ${Object.keys(subCatGroups).length}`);

// ── Step 4: Identify force-include products ──────────────────────────────────
const forceIncludeProducts = new Map(); // productId -> force-include entry
const forceIncludeFound = {};
const forceIncludeNotFound = {};

for (const fi of FORCE_INCLUDE) {
  let found = false;
  for (const product of catalog) {
    if (matchesForceInclude(product, fi)) {
      forceIncludeProducts.set(product.id, fi);
      found = true;
    }
  }
  if (found) {
    forceIncludeFound[fi.label] = true;
  } else {
    forceIncludeNotFound[fi.label] = true;
  }
}

console.log(`Force-include items found: ${Object.keys(forceIncludeFound).length}, not found: ${Object.keys(forceIncludeNotFound).length}`);

// ── Step 5: Score and select per sub-category ────────────────────────────────
const selected = [];
const perSubCatStats = [];
const blacklistKept = [];
const blacklistCut = [];

for (const [subCat, products] of Object.entries(subCatGroups)) {
  // Find cheapest price in sub-category
  const prices = products.map(p => getPrice(p)).filter(p => p > 0);
  const cheapestPrice = prices.length > 0 ? Math.min(...prices) : 1;

  // Score each product
  const scored = products.map(p => {
    const price = getPrice(p) || cheapestPrice; // avoid div-by-zero
    const brand = p.brandName || '';
    const wl = isWhitelistBrand(brand);
    const bl = isBlacklistBrand(brand);
    const pos = p._instacartPosition;

    let score = (cheapestPrice / price) * PRICE_WEIGHT  // cheaper = higher score
              + (wl ? WHITELIST_BOOST : 0)                // SNAP brand boost
              + (pos < 20 ? POSITION_HIGH : POSITION_LOW) // position tiebreaker
              + (bl ? BLACKLIST_PENALTY : 0);              // premium penalty

    return { product: p, score: Math.round(score * 100) / 100, isWhitelist: wl, isBlacklist: bl };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // ── Constraint: Max 2 sizes per product (same base name, keep 2 best positions)
  const baseNameGroups = {};
  for (const entry of scored) {
    const bn = getBaseName(entry.product.name);
    if (!baseNameGroups[bn]) baseNameGroups[bn] = [];
    baseNameGroups[bn].push(entry);
  }

  // For each base name group with > 2, keep only the 2 with best instacart position
  const sizeDropped = new Set();
  for (const [bn, entries] of Object.entries(baseNameGroups)) {
    if (entries.length > 2) {
      // Sort by instacart position ascending (best first)
      const byPos = [...entries].sort((a, b) => a.product._instacartPosition - b.product._instacartPosition);
      for (let i = 2; i < byPos.length; i++) {
        sizeDropped.add(byPos[i].product.id);
        droppedProducts.push(byPos[i].product);
        droppedReasons[byPos[i].product.id] = `Max 2 sizes per product (base: ${bn})`;
      }
    }
  }

  // Filter out size-dropped
  const afterSizeFilter = scored.filter(e => !sizeDropped.has(e.product.id));

  // Determine limit for this sub-category
  // If not in SUBCAT_LIMITS, keep all products (no cap). Only listed subcats get capped.
  const limit = SUBCAT_LIMITS[subCat] !== undefined ? SUBCAT_LIMITS[subCat] : products.length;

  // ── Select with constraints: max 2 SKUs per brand per sub-category
  const kept = [];
  const brandCounts = {}; // brand -> count in this sub-category

  for (const entry of afterSizeFilter) {
    if (kept.length >= limit) break;
    const brand = entry.product.brandName || '';
    const brandKey = brand.toLowerCase();

    // Max 2 SKUs per brand per sub-category
    if (brandKey && (brandCounts[brandKey] || 0) >= 2) {
      droppedProducts.push(entry.product);
      droppedReasons[entry.product.id] = `Max 2 SKUs per brand (${brand}) in ${subCat}`;
      if (entry.isBlacklist) blacklistCut.push(entry.product);
      continue;
    }

    if (brandKey) brandCounts[brandKey] = (brandCounts[brandKey] || 0) + 1;
    kept.push(entry);
    if (entry.isBlacklist) blacklistKept.push(entry.product);
  }

  // Track products not kept for exclusion
  const keptIds = new Set(kept.map(e => e.product.id));
  for (const entry of afterSizeFilter) {
    if (!keptIds.has(entry.product.id) && !sizeDropped.has(entry.product.id)) {
      droppedProducts.push(entry.product);
      droppedReasons[entry.product.id] = `Below sub-category limit (${subCat}: limit ${limit})`;
      if (entry.isBlacklist) blacklistCut.push(entry.product);
    }
  }

  perSubCatStats.push({ subCat, had: products.length, kept: kept.length, limit });

  for (const entry of kept) {
    selected.push({ ...entry.product, curationScore: entry.score });
  }
}

// ── Step 6: Force-include items ──────────────────────────────────────────────
const selectedIds = new Set(selected.map(p => p.id));
let forceIncludedCount = 0;

for (const [productId, fi] of forceIncludeProducts.entries()) {
  if (!selectedIds.has(productId)) {
    // Find the product from the original catalog
    const product = catalog.find(p => p.id === productId);
    if (product) {
      const price = getPrice(product) || 1;
      const brand = product.brandName || '';
      const wl = isWhitelistBrand(brand);
      const bl = isBlacklistBrand(brand);
      const pos = product._instacartPosition || 0;
      const subCat = fi.subCat;
      const subCatProducts = subCatGroups[subCat] || [];
      const prices = subCatProducts.map(p => getPrice(p)).filter(p => p > 0);
      const cheapestPrice = prices.length > 0 ? Math.min(...prices) : 1;

      let score = (cheapestPrice / price) * PRICE_WEIGHT + (wl ? WHITELIST_BOOST : 0) + (pos < 20 ? POSITION_HIGH : POSITION_LOW) + (bl ? BLACKLIST_PENALTY : 0);
      score = Math.round(score * 100) / 100;

      selected.push({ ...product, curationScore: score, _forceIncluded: true, _forceSubCat: fi.subCat });
      selectedIds.add(productId);
      forceIncludedCount++;

      // Remove from dropped if it was there
      const idx = droppedProducts.findIndex(p => p.id === productId);
      if (idx !== -1) droppedProducts.splice(idx, 1);
      delete droppedReasons[productId];
    }
  }
}

console.log(`Force-included (added beyond limits): ${forceIncludedCount}`);

// ── Step 7: POST-PROCESSING — enforce brand cap across ALL selected products ──
const finalSelected = [];
const finalBrandCounts = {};
selected.sort((a, b) => b.curationScore - a.curationScore);

for (const product of selected) {
  const subCat = getSubCategory(product);
  const brand = (product.brandName || '').toLowerCase();
  const key = `${subCat}|${brand}`;
  const maxForBrand = product._forceIncluded ? BRAND_CAP_FORCE : BRAND_CAP_DEFAULT;

  if (brand && (finalBrandCounts[key] || 0) >= maxForBrand) {
    droppedProducts.push(product);
    droppedReasons[product.id] = `Post-process brand cap: ${brand} in ${subCat}`;
    continue;
  }

  if (brand) finalBrandCounts[key] = (finalBrandCounts[key] || 0) + 1;
  finalSelected.push(product);
}

const brandCapDropped = selected.length - finalSelected.length;
console.log(`Post-process brand cap: dropped ${brandCapDropped} (${selected.length} -> ${finalSelected.length})`);
selected.length = 0;
selected.push(...finalSelected);

// ── Step 7: Write JSON ──────────────────────────────────────────────────────
// Remove internal fields before writing
const outputProducts = selected.map(p => {
  const out = { ...p };
  delete out._instacartPosition;
  delete out._forceIncluded;
  return out;
});

fs.writeFileSync(OUT_JSON, JSON.stringify(outputProducts, null, 2));
console.log(`\nWrote JSON: ${OUT_JSON}`);

// ── Step 8: Write CSV ───────────────────────────────────────────────────────
const CSV_HEADERS = [
  'category_id', 'name_en', 'name_es', 'description_en', 'description_es',
  'price_cents', 'stock', 'featured', 'weight', 'weight_unit',
  'weight_unit_plural_en', 'weight_unit_plural_es',
  'on_sale', 'discount_price_cents', 'ebt_snap_eligible', 'ebt_cash_eligible',
  'is_taxable', 'is_active', 'provider_id', 'fallback_image_url',
  'brand', 'product_type', 'group_key', 'snap_popularity_rank',
];

const csvRows = [CSV_HEADERS.join(',')];

for (const product of selected) {
  const categoryId = getCategoryId(product);
  const priceSection = product.price?.viewSection?.itemCard;
  const currentPriceCents = parsePriceCents(priceSection?.priceString);
  const { weight, unit } = parseWeight(product.size);
  const unitInfo = unit ? (UNIT_TRANSLATIONS[unit] || null) : null;
  const imageUrl = product.viewSection?.itemImage?.url || '';
  const subCat = getSubCategory(product);

  const row = [
    categoryId,
    csvEscape(product.name),
    csvEscape(product.name),           // name_es placeholder
    csvEscape(''),
    csvEscape(''),
    currentPriceCents,
    0,
    false,
    weight !== null ? weight : '',
    unit || '',
    unitInfo ? unitInfo.plural_en : '',
    unitInfo ? unitInfo.plural_es : '',
    false,                              // on_sale always false
    '',
    true,
    true,
    false,
    true,
    1,
    csvEscape(imageUrl),
    csvEscape(product.brandName || ''),
    csvEscape(subCat),
    csvEscape(''),                      // group_key (not in source data)
    '',                                 // snap_popularity_rank (not in source data)
  ];

  csvRows.push(row.join(','));
}

fs.writeFileSync(OUT_CSV, csvRows.join('\n'));
console.log(`Wrote CSV:  ${OUT_CSV}`);

// ── Step 9: Write YAML files ────────────────────────────────────────────────
fs.mkdirSync(CURATION_DIR, { recursive: true });

// included.yaml
const includedBySubCat = {};
for (const product of selected) {
  const subCat = getSubCategory(product);
  if (!includedBySubCat[subCat]) includedBySubCat[subCat] = [];
  includedBySubCat[subCat].push(product);
}

let includedYaml = '# Curated SNAP catalog — included products\n';
includedYaml += `# Generated: ${new Date().toISOString()}\n`;
includedYaml += `# Total: ${selected.length} products\n\n`;

for (const subCat of Object.keys(includedBySubCat).sort()) {
  const items = includedBySubCat[subCat];
  includedYaml += `${yamlEscape(subCat)}:\n`;
  for (const p of items) {
    const price = getPrice(p);
    includedYaml += `  - name: ${yamlEscape(p.name)}\n`;
    includedYaml += `    brand: ${yamlEscape(p.brandName || '')}\n`;
    includedYaml += `    price: ${price.toFixed(2)}\n`;
    includedYaml += `    score: ${p.curationScore}\n`;
    includedYaml += `    id: ${yamlEscape(p.id)}\n`;
  }
  includedYaml += '\n';
}

fs.writeFileSync(INCLUDED_YAML, includedYaml);
console.log(`Wrote YAML: ${INCLUDED_YAML}`);

// excluded.yaml
const excludedBySubCat = {};
for (const product of droppedProducts) {
  const subCat = getSubCategory(product);
  if (!excludedBySubCat[subCat]) excludedBySubCat[subCat] = [];
  excludedBySubCat[subCat].push(product);
}

let excludedYaml = '# Curated SNAP catalog — excluded products\n';
excludedYaml += `# Generated: ${new Date().toISOString()}\n`;
excludedYaml += `# Total: ${droppedProducts.length} products\n\n`;

for (const subCat of Object.keys(excludedBySubCat).sort()) {
  const items = excludedBySubCat[subCat];
  excludedYaml += `${yamlEscape(subCat)}:\n`;
  for (const p of items) {
    const reason = droppedReasons[p.id] || 'Unknown';
    excludedYaml += `  - name: ${yamlEscape(p.name)}\n`;
    excludedYaml += `    brand: ${yamlEscape(p.brandName || '')}\n`;
    excludedYaml += `    reason: ${yamlEscape(reason)}\n`;
    excludedYaml += `    id: ${yamlEscape(p.id)}\n`;
  }
  excludedYaml += '\n';
}

fs.writeFileSync(EXCLUDED_YAML, excludedYaml);
console.log(`Wrote YAML: ${EXCLUDED_YAML}`);

// ═══════════════════════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════════════════════

console.log('\n' + '='.repeat(70));
console.log('CURATION STATS');
console.log('='.repeat(70));
console.log(`Total input:  ${catalog.length}`);
console.log(`Total output: ${selected.length}`);

// Per sub-category stats
console.log('\nPer sub-category:');
perSubCatStats.sort((a, b) => b.had - a.had);
for (const { subCat, had, kept, limit } of perSubCatStats) {
  console.log(`  ${subCat}: had ${had}, kept ${kept} (limit ${limit})`);
}

// Top 20 products by score
console.log('\nTop 20 products by curation score:');
const sortedByScore = [...selected].sort((a, b) => b.curationScore - a.curationScore);
sortedByScore.slice(0, 20).forEach((p, i) => {
  const price = getPrice(p);
  const subCat = getSubCategory(p);
  console.log(`  ${i + 1}. [${p.curationScore}] ${p.name} — $${price.toFixed(2)} — ${p.brandName || '(no brand)'} — ${subCat}`);
});

// Per backend category (1-7)
const catCounts = {};
for (const product of selected) {
  const catId = getCategoryId(product);
  catCounts[catId] = (catCounts[catId] || 0) + 1;
}

console.log('\nPer backend category:');
for (let i = 1; i <= 7; i++) {
  console.log(`  ${i} (${CATEGORY_NAMES[i] || 'Unknown'}): ${catCounts[i] || 0} products`);
}

// Force-include report
console.log('\nForce-include items:');
console.log(`  Found: ${Object.keys(forceIncludeFound).length}`);
for (const label of Object.keys(forceIncludeFound)) {
  console.log(`    [OK] ${label}`);
}
console.log(`  Not found: ${Object.keys(forceIncludeNotFound).length}`);
for (const label of Object.keys(forceIncludeNotFound)) {
  console.log(`    [MISSING] ${label}`);
}

// Blacklist report
console.log(`\nBlacklisted brands kept: ${blacklistKept.length}`);
for (const p of blacklistKept) {
  console.log(`  [KEPT] ${p.name} (${p.brandName})`);
}
console.log(`Blacklisted brands cut: ${blacklistCut.length}`);
for (const p of blacklistCut.slice(0, 30)) {
  console.log(`  [CUT] ${p.name} (${p.brandName})`);
}
if (blacklistCut.length > 30) {
  console.log(`  ... and ${blacklistCut.length - 30} more`);
}

console.log('\nDone.');
