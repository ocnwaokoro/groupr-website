# Catalog Port: Reference `catalog/` → `devenv-main/frontend` Catalog

This document is the **single source of truth** for porting the reference catalog app (`catalog/`) into the main app’s Catalog experience (`devenv-main/frontend/src/pages/Catalog` and related code). It goes **component by component** so nothing is missed.

---

## 1. Scope and goals

- **Source:** `catalog/` (standalone Vite + React + Tailwind app; merged desktop/mobile design).
- **Target:** `devenv-main/frontend` Catalog pages and shared catalog UI.
- **Goals:**
  - Replace current Catalog page structure and UI with the reference layout and behavior.
  - Keep **live data**: continue using `useCategories`, `useProducts`, search, provider routes, and cart/checkout integration.
  - Preserve **app integration**: Public layout (NavBar, Footer), routing, i18n, auth, and shopping cart behavior.
- **Out of scope:** Changing backend API, auth, or checkout flows; only the catalog **front-end** is being replaced/updated.

---

## 2. High-level architecture comparison

| Aspect | Reference `catalog/` | Current `devenv-main` Catalog |
|--------|----------------------|-------------------------------|
| **Framework** | React (Vite) | React (Vite) |
| **Styling** | Tailwind only | Chakra UI + SCSS |
| **Data** | Static `data/products.ts`, hardcoded `CATEGORIES` | API: `useCategories()`, `useProducts()`, search, provider |
| **Layout** | Full page: Navbar → PromoBanner → HeroSearch → CategoryStrip → ProductGrid → Pagination → MerchantInfo → Footer | Public layout (NavBar + Footer) → **PromoBanner → HeroSearch** → CategoryStrip → ProductGrid → Pagination → MerchantInfo (no Carousel) |
| **Routing** | Single page (hash links) | `/catalog`, `/catalog/:categoryId`, `/catalog/products/:productId`, `/catalog/provider/:providerId` |
| **Nav** | In-page Navbar + MobileNavDrawer | Shared `NavBar` in Public layout |
| **Categories** | Horizontal strip, local state `selectedId` | Horizontal strip from API, click → navigate to `/catalog/:categoryId` |
| **Products** | Single “All Products” grid from `PRODUCTS` | Grouped by category from API; CategorySection + ProductCard (cart, EBT, modal) |

**Port strategy:** Adopt reference **layout order**, **section components**, and **visual design** using **Tailwind** for catalog styling. Keep **all** API hooks, routing, cart, and provider logic from devenv-main. **No carousel:** use PromoBanner and HeroSearch from reference only. **No full page refresh:** all catalog navigation uses React Router (client-side).

---

## 3. File and folder mapping

### 3.1 Reference structure (what we’re porting from)

```
catalog/
├── src/
│   ├── App.tsx                    → Renders CatalogPage only
│   ├── main.tsx, index.css
│   ├── pages/
│   │   └── CatalogPage.tsx       → Main page structure
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         → Not used as-is (devenv has shared NavBar)
│   │   │   ├── Footer.tsx         → Not used as-is (devenv has shared Footer)
│   │   │   └── MobileNavDrawer.tsx
│   │   ├── sections/
│   │   │   ├── PromoBanner.tsx    → Port
│   │   │   ├── HeroSearch.tsx     → Port (wire to search)
│   │   │   ├── CategoryStrip.tsx  → Port (wire to API categories)
│   │   │   ├── CategoryCard.tsx   → Port
│   │   │   ├── ProductGrid.tsx    → Port (wire to API products)
│   │   │   ├── ProductCard.tsx    → Port (merge with cart/EBT logic)
│   │   │   ├── Pagination.tsx    → Port (wire to pagination state)
│   │   │   └── MerchantInfo.tsx   → Port (optional; can use provider data)
│   │   └── ui/
│   │       ├── Button.tsx         → Optional (devenv uses Chakra Button)
│   │       ├── Card.tsx           → Port or replicate for category/product cards
│   │       ├── Input.tsx          → Optional
│   │       ├── Logo.tsx           → Skip (in NavBar)
│   │       ├── NavLink.tsx        → Skip (in NavBar)
│   │       └── SearchBar.tsx      → Reference for HeroSearch
│   ├── data/
│   │   └── products.ts            → Do not port; use API
│   └── hooks/
│       └── useMediaQuery.ts       → Port if not present
├── public/images/                 → Copy needed assets into devenv-main
└── tailwind.config.js             → Merge theme into devenv or use Chakra theme
```

### 3.2 Target structure (devenv-main after port)

```
devenv-main/frontend/src/
├── pages/
│   ├── Catalog/
│   │   ├── index.tsx              → Rewrite to reference layout; keep API + routing
│   │   ├── CategorizedProducts.tsx → Keep; optionally restyle to match reference
│   │   ├── ProductDisplay.tsx     → Keep (product detail)
│   │   ├── Components/
│   │   │   ├── PromoBanner.tsx    → NEW (from reference)
│   │   │   ├── HeroSearch.tsx     → NEW (from reference; wire to SearchContext + navigate)
│   │   │   ├── CategoryStrip.tsx  → NEW (from reference; wire to useCategories + navigate)
│   │   │   ├── CategoryCard.tsx   → NEW (from reference; or replace CategoryItem usage)
│   │   │   ├── ProductGridSection.tsx → NEW (reference ProductGrid layout; data from API)
│   │   │   ├── Pagination.tsx     → NEW (from reference; wire to catalogState.currentPage)
│   │   │   ├── MerchantInfo.tsx   → NEW (optional; provider info)
│   │   │   ├── ProviderList.tsx   → KEEP
│   │   │   ├── SearchResults.tsx  → KEEP
│   │   │   └── SearchBox.tsx      → KEEP or merge into HeroSearch
│   │   └── styles/
│   │       └── Catalog.scss       → Update or remove if going Tailwind
├── common/
│   ├── products/
│   │   ├── ProductGrid.tsx        → Change to render “by section” like reference or keep category sections
│   │   ├── ProductCard.tsx        → Restyle to reference ProductCard look; keep cart/EBT/modal logic
│   │   ├── CategorySection/       → Keep; optional “View all” behavior
│   │   └── ...
│   ├── CategoryList.tsx           → Replace or wrap with reference CategoryStrip + CategoryCard
│   ├── CategoryItem.tsx           → Replace by CategoryCard (reference) or keep and restyle
│   ├── PaginationLinks.tsx        → Keep or replace with reference Pagination component
│   └── ...
├── hooks/
│   └── useMediaQuery.ts           → Add if missing
└── assets or public/images/       → Reference catalog assets (categories, icons, etc.)
```

---

## 4. Component-by-component porting spec

### 4.1 Page: `CatalogPage` → `Catalog/index.tsx`

**Reference (`catalog/src/pages/CatalogPage.tsx`):**

- Order: Navbar → PromoBanner → HeroSearch → main (CategoryStrip → ProductGrid → Pagination → MerchantInfo) → Footer.
- Single column; `max-w-[1440px]` / `max-w-[1312px]`; padding and gaps.

**Current (`devenv-main/.../Catalog/index.tsx`):**

- Uses Public layout (NavBar + Footer already outside).
- Renders: dev debug box → (optional ProviderList) → CategoryListContainer → ProductGrid or empty state → PaginationLinks. **After port:** PromoBanner → HeroSearch → CategoryStrip → grid → Pagination → MerchantInfo (no Carousel).
- State: `catalogState.currentPage`, `catalogState.categoryId`; `useCategories`, `useProducts(productsParams)`; providerId from route; search from SearchContext.

**Port steps:**

1. Remove or relocate the dev-only API debug box (e.g. behind a flag or env).
2. **Remove the Carousel completely.** Do not keep or replace it. Catalog content starts with **PromoBanner** then **HeroSearch** (from reference).
3. Insert **PromoBanner** at the top of catalog content (below any global nav).
4. Insert **HeroSearch** (search input + “Shop now”); on submit: set search term and navigate to `/catalog?q=...` via **React Router only** (no full page refresh—see §7).
5. Replace **CategoryListContainer** with **CategoryStrip**:
   - Data: `categoriesResponse?.categories` from `useCategories()`.
   - Map category to `{ id, label, icon }` (label = `category.name`, icon = `category.image_url` or fallback).
   - “All” can be a synthetic category (e.g. id `-1` or `'all'`) that clears category filter or navigates to `/catalog`.
   - Click: use **React Router** `navigate()` to `/catalog/${category.id}` or `/catalog` for All (client-side; no page refresh).
6. **ProductGrid (main content):**
   - If current route is `/catalog` (no categoryId): show products grouped by category (current API shape) using reference grid layout (e.g. “All Products” heading + single grid, or keep category sections with reference styling).
   - If route is `/catalog/:categoryId`: keep using CategorizedProducts or inline category filter; show one grid for that category.
   - Use reference grid: 2 cols mobile, 4 cols desktop; gap and max-width from reference.
7. Replace **PaginationLinks** with reference **Pagination** component (First, Back, 1, 2, …, Next, Last); wire `currentPage` / `totalPages` from `groupedProducts.pagination` and `handlePageChange` to set `catalogState.currentPage` and optionally refetch or scroll.
8. Add **MerchantInfo** (or provider-fulfillment block) at bottom; optionally use `provider` from API or static “Items Fulfilled by” text.
9. Keep **ProviderList** when `providerId` is in the route; place it where it makes sense (e.g. above or below CategoryStrip).
10. Preserve **error and loading**: show Spinner when `isLoading`; show “No products found” when `!groupedProducts?.results?.length` or no products in results; show error from `useProducts` if `isError`.

**Files to touch:**

- `devenv-main/frontend/src/pages/Catalog/index.tsx` (full rewrite of JSX structure; keep hooks and routing logic).

---

### 4.2 PromoBanner

**Reference:** `catalog/src/components/sections/PromoBanner.tsx`

- Dismissible; “Give $5, get $5” + “Share Groupr” button; close icon.
- Tailwind: `bg-bg-dark`, `text-text-light`, etc.

**Port:**

- Create `pages/Catalog/Components/PromoBanner.tsx`.
- Copy structure and copy from reference; use **Tailwind** classes (reference uses `bg-bg-dark`, `text-text-light`, etc.).
- State: `const [dismissed, setDismissed] = useState(false)`; if dismissed, return `null`.
- “Share Groupr” can link to refer flow or stay as placeholder.

**Dependencies:** None (self-contained).

---

### 4.3 HeroSearch

**Reference:** `catalog/src/components/sections/HeroSearch.tsx`

- Heading: “What are you looking for today?”
- Input + “Shop now” button (desktop); form submit.

**Port:**

- Create `pages/Catalog/Components/HeroSearch.tsx`.
- Use `useSearch()` from SearchContext and `useNavigate()` from React Router.
- On submit: `setSearchTerm(query)`, then `navigate('/catalog?q=' + encodeURIComponent(query))` — **client-side only, no page refresh**.
- Use **Tailwind** for layout and styles (match reference). Use existing i18n key for heading if available (e.g. catalog.searchBox.title).

**Dependencies:** SearchContext, react-router-dom, optional i18n.

---

### 4.4 CategoryStrip + CategoryCard

**Reference:**

- **CategoryStrip:** Horizontal strip; left/right chevrons (mobile); scroll-snap; maps over `CATEGORIES`; each item is a CategoryCard with `name`, `icon`, `selected`.
- **CategoryCard:** Card with icon area (selected = orange bg), label below.

**Port:**

- Create `pages/Catalog/Components/CategoryStrip.tsx` and `CategoryCard.tsx`.
- **CategoryStrip:**
  - Props: `categories: Category[]` (from API), `currentCategoryId?: number`, `onCategoryClick: (category: Category) => void`.
  - Build list: add “All” option (e.g. `{ id: -1, name: 'All', image_url: null }` or use first category); then `categories` from API. Icon = `category.image_url` or fallback (e.g. first letter or default SVG).
  - Use `useRef` for scroll container; scroll buttons call `scrollBy({ left: ±240, behavior: 'smooth' })`.
  - Use **Tailwind** (divs with ref); hide scrollbar; match reference padding and gaps.
- **CategoryCard:**
  - Props: `name`, `icon?: string`, `selected?: boolean`, `onClick` (or use React Router `Link`/`useNavigate`).
  - Render as in reference: rounded area for icon (selected = orange bg), label. Use **Tailwind**.

**Routing:** On click, call `onCategoryClick(category)`. Parent (Catalog/index) does `navigate(`/catalog/${category.id}`)` for category id, or `navigate('/catalog')` for “All”.

**Dependencies:** useCategories (in parent), react-router-dom.

---

### 4.5 ProductGrid (section) and ProductCard

**Reference:**

- **ProductGrid:** “All Products” heading; 2-col mobile, 4-col desktop (300px); maps over `PRODUCTS`; each ProductCard with `name`, `price`, `description`, `image`, `fillWidth`.
- **ProductCard:** Card with image, add-to-cart button, name, price, description. No cart logic in reference.

**Current:**

- **ProductGrid:** Receives `categories: ProductsByCategory[]`; maps to CategorySection; each CategorySection has title + list of ProductCards.
- **ProductCard:** Uses API `Product`; cart (addItem, updateQuantity, removeItem); EBT badges; QuantityClickerButton; modal/navigate to product detail.

**Port strategy:**

- **Option A (recommended):** Keep current **ProductGrid** that renders by category (CategorySection per category). Restyle **CategorySection** and **ProductCard** to match reference:
  - Grid: 2 cols mobile, 4 cols desktop; gap and max-width from reference; “All Products” or per-category heading.
  - ProductCard: reference look (image on top, add button overlay, name/price/description below); keep all cart, EBT, quantity, and click-to-detail behavior.
- **Option B:** Add a new “flat” ProductGrid section (single “All Products” grid) for the main catalog view; data = flatten `groupedProducts.results` into one list; use reference ProductCard UI; keep cart/EBT in ProductCard.

**ProductCard port details:**

- Keep: `product`, `onProductClick`, `useShoppingCart`, EBT badge, quantity clicker, add to cart toast, discount price, weight.
- Update layout/styles with **Tailwind**: reference padding, rounded corners, image area height (e.g. 280px desktop, 120px mobile compact), green add button position, text sizes. Use **lazy loading for images** (see §7) so the page loads quickly.
- `fillWidth`: when in 2-col mobile grid, card fills width; desktop fixed width (e.g. 300px). Pass from parent based on breakpoint (useMediaQuery).

**Dependencies:** useProducts, useShoppingCart, getProductImage, EbtEligibilityBadge, QuantityClickerButton, theme.

---

### 4.6 Pagination

**Reference:** `catalog/src/components/sections/Pagination.tsx`

- First, Back, 1, 2, … , N, Next, Last. Disabled when at first/last. Tailwind styling.

**Port:**

- Create `pages/Catalog/Components/Pagination.tsx` (or replace `PaginationLinks`).
- Props: `currentPage`, `totalPages`, `onPageChange: (page: number) => void`.
- Wire to `groupedProducts.pagination.current_page` and `total_pages`; on click call `onPageChange(page)` and parent updates `catalogState.currentPage` (and optionally refetch or scroll).
- Match reference button layout and disabled states. Use **Tailwind**.

**Dependencies:** None.

---

### 4.7 MerchantInfo

**Reference:** “Items Fulfilled by:” + logo + address (static).

**Port:**

- Create `pages/Catalog/Components/MerchantInfo.tsx`.
- Option 1: Static text + logo (copy from reference; put assets in public).
- Option 2: Use provider from API (e.g. first provider or current `providerId` from route) to show name and address. Match reference typography and layout.

**Dependencies:** Optional provider data.

---

### 4.8 Carousel — REMOVED

**Decision:** Do **not** port or keep the Carousel. Remove it completely from the Catalog page. The catalog content starts with **PromoBanner** and **HeroSearch** from the reference (`catalog/`). Delete or stop rendering the Carousel component in `Catalog/index.tsx`.

---

### 4.9 ProviderList

**Current:** Renders when `providerId` in route; list of providers; click navigates to `/catalog/provider/:id`.

**Port:** Keep component and logic; optionally restyle to match reference (e.g. Card or strip). No structural change.

---

### 4.10 Search results and search box

**Current:** SearchContext; NavBar SearchBar navigates to `/catalog?q=...`; Catalog can show SearchResults when `q` is set.

**Port:**

- Keep SearchContext and existing search API (useCatalogSearch).
- HeroSearch (new) submits to same flow: set term + navigate to `/catalog?q=...`.
- When `q` is present, show **SearchResults** (current component) instead of or above the main ProductGrid; keep existing result list and “no results” copy. Optionally restyle SearchResults to match reference.

---

### 4.11 CategorizedProducts and ProductDisplay

**Current:** `/catalog/:categoryId` shows CategorizedProducts (products of one category; infinite scroll). `/catalog/products/:productId` shows ProductDisplay (detail).

**Port:**

- Keep both pages and routes.
- CategorizedProducts: optionally use same CategoryStrip at top (with that category selected) and same ProductGrid/Card styling.
- ProductDisplay: no change required for this port unless you want reference-style product detail layout.

---

## 5. Data and API (no backend changes)

- **Categories:** `useCategories()` → `categoriesResponse?.categories`. Use for CategoryStrip and for “All” + per-category views.
- **Products (grouped):** `useProducts({ page, perPage, providerId, fnsReview })` → `groupedProducts.results` (array of `{ category, products }`), `groupedProducts.pagination`. Use for main grid and pagination.
- **Products (by category):** `useProductsOfCategory({ category_id })` in CategorizedProducts; keep.
- **Search:** `useCatalogSearch`, SearchContext; navigate to `/catalog?q=...` from HeroSearch; show SearchResults when `q` is set.
- **Provider:** `providerId` from route; `useProducts({ providerId })`; ProviderList from `groupedProducts.results` (extract unique providers). No change.

---

## 6. Styling: Tailwind

**Decision:** **Tailwind** is the styling approach for the catalog port.

- Add Tailwind to `devenv-main/frontend` (if not already present): install `tailwindcss`, `postcss`, `autoprefixer`; add `tailwind.config.js` and PostCSS config; include Tailwind in the main CSS entry.
- Merge the **reference** `catalog/tailwind.config.js` theme into the app’s Tailwind config: colors (`bg-primary`, `bg-dark`, `accent-orange`, `text-brown`, etc.), fonts (Inter, DM Sans, Lexend), spacing (`section`), border radii (`card`, `button`), and any custom utilities.
- Set Tailwind `content` so it scans `src/pages/Catalog/**`, `src/common/products/**`, and any other catalog-related paths.
- **Catalog-specific components** (PromoBanner, HeroSearch, CategoryStrip, CategoryCard, Pagination, MerchantInfo, and restyled ProductCard/ProductGrid) use **Tailwind classes only**; no Chakra or SCSS for their layout/visuals unless needed for existing behavior (e.g. modal).
- **Assets:** Copy from `catalog/public/images/` into `devenv-main/frontend/public/images/`: category icons, icons (chevrons, search, add-to-cart, close, etc.), merchant logo. Reference them as `/images/...` in the new components.

---

## 7. Routing and navigation (no page refresh)

**Requirement:** The catalog must never trigger a full page reload. All navigation is **client-side** via React Router.

- **Implementation:** Use only React Router APIs:
  - `useNavigate()` for programmatic navigation (e.g. after search submit, category click).
  - `<Link to="...">` for clickable links (e.g. category cards, “View all”).
  - **Do not use** `<a href="...">` for in-app catalog routes — that would cause a full page refresh.
- **URLs:** Keep existing routes; only the rendered content changes.
  - `/catalog` → Catalog (main)
  - `/catalog?q=...` → Same Catalog page; read `q` from `useSearchParams()` and show search results (no reload).
  - `/catalog/:categoryId` → CategorizedProducts (client-side route change).
  - `/catalog/products/:productId` → ProductDisplay
  - `/catalog/provider/:providerId` → Catalog (with provider filter)
- **Result:** Navigating between these URLs updates the React tree and does **not** reload the document, so state and performance stay intact.

### 7.1 Search flow (no page refresh)

- **HeroSearch (reference):** User types in the search input and submits (“Shop now” or Enter). That must **not** cause a full page reload.
- **Implementation:**
  1. In HeroSearch: on form submit, call `setSearchTerm(query)` from SearchContext, then `navigate('/catalog?q=' + encodeURIComponent(query))` using React Router’s `useNavigate()`. No `window.location` and no `<form action>` that would reload the page.
  2. Catalog page reads the query from the URL: `const [searchParams] = useSearchParams(); const q = searchParams.get('q');`. Sync with SearchContext on mount/update if needed (`setSearchTerm(q)` when `q` is present).
  3. When `q` is present: show **SearchResults** (or a search-only view) using existing `useCatalogSearch(q)`; render results with the same ProductCard/grid styling. When `q` is empty: show the normal category/product grid.
- **Result:** Search is a client-side transition; the catalog component stays mounted and only the content area switches between “browse” and “search results.”

### 7.2 Image loading and fast page load

**Requirement:** The catalog must load quickly even when many product images are present.

- **Lazy loading:** Use native lazy loading for product images so the browser only loads images as they enter (or near) the viewport. On each product image: `loading="lazy"` (and optionally `decoding="async"`). This avoids loading dozens of images at once on first paint.
- **Pagination:** Keep server-side pagination (e.g. `per_page` / `page`). Only the current page of products is rendered; that limits the number of images in the DOM and keeps layout/paint fast.
- **Placeholder / skeleton:** While an image is loading, show a placeholder (e.g. fixed-height block with background color or a small skeleton) so layout doesn’t shift (CLS) and the page feels responsive. Optionally use a low-quality or blur placeholder if the API or CDN supports it.
- **Image source:** Use the existing product image URL from the API (`image_url` or `fallback_image_url`). If the backend serves optimized variants (e.g. smaller thumbnails for the grid), use those for the catalog grid and reserve full-size for the product detail page.
- **Avoid blocking:** Do not wait for all images to load before showing the grid. Render the grid immediately with lazy-loaded images and placeholders so the page becomes interactive quickly; images fill in as the user scrolls.

**Checklist:** Product images in the catalog grid use `loading="lazy"`; pagination limits how many products (and thus images) are on the page; placeholders/skeletons prevent layout shift; no “load all images then show page” behavior.

---

## 8. i18n

- Keep existing catalog keys (e.g. `catalog.search.*`, `catalog.allProducts`, etc.).
- Add keys for new copy if needed: e.g. “What are you looking for today?”, “Give $5, get $5”, “Share Groupr”, “All”, “All Products”, “Items Fulfilled by”, “First”, “Back”, “Next”, “Last”.

---

## 9. Implementation checklist (nothing missed)

Use this as a step-by-step list; tick when done.

### Setup and assets

- [ ] **Tailwind:** Add Tailwind to devenv-main frontend; merge reference `catalog/tailwind.config.js` (colors, fonts, spacing, radii); set `content` to include Catalog and catalog-related components.
- [ ] Copy reference assets from `catalog/public/images/` to `devenv-main/frontend/public/images/` (categories, icons, merchant logo).
- [ ] Add or reuse `useMediaQuery` hook in `hooks/useMediaQuery.ts`.

### Page structure

- [ ] Rewrite `pages/Catalog/index.tsx`: remove/move dev box; **remove Carousel completely**; add PromoBanner, HeroSearch, CategoryStrip, then main content (grid + pagination + MerchantInfo); keep ProviderList when providerId; keep loading/error and empty state. Use only React Router (`navigate`, `Link`) for in-app links so there is no page refresh.
- [ ] Wire HeroSearch to SearchContext and navigate to `/catalog?q=...`.
- [ ] Wire CategoryStrip to useCategories and navigate to `/catalog` or `/catalog/:categoryId`; support “All”.
- [ ] Wire Pagination to groupedProducts.pagination and catalogState.currentPage.

### New components (create and wire)

- [ ] `PromoBanner.tsx` (dismissible).
- [ ] `HeroSearch.tsx` (search + submit → catalog with q).
- [ ] `CategoryStrip.tsx` (categories + scroll + CategoryCard).
- [ ] `CategoryCard.tsx` (icon + label, selected state).
- [ ] `Pagination.tsx` (First, Back, numbers, Next, Last).
- [ ] `MerchantInfo.tsx` (static or provider).

### Existing components to update

- [ ] **ProductCard:** Restyle to reference (image height, button position, text sizes); keep cart, EBT, quantity, onProductClick.
- [ ] **ProductGrid / CategorySection:** Adjust grid to reference (2/4 cols, gaps, max-width); keep “View all” and modal/navigate behavior.
- [ ] **CategoryListContainer / CategoryItem:** Replace usage with CategoryStrip + CategoryCard, or keep CategoryListContainer but style like CategoryStrip.
- [ ] **PaginationLinks:** Replace with new Pagination component in Catalog index.

### Search and performance

- [ ] **Search:** HeroSearch submit uses `navigate('/catalog?q=...')` only (no full page reload). Catalog reads `q` from `useSearchParams()` and shows SearchResults when `q` is set; restyle SearchResults with Tailwind.
- [ ] **Images:** Product images in catalog grid use `loading="lazy"`; use placeholder/skeleton while loading to avoid layout shift; rely on pagination so only the current page of products (and images) is rendered.

### Optional / polish

- [ ] SearchResults: when `q` present, show and restyle to match reference (Tailwind).
- [ ] CategorizedProducts: add CategoryStrip at top; same ProductCard/CategorySection styling.
- [ ] Add i18n keys for all new user-facing strings.
- [ ] Remove or refactor `Catalog.scss` for catalog in favor of Tailwind.
- [ ] Smoke test: catalog load, category click, product click, add to cart, search (no refresh), pagination, provider filter.

---

## 10. Summary

- **Replace** the current catalog **layout and section order** with the reference: **PromoBanner → HeroSearch** → CategoryStrip → ProductGrid → Pagination → MerchantInfo. **Remove the Carousel completely.**
- **No full page refresh:** All catalog navigation (search, category click, pagination) uses React Router (`navigate`, `Link`) only.
- **Tailwind** is the styling approach for catalog components; add Tailwind to the app and merge the reference theme.
- **Search:** HeroSearch submits via `navigate('/catalog?q=...')`; catalog reads `q` and shows search results client-side.
- **Fast load with many photos:** Lazy-load product images (`loading="lazy"`), keep pagination, use placeholders/skeletons, and avoid loading all images before showing the grid.
- **Keep** all API hooks, routing, cart, provider, and search behavior. **Port** reference components and **restyle** ProductCard/grid with Tailwind while preserving cart/EBT/detail behavior.

Following this document component-by-component and using the checklist ensures the port is complete with nothing missed.

---

## 11. Quick reference: source file → action and target

| Reference file | Action | Target (devenv-main) |
|----------------|--------|----------------------|
| `catalog/src/pages/CatalogPage.tsx` | Use as structure reference | Rewrite `pages/Catalog/index.tsx` to this layout order |
| `catalog/src/components/sections/PromoBanner.tsx` | Port | `pages/Catalog/Components/PromoBanner.tsx` (new) |
| `catalog/src/components/sections/HeroSearch.tsx` | Port + wire search | `pages/Catalog/Components/HeroSearch.tsx` (new) |
| `catalog/src/components/sections/CategoryStrip.tsx` | Port + wire API | `pages/Catalog/Components/CategoryStrip.tsx` (new) |
| `catalog/src/components/sections/CategoryCard.tsx` | Port | `pages/Catalog/Components/CategoryCard.tsx` (new) |
| `catalog/src/components/sections/ProductGrid.tsx` | Use layout only; data from API | Restyle `common/products/ProductGrid.tsx` + CategorySection |
| `catalog/src/components/sections/ProductCard.tsx` | Use visual spec only | Restyle `common/products/ProductCard.tsx`; keep cart/EBT |
| `catalog/src/components/sections/Pagination.tsx` | Port + wire state | `pages/Catalog/Components/Pagination.tsx` (new) or replace PaginationLinks |
| `catalog/src/components/sections/MerchantInfo.tsx` | Port | `pages/Catalog/Components/MerchantInfo.tsx` (new) |
| `catalog/src/components/ui/Card.tsx` | Use for CategoryCard/ProductCard look | Replicate with Tailwind in new components |
| `catalog/src/components/ui/Button.tsx` | Optional | Use for HeroSearch/PromoBanner; style with Tailwind |
| `catalog/src/components/ui/SearchBar.tsx` | Reference only | HeroSearch uses its own input |
| `catalog/src/components/layout/Navbar.tsx` | Skip | Use existing `common/NavBar` |
| `catalog/src/components/layout/Footer.tsx` | Skip | Use existing `common/Footer` |
| `catalog/src/components/layout/MobileNavDrawer.tsx` | Optional | Existing NavBar has mobile drawer |
| `catalog/src/data/products.ts` | Do not port | Use useProducts / API |
| `catalog/src/hooks/useMediaQuery.ts` | Port if missing | `hooks/useMediaQuery.ts` |
| `catalog/tailwind.config.js` | Merge into app | `devenv-main/frontend/tailwind.config.js` (Tailwind is the styling approach) |
| `catalog/public/images/*` | Copy | `frontend/public/images/` |
