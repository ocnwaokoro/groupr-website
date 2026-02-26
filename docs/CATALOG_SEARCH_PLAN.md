# Catalog Search: Fix Raw Keys + Optimization Plan

## Problem 1: Raw translation keys visible

Strings like `catalog.search.noResults` and `catalog.search.tryDifferentTerm` appear because:

- **SearchResults.tsx** uses `t('catalog.search.noResults')`, `t('catalog.search.tryDifferentTerm')`, `t('catalog.search.error')`, `t('catalog.search.results')`, `t('catalog.search.resultsFor', …)`, `t('catalog.search.foundResults', …)`.
- **en.json** (and es.json) only define `catalog.searchBox.title` and `catalog.allProducts`. There is no `catalog.search` object, so i18n falls back to the key and the key is shown.

**Rule:** The UI must never show a raw key. Users should always see readable copy.

---

## Plan Part A: Never show raw keys

**Option A1 – Add missing keys (i18n-compliant)**  
- In **en.json** and **es.json**, add under `catalog`:
  - `catalog.search.error` (e.g. "Search failed. Please try again.")
  - `catalog.search.noResults` (e.g. "No results found.")
  - `catalog.search.tryDifferentTerm` (e.g. "Try a different search term.")
  - `catalog.search.results` (e.g. "Search results")
  - `catalog.search.resultsFor` (e.g. "Results for \"{{term}}\"")
  - `catalog.search.foundResults` (e.g. "{{count}} result(s) for \"{{term}}\"")
- Keeps full i18n; requires maintaining keys in both locales.

**Option A2 – Use fallback copy in code (recommended for robustness)**  
- In **SearchResults.tsx** (and **SearchBox.tsx** if it uses catalog keys), stop relying on keys that may be missing.
- Use a small helper, e.g. `tWithFallback(key, fallback)`, or call `t(key)` and if the result equals the key, use a hardcoded English string.
- Alternatively, replace `t('catalog.search.*')` with plain English strings in SearchResults so the catalog search UI never depends on `catalog.search` at all. Then add the keys to en.json later for consistency if desired.
- **Recommendation:** Implement Option A2 with plain English fallbacks in SearchResults (and any similar component) so the app never shows a key even when keys are missing or i18n fails.

**Concrete change (Option A2):**  
- In **SearchResults.tsx**, replace every `t('catalog.search.xxx')` with either a fallback function or direct strings, e.g.:
  - Error: "Search failed. Please try again."
  - No results: "No results found." / "Try a different search term."
  - Results: "Search results", "Results for \"{{term}}\"", "{{count}} result(s) for \"{{term}}\"."
- Optionally add the same keys to **en.json** / **es.json** and use `t('catalog.search.xxx', { defaultValue: '...' })` so once keys exist they are used, but missing keys never show.

---

## Plan Part B: Search logic optimization

### B1. useCatalogSearch

- **Enabled condition:** Keep `enabled: q?.trim().length > 0` so empty/whitespace search does not run.
- **Stale time:** Already 5 minutes; keep or tune if needed.
- **Remove debug:** Remove `console.log` and `console.error` from the hook (or guard with `import.meta.env.DEV`).
- **Per page:** Align default `per_page` with catalog (e.g. 12 or 24) if you want same page size as category grids.

### B2. SearchContext and URL sync

- **Single source of truth:** Consider deriving initial state from URL only (searchParams.get('q'), get('page')) and avoid persisting a separate “search term” in context that can get out of sync. Or ensure every context update that changes `q`/page also updates the URL, and vice versa (one-way sync from URL on mount and when URL changes).
- **setSearchTerm:** Reducer already sets `page: 1` on SET_SEARCH_TERM; avoid dispatching SET_PAGE(1) again in the same action to prevent double render/effects.
- **updateUrlParams:** Call it once per user action with the full desired state (e.g. after one dispatch) so URL and state stay in sync without redundant updates.

### B3. HeroSearch debounce and navigation

- **Debounce:** Keep debounce (e.g. 400 ms); consider 300–500 ms as a balance between responsiveness and reducing requests.
- **Navigate vs replace:** Use `replace: true` when updating `q` from typing so the back button doesn’t step through every keystroke. Submit can use normal `navigate` so “Search” creates a new history entry.
- **Initial q from URL:** Already syncing `query` from `qFromUrl`; ensure on first load with `?q=...` the context gets that value (SearchProvider reads from searchParams; HeroSearch sets query from qFromUrl). If the provider initializes before the URL is ready, consider initializing from URL inside the provider (e.g. in a small effect or when reading searchParams).

### B4. When to show “no results” vs “enter a term”

- **Empty term:** If the user has not entered a term (or cleared it), do not show the “no results” / “try different term” UI. Either show the main catalog or a neutral “Enter a search term” state. useCatalogSearch is already disabled when `q` is empty; the catalog page should branch on “has q” to show SearchResults vs main grid, and only show “no results” when there was a search and the result set is empty.

### B5. SearchResults UI branching

- **Only when there is a search term:** Render the “no results” / “try different term” block only when `searchTerm` (or `q`) is non-empty and the API returned successfully with zero results. Do not show it when the query was skipped (empty term) or on error; use distinct copy for error (e.g. “Search failed. Please try again.”).

---

## Implementation order

1. **Fix raw keys (Part A)** – Replace or add fallbacks for every `catalog.search.*` usage in SearchResults (and SearchBox if applicable) so the UI never shows a key. Add the same strings to en.json (and es.json) under `catalog.search` so i18n is complete.
2. **Remove debug logs** – Remove or guard console.log/console.error in useCatalogSearch.
3. **Context/URL and double dispatch** – Ensure setSearchTerm does not double-dispatch (page 1 set only in reducer); keep URL and state in sync with one update per action.
4. **Empty state** – Ensure “no results” / “try different term” only render when there was a real search (non-empty q) and zero results; keep “search failed” for errors only.
5. **Optional** – Align per_page with catalog, tune debounce, and document “single source of truth” for URL vs context in SearchProvider.
