# GRO-562: Implementation plan — ModalBreadcrumbItems → Chakra Breadcrumb

**Ticket:** [GRO-562](https://linear.app/groupr/issue/GRO-562/rollback-modalbreadcrumbitems-to-chakra-breadcrumb-with-relevant)  
**Scope:** Only `ModalBreadcrumbItems` in `CategoryProductsModal.tsx`. No other changes to the modal or app.

---

## Step 3: Scope (from ticket)

**Will change:**
- Replace the custom Box/Text/button implementation of `ModalBreadcrumbItems` with Chakra `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink`.
- Use `MdChevronRight` as separator (already imported in file).
- Keep current props: `categoryName`, `selectedProduct`, `onAllProductsClick`, `onCategoryClick` (no `setContentState`).
- Apply relevant styling: overflow/ellipsis + title for product name, responsive font/line-height, spacing for close button, hover and focus-visible on links.

**Won’t change:**
- Rest of `CategoryProductsModal` (product list, pagination, search, content state, handlers).
- Any other files.

---

## Step 4: Exact file changes

**File:** `devenv-main/frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx`

### 4.1 Imports

- **Add** to Chakra import (line 1): `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink`.
- **Keep:** `Box`, `Heading`, `ModalContent`, etc. (Box/Text may still be used elsewhere in the file; if after refactor they are unused in the breadcrumb only, we can leave them for other layout or remove if fully unused).
- **Keep:** `MdChevronRight` (already present); use as Breadcrumb separator.
- **Keep:** `useTranslation`, other imports.

### 4.2 Props interface

- **Keep** `ModalBreadcrumbItemsProps` as-is: `categoryName`, `selectedProduct`, `onAllProductsClick`, `onCategoryClick`. No changes.

### 4.3 Replace `ModalBreadcrumbItems` implementation

**Remove:** The entire current body of `ModalBreadcrumbItems` (lines ~40–111): the `separator` constant, the return with `Box` container, two `Box as="button"` segments, and the `Text` for product name.

**Replace with:** A single return that uses:

1. **Breadcrumb** (wrapper):
   - `separator={<MdChevronRight color="gray.600" aria-hidden />}` (or pass as prop; Chakra allows React node).
   - `spacing` (e.g. 2 or 8px to match current visual gap).
   - Container styling: `overflow="hidden"`, `maxW="100%"`, `minW={0}`, `py={{ base: 2, md: 3 }}`, `pl={0}`, `pr={8}`, `fontSize={{ base: 'sm', md: 'md' }}`, `lineHeight={{ base: 1.25, md: 1.5 }}` so it matches current layout and leaves room for the close button.

2. **BreadcrumbItem** (first):
   - **BreadcrumbLink** as button or link: trigger `onAllProductsClick` on click. Use `as="button"` and `onClick={onAllProductsClick}` (or wrap in a clickable element) so it’s not a navigation link. Chakra’s BreadcrumbLink can be `as="button"` with `type="button"`.
   - Child text: `{t('catalog.allProducts')}`.
   - Styles: `_hover={{ textDecoration: 'underline' }}`, `_focusVisible={{ outline: '2px solid', outlineOffset: '2px' }}` (and underline if desired).

3. **BreadcrumbItem** (second):
   - **BreadcrumbLink** as button: trigger `onCategoryClick` on click; call `e.preventDefault()` if using a link-like element.
   - Child text: `{categoryName}`.
   - Same hover/focus-visible as above.

4. **BreadcrumbItem** (third, current page):
   - Set `isCurrentPage` on this **BreadcrumbItem** so the last segment is non-clickable and has `aria-current="page"`.
   - **BreadcrumbLink** with `isCurrentPage` (or rely on item prop): content `{selectedProduct?.name}`.
   - Container for last item: `minW={0}`, `overflow="hidden"`, `textOverflow="ellipsis"`, `whiteSpace="nowrap"`, and `title={selectedProduct?.name}` for tooltip.

Chakra v2 Breadcrumb accepts `separator` on `Breadcrumb`; use `<MdChevronRight />` there. For clickable segments that are not navigation, use `BreadcrumbLink as="button" type="button"` with `onClick`; for the category link, use `onClick={(e) => { e.preventDefault(); onCategoryClick(); }}` if needed.

### 4.4 Cleanup

- If `Box` and `Text` are no longer used anywhere in the file after the refactor, remove them from the Chakra import. If they are still used (e.g. elsewhere in the modal), leave them.

---

## Checklist (matches ticket §5)

- [ ] Add `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbLink` to Chakra imports.
- [ ] Replace custom Box/Text/button breadcrumb with Chakra `Breadcrumb` (three `BreadcrumbItem`s, separator `MdChevronRight`).
- [ ] Wire "All products" to `onAllProductsClick`, category to `onCategoryClick`; product name as current (non-clickable).
- [ ] Container: overflow, maxW, minW, py, pl, pr={8}, fontSize, lineHeight.
- [ ] Last segment: ellipsis, minW={0}, overflow hidden, title={selectedProduct?.name}.
- [ ] Link hover and focus-visible on first two segments.
- [ ] Remove old `&gt;` separator; use MdChevronRight on Breadcrumb.
- [ ] Verify behavior and run build/tests.

---

## Verification

- Open catalog → open a category modal → open a product (product details view). Breadcrumb shows: All products > Category > Product name. Click "All products" and category and confirm same behavior as before.
- Keyboard: tab to breadcrumb links, confirm focus ring.
- Long product name: confirm ellipsis and title tooltip.
- Build: `npm run build` or `tsc -b`; tests if any for catalog/modal.

No code has been written yet; implement after you confirm scope and plan (Step 5).
