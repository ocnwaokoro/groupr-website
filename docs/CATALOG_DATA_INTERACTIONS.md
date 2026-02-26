# Catalog Page – Data Interactions

How the **first page** (Catalog at `/` and `/catalog`) is wired and every data interaction listed in one place.

---

## 1. Main Catalog page (`src/pages/Catalog/index.tsx`)

| # | Type | Location (file:line) | What | API / storage | Direction |
|---|------|----------------------|------|----------------|-----------|
| 1 | **Router** | `Catalog/index.tsx:16` | `useParams<{ providerId: string }>()` | — | Read URL segment `/catalog/provider/:providerId` |
| 2 | **Context** | `Catalog/index.tsx:17` | `useSearch()` → `searchTerm`, `setSearchTerm` | SearchContext (state + optional GET `/catalog/search` when `searchTerm` set) | Read/write search state; may trigger search API when `?q=` in URL |
| 3 | **Router** | `Catalog/index.tsx:18` | `useSearchParams()` | — | Read URL query (e.g. `fns_review`, `q`) |
| 4 | **Router** | `Catalog/index.tsx:19-20` | `useLocation()`, `useNavigate()` | — | Read location, programmatic navigation |
| 5 | **Local state** | `Catalog/index.tsx:21-24` | `useState({ currentPage: 1, categoryId: -1 })` | — | Read/write pagination and category filter in memory |
| 6 | **URL derived** | `Catalog/index.tsx:25` | `fnsReview = searchParams.get('fns_review') === 'true'` | — | Read from URL |
| 7 | **Effect** | `Catalog/index.tsx:27-32` | `useEffect`: if `searchParams.get('q')` ≠ `searchTerm` → `setSearchTerm(queryTerm)` | — | Write to SearchContext when URL `q` changes |
| 8 | **Data hook** | `Catalog/index.tsx:35` | `useCategories()` | **GET** `/catalog/categories` | Read categories (React Query) |
| 9 | **Data hook** | `Catalog/index.tsx:36-41` | `useProducts({ page, perPage: 100, providerId, fnsReview, category_id })` | **GET** `/catalog/products` or **GET** `/catalog/provider/:providerId` (when `providerId` in URL) | Read products by page/provider/fns_review (React Query) |
| 10 | **Derived data** | `Catalog/index.tsx:52-65` | `useMemo`: from `groupedProducts.results` → unique `providers` | — | In-memory only (no API) |
| 11 | **Navigation** | `Catalog/index.tsx:45-49` | `handleCategoryClick(category)` → `navigate(\`/catalog/${category.id}?...\`)` | — | Router |
| 12 | **Navigation** | `Catalog/index.tsx:67-76` | `handleProviderClick(id)` → `navigate('/catalog')` or `navigate(\`/catalog/provider/${id}?...\`)` | — | Router |
| 13 | **Local state** | `Catalog/index.tsx:118-122` | `setCatalogState({ ...catalogState, currentPage: page })` (in PaginationLinks callback) | — | Write local state |

**Child components (receive props only on this page; no extra API calls in these):**

| Component | Data source | API? |
|-----------|-------------|------|
| `Carousel` | Local state only (`currentSlide`) | No |
| `CategoryListContainer` | `categoriesResponse?.categories` (from useCategories) | No |
| `ProductGrid` | `groupedProducts.results` (from useProducts) | No |
| `ProviderList` | `providers` (from useMemo above) | No |
| `PaginationLinks` | `catalogState.currentPage`, `groupedProducts.pagination.total_pages`, `handlePageChange` | No |

---

## 2. Categorized products page (`/catalog/:categoryId`) – `CategorizedProducts.tsx`

| # | Type | Location | What | API / storage | Direction |
|---|------|----------|------|----------------|-----------|
| 1 | **Router** | `CategorizedProducts.tsx:13` | `useParams()` → `categoryId` | — | Read URL |
| 2 | **Data hook** | `CategorizedProducts.tsx:14` | `useCategories()` | **GET** `/catalog/categories` | Read |
| 3 | **Data hook** | `CategorizedProducts.tsx:16` | `useProductsOfCategory({ category_id, page: 1, perPage: 20 })` | **GET** `/catalog/categories/:categoryId` (infinite query, paginated) | Read |
| 4 | **Router** | `CategorizedProducts.tsx:17` | `useNavigate()` | — | Navigation |
| 5 | **Infinite query** | `CategorizedProducts.tsx:29-40` | `handleScroll` → `fetchNextPage()` when footer visible | Same endpoint, next page | Read (append) |
| 6 | **Derived** | `CategorizedProducts.tsx:47-48` | `products = productsData?.pages.flat()`, `category = categoriesData?.categories.find(...)` | — | In-memory |

---

## 3. Product detail page (`/catalog/products/:productId`) – `ProductDisplay.tsx`

| # | Type | Location | What | API / storage | Direction |
|---|------|----------|------|----------------|-----------|
| 1 | **Router** | `ProductDisplay.tsx:8` | `useParams()` → `productId` | — | Read URL |
| 2 | **Data hook** | `ProductDisplay.tsx:14` | `useProduct(Number(productId))` | **GET** `/catalog/products/:productId` | Read |
| 3 | **Effect** | `ProductDisplay.tsx:10-12` | `useEffect` → `window.scrollTo(0, 0)` on `productId` change | — | Side effect (no data) |

---

## 4. Category “view all” modal (opened from Catalog grid) – `CategoryProductsModal.tsx`

| # | Type | Location | What | API / storage | Direction |
|---|------|----------|------|----------------|-----------|
| 1 | **Data hook** | `CategoryProductsModal.tsx:60` | `useProductsOfCategory({ category_id: categoryId, page: 1, perPage: 20 })` | **GET** `/catalog/categories/:categoryId` (infinite) | Read |
| 2 | **Infinite query** | `CategoryProductsModal.tsx:73-77` | `handleScroll` in modal → `fetchNextPage()` | Same endpoint, next page | Read (append) |
| 3 | **Local state** | Same file | `contentState`, `selectedProduct` | — | UI state only |

---

## 5. Search (when `?q=` is present; SearchContext wraps app)

| # | Type | Location | What | API / storage | Direction |
|---|------|----------|------|----------------|-----------|
| 1 | **Context** | `SearchContext.tsx` (provider) | `useCatalogSearch({ q: searchTerm, page, per_page })` | **GET** `/catalog/search?q=...&page=...&per_page=...` | Read (when `searchTerm` set, e.g. from URL on Catalog) |
| 2 | **URL sync** | `SearchContext.tsx` | `updateUrlParams` / `setSearchParams` | — | Write URL query from context state |

*Note: `SearchResults` component exists but is not rendered by the main Catalog page; search API can still run via SearchContext when user lands on `/catalog?q=...`.*

---

## 6. Summary table – All API calls in the catalog flow

| Endpoint | Method | Used by | Page / component |
|----------|--------|---------|-------------------|
| `/catalog/categories` | GET | useCategories | Catalog, CategorizedProducts |
| `/catalog/products` | GET | useProducts | Catalog (when no providerId) |
| `/catalog/provider/:providerId` | GET | useProducts | Catalog (when providerId in URL) |
| `/catalog/categories/:categoryId` | GET | useProductsOfCategory | CategorizedProducts, CategoryProductsModal |
| `/catalog/products/:productId` | GET | useProduct | ProductDisplay |
| `/catalog/search` | GET | useCatalogSearch (SearchContext) | When search term set (e.g. from `?q=` on Catalog) |

---

## 7. Data flow (first paint) – User opens `/` or `/catalog`

```
1. Router renders <Catalog />.
2. Catalog runs:
   - useParams()        → providerId (optional)
   - useSearch()        → searchTerm, setSearchTerm (from SearchContext)
   - useSearchParams()  → fns_review, q
   - useCategories()    → GET /catalog/categories → categoriesResponse
   - useProducts(...)   → GET /catalog/products (or /catalog/provider/:id) → groupedProducts
3. useEffect syncs URL ?q into SearchContext (setSearchTerm).
4. If ?q= is present, SearchContext’s useCatalogSearch runs → GET /catalog/search (results not rendered on main Catalog view).
5. UI: Carousel (local state), CategoryList(categories), ProductGrid(groupedProducts.results), optional ProviderList(providers), PaginationLinks(currentPage, totalPages).
6. Clicks: category → navigate to /catalog/:id; provider → navigate to /catalog or /catalog/provider/:id; page → setCatalogState then re-run useProducts with new page.
```

No localStorage, sessionStorage, or cookies are read or written on the Catalog page itself. Auth is not required for these catalog endpoints.
