# Post-Login Catalog Page – Build Plan

**Goal:** Build the desktop catalog / “All Products” page (from `post-login/1.txt` & `2.txt`) using **Vite + Tailwind**, borrowing everything from the existing Groupr app (components, design tokens, assets).

**Where we build:** In the **`post-login`** folder (this is the app). Groupr is the **source we borrow from** — we copy/adapt components and design into post-login; we do not build inside groupr.

**Stack:** Same as Groupr – React, TypeScript, Vite, Tailwind. All new code and the running app live in **post-login**.

---

## Component strategy: Reuse vs New

| # | Component | Source | Action |
|---|-----------|--------|--------|
| 1 | Logo | Groupr `ui/Logo` | **Reuse as-is** |
| 2 | NavLink | Groupr `ui/NavLink` | **Reuse as-is** |
| 3 | SearchBar | Groupr `ui/SearchBar` | **Reuse** (navbar) |
| 4 | Button | Groupr `ui/Button` | **Reuse as-is** |
| 5 | Input | Groupr `ui/Input` | **Reuse** (newsletter, hero search) |
| 6 | Card | Groupr `ui/Card` | **Reuse** (category, product cards) |
| 7 | Navbar | Groupr `layout/Navbar` | **Adapt** for post-login (Account instead of Log in/Sign up, optional LanguageToggle) |
| 8 | Footer | Groupr `layout/Footer` | **Reuse as-is** |
| 9 | CategoryCard | Groupr `sections/CategoryCard` | **Reuse** (already matches catalog categories) |
| 10 | ProductCard | Groupr `sections/ProductCard` | **Reuse as-is** |
| 11 | **PromoBanner** | New | **Add** – “Give $5, get $5” strip with Share CTA and close |
| 12 | **HeroSearch** | New | **Add** – “What are you looking for today?” block (bg-bg-light-green) |
| 13 | **CategoryStrip** | New | **Add** – Horizontal row of CategoryCards (All, Produce, Meat & Seafood, etc.) |
| 14 | **ProductGrid** | New | **Add** – Grid of ProductCards + section title “All Products” |
| 15 | **Pagination** | New | **Add** – First, Back, 1, 2, 3, •••, 8, Next, Last |
| 16 | **MerchantInfo** | New | **Add** – “Items Fulfilled by: Foodtown” + logo + address |
| 17 | **CatalogPage** | New | **Add** – Page composing Navbar, PromoBanner, HeroSearch, CategoryStrip, ProductGrid, Pagination, MerchantInfo, Footer |

---

## Build order (one by one)

Build in this order so each step has its dependencies already in place.

| Step | Component | Depends on | Notes |
|------|-----------|------------|--------|
| **1** | (None) | — | Ensure groupr runs: `npm run dev`. Tailwind + tokens already in place. |
| **2** | **Navbar (post-login variant)** | Logo, NavLink, SearchBar, Button | Add optional `variant="catalog"` or new props: show “Account” + cart; optional LanguageToggle. Keep same layout. |
| **3** | **PromoBanner** | Button | Single section: dark green bar, text, “Share Groupr” button, close icon. No shared deps beyond Button. |
| **4** | **HeroSearch** | Input, Button | Lime section, heading, search input, “Shop now” button. |
| **5** | **CategoryStrip** | CategoryCard | Map over category list; use existing category icons from `public/images/categories/`. |
| **6** | **ProductGrid** | ProductCard | Title “All Products” + grid of ProductCards. Accept `products` prop (or static data first). |
| **7** | **Pagination** | — | Presentational: First, Back, numbers, Next, Last. Props: `currentPage`, `totalPages`, `onPageChange` (optional). |
| **8** | **MerchantInfo** | — | “Items Fulfilled by:” + Foodtown logo (or placeholder) + address text. |
| **9** | **CatalogPage** | Navbar, PromoBanner, HeroSearch, CategoryStrip, ProductGrid, Pagination, MerchantInfo, Footer | Compose full page; wire category filter and product data later. |
| **10** | Routing (optional) | CatalogPage | Add route `/shop` or `/catalog` in App so the new page is reachable. |

---

## File structure (build in **post-login**)

```
post-login/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       ← borrow from groupr, adapt (Account, etc.)
│   │   │   └── Footer.tsx       ← copy/adapt from groupr
│   │   ├── ui/                  ← copy from groupr: Logo, NavLink, SearchBar, Button, Input, Card
│   │   └── sections/
│   │       ├── PromoBanner.tsx
│   │       ├── HeroSearch.tsx
│   │       ├── CategoryStrip.tsx
│   │       ├── CategoryCard.tsx  ← copy/adapt from groupr
│   │       ├── ProductGrid.tsx
│   │       ├── ProductCard.tsx   ← copy/adapt from groupr
│   │       ├── Pagination.tsx
│   │       └── MerchantInfo.tsx
│   ├── pages/
│   │   └── CatalogPage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── images/                 ← copy needed assets from groupr + post-login (e.g. account.svg)
├── 1.txt, 2.txt, 3.txt         ← reference only
├── account.svg                 ← use as account icon
├── package.json                ← Vite + Tailwind (same as groupr)
├── tailwind.config.js          ← copy theme from groupr
└── vite.config.ts
```

Groupr (`../groupr`) is reference: we copy components and config into post-login; we do not add catalog code inside groupr.

---

## Data (for later)

- **Categories:** All, Produce, Meat & Seafood, Pantry Staples, Dairy & Eggs, Cereals & Snacks, Breads & Bakery, Beverages (align with `post-login/1.txt` and existing category icons).
- **Products:** Start with static list from `1.txt` (e.g. assortment bags, Libby’s, Goya, bananas, etc.); later replace with API or context.
- **Merchant:** Static “Foodtown, 47-33 Bell Blvd, Bayside, NY 11361” for now.

---

## Design tokens (from Groupr – no changes)

- **Colors:** `bg-primary`, `bg-dark`, `bg-light-green`, `text-brown`, `text-dark`, `accent-green`, etc. (see `tailwind.config.js`).
- **Spacing:** `px-section` (64px), `rounded-card`, `rounded-button`, `rounded-input`.
- **Fonts:** `font-sans` (Inter), `font-display` (DM Sans).
- **Assets:** Reuse `public/images/` (logo, icons, categories, products).

---

## Next step

Start with **Step 2: Navbar (post-login variant)** so the catalog page has the correct header (Account + cart + optional language) while reusing Logo, NavLink, SearchBar, and Button from Groupr.
