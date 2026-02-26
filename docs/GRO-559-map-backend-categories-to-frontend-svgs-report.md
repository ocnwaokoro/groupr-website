# GRO-559: Map backend categories to frontend SVGs — Analysis report

**Linear:** [GRO-559 – Map backend categories to frontend SVGs](https://linear.app/groupr/issue/GRO-559/map-backend-categories-to-frontend-svgs)  
**Date:** 2025-02-10

---

## 1. Summary

The backend already exposes a stable **slug** per category (as `keyword` in the API). The frontend has category SVG assets named by slug (e.g. `produce-category-icon.svg`, `meat-seafood-category-icon.svg`). **The frontend does not use this.** It maps categories to icons by **array index** against a hardcoded list, so the wrong icon and label can show for a category, and behavior differs across environments.

---

## 2. Current backend behavior

- **Model:** `Category` has a `slug` attribute, set on create from `name_en` (downcase, non-alphanumeric → `-`, trim).  
  Example: `"Meat & Seafood"` → `"meat-seafood"`, `"Produce"` → `"produce"`.
- **API:** Catalog endpoints expose this as `keyword`:
  - `GET /catalog/categories`: each category has `id`, `name`, **`keyword`** (= slug), `image_url`.
  - Products-by-category and product payloads include `category.keyword`.
- **Relevant files:**  
  `app/models/category.rb` (slug generation),  
  `app/views/api/catalog/categories/index.json.jbuilder`,  
  `app/views/api/catalog/shared/_products_by_category.json.jbuilder`,  
  `app/views/api/catalog/shared/_product.json.jbuilder`.

So the backend is already aligned with a “slug per category” that can drive frontend assets.

---

## 3. Current frontend behavior (misalignment)

### 3.1 Hardcoded config and index-based mapping

- **`src/pages/Catalog/constants/categoryConfig.ts`** defines **`REFERENCE_CATEGORY_ORDER`**: a fixed array of `{ label, icon }` in a fixed order (Beverages, Breads & Bakery, Cereals & Snacks, …).
- **`src/pages/Catalog/Components/CategoryStrip.tsx`** has **`mergeCategoriesWithConfig(apiCategories)`**:
  - It **ignores** API category `name` and `keyword`.
  - It maps by **index**: `REFERENCE_CATEGORY_ORDER[i]` is used for the i-th category in the API response.
  - So: **first** API category gets Beverages icon/label, **second** gets Breads & Bakery, etc., regardless of what the category actually is.

### 3.2 Display name

- **`getCategoryDisplayName(categoryId, apiCategories)`** in `categoryConfig.ts`:
  - Finds the category by `id` and its **index** in the categories array.
  - If that index is within `REFERENCE_CATEGORY_ORDER`, it returns **`REFERENCE_CATEGORY_ORDER[index].label`** (e.g. “Beverages”) instead of the API `name`.
  - So the displayed name can be wrong if API order differs from the hardcoded order.

### 3.3 In-code admission

The same file contains:

```text
This is completely wrong,
we should not be using the reference category order and icons,
we should be using the API categories order and icons.
...
This order reflect the order of the api response from production.
So it is likely that this will return different results on staging and local environments.
```

So the current behavior is known to be wrong and environment-dependent.

### 3.4 Frontend SVG assets

Under `public/images/categories/` the filenames follow a clear pattern:

- `all-category-icon.svg`
- `beverages-category-icon.svg`
- `breads-bakery-category-icon.svg`
- `cereals-snacks-category-icon.svg`
- `dairy-eggs-category-icon.svg`
- `meat-seafood-category-icon.svg`
- `pantry-staples-category-icon.svg`
- `produce-category-icon.svg`

So the convention is **`{slug}-category-icon.svg`**, which matches how the backend slug is generated (e.g. `meat-seafood`, `produce`).

### 3.5 Type and API data

- **`src/common/types/api.ts`** defines `Category` with `id`, **`keyword`**, `name`, `image_url`, etc.
- **`useCategories()`** calls `GET /catalog/categories`, so the frontend **does receive** `keyword` (slug) for every category; it simply does not use it for icons or for a stable display name.

---

## 4. Why things are not aligned

| Aspect | Backend | Frontend current | Result |
|--------|--------|-------------------|--------|
| Identity for icon | Stable `slug` per category, exposed as `keyword` | Not used | Icons not driven by category identity |
| Icon mapping | N/A | Index in API response → fixed slot in `REFERENCE_CATEGORY_ORDER` | Wrong icon when API order ≠ hardcoded order |
| Display name | `name` (localized) | Overridden by `REFERENCE_CATEGORY_ORDER[index].label` | Wrong label when order differs |
| Order | API returns categories in DB/scope order | Same order forced onto a fixed list of labels/icons | Staging/local can have different order → different (wrong) mapping |
| SVG naming | N/A | Files follow `{slug}-category-icon.svg` | Ready to use with `keyword` |

So the misalignment is: **frontend uses position instead of slug/keyword**, and overrides API names with a fixed list.

---

## 5. Recommended implementation (to align with the ticket)

### 5.1 Backend (minimal or no change)

- Slug is already generated and exposed as `keyword`. No change required unless you want to:
  - Enforce a canonical set of slugs (e.g. allowlist) so the frontend always has an SVG, or
  - Add an optional `icon_key` if you ever need a slug different from the one used for URLs.

### 5.2 Frontend: drive icons from `keyword`

- **CategoryStrip (and any place that shows a category icon):**
  - For each API category, build the icon path from `keyword`:
    - Icon path: **`/images/categories/${category.keyword}-category-icon.svg`**
  - Provide a **fallback** when the file is missing (e.g. `/images/categories/all-category-icon.svg` or a generic category icon) so new or unknown slugs don’t break the UI.
- **Stop using** `mergeCategoriesWithConfig` that maps by index. Instead:
  - Use the **API categories** in the order returned by the API.
  - For each category, use `category.name` for the label and the path above for the icon (with fallback).

### 5.3 Frontend: display name from API

- **`getCategoryDisplayName`:** Use the category’s **`name`** from the API (from the categories list keyed by id). Remove the logic that substitutes `REFERENCE_CATEGORY_ORDER[index].label`. Keep only the fallback for missing/placeholder names (e.g. “Category” / “Category 1” → “Products”) if you still want that.

### 5.4 Frontend: reduce or remove `REFERENCE_CATEGORY_ORDER`

- Either:
  - Remove it and derive everything from API (order, name, icon path from `keyword`), or
  - Keep it only for **fallback icon path** and/or a **default display order** if you still want a fixed order when the API doesn’t prescribe one (e.g. sort categories by a fixed list of slugs). Do not use it for “which icon/label goes to which category” by index.

### 5.5 Edge cases

- **Missing SVG:** If `keyword` is `"something-new"` and there is no `something-new-category-icon.svg`, use the fallback icon so the UI doesn’t 404.
- **Order:** If you keep a preferred order (e.g. for the strip), sort the API categories by a fixed list of slugs (if present) and then by API order, instead of by index into a fixed icon list.
- **“All” / synthetic categories:** The strip’s “All” entry can keep using `all-category-icon.svg` as today; it’s not from the API.

---

## 6. Files to touch (implementation checklist)

| Area | File(s) | Change |
|------|--------|--------|
| Icon path from slug | e.g. `categoryConfig.ts` or a small util | Add `getCategoryIconPath(keyword: string): string` using `'/images/categories/${keyword}-category-icon.svg'` and fallback. |
| CategoryStrip | `CategoryStrip.tsx` | Replace `mergeCategoriesWithConfig` with: use API categories in API order; for each, use `category.name`, and icon from `getCategoryIconPath(category.keyword)`. Prepend “All” as today. |
| Display name | `categoryConfig.ts` | Change `getCategoryDisplayName` to use API category `name` (look up by id), with “Category”/“Category #” → “Products” fallback only. Remove index-based `REFERENCE_CATEGORY_ORDER` label lookup. |
| Other consumers | `ProductGrid`, `CategorizedProducts`, etc. | Ensure they use `getCategoryDisplayName(categoryId, apiCategories)` with the updated implementation (API name), and pass icon from `keyword` where a category icon is shown. |
| Cleanup | `categoryConfig.ts` | Remove or repurpose `REFERENCE_CATEGORY_ORDER` so it is no longer used for per-category icon or label by index. |

---

## 7. Outcome

- Backend categories are **mapped to frontend SVGs** by **slug** (`keyword`): one stable identifier, same in every environment.
- Icons and labels stay correct regardless of API response order (staging, local, production).
- One source of truth: API for order, names, and slug; frontend only derives the asset path from slug and provides a fallback for missing SVGs.

This matches the intent of GRO-559: map backend categories to frontend SVGs in a reliable, environment-agnostic way.

---

## 8. Everything the ticket implies (full checklist)

So we can be complete, here is **every artifact** that “map backend categories to frontend” reasonably covers, and how each should behave.

| # | Artifact | What it is | Current (wrong) | Target (aligned) |
|---|----------|------------|------------------|------------------|
| 1 | **Icons (SVGs)** | The category icon image shown in the strip, cards, etc. | Chosen by **index** into a hardcoded list → wrong icon when API order differs. | Chosen by **keyword**: path = `/images/categories/${keyword}-category-icon.svg`, with fallback if file missing. |
| 2 | **Display name** | The category label shown in the UI (strip, headers, breadcrumbs). | Overridden by **index** into `REFERENCE_CATEGORY_ORDER` → wrong name. | Use the category **name** from the API (one source of truth). |
| 3 | **URL (route)** | The browser path when viewing a category, e.g. `/catalog/3` vs `/catalog/produce`. | Route is `/catalog/:categoryId` with **numeric id** (e.g. `/catalog/3`). Links use `item.id`. | Use **slug** in the URL: `/catalog/:categorySlug` (e.g. `/catalog/produce`, `/catalog/meat-seafood`). Links use `category.keyword`. |
| 4 | **Links to category** | Every place we navigate to a category page (strip click, “View all”, etc.). | `navigate(\`/catalog/${item.id}\`)` → URL is numeric. | `navigate(\`/catalog/${category.keyword}\`)` (or equivalent) so the URL is the slug. |
| 5 | **Resolving URL → data** | How we know which category to load when the user opens `/catalog/produce`. | N/A (currently we only have id in URL). | **Option A:** Frontend: parse slug from URL, find category in the categories list by `keyword`, get its `id`, then call existing API `GET /catalog/categories/:id`. **Option B:** Backend: support `GET /catalog/categories/:id_or_slug` (find by id or slug); frontend calls with slug. |
| 6 | **Order** | Order of categories in the strip / list. | Forced by fixed list length and index mapping. | Use **API order** (order returned by `GET /catalog/categories`). Optionally sort by a fixed slug order in the frontend if desired. |

So “map backend categories to frontend” covers:

1. **Icons** → map by `keyword` to SVG path.  
2. **Names** → use API `name`.  
3. **URL** → use slug in route and in all links; resolve slug → id (frontend lookup or backend support) to load data.

---

## 9. URL implementation options

- **Frontend-only (no backend change):**  
  - Route: `/catalog/:categorySlug` (e.g. `produce`, `meat-seafood`).  
  - All links: use `category.keyword` (e.g. `navigate(\`/catalog/${category.keyword}\`)`).  
  - In `CategorizedProducts`: read `categorySlug` from params; from the already-fetched categories list, find the category where `keyword === categorySlug`; use its `id` to call `GET /catalog/categories/${id}` and render.  
  - Pros: No API change. URLs are readable and stable.  
  - Cons: If someone bookmarks `/catalog/produce` and we later change slug in the backend, link could break (same risk if we used id and category was deleted).

- **Backend supports slug in show:**  
  - Backend: `GET /catalog/categories/:id_or_slug` — if param looks like a number, `Category.find(id)`; else `Category.find_by!(slug: id_or_slug)`.  
  - Frontend: route `/catalog/:categorySlug`, links use `keyword`, and call API with slug: `GET /catalog/categories/produce`.  
  - Pros: Single source of truth; backend can redirect or 404 if slug invalid.  
  - Cons: Requires backend change and deployment.

Recommendation: Start with **frontend-only** (slug in route and links, resolve slug → id via categories list). Add backend slug support later if you want the API to accept slug directly.
