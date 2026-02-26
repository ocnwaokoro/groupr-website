# Plan: Sort by (price, name, relevance) + Product card loading skeleton

**Scope:** Catalog product list ordering (backend + frontend) and a reusable loading state for product cards (shimmer/skeleton) used wherever cards are populated.

---

## Part 1: Sort by (price low→high, price high→low, name, relevance)

**Goal:** Let users sort catalog products by:
- **Relevance** (default; “index” order – the one treated as primary/greatest in the UI)
- **Price low to high**
- **Price high to low**
- **Name** (A–Z; locale-aware where applicable)

### 1.1 Backend

**API:** Accept a `sort` (or `order_by`) query parameter on catalog product endpoints.

**Suggested values:** `relevance` | `price_asc` | `price_desc` | `name_asc` (and optionally `name_desc`).

**Endpoints to support (at least):**
- **GET /catalog/products** (main catalog index) – grouped by category; within each category, order products by the chosen sort.
- **GET /catalog/provider/:provider_id** – same sort options for provider catalog.
- **GET /catalog/categories/:id** (category page) – same sort for a single category’s products.

**Implementation sketch:**
- **Relevance (default):** Keep current behavior: order by `category_id`, then `id` (or whatever defines “natural” order). No param or `sort=relevance`.
- **Price:** In the window function (or the final product query), order by `price_cents ASC` (price_asc) or `price_cents DESC` (price_desc), then `id` for stability.
- **Name:** Order by localized name (e.g. `name_en` or locale-based column) ASC/DESC, then `id`.
- The existing “first N products per category” window can use `ORDER BY <sort_column>, id` inside the partition so each category still returns up to N products, but ordered by the chosen criterion.

**DB indexes:** Add (or confirm) indexes that support these orderings without full scans, e.g.:
- `(category_id, price_cents)` for price sort
- `(category_id, name_en)` (and/or `name_es` if used) for name sort  
Relevance can continue to use existing `(category_id, id)` or primary key.

**Files (backend):**
- `app/controllers/api/catalog/products_controller.rb` – read `params[:sort]`, apply ordering in index and provider (and in category endpoint if in same or another controller).
- `app/controllers/api/catalog/categories_controller.rb` (or wherever category products are returned) – same sort param and ordering.
- Migrations or schema for new indexes if needed.
- Specs: request specs for catalog products and provider with `sort=price_asc`, `price_desc`, `name_asc`, `relevance`.

### 1.2 Frontend

**UI:** A “Sort by” control (dropdown or select) in:
- Main catalog (All) page
- Category page (CategorizedProducts)
- Search results (SearchResults)
- Optionally: View all / category modal (CategoryProductsModal)

**Behavior:**
- Default option: **Relevance** (index = “greatest” in the list; no param or `sort=relevance`).
- Options: Relevance, Price (low → high), Price (high → low), Name (A–Z).
- On change: set sort in state/URL (if using URL), set page to 1, refetch with new `sort` param.
- Pass `sort` into `useProducts`, `useCategoryProductsPaginated`, and into search (if search supports sort) or client-side sort of search results.

**Files (frontend):**
- Hooks: `useProducts.ts`, `useCategoryProductsPaginated` (or equivalent) – add `sort` to params and send to API.
- Catalog index, CategorizedProducts, SearchResults – add sort control and wire to data hooks.
- Types: ensure API types accept sort param and responses reflect ordering.

### 1.3 Summary (sort)

| Layer   | Change |
|--------|--------|
| Backend | `sort` param on index, provider, category products; ORDER BY price/name/relevance in window or query; indexes for sort columns. |
| Frontend | Sort dropdown; pass `sort` to API; reset page to 1 on change; relevance as default (index = greatest). |

---

## Part 2: Loading state – product card skeleton (shimmer)

**Goal:** Replace (or augment) the current loading spinner with a **one-row row of product-card skeletons**: grey box with a **white gradient moving across in a loop**, so it’s clear that product cards are loading and layout doesn’t jump when real cards appear.

**Vision:** Everywhere product cards are populated, **start with one row** of these skeletons, then **switch to the full section** of real cards once data is loaded.

### 2.1 Component design

- **Name:** e.g. `ProductCardSkeleton` or `ProductCardShimmer`.
- **Appearance:** Same approximate size and shape as a product card (image area + text area). Grey background; a **white gradient** (or light stripe) that **moves across** the card in a loop (CSS animation, e.g. `linear-gradient` + `background-position` or `transform`).
- **Layout:** Component can be used in a grid so that “one row” matches the same column count as real product cards (e.g. 2 cols mobile, 6 cols desktop for main catalog).
- **Accessibility:** `role="status"`, `aria-label="Loading"` (or similar) so screen readers know it’s a loading placeholder.

### 2.2 Where to use it

Use the skeleton **wherever product cards load**:

| Place | Current loading | New behavior |
|-------|------------------|--------------|
| **Catalog index (All)** | Centered spinner | One row of skeletons, then ProductGrid. |
| **CategorizedProducts (category page)** | Centered spinner | One row of skeletons, then category section. |
| **SearchResults** | Centered spinner | One row of skeletons, then search result grid. |
| **CategoryProductsModal** | (if loading) | One row of skeletons in modal, then ProductList. |

“One row” = same number of skeleton cards as one row of real cards in that context (e.g. 6 for main catalog desktop, 2 for mobile).

### 2.3 Experiment in “empty state tab”

You’ve mastered empty state and want to **experiment** with this loading component in the **empty state tab** (e.g. the Empty/Error demo category or a dedicated dev/experiment area). Suggested approach:

- **Phase 1 (experiment):** Implement `ProductCardSkeleton` and use it in the **Empty/Error demo category** view (or a single, well-defined “loading demo” section) so you can tune the grey box, gradient, and animation without affecting all pages.
- **Phase 2 (rollout):** Once the design is approved, replace the spinner with one row of skeletons in **all** the places listed above.

### 2.4 Files (frontend)

- **New:** `ProductCardSkeleton.tsx` (or `ProductCardShimmer.tsx`) – grey box + moving white gradient; optional wrapper that renders a grid of N skeletons for “one row”.
- **Update:** Catalog index, CategorizedProducts, SearchResults, CategoryProductsModal – when `isLoading`, render one row of skeletons instead of (or in addition to) the current spinner; when data is ready, render the full product section.
- **Styles:** CSS or Tailwind for the gradient animation (e.g. `@keyframes` + `background-position` or `translateX`).

### 2.5 Summary (loading)

| Item | Detail |
|------|--------|
| Component | ProductCardSkeleton: grey box, white gradient moving across in a loop; same rough size as ProductCard. |
| First use | Experiment in empty state tab / Empty/Error demo category. |
| Rollout | All places that load product cards: Catalog index, category page, SearchResults, category modal. |
| Layout | One row of skeletons (column count matches real grid), then full section when data is populated. |

---

## Implementation order (suggested)

1. **ProductCardSkeleton** – Implement component and animation; try it in the empty state / demo area.
2. **Roll out skeleton** – Replace spinner with one row of skeletons in Catalog index, CategorizedProducts, SearchResults, modal.
3. **Backend sort** – Add `sort` param, ORDER BY, and indexes; add request specs.
4. **Frontend sort** – Sort dropdown and wiring to API on catalog, category, and search.

---

## Record

- **Created:** 2026-02-07  
- **Status:** Plan only; not yet implemented.
