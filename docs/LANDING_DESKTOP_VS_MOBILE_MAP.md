# Landing: Desktop vs Mobile — Section & Component Map

Detailed mapping of how each section and component behaves in **landing-page** (desktop) vs **landing-page-mobile** (mobile). Use this when merging into a single responsive app.

---

## 1. Page-level layout (HomePage.tsx)

| Aspect | Desktop (landing-page) | Mobile (landing-page-mobile) |
|--------|------------------------|------------------------------|
| **Root** | `min-h-screen bg-bg-primary` | `min-h-screen w-full bg-bg-primary text-center text-text-primary font-sans` |
| **Inner** | None | `w-full min-w-0 flex flex-col items-stretch` |
| **Section order** | Same: Navbar → Hero → HowItWorks → SnapBenefits → Products → Benefits → Testimonial → Faq → Contact → Cta → Footer | Same |

---

## 2. Layout components

### 2.1 Navbar

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Content** | Logo + nav links (Shop, Pickup Locations, Learn more, Contact us) + **SearchBar** + Log in + Sign up + Cart | Logo + account icon + cart icon + **hamburger**; nav in **MobileNavDrawer** |
| **Container** | `px-section py-1`; row `justify-between gap-0` | `px-5 py-3`; `max-w-full`; row `gap-2` |
| **Nav links** | Visible in bar, `w-[530px] gap-5` | Hidden; in drawer |
| **SearchBar** | Present in nav | Not in nav; in drawer |
| **Right side** | Log in (NavLink), Sign up (Button), Cart (icon + "cart" label) | Account icon, Cart icon, hamburger button |
| **Mobile-only** | — | **MobileNavDrawer** (search + links + Log in + Sign up) |

### 2.2 MobileNavDrawer (mobile only)

| Aspect | Behavior |
|--------|----------|
| **Trigger** | Hamburger in Navbar |
| **Overlay** | `fixed inset-0 bg-black/50 z-[100]`; click to close |
| **Panel** | `fixed top-0 right-0 w-[311px] max-w-[85vw]`; bg `bg-bg-category`; slides from right; close with **close-icon.svg** (top right) |
| **Content** | Search input → nav links (no icons except cart for "Your cart") → divider → Log in → Sign up button |
| **Animation** | 280ms; `requestAnimationFrame` for enter |

### 2.3 Footer

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Outer** | `max-w-[1440px]`; `px-section py-20` | `max-w-full`; `px-5 py-16` |
| **Top block** | Single row: Logo (104×120) + Quick Links + Stay Connected + Newsletter (w-[400px]) | Stacked: Logo (78×90) → two columns (Quick Links, Stay Connected) → Newsletter full width |
| **Newsletter** | Input + Button inline | Input + Button stacked, both w-full |
| **Credits** | Row, justify-between | `flex-col sm:flex-row`; centered on small |
| **Copyright** | © 2026 | © 2025 |

---

## 3. Section components

### 3.1 HeroSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Container** | `h-[638px]`; `bg-bg-dark`; `px-section`; English selector top-left; SNAP badge absolute `left-[1238px]` | `max-w-full`; `px-0`; content `pt-16 px-5 pb-5`; no language/badge in same positions |
| **Illustration** | `hero-illustration.svg`; absolute `left-[791.75px]`; 633.5×600.7px | `group-2.svg`; fixed 375×260px container; scale/translate for crop |
| **Content** | Left column absolute `left-section`; `w-[723px]`; h1 `text-hero` (60px); paragraphs `w-[646px]`; two buttons inline | Stacked; h1 `text-hero` (40px mobile); buttons stacked `w-full` |
| **CTAs** | Shop now, Sign up (side by side) | Same; stacked |

### 3.2 HowItWorksSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Container** | `px-section py-16 pb-20`; decorative orange-slice absolute; h2 `w-[768px]` | `px-5 pt-8 pb-20`; orange-slice absolute smaller; no fixed width on h2 |
| **Cards** | Row `gap-6`; HowItWorksCard `flex-1` | Column `gap-6` |

### 3.3 SnapBenefitsSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Container** | `px-section py-16 pb-20`; inner `w-[1046px] px-[120px]`; bread icon absolute right | `px-5 pt-16 pb-[104px]`; bread icon absolute bottom-right; content full width |
| **Buttons** | Inline `gap-4` | Stacked `w-full gap-4` |

### 3.4 ProductsSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Container** | `max-w-[1440px]`; `px-section py-[120px]`; inner `w-[1312px]` | `max-w-full`; `pt-16 pb-20`; `px-5` on content |
| **CategoryStrip** | Flex row, all visible | Horizontal scroll + chevrons (same pattern as catalog mobile) |
| **Featured** | Row `gap-8`; ProductCard fixed width | Horizontal scroll `overflow-x-auto`; scroll snap; ProductCard no fillWidth in strip |
| **Produce / Meat** | Row of ProductCards `gap-8` | 2-col grid; ProductCard **fillWidth** |
| **CTA** | "See the full store" button | Same; `w-full` |

### 3.5 BenefitsSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Layout** | Two columns: text (heading + 2 benefit blocks) + image 600×600, rounded-[32px] | Stacked: image first (aspect-square max-h-[320px]), then text blocks |
| **Container** | `max-w-[1440px]`; `px-section py-[112px]`; row `gap-20` | `max-w-full`; `px-5 pt-16 pb-6`; column `gap-20` |

### 3.6 TestimonialSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Pattern** | Centered content; image + quote (typical desktop layout) | Stacked; same content, full width / centered |

### 3.7 FaqSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Container** | `max-w-[1440px]`; `px-section py-[112px]`; inner `w-[780px]` / `w-[768px]` | `max-w-full`; `px-5 py-16` |
| **Content** | Same FAQs, AccordionItem list; "Still have questions?" + Contact button in `w-[560px]` | Same; full width; Contact wrapped in `<a href="#contact">` |

### 3.8 ContactSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Pattern** | Form/layout centered or constrained width | Full width, stacked (same fields) |

### 3.9 CtaSection

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Background** | `cta-background-image.svg`; full bleed | `food-background.svg`; `inset-6 sm:inset-8`; rounded-lg |
| **Container** | `max-w-[1440px]`; `px-section py-[136px]`; inner `w-[768px]` | `px-5 py-[120px] pb-[140px]`; `min-h-[420px]` |
| **Buttons** | Inline `gap-4` | Stacked `w-full` |

### 3.10 CategoryStrip (within ProductsSection)

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Layout** | Flex row, all categories visible; CategoryCard `w-[144px]` | Scroll + left/right chevrons; CategoryCard smaller (e.g. w-20) |

### 3.11 CategoryCard, ProductCard, HowItWorksCard, AccordionItem

| Component | Desktop | Mobile |
|-----------|---------|--------|
| **CategoryCard** | Same as catalog: w-[144px], larger icon box | Smaller (w-20), smaller label |
| **ProductCard** | Fixed width in rows | **fillWidth** in 2-col grid; compact layout in horizontal scroll for featured |
| **HowItWorksCard** | Card variant how-it-works; flex-1 in row | Same variant; w-full in column |
| **AccordionItem** | Same content | Same; styling may differ (padding/text) |

---

## 4. UI primitives

| Component | Desktop | Mobile |
|-----------|---------|--------|
| **Logo** | Default size (likely larger) | Default smaller (e.g. h-8 w-[37px]) |
| **Button** | Same variants | Same; sm size may differ (padding) |
| **Card** | rounded-card 24px, input 8px | card 20px, input 4px |
| **Input** | rounded-sm or 8px | rounded-input 4px |
| **NavLink** | With underline bar (if present) | Simpler, no bar |
| **SearchBar** | In Navbar | Not in Navbar; in drawer only |
| **RadioGroup** | Present (e.g. Contact) | Present |

---

## 5. Tailwind theme

| Token | Desktop | Mobile |
|-------|---------|--------|
| **spacing.section** | 64px | — (use px-5 / 20px) |
| **fontSize.hero** | 60px | 40px |
| **fontSize.heading-lg** | 48px | 36px |
| **fontSize.heading-md** | 36px | 28px |
| **fontSize.heading-sm** | 24px | 24px |
| **borderRadius.card** | 24px | 20px |
| **borderRadius.input** | 8px | 4px |
| **maxWidth.mobile** | — | 375px |

---

## 6. Assets

| Asset | Desktop | Mobile |
|-------|---------|--------|
| **Hero** | hero-illustration.svg, snap-ebt-badge.svg | group-2.svg (hero); snap-ebt-badge optional |
| **CtaSection** | cta-background-image.svg | food-background.svg |
| **Drawer** | — | close-icon.svg (landing uses close, not nav-close) |
| **Icons** | cart, dropdown, search | + account-icon, close-icon |
| **Rest** | Same (categories, decorative, logo, products, sections, social) | Same |

---

## 7. Merge checklist (per component)

- **HomePage:** One component; responsive root/inner wrapper; same section order.
- **Navbar:** Desktop = Logo + links + SearchBar + Log in + Sign up + Cart. Mobile = Logo + account + cart + hamburger; **MobileNavDrawer**.
- **MobileNavDrawer:** Keep; only open from mobile Navbar; use close-icon.svg.
- **Footer:** Responsive (stacked vs row); logo size; newsletter inline vs stacked; credits row.
- **HeroSection:** Responsive layout; desktop hero-illustration + badge; mobile group-2 fixed size; CTAs row vs stack.
- **HowItWorksSection:** Responsive padding; cards row vs column.
- **SnapBenefitsSection:** Responsive padding; buttons inline vs stack; decorative icon position.
- **ProductsSection:** Responsive container; CategoryStrip flex vs scroll; Featured row vs horizontal scroll; Produce/Meat row vs 2-col grid; ProductCard fillWidth on mobile.
- **BenefitsSection:** Two-col vs stacked; image size responsive.
- **TestimonialSection:** Responsive padding/width.
- **FaqSection:** Responsive padding; same AccordionItems.
- **ContactSection:** Responsive form layout.
- **CtaSection:** Background image (desktop cta-background vs mobile food-background or single with responsive); buttons inline vs stack.
- **CategoryStrip, CategoryCard, ProductCard, HowItWorksCard, AccordionItem:** Single responsive components or props (fillWidth, size).
- **Logo, Button, Card, Input, NavLink:** Unify; **SearchBar** only in desktop Navbar (or in drawer on mobile).

Use this map to implement the merged landing app.
