# GRO-560: Implementation plan (all changes, certain)

Every file change, move, and delete. No code until you approve.

---

## Prerequisites

- **react-icons:** Already in `package.json` (`"react-icons": "^5.0.1"`). No install needed.
- **Scope:** Remove entire `frontend/public/images`; icons → `react-icons/md`; non-icon assets → move to `src/assets` and update refs; duplicates → use existing `src/assets` only.

---

## Part A: Create asset folders and move files (before code changes)

Create directories under `frontend/src/assets/` and move files from `public/images/` as follows. Paths are relative to `frontend/`.

### A.1 Categories (7 files — do not move `all-category-icon.svg`; use existing `allCategories.svg` for “all” and fallback)

| From (public/images/) | To (src/assets/) |
|-----------------------|-------------------|
| `categories/beverages-category-icon.svg` | `categories/beverages-category-icon.svg` |
| `categories/breads-bakery-category-icon.svg` | `categories/breads-bakery-category-icon.svg` |
| `categories/cereals-snacks-category-icon.svg` | `categories/cereals-snacks-category-icon.svg` |
| `categories/dairy-eggs-category-icon.svg` | `categories/dairy-eggs-category-icon.svg` |
| `categories/meat-seafood-category-icon.svg` | `categories/meat-seafood-category-icon.svg` |
| `categories/pantry-staples-category-icon.svg` | `categories/pantry-staples-category-icon.svg` |
| `categories/produce-category-icon.svg` | `categories/produce-category-icon.svg` |

- **Do not copy** `all-category-icon.svg` into assets. Code will use existing `src/assets/allCategories.svg` for the “All” strip item and for `getCategoryIconPath` fallback.

### A.2 Logo (1 file)

| From | To |
|------|-----|
| `public/images/logo/groupr-logo.svg` | `src/assets/logo/groupr-logo.svg` |

(No code currently references this path; move so we can delete `public/images`. If later we need it, refs will use the import.)

### A.3 Merchant (2 files)

| From | To |
|------|-----|
| `public/images/merchant/foodtown-logo.png` | `src/assets/merchant/foodtown-logo.png` |
| `public/images/merchant/foodtown-logo.svg` | `src/assets/merchant/foodtown-logo.svg` |

(MerchantInfo will import the PNG.)

### A.4 Products (all product PNGs)

| From | To |
|------|-----|
| `public/images/products/featured/assortment-bag-50.png` | `src/assets/products/featured/assortment-bag-50.png` |
| `public/images/products/featured/assortment-bag-75.png` | `src/assets/products/featured/assortment-bag-75.png` |
| `public/images/products/featured/assortment-bag-100.png` | `src/assets/products/featured/assortment-bag-100.png` |
| `public/images/products/meat-seafood/beef-hot-dogs-product.png` | `src/assets/products/meat-seafood/beef-hot-dogs-product.png` |
| `public/images/products/meat-seafood/jumbo-shrimp-product.png` | `src/assets/products/meat-seafood/jumbo-shrimp-product.png` |
| `public/images/products/meat-seafood/sliced-bacon-product.png` | `src/assets/products/meat-seafood/sliced-bacon-product.png` |
| `public/images/products/meat-seafood/vienna-sausages-product.png` | `src/assets/products/meat-seafood/vienna-sausages-product.png` |
| `public/images/products/produce/bananas-product.png` | `src/assets/products/produce/bananas-product.png` |
| `public/images/products/produce/green-seedless-grapes-product.png` | `src/assets/products/produce/green-seedless-grapes-product.png` |
| `public/images/products/produce/mandarin-oranges-product.png` | `src/assets/products/produce/mandarin-oranges-product.png` |
| `public/images/products/produce/red-apples-product.png` | `src/assets/products/produce/red-apples-product.png` |

### A.5 Social (5 files)

| From | To |
|------|-----|
| `public/images/social/facebook-icon.svg` | `src/assets/social/facebook-icon.svg` |
| `public/images/social/instagram-icon.svg` | `src/assets/social/instagram-icon.svg` |
| `public/images/social/linkedin-icon.svg` | `src/assets/social/linkedin-icon.svg` |
| `public/images/social/x-icon.svg` | `src/assets/social/x-icon.svg` |
| `public/images/social/youtube-icon.svg` | `src/assets/social/youtube-icon.svg` |

(No code references these; move so we can delete `public/images`.)

---

## Part B: Code changes (in dependency order)

### B.1 `src/pages/Catalog/constants/categoryConfig.ts`

**Current:** Uses string paths `'/images/categories/all-category-icon.svg'` and `'/images/categories/${slug}-category-icon.svg'`.

**Change:**

1. Add imports at top (path from `src/pages/Catalog/constants/` to `src/assets/` = `../../../assets/`):
   - `import allCategoriesIcon from '../../../assets/allCategories.svg';`
   - `import beveragesIcon from '../../../assets/categories/beverages-category-icon.svg';`
   - `import breadsBakeryIcon from '../../../assets/categories/breads-bakery-category-icon.svg';`
   - `import cerealsSnacksIcon from '../../../assets/categories/cereals-snacks-category-icon.svg';`
   - `import dairyEggsIcon from '../../../assets/categories/dairy-eggs-category-icon.svg';`
   - `import meatSeafoodIcon from '../../../assets/categories/meat-seafood-category-icon.svg';`
   - `import pantryStaplesIcon from '../../../assets/categories/pantry-staples-category-icon.svg';`
   - `import produceIcon from '../../../assets/categories/produce-category-icon.svg';`

2. Add a constant map (slug → imported URL):
   ```ts
   const CATEGORY_ICONS: Record<string, string> = {
     'beverages': beveragesIcon,
     'breads-bakery': breadsBakeryIcon,
     'cereals-snacks': cerealsSnacksIcon,
     'dairy-eggs': dairyEggsIcon,
     'meat-seafood': meatSeafoodIcon,
     'pantry-staples': pantryStaplesIcon,
     'produce': produceIcon,
   };
   ```

3. Remove `FALLBACK_CATEGORY_ICON` string constant.

4. Change `getCategoryIconPath(keyword: string): string` to:
   - `const slug = (keyword ?? '').trim();`
   - `if (!slug) return allCategoriesIcon;`
   - `return CATEGORY_ICONS[slug] ?? allCategoriesIcon;`

---

### B.2 `src/pages/Catalog/Components/CategoryStrip.tsx`

**Current:** Line ~50: `image_url: '/images/categories/all-category-icon.svg'`. Lines ~129 and ~172: `<img src="/images/icons/dropdown-icon.svg" ... />`.

**Change:**

1. Add imports:
   - `import { MdExpandMore } from 'react-icons/md';`
   - `import allCategoriesIcon from '../../../assets/allCategories.svg';`

2. In `ALL_CATEGORY`, set `image_url: allCategoriesIcon` (replace the string path).

3. Replace the first dropdown `<img>` (scroll left button, ~line 129):
   - From: `<img src="/images/icons/dropdown-icon.svg" alt="" className="w-10 h-10 rotate-90" />`
   - To: `<MdExpandMore className="w-10 h-10 rotate-90" aria-hidden />` (wrap in a span or use as component; Chakra Icon usage: `<Icon as={MdExpandMore} className="w-10 h-10 rotate-90" aria-hidden />` if using Chakra, or plain `<MdExpandMore className="..." aria-hidden />` since react-icons exports components).

4. Replace the second dropdown `<img>` (scroll right button, ~line 172):
   - From: `<img src="/images/icons/dropdown-icon.svg" alt="" className="w-10 h-10 -rotate-90" />`
   - To: `<MdExpandMore className="w-10 h-10 -rotate-90" aria-hidden />`

(No other changes in this file; `buildStripItemsFromApi` already uses `getCategoryIconPath(category.keyword)`, which will now return asset URLs.)

---

### B.3 `src/common/products/CategorySection/Components/CategoryProductsModal.tsx`

**Current:** Lines ~236, ~245, ~252: `<img src="/images/icons/chevron-left.svg" ... />`, `chevron-right.svg`, `search-icon.svg`.

**Change:**

1. Add: `import { MdChevronLeft, MdChevronRight, MdSearch } from 'react-icons/md';`

2. Replace ~line 236: `<img src="/images/icons/chevron-left.svg" alt="" className="w-4 h-4" aria-hidden />` → `<MdChevronLeft className="w-4 h-4" aria-hidden />`

3. Replace ~line 245: `<img src="/images/icons/chevron-right.svg" ... />` → `<MdChevronRight className="w-4 h-4" aria-hidden />`

4. Replace ~line 252: `<img src="/images/icons/search-icon.svg" ... />` → `<MdSearch className="w-4 h-4" aria-hidden />`

---

### B.4 `src/pages/Catalog/Components/Pagination.tsx`

**Current:** Lines 37, 47, 80, 91: four `<img src="/images/icons/...">` (double-chevron-left, chevron-left, chevron-right, double-chevron-right).

**Change:**

1. Add: `import { MdFirstPage, MdChevronLeft, MdChevronRight, MdLastPage } from 'react-icons/md';`

2. Line ~37: `<img src="/images/icons/double-chevron-left.svg" alt="" className="w-5 h-5" aria-hidden />` → `<MdFirstPage className="w-5 h-5" aria-hidden />`

3. Line ~47: `<img src="/images/icons/chevron-left.svg" ... />` → `<MdChevronLeft className="w-5 h-5" aria-hidden />`

4. Line ~80: `<img src="/images/icons/chevron-right.svg" ... />` → `<MdChevronRight className="w-5 h-5" aria-hidden />`

5. Line ~91: `<img src="/images/icons/double-chevron-right.svg" ... />` → `<MdLastPage className="w-5 h-5" aria-hidden />`

---

### B.5 `src/pages/Catalog/Components/PromoBanner.tsx`

**Current:** Line ~26: `<img src="/images/icons/close-icon.svg" alt="" className="w-6 h-6" />`.

**Change:**

1. Add: `import { MdClose } from 'react-icons/md';`

2. Replace the img with: `<MdClose className="w-6 h-6" aria-hidden />`

---

### B.6 `src/pages/Catalog/Components/HeroSearch.tsx`

**Current:** Line ~48: `<img src="/images/icons/search-icon.svg" alt="" className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden />`.

**Change:**

1. Add: `import { MdSearch } from 'react-icons/md';`

2. Replace the img with: `<MdSearch className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden />`

---

### B.7 `src/pages/Catalog/CategorizedProducts.tsx`

**Current:** Lines ~136, ~145: `<img src="/images/icons/chevron-left.svg" ... />`, `chevron-right.svg`.

**Change:**

1. Add: `import { MdChevronLeft, MdChevronRight } from 'react-icons/md';`

2. Replace both img tags with `<MdChevronLeft className="w-4 h-4" aria-hidden />` and `<MdChevronRight className="w-4 h-4" aria-hidden />`.

---

### B.8 `src/common/products/ProductCard.tsx`

**Current:** Lines ~106–111: `<img src="/images/icons/add-to-cart-icon.svg" alt="" className="w-4 h-4 md:w-5 md:h-5" />`.

**Change:**

1. Add: `import { MdAddShoppingCart } from 'react-icons/md';` (or `MdAdd` per ticket; use `MdAddShoppingCart` for clarity).

2. Replace the img with: `<MdAddShoppingCart className="w-4 h-4 md:w-5 md:h-5" aria-hidden />` (preserve size classes).

---

### B.9 `src/common/products/CategorySection/index.tsx`

**Current:** Lines ~115, ~124: `<img src="/images/icons/chevron-left.svg" ... />`, `chevron-right.svg`.

**Change:**

1. Add: `import { MdChevronLeft, MdChevronRight } from 'react-icons/md';`

2. Replace both with: `<MdChevronLeft className="w-4 h-4" aria-hidden />`, `<MdChevronRight className="w-4 h-4" aria-hidden />`.

---

### B.10 `src/pages/Catalog/Components/MerchantInfo.tsx`

**Current:** Line ~8: `src="/images/merchant/foodtown-logo.png"`.

**Change:**

1. Add at top: `import foodtownLogo from '../../../assets/merchant/foodtown-logo.png';` (path from `src/pages/Catalog/Components/` to `src/assets/merchant/` = `../../../assets/merchant/foodtown-logo.png`).

2. Replace `src="/images/merchant/foodtown-logo.png"` with `src={foodtownLogo}`.

---

## Part C: Delete `frontend/public/images`

After all moves and code changes are done and verified:

1. Delete the entire directory: `frontend/public/images/` (all subfolders and files: categories, icons, logo, merchant, products, social).
2. Do **not** delete `frontend/public/` itself if it still contains `logo.svg` (favicon) or other root files; only remove `public/images/`.
3. Confirm no remaining references to `/images/` or `public/images` in the frontend source (grep).

---

## Part D: Verification

- Grep for `/images/` in `frontend/src`: must return no matches.
- Build: `npm run build` (or `vite build`) succeeds.
- Tests: `npm test` (or `vitest run`) pass.
- Manual check: Catalog page, category strip, pagination, HeroSearch, ProductCard add-to-cart, CategoryProductsModal chevrons/search, CategorizedProducts chevrons, MerchantInfo logo, PromoBanner close. Icons and images render; sizes and alignment match previous behavior.

---

## Summary table

| # | File | Action |
|---|------|--------|
| A.1–A.5 | — | Create `src/assets/categories`, `logo`, `merchant`, `products/*`, `social`; move listed files from `public/images` into assets. |
| B.1 | categoryConfig.ts | Imports for 7 category SVGs + allCategories; map; getCategoryIconPath returns imports. |
| B.2 | CategoryStrip.tsx | allCategories import; ALL_CATEGORY.image_url = allCategoriesIcon; two dropdown img → MdExpandMore. |
| B.3 | CategoryProductsModal.tsx | MdChevronLeft, MdChevronRight, MdSearch replace 3 imgs. |
| B.4 | Pagination.tsx | MdFirstPage, MdChevronLeft, MdChevronRight, MdLastPage replace 4 imgs. |
| B.5 | PromoBanner.tsx | MdClose replaces 1 img. |
| B.6 | HeroSearch.tsx | MdSearch replaces 1 img. |
| B.7 | CategorizedProducts.tsx | MdChevronLeft, MdChevronRight replace 2 imgs. |
| B.8 | ProductCard.tsx | MdAddShoppingCart replaces 1 img. |
| B.9 | CategorySection/index.tsx | MdChevronLeft, MdChevronRight replace 2 imgs. |
| B.10 | MerchantInfo.tsx | Import foodtown-logo.png; src={foodtownLogo}. |
| C | — | Delete `frontend/public/images/` entirely. |
| D | — | Grep, build, test, manual checks. |

---

## Order of execution

1. **Part A** — Create folders and move files (so imports resolve when we add them).
2. **Part B** — Apply code changes in the order B.1 → B.10 (categoryConfig first so strip and others get correct icon URLs; then each component).
3. **Part C** — Delete `public/images`.
4. **Part D** — Verify.

No other files reference `public/images` (only the ones listed in Part B). This plan is complete and certain for GRO-560.
