# Plan: Modal breadcrumb redesign, search results clickable, clear search on category click

## 1. Product details modal breadcrumb – plain text, one line, underline on selection

### 1.1 Goal

The breadcrumb in the product details modal should:

- Be **plain text** (no link-style/chip look), with a simple **arrow between** segments.
- Stay **on one line** (truncate with ellipsis as needed).
- Show **underline on selection** (hover and/or focus) for the clickable parts (All, Category); current page (product name) can stay plain or get a subtle underline on hover for consistency.

### 1.2 Current state

- Uses Chakra `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink` with `MdChevronRight` as separator.
- Links use default Chakra link styling; spacing and truncation have been tuned but the overall look is still “link-heavy” and not “plain text with arrow”.

### 1.3 Proposed design (how it might look)

**Visual:**

- One horizontal line: **All** &nbsp;&gt;&nbsp; **Category name** &nbsp;&gt;&nbsp; **Product name**
- All segments use the same font (e.g. existing `fontSize`), no bold for non-current.
- **Clickable segments** (All, Category): plain text color, **underline on hover and focus only** (e.g. `textDecoration: 'none'`, `_hover: { textDecoration: 'underline' }`, `_focusVisible: { textDecoration: 'underline' }`). Optional: subtle color change on hover.
- **Current segment** (product name): same font, can be slightly muted or same as others; optional underline on hover for consistency.
- **Separator:** Plain arrow character (e.g. `>` or `→`) or a small icon, with minimal spacing (e.g. single space or 4px) so it reads as “All > Category > Product” in one line.
- **Single line:** Container has `whiteSpace: 'nowrap'`, `overflow: 'hidden'`, `textOverflow: 'ellipsis'`. Each segment that can be long (category, product name) uses `minW={0}`, `overflow: 'hidden'`, `textOverflow: 'ellipsis'` so the line as a whole truncates at the end, or use a single-line flex row with the last segment shrinking and showing ellipsis.

**Structure options:**

- **Option A:** Replace Chakra Breadcrumb with a simple flex row: `Box` with `display="flex"`, `alignItems="center"`, `gap={1}`, `overflow="hidden"`, `whiteSpace="nowrap"`. Each segment is a `Text` or `Box`; clickable ones are `chakra.button` or `Box as="button"` with `_hover={{ textDecoration: 'underline' }}`, cursor pointer. Separators between segments are `Text` or `Span` with `>` or `→`.
- **Option B:** Keep `Breadcrumb` but style it to look plain: remove link styling from `BreadcrumbLink` (make it look like text), use a text separator (e.g. ` > `), force single line and truncation on the container.

**Recommended:** Option A for full control: plain text look, one line, underline only on hover/focus, and a simple arrow (e.g. `>` or `→`) between segments.

### 1.4 Files to touch

- `frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx`
  - Replace or heavily restyle `ModalBreadcrumbItems`: single-line flex layout, plain text, arrow separator, underline on hover/focus for “All” and “Category”, truncation so the whole breadcrumb stays one line (e.g. last segment with `minW={0}` and ellipsis).

### 1.5 Verification

- Breadcrumb reads as “All > Category > Product” in one line.
- No default link blue/underline; underline appears only on hover/focus for All and Category.
- Long category or product names truncate with ellipsis without wrapping to two lines.

---

## 2. Search results page – results not clickable

### 2.1 Problem

On the search results page, product cards are not clickable: clicking a product does nothing. Users expect to open product details (e.g. in a modal).

### 2.2 Root cause

- Search results are rendered via `SearchResults` → `ProductGrid` → `CategorySection` with a synthetic category **`id: 0`**.
- In `CategorySection`, the product detail modal is only rendered when **`categoryId != null && categoryId > 0`**, so the modal is **never mounted** for search results (categoryId is 0).
- Clicking a product calls `openProductsModal(product)`, which sets `displayedProduct` and opens the disclosure, but there is **no modal in the tree** for categoryId 0, so nothing appears.

### 2.3 Proposed approach

When the section is used for **search results** (`categoryId === 0`), we still need a way to show product details. Two options:

- **Option A (recommended):** For **categoryId === 0** only, render a **product-detail-only modal**: no breadcrumb, no category product list—just the product detail content and a close button. When the user clicks a product in search results, this modal opens with that product.
- **Option B:** Use a different component for search results (e.g. a dedicated grid that navigates to `/catalog/:categoryId` with product in state, or a global product modal). This would require a larger refactor of `SearchResults` and possibly routing.

**Recommended: Option A.**

**Concrete steps:**

1. **CategorySection** (`CategorySection/index.tsx`):
   - When **`categoryId === 0`** and **`secctionState.displayedProduct`** is set, render a **simple product-detail modal** (e.g. Chakra `Modal` containing only `ProductDetails(displayedProduct)` and a close button). Do **not** use `CategoryProductsModal` for this (that component expects a real category and fetches category products).
   - Keep existing behavior: when **`categoryId != null && categoryId > 0`**, render `CategoryProductsModal` as today.
   - Ensure we never render the number `0`: the new block is something like `{categoryId === 0 && secctionState.displayedProduct != null && ( <ProductDetailOnlyModal ... /> )}`, which does not render `0`.

2. **ProductDetailOnlyModal (or inline modal):**
   - New small component or inline in `CategorySection`: Chakra `Modal` + `ModalOverlay` + `ModalContent` with `ProductDetails(product)` and `ModalCloseButton`. No breadcrumb, no list. Optional: same outside spacing (e.g. `mx`, `my`) as the main modal for consistency.
   - Reuse existing `ProductDetails` from `./Components/ProductDetails`.
   - `onClose` resets `displayedProduct` and closes the modal (same as `closeProductsModal`).

3. **Search results “View all”:**
   - For search, `displayAllItems` is false (we show all results in one section), so “View all” is not shown. No change needed there.

### 2.4 Files to touch

- `frontend/src/common/products/CategorySection/index.tsx`
  - Add conditional render: when `categoryId === 0` and `secctionState.displayedProduct != null`, render a product-detail-only modal (new component or inline).
- Optionally: `frontend/src/common/products/CategorySection/Components/ProductDetailOnlyModal.tsx` (new) – thin wrapper around Chakra Modal + `ProductDetails` + close button, to keep `CategorySection` clean.

### 2.5 Verification

- On search results page, clicking a product opens a modal with product details and a close button.
- Closing the modal returns to the search results list.
- Category pages (categoryId ≥ 1) still use the full category modal (breadcrumb, list, product detail) as today.

---

## 3. Clear search when clicking a category (from search results page)

### 3.1 Goal

When the user is on the **search results page** (search term is set, results are shown) and clicks a **category** in the category strip (or “All”), the **search term should be cleared** so the view shows that category’s products (or the full catalog) instead of staying in “search mode.”

### 3.2 Current state

- **CategoryStrip** `handleClick` navigates to `/catalog` (All) or `/catalog/:id` (category). It does not touch search state.
- Search state lives in **SearchContext** (`searchTerm`, `setSearchTerm`, `clearSearch`).
- So after clicking a category, the URL changes but `searchTerm` can still be set; the catalog page might still show search results if the same route is used for both search and category view (e.g. `/catalog` with search term in context). Clearing search ensures the category view is shown.

### 3.3 Proposed approach

When the user clicks a category in the strip (including “All”), **clear the search** so the UI switches to the selected category (or full catalog) and no longer shows search results.

**Concrete steps:**

1. In **CategoryStrip**, use **SearchContext** (e.g. `const { clearSearch } = useSearch()`). If the app is not wrapped in `SearchProvider` when CategoryStrip is used, guard with a check or ensure the catalog page always wraps with `SearchProvider`.
2. In **handleClick**, before or after calling **navigate(...)**, call **clearSearch()**. That resets `searchTerm` to `''` and resets search-related state (e.g. page), so the catalog page will show the category content instead of search results.
3. Order: e.g. `clearSearch(); navigate(...);` so that when the new route is rendered, search is already cleared.

### 3.4 Files to touch

- `frontend/src/pages/Catalog/Components/CategoryStrip.tsx`
  - Import and use `useSearch()` from the appropriate SearchContext path.
  - In `handleClick`, call `clearSearch()` (when available) before navigating. Handle the case where SearchContext might be undefined (e.g. useSearch() returns undefined in a test or different layout) by calling clearSearch only if it exists.

### 3.5 Verification

- From the search results page (with a search term entered), clicking “All” or any category in the strip clears the search and shows the full catalog or that category’s products.
- No stray “0” or broken behavior; search state is reset (term and page).

---

*Plan ready for implementation.*
