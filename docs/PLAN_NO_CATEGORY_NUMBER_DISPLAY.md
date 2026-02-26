# Plan: No "Category #" on category card click

## Goal

When the user clicks a category card in the strip, the category page must **never** show "Category" or "Category #" (e.g. "Category 1") as the title. The title must always be the proper reference label (e.g. "Produce", "Meat & Seafood") or a safe placeholder until it can be resolved.

## Root causes

1. **Categories not loaded yet**  
   `getCategoryDisplayName(categoryId, categories)` is called with `categories = []` while `useCategories()` is still loading. The function then falls back to `'Category'`, so the user briefly sees "Category".

2. **Fallback string**  
   In `getCategoryDisplayName`, when the id is not found in the list or `apiCat` is missing, the code returns `apiCat?.name ?? 'Category'`. So any unresolved id shows "Category".

3. **API category name**  
   If the backend ever returns a category name like "Category 1", that would be shown when we use `apiCat?.name` as fallback.

## Flow (current)

- **CategoryStrip** uses `REFERENCE_CATEGORY_ORDER` for labels; card ids come from `apiCategories[i]?.id`. Click navigates to `/catalog/:categoryId` (backend id).
- **CategorizedProducts** reads `categoryId` from the URL and calls `getCategoryDisplayName(categoryId, categories)`.
- **getCategoryDisplayName**:
  - Finds index in `apiCategories` where `c.id === categoryId`.
  - If index is in range for `REFERENCE_CATEGORY_ORDER`, returns `REFERENCE_CATEGORY_ORDER[index].label`.
  - Else returns `apiCategories.find(c => c.id === categoryId)?.name ?? 'Category'`.

So "Category" appears when categories are empty (loading) or when the id is not found in the list.

## Implementation

| Item | Detail |
|------|--------|
| **CategorizedProducts** | Use `isLoading` from `useCategories()`. While `categoriesLoading` is true (and not demo), show placeholder title "…". Once loaded, use `getCategoryDisplayName` (returns reference label or "Products", never "Category #"). |
| **getCategoryDisplayName** | (1) Change final fallback from `'Category'` to `'Products'`. (2) If the resolved name (from API or fallback) matches a "Category" + optional number pattern, return `'Products'` instead so we never display "Category #". |
| **Plan doc** | Add this plan (no "Category #") and reference it from any existing catalog/UX plan. |

## Files

- `frontend/src/pages/Catalog/constants/categoryConfig.ts` – getCategoryDisplayName: safe fallback and sanitize "Category #".
- `frontend/src/pages/Catalog/CategorizedProducts.tsx` – use categories loading state and placeholder title until categories are loaded.

## Verification

- Click a category card: title is either the correct label (e.g. "Produce") or a short placeholder ("…"/"Loading…"), never "Category" or "Category #".
- After categories load, title always shows the reference label when the id is in the list.
- Invalid or unknown id shows "Products" (or chosen fallback), not "Category" or a number.
