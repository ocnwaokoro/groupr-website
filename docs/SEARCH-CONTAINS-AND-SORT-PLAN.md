# Plan: Search contains + sort (no sort in page URL)

## Your ask

1. **Backend:** Allow “contains” search (substring match) and proper sorting of search results.
2. **Constraint:** Under no circumstances should **sort** appear in the **URL** (the browser address bar).

## Analysis: Is this possible?

**Yes.** Here’s how it fits together.

- **“Sort not in the URL”** means: the **page URL** (what the user sees in the address bar and what can be bookmarked/shared) must never include a sort parameter. So no `?sort=price_asc` on `/catalog?q=...`.
- **Sort can still be used** by keeping it only in **React state** and sending it only in the **API request**. The frontend will call `GET /api/catalog/search?q=...&page=...&per_page=...&sort=...` — that’s the request URL. The **page** URL stays `/catalog?q=...&page=...` (or with `per_page` if you already have it). So:
  - **Page URL (browser):** `q`, `page`, `per_page` only — shareable, bookmarkable.
  - **API request:** same plus `sort` — never written to the address bar.

The catalog category view already works this way: `CategorizedProducts` keeps `sort` in `useState` and sends it only to the API; the page URL has no `sort`. We do the same for search.

---

## Backend (in backend repo)

### 1. Contains search

- Implement as in [GRO-561-SEARCH-CONTAINS-PLAN.md](./GRO-561-SEARCH-CONTAINS-PLAN.md): sanitize `q`, filter with `name ILIKE '%term%'` (and optionally `description ILIKE '%term%'`).

### 2. Sort for search results

- **Endpoint:** same `GET /api/catalog/search` (or equivalent).
- **New optional query param:** `sort`.
- **Allowed values:** align with catalog (e.g. `relevance` | `price_asc` | `price_desc` | `name_asc` | `name_desc`). If `sort` is missing or invalid, default to `relevance`.
- **Behavior:**
  - `relevance`: backend-defined default order (e.g. by relevance score, or by name/created_at if no ranking).
  - `price_asc` / `price_desc`: order by price (handle nulls as you do elsewhere).
  - `name_asc` / `name_desc`: order by name (case-insensitive).
- Apply **after** the search filter and **before** pagination so that pagination is over the sorted list.

No change to response shape; only the order of `results` changes.

---

## Frontend (this repo)

### 1. Sort is state-only (never in the URL)

- Add a **search sort** value that lives only in React state (e.g. in `SearchContext` as plain state, or in a component that wraps search UI). Do **not** read or write it via `useSearchParams` / `setSearchParams`. The page URL continues to expose only `q`, `page`, and optionally `per_page`.

### 2. Pass sort into the search API

- **useCatalogSearch:** Extend params to accept optional `sort`. Send `sort` in the request only when provided (and optionally omit when `relevance` to keep cache keys stable).
- **SearchContext:** Hold `searchSort` (or `sort`) in state with a default (e.g. `relevance`). Expose `searchSort` and `setSearchSort`. When calling `useCatalogSearch`, pass `sort: searchSort`. Include `searchSort` in the hook’s query key so changing sort triggers a new request. Do **not** sync `searchSort` to the URL.

### 3. Search results UI

- In **SearchResults** (or the block that shows “Results for …” and the product list), render a **SortDropdown** (same component and options as catalog: Relevance, Price low→high, Price high→low, Name A–Z, Name Z–A). Value = search sort state; onChange = `setSearchSort`. Optionally reset to page 1 when sort changes (if you want that behavior).

---

## Summary

| Item | Where | Detail |
|------|--------|--------|
| Contains search | Backend | Sanitize `q`; filter with `ILIKE '%term%'` on name/description. |
| Sort param | Backend | Optional `sort` on `GET /api/catalog/search`; same values as catalog; apply order before pagination. |
| Sort in URL | Never | Sort is **not** in the page URL. Only in React state and in the API request. |
| Search sort state | Frontend | e.g. SearchContext: `searchSort` + `setSearchSort`, not synced to URL. |
| useCatalogSearch | Frontend | Add optional `sort` to params and to query key. |
| SearchResults | Frontend | Add SortDropdown bound to search sort state. |

Result: users get contains search and sortable search results; the address bar stays clean (only `q`, `page`, `per_page`), and sort is not shareable/bookmarkable by design.

---

## Status

- **Frontend (this repo):** Done. Search sort is in state only; `useCatalogSearch` sends optional `sort`; `SearchResults` shows `SortDropdown`. Changing sort resets to page 1 and refetches; sort never appears in the page URL.
- **Backend:** Implement contains search (see [GRO-561-SEARCH-CONTAINS-PLAN.md](./GRO-561-SEARCH-CONTAINS-PLAN.md)) and accept optional `sort` on `GET /api/catalog/search` with values `relevance` | `price_asc` | `price_desc` | `name_asc` | `name_desc`.
