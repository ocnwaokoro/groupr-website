# Catalog Page Mobile – Build Plan

Build the mobile catalog in **catalog-page-mobile** using **Vite + React + TypeScript + Tailwind**. Components and styling are borrowed from **catalog-page** and adapted for mobile (375px-first, touch-friendly, horizontal category scroll).

---

## Stack

- **Vite** – dev server and build
- **React 19** + **TypeScript**
- **Tailwind CSS** – same theme as catalog-page (colors, fonts, radii)

---

## Build Order (one by one)

| # | Step | What | Borrow from catalog-page | Mobile adaptation |
|---|------|------|---------------------------|--------------------|
| **0** | **Project setup** | Vite, Tailwind, PostCSS, TS, index.html, main/App, index.css, tailwind theme | package.json, vite.config, tailwind.config, postcss, index.css | Same config; ensure viewport/mobile meta |
| **1** | **Data + assets** | `src/data/products.ts`, copy `public/images` (categories, icons, logo, merchant, products, social) | catalog-page/src/data/products.ts, catalog-page/public/images | Same paths so components can reuse |
| **2** | **UI: Logo** | `components/ui/Logo.tsx` | Logo.tsx | Optional smaller default size for mobile |
| **3** | **UI: Button** | `components/ui/Button.tsx` | Button.tsx | Same; use for PromoBanner, HeroSearch, Footer |
| **4** | **UI: Card** | `components/ui/Card.tsx` | Card.tsx | Same variants (category, product) |
| **5** | **UI: Input** | `components/ui/Input.tsx` | Input.tsx | Same; used in search + newsletter |
| **6** | **Layout: Navbar** | `components/layout/Navbar.tsx` | Navbar.tsx | Mobile: logo left, single nav icon + hamburger right; no desktop nav links/search in bar (search in HeroSearch below) |
| **7** | **Section: PromoBanner** | `components/sections/PromoBanner.tsx` | PromoBanner.tsx | Stack vertically on small width; dismiss (X) top-right; same copy + “Share Groupr” |
| **8** | **Section: HeroSearch** | `components/sections/HeroSearch.tsx` | HeroSearch.tsx | Full-width; heading + search input (no “Shop now” or smaller button); bg-bg-light-green |
| **9** | **Section: CategoryStrip** | `components/sections/CategoryStrip.tsx` | CategoryStrip.tsx | Horizontal scroll (overflow-x-auto, snap); same CATEGORIES data; optional left/right chevron buttons |
| **10** | **Section: CategoryCard** | `components/sections/CategoryCard.tsx` | CategoryCard.tsx | Smaller fixed width (e.g. 80px) for strip; same icon + label, selected state |
| **11** | **Section: ProductGrid** | `components/sections/ProductGrid.tsx` | ProductGrid.tsx | 2-column grid (not 4); same PRODUCTS; “All Products” heading |
| **12** | **Section: ProductCard** | `components/sections/ProductCard.tsx` | ProductCard.tsx | Smaller card (e.g. 160px image width); same image, add-to-cart, name, price, description |
| **13** | **Section: Pagination** | `components/sections/Pagination.tsx` | Pagination.tsx | Compact: prev/next icons + page numbers (1, 2, •••, 8); same props |
| **14** | **Section: MerchantInfo** | `components/sections/MerchantInfo.tsx` | MerchantInfo.tsx | Same copy + Foodtown logo + address; center or full width |
| **15** | **Layout: Footer** | `components/layout/Footer.tsx` | Footer.tsx | Stack: logo, link columns (Quick Links, Stay Connected), newsletter, divider, credits + social; single column on mobile |
| **16** | **Page: CatalogPage** | `pages/CatalogPage.tsx` | CatalogPage.tsx | Compose: Navbar → PromoBanner → HeroSearch → main (CategoryStrip, ProductGrid, Pagination, MerchantInfo) → Footer; max-width 375px or full width with internal max; padding for mobile |

---

## File structure (target)

```
catalog-page-mobile/
├── BUILD_PLAN.md
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/
│   └── images/          # copied from catalog-page (categories, icons, logo, merchant, products, social)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── data/
│   │   └── products.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Logo.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── PromoBanner.tsx
│   │       ├── HeroSearch.tsx
│   │       ├── CategoryStrip.tsx
│   │       ├── CategoryCard.tsx
│   │       ├── ProductGrid.tsx
│   │       ├── ProductCard.tsx
│   │       ├── Pagination.tsx
│   │       └── MerchantInfo.tsx
│   └── pages/
│       └── CatalogPage.tsx
└── (optional: keep or remove Untitled.css / Untitled.jsx / Untitled.module.css as reference)
```

---

## Tailwind theme (from catalog-page)

Reuse in `tailwind.config.js`:

- **Colors:** `bg-primary`, `bg-dark`, `bg-light-green`, `bg-footer`, `bg-category`, `bg-product`, `text-primary`, `text-brown`, `text-light`, `accent-orange`, `accent-green`, `accent-border`, etc.
- **Fonts:** `sans: Inter`, `display: DM Sans`
- **Border radius:** `card`, `button`, `input`
- **Spacing:** `section` (can be smaller on mobile, e.g. 20px)

---

## Execution

Build in order **0 → 16**. After project setup and data/assets, each step is one (or a few) components; then wire them in `CatalogPage.tsx` and verify in the browser.

---

## Run

```bash
cd catalog-page-mobile
npm install   # if not already done
npm run dev   # dev server (e.g. http://localhost:5173)
npm run build # production build
npm run preview # preview production build
```
