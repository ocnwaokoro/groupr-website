# Scraping & Curation Runbook

Step-by-step guide for extracting and curating a SNAP-eligible product catalog from an Instacart white-label storefront.

---

## Prerequisites

```bash
cd devenv-main/scraper
npm install          # puppeteer, js-yaml, pg
```

- **Node.js 18+** required
- **Chrome/Chromium** is installed automatically by Puppeteer
- For search-based scraping: must use headed browser (`headless: false`) — Instacart blocks headless search

## Files

| File | Purpose |
|------|---------|
| `config.yaml` | Store config: slug, shopId, zone, postal, API hashes |
| `curation-config.yaml` | Curation rules: brand lists, limits, force-includes, scoring |
| `categorization-rules.yaml` | Category-slug inference + audit exclusions (used by `categorize-and-audit.js`) |
| `scripts/main/run-full-catalog.js` | Extract full catalog (Tier 1 + Tier 2 + Tier 3) |
| `scripts/main/curate-snap-catalog.js` | Curate SNAP catalog from raw extraction |
| `scripts/main/reconcile.js` | Join curated + POS data → `output/reconciled-catalog.json` |
| `scripts/main/categorize-and-audit.js` | Fill missing category slugs + tag audit exclusions (idempotent) |
| `scripts/explore/auto-explore-departments.js` | Discover GraphQL hashes and department slugs |
| `scripts/utility/capture-zone-postal.js` | Capture zoneId and postalCode from network |
| `scripts/search-intercept.js` | Search-based product discovery (headed browser) |
| `output/full-catalog.json` | Raw extracted catalog |
| `output/groupr-snap-catalog.json` | Curated SNAP catalog |
| `output/groupr-snap-products.csv` | Groupr-compatible CSV |

---

## Full Pipeline

### Step 1: Configure the store

Edit `config.yaml`:

```yaml
store:
  slug: foodtown-bff-food-corp
  shopId: 761204
  storefront_url: https://shop.foodtown.com/store/foodtown-bff-food-corp/storefront
  zone_id: "374"
  postal_code: "11361"
```

**For a new store:** Run the zone/postal capture utility first:

```bash
node scripts/utility/capture-zone-postal.js
# Opens browser → navigate to store → script captures zone_id and postal_code
```

### Step 2: Discover GraphQL hashes

Instacart uses persisted GraphQL queries identified by SHA256 hashes. These hashes change when Instacart deploys new code (roughly every 1-2 weeks).

```bash
node scripts/explore/auto-explore-departments.js
```

This opens a browser, navigates through departments, and captures:
- `CollectionProductsWithFeaturedProducts` hash
- `Items` hash
- Department slugs

Update the hashes in `config.yaml`:

```yaml
hashes:
  collectionProducts: "<captured hash>"
  items: "<captured hash>"
```

**If you skip this step**, the script uses the last known hashes (hardcoded as fallbacks). They'll work until Instacart deploys.

### Step 3: Extract the catalog

```bash
node scripts/main/run-full-catalog.js
```

This fetches products in three tiers:
1. **Tier 1 — Department collections** (15 departments, ~7,000 products)
2. **Tier 2 — Sub-collections** (~90 sub-collections within departments). Products may exist ONLY in sub-collections, not the parent. This is how fresh apples were missing in the first pass.
3. **Tier 3 — Search-discovered items** (auto-merged from `output/search-discovered-items.json` if it exists)

Output: `output/full-catalog.json`

**Options:**
- `--departments-only` — skip sub-collections (faster, but may miss products)
- `--sub-collections-only` — only fetch sub-collections (useful if departments were already fetched)

**Expected runtime:** 15-25 minutes for full extraction (departments + sub-collections)

### Step 4: Search-based gap filling (optional)

For products that aren't in any department or sub-collection (Tier 3 orphans):

```bash
node scripts/search-intercept.js
```

This runs targeted search terms in a headed browser and captures results. Output goes to `output/search-discovered-items.json`, which is auto-merged on the next `run-full-catalog.js` run.

**When to do this:** After the first extraction, spot-check for missing staples. If a product exists on the site (you can find it via URL) but isn't in the catalog, it's a search-only orphan.

**Important:** Search requires `headless: false`. The URL format is `/store/{slug}/search/{term}` (NOT `?query={term}`).

### Step 5: Curate the catalog

```bash
node scripts/main/curate-snap-catalog.js
```

Reads `output/full-catalog.json` and applies:
- Sub-category exclusions (non-SNAP, mixers, ice cream, etc.)
- Department exclusions (prepared foods)
- Glass bottle filter, energy drink filter
- SNAP-optimized scoring: `price(40) + whitelist(30) + position(10-20) + blacklist(-20)`
- Per sub-category limits with brand caps (max 2 SKUs per brand, 3 for force-includes)
- Force-includes for critical staples

Output:
- `output/groupr-snap-catalog.json` — Full product data with curation scores
- `output/groupr-snap-products.csv` — Groupr-compatible CSV
- `GRO-705-catalog-scraping/curation/included.yaml` — What's in
- `GRO-705-catalog-scraping/curation/excluded.yaml` — What's out

### Step 6: Categorize + audit (post-reconcile, pre-import)

Runs after `reconcile.js` and before any backend import. Mutates
`output/reconciled-catalog.json` in place so that every product has a
`category_slug`, `category_source`, `audit_action`, and `audit_reason`.

```bash
node scripts/main/categorize-and-audit.js
# or to preview without writing:
node scripts/main/categorize-and-audit.js --dry-run
```

**Why this step exists**

Before this step, `reconcile.js` was leaving ~10% of Groupr-ready products with
`category_slug = null` because they arrived via search-discovery or POS-only
and were never associated with an Instacart department. The backend rake task
can't validate products without a category slug, so they were being silently
dropped at import time. On top of that, a handful of non-SNAP items (hard
cider, tobacco, etc.) were reaching the cart.

This step fixes both:
1. Fills in `category_slug` from name/brand rules in
   `categorization-rules.yaml`.
2. Tags every product with `audit_action: "keep" | "exclude"` and an
   `audit_reason` label so the import step can drop excluded SKUs.

**Outputs**

- Mutates `output/reconciled-catalog.json` (new fields on each record).
- Writes `output/categorization-audit.md` — a human-readable report showing
  how many products moved into each bucket, the top-20 samples per bucket,
  any remaining manual-review items, and all audit exclusions by label.

**Idempotency**

Running the script twice produces a byte-identical catalog (the report's
`Generated:` timestamp is the only thing that changes). Safe to re-run any
time rules are edited.

**Editing the rules**

All keyword, brand, override, and exclusion rules live in
`devenv-main/scraper/categorization-rules.yaml`. Keywords match as
case-insensitive whole phrases with optional `s` / `es` pluralization
(`\b<kw>(?:es|s)?\b`). Audit rules support an `overrides` list for SKUs that
contain an alcohol keyword but aren't actually alcohol (e.g. "Vodka Sauce",
"Non-Alcoholic Beer").

Re-run after any edit:

```bash
node scripts/main/categorize-and-audit.js
```

### Step 7: Verify staples

After curation, verify critical staples are present. The script logs force-include status. Spot-check:

```bash
node -e "
const c = require('./output/groupr-snap-catalog.json');
const checks = ['apple','rice','oatmeal','salt','pepper','flour','chicken','milk','egg','bread'];
checks.forEach(t => {
  const n = c.filter(p => new RegExp(t, 'i').test(p.name)).length;
  console.log((n > 0 ? 'OK' : 'MISSING') + ' ' + t + ' (' + n + ')');
});
console.log('Total: ' + c.length);
"
```

---

## Changing Curation Rules

All curation rules are in `curation-config.yaml`. No code changes needed for:

- **Adding/removing brands** from whitelist or blacklist
- **Changing sub-category limits** (how many products per category)
- **Adding force-includes** (guaranteed products)
- **Dropping sub-categories** (entire categories to exclude)
- **Adjusting scoring weights** (price vs brand vs position)

After editing, re-run: `node scripts/main/curate-snap-catalog.js`

---

## When Things Break

### "Empty results" or "Unknown operation" from GraphQL

**Cause:** Instacart deployed new code and the persisted query hashes changed.

**Fix:**
1. Run `node scripts/explore/auto-explore-departments.js`
2. Copy the new hashes to `config.yaml` under `hashes:`
3. Re-run extraction

### Missing products that exist on the site

**Cause:** Three possible tiers of product visibility on Instacart:

| Tier | Where | How to get |
|------|-------|------------|
| 1 | Department collection | `run-full-catalog.js` (departments) |
| 2 | Sub-collection only | `run-full-catalog.js` (sub-collections) |
| 3 | Search-only orphan | `search-intercept.js` → re-run `run-full-catalog.js` |

**Diagnosis:** If a product URL works (e.g., `/products/16551301-honeycrisp-apple-1-lb`) but it's not in the catalog:
1. Check if its department was scraped
2. Check if its sub-collection was scraped
3. If neither → it's a search-only orphan, add a search term

### Department structure changed

**Cause:** Instacart added/removed/renamed departments.

**Fix:** Run `auto-explore-departments.js`, compare discovered slugs with the list in `run-full-catalog.js`, update as needed.

### Curation dropped something it shouldn't have

**Diagnosis:** Check `GRO-705-catalog-scraping/curation/excluded.yaml` for the product and its exclusion reason.

**Fix options:**
1. Add a force-include entry in `curation-config.yaml`
2. Increase the sub-category limit
3. Add the brand to the whitelist

---

## Adding a New Store

1. Get the store's Instacart URL (e.g., `https://shop.newstore.com/store/newstore-slug/storefront`)
2. Run `capture-zone-postal.js`, navigate to the store, capture zone/postal
3. Update `config.yaml` with the new store details
4. Run `auto-explore-departments.js` to discover departments and hashes
5. Update department slugs in `run-full-catalog.js` (these vary by store)
6. Run the full pipeline (steps 3-6 above)
7. Review `curation-config.yaml` — brand lists and force-includes may need adjustment for the new store's inventory

---

## Architecture Notes

### Why three tiers?

Instacart's storefront is NOT a complete product database. Products have three levels of visibility:
- **Department collections** — browseable via department links, up to 1,000 per department
- **Sub-collections** — nested within departments, may contain items not in the parent
- **Search-only orphans** — exist on the site but aren't linked from any collection

Department scraping alone misses products. We discovered this when fresh apples (a top-5 produce item) were completely absent from 7,364 scraped products.

### Why headed browser for search?

Instacart blocks headless browsers for search queries specifically. Department GraphQL calls work fine in headless mode, but `/search/{term}` returns empty results without a visible browser window.

### Why price-first scoring?

Instacart's default ordering optimizes for their overall customer base (Bayside Queens, more affluent). This causes $15 premium burgers to rank above $5.99 ground beef. The price-first scoring formula corrects this affluent bias for SNAP families.
