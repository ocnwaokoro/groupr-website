# Assets work: execution order

Single order of operations so everything happens in the right sequence. **Step 1 is delete unused assets; then the rest.** Subfolder layout and renames follow **ASSETS_SUBFOLDER_CONVENTION.md**.

---

## Step 1: Delete unused assets (no code changes)

Delete these **19 files** from `devenv-main/frontend/src/assets/`. Nothing in the codebase imports them.

| # | File |
|---|------|
| 1 | `placeholder.svg` |
| 2 | `react.svg` |
| 3 | `visa_logo.svg` |
| 4 | `foodtown-small-logo.svg` |
| 5 | `bananaCategory.svg` |
| 6 | `breadCategory.svg` |
| 7 | `cerealCategory.svg` |
| 8 | `juiceCategory.svg` |
| 9 | `milkCategory.svg` |
| 10 | `meatCategory.svg` |
| 11 | `oilCategory.svg` |
| 12 | `shrimp.png` |
| 13 | `canSauges.png` |
| 14 | `oranges.png` |
| 15 | `beef.png` |
| 16 | `grapes.png` |
| 17 | `apple.png` |
| 18 | `banana.png` |
| 19 | `bacon.png` |

**After Step 1:** 20 assets remain in `src/assets/` (all used). No imports need updating.

---

## Step 2: Create subfolders and move all assets into them

Create under `frontend/src/assets/`:

**2a. Create all subfolders** (per ASSETS_SUBFOLDER_CONVENTION):

- `categories/`, `logo/`, `merchant/`, `payments/`, `landing/`, `placeholders/`
- `products/` and `products/featured/`, `products/meat-seafood/`, `products/produce/`
- `social/`

**2b. Move files from `public/images`** into these folders as in **GRO-560-implementation-plan.md** Part A. Do **not** move `public/images/categories/all-category-icon.svg`.

**2c. Move and rename the 20 flat assets** into subfolders (kebab-case per convention):

| From (flat) | To |
|-------------|-----|
| `allCategories.svg` | `categories/all-categories.svg` |
| `logo.svg` | `logo/logo.svg` |
| `LogoFooter.svg` | `logo/logo-footer.svg` |
| `snap_logo.svg` | `payments/snap-logo.svg` |
| `Bread.svg` | `landing/bread.svg` |
| `Carrot.svg` | `landing/carrot.svg` |
| `Pear.svg` | `landing/pear.svg` |
| `Lime.svg` | `landing/lime.svg` |
| `Papaya.svg` | `landing/papaya.svg` |
| `Pepper.svg` | `landing/pepper.svg` |
| `Cabbage.svg` | `landing/cabbage.svg` |
| `testimonial1.png` | `landing/testimonial1.png` |
| `testimonial2.png` | `landing/testimonial2.png` |
| `star.svg` | `landing/star.svg` |
| `slice-orange.svg` | `landing/slice-orange.svg` |
| `hero_illustration.svg` | `landing/hero-illustration.svg` |
| `placeholder_product_image.png` | `placeholders/placeholder-product-image.png` |
| `placeholder2.svg` | `placeholders/placeholder2.svg` |
| `placeholder3.svg` | `placeholders/placeholder3.svg` |
| `carousel2.png` | `landing/carousel2.png` |

After Step 2, nothing remains at the root of `src/assets/`; all assets live in subfolders with consistent names.

---

## Step 3: Update imports and GRO-560 code changes

**3a. Update every asset import** to the new subfolder paths. Use the map below (each row is one file; set its import(s) to the New import(s) column). Paths are relative to the file location under `frontend/src/`.

| File | New import(s) |
|------|----------------|
| `hooks/useLandingPage.ts` | `import allIcon from '../assets/categories/all-categories.svg';` |
| `pages/Orders/Components/OrderList.tsx` | `import allIcon from '../../../assets/categories/all-categories.svg';` |
| `pages/Catalog/Components/Carousel/Components/Slide1.tsx` | `import allCategoriesIllustration from '../../../../../assets/categories/all-categories.svg';` |
| `pages/RefundSummary/Components/LoadRefundModal.tsx` | `import logo from '../../../assets/logo/logo.svg';` |
| `pages/OrderSummary/Components/LoadOrderModal.tsx` | `import logo from '../../../assets/logo/logo.svg';` |
| `common/NavBar/Components/SignUpModal.tsx` | `import logo from '../../../assets/logo/logo.svg';` |
| `common/NavBar/Components/SignInModal.tsx` | `import logo from '../../../assets/logo/logo.svg';` |
| `common/NavBar/Components/LeftSideNav.tsx` | `import logo from '../../../assets/logo/logo.svg';` |
| `common/Footer.tsx` | `import logoFooter from '../assets/logo/logo-footer.svg';` |
| `pages/RefundSummary/Components/TransactionTypeComponent.tsx` | `import snapLogo from '../../../assets/payments/snap-logo.svg';` |
| `pages/OrderSummary/Components/TransactionDetailsComponent.tsx` | `import snapLogo from '../../../assets/payments/snap-logo.svg';` |
| `pages/LandingPage/Components/ValueProposition.tsx` | `import bread from '../../../assets/landing/bread.svg';` |
| `pages/LandingPage/Components/TestimonialsSection.tsx` | `testimonial1` from `../../../assets/landing/testimonial1.png`, `testimonial2` from `testimonial2.png`, `star` from `star.svg`, `carrot` from `carrot.svg` (same dir) |
| `pages/LandingPage/Components/CallToActionBanner.tsx` | `carrot`, `pear`, `lime`, `papaya`, `pepper`, `cabbage` from `../../../assets/landing/*.svg` |
| `pages/LandingPage/Components/HowItWorksSection.tsx` | `import sliceOrange from '../../../assets/landing/slice-orange.svg';` |
| `pages/LandingPage/Components/HeroSection.tsx` | `import heroIllustration from '../../../assets/landing/hero-illustration.svg';` |
| `pages/Checkout/Components/ItemsReview.tsx` | `import placeholderImage from '../../../assets/placeholders/placeholder-product-image.png';` |
| `pages/Catalog/Components/Carousel/Components/Slide2.tsx` | `import carousel2 from '../../../../../assets/landing/carousel2.png';` |
| `pages/Catalog/Components/Carousel/Components/HowItWorksCard.tsx` | `import sliceOrange from '../../../../../assets/landing/slice-orange.svg';` |
| `utils/getProductImage.tsx` | `import orangeBagPlaceholder from '../assets/placeholders/placeholder2.svg';` and `greenBagPlaceholder` from `placeholder3.svg` |

**3b. categoryConfig.ts** – Import all category SVGs from `../../../assets/categories/` (including `all-categories.svg` for fallback); build keyword→icon map; `getCategoryIconPath` returns those imported paths (no `/images/`). See GRO-560-implementation-plan.md Part B.1.

**3c. GRO-560 icon and merchant updates** – CategoryStrip: `MdExpandMore` from `react-icons/md`. CategoryProductsModal, Pagination, PromoBanner, HeroSearch, CategorizedProducts, ProductCard, CategorySection: replace `/images/icons/` with the correct `Md*` from `react-icons/md` per the plan. MerchantInfo: `import foodtownLogo from '../../../assets/merchant/foodtown-logo.png';` and use it instead of `/images/merchant/foodtown-logo.png`.

---

## Step 4: Delete `frontend/public/images` (GRO-560 Part C)

Remove the entire directory `devenv-main/frontend/public/images/`. All needed assets are now under `src/assets/` or replaced by `react-icons/md`.

---

## Step 5: Verify (GRO-560 Part D)

- Grep for `/images/` in frontend → should be empty (or only comments/docs).
- `npm run build` (or project build command) → succeeds.
- Run tests → pass.
- Quick manual check: catalog, landing, modals, merchant block, nav/footer.

---

## Summary

| Step | What | Code changes? |
|------|------|----------------|
| 1 | Delete 19 unused assets from `src/assets/` | No |
| 2 | Create subfolders; move `public/images` + move/rename 20 flat assets into them | No |
| 3 | Update all imports (table in 3a) + categoryConfig (3b) + Md icons + MerchantInfo (3c) | Yes |
| 4 | Delete `frontend/public/images/` | No |
| 5 | Verify (grep, build, tests, manual) | No |
