# Catalog: Desktop vs Mobile — Section & Component Map

Detailed mapping of how each section and component behaves in **catalog-page** (desktop) vs **catalog-page-mobile** (mobile). Use this when merging into a single responsive app.

---

## 1. Page-level layout (CatalogPage.tsx)

| Aspect | Desktop (catalog-page) | Mobile (catalog-page-mobile) |
|--------|------------------------|------------------------------|
| **Root wrapper** | `min-h-screen bg-bg-primary flex flex-col` | `min-h-screen w-full bg-bg-primary flex flex-col text-text-primary font-sans` |
| **Inner wrapper** | None | `w-full min-w-0 flex flex-col items-stretch` (prevents horizontal scroll) |
| **Main container** | `w-full max-w-[1440px] mx-auto px-section py-5 pb-20`; inner `max-w-[1312px]` | `w-full flex flex-col items-center flex-1 px-0 py-5 pb-20` |
| **Main content area** | `gap-16`; CategoryStrip in centered `py-8` | `gap-8`; CategoryStrip `py-2`; ProductGrid area `px-5` |
| **Behavior** | Centered, fixed max-width, large horizontal padding | Full width, no max-width, tighter padding; content stretches with `px-5` on grid section only |

---

## 2. Layout components

### 2.1 Navbar

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Purpose** | Full nav: links + search + account + cart + language | Minimal: logo + account + cart + hamburger; nav in drawer |
| **Container** | `px-section py-1`; row `gap-4` | `px-5 py-3`; row `gap-2`; `max-w-full` |
| **Logo** | Default from Logo (catalog-page: `h-[52px] w-[60px]` when no className) | Logo with default `h-8 w-[37px]`; wrapper `flex-shrink-0` |
| **Nav links** | Visible: Shop, Pickup Locations, About Groupr, Contact us (`gap-16`, `w-[530px]`) | **Hidden** in nav bar; moved to **MobileNavDrawer** |
| **Search** | **SearchBar** in nav: `flex-1 min-w-[200px] max-w-[440px]` (rounded-full, inline) | **No SearchBar** in nav; search only in HeroSearch below and inside drawer |
| **Account** | Icon + "account" label (text-[10px]) | Icon only (no label); `aria-label="Account"` |
| **Cart** | Icon + "cart" label | Icon only; `aria-label="Cart"` |
| **Language** | Dropdown: "English" + chevron, absolute `left-8 top-[94px]`, small bordered box | **Not present** |
| **Mobile-only** | — | **Hamburger button** opens **MobileNavDrawer**; `drawerOpen` state; no bottom divider in current code |
| **Z-index** | `z-10` | `z-10` |

### 2.2 MobileNavDrawer (mobile only)

| Aspect | Behavior |
|--------|----------|
| **When shown** | Only on mobile; opened by hamburger in Navbar |
| **Overlay** | `fixed inset-0 bg-black/50 z-[100]`; click to close |
| **Drawer panel** | `fixed top-0 right-0 h-full w-[311px] max-w-[85vw]`; bg `bg-bg-category`; slides from right; `z-[101]` |
| **Content** | Search input (rounded-full) → nav links (with icons) → divider → Log in → Sign up button |
| **Nav links** | Pickup locations, Your cart, Shop now, How it works, Learn more, Customer Support, Contact us (icons from `/images/icons/nav-icon-*.svg`) |
| **Close** | Overlay click or close button (nav-close.svg); 300ms transition; on link click, closes then applies hash |
| **Assets** | `nav-close.svg`, `nav-icon-0.svg` … `nav-icon-6.svg` |

### 2.3 Footer

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Outer** | `max-w-[1440px] mx-auto`; `px-section py-20` | `max-w-full mx-auto`; `px-5 py-16` |
| **Top block** | Single row: Logo + Quick Links + Stay Connected + Join (newsletter) | **Stacked**: Logo first; then **two columns** (Quick Links, Stay Connected) in one row `flex-wrap gap-10 min-w-[120px]` |
| **Logo** | `h-[104px] w-[120px]` in a flex wrapper | `h-[78px] w-[90px]`; no extra wrapper |
| **Link columns** | Two columns, same links; `gap-32` between logo+links and newsletter | Same link groups; `NavLink` with `py-2`; no `pl-0 pr-4` |
| **Newsletter** | Right column `w-[400px]`; Input + Button **inline** (`gap-4`); disclaimer below | **Full width**; Input then Button **stacked** (`w-full`); disclaimer below |
| **Divider** | `h-px` + border; then credits row | Same |
| **Credits row** | Single row: copyright + Privacy/Terms/Cookie links `gap-6` + social icons `gap-3` | **Responsive**: `flex-col items-center gap-4 sm:flex-row sm:justify-between sm:flex-wrap`; links `gap-3`; centered on small |
| **Copyright** | © 2026 Groupr | © 2025 Groupr |
| **Social** | Same 5 icons `h-6 w-6` | Same; `justify-center` on small |

---

## 3. Section components

### 3.1 PromoBanner

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Container** | `py-3 px-section`; inner `max-w-[1312px] w-full` | `py-4 px-5`; `max-w-full`; `pr-8` for close button space |
| **Layout** | **Single row**: "Give $5, get $5" + description + "Share Groupr" button + close (absolute right) | **Stacked**: heading + description (text-sm, text-center) + button; close `absolute right-2 top-2` |
| **Copy** | Same | Same; description `text-sm` |
| **Dismiss** | `absolute right-0 top-1/2 -translate-y-1/2` | `absolute right-2 top-2` |
| **Behavior** | Same (dismiss hides banner) | Same |

### 3.2 HeroSearch

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Section** | `px-section py-10 bg-bg-light-green` | `px-5 py-5`; `max-w-full overflow-hidden` |
| **Inner** | `max-w-[1312px] mx-auto`; `gap-5` | No max-width; `gap-5` |
| **Heading** | `text-heading-sm` (24px) | `text-lg leading-[140%] text-center` |
| **Form** | **Horizontal**: search input `h-10 w-[320px] rounded-sm` + "Shop now" Button (dark, sm) | **Vertical**: `w-full flex-col gap-2`; input `w-full`; **no "Shop now" button** |
| **Input** | Inline with button | Full width only |

### 3.3 CategoryStrip

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Layout** | **Flex row, no scroll**: all categories in one row `justify-between gap-5` | **Horizontal scroll**: scroll container + left/right chevron buttons |
| **Wrapper** | `w-full flex items-center justify-between` | `w-full max-w-full mx-auto flex items-center gap-2 min-h-[130px]` |
| **Scroll** | None | `overflow-x-auto`; `scrollSnapType: 'x mandatory'`; `scrollbar-hide touch-pan-x`; ref for programmatic scroll |
| **Chevrons** | — | Left/right buttons; dropdown-icon.svg with `rotate-90` / `-rotate-90`; `SCROLL_AMOUNT = 240` |
| **Category link** | `<a href=#...>` wrapping CategoryCard | `<button>` (no href) wrapping CategoryCard |
| **CategoryCard size** | Passed via parent: card `w-[144px]` | Card `w-24` (96px); see CategoryCard below |
| **Data** | Same `CATEGORIES` array | Same |

### 3.4 CategoryCard

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Card width** | `w-[144px]` | `w-24` (96px) |
| **Icon box** | `w-[120px] h-[120px]`; `p-3`; `rounded-card`; shadow via Tailwind | `w-20 h-20`; `p-2`; `rounded-[24px]`; shadow inline style |
| **Selected state** | `bg-[#FFBA55]` vs `bg-bg-category` | Same |
| **Label** | `text-sm`; `whitespace-nowrap overflow-hidden text-ellipsis`; wrapper with `p-3` | `text-xs`; `break-words`; `px-1 py-2` |
| **Fallback (no icon)** | First letter in rounded-lg box | Same letter `text-sm` |

### 3.5 ProductGrid

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Heading** | "All Products"; `text-[36px]` (heading-md) | "All Products"; `text-2xl`; `px-0` |
| **Grid** | `gridTemplateColumns: 'repeat(4, 300px)'`; `gap-x-5 gap-y-10` | `grid-cols-2`; `gap-x-3 gap-y-4`; `px-0` |
| **ProductCard** | No `fillWidth`; fixed width from grid cell | **fillWidth** passed so card is `w-full` |
| **Container** | `gap-10` | `gap-6`; `max-w-full` |

### 3.6 ProductCard

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Width** | Fixed `w-[300px]` (from grid); `flex-shrink-0` | `fillWidth ? 'w-full' : 'w-[160px]'`; `min-w-0` |
| **Image area** | `w-[300px] h-[280px]`; content below fixed `h-[140px]` | Image `h-[120px]`; content `min-h-[136px]`; flex layout |
| **Image** | `object-contain` in rounded-lg; placeholder "Product Image" | Same; placeholder "Product" text-sm |
| **Add-to-cart** | `rounded-[40px]`; `p-3`; icon `w-8 h-8`; absolute right-2 bottom-2 | `rounded-full`; `p-2`; icon `w-5 h-5`; same position |
| **Name** | `text-xl`; single line (no line-clamp) | `text-base`; `line-clamp-2`; `text-center` |
| **Price/description** | `text-xl` / `text-sm`; fixed width `w-[276px]` | `text-base` / `text-sm`; `w-full` |
| **Content block** | Left-aligned; gap-3 | Center-aligned name; left-aligned price/desc |

### 3.7 Pagination

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Layout** | Full: First, Back, 1 2 3, •••, 8, Next, Last (all visible) | Compact: Prev, 1, 2, •••, 8, Next only |
| **Buttons** | `h-10`; text labels "First", "Back", "Next", "Last" + icons | `h-8 w-8`; icon-only Prev/Next; no First/Last |
| **Icons** | double-chevron-left, chevron-left, chevron-right, double-chevron-right | chevron-left, chevron-right only |
| **Page numbers** | 1, 2, 3 + ••• + totalPages | 1, 2, •••, totalPages |
| **Wrapper** | `gap-2 flex-wrap` | `justify-center gap-2 flex-wrap` |

### 3.8 MerchantInfo

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Container** | `flex flex-col items-center gap-1 text-center` | Same + `px-4` |
| **Label** | "Items Fulfilled by:" `text-base` | Same `text-sm` |
| **Logo** | Foodtown `h-8` | `h-6` |
| **Address** | `text-sm` | `text-xs` |

---

## 4. UI primitives

### 4.1 Logo

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Default size** | `h-[52px] w-[60px]` (when className empty) | `h-8 w-[37px]` |
| **Wrapper** | No flex-shrink | `flex-shrink-0` |
| **Asset** | Same `/images/logo/groupr-logo.svg` | Same |

### 4.2 Button

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Variants** | primary, outline, light, dark | Same |
| **Size sm** | `px-5 py-3 text-base` | `px-4 py-2 text-base` |
| **Size lg** | Same `px-6 py-5 text-xl h-16` | Same |
| **Logic** | Same variant/outline handling | Same |

### 4.3 Card

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Category variant** | `drop-shadow-[...]` (Tailwind) | `shadow-[...]` (inline-style-like Tailwind) |
| **Product variant** | `rounded-card` (24px desktop) | `rounded-[20px]` |
| **Other** | Same variants (default, how-it-works, category, product) | Same |

### 4.4 Input

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Border radius** | `rounded-sm` (Tailwind default or 2px) | `rounded-input` (theme: 4px in mobile Tailwind) |
| **Rest** | Same (label, error, textarea, focus ring) | Same |

### 4.5 NavLink

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Structure** | `inline-flex flex-col`; underline bar: `h-0.5 bg-bg-primary` toggled by `active` | `inline-flex items-center`; **no underline bar** |
| **Classes** | `rounded-input px-4 py-2`; `whitespace-nowrap` | No rounded-input/px-4; simpler |
| **Active** | Underline + bar | Underline only |

### 4.6 SearchBar

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Presence** | **Used in Navbar** (desktop only) | **Not used** in catalog-page-mobile (no SearchBar in nav) |
| **Behavior** | Rounded-full input; optional onSearch; max-w-[440px] | N/A |

---

## 5. Tailwind theme (summary)

| Token | Desktop | Mobile |
|-------|---------|--------|
| **spacing.section** | 64px | 20px |
| **borderRadius.card** | 24px | 20px |
| **borderRadius.input** | 8px | 4px |
| **maxWidth.mobile** | — | 375px |
| **fontSize.hero** | 60px | 40px |
| **fontSize.heading-lg** | 48px | 36px |
| **fontSize.heading-md** | 36px | 28px |
| **fontSize.heading-sm** | 24px | 24px |
| **Colors** | Same | Same |

---

## 6. Assets (differences)

| Asset | Desktop | Mobile |
|-------|---------|--------|
| **Navbar** | account, cart, dropdown (language), close (PromoBanner) | account, cart, nav-close, nav-icon-0…6 (drawer) |
| **Pagination** | double-chevron-left/right, chevron-left/right | chevron-left, chevron-right only |
| **CategoryStrip** | — | dropdown-icon (rotated for chevrons) |
| **Rest** | Same (logo, categories, products, merchant, social, search, add-to-cart) | Same |

---

## 7. Merge checklist (per component)

- **CatalogPage**: One component; responsive main (max-width + padding) and inner gaps; optional inner `min-w-0` wrapper for mobile.
- **Navbar**: Two branches or responsive classes: desktop = links + SearchBar + account + cart + language; mobile = logo + account + cart + hamburger; render **MobileNavDrawer** only below breakpoint.
- **MobileNavDrawer**: Keep as-is; only mount when viewport is “mobile”.
- **Footer**: One component; responsive flex (row vs stacked/ two-column); responsive logo size and credits row (stack vs row).
- **PromoBanner**: One component; responsive layout (flex row vs flex col) and close position.
- **HeroSearch**: One component; responsive form (row input+button vs stacked, optional hide “Shop now” on small).
- **CategoryStrip**: One component; desktop = flex row; mobile = scroll + chevrons; same data.
- **CategoryCard**: One component; responsive width/icon size/label size (or single “compact” prop for strip).
- **ProductGrid**: One component; responsive columns (4 vs 2) and gap; pass fillWidth on small or always in grid.
- **ProductCard**: One component; responsive image height, content min-height, add-to-cart size, and optional fillWidth.
- **Pagination**: One component; full vs compact (responsive or prop).
- **MerchantInfo**: One component; responsive text/logo sizes.
- **Logo**: One component; default size from context or responsive class (e.g. smaller in mobile nav/footer).
- **Button, Card, Input, NavLink**: Unify (responsive radius/sizing where needed); **SearchBar** only in desktop Navbar.

Use this map to implement the merged catalog app and to avoid regressions when switching between breakpoints.
