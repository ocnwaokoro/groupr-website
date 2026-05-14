# GRO-766 — Categorize + Audit pipeline step

This directory is a git-tracked mirror of files that live under
`devenv-main/scraper/` in the local dev environment. `devenv-main/` is
gitignored in this repo (same pattern as GRO-705), so tracked copies live
here for PR review.

## What's in this ticket

A new, idempotent, re-runnable pipeline step that runs after `reconcile.js`
and before any backend catalog import. It:

1. Fills in `category_slug` for products that `reconcile.js` left null by
   inferring from brand + keyword rules. Before this change, 142 of the
   1,392 Groupr-ready products had `category_slug = null`, which caused the
   backend rake task to silently drop ~10% of SKUs at import time.
2. Applies audit exclusion rules (alcohol, tobacco, gift cards, pet food,
   hot-prepared foods) so non-grocery items (e.g. "Angry Orchard Crisp Apple
   Hard Cider") get tagged `audit_action: "exclude"` and can be dropped by
   the import step.

## Files

| Tracked copy (here)                        | Lives at (in dev env)                                         |
|--------------------------------------------|---------------------------------------------------------------|
| `scripts/main/categorize-and-audit.js`     | `devenv-main/scraper/scripts/main/categorize-and-audit.js`    |
| `scripts/main/__tests__/categorize-and-audit.test.js` | `devenv-main/scraper/scripts/main/__tests__/categorize-and-audit.test.js` |
| `categorization-rules.yaml`                | `devenv-main/scraper/categorization-rules.yaml`               |
| `categorization-audit.md`                  | `devenv-main/scraper/output/categorization-audit.md` (latest output) |

When adjusting rules, edit the real file under `devenv-main/scraper/` and
copy it into this folder as part of the same commit.

## Run

```bash
cd devenv-main/scraper
node scripts/main/categorize-and-audit.js             # writes
node scripts/main/categorize-and-audit.js --dry-run   # preview
npm test                                              # runs the test file
```

## Verification snapshot (run against real catalog on 2026-04-14)

- Input: 7,229 reconciled records
- Already had slug (reconcile source): 7,010
- Slug inferred from rules: 219
- Still null — needs manual review: **0**
- Audit exclusions: 3 (all alcohol — Angry Orchard, Flying Embers, Hudson North)
- Idempotent: second run produces byte-identical `reconciled-catalog.json`
- Tests: 12/12 passing

See `categorization-audit.md` in this directory for the full report.
