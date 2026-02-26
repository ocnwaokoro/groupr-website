# src/assets usage map

Map of all 39 files under `devenv-main/frontend/src/assets/` and where they are used (or that they are unused).

**Convention:** Imports are ES module `import x from '.../assets/...'`; paths are relative to the consuming file.

---

## Used in code (20 assets)

| Asset | Used in |
|-------|--------|
| `allCategories.svg` | `hooks/useLandingPage.ts`, `pages/Orders/Components/OrderList.tsx`, `pages/Catalog/Components/Carousel/Components/Slide1.tsx` |
| `logo.svg` | `pages/RefundSummary/Components/LoadRefundModal.tsx`, `pages/OrderSummary/Components/LoadOrderModal.tsx`, `common/NavBar/Components/SignUpModal.tsx`, `common/NavBar/Components/SignInModal.tsx`, `common/NavBar/Components/LeftSideNav.tsx` |
| `LogoFooter.svg` | `common/Footer.tsx` |
| `snap_logo.svg` | `pages/RefundSummary/Components/TransactionTypeComponent.tsx`, `pages/OrderSummary/Components/TransactionDetailsComponent.tsx` |
| `Bread.svg` | `pages/LandingPage/Components/ValueProposition.tsx` |
| `Carrot.svg` | `pages/LandingPage/Components/TestimonialsSection.tsx`, `pages/LandingPage/Components/CallToActionBanner.tsx` |
| `Pear.svg` | `pages/LandingPage/Components/CallToActionBanner.tsx` |
| `Lime.svg` | `pages/LandingPage/Components/CallToActionBanner.tsx` |
| `Papaya.svg` | `pages/LandingPage/Components/CallToActionBanner.tsx` |
| `Pepper.svg` | `pages/LandingPage/Components/CallToActionBanner.tsx` |
| `Cabbage.svg` | `pages/LandingPage/Components/CallToActionBanner.tsx` |
| `testimonial1.png` | `pages/LandingPage/Components/TestimonialsSection.tsx` |
| `testimonial2.png` | `pages/LandingPage/Components/TestimonialsSection.tsx` |
| `star.svg` | `pages/LandingPage/Components/TestimonialsSection.tsx` |
| `slice-orange.svg` | `pages/LandingPage/Components/HowItWorksSection.tsx`, `pages/Catalog/Components/Carousel/Components/HowItWorksCard.tsx` |
| `hero_illustration.svg` | `pages/LandingPage/Components/HeroSection.tsx` |
| `placeholder_product_image.png` | `pages/Checkout/Components/ItemsReview.tsx` |
| `placeholder2.svg` | `utils/getProductImage.tsx` (and `getProductImage.test.tsx` expects it) |
| `placeholder3.svg` | `utils/getProductImage.tsx` (and `getProductImage.test.tsx` expects it) |
| `carousel2.png` | `pages/Catalog/Components/Carousel/Components/Slide2.tsx` |

---

## Not referenced in src (19 assets)

These files exist in `src/assets/` but are not imported or referenced anywhere in the frontend source.

| Asset | Note |
|-------|------|
| `placeholder.svg` | — |
| `react.svg` | Likely default Vite/React asset; unused |
| `visa_logo.svg` | — |
| `foodtown-small-logo.svg` | — |
| `bananaCategory.svg` | Legacy; category icons now from `categoryConfig` → `/images/categories/` (GRO-559) |
| `breadCategory.svg` | Same |
| `cerealCategory.svg` | Same |
| `juiceCategory.svg` | Same |
| `milkCategory.svg` | Same |
| `meatCategory.svg` | Same |
| `oilCategory.svg` | Same |
| `shrimp.png` | — |
| `canSauges.png` | — |
| `oranges.png` | — |
| `beef.png` | — |
| `grapes.png` | — |
| `apple.png` | — |
| `banana.png` | — |
| `bacon.png` | — |

---

## Summary

- **20 assets** are used; each has at least one import in the table above.
- **19 assets** are unused; safe to delete or move in a later cleanup (e.g. when reorganizing into subfolders).
- Category strip icons are **not** served from these flat assets; they come from `getCategoryIconPath()` in `categoryConfig.ts`, which currently points to `public/images/categories/` (and will move to `src/assets/categories/` in GRO-560).

If you later move the 20 used assets into subfolders (e.g. `logo/`, `landing/`, `placeholders/`), you will need to update the import path in each consuming file listed above.
