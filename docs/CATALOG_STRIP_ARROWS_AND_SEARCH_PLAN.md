# Catalog: Strip Desktop Arrows (Option B) + Fast Search (No `q` in URL)

Single plan covering: (1) category strip arrows on desktop when the strip overflows, and (2) removing `q` from the URL and making search as fast as possible via client-side filtering over a one-time fetched dataset.

---

## Part 1: Option B – Desktop arrows when strip is too long

**Goal:** When the category strip doesn’t fit in one row on desktop, show left/right arrows and make the strip scrollable (same behavior as mobile).

### 1.1 Detect overflow

- **Where:** `CategoryStrip.tsx`
- **How:** Use a ref on the scroll container (the div that holds the cards and has `ref={scrollRef}`).
- **Option A – ResizeObserver:** Observe the scroll container; when `scrollWidth > clientWidth` set state e.g. `isOverflowing = true`, else `false`. Update on resize and when list length changes.
- **Option B – useEffect + resize listener:** On mount and when `list.length` or window `resize` fires, read `scrollRef.current.scrollWidth` and `scrollRef.current.clientWidth`; set `isOverflowing` in state. Use a small timeout or requestAnimationFrame if layout isn’t ready immediately.
- **State:** e.g. `const [isOverflowing, setIsOverflowing] = useState(false)`.

### 1.2 Show arrows when overflowed (desktop included)

- **Current:** Arrow buttons have `md:hidden`, so they only show on mobile.
- **Change:** Show arrows when the strip overflows, on all breakpoints. For example:
  - Render the left/right arrow buttons when `isOverflowing` is true (remove `md:hidden` and use a single condition: arrows visible when `isOverflowing`).
  - Or: on mobile always show arrows; on desktop (`md` and up) show arrows only when `isOverflowing`. That keeps current desktop look when everything fits.

### 1.3 Make strip scrollable on desktop when overflowed

- **Current:** Scroll container has `md:overflow-visible md:flex md:items-center md:justify-between`, so on desktop it doesn’t scroll.
- **Change:** When `isOverflowing` is true, allow horizontal scrolling on desktop too. For example:
  - Use a single scrollable style when overflowed: e.g. `overflow-x-auto` (and keep `scrollbar-hide` if you want arrows-only UX). When not overflowed, keep `overflow-visible` and `justify-between` so a single row fits without scroll.
  - Class logic example: when `isOverflowing`: `overflow-x-auto`; when not: `md:overflow-visible` and current layout. Ensure the container has a constrained width (e.g. `min-w-0 flex-1`) so it can actually overflow on large viewports when there are many cards.

### 1.4 Reuse existing scroll and scroll-to-selected

- Keep the existing `scroll(direction)` that uses `scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' })` for arrow clicks.
- Keep the existing `useEffect` that calls `scrollIntoView({ inline: 'center' })` for the selected category so the selected card stays in view after navigation.

### 1.5 Files and summary

- **File:** `src/pages/Catalog/Components/CategoryStrip.tsx`
- **Summary:** Add overflow detection (ResizeObserver or resize + scrollWidth/clientWidth) → set `isOverflowing`. Show arrows when `isOverflowing` (and optionally always on mobile). When `isOverflowing`, use `overflow-x-auto` on the strip container on desktop; otherwise keep current desktop layout. No change to strip contents or routing.

---

## Part 2: Remove `q` from URL and make search as fast as possible

**Goals:**  
- No `q` (or other search-related params) in the URL for catalog search.  
- Search feels instant: typing immediately filters the list without a round-trip or URL change.

**Approach:** Fetch a searchable dataset once (e.g. product names or full products), cache it, and filter in the client. No per-keystroke API call and no URL update for the search term.

### 2.1 Remove `q` from URL everywhere

- **SearchContext**
  - Stop reading `searchParams.get('q')` for initial `searchTerm`. Initialize `searchTerm` from `''` (or from `sessionStorage` if you want to persist across refresh).
  - Stop writing `q` to the URL in `updateUrlParams` and in any `setSearchParams` that sets `q`. Remove the `if (newState.searchTerm) params.set('q', ...)` branch.
  - Keep `page` (and `per_page` if used) in the URL only if you still need shareable pagination for search; if search is fully client-side, you may drop search-related URL params entirely.
- **HeroSearch**
  - Stop navigating to `/catalog?q=...`. On submit or after debounce, call `setSearchTerm(trimmed)` only. Optionally `navigate('/catalog')` or `navigate('/catalog', { replace: true })` if you need to ensure the user is on the catalog route without adding `q`.
  - Stop reading `qFromUrl` from `searchParams.get('q')` to sync the input; the input is driven by context `searchTerm` (or local state that syncs with context).
- **Catalog index (Catalog.tsx)**
  - Stop deriving “search active” from the URL. Replace `const q = searchParams.get('q')` and `showSearchResults = Boolean(q?.trim())` with `showSearchResults = searchTerm.trim().length > 0` where `searchTerm` comes from `useSearch()`.
  - Remove the `useEffect` that syncs `q` from URL into `setSearchTerm`.
- **NavBar SearchBar (if it links to catalog search)**
  - Stop building `navigate(\`/catalog?q=...\`)`. Navigate to `/catalog` and set the search term via context (e.g. call `setSearchTerm(trimmed)` before or after navigate) so the catalog page shows search results without `q` in the URL.
- **Any other callers** that read `q` from the URL or write `q` to the URL should be updated to use only context (and optional sessionStorage) for the current search term.

Result: URL never contains `q`; search term lives only in React state (and optionally sessionStorage).

### 2.2 Fast search: one fetch + client-side filter

- **Data source:** You need a single dataset that can be filtered by search term. Options:
  - **A – Reuse main catalog response:** If the main catalog request already returns a large set of products (e.g. grouped by category with a high `products_per_category`), you can flatten those products and filter by name (and optionally description) in the client. Pros: no new endpoint. Cons: only as many products as the main catalog returns; if that’s small, search will be limited.
  - **B – Dedicated “search index” request:** One request that returns a list suitable for search (e.g. all product ids and names, or full product objects) for the catalog scope (e.g. all products or per provider). Response is cached (e.g. React Query with long `staleTime`). All search filtering is then done in the client. Pros: can support “800 names” or more; one quick fetch, then instant filtering. Cons: requires backend support (new endpoint or existing one with high limit).
- **Recommendation:** Prefer B if the backend can expose a lightweight list (e.g. GET `/catalog/products` with a high limit and minimal fields, or GET `/catalog/search_index`). If not, use A and document the limit (e.g. “search is over the first N products per category”).

### 2.3 Implementation outline (client-side search)

- **New or repurposed hook (e.g. `useCatalogSearchIndex`):**
  - Fetches the full searchable list once (no `q` param). Query key e.g. `['catalog-search-index', providerId]` so it refetches when provider changes.
  - Returns `{ data, isLoading, error }` where `data` is the full list (or grouped structure you will filter).
- **Filtering:** In the catalog page or in a thin wrapper:
  - When `searchTerm.trim().length === 0`, show the normal catalog (no search UI).
  - When `searchTerm.trim().length > 0`, take the cached list, filter by `searchTerm` (e.g. `product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())`), and optionally by description. Result is a list of products (or grouped by category if you keep structure). No API call on keystroke.
- **Pagination (optional):** If the filtered list is large, paginate in the client (e.g. slice `filteredList` by `(page - 1) * perPage` and `page * perPage`) and keep `page` in component state (or in context). No need to put `q` in the URL; only `page` in URL is optional.
- **SearchContext changes:**
  - Remove `useCatalogSearch` (the hook that calls `/catalog/search?q=...`) from the provider if search is fully client-side.
  - Expose either (a) the cached search-index data + `searchTerm` so the catalog can derive filtered results, or (b) a precomputed `filteredSearchResults` (and `searchResultsLoading` / `searchResultsError` from the index query). That way the catalog page and SearchResults component stay simple: they read “search results” from context (or from a hook that uses the index + searchTerm) and never hit the server per keystroke.

### 2.4 HeroSearch and debounce

- **Debounce:** Keep a short debounce (e.g. 300–400 ms) so you don’t re-filter on every single keystroke if the list is very large; or remove debounce and filter on every keystroke for true “instant” feel (usually fine for hundreds of items). User said “instant switch of data,” so prefer minimal or no debounce for the filter step; debounce can still be used only to avoid updating context on every keydown if desired.
- **No URL update:** HeroSearch only updates context (and optionally navigates to `/catalog` without query params).

### 2.5 Files to touch (search)

| Area | File(s) | Change |
|------|--------|--------|
| URL / state | `SearchContext.tsx` | Stop reading/writing `q` in URL; init `searchTerm` from `''` (or sessionStorage); remove or replace `useCatalogSearch` with index-based data. |
| URL / state | `HeroSearch.tsx` | Stop using `q` from URL; stop navigating to `?q=...`; only `setSearchTerm` and optional `navigate('/catalog')`. |
| Catalog page | `Catalog/index.tsx` | Derive `showSearchResults` from `searchTerm` (context), not `searchParams.get('q')`; remove `useEffect` that syncs `q` into context. |
| Search results UI | `SearchResults.tsx` | Consume “search results” from context (or new hook) that is derived from the cached index + `searchTerm`; no dependency on URL `q`. |
| Nav / other | `NavBar/.../SearchBar.tsx` (if any) | Navigate to `/catalog` and set search term via context; no `?q=...`. |
| Data | New or existing hook | e.g. `useCatalogSearchIndex`: fetch full list once, return it; catalog or context filters by `searchTerm` and exposes result. |
| Backend (if needed) | Endpoint for “all products” or “search index” | Optional: endpoint that returns enough products (e.g. 800) or a search index so the client can filter locally. |

### 2.6 Summary (search)

- **Remove `q` from URL:** All reads/writes of `q` in URL are removed; search term lives only in context (and optionally sessionStorage).
- **Fast search:** One fetch (catalog search index or large product list), cached; filtering by `searchTerm` done in the client for instant response.
- **No per-keystroke request:** Search is a client-side filter over in-memory data; no glitch from URL or network delay.

---

## Implementation order

1. **Part 2 (search)** – Remove `q` from URL and switch to client-side search (add/use index hook, update SearchContext, HeroSearch, Catalog, SearchResults, and any nav that links to search). This removes the URL-related glitch and makes search instant.
2. **Part 1 (strip)** – Add overflow detection in CategoryStrip and desktop arrow + scroll behavior when the strip is too long.

Do only the plan (no code changes in this step). Implement in a follow-up if desired.
