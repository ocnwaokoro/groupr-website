# Catalog Page Mobile – Asset Map & Component Reference

Single source of truth for **all assets** (paths + usage) and **component references** (imports + structure). Keeps style aligned with **catalog-page** while staying true to mobile.

---

## 1. Asset map

All paths are relative to **project root**; in code and `public/`, use **`/images/...`** (leading slash = from web root).

### 1.1 Logo

| Asset | Path | Used by | Notes |
|-------|------|---------|--------|
| Groupr logo | `/images/logo/groupr-logo.svg` | `Logo.tsx`, `Footer.tsx` (via Logo) | Same as catalog-page. Mobile: default `h-8 w-9` in Navbar, `h-16 w-[90px]` in Footer. |

**File on disk:** `public/images/logo/groupr-logo.svg`

---

### 1.2 Icons

| Asset | Path | Used by | Desktop (catalog-page) | Mobile |
|-------|------|---------|------------------------|--------|
| Account | `/images/icons/account-icon.svg` | `Navbar.tsx` | Same | Same; no label under icon |
| Cart | `/images/icons/cart-icon.svg` | `Navbar.tsx` | Same | Same |
| Add to cart | `/images/icons/add-to-cart-icon.svg` | `ProductCard.tsx` | Same | Same; button `w-6 h-6` (desktop `w-8 h-8`) |
| Search | `/images/icons/search-icon.svg` | `HeroSearch.tsx` | HeroSearch, SearchBar | HeroSearch only (no Navbar search) |
| Close | `/images/icons/close-icon.svg` | `PromoBanner.tsx` | Same | Same |
| Chevron left | `/images/icons/chevron-left.svg` | `CategoryStrip.tsx`, `Pagination.tsx` | Pagination only | Category carousel + Pagination |
| Chevron right | `/images/icons/chevron-right.svg` | `CategoryStrip.tsx`, `Pagination.tsx` | Same | Same |
| Double chevron left | `/images/icons/double-chevron-left.svg` | — | Pagination (First) | Not used (simplified pagination) |
| Double chevron right | `/images/icons/double-chevron-right.svg` | — | Pagination (Last) | Not used |
| Dropdown | `/images/icons/dropdown-icon.svg` | — | Navbar (language) | Not used on mobile |

**Files on disk:** `public/images/icons/*.svg`

---

### 1.3 Category icons (category strip)

| Asset | Path | Used by |
|-------|------|---------|
| All | `/images/categories/all-category-icon.svg` | `CategoryStrip.tsx` → `CategoryCard.tsx` |
| Produce | `/images/categories/produce-category-icon.svg` | Same |
| Meat & Seafood | `/images/categories/meat-seafood-category-icon.svg` | Same |
| Pantry Staples | `/images/categories/pantry-staples-category-icon.svg` | Same |
| Dairy & Eggs | `/images/categories/dairy-eggs-category-icon.svg` | Same |
| Cereals & Snacks | `/images/categories/cereals-snacks-category-icon.svg` | Same |
| Breads & Bakery | `/images/categories/breads-bakery-category-icon.svg` | Same |
| Beverages | `/images/categories/beverages-category-icon.svg` | Same |

**Files on disk:** `public/images/categories/*.svg`  
**Data:** Category list is hardcoded in `CategoryStrip.tsx` (same as catalog-page).

---

### 1.4 Merchant

| Asset | Path | Used by |
|-------|------|---------|
| Foodtown logo (PNG) | `/images/merchant/foodtown-logo.png` | `MerchantInfo.tsx` |
| Foodtown logo (SVG) | `/images/merchant/foodtown-logo.svg` | — (available; mobile uses PNG) |

**Mobile:** `MerchantInfo` uses `h-6` for logo (desktop uses `h-8`).

---

### 1.5 Product images (from data)

Product images are referenced in **`src/data/products.ts`**; `ProductCard` receives `image` as a prop and renders `<img src={image} />`.

| Path pattern | Example | Used by |
|--------------|---------|---------|
| `/images/products/featured/assortment-bag-50.png` | $50 bag, Goya tomato, Goya black beans, Barilla, Hellmann's | `ProductGrid` → `ProductCard` (via PRODUCTS) |
| `/images/products/featured/assortment-bag-75.png` | $75 bag | Same |
| `/images/products/featured/assortment-bag-100.png` | $100 bag | Same |
| `/images/products/meat-seafood/vienna-sausages-product.png` | Libby's Vienna Sausages | Same |
| `/images/products/meat-seafood/sliced-bacon-product.png` | Sliced Bacon | Same |
| `/images/products/meat-seafood/jumbo-shrimp-product.png` | Jumbo Uncooked Shrimp | Same |
| `/images/products/meat-seafood/beef-hot-dogs-product.png` | Beef Hot Dogs | Same |
| `/images/products/produce/bananas-product.png` | Bananas | Same |
| `/images/products/produce/red-apples-product.png` | Red Apples | Same |
| `/images/products/produce/mandarin-oranges-product.png` | Mandarin Oranges | Same |
| `/images/products/produce/green-seedless-grapes-product.png` | Green Seedless Grapes | Same |

**Files on disk:** `public/images/products/featured/*.png`, `public/images/products/meat-seafood/*.png`, `public/images/products/produce/*.png`

---

### 1.6 Social

| Asset | Path | Used by |
|-------|------|---------|
| Facebook | `/images/social/facebook-icon.svg` | `Footer.tsx` |
| Instagram | `/images/social/instagram-icon.svg` | `Footer.tsx` |
| LinkedIn | `/images/social/linkedin-icon.svg` | `Footer.tsx` |
| X (Twitter) | `/images/social/x-icon.svg` | `Footer.tsx` |
| YouTube | `/images/social/youtube-icon.svg` | `Footer.tsx` |

**Mobile:** Same as catalog-page; Footer uses `h-6 w-6` for all.

---

### 1.7 Favicon

| Asset | Path | Used by |
|-------|------|---------|
| Favicon | `/images/logo/groupr-logo.svg` | `index.html` `<link rel="icon">` |

---

## 2. Component reference map

How components import each other and where they live. All paths relative to **`src/`**.

### 2.1 Entry & page

```
main.tsx
  └── import './index.css'
  └── import App from './App.tsx'

App.tsx
  └── import CatalogPage from './pages/CatalogPage'

pages/CatalogPage.tsx
  └── import Navbar from '../components/layout/Navbar'
  └── import PromoBanner from '../components/sections/PromoBanner'
  └── import HeroSearch from '../components/sections/HeroSearch'
  └── import CategoryStrip from '../components/sections/CategoryStrip'
  └── import ProductGrid from '../components/sections/ProductGrid'
  └── import Pagination from '../components/sections/Pagination'
  └── import MerchantInfo from '../components/sections/MerchantInfo'
  └── import Footer from '../components/layout/Footer'
```

### 2.2 Layout components

```
components/layout/Navbar.tsx
  └── import Logo from '../ui/Logo'
  └── assets: /images/icons/account-icon.svg, cart-icon.svg
  └── (menu: inline SVG, no asset)

components/layout/Footer.tsx
  └── import Logo from '../ui/Logo'
  └── import Input from '../ui/Input'
  └── import Button from '../ui/Button'
  └── assets: /images/social/*.svg (5)
```

### 2.3 Section components

```
components/sections/PromoBanner.tsx
  └── import Button from '../ui/Button'
  └── assets: /images/icons/close-icon.svg

components/sections/HeroSearch.tsx
  └── (no component imports)
  └── assets: /images/icons/search-icon.svg

components/sections/CategoryStrip.tsx
  └── import CategoryCard from './CategoryCard'
  └── assets: /images/icons/chevron-left.svg, chevron-right.svg
  └── category icons via CategoryCard (paths in CATEGORIES array)

components/sections/CategoryCard.tsx
  └── import Card from '../ui/Card'
  └── assets: icon path from parent (e.g. /images/categories/produce-category-icon.svg)

components/sections/ProductGrid.tsx
  └── import ProductCard from './ProductCard'
  └── import { PRODUCTS } from '../../data/products'
  └── (product images come from PRODUCTS[].image)

components/sections/ProductCard.tsx
  └── import Card from '../ui/Card'
  └── assets: /images/icons/add-to-cart-icon.svg
  └── image: prop from parent (from products.ts)

components/sections/Pagination.tsx
  └── (no component imports)
  └── assets: /images/icons/chevron-left.svg, chevron-right.svg

components/sections/MerchantInfo.tsx
  └── (no component imports)
  └── assets: /images/merchant/foodtown-logo.png
```

### 2.4 UI primitives

```
components/ui/Logo.tsx
  └── assets: /images/logo/groupr-logo.svg

components/ui/Button.tsx
  └── (no assets)

components/ui/Card.tsx
  └── (no assets)

components/ui/Input.tsx
  └── (no assets)
```

### 2.5 Data (no UI)

```
data/products.ts
  └── exports Product interface and PRODUCTS array
  └── each product has image: '/images/products/...' path
```

---

## 3. Reference cheat sheet (how to reference components)

From any file, use these import patterns so structure stays consistent:

| You are in | Import a page | Import layout | Import section | Import UI | Import data |
|------------|----------------|---------------|----------------|-----------|-------------|
| `src/App.tsx` | `./pages/CatalogPage` | — | — | — | — |
| `src/pages/CatalogPage.tsx` | — | `../components/layout/Navbar` | `../components/sections/PromoBanner` | — | — |
| `src/components/layout/*.tsx` | — | (other layout) | — | `../ui/Logo` | — |
| `src/components/sections/*.tsx` | — | — | `./CategoryCard` (sibling) | `../ui/Button` | `../../data/products` |
| `src/components/ui/*.tsx` | — | — | — | (none) | — |

**Asset paths in JSX:** Always use **`/images/...`** (e.g. `src="/images/logo/groupr-logo.svg"`). No `import` for these; Vite serves `public/` at root.

**Data:** Only `ProductGrid` (or any list of products) imports `PRODUCTS` from `../../data/products`; product image paths stay in that file.

---

## 4. Style alignment (catalog-page vs mobile)

Same Tailwind theme so the two apps look related; mobile tightens spacing and some sizes.

### 4.1 Shared design tokens (tailwind.config.js)

- **Colors:** `bg-primary`, `bg-dark`, `bg-light-green`, `bg-footer`, `bg-category`, `bg-product`, `text-primary`, `text-brown`, `text-light`, `accent-orange`, `accent-green`, `accent-border`, etc. (identical hex values).
- **Fonts:** `sans` (Inter), `display` (DM Sans).
- **Radii:** `rounded-card` (24px), `rounded-button` (12px), `rounded-input` (8px).

### 4.2 Mobile-specific choices

| Token / area | Catalog-page (desktop) | Catalog-page-mobile |
|-------------|------------------------|---------------------|
| `spacing.section` | 64px | 20px |
| Page width | max-w-[1440px] / 1312px content | max-w-[375px] mx-auto |
| Navbar | Full nav links + SearchBar + Account/Cart/Lang | Logo + Account + Cart + hamburger (no search, no lang in bar) |
| Logo (Navbar) | h-[52px] w-[60px] | h-8 w-9 |
| Logo (Footer) | h-[104px] w-[120px] | h-16 w-[90px] |
| Category card | w-[144px], 120px image area | w-20 (80px), 64px image area |
| Product grid | 4 columns, 300px cards | 2 columns, full-width cards in grid |
| Product card image | 300×280px | h-28 (112px), object-cover |
| Add-to-cart icon | w-8 h-8 | w-6 h-6 |
| Pagination | First / Back / 1,2,3 / ••• / 8 / Next / Last | Prev / 1 / 2 / ••• / 8 / Next |
| Merchant logo | h-8 | h-6 |
| Footer | Multi-column row | Single column, stacked |

Using the same token names (e.g. `bg-bg-dark`, `text-text-brown`) everywhere keeps style consistent; only layout and size utilities change for mobile.

---

## 5. Quick checklist for new assets

When adding a new asset:

1. **Place file** in `public/images/<category>/<name>.<ext>`.
2. **Reference in code** as `src="/images/<category>/<name>.<ext>"` (or in `products.ts` for product images).
3. **Optional:** Add one line to the “Asset map” table in this doc and note which component uses it.

When adding a new component:

1. **Create** under `src/components/ui/`, `layout/`, or `sections/`.
2. **Import** from page or parent using the patterns in §2 and §3.
3. **Optional:** Add to the component tree in §2.

This keeps asset and component references consistent and mobile styling aligned with catalog-page.
