# GRO-559: Exact implementation plan — Map backend categories to frontend (icons, names, URL)

This document lists every file change and the exact edits so the implementation can be done step by step.

---

## Overview

| Goal | Mechanism |
|------|-----------|
| Icons | Build path from `keyword`: `/images/categories/${keyword}-category-icon.svg` with fallback |
| Names | Use API category `name`; remove index-based override |
| URL | Use slug in route and all links; resolve slug → id in CategorizedProducts for API calls |

---

## Phase 1: Config and helpers (no URL yet)

### 1.1 `frontend/src/pages/Catalog/constants/categoryConfig.ts`

**Changes:**

1. **Add `getCategoryIconPath(keyword: string): string`**
   - Known slugs that have SVGs: `beverages`, `breads-bakery`, `cereals-snacks`, `dairy-eggs`, `meat-seafood`, `pantry-staples`, `produce`.
   - Return `/images/categories/${keyword}-category-icon.svg` if keyword is non-empty.
   - Else return fallback: `/images/categories/all-category-icon.svg`.
   - Optional: allow a hardcoded set of known slugs and only then build the path; otherwise fallback (avoids 404s for unknown slugs).

2. **Change `getCategoryDisplayName(categoryId, apiCategories)`**
   - Signature: keep `(categoryId: number, apiCategories: { id: number; name: string }[])`.
   - Remove the block that uses `REFERENCE_CATEGORY_ORDER[index].label`.
   - Logic: find category by id in `apiCategories`; if found, use `apiCat.name`; if name matches "Category" / "Category #" pattern, return `'Products'`; otherwise return `raw` or `'Products'`.
   - So: display name always comes from API; only sanitize placeholder names.

3. **Remove or repurpose `REFERENCE_CATEGORY_ORDER`**
   - Option A: Delete it and remove all imports (CategoryStrip will no longer use it).
   - Option B: Keep only as a fallback list for icon path (e.g. if keyword not in list, use all-category icon). Recommendation: **remove** so all icon logic is in `getCategoryIconPath`.

4. **Keep** `EMPTY_ERROR_DEMO_CATEGORY_ID`, `CARDS_TWO_FULL_ROWS`, `CATEGORY_NUMBER_PATTERN` (still used for display-name sanitization).

---

### 1.2 `frontend/src/pages/Catalog/Components/CategoryStrip.tsx`

**Changes:**

1. **Imports**
   - Remove: `REFERENCE_CATEGORY_ORDER`.
   - Add: `getCategoryIconPath` from categoryConfig.

2. **`CategoryStripItem` interface**
   - Add: `slug: string | null` (so we can navigate to `/catalog/${slug}`).
   - Keep: `id`, `name`, `image_url`.

3. **Replace `mergeCategoriesWithConfig(apiCategories)`**
   - Remove the function that maps by index from `REFERENCE_CATEGORY_ORDER`.
   - New logic: map over **API categories** (the array as returned from the API). For each `category`:
     - `id`: `category.id`
     - `name`: `category.name`
     - `image_url`: `getCategoryIconPath(category.keyword)`
     - `slug`: `category.keyword`
   - Return this array (no “All” yet).

4. **Build `list` (with “All”)**
   - Prepend an “All” item: `{ id: -1, name: 'All', image_url: '/images/categories/all-category-icon.svg', slug: null }`.
   - Then append the mapped API categories. So `list = [ALL_CATEGORY, ...mappedApiCategories]`.

5. **`handleClick`**
   - If `item.id === -1`: `navigate('/catalog')` (unchanged).
   - Else if `item.slug != null`: `navigate(\`/catalog/${item.slug}\`)` (use slug, not id).
   - Else: `navigate(\`/catalog/${item.id}\`)` (fallback for legacy).

6. **Scroll-into-view / refs**
   - Keep using `item.id` for refs and selection highlight (we still have `currentCategoryId` as number). No change needed.

---

### 1.3 `frontend/src/common/products/ProductGrid.tsx`

**Changes:**

1. **Display name**
   - Already uses `getCategoryDisplayName(categoryData.category.id, apiCategories)`. No change once `getCategoryDisplayName` uses API name.

2. **Pass slug to CategorySection**
   - Add prop: `categorySlug={categoryData.category.keyword}` to `CategorySection`.
   - CategorySection will use this for navigation URLs (see Phase 2).

---

## Phase 2: URL (slug in route and links)

### 2.1 `frontend/src/routing/AppRouter.tsx`

**Change:**

- Route: from `<Route path="/catalog/:categoryId" element={<CategorizedProducts />} />` to `<Route path="/catalog/:categorySlug" element={<CategorizedProducts />} />`.
- So the param name reflects that we pass a slug (e.g. `produce`), not a numeric id.

---

### 2.2 `frontend/src/pages/Catalog/CategorizedProducts.tsx`

**Changes:**

1. **Params and slug → id resolution**
   - Read param: `const { categorySlug } = useParams<{ categorySlug: string }>()` (replace `categoryId`).
   - Keep `useCategories()` and wait for categories to load.
   - Resolve slug to id:
     - If `categorySlug` is null/undefined: treat as “all” (no category) — e.g. `resolvedCategoryId = null`, don’t fetch category products.
     - If `categorySlug` is the special demo slug (e.g. a reserved string for EMPTY_ERROR_DEMO if you still use it): set `resolvedCategoryId = EMPTY_ERROR_DEMO_CATEGORY_ID` or equivalent.
     - Else: `resolvedCategory = categories.find(c => c.keyword === categorySlug)`; `resolvedCategoryId = resolvedCategory?.id ?? null`. If slug not found (resolvedCategoryId null and we had a slug), show 404 or redirect to `/catalog`.

2. **Use resolved id for API**
   - Pass `resolvedCategoryId` (number | null) to `useCategoryProductsPaginated(resolvedCategoryId, page, perPage, sort)` instead of parsing param as number. So the API is still called with numeric id.

3. **Display title**
   - Use `getCategoryDisplayName(resolvedCategoryId ?? 0, categories)` when resolvedCategoryId is set; or from `resolvedCategory?.name` when available. Same as today, but name now comes from API via updated `getCategoryDisplayName`.

4. **Pass slug down for links**
   - Compute `currentCategorySlug = resolvedCategory?.keyword ?? categorySlug` (categorySlug is the raw param).
   - Pass to CategoryStrip: still `currentCategoryId={resolvedCategoryId}` for highlighting.
   - Pass to CategorySection: `categoryId={resolvedCategoryId}`, `categorySlug={currentCategorySlug}` so “View all” and any links use slug.

5. **Cleanup**
   - Remove any `Number(categoryIdParam)` usage; everything goes through slug → resolved id.

6. **Backwards compatibility (optional)**
   - If you want old links `/catalog/3` to still work: when `categorySlug` looks numeric (e.g. `/\A\d+\z/`), treat it as id: `resolvedCategory = categories.find(c => c.id === Number(categorySlug))`, then use that; and optionally redirect to `/catalog/${resolvedCategory.keyword}` so the URL updates to the slug. If you don’t need old links, skip this.

---

### 2.3 `frontend/src/common/products/CategorySection/index.tsx`

**Changes:**

1. **Props**
   - Add: `categorySlug?: string | null`.
   - Keep: `categoryId`, `title`, etc.

2. **Navigation to category page**
   - Where it currently does `navigate(\`/catalog/${categoryId}\`)` (e.g. “View all” on mobile): use slug when available: `if (categorySlug) navigate(\`/catalog/${categorySlug}\`); else if (categoryId) navigate(\`/catalog/${categoryId}\`)`.
   - So links use slug; fallback to id only for callers that don’t pass slug yet.

3. **Pass slug to modal**
   - Pass `categorySlug` into `CategoryProductsModal` so the modal can use it for its “View category” / breadcrumb link (see 2.4).

---

### 2.4 `frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx`

**Changes:**

1. **Props**
   - Add: `categorySlug?: string | null`.

2. **Navigation**
   - Where it does `navigate(\`/catalog/${categoryId}\`)` (e.g. breadcrumb “Category” click on mobile): use `if (categorySlug) navigate(\`/catalog/${categorySlug}\`); else if (categoryId != null) navigate(\`/catalog/${categoryId}\`)`.

3. **Parent**
   - CategorySection must pass `categorySlug` into the modal (CategorySection receives it from ProductGrid / CategorizedProducts and forwards it).

---

### 2.5 `frontend/src/pages/LandingPage/Components/FeaturedProducts.tsx`

**Changes:**

- Currently passes `categoryId={featuredProducts[0].category.id}`. Add `categorySlug={featuredProducts[0].category.keyword}` to the component that renders CategorySection (if it’s CategorySection; otherwise the component that eventually links to the category). So landing-page “View all” (if any) also uses slug in the URL.

---

### 2.6 `frontend/src/pages/Catalog/index.tsx`

**Changes:**

- No route param here (this is the “All” catalog page). Ensure CategoryStrip and ProductGrid receive categories from API and pass slug where needed. ProductGrid already gets `categoryData.category` which has `keyword`; we added `categorySlug={categoryData.category.keyword}` in 1.3. No further change here unless there’s another link to a category.

---

## Phase 3: Backend (optional)

### 3.1 Backend: support slug in `categories#show` (optional)

**File:** `backend/app/controllers/api/catalog/categories_controller.rb`

- In `show`: `id_or_slug = params[:category_id]`. If `id_or_slug.to_s.match?(/\A\d+\z/)`, use `Category.find(id_or_slug)`; else use `Category.find_by!(slug: id_or_slug)` (and 404 if not found). Then use that `category` for products and render as today.
- This allows the frontend to call `GET /catalog/categories/produce` in the future if desired. Not required for Phase 1–2 (frontend can keep resolving slug → id and calling with id).

---

## Phase 4: Tests and cleanup

### 4.1 Tests

- **categoryConfig**
  - Add or update tests for `getCategoryIconPath`: known keyword returns correct path; unknown or empty returns fallback.
  - Update tests for `getCategoryDisplayName`: returns API name; returns `'Products'` for placeholder names.
- **CategoryStrip**
  - Any test that relied on REFERENCE_CATEGORY_ORDER order/icons should assert instead on API-driven name and icon path from keyword.
- **CategorizedProducts**
  - Test that `categorySlug` param is resolved to id and the correct category products load; invalid slug → 404 or redirect.

### 4.2 Cleanup

- Remove `REFERENCE_CATEGORY_ORDER` export and all references (already removed in CategoryStrip and categoryConfig).
- Search codebase for remaining `REFERENCE_CATEGORY_ORDER` or index-based category label/icon logic and remove.

---

## File checklist (summary)

| File | Phase | Summary of change |
|------|--------|--------------------|
| `frontend/src/pages/Catalog/constants/categoryConfig.ts` | 1 | Add `getCategoryIconPath`; change `getCategoryDisplayName` to use API name; remove index-based label; remove or repurpose REFERENCE_CATEGORY_ORDER. |
| `frontend/src/pages/Catalog/Components/CategoryStrip.tsx` | 1 | Use API categories + `getCategoryIconPath(keyword)`; add `slug` to item; navigate with `item.slug`. |
| `frontend/src/common/products/ProductGrid.tsx` | 1 | Pass `categorySlug={categoryData.category.keyword}` to CategorySection. |
| `frontend/src/routing/AppRouter.tsx` | 2 | Route param: `:categoryId` → `:categorySlug`. |
| `frontend/src/pages/Catalog/CategorizedProducts.tsx` | 2 | Read `categorySlug`; resolve to id via categories; use resolved id for API; pass `categorySlug` to children. |
| `frontend/src/common/products/CategorySection/index.tsx` | 2 | Add `categorySlug` prop; navigate to `/catalog/${categorySlug}` when present; pass slug to modal. |
| `frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx` | 2 | Add `categorySlug`; navigate to `/catalog/${categorySlug}` when present. |
| `frontend/src/pages/LandingPage/Components/FeaturedProducts.tsx` | 2 | Pass `categorySlug` to CategorySection (or link target) if it links to category. |
| `backend/.../categories_controller.rb` | 3 (optional) | Allow `show` to find by slug when param is not numeric. |

---

## Order of implementation

1. **Phase 1** (config + strip + grid): Icons and names work; strip still navigates to `/catalog/${id}` until Phase 2.
2. **Phase 2** (route + CategorizedProducts + CategorySection + modal + landing): Switch to slug in URL and all links; resolve slug → id in CategorizedProducts.
3. **Phase 3** (optional backend): Slug in API if desired.
4. **Phase 4**: Tests and cleanup.

After Phase 1, the strip shows correct icons and names. After Phase 2, URLs are slug-based and all links use slug. No new API calls; performance unchanged.
