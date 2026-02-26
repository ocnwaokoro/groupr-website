# Plan: Mobile product detail modal – padding and breadcrumb

## Goal

1. **Increase padding** on the mobile product detail modal: more **vertical** padding (especially) and more **horizontal** padding so content is less cramped.
2. **Limit the size** of the top breadcrumb (`All > Category > Item`) so it doesn’t dominate the header on small screens.

## Current state

- **CategoryProductsModal** (Chakra `Modal`):
  - **ModalContent:** `py={{ base: 4, md: 6 }}`, `px={{ base: 4, md: 10 }}`, `mx={{ base: 3, md: 4 }}`, `my={{ base: 3, md: 6 }}`, `maxW={{ base: 'calc(100vw - 24px)', md: '4xl' }}`.
  - **ModalBody:** `maxHeight="600px"`, `overflowY="auto"`, `px={{ base: 4, md: 0 }}`.
- **Breadcrumb** (when in product detail view): `ModalBreadcrumbItems` – “All” > “Category” > product name. Rendered in `ModalHeader` with `fontSize={breadcrumbItemsFontSize}` (e.g. `md` for product details). No max-width or truncation; long category or product names can wrap or push layout.

So on mobile, padding is `4` (Chakra spacing = 16px) vertically and horizontally; the breadcrumb can grow and take a lot of space.

## Proposed changes

### 1. Increase mobile padding (vertical especially, and horizontal)

| Where | Current (base) | Proposed (base) | Notes |
|-------|----------------|----------------|--------|
| **ModalContent** | `py: 4`, `px: 4` | `py: 6`, `px: 5` (or `py: 6`, `px: 6`) | More vertical and horizontal breathing room on mobile. |
| **ModalBody** | `px: 4` | `px: 5` (or `6`) | Align with content padding so body content isn’t tighter than the modal shell. |

Use Chakra spacing scale (e.g. 5 = 20px, 6 = 24px). Optional: slightly reduce `mx`/`my` on mobile if the modal should stay a bit wider (e.g. `mx={{ base: 2, md: 4 }}`) so that the extra horizontal padding doesn’t make the content area too narrow; otherwise keep `mx`/`my` as is.

### 2. Limit size of “All > Category > Item” breadcrumb on mobile

| Item | Detail |
|------|--------|
| **Container** | Wrap the breadcrumb in a container that limits its impact on the header: e.g. `maxW="100%"`, `overflow="hidden"`, and on mobile only a constrained height or single-line behavior. |
| **Font size** | On mobile, use a smaller font for the breadcrumb (e.g. `fontSize={{ base: 'sm', md: 'md' }}` in `ModalHeader` when showing breadcrumb, or pass a smaller size into `ModalBreadcrumbItems`). |
| **Truncation** | Ensure the last segment (product name) truncates with ellipsis on overflow: e.g. `noOfLines={1}`, `truncate`, or `overflow="hidden"` + `textOverflow="ellipsis"` on the product name link. Optionally, on mobile only, show the whole breadcrumb in one line with ellipsis in the middle (e.g. “All > Category > Very long product na…”) or truncate only the product name. |
| **Spacing** | Slightly reduce breadcrumb spacing on mobile (`spacing` in `Breadcrumb`) so “All > Category > Item” fits better in one line when possible. |

**Recommended:** (a) Smaller breadcrumb font on mobile; (b) single-line truncation with ellipsis on the product name (current page); (c) optional one-line clamp for the entire breadcrumb on very small screens. No change to desktop.

### 3. Fix breadcrumb/navigation text spacing (modal)

**Problem:** Spacing of the navigation text (breadcrumb) in the modal looks poor: items feel cramped or uneven, separators too tight or too loose, and the block doesn’t align well with the header.

**Areas to adjust:**

| Area | What to fix | Suggested approach |
|------|---------------------|---------------------|
| **Gap between items** | `Breadcrumb` `spacing` controls space between link + separator + next link. | Mobile: keep small (e.g. `4px` / `0.25rem`) so it fits one line where possible; desktop: use `8px` or `0.5rem` for clarity. Use Chakra `spacing` prop: `spacing={{ base: 1, md: 2 }}` (4px / 8px). |
| **Separator margin** | Space before/after the chevron. | Chakra `Breadcrumb` uses `separator`; ensure the separator has consistent margin (e.g. `mx={1}` or `mx={2}`) so “All”, “>”, “Category” don’t run together. |
| **Line height** | Breadcrumb line-height can make lines feel too tall or cramped. | Set explicit `lineHeight` on the breadcrumb container or links (e.g. `lineHeight="tall"` or `1.25`) so multi-line wrap (if any) is readable. |
| **Block padding** | Padding around the whole breadcrumb block inside the header. | Add `py={1}` or `py={2}` to the breadcrumb wrapper `Box` so the nav text doesn’t sit flush against the close button or modal edge. |
| **Alignment** | Vertical alignment of links and separator. | Use `alignItems="center"` on the `Breadcrumb` (if supported) or ensure `BreadcrumbItem`/`BreadcrumbLink` use consistent alignment so the chevron sits mid-height. |

**Concrete steps:**

1. **Breadcrumb container:** On the wrapper `Box`, add `py={{ base: 1, md: 2 }}` so there’s consistent vertical padding around the breadcrumb block.
2. **Item spacing:** Set `Breadcrumb` `spacing={{ base: 1, md: 2 }}` (already partially in place; verify and align with separator).
3. **Separator:** Wrap the chevron in a `Span` with `mx={{ base: 1, md: 2 }}` so there’s clear space before/after the “>”.
4. **Links:** Ensure `BreadcrumbLink` has no extra margin that causes uneven gaps; use Chakra’s default or set `margin={0}` and rely on `spacing` for gaps.
5. **Line height:** Set `lineHeight={{ base: 1.25, md: 1.5 }}` on the breadcrumb container so wrapped text (e.g. long category name) is readable.

**Files to touch:** `CategoryProductsModal.tsx` – `ModalBreadcrumbItems`: adjust `Breadcrumb` and wrapper `Box` props, and separator wrapper if needed.

**Verification:** On both mobile and desktop, “All > Category > Product” should look evenly spaced, with clear but not excessive gaps, and the block should sit comfortably in the header without looking cramped or misaligned.

---

## Files to touch

- `frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx`
  - ModalContent: increase `py`/`px` for `base` (mobile).
  - ModalBody: increase `px` for `base` to match.
  - ModalHeader (when showing breadcrumb): reduce font size on mobile; wrap breadcrumb in a box with `overflow="hidden"` and apply truncation to the product name (and optionally to the whole breadcrumb on mobile).

## Verification

- **Mobile:** Modal has visibly more vertical and horizontal padding; content doesn’t feel cramped.
- **Mobile:** Breadcrumb “All > Category > Item” is smaller and doesn’t dominate; long product names show with ellipsis.
- **Desktop:** Layout and padding unchanged or only slightly adjusted if desired.

---

*Plan drafted for approval; implementation to follow once approved.*
