# Plan: Catalog search “contains” matching

**Requirement:** [GRO-561-SEARCH-CONTAINS-REQUIREMENT.md](./GRO-561-SEARCH-CONTAINS-REQUIREMENT.md)  
**Scope:** Backend only. Frontend already sends `q` and displays API results; no frontend change.

---

## 1. Locate the search implementation

- Find where **GET /api/catalog/search** (or equivalent) is handled: route, controller action, and the code that builds the product query from `q`.
- Identify the current matching logic (e.g. full-word, exact, or full-text). That is what will be replaced with contains matching.

---

## 2. Change matching to “contains”

- **Input:** Use the `q` (search term) request param; trim and treat empty as “no search” (return all or same as no-query behavior, per current API contract).
- **Sanitization:** Before using the term in SQL, escape `%` and `_` so they are not interpreted as wildcards (e.g. Rails: `ActiveRecord::Base.sanitize_sql_like(term)`). This avoids both injection and accidental broad matches.
- **Query:** Filter products where the search term appears **inside** `name` and optionally **inside** `description`, case-insensitive.  
  - Example (Rails/Postgres):  
    `Product.where("name ILIKE :q OR description ILIKE :q", q: "%#{sanitize_sql_like(term)}%")`  
  - If the API supports provider/category filters, keep those and add the above condition with AND.
- **Pagination:** Leave existing `page` / `per_page` behavior unchanged; apply them to the new scope.

---

## 3. Verify behavior

- **Contains:** “app” returns products whose name or description contains “app” (e.g. “Apple”, “Organic Apples”).
- **Case:** “APP” and “app” return the same results (case-insensitive).
- **Special chars:** A term containing `%` or `_` does not break the query and only matches literal `%`/`_` in data (sanitization works).
- **Empty/short:** Empty `q` (or current “no search” behavior) and very short terms behave as defined (e.g. minimum length or no filter).

---

## 4. Optional: performance and scale

- For small/medium catalogs, `ILIKE '%term%'` is usually acceptable.
- If the products table grows large and search gets slow, consider: PostgreSQL trigram index (`pg_trgm`) for `ILIKE '%term%'`, or a dedicated full-text search approach, as a follow-up.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Locate route and query that implement catalog search. |
| 2 | Replace current match logic with contains: sanitize `q`, then filter with `name ILIKE '%term%'` (and optionally `description ILIKE '%term%'`). Keep pagination and other filters. |
| 3 | Test contains, case-insensitivity, and sanitization. |
| 4 | Document or plan indexing if the table grows. |
