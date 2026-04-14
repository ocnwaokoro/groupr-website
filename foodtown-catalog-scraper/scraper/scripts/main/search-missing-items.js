/**
 * search-missing-items.js
 *
 * Searches Instacart for specific missing products and saves discovered items.
 * Uses headed browser (search requires it) with the path-based URL format.
 *
 * Output: Appends to output/search-discovered-items.json
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.join(__dirname, '..', '..');
const cfg = yaml.load(fs.readFileSync(path.join(ROOT, 'config.yaml'), 'utf8'));
const STORE_SLUG = cfg.store.slug;
const BASE = `https://shop.foodtown.com/store/${STORE_SLUG}`;
const OUTPUT = path.join(ROOT, 'output', 'search-discovered-items.json');

const SEARCH_TERMS = [
  // Previously searched (keep for idempotency — already-discovered IDs are skipped)
  "martin's potato bread",
  'goya olive oil',
  '1% milk',
  'lowfat milk',
  'jimmy dean',
  'velveeta',
  'simply orange juice',
  'water 35 pack',
  'poland spring 24',
  'boars head cheese',
  'boars head american',
  'almond milk',

  // GRO-766: gap-fill from 2026-04-14 audit
  // Spices
  'paprika',
  'cumin ground',
  'chili powder mccormick',
  'italian seasoning badia',
  'bay leaves',
  'oregano whole',
  'garlic powder',
  'onion powder',

  // Produce staples
  'yellow onion',
  'roma tomato',
  'vine tomato',
  'beefsteak tomato',
  'grape tomato',

  // Frozen vegetables
  'frozen corn',
  'frozen peas',
  'frozen spinach',
  'frozen broccoli',
  'frozen green beans',
  'frozen mixed vegetables',
  'frozen cauliflower',
  'frozen carrots',
  'frozen brussels sprouts',

  // Ethnic / extras
  'kimchi',
  'sauerkraut fresh',
  'tofu',
  'edamame frozen',
];

const wait = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('=== Search Missing Items ===\n');

  // Load existing discovered items
  let existing = [];
  if (fs.existsSync(OUTPUT)) {
    existing = JSON.parse(fs.readFileSync(OUTPUT, 'utf8'));
  }
  const existingIds = new Set(existing.map(i => i.id));
  console.log(`Existing discovered items: ${existing.length}\n`);

  const browser = await puppeteer.launch({
    headless: false, // must be headed for search
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // Establish session
  console.log('Establishing session...');
  await page.goto(`${BASE}/storefront`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await wait(3000);

  let totalNew = 0;

  for (const term of SEARCH_TERMS) {
    console.log(`\n--- Searching: "${term}" ---`);
    const searchUrl = `${BASE}/search/${encodeURIComponent(term)}`;

    // Capture Items responses
    const items = [];
    const handler = async (response) => {
      const url = response.url();
      if (!url.includes('graphql')) return;
      const urlObj = new URL(url);
      const op = urlObj.searchParams.get('operationName');
      if (op !== 'Items' && op !== 'SearchResultsPlacements') return;

      try {
        const body = await response.json();
        const responseItems = body?.data?.items || [];
        if (responseItems.length > 0) {
          items.push(...responseItems);
        }
        // Also check search placements
        const placements = body?.data?.searchResultsPlacements?.placements || [];
        placements.forEach(p => {
          const placed = p?.items || p?.products || [];
          if (placed.length > 0) items.push(...placed);
        });
      } catch (e) {}
    };

    page.on('response', handler);

    try {
      await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 20000 });
    } catch (e) {
      // timeout ok
    }
    await wait(3000);

    // Scroll for more
    await page.evaluate(() => window.scrollBy(0, 2000));
    await wait(2000);

    page.off('response', handler);

    // Deduplicate and count new
    let newCount = 0;
    for (const item of items) {
      if (!item?.id || existingIds.has(item.id)) continue;
      existingIds.add(item.id);
      existing.push({ ...item, _source: 'search', _searchTerm: term });
      newCount++;
    }
    totalNew += newCount;
    console.log(`  Found ${items.length} items, ${newCount} new`);

    // Incremental save after each term so partial progress is preserved
    // if the browser crashes mid-run (GRO-766: detached-frame errors observed).
    fs.writeFileSync(OUTPUT, JSON.stringify(existing, null, 2));

    await wait(2000); // rate limit
  }

  await browser.close();

  // Save
  fs.writeFileSync(OUTPUT, JSON.stringify(existing, null, 2));
  console.log(`\n=== Done ===`);
  console.log(`New items found: ${totalNew}`);
  console.log(`Total discovered items: ${existing.length}`);
  console.log(`Output: ${OUTPUT}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
