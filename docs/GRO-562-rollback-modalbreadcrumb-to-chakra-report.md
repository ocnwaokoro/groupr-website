# GRO-562: Rollback ModalBreadcrumbItems to Chakra Breadcrumb — analysis

**Ticket:** [GRO-562](https://linear.app/groupr/issue/GRO-562/rollback-modalbreadcrumbitems-to-chakra-breadcrumb-with-relevant)  
**Title:** Rollback ModalBreadcrumbItems to Chakra Breadcrumb with relevant styling.  
**Reference commit:** `99b4933332520c7ce70b5df4a63b1e9883ed52a9` (Catalog UI and search updates #163) — that commit replaced Chakra Breadcrumb with the current custom Box/Text implementation.

---

## Step 1: Goal (one sentence)

**Done looks like:** The modal breadcrumb in the category products modal is implemented with Chakra UI’s `Breadcrumb` (and related components) instead of the custom `ModalBreadcrumbItems` component, with the same behavior and relevant styling/accessibility preserved.

---

## Step 2: Current system

### Where it lives

- **Single file:** `devenv-main/frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx`
- **Custom component:** `ModalBreadcrumbItems` (lines ~32–114)
- **Usage:** Rendered in the modal header when `contentState === ContentState.PRODUCT_DETAILS` (lines 266–273), with props: `categoryName`, `selectedProduct`, `onAllProductsClick`, `onCategoryClick`.

### Current behavior

- **Structure:** Three segments:
  1. **“All Products”** — clickable, calls `onAllProductsClick`
  2. **Category name** — clickable, calls `onCategoryClick`
  3. **Selected product name** — not clickable, text only (with ellipsis/title for long names)
- **Separator:** `>` between segments (custom `Text as="span"` with `&gt;`).
- **Layout:** Flex row, `whiteSpace="nowrap"`, overflow/ellipsis on the last segment; Chakra `Box` and `Text`; first two segments are `<Box as="button">` with hover/focus styles.

### Current implementation details

- Uses Chakra `Box`, `Text` only (no Chakra `Breadcrumb`).
- Buttons are styled for hover/underline and focus-visible outline.
- i18n: first segment uses `t('catalog.allProducts')`.
- Handlers: `handleBreadcrumbAllClick` and `handleBreadcrumbCategoryClick` (defined in parent, lines 179, 189).

### Chakra Breadcrumb API (v2)

From [Chakra UI v2 Breadcrumb](https://v2.chakra-ui.com/docs/components/breadcrumb):

- **Breadcrumb** — container; supports `separator` (e.g. `">"` or element) and `spacing`.
- **BreadcrumbItem** — wrapper for each segment; supports `isCurrentPage` (renders as span with `aria-current="page"`).
- **BreadcrumbLink** — link/button; when `isCurrentPage` it’s non-interactive.
- **BreadcrumbSeparator** — optional; default separator can be set on `Breadcrumb`.

Already in the project: `@chakra-ui/react` (v2.8.x) includes Breadcrumb.

---

## Gap (what the ticket is addressing)

- **Current:** Custom “breadcrumb-like” UI built from `Box` + `Text` + button `Box`s.
- **Desired:** Use Chakra’s `Breadcrumb` so that:
  - The modal uses the same primitive as the rest of the app for breadcrumbs.
  - Accessibility and semantics (e.g. `nav`, `aria-current`) come from Chakra.
  - Less custom code to maintain; “rollback” implies we’re reverting to or aligning with the intended Chakra pattern.

---

## Summary

| Area     | Finding |
|----------|--------|
| Backend  | Not involved. |
| Frontend | One component in one file: `ModalBreadcrumbItems` in `CategoryProductsModal.tsx`. |
| Gap      | Replace custom breadcrumb markup with Chakra `Breadcrumb` / `BreadcrumbItem` / `BreadcrumbLink` (and optional `BreadcrumbSeparator`), keeping “All Products” → Category → Product name, same click behavior and similar styling. |

No code or git actions have been run; next step is **Step 3: Align on scope** once you confirm or add ticket details (e.g. “with relevant styling” or “with relevant a11y”).
