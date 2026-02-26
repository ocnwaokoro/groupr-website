# Catalog: Modal Spacing, Product Card Titles, and Search Override

Plan for three changes: (1) product detail modal padding/spacing on mobile and desktop, (2) mobile product card titles left-aligned, (3) search results override any section until search is clear.

---

## 1. Product detail modal – padding and spacing

**Context:** The product-detail experience in scope is **CategoryProductsModal** (Chakra `Modal`), which shows either the category product list or **ProductDetails** (name, price, quantity, image, description). It is used from CategorySection when opening “View all” or a product on desktop, and can also show product detail when a product is opened from the list.

**Current state:**
- **CategoryProductsModal** (`CategorySection/Components/CategoryProductsModal.tsx`):
  - `ModalContent`: `py={6} px={10}`, `borderRadius="24px"`, `mx={0}`.
  - So on mobile the modal has no horizontal margin and can sit flush with the viewport edges (“gripping the edge”).
  - `ModalBody`: `maxHeight="600px"`, `overflowY="auto"`, `px={0}` (no horizontal padding on body).
- **ProductDetails** (inside the modal): Uses Chakra layout (VStack, Flex) with no extra padding; spacing is mostly from component layout.

**Goals:**
- **Mobile:** Modal should not grip the edge of the page; add clear spacing from viewport edges.
- **Desktop:** Keep or refine padding/spacing so the modal feels consistent and readable.
- Apply to both “product list” and “product detail” views inside the modal.

### 1.1 Proposed changes

| Area | Mobile | Desktop |
|------|--------|--------|
| **Modal container (ModalContent)** | Add horizontal margin from viewport: e.g. `mx={3}` or `margin="16px"` / `maxWidth="calc(100vw - 32px)"` so the modal never touches the sides. Optionally reduce vertical edge grip with `my={3}` or similar. | Keep or slightly increase padding; ensure `mx` doesn’t force full width so the modal stays visually centered with breathing room. |
| **ModalContent padding** | Reduce `px={10}` on small screens (e.g. `px={4}` or `px={5}`) so content doesn’t feel cramped against the modal edges; keep `py={6}` or adjust to `py={4}` if desired. | Keep `py={6} px={10}` or align with design (e.g. `px={8}`). |
| **ModalBody** | Add horizontal padding when showing ProductDetails so text/image don’t touch the modal edge: e.g. `px={4}` on base, `px={0}` only if inner content already has padding. | Either `px={0}` with padded inner content or a small `px={4}` for consistency. |
| **ProductDetails (inner)** | Ensure headings, text, and image have consistent spacing from the modal edges (e.g. padding on the root VStack or on ProductDetails wrapper). | Same; ensure spacing between sections (e.g. between description and image) is consistent. |

**Implementation approach:**
- In **CategoryProductsModal**: Use Chakra responsive props (e.g. `px={{ base: 4, md: 10 }}`, `mx={{ base: 3, md: 4 }}`, `my={{ base: 3, md: 6 }}`) on `ModalContent` so mobile has margin from viewport and smaller internal padding; desktop keeps current or slightly tuned values.
- Set **ModalBody** to something like `px={{ base: 4, md: 0 }}` (or keep 0 and rely on ModalContent padding) so product-detail content isn’t flush on mobile.
- In **ProductDetails**: Add optional wrapper padding or spacing so that when rendered inside the modal, the content has consistent gaps from the modal edge on both breakpoints (e.g. `px={{ base: 0, md: 0 }}` if parent handles it, or small padding for the detail view only).

**Files to touch:**
- `frontend/src/common/products/CategorySection/Components/CategoryProductsModal.tsx` (ModalContent, ModalBody padding/margin).
- Optionally `frontend/src/common/products/CategorySection/Components/ProductDetails.tsx` (root spacing when used inside modal).

---

## 2. Mobile product card titles – left-aligned

**Context:** In **ProductCard** the product name (title) uses:
`className={... ${isCompact ? 'text-center' : 'text-center md:text-left'}}`
So on mobile the title is always centered; on `md+` it’s left-aligned when not compact.

**Goal:** Titles in mobile product cards should be **left-aligned**, not centered.

### 2.1 Proposed change

- In **ProductCard.tsx**, change the title alignment so it is left-aligned on all breakpoints (or at least on mobile and up).
  - Replace the conditional with `text-left` for the product name (e.g. `text-left` always, or `text-left` on base and keep `md:text-left` if redundant).
  - Ensure the parent flex container for the text block doesn’t force center (e.g. `items-center` on mobile for the card content may need to become `items-start` for the title row, or the title div stays `text-left` so it’s only alignment that changes).

**File to touch:**
- `frontend/src/common/products/ProductCard.tsx` (product name element: use `text-left`; adjust parent alignment if needed so mobile title is clearly left-aligned).

---

## 3. Search results override any section until box is clear

**Context:**
- **Catalog** (`/catalog` or `/catalog/provider/:id`): Uses `showSearchResults = searchTerm.trim().length > 0`. When true, it renders **SearchResults** instead of the main “All Categories” grid. So search already overrides the main catalog view when the search box has a term.
- **CategorizedProducts** (`/catalog/:categoryId`): Renders HeroSearch and CategoryStrip but **does not** read `searchTerm` or render SearchResults. So when the user is on a category page (e.g. “Fruits”), search results do not appear even if they type in the hero search box.

**Goal:** Search results should override **whatever section the user is on** (All, a category page, or provider catalog) until the search box is clear. So:
- If the user is on **CategorizedProducts** (e.g. `/catalog/5`) and types in the search box, the page should show **SearchResults** instead of the category content.
- When the user clears the search box, the page should show the category content again (or All / provider content on the main Catalog route).

### 3.1 Proposed change

- **CategorizedProducts** (`CategorizedProducts.tsx`):
  - Import and use `useSearch()` from SearchContext.
  - Compute `showSearchResults = searchTerm.trim().length > 0`.
  - When `showSearchResults` is true, render **SearchResults** in place of the current main content (category section, loading, empty, or error). Optionally keep CategoryStrip visible above SearchResults so the user still sees where they are; or show only SearchResults until search is clear (simplest: same as Catalog – search replaces the section).
  - When `showSearchResults` is false, keep current behavior (show category content, loading, empty, or error).
- **Catalog** already behaves correctly (search overrides All/provider view); no change needed there.
- **Provider catalog** is the same Catalog component with `providerId`; search already overrides that view when `searchTerm` is set.

Result: On any catalog route (All, category, or provider), a non-empty search term shows SearchResults; clearing the search restores the underlying section.

**Files to touch:**
- `frontend/src/pages/Catalog/CategorizedProducts.tsx`: Add `useSearch()`, `showSearchResults`, and conditional render of `SearchResults` when `showSearchResults` is true; otherwise render existing category content.

---

## Summary

| # | Item | Scope |
|---|------|--------|
| 1 | Product detail modal padding/spacing | CategoryProductsModal + ProductDetails: mobile margin from viewport, responsive padding on ModalContent/ModalBody; consistent spacing in ProductDetails. |
| 2 | Mobile product card titles | ProductCard: title always left-aligned (remove center on mobile). |
| 3 | Search override | CategorizedProducts: when searchTerm is non-empty, show SearchResults instead of category content until search is clear. |

Once you’re aligned with this plan, implementation can follow in the order above (or in any order you prefer).
