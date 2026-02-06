# Landing-Page-Mobile vs Catalog-Page-Mobile / Post-Login — Architecture, Styling & Revisions

Analysis of **landing-page-mobile** (superior design reference) and comparison to **catalog-page-mobile** and **post-login**. Goal: align styling and architecture, especially Footer; document where components can be copied as-is.

---

## 1. How landing-page-mobile is architected

### 1.1 Page & layout

| Layer | Pattern | Example |
|-------|---------|--------|
| **Root** | `min-h-screen w-full bg-bg-primary text-center text-text-primary font-sans` | HomePage wrapper |
| **Inner** | `w-full min-w-0 flex flex-col items-stretch` | No horizontal scroll; sections full width |
| **Sections** | `w-full max-w-full overflow-hidden z-[n]` | Consistent; z-index for stacking |
| **Section padding** | `px-5` (20px) everywhere; `pt-* pb-*` vary by section | e.g. `px-5 pt-16 pb-20` |

No `max-w-[375px]` on the page container; viewport constrains width. Sections use `max-w-full` so they work on any width.

### 1.2 Tailwind theme (landing-page-mobile)

- **Colors:** Same palette as catalog (bg-primary, bg-dark, bg-footer, text-brown, accent-orange, etc.).
- **Font sizes:** `hero: 40px`, `heading-lg: 36px`, `heading-md: 28px`, `heading-sm: 24px` (smaller than desktop).
- **maxWidth:** `mobile: '375px'` (available, not forced on body).
- **Border radius:** `card: '20px'`, `button: '12px'`, `input: '4px'` (input tighter than catalog’s 8px).

### 1.3 Section architecture (landing-page-mobile)

| Section | Container | Content pattern | Notes |
|---------|-----------|-----------------|--------|
| **HeroSection** | `bg-bg-dark`, `px-0` (inner `px-5`), fixed illustration size (375×260) | Heading + paragraphs + 2 CTAs + disclaimer; illustration with scale/translate | z-[9] |
| **HowItWorksSection** | `bg-bg-light-green`, `px-5 pt-8 pb-20`, decorative img absolute | H2 + list of HowItWorksCard | z-[8] |
| **ProductsSection** | `bg-bg-primary`, `px-5 pt-16 pb-20` | CategoryStrip → heading + “Shop full store” → horizontal FEATURED strip → Produce grid → Meat grid → CTA button | z-[6] |
| **BenefitsSection** | `bg-bg-cream`, `px-5 pt-16 pb-6` | Image block (aspect-square, rounded-[32px]) + H2 + benefit blocks | z-[5] |
| **FaqSection** | `bg-bg-light-green`, `px-5 py-16` | H2 + intro + AccordionItem list + “Still have questions?” + Contact button | z-[3] |
| **CtaSection** | `bg-bg-dark-alt`, absolute bg image, `px-5 py-[120px] pb-[140px]` | Heading + text + 2 buttons | z-[1] |
| **Footer** | `bg-bg-footer`, `px-5 py-16 gap-10` | Logo → Quick Links + Stay Connected (flex-wrap) → Join + form → divider → credits + social | z-0 |

### 1.4 Footer (landing-page-mobile) — detailed

- **Outer:** `<footer className="w-full bg-bg-footer overflow-hidden z-0">`
- **Inner:** `w-full max-w-full mx-auto flex flex-col items-start px-5 py-16 gap-10 text-left text-base text-text-brown font-sans`
- **Block 1:** Logo only — `<Logo className="h-[78px] w-[90px]" />` (no wrapper div).
- **Block 2:** Two columns in one row — `flex flex-wrap justify-start gap-10`; each column `flex flex-col items-start gap-4 min-w-[120px]`; heading `text-base leading-[150%] font-semibold`; links use **NavLink** with `className="py-2"`.
- **Block 3:** Newsletter — heading “Join”, paragraph, form with **Input** (w-full), **Button** (w-full, no wrapper div), disclaimer text. `gap-6` between heading and form content.
- **Block 4:** Divider — `self-stretch h-px bg-bg-dark border border-bg-dark`.
- **Block 5:** Credits row — `flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:flex-wrap`; left: copyright + 3 links `gap-3`; right: social icons `gap-3`. © 2025.

### 1.5 Navbar (landing-page-mobile)

- **Outer:** `w-full max-w-full mx-auto bg-bg-primary flex flex-col items-start z-10`
- **Row:** `w-full flex items-center justify-between px-5 py-3 gap-2`
- **Logo:** Default `<Logo />` (no className) → Logo default `h-8 w-[37px]`.
- **Right:** Cart (icon + “cart” label) + hamburger button (inline SVG). No account icon.
- **Bottom:** `w-full h-px bg-bg-primary` (divider; same color as bg so very subtle).

### 1.6 UI primitives (landing-page-mobile)

- **Button:** `primary` | `outline` only; `min-h-[44px]`; outline on dark uses `border-2 border-text-light text-text-light hover:bg-text-light hover:text-bg-dark` when `className` suggests dark context.
- **Logo:** Default `className = 'h-8 w-[37px]'`, wrapper has `flex-shrink-0`.
- **NavLink:** `inline-flex items-center font-sans text-base font-medium leading-[150%] text-text-dark hover:underline`; no underline bar; caller adds `py-2` etc.
- **Input:** `rounded-input bg-bg-primary border border-text-border px-3 py-2` + focus ring; single-line classes.
- **Card:** Same four variants; product/category use `rounded-[20px]` and same shadow strings.

### 1.7 CategoryStrip / CategoryCard (landing-page-mobile)

- **Strip:** Fixed height `h-[114px]`, scroll `overflow-x-auto` with `scrollSnapType: 'x mandatory'`, `pl-6 pr-12`, `scrollbar-hide`. Chevrons: **dropdown-icon** with `rotate-90` / `-rotate-90` (no chevron-left/right assets).
- **CategoryCard:** `w-20`, inner icon box `rounded-[24px] w-16 h-16 p-2`, label `text-xs truncate`.

### 1.8 ProductCard (landing-page-mobile)

- **Prop `fillWidth`:** If true, `w-full` (grid); else `w-[160px] flex-shrink-0` (horizontal scroll).
- Image area `h-[120px]`, content `min-h-[136px]`; add-to-cart `rounded-full p-2`, icon `w-5 h-5`.

---

## 2. Comparison table: landing-page-mobile vs my work

| Area | Landing-page-mobile | Catalog-page-mobile | Post-login | Revisions / copy? |
|------|---------------------|--------------------|------------|-------------------|
| **Page container** | `w-full max-w-full`, no 375px cap | `max-w-[375px] mx-auto` on root/main | `max-w-[1440px]` desktop | Catalog: consider dropping max-w-[375px] on root so layout matches landing-mobile; or keep for strict 375. |
| **Footer container** | `max-w-full mx-auto px-5 py-16 gap-10` | `max-w-[375px] mx-auto px-5 py-10 gap-10` | `max-w-[1440px] px-section py-20` multi-column | **Revise catalog Footer** to match landing-mobile layout and spacing (see §3). |
| **Footer structure** | Logo → (Quick Links + Stay Connected) → Join → divider → credits | Logo centered → 2 col blocks → newsletter → divider → credits | 3 cols + newsletter sidebar; NavLink | **Copy landing-mobile Footer** into catalog-page-mobile (same content, NavLink, no extra wrappers). |
| **Footer logo** | `h-[78px] w-[90px]` | `h-16 w-[90px]` | `h-[104px] w-[120px]` | Catalog: use `h-[78px] w-[90px]` to match landing-mobile. |
| **Footer link columns** | `flex flex-wrap gap-10`, columns `min-w-[120px]` | Two separate `flex-col gap-6` blocks | Three columns, NavLink with `py-2 pl-0 pr-4` | Catalog: use single row with flex-wrap and NavLink + `py-2` like landing-mobile. |
| **Footer newsletter** | Input + Button stacked, no wrapper around Button; “Subscribe” | Input + Button in wrapper div; “Sign up” | Input + Button in wrapper; “Subscribe” | Catalog: remove Button wrapper; use “Subscribe”; match gap-6. |
| **Footer credits** | `flex-col items-center gap-4 sm:flex-row sm:justify-between sm:flex-wrap` | Same idea, `gap-6` | Row with gap-6 | Catalog: use `gap-4` and landing-mobile class string. |
| **Navbar** | Logo + cart + menu; `max-w-full`; bottom divider `h-px bg-bg-primary` | Logo + account + cart + menu; `max-w-[375px]` | Full nav + SearchBar + account/cart/lang | **Copy landing-mobile Navbar** into catalog-page-mobile if we want minimal nav (no account icon, add divider). |
| **Logo (default)** | `h-8 w-[37px]`, `flex-shrink-0` | `h-8 w-9` (36px) | `h-[52px] w-[60px]` | Catalog: can keep or switch to `w-[37px]` to match landing-mobile. |
| **Button variants** | primary, outline (+ outline on dark via className) | primary, outline, light, dark | Same as catalog | Catalog/post-login have more variants; landing-mobile achieves “light” with className. **No copy**; extend landing-mobile Button if we need light/dark. |
| **NavLink** | Simple: `inline-flex items-center`, hover underline | Not used in catalog Footer (raw `<a>`) | Used with `self-stretch flex items-start py-2 pl-0 pr-4` | **Copy landing-mobile NavLink** into catalog and use in Footer (with `className="py-2"`). |
| **Input** | `rounded-input` (4px), same colors | Same idea, catalog may use 8px input radius | Same | Align input radius to 4px in Tailwind if we want pixel-perfect match. |
| **Card** | Same variants; `rounded-[20px]` for product/category | Same | Same | **Can copy** landing-mobile Card as-is into catalog (already very close). |
| **CategoryStrip** | h-[114px], dropdown-icon rotated, scrollbar-hide, snap | Chevron icons, scrollbar-hide, snap | Desktop: no scroll | **Revise catalog** to use dropdown-icon rotated for arrows and same h-[114px] if we want identical look. |
| **CategoryCard** | w-20, 16×16 icon box, text-xs truncate | w-20, similar | w-[144px] desktop | **Can copy** landing-mobile CategoryCard into catalog-page-mobile. |
| **ProductCard** | fillWidth prop, 160px / full, h-[120px] image, min-h-[136px] content | No fillWidth, grid cell, h-28 image | Desktop 300×280 | **Revise catalog** ProductCard: add fillWidth, match heights and add-to-cart style (rounded-full, icon size) from landing-mobile. |
| **Tailwind** | card 20px, input 4px, hero 40px, heading-lg 36px, maxWidth.mobile 375 | card 24px/20px mixed, section 20px | section 64px, card 24px | Catalog: set card to 20px, input to 4px, add maxWidth.mobile to match landing-mobile. |

---

## 3. Revisions table (what to do)

| # | Target | Change | Copy from / align to |
|---|--------|--------|----------------------|
| 1 | **catalog-page-mobile Footer** | Replace with layout and structure of landing-page-mobile Footer: same order (Logo → link columns → Join → divider → credits), NavLink for links, no Button wrapper, “Subscribe”, credits row classes. | **Copy** `landing-page-mobile/src/components/layout/Footer.tsx` → catalog-page-mobile, then adjust only catalog-specific needs (e.g. keep © 2025). |
| 2 | **catalog-page-mobile Navbar** | Option A: Use landing-mobile Navbar (Logo + cart + menu, bottom divider). Option B: Keep account icon but add `w-full h-px bg-bg-primary` under nav and use `max-w-full` for consistency. | **Copy** landing-mobile Navbar for minimal nav; or **revise** existing with divider + max-w-full. |
| 3 | **catalog-page-mobile NavLink** | Use NavLink in Footer (and elsewhere) with simple styling; ensure it exists and matches landing-mobile API. | **Copy** `landing-page-mobile/src/components/ui/NavLink.tsx` if catalog doesn’t have it or has a heavier version. |
| 4 | **catalog-page-mobile Logo** | Default size `h-8 w-[37px]`, wrapper `flex-shrink-0`. Footer logo `h-[78px] w-[90px]`. | **Revise** catalog Logo default and Footer usage to match landing-mobile. |
| 5 | **catalog-page-mobile tailwind.config** | `borderRadius.card: '20px'`, `borderRadius.input: '4px'`, `maxWidth.mobile: '375px'`, fontSize heading scale like landing (e.g. heading-lg 36px). | **Revise** config to align with landing-page-mobile. |
| 6 | **catalog-page-mobile CategoryStrip** | Height 114px, scroll padding pl-6 pr-12, use dropdown-icon rotate for arrows, same snap behavior. | **Revise** to match landing-mobile strip; optionally **copy** landing-mobile CategoryStrip and only change data/links. |
| 7 | **catalog-page-mobile CategoryCard** | w-20, inner 16×16 rounded-[24px], label text-xs truncate. | **Copy** landing-mobile CategoryCard (or already aligned). |
| 8 | **catalog-page-mobile ProductCard** | Add fillWidth; image height 120px; content min-height 136px; add-to-cart rounded-full, icon 5×5. | **Revise** catalog ProductCard from landing-mobile ProductCard. |
| 9 | **post-login Footer** | No structural copy (desktop layout). Only consider: “Subscribe” label and same legal/social block styling if we want consistency. | Optional small tweaks; no full copy. |

---

## 4. Where to copy components as-is

| Component | Source | Destination | Note |
|-----------|--------|-------------|------|
| **Footer** | landing-page-mobile | catalog-page-mobile | Best candidate; same content and mobile layout. Replace catalog Footer entirely. |
| **Navbar** | landing-page-mobile | catalog-page-mobile | If we want minimal nav (no account). Same Logo/cart/menu + divider. |
| **NavLink** | landing-page-mobile | catalog-page-mobile | Simpler than post-login; use in Footer and anywhere else we need link styling. |
| **Card** | landing-page-mobile | catalog-page-mobile | Same variants and shadows; drop-in. |
| **CategoryCard** | landing-page-mobile | catalog-page-mobile | Same mobile sizing (w-20, 16×16 box); drop-in. |
| **Input** | landing-page-mobile | catalog-page-mobile | Same API; ensures rounded-input 4px; drop-in. |
| **Logo** | landing-page-mobile | catalog-page-mobile | Default h-8 w-[37px], flex-shrink-0; drop-in. |

**Do not copy as-is:** Button (catalog needs light/dark for PromoBanner/HeroSearch), HeroSection/CtaSection/HowItWorks/etc. (landing-only sections). ProductCard and CategoryStrip: **revise** catalog versions using landing-mobile as reference (fillWidth, heights, icons).

---

## 5. Summary

- **Landing-page-mobile** uses a consistent section pattern (`w-full max-w-full`, `px-5`, z-index), a compact Tailwind scale (card 20px, input 4px, smaller headings), and a **Footer** that’s clean: Logo first, then two link columns in one flex-wrap row with NavLink, then newsletter (Input + Button, no wrapper), then divider and credits/social.
- **Catalog-page-mobile** should adopt that Footer (copy), align Navbar (copy or add divider + max-w-full), and use the same UI primitives (NavLink, Logo, Card, Input, CategoryCard) from landing-page-mobile where possible.
- **Revisions** for catalog: Tailwind (card 20px, input 4px, maxWidth.mobile), CategoryStrip (height, arrows, padding), ProductCard (fillWidth, heights, add-to-cart style). Post-login stays desktop; only optional Footer label/styling tweaks.

Using this table, the highest-impact change is: **copy landing-page-mobile’s Footer (and NavLink) into catalog-page-mobile** and then apply the remaining revisions above for a consistent, superior mobile experience.
