# GRO-561: Implementation plan — backend search + URL sync

**Ticket:** [GRO-561](https://linear.app/groupr/issue/GRO-561/reintroduce-search-using-the-backend-search-endpoint)

---

## Files to change

1. **SearchContext.tsx** — switch to backend hook + URL sync
2. **SearchBar.tsx** — navigate with `?q=...` on submit
3. **useCatalogSearch.ts** — no change (or add `provider_id` later if backend supports)
4. **SearchResults.tsx** — no change unless response shape differs (backend matches)

---

## 1. `src/contexts/SearchContext.tsx`

### 1.1 Imports

- **Remove:** `useCatalogSearchIndex`, `CATEGORY_PAGE_SIZE`, `MOBILE_CATEGORY_PAGE_SIZE` from `useProducts` (keep the latter two if still used for perPage default).
- **Add:** `useSearchParams` from `react-router-dom`.
- **Add:** `useCatalogSearch` from `../hooks/useCatalogSearch`.

### 1.2 URL as source of truth for q, page, per_page

- Use `const [searchParams, setSearchParams] = useSearchParams()`.
- **Derive** each render (no reducer for these):
  - `searchTerm = searchParams.get('q') ?? ''`
  - `page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)`
  - `perPage`: from URL `per_page` if present, else use responsive default (e.g. `isMobile ? MOBILE_CATEGORY_PAGE_SIZE : CATEGORY_PAGE_SIZE`). Keep `useMediaQuery` and the perPageMatch logic for the default when URL has no `per_page`.
- **isSearching:** `searchTerm.trim().length > 0`.

### 1.3 Backend search

- Call `useCatalogSearch({ q: searchTerm, page, per_page: perPage })` (only when `searchTerm.trim().length > 0` the hook runs, via `enabled`).
- **searchResults:** Map the query result to `SearchResultsShape`:
  - `data: query.data ?? null` (backend returns `{ results, pagination }` which matches)
  - `isLoading: query.isLoading`
  - `error: query.error ?? null`
- When there is no search term, expose `searchResults = { data: null, isLoading: false, error: null }` so `SearchResults` doesn’t request.

### 1.4 Setters that update URL

- **setSearchTerm(term):** `setSearchParams(prev => { const next = new URLSearchParams(prev); const t = term.trim(); if (t) { next.set('q', t); next.set('page', '1'); } else { next.delete('q'); next.delete('page'); next.delete('per_page'); } return next; }, { replace: true or false })`. Preserve other params (e.g. `fns_review`) when building `next`.
- **setPage(p):** `setSearchParams(prev => { const next = new URLSearchParams(prev); next.set('page', String(p)); return next; })`.
- **setPerPage(n):** `setSearchParams(prev => { const next = new URLSearchParams(prev); next.set('per_page', String(n)); next.set('page', '1'); return next; })`.
- **clearSearch():** `setSearchParams(prev => { const next = new URLSearchParams(prev); next.delete('q'); next.delete('page'); next.delete('per_page'); return next; })`.

### 1.5 navigateToSearch

- Build path: `id ? `/catalog/provider/${id}` : '/catalog'`.
- If there is a current search term (from URL), include query params: `?q=...&page=...&per_page=...` so the catalog page shows search results.
- `navigate(path + (searchTerm ? `?q=${encodeURIComponent(searchTerm)}&page=${page}&per_page=${perPage}` : ''))` (or use `createSearchParams` / URLSearchParams to preserve other params like `fns_review`).

### 1.6 Remove

- Remove `useReducer` and `searchReducer` (state is URL-derived).
- Remove `useCatalogSearchIndex(id)` and the `useMemo` that filters `indexProducts` and builds client-side `searchResults`.

### 1.7 Context value

- Provide: `searchTerm`, `page`, `perPage`, `isSearching`, `setSearchTerm`, `setPage`, `setPerPage`, `clearSearch`, `navigateToSearch`, `searchResults` (from backend hook + empty state when no q).

---

## 2. `src/common/NavBar/Components/SearchBar.tsx`

- **On submit:** Instead of `navigate('/catalog')`, navigate with query param:
  - If on provider catalog: `const { providerId } = useParams(); ... navigate(providerId ? `/catalog/provider/${providerId}?q=${encodeURIComponent(trimmedSearch)}` : `/catalog?q=${encodeURIComponent(trimmedSearch)}`)`.
  - Preserve other query params (e.g. `fns_review`) if desired: read current `searchParams`, clone, set `q`, then `navigate(pathname + '?' + next.toString())`.
- **Optional:** Pre-fill the input when the page has `q` in URL (read `searchTerm` from `useSearch()` and use as initial/local value so the navbar shows the current search term when user navigated via URL). Currently SearchBar uses local state `localSearch`; on mount we could sync from context `searchTerm` so when landing with `?q=apple` the input shows "apple".

---

## 3. `src/hooks/useCatalogSearch.ts`

- No code change required.
- Confirm: `enabled: q?.trim().length > 0`; response shape `{ results, pagination }` matches `SearchResultsShape.data`.
- **Later (out of scope):** If backend adds `provider_id`, add it to params and pass from context when on provider catalog.

---

## 4. `src/pages/Catalog/Components/SearchResults.tsx`

- No change if context still exposes `searchResults` with `{ data: { results, pagination }, isLoading, error }` and `page` / `setPage`. Backend returns that shape.
- If backend uses different keys (e.g. `current_page` vs `page`), adapt destructuring in this file only.

---

## 5. Catalog index and CategorizedProducts

- No change: they already use `searchTerm` and `showSearchResults = searchTerm.trim().length > 0` and render `<SearchResults />`. Once `searchTerm` and `searchResults` come from URL + backend, they work as-is.
- Ensure when user opens `/catalog?q=apple`, the page shows search results (context reads `q` from URL, so `searchTerm` is set and `useCatalogSearch` runs).

---

## 6. Preserve other query params

- When setting `q`, `page`, `per_page` in the URL, preserve existing params like `fns_review` (e.g. when building `URLSearchParams(prev)` and then set/delete only search-related keys).

---

## Implementation order

1. **SearchContext:** URL sync + replace index with `useCatalogSearch`; remove reducer and in-memory filter; implement setters and `navigateToSearch`.
2. **SearchBar:** Navigate with `?q=...` (and provider path + param preservation if applicable).
3. **Optional:** SearchBar initial value from context `searchTerm` so URL with `q` shows in the input.
4. **Verify:** SearchResults, Catalog, CategorizedProducts with manual tests and any existing tests.

---

## Verification

- Submit search from navbar → URL becomes `/catalog?q=...` (or provider path + q); results from backend; network shows `GET /api/catalog/search?q=...&page=1&per_page=...`.
- Open `/catalog?q=apple` in new tab → page shows search results for "apple".
- Change page in search results → URL updates; backend called with new page.
- Clear search → URL loses `q`/`page`/`per_page`; catalog shows normal view.
- No regression: catalog and category views without `q` work as before.
