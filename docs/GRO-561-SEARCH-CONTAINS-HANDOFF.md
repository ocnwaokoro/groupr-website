# Search contains — handoff for backend repo

Execute the plan in **[GRO-561-SEARCH-CONTAINS-PLAN.md](./GRO-561-SEARCH-CONTAINS-PLAN.md)** in the **backend** repository (where `GET /api/catalog/search` is implemented). This repo only has frontend code.

## Checklist (in backend repo)

- [ ] **1. Locate** the controller/action and query that handle catalog search (e.g. `CatalogController#search` or similar). Find where `q` is used to filter products.
- [ ] **2. Sanitize** the search term before SQL: escape `%` and `_` (e.g. Rails: `ActiveRecord::Base.sanitize_sql_like(params[:q].to_s.strip)`).
- [ ] **3. Replace** the current match logic with contains:
  - Filter where `name ILIKE '%term%'` OR `description ILIKE '%term%'` (use the sanitized term).
  - Keep existing pagination (`page`, `per_page`) and any provider/category filters.
- [ ] **4. Test:** "app" returns products containing "app"; "APP" same as "app"; term with `%` or `_` does not break or over-match.

## Rails example (for the query)

```ruby
term = params[:q].to_s.strip
return [] if term.blank?  # or your current empty-q behavior

safe = ActiveRecord::Base.sanitize_sql_like(term)
pattern = "%#{safe}%"

Product.where("name ILIKE :pat OR description ILIKE :pat", pat: pattern)
       .page(params[:page]).per(params[:per_page] || 30)
# (adjust scope, ordering, and pagination to match your API)
```

Once this is deployed, the existing frontend (which already sends `q` and displays results) will get contains-style search with no frontend changes.
