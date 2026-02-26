# GRO-560: Aligned scope (C = ticket; B overridden)

**Rule:** Follow **B** (remove unused + consolidate) but **override with C** (what the ticket wants precisely). The ticket is the source of truth.

---

## What the ticket wants precisely (C)

### 1. Remove entire `frontend/public/images`

- **Delete** the full tree under `frontend/public/images` (categories, icons, logo, merchant, products, social) that came from commit `99b4933332520c7ce70b5df4a63b1e9883ed52a9`.
- After migration, **no files or folders** remain under `frontend/public/images`.
- **No code** may reference `/images/...` or `public/images` for those assets.

### 2. Icons: replace with Material Design React Icons (no image files)

- **Do not** move icon SVGs to `src/assets`.
- **Replace** every use of `public/images/icons/*` with the corresponding component from **`react-icons/md`** (e.g. `MdChevronLeft`, `MdChevronRight`, `MdSearch`, `MdClose`, `MdAdd` / `MdAddShoppingCart`, `MdExpandMore`, `MdFirstPage`, `MdLastPage`).
- Preserve layout and a11y: same size classes (`w-4 h-4`, `w-5 h-5`, `w-6 h-6`, `w-10 h-10`), `aria-hidden` where present, `aria-label` on icon-only buttons if needed.

**Files to update for icons (all listed in ticket):**

- CategoryStrip.tsx — dropdown → MdExpandMore (with rotation)
- CategoryProductsModal.tsx — chevron-left/right, search → MdChevronLeft, MdChevronRight, MdSearch
- Pagination.tsx — double-chevron-left, chevron-left/right, double-chevron-right → MdFirstPage, MdChevronLeft, MdChevronRight, MdLastPage
- PromoBanner.tsx — close → MdClose
- HeroSearch.tsx — search → MdSearch
- CategorizedProducts.tsx — chevron-left/right → MdChevronLeft, MdChevronRight
- ProductCard.tsx — add-to-cart → MdAdd or MdAddShoppingCart
- CategorySection/index.tsx — chevron-left/right → MdChevronLeft, MdChevronRight

### 3. Duplicates vs `src/assets`

- For each file under `public/images` (non-icon): if the **same or equivalent** asset already exists in `src/assets`, treat the public copy as **duplicate**.
- **Remove** the public copy (as part of deleting `public/images`).
- **Update** code to use the **existing** asset import from `src/assets` (no second copy).
- Example: `public/images/categories/all-category-icon.svg` vs `src/assets/allCategories.svg` — if equivalent, CategoryStrip / categoryConfig use `allCategories.svg` import; public copy is removed.

### 4. New files (not in `src/assets`): move and update refs

- Any file under `public/images` that is **not** a duplicate must be **moved** into `frontend/src/assets` (e.g. `assets/categories/`, `assets/merchant/`, `assets/products/`, `assets/social/`, `assets/logo/`).
- **Update** all references to use **asset imports** (e.g. `import x from '../assets/merchant/foodtown-logo.png'`).
- After migration, **no** references to `/images/...` for these assets.

**Non-icon references to update:**

- **categoryConfig.ts** — `/images/categories/*` (fallback + dynamic slug path) → imports from `src/assets/categories/` (or reuse existing like `allCategories.svg` where duplicate).
- **CategoryStrip.tsx** — `all-category-icon.svg` → asset import (or existing `allCategories.svg` if duplicate).
- **MerchantInfo.tsx** — `/images/merchant/foodtown-logo.png` → asset import from `src/assets/merchant/` (or equivalent).
- Any other references to `public/images` (logo, products, social) → asset imports.

### 5. Final state

- **Entire** `frontend/public/images` **removed**.
- **Icons:** All former icon paths replaced with `react-icons/md` components; no icon image files.
- **Non-icon assets:** Only in `src/assets`; all refs use imports; no `/images/...` for categories, logo, merchant, products, social.
- **Duplicates:** Only one copy of each asset (in `src/assets`); code uses that import.
- **Build and tests pass;** visual and behavioral parity (size, rotation, alignment, a11y).

---

## B vs C (what we’re not doing in this ticket)

- **B** said “remove unused + consolidate.” The ticket (C) is **narrower**: it targets **only** assets under `frontend/public/images` from that specific commit. It does **not** require a separate pass to delete the 20 unused files in `src/assets` we found in the audit.
- So for GRO-560 we **do not** delete `cerealCategory.svg`, `react.svg`, `shrimp.png`, etc. from `src/assets` unless we need to as part of duplicate handling. That can be a separate cleanup later if you want.

---

## Summary in one sentence

**Remove the entire `public/images` tree from that commit: replace icon usages with `react-icons/md`, treat duplicates with `src/assets` by using existing imports, move any remaining non-duplicate files into `src/assets` and update all references; then delete `frontend/public/images` and ensure no code references it.**

---

## Next step

**Step 4: Plan exact changes** — File-by-file list of edits (which files to change, which to move, which icons to swap, then delete `public/images`). No code until you confirm the plan.
