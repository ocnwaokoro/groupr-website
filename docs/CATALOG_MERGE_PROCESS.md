# Catalog Merge Process — Full Documentation

This document records the **entire process thus far** for merging **catalog-page** (desktop) and **catalog-page-mobile** (mobile) into a single responsive catalog app.

---

## 1. Goal

**Create a new folder that merges `catalog-page` and `catalog-page-mobile`.**

Meaning: one responsive post-login catalog app that serves both desktop and mobile from a single codebase, replacing the two separate apps.

---

## 2. Project context

### 2.1 Repo structure

- **Groupr** = affordable grocery delivery for NYC residents (SNAP/EBT).
- The repo contains four front-end apps:
  - `landing-page` — desktop marketing site
  - `landing-page-mobile` — mobile marketing site
  - **`catalog-page`** — post-login “All Products” **desktop** (Vite + React + Tailwind)
  - **`catalog-page-mobile`** — same catalog, **mobile-only** (375px-first, touch-friendly)

### 2.2 Relationship between the two catalog apps

- **Same product**: both implement the same flow (Navbar → PromoBanner → HeroSearch → CategoryStrip → ProductGrid → Pagination → MerchantInfo → Footer).
- **Same data**: `products.ts` and asset paths (`/images/...`) are aligned.
- **Same component names**: Navbar, Footer, CategoryCard, ProductCard, etc.
- **Same Tailwind palette**: colors and font families match.
- **Different implementations**: layout, breakpoint behavior, and some UI details differ (e.g. nav with SearchBar vs hamburger + drawer, 4-column vs 2-column grid, horizontal scroll categories on mobile).

So the merge is **one product implemented twice** → **one responsive implementation**.

---

## 3. Process phases (what was done)

### Phase 1: Initial analysis and scoping

**Request:** Understand the project and what merging the two folders would mean.

**Actions taken:**

1. Searched the codebase for `catalog-page` and `catalog-page-mobile` references.
2. Listed repo and both app directories to see structure.
3. Read README, BUILD_PLAN (catalog-page-mobile), and key files: App.tsx, CatalogPage.tsx, package.json, tailwind.config.js from both apps.
4. Compared Navbar, CategoryStrip, ProductGrid implementations to identify desktop vs mobile behavior.

**Output:** A written analysis covering:

- What the project is (Groupr, four apps, two catalog codebases).
- How the two catalog apps relate (same flow, same data, different layout/behavior).
- **Difference table**: Navbar (full nav + SearchBar vs hamburger + drawer), layout (max-width vs full width), CategoryStrip (flex vs scroll), ProductGrid (4 col vs 2 col), ProductCard (sizing, fillWidth), Tailwind theme (section, radii, typography), and mobile-only (MobileNavDrawer) vs desktop-only (SearchBar in nav).
- What “merge” implies at a high level: one new folder, unified responsive components, single Tailwind config, single assets/data, then retire the two existing folders.
- **Design decisions to align on**: new folder name, breakpoint strategy, component strategy (responsive-only vs variants), theme approach, docs, assets, package name.
- **Suggested order of work**: create folder → theme → data/assets → layout → sections → page → retire old folders + update README.

**Conclusion:** Merge = one responsive catalog app that replaces both; main work is Navbar (desktop vs mobile + drawer), CategoryStrip (flex vs scroll), ProductGrid/ProductCard (columns and sizing), and shared theme/assets.

---

### Phase 2: Detailed section and component mapping

**Request:** Go into more detail; map how each section and component functions on mobile vs desktop in a chart/table for review.

**Actions taken:**

1. Read every relevant component in both codebases:
   - **Layout:** Navbar, Footer, MobileNavDrawer (mobile only), SearchBar (desktop only).
   - **Sections:** PromoBanner, HeroSearch, CategoryStrip, CategoryCard, ProductGrid, ProductCard, Pagination, MerchantInfo.
   - **UI:** Logo, Button, Card, Input, NavLink.
2. Extracted for each: container classes, layout (row vs column), sizes, visibility, behavior, and any desktop-only or mobile-only logic.
3. Compared Tailwind configs (section spacing, radii, typography, maxWidth.mobile).
4. Noted asset differences (nav icons, chevrons, drawer assets).

**Output:** A single reference document:

- **`docs/CATALOG_DESKTOP_VS_MOBILE_MAP.md`**

  It contains:

  - **Page-level layout:** root/inner/main wrappers, max-width, padding, gaps (desktop vs mobile).
  - **Layout components:** Navbar (content, padding, logo, links, SearchBar, account/cart, language, hamburger/drawer), MobileNavDrawer (overlay, panel, content, close behavior, assets), Footer (structure, logo size, newsletter layout, credits row).
  - **Section components:** PromoBanner, HeroSearch, CategoryStrip, CategoryCard, ProductGrid, ProductCard, Pagination, MerchantInfo — each with a table of desktop vs mobile (layout, sizes, visibility, behavior).
  - **UI primitives:** Logo, Button, Card, Input, NavLink, SearchBar (where used).
  - **Tailwind theme:** token-by-token (section, borderRadius, fontSize, etc.).
  - **Assets:** which assets differ (navbar, pagination, category strip, drawer).
  - **Merge checklist:** one-line guidance per component for the merged app.

**Conclusion:** The map is the single source of truth for “what desktop does vs what mobile does” so implementation can be accurate and consistent.

---

### Phase 3: Process documentation (this document)

**Request:** Document the entire process thus far.

**Actions taken:**

- Gathered the goal, context, phases, deliverables, and open decisions.
- Wrote this process document and pointed it at the existing map and related repo docs.

**Output:** **`docs/CATALOG_MERGE_PROCESS.md`** (this file).

---

## 4. Deliverables produced

| Deliverable | Location | Purpose |
|------------|----------|---------|
| **Merged catalog app** | `catalog/` | Single responsive app (Vite + React + Tailwind). Run: `cd catalog && npm run dev`; open the URL Vite prints. |
| **Desktop vs mobile map** | `docs/CATALOG_DESKTOP_VS_MOBILE_MAP.md` | Reference for every section/component’s desktop vs mobile behavior; used during merge implementation. |
| **Process + implementation doc** | `docs/CATALOG_MERGE_PROCESS.md` | Goal, context, phases, decisions, **§8 Implementation** (how it was built, run instructions, white-screen fix). |
| **Catalog README** | `catalog/README.md` | Run commands, “if you see a white screen”, layout summary, links to docs. |

**Existing repo docs** (for context only; not created in this process):

- `catalog-page-mobile/BUILD_PLAN.md` — how the mobile app was originally built from catalog-page.
- `catalog-page-mobile/docs/LANDING_MOBILE_COMPARISON_AND_REVISIONS.md` — alignment with landing-page-mobile (Footer, Navbar, etc.).
- `catalog-page-mobile/docs/ASSET_AND_COMPONENT_MAP.md` — assets and component references for mobile.
- Root `README.md` — repo structure and run instructions.

---

## 5. Decisions and open questions

### 5.1 Decided / implied

- **Merge = one responsive app** (no separate desktop and mobile builds).
- **Single codebase:** one `src/`, one Tailwind config, one `public/images`, one `data/products.ts`.
- **Component approach:** Prefer **responsive single components** (Tailwind breakpoints + conditional rendering where needed) over separate desktop/mobile components.
- **MobileNavDrawer:** Keep as a distinct component; render only below the chosen “mobile” breakpoint.
- **SearchBar:** Present only in desktop Navbar; mobile uses HeroSearch and drawer search.
- **Detailed behavior** is specified in `CATALOG_DESKTOP_VS_MOBILE_MAP.md`.

### 5.2 Still to decide (before or during implementation)

1. **New folder name** — e.g. `catalog/`, `catalog-app/`, `post-login-catalog/`.
2. **Breakpoint** — e.g. `md` (768px) or `lg` (1024px) for “mobile” vs “desktop” layout and when to show drawer vs full nav.
3. **Tailwind theme** — single theme with responsive tokens vs one base theme and responsive utilities only.
4. **Copyright year** — desktop uses © 2026, mobile © 2025; pick one for the merged app.
5. **Docs** — whether to move/merge content from `catalog-page-mobile/docs/` into the new app or into `docs/` at repo root.

---

## 6. Recommended next steps

1. **Lock decisions** in §5.2 (folder name, breakpoint, theme approach, copyright, docs).
2. **Create the new folder** and project setup (Vite, React, TypeScript, Tailwind, PostCSS).
3. **Define the unified Tailwind theme** (colors, fonts, radii, spacing; responsive if desired).
4. **Copy data and assets** once (`products.ts`, `public/images`) and remove duplicates.
5. **Implement layout** (Navbar with desktop/mobile branches + MobileNavDrawer, Footer) using the map.
6. **Implement sections** (PromoBanner, HeroSearch, CategoryStrip, CategoryCard, ProductGrid, ProductCard, Pagination, MerchantInfo) as single responsive components per map.
7. **Compose CatalogPage** with responsive layout and padding.
8. **Test** at desktop and mobile widths.
9. **Retire** `catalog-page/` and `catalog-page-mobile/` (delete or archive) and **update** root README and any links to the catalog apps.

---

## 7. How to use this documentation

- **Implementing the merge:** Use **`docs/CATALOG_DESKTOP_VS_MOBILE_MAP.md`** as the spec for each component and section; follow the “Merge checklist” at the end of that file.
- **Onboarding / handoff:** Use **`docs/CATALOG_MERGE_PROCESS.md`** (this file) for goal, context, what was done, what’s decided, and what’s next.
- **Alignment with landing mobile:** See `catalog-page-mobile/docs/LANDING_MOBILE_COMPARISON_AND_REVISIONS.md` if the merged catalog should stay aligned with landing-page-mobile patterns (Footer, Navbar, etc.).

---

## 8. Implementation (how it was built)

This section documents how the merged app was implemented and how to run it.

### 8.1 Decisions made

- **Folder name:** `catalog/`
- **Breakpoint:** `md` (768px). Below = mobile layout; above = desktop layout.
- **Tailwind:** Single theme; responsive utilities (`md:`, etc.) in components. `borderRadius.input` = 4px (mobile); desktop uses `md:rounded-lg` (8px) where needed.
- **Copyright:** © 2026 (unified).
- **Package name:** `catalog` in `package.json`.

### 8.2 What was created

**New app root: `catalog/`**

- **Config:** `package.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `.gitignore`.
- **Assets:** `public/images/` copied from `catalog-page`, then mobile-only icons added from `catalog-page-mobile` (`nav-close.svg`, `nav-icon-0.svg` … `nav-icon-6.svg`).
- **Entry:** `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`. **ErrorBoundary** in `src/ErrorBoundary.tsx` wraps the app to surface React render errors (avoids blank white screen when something throws).
- **Data:** `src/data/products.ts` (same as catalog-page).
- **Hook:** `src/hooks/useMediaQuery.ts` — returns `true`/`false` for a media query; used in ProductGrid to pass `fillWidth` only on mobile (so desktop keeps fixed 300px cards).
- **Page:** `src/pages/CatalogPage.tsx` — composes layout and sections with responsive wrapper (max-width and padding via `md:`).
- **Layout components:**
  - **Navbar:** Desktop (`md:`): Logo, nav links, SearchBar, account, cart, language dropdown. Mobile: Logo, account, cart, hamburger. `MobileNavDrawer` rendered by Navbar; opens on hamburger click.
  - **MobileNavDrawer:** Same as catalog-page-mobile (overlay, slide-in panel, search, nav links, login/signup). Only opened from mobile Navbar.
  - **Footer:** Responsive flex: stacked / two-column on small, single row on desktop; newsletter inline on desktop, stacked on mobile.
- **Section components:** Each is a single component with responsive classes (and one hook where needed):
  - **PromoBanner:** Row on desktop, stacked on mobile; dismiss button position adjusted.
  - **HeroSearch:** Desktop = input + “Shop now” button; mobile = full-width input only.
  - **CategoryStrip:** Desktop = flex row, all categories visible. Mobile = horizontal scroll + left/right chevrons (ref + scrollBy), same data.
  - **CategoryCard:** Responsive width and icon/label size (`w-24` / `md:w-[144px]`, etc.).
  - **ProductGrid:** `useMediaQuery('(max-width: 767px)')` → `fillWidth={isMobile}`; desktop grid `repeat(4, 300px)`, mobile `grid-cols-2`.
  - **ProductCard:** `fillWidth` prop → compact layout (smaller image, rounded-full add-to-cart) vs desktop (large image, rounded-[40px] button).
  - **Pagination:** Full controls (First, Back, 1, 2, …, Last) on desktop; compact (Prev, 1, 2, …, Next) on mobile.
  - **MerchantInfo:** Responsive text and logo sizes.
- **UI components:** Logo (responsive default size), Button (responsive `sm` padding), Card (product variant: 20px radius on small, `rounded-card` on `md`), Input (`rounded-input` / `md:rounded-lg`), NavLink (underline bar on desktop only), SearchBar (used only in desktop Navbar via `hidden md:flex`).

### 8.3 Build and run

```bash
cd catalog
npm install
npm run dev     # Vite prints URL, e.g. http://localhost:5173
npm run build   # tsc -b && vite build
npm run preview # serve dist/
```

**Important:** Always run the dev server **from inside the `catalog` folder** and open **the URL that Vite prints** in the terminal. If you see a white screen, it is usually because:

1. A different app (or an old instance) is running on the port you opened — stop other dev servers and start only `catalog` with `cd catalog && npm run dev`, then use the printed URL.
2. A React error occurred — the app is wrapped in an **ErrorBoundary**; refresh and check the page and the browser console for the error message.

### 8.4 Repo updates

- **Root `README.md`:** Added `catalog/` as the unified catalog; marked `catalog-page` and `catalog-page-mobile` as legacy/superseded.
- **`catalog/README.md`:** Short description, breakpoint, stack, run commands, and pointer to `docs/CATALOG_DESKTOP_VS_MOBILE_MAP.md`.

### 8.5 Reference

- **Desktop vs mobile behavior:** `docs/CATALOG_DESKTOP_VS_MOBILE_MAP.md`
- **Process and decisions:** this document (`docs/CATALOG_MERGE_PROCESS.md`).

---

*Last updated: 2025-02-07. Process: initial analysis → detailed desktop/mobile mapping → process documentation → implementation → white-screen fix (ErrorBoundary + run-from-catalog, use printed URL).*
