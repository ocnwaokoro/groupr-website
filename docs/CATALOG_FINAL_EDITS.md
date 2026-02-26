# Catalog Final Edits

This document records the final catalog-related edits: where key changes were made and where the "View all" logic lives.

---

## 1. Products per category: frontend decides (query param)

**Current behavior**

- The **frontend** decides how many products per category the API returns by sending the query param **`products_per_category`**.
- **Backend** reads `params[:products_per_category]`, defaults to **8** if missing or invalid, and caps at **100**.

**Where the change was made**

**Backend:** `devenv-main/backend/app/controllers/api/catalog/products_controller.rb`

- **Constants:** `DEFAULT_PRODUCTS_PER_CATEGORY = 8`, `MAX_PRODUCTS_PER_CATEGORY = 100`.
- **Private method:** `products_per_category_limit` — returns `params[:products_per_category].to_i` clamped to 1..100, or the default 8 if blank or &lt; 1.
- **`index` action (GET /catalog/products):** Uses `products_per_category_limit` in the windowed SQL: `WHERE rn <= #{products_per_category}`.
- **`provider` action (GET /catalog/provider/:id):** Same: uses `products_per_category_limit` for the per-category limit.

**Frontend:** sends the value from a single constant

- **Constant:** `devenv-main/frontend/src/pages/Catalog/constants/categoryConfig.ts` → **`CARDS_TWO_FULL_ROWS = 12`** (2 rows × 6 per row; used for both “how many to request” and “when to show View all”).
- **Catalog page:** `devenv-main/frontend/src/pages/Catalog/index.tsx` passes **`productsPerCategory: CARDS_TWO_FULL_ROWS`** into `useProducts(productsParams)`.
- **Hook:** `devenv-main/frontend/src/hooks/useProducts.ts` — `CatalogParams` includes **`productsPerCategory?: number`**; when set, it is sent as **`products_per_category`** in the request params.

So the number of items returned per category is decided by the frontend (via the `products_per_category` query param); the backend only enforces default and max.

---

## 2. View all logic – where it lives

"View all" is driven by the frontend only (no dedicated backend route). Flow:

### 2.1 When "View all" is shown

**File:** `devenv-main/frontend/src/common/products/ProductGrid.tsx`

- **Constant:** `CARDS_TWO_FULL_ROWS` is imported from `pages/Catalog/constants/categoryConfig` (value 12; 6 per row × 2 rows).
- **Per category section:**
  - `displayProducts` = first 12 products when `total > 12`, otherwise all products.
  - `showViewAll = !fnsReview && total > CARDS_TWO_FULL_ROWS` (i.e. show when there are more than 12 products and not in FNS review mode).
- **Passed down:** `displayAllItems={showViewAll}` and `products={displayProducts}` to `CategorySection`.

So "View all" appears only when that category has **more than 12** products in the response.

### 2.2 Where the "View all" button is rendered

**File:** `devenv-main/frontend/src/common/products/CategorySection/index.tsx`

- **Prop:** `displayAllItems` (boolean). When `true`, the section shows a "View all" button next to the section title.
- **Button:** Lines 61–68: `{displayAllItems && (<button ...>View all</button>)}`.
- **Click handler:** `onClick={() => openProductsModal(undefined)}`.

### 2.3 What happens when "View all" is clicked

**Same file:** `CategorySection/index.tsx`, function `openProductsModal(product?: Product)` (lines 29–43).

When "View all" is clicked, `openProductsModal(undefined)` is called:

- **Desktop (min-width 768px):** Opens `CategoryProductsModal` with no pre-selected product (modal shows full category list).
- **Mobile:** `navigate(`/catalog/${categoryId}`)` — goes to the category page.

So:

- **Desktop:** "View all" opens the in-page modal for that category.
- **Mobile:** "View all" navigates to `/catalog/:categoryId` (CategorizedProducts page with pagination).

### 2.4 Category page (full list after "View all" on mobile)

**File:** `devenv-main/frontend/src/pages/Catalog/CategorizedProducts.tsx`

- Route: `/catalog/:categoryId`.
- Uses `useCategoryProductsPaginated(categoryId, page, CATEGORY_PAGE_SIZE)` with `CATEGORY_PAGE_SIZE = 30` (6 per row × 5 rows; in `devenv-main/frontend/src/hooks/useProducts.ts`).
- Renders paginated products and catalog `Pagination` when `totalPages > 1`.

### 2.5 Modal used on desktop "View all"

**File:** `devenv-main/frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx`

- Receives `categoryId`, `isOpen`, `displayedProduct`, `onClose`.
- When opened with `displayedProduct === undefined`, it shows the full category product list inside the modal.

---

## 3. Quick reference

| What | Location |
|------|----------|
| Frontend constant (how many per category) | `frontend/src/pages/Catalog/constants/categoryConfig.ts` → `CARDS_TWO_FULL_ROWS = 12` (6×2) |
| Frontend sends param | `frontend/src/pages/Catalog/index.tsx` → `productsPerCategory: CARDS_TWO_FULL_ROWS` in `useProducts` params |
| Backend reads param | `backend/app/controllers/api/catalog/products_controller.rb` → `products_per_category_limit` (default 8, max 100) |
| When to show "View all" & slice to 12 | `frontend/src/common/products/ProductGrid.tsx` → `showViewAll`, `displayProducts` (uses `CARDS_TWO_FULL_ROWS`) |
| "View all" button & click | `frontend/src/common/products/CategorySection/index.tsx` → `displayAllItems`, `openProductsModal(undefined)` |
| Desktop "View all" | Same: opens `CategoryProductsModal` |
| Mobile "View all" | Same: `navigate(/catalog/:categoryId)` |
| Category page (pagination) | `frontend/src/pages/Catalog/CategorizedProducts.tsx` + `useCategoryProductsPaginated` |
| Category page size (30) | `frontend/src/hooks/useProducts.ts` → `CATEGORY_PAGE_SIZE = 30` (6×5 rows) |
