# GRO-766: Catalog translation + CSV import readiness

Tracked artifacts from the catalog-translation pass done 2026-04-14/15.

## What's in here

- **`output/groupr-snap-products.csv`** — 1,354 Groupr-ready products with integer
  `category_id` (1–7), real Spanish names, real Spanish + English descriptions.
  Ready to `rails products:import FILE=… PROVIDER_ID=1`.
- **`output/master-translations.json`** — 7,264 products translated
  (full catalog foundation, 99.99% coverage). Used as the source when the
  curated catalog grows past the current 1,354.
- **`protected_brands.json`** — 231 non-translatable brand names consumed by the
  translation pipeline. Mirror of `devenv-main/backend/config/protected_brands.json`
  (see backend PR #258 / GRO-770).
- **`scripts/curate-snap-catalog.js`** — emits integer `category_id` in the CSV
  (was emitting slugs; broke `products:import`).
- **`scripts/export-xlsx.js`** — adds a slug→id map so the "Groupr Catalog"
  XLSX sheet matches backend expectations. Temporary workaround until GRO-771
  teaches the backend to accept slugs directly.

## Pipeline summary

1. `reconcile.js` — merges Instacart scrape with Foodtown POS export.
2. `categorize-and-audit.js` — assigns `category_slug` to null-slug rows,
   flags alcohol / baby food / ice cream / non-food for exclusion. Output
   mutated back into `reconciled-catalog.json`. (Added on branch
   `obinna/gro-766-categorize-and-audit`, PR #2.)
3. **Translation** (this ticket) — 7,264 products translated to
   Caribbean/Dominican Spanish with brand-name preservation via
   `protected_brands.json`. Round 1 (1,354 Groupr-ready) used per-product
   LLM translation with natural phrasing. Round 2 (5,910 foundation) used
   rule-based translators with templated descriptions — correct, brand-safe,
   but mechanical. Flag rounds-2 products for re-translation before ever
   promoting them into the shipping catalog.
4. `export-xlsx.js` — writes the final XLSX workbook.
5. A thin CSV generator in `/tmp/generate-final-csv.js` writes the
   shipping CSV from `reconciled-catalog.json` (includes `audit_action` exclusions).

## Verification

Final brand-preservation pass against the 231-brand protected list:

| Check | Value |
|---|---|
| Total products translated | 7,264 of 7,265 |
| Empty fields | 0 |
| Brand-preservation violations | 7 (likely false positives — "Tang" inside "Tangerine", etc.) |

## Follow-ups

- **GRO-771** (Rene) — accept slug-based `category_id` in backend import tasks.
  Removes the hardcoded `SLUG_TO_ID` map in the scraper scripts.
- **Brand list curation pass** — catalog has ~1,233 distinct brands; 231 are
  currently protected. A future pass should triage the 598 brands with ≥2
  products to split true brands from descriptors.
- **Round-2 translation refresh** — re-translate any round-2 product via
  per-product LLM before it ships to customers (current round-2 translations
  are correct but mechanical).
