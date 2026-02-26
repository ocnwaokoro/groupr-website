# GRO-561: Reintroduce search using backend endpoint — analysis

**Ticket:** [GRO-561](https://linear.app/groupr/issue/GRO-561/reintroduce-search-using-the-backend-search-endpoint)  
**Reference commit:** `99b4933332520c7ce70b5df4a63b1e9883ed52a9` (Catalog UI and search updates #163) — switched to client-side search; this ticket restores backend search + URL sync.

---

## Step 1: Goal (one sentence)

**Done looks like:** Catalog search uses the backend `GET /api/catalog/search` with `q`, `page`, `per_page`; search term and pagination are in the URL so search is shareable/bookmarkable; loading, error, empty, and paginated states work with the backend response.

---

## Step 2: Current state

### Backend (existing, no change)

- **Route:** `GET /api/catalog/search`
- **Params:** `q`, `page`, `per_page`
- **Response:** `{ results: Product[], pagination: { current_page, per_page, total_pages, total_count } }`

### Frontend (after 99b4933)

| File | Current behavior |
|------|------------------|
| **SearchContext.tsx** | Uses `useCatalogSearchIndex(providerId)` — full catalog fetch, no `q`. Builds `searchResults` in a `useMemo` that filters `indexProducts` by `name`/`description` and slices for pagination. No URL sync; state is reducer-only. `navigateToSearch()` navigates to `/catalog` or `/catalog/provider/:id` with no query params. |
| **SearchBar.tsx** | On submit: `setSearchTerm(trimmedSearch)` and `navigate('/catalog')` — no `q` in URL. |
| **useCatalogSearch.ts** | Calls `apiClient.getAll` on `/catalog/search` with `q`, `page`, `per_page`; returns `useQuery` with `enabled: q?.trim().length > 0`. **Not used** anywhere. |
| **SearchResults.tsx** | Consumes `searchResults` from context (`data`, `isLoading`, `error`) and `page`/`setPage`. Expects `data.results` and `data.pagination`. No code change needed if context exposes same shape from backend. |
| **Catalog index / CategorizedProducts** | `showSearchResults = searchTerm.trim().length > 0`; when true render `<SearchResults />`. No change needed once context drives search from backend + URL. |

### Gap

- Search is client-side (big payload, in-memory filter); no shareable URL; `useCatalogSearch` exists but is unused. Need to switch context to `useCatalogSearch`, add URL sync (`q`, `page`, `per_page`), and have SearchBar navigate with `?q=...`.

---

## Step 3: Scope (from ticket)

**Will change:**

- **SearchContext:** Replace `useCatalogSearchIndex` + in-memory filter with `useCatalogSearch(q, page, per_page)`; sync state to/from URL via `useSearchParams` (`q`, `page`, `per_page`); set `searchResults` from backend query; `navigateToSearch` includes `q` (and optional `page`/`per_page`) when present.
- **SearchBar:** On submit, navigate to `/catalog?q=...` (or `/catalog/provider/:id?q=...` when on provider catalog) so the URL drives search.
- **useCatalogSearch:** Reused as-is unless provider scoping is added later (backend would need `provider_id` support).

**Won’t change:**

- SearchResults UI (Tailwind, CategorySection, Pagination).
- Backend (endpoint already exists).
- useCatalogSearchIndex (can remain in useProducts for other uses); only SearchContext stops using it for main search.
- Catalog/CategorizedProducts layout — only the source of `searchResults` and URL-driven state change.

**Out of scope for this ticket:** Provider-scoped search (backend does not filter by provider today). Document or follow-up if needed.

---

## Step 4: Implementation plan

See **docs/GRO-561-search-implementation-plan.md** for file-by-file changes.

No code has been written yet; implement after scope and plan are confirmed (Step 5).
