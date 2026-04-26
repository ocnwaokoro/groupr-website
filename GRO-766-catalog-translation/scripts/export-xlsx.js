#!/usr/bin/env node
/**
 * export-xlsx.js
 *
 * Reads output/reconciled-catalog.json → output/groupr-catalog.xlsx
 *
 * Tabs:
 *   1. Full Scrape     – all 7,229 records, scrape + curation fields, include col
 *   2. POS Data        – all 7,229 records, POS fields only
 *   3. Reconciled      – all 7,229 records, full pre-conversion schema
 *   4. Final Included  – 1,391 records (included=true), full schema
 *   5. Groupr Version  – 1,391 records, Groupr-ready with derived fields
 *
 * Run: node scripts/main/export-xlsx.js
 */

const ExcelJS = require('exceljs');
const fs      = require('fs');
const path    = require('path');

const ROOT    = path.join(__dirname, '..', '..');
const IN      = path.join(ROOT, 'output/reconciled-catalog.json');
const OUT     = path.join(ROOT, 'output/groupr-catalog.xlsx');

console.log('Loading reconciled catalog...');
const records = JSON.parse(fs.readFileSync(IN));
console.log(`  ${records.length} records`);

// Slug → integer Category.id mapping (matches backend categories table).
// TODO: replace with slug-aware import once GRO-77X lands; see ticket.
const SLUG_TO_ID = {
  'produce': 1,
  'meat-seafood': 2,
  'pantry-staples': 3,
  'dairy-eggs': 4,
  'cereal-snacks': 5,
  'bread-bakery': 6,
  'beverages': 7,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function addSheet(wb, name, columns, rows) {
  const ws = wb.addWorksheet(name);

  ws.columns = columns.map(c => ({
    header: c.header,
    key:    c.key,
    width:  c.width || 18,
  }));

  // Style header row
  const headerRow = ws.getRow(1);
  headerRow.font      = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A56DB' } };
  headerRow.alignment = { vertical: 'middle' };
  headerRow.height    = 20;

  // Freeze header
  ws.views = [{ state: 'frozen', ySplit: 1 }];

  // Autofilter
  ws.autoFilter = {
    from: { row: 1, column: 1 },
    to:   { row: 1, column: columns.length },
  };

  // Add data rows
  for (const r of rows) {
    ws.addRow(columns.map(c => {
      const v = r[c.key];
      return v === undefined ? null : v;
    }));
  }

  console.log(`  Sheet "${name}": ${rows.length} rows, ${columns.length} cols`);
  return ws;
}

// ── Column definitions ─────────────────────────────────────────────────────────

const COLS_SCRAPE = [
  { key: 'upc',                   header: 'UPC',                    width: 16 },
  { key: 'instacart_id',          header: 'Instacart ID',           width: 24 },
  { key: 'instacart_product_id',  header: 'Product ID',             width: 14 },
  { key: 'name_en',               header: 'Name (EN)',              width: 40 },
  { key: 'brand',                 header: 'Brand',                  width: 20 },
  { key: 'size_string',           header: 'Size',                   width: 12 },
  { key: 'weight',                header: 'Weight',                 width: 10 },
  { key: 'weight_unit',           header: 'Weight Unit',            width: 12 },
  { key: 'instacart_price_string',header: 'IC Price String',        width: 18 },
  { key: 'instacart_price_cents', header: 'IC Price (¢)',           width: 14 },
  { key: 'sold_by',               header: 'Sold By',                width: 16 },
  { key: 'product_type',          header: 'Product Type',           width: 28 },
  { key: 'instacart_department',  header: 'IC Department',          width: 30 },
  { key: 'group_key',             header: 'Group Key',              width: 36 },
  { key: 'category_id',           header: 'Category ID',            width: 13 },
  { key: 'category_slug',         header: 'Category Slug',          width: 18 },
  { key: 'image_url',             header: 'Image URL',              width: 60 },
  { key: 'curation_score',        header: 'Curation Score',         width: 16 },
  { key: 'force_included',        header: 'Force Included',         width: 15 },
  { key: 'instacart_position',    header: 'IC Position',            width: 13 },
  { key: 'snap_popularity_rank',  header: 'SNAP Pop. Rank',         width: 16 },
  { key: 'included',              header: 'Included',               width: 11 },
  { key: 'last_scraped_at',       header: 'Last Scraped',           width: 14 },
];

const COLS_POS = [
  { key: 'upc',                         header: 'UPC',                      width: 16 },
  { key: 'name_en',                     header: 'Name (EN)',                width: 36 },
  { key: 'pos_description',             header: 'POS Description',          width: 24 },
  { key: 'pos_price_method',            header: 'Price Method (PM)',        width: 18 },
  { key: 'pos_raw_current_price_cents', header: 'Raw Current Price (¢)',    width: 22 },
  { key: 'pos_raw_regular_price_cents', header: 'Raw Regular Price (¢)',    width: 22 },
  { key: 'pos_current_price_cents',     header: 'Current Price (¢)',        width: 18 },
  { key: 'pos_regular_price_cents',     header: 'Regular Price (¢)',        width: 18 },
  { key: 'ebt_snap_eligible',           header: 'EBT/SNAP Eligible',        width: 18 },
  { key: 'wic_eligible',                header: 'WIC Eligible',             width: 14 },
  { key: 'is_taxable',                  header: 'Taxable',                  width: 11 },
  { key: 'pos_uom',                     header: 'UOM',                      width: 10 },
  { key: 'pos_unit_size',               header: 'Unit Size',                width: 12 },
  { key: 'pos_vendor_id',               header: 'Vendor ID',                width: 12 },
  { key: 'pos_export_date',             header: 'POS Export Date',          width: 16 },
];

const COLS_RECONCILED = [
  { key: 'upc',                         header: 'UPC',                      width: 16 },
  { key: 'instacart_id',                header: 'Instacart ID',             width: 24 },
  { key: 'name_en',                     header: 'Name (EN)',                width: 40 },
  { key: 'brand',                       header: 'Brand',                    width: 20 },
  { key: 'pos_description',             header: 'POS Description',          width: 24 },
  { key: 'instacart_price_string',      header: 'IC Price String',          width: 18 },
  { key: 'instacart_price_cents',       header: 'IC Price (¢)',             width: 14 },
  { key: 'pos_price_method',            header: 'Price Method (PM)',        width: 18 },
  { key: 'pos_raw_current_price_cents', header: 'Raw Current Price (¢)',    width: 22 },
  { key: 'pos_raw_regular_price_cents', header: 'Raw Regular Price (¢)',    width: 22 },
  { key: 'pos_current_price_cents',     header: 'Current Price (¢)',        width: 18 },
  { key: 'pos_regular_price_cents',     header: 'Regular Price (¢)',        width: 18 },
  { key: 'price_diff_cents',            header: 'Price Diff (¢)',           width: 15 },
  { key: 'price_source',                header: 'Price Source',             width: 14 },
  { key: 'price_variance_cents',        header: 'Price Variance (¢)',       width: 20 },
  { key: 'sold_by',                     header: 'Sold By',                  width: 16 },
  { key: 'ebt_snap_eligible',           header: 'EBT/SNAP Eligible',        width: 18 },
  { key: 'wic_eligible',                header: 'WIC Eligible',             width: 14 },
  { key: 'is_taxable',                  header: 'Taxable',                  width: 11 },
  { key: 'size_string',                 header: 'Size',                     width: 12 },
  { key: 'weight',                      header: 'Weight',                   width: 10 },
  { key: 'weight_unit',                 header: 'Weight Unit',              width: 12 },
  { key: 'pos_uom',                     header: 'UOM',                      width: 10 },
  { key: 'pos_unit_size',               header: 'Unit Size',                width: 12 },
  { key: 'product_type',                header: 'Product Type',             width: 28 },
  { key: 'instacart_department',        header: 'IC Department',            width: 30 },
  { key: 'group_key',                   header: 'Group Key',                width: 36 },
  { key: 'category_id',                 header: 'Category ID',              width: 13 },
  { key: 'category_slug',               header: 'Category Slug',            width: 18 },
  { key: 'curation_score',              header: 'Curation Score',           width: 16 },
  { key: 'force_included',              header: 'Force Included',           width: 15 },
  { key: 'instacart_position',          header: 'IC Position',              width: 13 },
  { key: 'snap_popularity_rank',        header: 'SNAP Pop. Rank',           width: 16 },
  { key: 'included',                    header: 'Included',                 width: 11 },
  { key: 'image_url',                   header: 'Image URL',                width: 60 },
  { key: 'pos_vendor_id',               header: 'Vendor ID',                width: 12 },
  { key: 'last_scraped_at',             header: 'Last Scraped',             width: 14 },
  { key: 'pos_export_date',             header: 'POS Export Date',          width: 16 },
];

// Groupr DB schema — matches generate-products-csv.js + groupr-snap-products.csv
// category_id uses slug (not numeric ID) per user preference
const COLS_GROUPR = [
  { key: 'category_id',            header: 'category_id',            width: 18 },
  { key: 'name_en',                header: 'name_en',                width: 40 },
  { key: 'name_es',                header: 'name_es',                width: 40 },
  { key: 'description_en',         header: 'description_en',         width: 30 },
  { key: 'description_es',         header: 'description_es',         width: 30 },
  { key: 'price_cents',            header: 'price_cents',            width: 13 },
  { key: 'stock',                  header: 'stock',                  width: 8  },
  { key: 'featured',               header: 'featured',               width: 10 },
  { key: 'weight',                 header: 'weight',                 width: 10 },
  { key: 'weight_unit',            header: 'weight_unit',            width: 13 },
  { key: 'weight_unit_plural_en',  header: 'weight_unit_plural_en',  width: 20 },
  { key: 'weight_unit_plural_es',  header: 'weight_unit_plural_es',  width: 20 },
  { key: 'on_sale',                header: 'on_sale',                width: 10 },
  { key: 'discount_price_cents',   header: 'discount_price_cents',   width: 20 },
  { key: 'ebt_snap_eligible',      header: 'ebt_snap_eligible',      width: 18 },
  { key: 'wic_eligible',           header: 'wic_eligible',           width: 14 },
  { key: 'is_taxable',             header: 'is_taxable',             width: 11 },
  { key: 'is_active',              header: 'is_active',              width: 10 },
  { key: 'provider_id',            header: 'provider_id',            width: 12 },
  { key: 'fallback_image_url',     header: 'fallback_image_url',     width: 60 },
  { key: 'brand',                  header: 'brand',                  width: 20 },
  { key: 'product_type',           header: 'product_type',           width: 28 },
  { key: 'group_key',              header: 'group_key',              width: 36 },
  { key: 'snap_popularity_rank',   header: 'snap_popularity_rank',   width: 20 },
  { key: 'upc',                    header: 'upc',                    width: 16 },
  { key: 'sold_by',                header: 'sold_by',                width: 16 },
  { key: 'pos_vendor_id',          header: 'pos_vendor_id',          width: 14 },
  { key: 'last_scraped_at',        header: 'last_scraped_at',        width: 16 },
  { key: 'pos_export_date',        header: 'pos_export_date',        width: 16 },
];

// Unit plural translations (from generate-products-csv.js)
const UNIT_TRANSLATIONS = {
  'oz':    { plural_en: 'oz',    plural_es: 'oz'  },
  'lb':    { plural_en: 'lbs',   plural_es: 'lbs' },
  'lbs':   { plural_en: 'lbs',   plural_es: 'lbs' },
  'fl oz': { plural_en: 'fl oz', plural_es: 'fl oz' },
  'gal':   { plural_en: 'gal',   plural_es: 'gal' },
  'ct':    { plural_en: 'ct',    plural_es: 'uds' },
  'count': { plural_en: 'count', plural_es: 'uds' },
  'ml':    { plural_en: 'ml',    plural_es: 'ml'  },
  'l':     { plural_en: 'l',     plural_es: 'l'   },
  'g':     { plural_en: 'g',     plural_es: 'g'   },
  'kg':    { plural_en: 'kg',    plural_es: 'kg'  },
  'pt':    { plural_en: 'pt',    plural_es: 'pt'  },
  'qt':    { plural_en: 'qt',    plural_es: 'qt'  },
};

// ── Build Groupr rows (mirrors generate-products-csv.js logic) ────────────────

function toGrouprRow(r) {
  const onSale = r.pos_current_price_cents != null &&
                 r.pos_regular_price_cents != null &&
                 r.pos_current_price_cents < r.pos_regular_price_cents;

  const priceCents         = r.pos_regular_price_cents  ?? r.instacart_price_cents ?? null;
  const discountPriceCents = onSale ? r.pos_current_price_cents : null;

  const unitInfo = r.weight_unit ? (UNIT_TRANSLATIONS[r.weight_unit] || null) : null;

  return {
    category_id:           SLUG_TO_ID[r.category_slug] || null,
    name_en:               r.name_en                  || null,
    name_es:               r.name_en                  || null,  // placeholder — no translation source
    description_en:        null,
    description_es:        null,
    price_cents:           priceCents,
    stock:                 0,
    featured:              false,
    weight:                r.weight,
    weight_unit:           r.weight_unit              || null,
    weight_unit_plural_en: unitInfo?.plural_en        || r.weight_unit || null,
    weight_unit_plural_es: unitInfo?.plural_es        || r.weight_unit || null,
    on_sale:               onSale,
    discount_price_cents:  discountPriceCents,
    ebt_snap_eligible:     r.ebt_snap_eligible,
    wic_eligible:          r.wic_eligible,
    is_taxable:            r.is_taxable,
    is_active:             true,
    provider_id:           1,
    fallback_image_url:    r.image_url                || null,
    brand:                 r.brand                    || null,
    product_type:          r.product_type             || null,
    group_key:             r.group_key                || null,
    snap_popularity_rank:  r.snap_popularity_rank,
    upc:                   r.upc                      || null,
    sold_by:               r.sold_by                  || null,
    pos_vendor_id:         r.pos_vendor_id            || null,
    last_scraped_at:       r.last_scraped_at,
    pos_export_date:       r.pos_export_date,
  };
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Groupr';
  wb.created = new Date();

  const included = records.filter(r => r.included && r.ebt_snap_eligible === true);
  console.log(`\nBuilding workbook...`);

  // Tab 1: Full Scrape
  addSheet(wb, 'Full Scrape', COLS_SCRAPE, records);

  // Tab 2: POS Data
  addSheet(wb, 'POS Data', COLS_POS, records);

  // Tab 3: Reconciled
  addSheet(wb, 'Reconciled', COLS_RECONCILED, records);

  // Tab 4: Final Included
  addSheet(wb, 'Final Included', COLS_RECONCILED, included);

  // Tab 5: Groupr Version
  addSheet(wb, 'Groupr Catalog', COLS_GROUPR, included.map(toGrouprRow));

  console.log(`\nWriting ${OUT}...`);
  await wb.xlsx.writeFile(OUT);
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
