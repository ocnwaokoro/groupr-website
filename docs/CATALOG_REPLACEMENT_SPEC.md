# Catalog Replacement Specification

**Goal:** Replace the current catalog page in `devenv-main/frontend` with the reference catalog from the `catalog/` folder **exactly** (same layout, sections, and visuals), while preserving **all existing functionality**: sign up, sign in, cart, add/remove/update quantity (plus/minus), checkout flow, API-driven products/categories, and routing.

**Scope:** This document is a detailed specification only. It does not implement code; it documents every file, data flow, and integration point required to perform the replacement.

---

## Table of contents

1. [Reference catalog (catalog/) – what you want](#1-reference-catalog-catalog--what-you-want)
2. [Current catalog (devenv-main/frontend) – what you have](#2-current-catalog-devenv-mainfrontend--what-you-have)
3. [Functionality that must be preserved](#3-functionality-that-must-be-preserved)
4. [Gap analysis: reference vs current](#4-gap-analysis-reference-vs-current)
5. [Data and API integration](#5-data-and-api-integration)
6. [Auth and navigation integration](#6-auth-and-navigation-integration)
7. [Cart and product actions integration](#7-cart-and-product-actions-integration)
8. [Asset and styling strategy](#8-asset-and-styling-strategy)
9. [File-by-file replacement and creation plan](#9-file-by-file-replacement-and-creation-plan)
10. [Step-by-step implementation checklist](#10-step-by-step-implementation-checklist)

---

## 1. Reference catalog (catalog/) – what you want

The reference app is a **standalone Vite + React + TypeScript + Tailwind** app. It has **no backend**, **no auth**, **no cart state**, and **no router**; it is a single full-page catalog UI.

### 1.1 Tech stack (reference)

| Item | Reference (catalog/) |
|------|----------------------|
| Framework | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 3 |
| Data | Static `src/data/products.ts` (array of 15 products) |
| Routing | None (single page) |
| State | Local only (search query, category selected, promo dismissed, pagination current page) |
| I18n | None |
| Auth | None (hash links `#account`, `#cart`, `#login`, `#sign-up`) |

### 1.2 Page structure (reference)

Single page component: **`CatalogPage.tsx`**. Top to bottom:

| Section | Component | Location | Behavior |
|---------|-----------|----------|----------|
| Header | `Navbar` | `components/layout/Navbar.tsx` | Logo, desktop nav links (Shop, Pickup Locations, About, Contact), desktop SearchBar, Account link (#account), Cart link (#cart), mobile hamburger → MobileNavDrawer |
| Promo | `PromoBanner` | `components/sections/PromoBanner.tsx` | “Give $5, get $5” + “Share Groupr” button; dismissible (local state); close button |
| Hero search | `HeroSearch` | `components/sections/HeroSearch.tsx` | “What are you looking for today?” + search input + “Shop now” button; onSubmit logs to console only |
| Main | — | — | Wrapper with max-width 1312px, centered |
| Categories | `CategoryStrip` | `components/sections/CategoryStrip.tsx` | Horizontal strip of CategoryCards; local list of 8 categories (All, Produce, Meat & Seafood, …); selected state; mobile: scroll + chevrons; desktop: flex row |
| Products | `ProductGrid` | `components/sections/ProductGrid.tsx` | “All Products” heading + 2-col (mobile) / 4×300px (desktop) grid of ProductCards; data from `PRODUCTS` |
| Product card | `ProductCard` | `components/sections/ProductCard.tsx` | Image, name, price, description; **one “Add to cart” button** (no handler; no quantity) |
| Pagination | `Pagination` | `components/sections/Pagination.tsx` | First / Back / 1 / 2 / … / Last; props `currentPage`, `totalPages` (default 1, 8); **buttons have no onClick** (static UI) |
| Merchant | `MerchantInfo` | `components/sections/MerchantInfo.tsx` | “Items Fulfilled by:” + Foodtown logo + address text |
| Footer | `Footer` | `components/layout/Footer.tsx` | Logo, Quick Links, Stay Connected, newsletter form (local state, submit clears email); copyright; social icons; all links are hash (#) |

### 1.3 Reference file inventory

| File | Purpose |
|------|---------|
| **Pages** | |
| `src/pages/CatalogPage.tsx` | Composes Navbar, PromoBanner, HeroSearch, CategoryStrip, ProductGrid, Pagination, MerchantInfo, Footer |
| **Layout** | |
| `src/components/layout/Navbar.tsx` | Logo, nav links, SearchBar (desktop), Account/Cart (hash), hamburger → MobileNavDrawer |
| `src/components/layout/MobileNavDrawer.tsx` | Slide-out drawer: search input, nav links (Pickup, Cart, Shop, How it works, Learn more, Support, Contact), “Log in”, “Sign up” (hash links) |
| `src/components/layout/Footer.tsx` | Logo, links, newsletter form |
| **Sections** | |
| `src/components/sections/PromoBanner.tsx` | Dismissible promo strip |
| `src/components/sections/HeroSearch.tsx` | Search section (no API) |
| `src/components/sections/CategoryStrip.tsx` | Horizontal category cards; local CATEGORIES array |
| `src/components/sections/CategoryCard.tsx` | Single category (icon, label, selected state) |
| `src/components/sections/ProductGrid.tsx` | Grid of ProductCards; uses PRODUCTS |
| `src/components/sections/ProductCard.tsx` | Card with image, name, price, description, add-to-cart button (no logic) |
| `src/components/sections/Pagination.tsx` | Pagination controls (no callbacks) |
| `src/components/sections/MerchantInfo.tsx` | Merchant text + logo |
| **UI** | |
| `src/components/ui/Button.tsx` | primary / outline / light / dark, sm / lg |
| `src/components/ui/Card.tsx` | default / how-it-works / category / product variants |
| `src/components/ui/Input.tsx` | Text/email input, optional label/error |
| `src/components/ui/Logo.tsx` | Groupr logo img |
| `src/components/ui/NavLink.tsx` | Styled anchor (href) |
| `src/components/ui/SearchBar.tsx` | Search form (optional onSearch callback) |
| **Data** | |
| `src/data/products.ts` | `Product` type (id, name, price, description, image) + `PRODUCTS` array (15 items) |
| **Hooks** | |
| `src/hooks/useMediaQuery.ts` | `useMediaQuery('(max-width: 767px)')` for mobile detection |
| **Config / global** | |
| `tailwind.config.js` | Colors (bg-*, text-*, accent-*), fonts (Inter, DM Sans, Lexend), radii, spacing (section: 64px), screens |
| `src/index.css` | Tailwind + Google Fonts (Inter, Lexend, DM Sans) |
| `public/images/` | Categories, icons, logo, merchant, products, social (all referenced by path) |

### 1.4 Reference data shapes

**Product (reference):**
```ts
interface Product {
  id: string
  name: string
  price: string      // e.g. "$50.00"
  description: string
  image: string      // path e.g. "/images/products/featured/..."
}
```

**Categories (reference):** Hard-coded in CategoryStrip:
```ts
{ id: string, label: string, icon: string }[]  // 8 items
```

---

## 2. Current catalog (devenv-main/frontend) – what you have

### 2.1 Tech stack (current)

| Item | Current (devenv-main/frontend) |
|------|-------------------------------|
| Framework | React 19 |
| Build | Vite 6 |
| Styling | Chakra UI 2 + SASS (Catalog.scss) |
| Data | React Query + Axios; GET /catalog/categories, GET /catalog/products or /catalog/provider/:id |
| Routing | React Router 7; `/`, `/catalog`, `/catalog/:categoryId`, `/catalog/products/:productId`, `/cart`, `/checkout`, etc. |
| State | React Query cache, ShoppingCartContext, OrderContext, SearchContext, LanguageContext, localStorage (user, authToken, language, checkout state) |
| Auth | SignInModal, SignUpModal, useAuthentication, useRegistration, useLogout, useSessionEnder; JWT in localStorage; Protected routes (Profile, Private) |
| Cart | ShoppingCartContext, useCart, useAddCartItem, useUpdateCartItemQuantity, useRemoveCartItem, useEmptyCart, useCartMerge; API: GET/POST/PATCH/DELETE /shopping_cart* |

### 2.2 Current catalog page structure

**Route:** `/` and `/catalog` render `Catalog` (`src/pages/Catalog/index.tsx`).

| Section | Source | Data / behavior |
|---------|--------|------------------|
| Layout | Public layout | NavBar + main + Footer (Chakra) |
| NavBar | `common/NavBar/index.tsx` | LeftSideNav (logo → /catalog), RightSideNav (Sign in, Sign up, Cart), MobileDrawer; SignInModal, SignUpModal |
| Carousel | `Catalog/Components/Carousel` | 3 slides (Slide1–3), local state, no API |
| Categories | `CategoryListContainer` (common/CategoryList) | `useCategories()` → GET /catalog/categories; click → navigate `/catalog/:categoryId` |
| Provider filter | `ProviderList` (Catalog) | Derived from products; navigate `/catalog` or `/catalog/provider/:id` |
| Products | `ProductGrid` (common/products) | Receives `groupedProducts.results` (ProductsByCategory[]); renders CategorySection per category |
| Product card | `ProductCard` (common/products) | Uses **ShoppingCartContext**: addItem, updateQuantity, removeItem; **QuantityClickerButton** (plus/minus); EBT badges; getProductImage; toast on add |
| Pagination | `PaginationLinks` (common) | currentPage, totalPages from useProducts; handlePageChange → setCatalogState |
| Footer | `common/Footer.tsx` | Chakra; Shop Now, How It Works, FAQs, Sign up, etc.; some navigate(), some scroll; SignUpModal |

Additional catalog-related routes:

- `/catalog/:categoryId` → CategorizedProducts (useProductsOfCategory infinite, CategorySection)
- `/catalog/products/:productId` → ProductDisplay (useProduct, ProductDetails)
- Modal “View all” for a category → CategoryProductsModal (useProductsOfCategory)

### 2.3 Current data shapes (API)

**Product (current API):**
- id: number, name, description, price_cents, stock, image_url, featured, discount_price, on_sale, weight, weight_unit, ebt_snap_eligible, ebt_cash_eligible, category: { id, name }, provider: { id, name, address, logo_url }, etc.

**Category (current API):** id, name, image_url, created_at, updated_at.

**Cart:** ShoppingCartItem (id, product, quantity, unit_price_in_cents, save_for_later), ShoppingCartResponse (shopping_cart_items, saved_for_later_items, total, tax_amount, total_with_tax, offline_payment_deposit).

---

## 3. Functionality that must be preserved

You asked for the **exact same** catalog UI as reference **plus** existing behavior. Below is a concise list of what must still work after replacement.

### 3.1 Authentication

| Feature | Current implementation | Must remain |
|---------|------------------------|------------|
| Sign up | SignUpModal, useRegistration → POST /sign_up, store user + token in localStorage | Same API and storage; modal can be reused or replicated in new layout |
| Sign in | SignInModal, useAuthentication → POST /sign_in, store user + token | Same |
| Sign out | useLogout → DELETE /sign_out, clear user + token, redirect / | Same |
| Session end | useSessionEnder (clear user, redirect) | Same |
| Protected routes | Profile and Private layouts: getCurrentUser() → redirect / if null | Same |
| Auth in nav | RightSideNav: show Sign in / Sign up when guest; show Account / Orders / Sign out when logged in | Same behavior in new Navbar/drawer |

### 3.2 Cart

| Feature | Current implementation | Must remain |
|---------|------------------------|------------|
| Add to cart | ProductCard: addItem({ product_id, quantity: 1 }, product); toast | Same API (POST /shopping_cart/add) and context; toast optional but expected |
| Update quantity | QuantityClickerButton: updateQuantity(item.id, quantity) | Same API (PATCH /shopping_cart/:id/update_quantity) and context |
| Remove from cart | Quantity 0 → removeItem(item.id) | Same API (DELETE /shopping_cart/:id) |
| Cart badge | ShoppingCartButton: totalItems from shopping_cart_items | Same count in new header |
| Open cart | Desktop: drawer with Cart component; Mobile: navigate /cart | Same behavior |
| Cart merge on login | ShoppingCartContext: triggerCartMerge after login (POST /shopping_cart/bulk_add) | Same |
| Empty cart | useEmptyCart, clearCart | Same |

### 3.3 Catalog data and navigation

| Feature | Current implementation | Must remain |
|---------|------------------------|------------|
| Categories | useCategories() → GET /catalog/categories; click → /catalog/:categoryId | Same API and route |
| Products (main) | useProducts({ page, perPage, providerId, fnsReview }) → GET /catalog/products or /catalog/provider/:id | Same API; pagination and filters |
| Products by category | useProductsOfCategory (infinite) on /catalog/:categoryId and in CategoryProductsModal | Same |
| Single product | useProduct(productId) on /catalog/products/:productId | Same |
| Search | SearchContext + useCatalogSearch → GET /catalog/search; URL ?q= | Same API and URL sync |
| Provider filter | Optional; navigate /catalog/provider/:providerId | Can keep or drop depending on design |
| FNS review | URL ?fns_review=true | Can keep if still needed |

### 3.4 Checkout and orders

| Feature | Current implementation | Must remain |
|---------|------------------------|------------|
| Checkout | useCheckout: POST /orders, then POST /payments/checkout, redirect to URL | Same |
| Orders list | useOrders on /orders | Same |
| Order detail | useOrder on /orders/:orderId/details | Same |
| Order summary / refund | /orders/:orderId, /orders/:orderId/refund | Same |

### 3.5 Other

| Feature | Current implementation | Must remain |
|---------|------------------------|------------|
| i18n | i18next, LanguageContext, Accept-Language header | Same |
| Routing | React Router; Public layout (NavBar + Footer) for catalog, cart, checkout, etc. | Same route set; catalog route must still render the new catalog UI |

---

## 4. Gap analysis: reference vs current

| Aspect | Reference (catalog/) | Current (devenv-main/frontend) | Gap |
|--------|----------------------|---------------------------------|-----|
| **Styling** | Tailwind only | Chakra + SASS | Need Tailwind in main app and/or Chakra equivalents for reference design |
| **Nav** | Single Navbar + MobileNavDrawer; hash links | NavBar + MobileDrawer; React Router + modals | Replace links with Router + auth/cart logic |
| **Categories** | Static 8 categories; local selected state | API categories; click → route | Feed API categories into reference CategoryStrip; wire click → navigate |
| **Products** | Static PRODUCTS array | useProducts / useProductsOfCategory (API) | Feed API data into reference ProductGrid/ProductCard |
| **Product card** | Add button only, no quantity | Add + QuantityClickerButton (plus/minus), cart context | Add cart hooks and quantity UI to reference-style card |
| **Search** | HeroSearch: local state, console.log | SearchContext + useCatalogSearch, URL ?q= | Wire HeroSearch (and Navbar SearchBar) to setSearchTerm + navigate /catalog?q= |
| **Pagination** | Static buttons, no callbacks | useProducts page, setCatalogState | Wire Pagination to real page state and API |
| **Promo** | Dismissible; “Share Groupr” | Not in current catalog | Add as-is (or Chakra clone) |
| **MerchantInfo** | Static Foodtown text | Not in current catalog | Add as-is (or make configurable) |
| **Footer** | Newsletter, hash links | Chakra Footer, Router + modals | Use reference layout; replace links with Router + SignUpModal where needed |
| **Auth** | None | Modals + hooks | Keep modals and hooks; trigger from new Navbar/drawer |
| **Cart** | Icon only | Full cart context + drawer/page | Keep context; new Navbar must show badge and open cart same way |
| **Assets** | /images/ in public | Some in src/assets, getProductImage for API images | Copy or align reference assets; keep getProductImage for API image_url |
| **Logo/home** | href="/" | navigate('/catalog') or '/' | Align: current app home is catalog; logo → / or /catalog |

---

## 5. Data and API integration

### 5.1 Categories

- **Reference:** Hard-coded array in CategoryStrip.
- **Target:** Use `useCategories()` (GET /catalog/categories). Map API categories to the shape expected by reference CategoryStrip/CategoryCard (id, label, icon). Current API has `image_url`; reference uses `/images/categories/...` paths — either map API image_url to icon or keep a small map from category id/name to reference icon path. “All” category (id -1) is added in current useCategories; keep that for “All” in the strip.
- **Click:** Category click in CategoryStrip must call `navigate(\`/catalog/${category.id}\`)` (and “All” → `/catalog`), not set local state only.

### 5.2 Products (main catalog view)

- **Reference:** PRODUCTS array in ProductGrid.
- **Target:** Use `useProducts({ page, perPage, providerId, fnsReview })` (and optionally category_id if you keep a “filter by category” on main page). Map API response to a flat or grouped list that the new ProductGrid can render. Current API returns `ProductsByCategory[]` (grouped); reference is a single grid “All Products”. Options: (a) flatten and show one grid, or (b) keep grouped and render one ProductGrid section per category (like current). For “exact same” reference layout, (a) is closer.
- **Product card props:** Map API Product to reference-like props: name, price (format price_cents to string e.g. `$X.XX`), description (e.g. weight or product description), image (use getProductImage or image_url). Add cart props (see below).

### 5.3 Products by category (sub-route)

- **Reference:** No sub-route; single page.
- **Target:** Keep route `/catalog/:categoryId`. When user clicks a category, navigate there. Page can use same reference layout (PromoBanner, HeroSearch, CategoryStrip, then ProductGrid) but ProductGrid for that page uses `useProductsOfCategory({ category_id })` (infinite scroll or pagination). CategoryStrip on that page should show current category as selected (from route param).

### 5.4 Single product

- Keep `/catalog/products/:productId` and current ProductDisplay/ProductDetails; no change required for “catalog page” replacement unless you want product detail to match a reference design too.

### 5.5 Search

- **Reference:** HeroSearch and SearchBar: local state only.
- **Target:** On submit (and optionally on change): call SearchContext’s setSearchTerm and navigate to `/catalog?q=...`. SearchContext already runs useCatalogSearch; results can be shown in a dedicated search results block or by filtering the main grid (current app has SearchResults component but it’s not used on main Catalog). Define where search results appear in the new layout and wire the same API.

### 5.6 Pagination

- **Reference:** Static First/Back/1/2/…/Last with no handlers.
- **Target:** Pass `currentPage` and `totalPages` from useProducts (or useProductsOfCategory). Add onClick handlers that call setCatalogState (or equivalent) to change page and let the query refetch.

### 5.7 Merchant / promo

- **Reference:** Static MerchantInfo and PromoBanner.
- **Target:** Can stay static or be driven by config/API later. No API required for first version.

---

## 6. Auth and navigation integration

### 6.1 Navbar (reference → integrated)

- **Logo:** Render with React Router: `<Link to="/">` or `<Link to="/catalog">` (match current app: home is catalog).
- **Desktop links:** Replace href="#shop" etc. with `<Link to="/catalog">`, `<Link to="/learn-more">`, `<Link to="/contact-us">`, etc. “Pickup Locations” can link to a future route or stay hash for now.
- **SearchBar:** Wire to SearchContext: on submit set search term and navigate to `/catalog?q=...`.
- **Account:** If guest → open SignInModal or navigate to a login route; if logged in → `<Link to="/account">` and show “Sign out” that calls useLogout/endSession.
- **Cart:** Same as current: show cart icon + badge (totalItems from useShoppingCart); click opens cart drawer (desktop) or navigate to /cart (mobile). Reuse ShoppingCartButton logic inside the new Navbar.
- **Mobile hamburger:** Open MobileNavDrawer. Drawer content must use Router and auth (see below).

### 6.2 MobileNavDrawer (reference → integrated)

- **Links:** Replace every href="#..." with React Router Links or onClick that navigate and close: Shop → /catalog, Your cart → /cart, Learn more → /learn-more, Contact us → /contact-us, Customer Support → /customer-service, Pickup locations → future route or hash.
- **Search:** Wire input to SearchContext and on submit (or enter) navigate to /catalog?q=... and close drawer.
- **Log in:** Open SignInModal (same as current MobileDrawer); close drawer when opening.
- **Sign up:** Open SignUpModal; close drawer.
- **When logged in:** Show “Account”, “Orders”, “Sign out” instead of “Log in” / “Sign up”; reuse current RightSideNav / MobileDrawer logic.

### 6.3 Footer (reference → integrated)

- **Quick Links / Stay Connected:** Replace hash links with `<Link to="...">` (e.g. Shop Now → /catalog, Sign Up → open SignUpModal, Contact Us → /contact-us).
- **Newsletter:** Keep local state submit; optionally later hook to API.
- **Privacy / Terms:** Link to /privacy-policy, /terms-of-service if they exist.

### 6.4 Modals

- Keep existing SignInModal, SignUpModal (Chakra) and their hooks (useAuthentication, useRegistration). The new catalog page and nav just need to open/close them the same way (e.g. from Navbar and MobileNavDrawer). No need to rebuild modals in Tailwind unless you want visual parity with reference.

---

## 7. Cart and product actions integration

### 7.1 ProductCard (reference look + current behavior)

Reference ProductCard has: image, name, price, description, one “Add to cart” button. To preserve functionality:

1. **Data source:** Receive a product from API (current `Product` type); map to display props (name, price string, description, image via getProductImage).
2. **Add to cart:** On “Add to cart” click: call `addItem({ item: { product_id: product.id, quantity: 1 } }, product)` from useShoppingCart; show toast (current behavior).
3. **Quantity (plus/minus):** When the product is already in cart (`shopping_cart_items`), show the same QuantityClickerButton (or a Tailwind-styled equivalent): minus/plus that call `updateQuantity(item.id, quantity)` and `removeItem(item.id)` when quantity goes to 0. So the reference “single add button” becomes: if not in cart → show Add button; if in cart → show quantity controls (and optionally keep a small “+” to add more). Exact UX can match current: replace the single add button with either Add or the quantity strip.
4. **EBT badges:** Current ProductCard shows EbtEligibilityBadge; add the same to the new card if you keep that requirement.

### 7.2 Cart icon and drawer

- Reuse useShoppingCart() in the new Navbar: totalItems, and open cart drawer (desktop) or navigate to /cart (mobile). Reuse or reimplement ShoppingCartButton behavior (including the Cart component in a Chakra drawer/modal on desktop).

### 7.3 Cart page and checkout

- No change: keep /cart and /checkout routes and current components (Cart page, Checkout with OrderContext, useCheckout). Only the catalog page and nav are being replaced.

---

## 8. Asset and styling strategy

### 8.1 Two implementation paths

**Option A – Add Tailwind to devenv-main/frontend and reuse reference components**

- Add Tailwind (and PostCSS) to the existing app; copy reference Tailwind config (theme extend) and index.css (fonts, Tailwind layers).
- Copy `catalog/src/components/**` and `catalog/src/hooks/useMediaQuery.ts` into the app (e.g. under `src/catalog-ref/` or directly under `src/components`), and adjust imports.
- Copy `catalog/public/images/*` into `devenv-main/frontend/public/images/` (or keep paths and ensure public folder has the same structure).
- Replace Catalog page with a new page that composes these components and feeds API data + auth + cart as above. Navbar/Footer from reference become the catalog-specific shell, or you replace the global NavBar/Footer with reference-style ones (then Chakra is only used for modals, Cart drawer, and non-catalog pages).

**Option B – Recreate reference design in Chakra**

- Keep no Tailwind; rebuild reference layout and sections in Chakra (Box, Flex, Grid, Image, Button, etc.) to match reference layout and Tailwind design tokens (colors, spacing, radii) in Chakra theme.
- Reuse current ProductCard logic (cart, quantity) and only change layout/styling to match reference (PromoBanner, HeroSearch, CategoryStrip, ProductGrid, Pagination, MerchantInfo).
- Assets: still copy reference public images if you want the same icons and placeholders; product images still from API via getProductImage.

Recommendation: Option A gives “exact same” look with less redesign work; Option B avoids adding Tailwind and keeps one UI library. Document which option you choose before coding.

### 8.2 Assets to copy (if using reference UI)

- `catalog/public/images/` → `devenv-main/frontend/public/images/` (categories, icons, logo, merchant, products, social). Merge with existing public assets and fix paths if needed.
- Current app uses `getProductImage(product, ...)` for API products; keep that for product images. Use reference icons and category images for nav and category strip.

### 8.3 Theming

- Reference: `tailwind.config.js` (colors, fonts, section spacing, borderRadius). Either port these into Tailwind in the app (Option A) or into Chakra theme (Option B) so the new catalog matches the reference visually.

---

## 9. File-by-file replacement and creation plan

### 9.1 Files to add or copy (from reference)

| File (reference) | Action in devenv-main/frontend |
|------------------|--------------------------------|
| `pages/CatalogPage.tsx` | New catalog page component (or rename to Catalog and replace current `pages/Catalog/index.tsx` content). |
| `components/layout/Navbar.tsx` | New Navbar that uses Router + auth + cart (or integrate into existing NavBar). |
| `components/layout/MobileNavDrawer.tsx` | New drawer; wire links and auth (or merge into existing MobileDrawer). |
| `components/layout/Footer.tsx` | New Footer for catalog layout (or replace common/Footer when on catalog). |
| `components/sections/PromoBanner.tsx` | Add to catalog page. |
| `components/sections/HeroSearch.tsx` | Add; wire to SearchContext + navigate. |
| `components/sections/CategoryStrip.tsx` | Add; feed from useCategories(); wire click → navigate. |
| `components/sections/CategoryCard.tsx` | Add (no change). |
| `components/sections/ProductGrid.tsx` | Add; feed from useProducts() or useProductsOfCategory(); pass product + cart callbacks to card. |
| `components/sections/ProductCard.tsx` | Add; extend with useShoppingCart, addItem, updateQuantity, removeItem, QuantityClickerButton (or Tailwind clone). |
| `components/sections/Pagination.tsx` | Add; wire currentPage, totalPages, onPageChange from catalog state + API. |
| `components/sections/MerchantInfo.tsx` | Add. |
| `components/ui/Button.tsx`, `Card.tsx`, `Input.tsx`, `Logo.tsx`, `NavLink.tsx`, `SearchBar.tsx` | Add if using Option A; or replace with Chakra in Option B. |
| `hooks/useMediaQuery.ts` | Add (or use Chakra useMediaQuery where applicable). |
| `data/products.ts` | Do **not** use as data source; keep only as type reference. Data comes from API. |

### 9.2 Files to modify (current app)

| File | Change |
|------|--------|
| `routing/AppRouter.tsx` | No route change; `/` and `/catalog` keep rendering the new Catalog (same route, new content). |
| `pages/Catalog/index.tsx` | Replace body with reference-based layout (CatalogPage structure) and data hooks (useCategories, useProducts, SearchContext). |
| `common/NavBar/index.tsx` | Either (a) replace with reference Navbar + auth/cart wiring, or (b) keep and only ensure catalog page uses reference layout below NavBar (no duplicate nav). |
| `common/Footer.tsx` | Either replace with reference Footer + Router/modals, or use reference Footer only inside catalog layout. |
| `contexts/SearchContext.tsx` | No change; catalog page and HeroSearch/SearchBar will call setSearchTerm and navigate. |
| `main.tsx` | If adding Tailwind: add Tailwind directives and ensure Tailwind config is used. |
| (New) Tailwind config | Add `tailwind.config.js` and PostCSS if Option A. |
| (New) index.css or global styles | Import Tailwind and reference fonts if Option A. |

### 9.3 Files to keep unchanged (for functionality)

- All auth: SignInModal, SignUpModal, useAuthentication, useRegistration, useLogout, useSessionEnder, useCurrentUser.
- All cart: ShoppingCartContext, useCart, useAddCartItem, useUpdateCartItemQuantity, useRemoveCartItem, useEmptyCart, useCartMerge, useShoppingCart.
- All catalog API hooks: useCategories, useProducts, useProduct, useProductsOfCategory, useCatalogSearch.
- All routing: AppRouter, Public layout, Profile/Private layouts.
- Cart page, Checkout, OrderSummary, RefundSummary, OrderDetails, Account, Orders.
- getProductImage, common/types/api (Product, Category, etc.).
- QuantityClickerButton (or reimplement with same API for the new ProductCard).
- EbtEligibilityBadge if you keep EBT on cards.

### 9.4 Optional / follow-up

- **Category sub-route:** New or updated `CategorizedProducts` page that uses same reference layout but ProductGrid from useProductsOfCategory; CategoryStrip selected from route param.
- **Search results:** Decide where useCatalogSearch results show (e.g. below HeroSearch or replacing ProductGrid when q is set) and implement.
- **Provider filter:** If reference has no provider filter, you can drop it from the main catalog or add a small filter UI and keep useProducts(providerId).
- **FNS review:** Keep URL param and pass to useProducts if still required.

---

## 10. Step-by-step implementation checklist

Use this as a linear checklist; adjust if you do Option B (Chakra-only).

### Phase 1: Setup (if Option A)

- [ ] Add Tailwind CSS and PostCSS to `devenv-main/frontend`.
- [ ] Copy or merge `catalog/tailwind.config.js` theme (colors, fonts, spacing) into the app’s Tailwind config.
- [ ] Copy `catalog/src/index.css` Tailwind and font imports into app’s global CSS.
- [ ] Copy `catalog/public/images/*` into `devenv-main/frontend/public/images/` (merge with existing).

### Phase 2: Copy reference UI components

- [ ] Copy reference UI primitives: Button, Card, Input, Logo, NavLink, SearchBar.
- [ ] Copy useMediaQuery hook.
- [ ] Copy CategoryCard, CategoryStrip (will wire to API and router next).
- [ ] Copy PromoBanner, HeroSearch, MerchantInfo, Pagination (will wire Pagination later).
- [ ] Copy ProductCard (will add cart and quantity next).
- [ ] Copy ProductGrid (will feed from API next).
- [ ] Copy Navbar and MobileNavDrawer (will wire auth and router next).
- [ ] Copy Footer (will wire links next).

### Phase 3: Data wiring

- [ ] Create or update Catalog page to use useCategories(); map categories to CategoryStrip (include “All”); on category click call navigate(\`/catalog/${id}\`) or navigate('/catalog') for All.
- [ ] Feed useProducts() (or flattened result) into ProductGrid; map API Product to props (name, price string, description, image via getProductImage).
- [ ] Wire Pagination: currentPage and totalPages from useProducts; onPageChange updates catalog state and refetch.
- [ ] Wire HeroSearch and SearchBar: on submit setSearchTerm(query) and navigate(\`/catalog?q=${query}\`).
- [ ] (Optional) Wire search results: when q is set, show useCatalogSearch results in the same page or a dedicated block.

### Phase 4: Cart and product actions

- [ ] In ProductCard, add useShoppingCart(); get item for current product; if item exists show QuantityClickerButton (or Tailwind equivalent) with updateQuantity/removeItem; else show Add button that calls addItem and toast.
- [ ] Ensure product id and full product object are passed to addItem (for merge and display).
- [ ] Add EbtEligibilityBadge to ProductCard if required.

### Phase 5: Auth and nav integration

- [ ] In Navbar: Logo → Link to / or /catalog; desktop links → Link to /catalog, /learn-more, /contact-us, etc.
- [ ] In Navbar: Account → if guest open SignInModal, if logged in Link to /account and show Sign out (endSession).
- [ ] In Navbar: Cart → useShoppingCart totalItems + open cart drawer (desktop) or navigate /cart (mobile); reuse or reimplement ShoppingCartButton logic.
- [ ] In MobileNavDrawer: all links → Link or onClick navigate + close; Log in → open SignInModal; Sign up → open SignUpModal; when logged in show Account, Orders, Sign out.
- [ ] In Footer: replace hash links with Link or navigate; Sign Up → open SignUpModal.

### Phase 6: Layout and route

- [ ] Replace content of `pages/Catalog/index.tsx` with reference layout (Navbar optional if global NavBar stays; PromoBanner, HeroSearch, CategoryStrip, ProductGrid, Pagination, MerchantInfo, Footer).
- [ ] If you use a catalog-specific layout (reference Navbar + Footer), wrap catalog route with it; else keep Public layout and only swap the main content.
- [ ] Ensure / and /catalog both render this new catalog page.
- [ ] Test: /catalog/:categoryId still works (either same new layout with useProductsOfCategory or existing CategorizedProducts).

### Phase 7: Polish and regression

- [ ] Remove or repurpose old Catalog-specific components (Carousel, ProviderList, old CategoryList if fully replaced).
- [ ] Language: ensure new Navbar/Footer/drawer use useTranslation and same keys where applicable.
- [ ] Test sign up, sign in, sign out, protected routes, cart add/update/remove, cart badge, cart drawer and /cart page, checkout from /cart.
- [ ] Test category navigation, pagination, search (URL and results).
- [ ] Test mobile: drawer, cart redirect, responsive grid and category strip.

---

## Summary

- **Reference catalog (`catalog/`):** Single-page Tailwind UI with static data; Navbar, PromoBanner, HeroSearch, CategoryStrip, ProductGrid (ProductCard with add button only), Pagination, MerchantInfo, Footer; no auth, no cart logic, no router.
- **Current catalog:** Chakra + API (categories, products, search) + cart (add/update/remove) + auth (modals) + routing.
- **Replacement:** Use the reference layout and visuals exactly, feed all data from existing APIs, and wire every interaction (categories → navigate, products → cart, search → SearchContext + URL, pagination → state + API, nav/footer → Router + auth + cart). Preserve sign up/in, cart (including plus/minus), checkout, and all existing routes and protected flows.
- **Two ways to implement:** (A) Add Tailwind and reuse reference components with data/auth/cart wiring, or (B) Recreate reference design in Chakra and keep one UI stack. Asset and theme alignment is required in both cases.

This spec is the single place to track every data interaction, file, and step needed to replace the current catalog with the reference catalog while keeping full functionality.
