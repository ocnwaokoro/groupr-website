# GRO-560: Assets quick audit — Referenced vs not referenced

**Ticket:** [GRO-560 – Assets clean-up](https://linear.app/groupr/issue/GRO-560/assets-clean-up)  
**Method:** Grep for import paths and string paths; no runtime check.

---

## 1. `frontend/src/assets/` (imported in code)

| File | Status | Where referenced |
|------|--------|------------------|
| logo.svg | ✅ Referenced | LoadRefundModal, LoadOrderModal, SignUpModal, SignInModal, LeftSideNav |
| LogoFooter.svg | ✅ Referenced | Footer |
| placeholder2.svg | ✅ Referenced | getProductImage, getProductImage.test |
| placeholder3.svg | ✅ Referenced | getProductImage, getProductImage.test |
| placeholder_product_image.png | ✅ Referenced | Checkout ItemsReview |
| allCategories.svg | ✅ Referenced | useLandingPage, OrderList, Carousel Slide1 |
| snap_logo.svg | ✅ Referenced | RefundSummary TransactionTypeComponent, OrderSummary TransactionDetailsComponent |
| Bread.svg | ✅ Referenced | Landing ValueProposition |
| Carrot.svg | ✅ Referenced | TestimonialsSection, CallToActionBanner |
| Pear.svg, Lime.svg, Papaya.svg, Pepper.svg, Cabbage.svg | ✅ Referenced | CallToActionBanner |
| testimonial1.png, testimonial2.png | ✅ Referenced | TestimonialsSection |
| star.svg | ✅ Referenced | TestimonialsSection |
| hero_illustration.svg | ✅ Referenced | HeroSection |
| slice-orange.svg | ✅ Referenced | HowItWorksSection, Carousel HowItWorksCard |
| carousel2.png | ✅ Referenced | Carousel Slide2 |
| cerealCategory.svg | ❌ Not referenced | — |
| milkCategory.svg | ❌ Not referenced | — |
| bananaCategory.svg | ❌ Not referenced | — |
| breadCategory.svg | ❌ Not referenced | — |
| juiceCategory.svg | ❌ Not referenced | — |
| oilCategory.svg | ❌ Not referenced | — |
| meatCategory.svg | ❌ Not referenced | — |
| visa_logo.svg | ❌ Not referenced | — |
| foodtown-small-logo.svg | ❌ Not referenced | — |
| react.svg | ❌ Not referenced | (Vite default) |
| placeholder.svg | ❌ Not referenced | (placeholder2/3 used instead) |
| shrimp.png | ❌ Not referenced | — |
| canSauges.png | ❌ Not referenced | — |
| oranges.png | ❌ Not referenced | — |
| beef.png | ❌ Not referenced | — |
| grapes.png | ❌ Not referenced | — |
| apple.png | ❌ Not referenced | — |
| banana.png | ❌ Not referenced | — |
| bacon.png | ❌ Not referenced | — |

**Summary src/assets:** 18 files referenced, **20 files not referenced**.

---

## 2. `frontend/public/` (root)

| File | Status | Where referenced |
|------|--------|------------------|
| logo.svg | ✅ Referenced | index.html `<link rel="icon" href="/logo.svg" />` |
| vite.svg | ❌ Not referenced | (Vite default, not used in this app) |

---

## 3. `frontend/public/images/` (path-based)

**Referenced by literal path in code:**

- **categories:** `all-category-icon.svg` + dynamic `/images/categories/${slug}-category-icon.svg` (categoryConfig, CategoryStrip). All 9 category SVGs can be used at runtime.
- **icons:** `chevron-left.svg`, `chevron-right.svg`, `dropdown-icon.svg`, `close-icon.svg`, `double-chevron-left.svg`, `double-chevron-right.svg`, `search-icon.svg`, `add-to-cart-icon.svg`.
- **merchant:** `foodtown-logo.png` (MerchantInfo uses .png).

**Not referenced by any literal path in code:**

- **icons:** account-icon.svg, cart-icon.svg, nav-icon-0.svg … nav-icon-6.svg, nav-close.svg.
- **merchant:** foodtown-logo.svg (code uses .png only).
- **logo:** groupr-logo.svg (favicon uses `/logo.svg` at public root, not this file).
- **social:** facebook-icon.svg, instagram-icon.svg, linkedin-icon.svg, x-icon.svg, youtube-icon.svg (Footer uses react-icons, not these files).
- **products:** all product PNGs under products/featured, products/meat-seafood, products/produce — no direct path in code; product images come from API `image_url`. These may be dev/demo assets or used if the API points to them.

**Summary public/images:** 8 icon files + 1 merchant PNG + category SVGs (dynamic) are referenced. **Unreferenced:** 9 nav/account/cart icons, 1 merchant SVG, 1 logo SVG, 5 social SVGs, and all product PNGs (unless API points to them).

---

## 4. A vs B vs C (reminder)

- **A** = Remove unused only (delete the “not referenced” files above).
- **B** = Remove unused + consolidate (e.g. move remaining assets to one convention and update imports/paths).
- **C** = Do exactly what the Linear ticket says (if it specifies something different from A or B, we follow the ticket).

---

## 5. Safe-to-delete list (if we choose Option A)

**From `src/assets/` (20 files):**  
cerealCategory.svg, milkCategory.svg, bananaCategory.svg, breadCategory.svg, juiceCategory.svg, oilCategory.svg, meatCategory.svg, visa_logo.svg, foodtown-small-logo.svg, react.svg, placeholder.svg, shrimp.png, canSauges.png, oranges.png, beef.png, grapes.png, apple.png, banana.png, bacon.png.

**From `public/` (1 file):**  
vite.svg.

**From `public/images/` (optional; confirm before delete):**  
icons: account-icon, cart-icon, nav-icon-0 through nav-icon-6, nav-close.  
merchant: foodtown-logo.svg.  
logo: groupr-logo.svg.  
social: facebook, instagram, linkedin, x, youtube.  
products: (only if you confirm API never serves these paths.)

Use this audit when we align on scope (Step 3) and when we plan exact changes (Step 4).
