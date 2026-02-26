# Plan: Product detail modal title truncation + font size, and stray "0" in search results

## 1. Product details modal – long names and title size

### 1.1 Problem

- **Longer names** in the product details modal should be **truncated** in:
  - The **nav (breadcrumb)** part: "All > Category > Product name"
  - The **actual product title** in the body (the main heading)
- The **actual title** (product name in the modal body) uses a **font that is too large** and should be reduced.

### 1.2 Current state

- **Breadcrumb (nav):** In `CategoryProductsModal.tsx`, `ModalBreadcrumbItems` already truncates the **product name** in the breadcrumb with `Text as="span" noOfLines={1}` and ellipsis. The **category name** in the breadcrumb is not truncated and can wrap or overflow on small screens.
- **Product title in body:** In `ProductDetails.tsx`, the product name is rendered as:
  ```jsx
  <Heading as="h1" size="2xl" fontWeight="bold">
    {product.name}
  </Heading>
  ```
  So it uses Chakra `size="2xl"` (large), has no truncation, and long names can wrap or dominate the layout.

### 1.3 Proposed changes

| Area | Change |
|------|--------|
| **Breadcrumb – category name** | Truncate the category link in the breadcrumb the same way as the product name: wrap in `Text` (or equivalent) with `noOfLines={1}`, `overflow="hidden"`, `textOverflow="ellipsis"`, and ensure the item has `minW={0}` / `flexShrink={1}` so it can shrink. |
| **Product title in body** | (a) **Reduce font size:** use a smaller Chakra size (e.g. `size="lg"` or `size="xl"` instead of `size="2xl"`), optionally responsive (e.g. `size={{ base: 'lg', md: 'xl' }}`). (b) **Truncate long names:** apply single-line (or two-line) truncation with ellipsis: e.g. wrap in `Box` or `Heading` with `noOfLines={1}` (or 2), `overflow="hidden"`, `textOverflow="ellipsis"`, and `minW={0}` so it doesn’t overflow. |

### 1.4 Files to touch

- `frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx`  
  - In `ModalBreadcrumbItems`, truncate the category name link (second `BreadcrumbItem` / `BreadcrumbLink`) with `noOfLines={1}` and ellipsis, and ensure the item can shrink (`minW={0}`, `flexShrink={1}`).
- `frontend/src/common/products/CategorySection/Components/ProductDetails.tsx`  
  - Change the product name `Heading`: reduce `size` (e.g. to `"lg"` or `"xl"`, optionally responsive).  
  - Add truncation: e.g. `noOfLines={2}`, `overflow="hidden"`, `textOverflow="ellipsis"`, and a wrapper with `minW={0}` if needed so long names don’t overflow.

### 1.5 Verification

- Long product/category names in the breadcrumb show ellipsis and don’t break the header layout.
- Product title in the modal body is visually smaller and long names truncate with ellipsis (one or two lines as chosen).

---

## 2. Random "0" at end of search results

### 2.1 Problem

A stray **"0"** appears at the end of the search results block.

### 2.2 Root cause

In React, expressions like `{value && <Component />}` evaluate to **`value`** when `value` is falsy. So when `value` is the number **`0`**, React renders the character **"0"** on the page.

- **Search results** use a synthetic category with **`id: 0`** in `SearchResults.tsx`:
  ```js
  const searchResultsFormatted = [{
    category: { id: 0, name: '...', ... },
    products: data.results,
  }];
  ```
- This is passed to `ProductGrid`, which renders `CategorySection` with **`categoryId={categoryData.category.id}`**, i.e. **`categoryId={0}`**.
- In **`CategorySection`** (`CategorySection/index.tsx`), the modal is conditionally rendered as:
  ```jsx
  {categoryId && (
    <CategoryProductsModal ... />
  )}
  ```
  When `categoryId` is `0`, the expression **`0 && (...)`** evaluates to **`0`**, so React renders the text **"0"** instead of rendering nothing. That is the stray "0" at the end of the search results.

### 2.3 Proposed fix

Avoid rendering the number `0` by using a condition that is always a boolean (or a valid React node), not the number `0`:

- **Option A (recommended):** Use an explicit check that does not return `0`:
  ```jsx
  {categoryId != null && categoryId > 0 && (
    <CategoryProductsModal ... />
  )}
  ```
  Then:
  - For **search results** (`categoryId === 0`): `0 > 0` is false → nothing rendered, no "0".
  - For **real categories** (`categoryId >= 1`): modal is shown as today.
  - For **undefined** (e.g. no category): modal not shown.

- **Option B:** Use a boolean coercion in a way that doesn’t render 0, e.g. wrap in a fragment and condition: `{(categoryId != null && categoryId > 0) ? <CategoryProductsModal ... /> : null}`.

### 2.4 File to touch

- `frontend/src/common/products/CategorySection/index.tsx`  
  - Replace `{categoryId && (` with `{categoryId != null && categoryId > 0 && (` (or equivalent) so that when `categoryId` is `0`, nothing is rendered and the "0" no longer appears.

### 2.5 Verification

- On the catalog page, when searching, the search results block no longer shows a "0" at the end.
- Category pages (with real `categoryId` ≥ 1) still open the products modal as before when "View all" or a product is clicked.

---

*Plan ready for implementation.*
