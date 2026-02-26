# Catalog — Unified responsive catalog

Single responsive app for the post-login “All Products” catalog. Replaces **catalog-page** (desktop) and **catalog-page-mobile** (mobile).

- **Breakpoint:** `md` (768px). Below = mobile (hamburger nav, scrollable category strip, 2-col product grid). Above = desktop (full nav + SearchBar, flex categories, 4-col grid).
- **Stack:** Vite, React 19, TypeScript, Tailwind CSS.

## Run

From **this folder** (`catalog/`):

```bash
npm install
npm run dev
```

Then open **the URL Vite prints** in the terminal (e.g. `http://localhost:5173`). Do not assume a specific port — other apps may be using 5173, so Vite may use 5174, 5175, etc.

```bash
npm run build    # production build
npm run preview  # serve dist/
```

### If you see a white screen

1. **Use the correct URL.** Run `npm run dev` from `catalog/` and open the URL Vite prints. Opening a different port (e.g. another app) will not show this app.
2. **Check for errors.** The app is wrapped in an error boundary. If React throws, you’ll see “Something went wrong” and the message; also check the browser console (F12 → Console).

## Layout

- **Navbar:** Desktop = Logo + nav links + SearchBar + account + cart + language. Mobile = Logo + account + cart + hamburger; **MobileNavDrawer** for links and search.
- **Footer:** Responsive (stacked on small, row on desktop); same content.
- **Sections:** PromoBanner, HeroSearch, CategoryStrip, CategoryCard, ProductGrid, ProductCard, Pagination, MerchantInfo — all responsive.

## Docs

- **Desktop vs mobile behavior:** `docs/CATALOG_DESKTOP_VS_MOBILE_MAP.md` (repo root).
- **How the merge was done:** `docs/CATALOG_MERGE_PROCESS.md` (repo root), §8 Implementation.
