# GRO-559: Process to resolve “Map backend categories to frontend SVGs”

Step-by-step record of how we went from the Linear ticket to a completed implementation.

---

## Step 1: Identify the ticket and goal

- **Ticket:** [GRO-559 – Map backend categories to frontend SVGs](https://linear.app/groupr/issue/GRO-559/map-backend-categories-to-frontend-svgs)
- **Goal:** Have the frontend use backend category data (especially a stable identifier) to show the correct icon (SVG), name, and URL for each category—instead of guessing by position in a fixed list.

---

## Step 2: Analyze the current system

We looked at:

- **Backend:** How categories are exposed (id, name, slug as `keyword`) and how slug is generated in `Category` model and in catalog API responses.
- **Frontend:** Where category icons and names come from (`REFERENCE_CATEGORY_ORDER` + index-based mapping in `CategoryStrip` and `getCategoryDisplayName`), and how category URLs and links work (numeric id in route and in `navigate` calls).
- **Gap:** Frontend ignored `keyword` and used array index for both icon and label, so the wrong icon/name could show and behavior differed by environment.

Output: **`docs/GRO-559-map-backend-categories-to-frontend-svgs-report.md`** (why things were misaligned and what “mapping” should mean).

---

## Step 3: Align on scope (icons, names, URL)

We made explicit what “map backend categories to frontend” included:

1. **Icons (SVGs)** – Choose icon by backend **keyword**, not by index: path = `/images/categories/${keyword}-category-icon.svg` (+ fallback).
2. **Display name** – Use the category **name** from the API, not a hardcoded label by index.
3. **URL** – Use **slug** in the browser path (e.g. `/catalog/produce`) and in every link; resolve slug → id only when calling the API.

We confirmed: no new API calls, no required backend change for the first version, and that the approach would stay fast (same requests, small in-memory lookups).

---

## Step 4: Plan exact changes (no code yet)

We wrote an implementation plan so nothing was ambiguous:

- **Phase 1:** Config (add `getCategoryIconPath`, fix `getCategoryDisplayName`, remove `REFERENCE_CATEGORY_ORDER`); CategoryStrip (build items from API + keyword, add `slug`, navigate by slug); ProductGrid (pass `categorySlug`).
- **Phase 2:** Route param `:categorySlug`; CategorizedProducts (read slug, resolve slug → id, redirect if invalid); CategorySection and CategoryProductsModal (accept and use `categorySlug` for all category links); FeaturedProducts (pass `categorySlug`).
- **Optional:** Backend support for slug in `categories#show`; backwards compatibility for numeric URLs.

Output: **`docs/GRO-559-implementation-plan.md`** (file-by-file checklist and logic).

---

## Step 5: Align with you before coding

We summarized in plain language:

- What was wrong (index-based icon/name).
- What we would do (use keyword for icon path, API for name, slug in URL and links).
- That we would not change product display or add new API calls.

You confirmed (“Go”), so we proceeded to implement.

---

## Step 6: Implement Phase 1 (icons and names)

1. **`frontend/src/pages/Catalog/constants/categoryConfig.ts`**
   - Added `getCategoryIconPath(keyword)` with fallback.
   - Changed `getCategoryDisplayName` to use only API category name (plus “Category” / “Category #” → “Products”).
   - Removed `REFERENCE_CATEGORY_ORDER`.

2. **`frontend/src/pages/Catalog/Components/CategoryStrip.tsx`**
   - Replaced index-based merge with `buildStripItemsFromApi(categories)`: each item has `id`, `name` (from API), `image_url` from `getCategoryIconPath(category.keyword)`, `slug: category.keyword`.
   - Added `slug` to `CategoryStripItem` and to the “All” item (`slug: null`).
   - `handleClick`: navigate to `/catalog/${item.slug}` when slug is set, else fallback to id.

3. **`frontend/src/common/products/ProductGrid.tsx`**
   - Passed `categorySlug={categoryData.category.keyword}` to `CategorySection`.

---

## Step 7: Implement Phase 2 (URL and links)

1. **`frontend/src/routing/AppRouter.tsx`**
   - Route changed from `/catalog/:categoryId` to `/catalog/:categorySlug`.

2. **`frontend/src/pages/Catalog/CategorizedProducts.tsx`**
   - Read `categorySlug` from `useParams`.
   - Resolved slug → id in a `useMemo`: if param is numeric, find category by id; otherwise by `keyword`. Set `notFound` when slug is provided but no category matches.
   - Used resolved id for `useCategoryProductsPaginated` and for `currentCategoryId`.
   - Redirect to `/catalog` when `notFound` (after categories have loaded).
   - Passed `categorySlug` (and resolved id) into `CategoryStrip` and `CategorySection`.

3. **`frontend/src/common/products/CategorySection/index.tsx`**
   - Added `categorySlug?: string | null` to props.
   - “View all” / category navigation: use `/catalog/${categorySlug}` when present, else `/catalog/${categoryId}`.
   - Passed `categorySlug` into `CategoryProductsModal`.

4. **`frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx`**
   - Added `categorySlug` prop.
   - Breadcrumb “category” link (mobile): navigate to `/catalog/${categorySlug}` when present, else by id.

5. **`frontend/src/pages/LandingPage/Components/FeaturedProducts.tsx`**
   - Passed `categorySlug={featuredProducts[0].category.keyword}` to `CategorySection`.

---

## Step 8: Cleanup and verify

- Confirmed no remaining references to `REFERENCE_CATEGORY_ORDER` in the frontend.
- Checked that slug resolution and redirect behave correctly when categories are loading vs when slug is invalid.
- Noted existing linter warnings in `CategorySection` were unchanged (no new issues introduced).

---

## Step 9: Commit and PR (your workflow)

To record this as the first fix on the `021026-bugfixes` branch:

1. **Stage and commit (frontend):**
   ```bash
   cd devenv-main/frontend
   git add -A
   git status   # confirm only GRO-559 files
   git commit -m "GRO-559 Map backend categories to frontend SVGs (icons, names, slug URLs)"
   ```

2. **Push when ready:**
   ```bash
   git push origin 021026-bugfixes
   ```

3. Open a PR from `021026-bugfixes` into `staging` and reference GRO-559 in the description.

---

## Artifacts produced

| Artifact | Purpose |
|----------|--------|
| `docs/GRO-559-map-backend-categories-to-frontend-svgs-report.md` | Analysis: why things were misaligned, what to change, full checklist (icons, names, URL). |
| `docs/GRO-559-implementation-plan.md` | Exact file-by-file implementation plan and order. |
| **This file** (`docs/GRO-559-resolution-process.md`) | Step-by-step process from ticket to resolution. |

---

## Summary

1. Identified the Linear ticket and goal.  
2. Analyzed backend and frontend to find the mismatch (index vs keyword).  
3. Aligned on scope: icons by keyword, names from API, URLs by slug.  
4. Wrote a detailed implementation plan.  
5. Confirmed with you before coding.  
6. Implemented Phase 1 (config, strip, grid).  
7. Implemented Phase 2 (route, CategorizedProducts slug resolution, Section/Modal/FeaturedProducts links).  
8. Cleaned up and verified.  
9. Documented the process and left you with clear commit/PR steps.
