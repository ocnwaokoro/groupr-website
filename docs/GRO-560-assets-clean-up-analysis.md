# GRO-560: Assets clean-up — Step 1 & 2 (Ticket + Analysis)

**Linear:** [GRO-560 – Assets clean-up](https://linear.app/groupr/issue/GRO-560/assets-clean-up)

---

## Step 1: Identify the ticket and goal

- **Ticket:** GRO-560 – Assets clean-up
- **Goal (in one sentence):** To be confirmed from the ticket description. Likely one or more of: remove unused assets, consolidate where assets live (e.g. `public/` vs `src/assets/`), remove duplicates, or standardize naming/organization.

**We need your input:** What does the Linear ticket actually ask for? (e.g. “Remove unused images”, “Move all SVGs to public”, “Delete duplicate category icons”.) Paste the ticket description or summarize it so we can align on scope.

---

## Step 2: Analyze the current system

### Where assets live

| Location | Purpose | How referenced |
|----------|--------|-----------------|
| **`public/images/`** | Catalog & UI: category icons, nav icons, logo, merchant, social | Paths like `/images/categories/...`, `/images/icons/...` in JSX and config |
| **`public/`** (root) | `logo.svg`, `vite.svg` | Vite default; may be unused |
| **`src/assets/`** | Logos, placeholders, landing/carousel illustrations | ES imports in components |

### Inventory

**`public/images/`** (33 files from glob):

- **categories/** – `all-category-icon.svg` + 7 category slugs (beverages, breads-bakery, …). All used (GRO-559).
- **icons/** – chevrons, dropdown, search, cart, account, close, nav icons, etc. Referenced across Catalog, Pagination, CategorySection, ProductCard, etc.
- **logo/** – `groupr-logo.svg`
- **merchant/** – `foodtown-logo.png`, `foodtown-logo.svg`
- **social/** – facebook, instagram, linkedin, x, youtube

**`src/assets/`** (used in code):

- **logo.svg** – NavBar (LeftSideNav, SignIn, SignUp), LoadOrderModal, LoadRefundModal
- **LogoFooter.svg** – Footer
- **allCategories.svg** – useLandingPage, OrderList, Carousel Slide1
- **placeholder2.svg**, **placeholder3.svg** – getProductImage (product placeholders)
- **placeholder_product_image.png** – Checkout ItemsReview
- **snap_logo.svg** – OrderSummary, RefundSummary
- **Bread.svg** – Landing ValueProposition
- **Carrot.svg**, **Pear.svg**, **Lime.svg**, **Papaya.svg**, **Pepper.svg**, **Cabbage.svg** – Landing CallToActionBanner (+ Carrot in Testimonials)
- **slice-orange.svg** – HowItWorksSection, HowItWorksCard
- **hero_illustration.svg** – HeroSection
- **testimonial1.png**, **testimonial2.png**, **star.svg** – TestimonialsSection
- **carousel2.png** – Carousel Slide2

**`src/assets/`** (no references found — likely unused):

- **placeholder.svg** – not imported (placeholders in use are placeholder2, placeholder3, placeholder_product_image)
- **react.svg**, **vite.svg** – Vite/React defaults; not imported in app code
- **oilCategory.svg**, **milkCategory.svg**, **meatCategory.svg**, **juiceCategory.svg**, **cerealCategory.svg**, **breadCategory.svg**, **bananaCategory.svg** – not imported (catalog now uses `public/images/categories/*` from GRO-559)
- **foodtown-small-logo.svg** – not imported (MerchantInfo uses `public/images/merchant/foodtown-logo.png`)

**`public/` root:**

- **logo.svg**, **vite.svg** – may be Vite defaults only; not referenced in app code

### Overlaps / duplication

- **“All” / all categories:** `src/assets/allCategories.svg` is imported in useLandingPage, OrderList, Carousel Slide1. Catalog strip uses `public/images/categories/all-category-icon.svg`. Two different assets for a similar concept.
- **Logo:** `src/assets/logo.svg` in nav/modals vs `public/images/logo/groupr-logo.svg` – need to confirm if both are required or one is canonical.
- **Category icons:** Old set in `src/assets/*Category.svg` (banana, bread, cereal, etc.) is unused after GRO-559; catalog uses `public/images/categories/{slug}-category-icon.svg`.

### Summary

- **Unused (candidates for removal):** `src/assets/placeholder.svg`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/oilCategory.svg`, `milkCategory.svg`, `meatCategory.svg`, `juiceCategory.svg`, `cerealCategory.svg`, `breadCategory.svg`, `bananaCategory.svg`, `foodtown-small-logo.svg`; possibly `public/logo.svg`, `public/vite.svg` if not used by Vite config.
- **Possible consolidation:** Decide single home for logo and for “all categories” icon; optionally move remaining `src/assets` into `public` and use path references for consistency.
- **Naming/organization:** `src/assets` mixes PascalCase (Bread.svg, Carrot.svg) and lowercase (logo.svg, slice-orange.svg); could standardize if the ticket asks for it.

---

## Next: Step 3 (Align on scope)

Once you share what GRO-560 actually asks for (or paste the ticket description), we will:

1. Propose a concrete scope (e.g. “Remove the 10 unused files above”, “Move logo to public only”, “No consolidation, only delete unused”).
2. Get your confirmation.
3. Then do Step 4 (plan exact changes) and Step 5 (confirm before coding).

Please paste or summarize the **GRO-560 ticket description** so we can align.
