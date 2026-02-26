# Plan: Sort by (left) and Page X of X <> (right) on same row

## Goal

On the category page, one control row with:
- **Sort by** dropdown on the **far left**
- **Page X of X** and prev/next arrows on the **far right**
- Same row; no separate rows for sort vs pagination.

## Current state

- **CategorizedProducts:** Row 1 = category title + Sort dropdown (title left, sort right). When products exist, CategorySection (with `hideTitle`) renders its own header row containing only **Page X of X** and prev/next. So sort and pagination are in different rows.
- **CategorySection:** When `hideTitle` is true, it still shows a header row when `showPagination` (Page X of X <>). So pagination appears in a second row below the title+sort row.

## Target layout

- **Row 1:** Category title (full width or left-aligned).
- **Row 2:** `[ Sort by [dropdown] ]` (left) ——— `[ Page X of X  <  > ]` (right).  
  Pagination only shown when `totalPages > 1`.

## Implementation

| Item | Detail |
|------|--------|
| **CategorizedProducts** | Build a single controls row: left = SortDropdown, right = “Page X of X” + prev/next (when `totalPages > 1`). Show this row whenever we show the category content (loading, empty, or with products). Category title stays on its own row above. Remove the separate bottom pagination block so pagination exists only in this row. |
| **CategorySection** | When `hideTitle` is true, do **not** show the header row at all (including pagination). So `showHeaderRow` is false whenever `hideTitle` is true. Parent (CategorizedProducts) owns the sort + pagination row. |
| **Catalog index** | No change for this plan; catalog index can keep current layout (title + sort, then grid, then pagination below if desired later). |

## Files

- `frontend/src/pages/Catalog/CategorizedProducts.tsx` – Add pagination to the same row as Sort (left = sort, right = page controls); remove bottom pagination.
- `frontend/src/common/products/CategorySection/index.tsx` – When `hideTitle`, set `showHeaderRow = false` so the section does not render the pagination row.

## Verification

- Category page: one row with “Sort by” on the left and “Page X of X <>” on the right.
- Single-page category: same row with only “Sort by” (no page controls).
- Category title remains above this row.

---

## Follow-up: Spacing and bottom pagination

### Issue

1. **Spacing:** Bottom spacing below the Sort/Page row was larger than the top (title to row). It should match so the gap under the control row equals the gap above it.
2. **Bottom pagination missing:** Moving pagination into the top row removed the pagination block below the product grid. Restore bottom pagination for UX and accessibility.

### Fix

| Item | Detail |
|------|--------|
| **Spacing** | Use `mb-4` on the header block (to match the title `mb-4` above the Sort/Page row) so spacing underneath matches the top. |
| **Bottom pagination** | When `totalPages > 1` and products exist, render the full `Pagination` component below `CategorySection` (e.g. `flex flex-col items-center gap-6 mt-6`). Keep compact Page X of X in the top row; add full pagination at the bottom. |
