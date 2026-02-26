# GRO-560: Resolution process

Record of Steps 1–8 for **Assets clean-up** (remove `public/images`, icons → react-icons/md, non-icon assets → `src/assets` with subfolders).

---

## Step 1: Identify the ticket and goal

- **Ticket:** GRO-560 (Assets clean-up).
- **Goal in one sentence:** Remove the entire `frontend/public/images` tree; replace icon usage with Material Design icons from `react-icons/md`; move non-icon assets into `src/assets` with a clear subfolder convention and update all references.

---

## Step 2: Analyze the system

- **Backend:** Not applicable (frontend-only).
- **Frontend:** Audited `public/images` (categories, icons, logo, merchant, products, social) and `src/assets` (flat files, mixed naming). Mapped where each asset was used.
- **Gap:** Icons were file-based under `/images/icons/`; category/logo/merchant/product/social assets lived in public; `src/assets` was flat and mixed with unused files.

**Artifacts:**  
- `docs/GRO-560-assets-clean-up-report.md`  
- `docs/GRO-560-assets-clean-up-analysis.md`  
- `docs/GRO-560-assets-audit.md`  
- `docs/SRC_ASSETS_USAGE_MAP.md` (used-in-code vs unused)

---

## Step 3: Align on scope

- **Will:** Delete `public/images`; replace all `/images/icons/` with `react-icons/md`; move non-icon assets to `src/assets` in subfolders (categories, logo, merchant, payments, landing, placeholders, products, social); delete 19 unused flat assets; reorganize 20 used flat assets into subfolders with kebab-case; use kebab-case for all asset filenames.
- **Won’t:** No backend changes; no new API calls; no change to category slug/API behavior (GRO-559).

**Artifact:** `docs/GRO-560-aligned-scope.md`

---

## Step 4: Plan exact changes (no code yet)

- File-by-file plan: create subfolders, move public → assets, move/rename flat assets, update every import, categoryConfig (imports + map), Md icons in 8 components, MerchantInfo import.
- Order: delete unused → create subfolders + move all assets → update imports + categoryConfig + Md icons + MerchantInfo → delete `public/images` → verify.

**Artifacts:**  
- `docs/GRO-560-implementation-plan.md`  
- `docs/ASSETS_SUBFOLDER_CONVENTION.md`  
- `docs/ASSETS_EXECUTION_ORDER.md`

---

## Step 5: Confirm before coding

- User confirmed scope and subfolder convention; requested execution (“Execute!”).

---

## Step 6: Implement

- **Step 1:** Deleted 19 unused assets from `src/assets/`.
- **Step 2:** Created subfolders; copied `public/images` (except all-category-icon.svg and icons/) into `src/assets`; moved and renamed 20 flat assets into subfolders (kebab-case).
- **Step 3:** Updated all asset imports in 20 files; rewrote `categoryConfig.ts` (imports + CATEGORY_ICONS map + getCategoryIconPath); replaced `/images/icons/` with Md* in CategoryStrip, CategoryProductsModal, Pagination, PromoBanner, HeroSearch, CategorizedProducts, ProductCard, CategorySection; MerchantInfo imports `foodtown-logo.png` from `assets/merchant/`.
- **Step 4:** Deleted `frontend/public/images/`.
- **Step 5:** Verified: no `/images/` refs in src; `tsc -b` passes; no new lint errors. (Full `npm run build` / tests failed on existing Rollup optional-dependency issue, not this change.)

---

## Step 7: Cleanup and verify

- No remaining references to `/images/`, `REFERENCE_CATEGORY_ORDER`, or `all-category-icon.svg`.
- TypeScript and linter clean. Manual verification: catalog (strip, modal, pagination, search), landing, modals, merchant block, nav/footer recommended before merge.

---

## Step 8: Document the resolution

- This document (`docs/GRO-560-resolution-process.md`) completes Step 8.

---

## Artifacts created for GRO-560

| Document | Purpose |
|----------|---------|
| `GRO-560-assets-clean-up-report.md` | Initial report |
| `GRO-560-assets-clean-up-analysis.md` | Deeper analysis |
| `GRO-560-assets-audit.md` | Asset audit |
| `GRO-560-aligned-scope.md` | Agreed scope (C + B override) |
| `GRO-560-implementation-plan.md` | File-by-file implementation plan |
| `ASSETS_SUBFOLDER_CONVENTION.md` | Subfolder and naming convention |
| `ASSETS_EXECUTION_ORDER.md` | Execution order + import map |
| `SRC_ASSETS_USAGE_MAP.md` | Used vs unused assets (pre-cleanup) |
| `GRO-560-resolution-process.md` | This resolution process |

---

## Commit and PR (batch branch)

- **Branch:** `021026-bugfixes` (frontend).
- **Commit message (one commit for GRO-560):**  
  `GRO-560 Assets clean-up: remove public/images, Md icons, src/assets subfolders`
- **PR:** From `021026-bugfixes` into `staging`; in the PR description reference GRO-560 and link to this resolution process if useful.

When starting the next ticket, begin at **Step 1** with the new ticket.
