# src/assets subfolder convention

Single convention so every asset has one clear place and import updates are consistent.

---

## Rules

1. **All asset filenames:** **kebab-case** (e.g. `logo-footer.svg`, `hero-illustration.svg`).
2. **One subfolder per purpose.** No duplicate concepts (e.g. one `logo/` for app brand, one `merchant/` for store logos).
3. **Imports:** ES module only; path is relative to the consuming file (e.g. `../../../assets/logo/logo.svg`).
4. **New assets:** Add to the appropriate subfolder below; use kebab-case.

---

## Subfolders (final structure)

| Subfolder | Purpose | Contents (after full reorganization) |
|-----------|---------|--------------------------------------|
| **categories/** | Category strip and category-related icons | `all-categories.svg`, `beverages-category-icon.svg`, `breads-bakery-category-icon.svg`, `cereals-snacks-category-icon.svg`, `dairy-eggs-category-icon.svg`, `meat-seafood-category-icon.svg`, `pantry-staples-category-icon.svg`, `produce-category-icon.svg` |
| **logo/** | Groupr app / brand logos | `logo.svg`, `logo-footer.svg`, `groupr-logo.svg` (from public) |
| **merchant/** | Merchant / store logos | `foodtown-logo.png`, `foodtown-logo.svg` |
| **payments/** | Payment method / provider logos | `snap-logo.svg` |
| **landing/** | Landing page only (hero, testimonials, illustrations, carousel) | `hero-illustration.svg`, `slice-orange.svg`, `star.svg`, `bread.svg`, `carrot.svg`, `pear.svg`, `lime.svg`, `papaya.svg`, `pepper.svg`, `cabbage.svg`, `testimonial1.png`, `testimonial2.png`, `carousel2.png` |
| **placeholders/** | Generic placeholder images (product, bag, etc.) | `placeholder2.svg`, `placeholder3.svg`, `placeholder-product-image.png` |
| **products/** | Product imagery (by category) | `featured/` (assortment-bag-*.png), `meat-seafood/` (*.png), `produce/` (*.png) — from public |
| **social/** | Social platform icons | `facebook-icon.svg`, `instagram-icon.svg`, `linkedin-icon.svg`, `x-icon.svg`, `youtube-icon.svg` (from public) |

---

## File renames (current flat → kebab-case in subfolder)

So that every asset has one canonical name and location:

| Current file (flat) | New path (subfolder + kebab-case) |
|--------------------|------------------------------------|
| `allCategories.svg` | `categories/all-categories.svg` |
| `logo.svg` | `logo/logo.svg` (no rename) |
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
| `slice-orange.svg` | `landing/slice-orange.svg` (already kebab) |
| `hero_illustration.svg` | `landing/hero-illustration.svg` |
| `placeholder_product_image.png` | `placeholders/placeholder-product-image.png` |
| `placeholder2.svg` | `placeholders/placeholder2.svg` |
| `placeholder3.svg` | `placeholders/placeholder3.svg` |
| `carousel2.png` | `landing/carousel2.png` |

Category icons from public are already kebab-case in `categories/`. Merchant, products, social from public keep their current names under the same subfolders.

---

## Import path pattern

From a file at `src/<path>/<file>.tsx`, assets live at `src/assets/<subfolder>/<file>.ext`, so:

- Depth from `src/` to the consuming file = number of `../` to get back to `src/`, then `assets/<subfolder>/...`.
- Examples:
  - `src/common/Footer.tsx` → `../assets/logo/logo-footer.svg`
  - `src/pages/Catalog/constants/categoryConfig.ts` → `../../../assets/categories/all-categories.svg`
  - `src/pages/LandingPage/Components/HeroSection.tsx` → `../../../assets/landing/hero-illustration.svg`
  - `src/utils/getProductImage.tsx` → `../assets/placeholders/placeholder2.svg`

Use this pattern when updating imports so paths stay consistent and updates are seamless.
