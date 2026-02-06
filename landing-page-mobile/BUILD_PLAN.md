# Mobile Landing Page — Build Plan

Build the Groupr mobile landing page in `landing-page-mobile` using **Vite + React + TypeScript + Tailwind**, borrowing structure, assets, and patterns from the desktop `landing-page` app. Components are built **one by one** in the order below.

---

## Reference

- **Desktop source:** `../landing-page/` (components, `tailwind.config.js`, `index.css`, `public/images`)
- **Mobile design spec:** `1.jsx` + `1.css` in this folder (layout, copy, section order)
- **Assets:** Reuse `landing-page/public/images/` (logo, categories, products, sections, icons, social) — we will reference the same paths or copy into this app’s `public/`.

---

## Phase 0: Project setup (do first)

| Step | Task | Borrow from / Notes |
|------|------|---------------------|
| 0.1 | Create Vite + React + TypeScript app in `landing-page-mobile` | Same as desktop: `npm create vite@latest . -- --template react-ts` (in empty dir) or copy `vite.config.ts`, `tsconfig.*`, `index.html` |
| 0.2 | Add Tailwind: `tailwindcss`, `postcss`, `autoprefixer` | Copy desktop `tailwind.config.js`, `postcss.config.js` |
| 0.3 | Copy `index.css` (fonts + `@tailwind base/components/utilities` + base body) | Desktop `src/index.css` — add mobile-specific theme extensions if needed |
| 0.4 | Extend `tailwind.config.js` for mobile | Keep same colors/fonts as desktop; add mobile spacing/breakpoints if desired (e.g. `max-w-mobile: 375px`) |
| 0.5 | Wire entry: `index.html` → `main.tsx` → `App.tsx` | Same as desktop |
| 0.6 | Assets | Copy `landing-page/public/images` into `landing-page-mobile/public/images` (or use path alias to shared folder); ensure favicon and viewport in `index.html` |

**Done when:** `npm run dev` runs, Tailwind works, and `App` renders a simple test div.

---

## Phase 1: UI components (shared building blocks)

Build these so sections can reuse them. Prefer **mobile-first** classes (sizes, padding) and the same design tokens as desktop.

| # | Component | Path | Borrow from | Mobile-specific |
|---|-----------|------|-------------|-----------------|
| 1.1 | **Button** | `src/components/ui/Button.tsx` | Desktop `Button.tsx` | Same variants (primary/outline); ensure touch-friendly height (e.g. min 44px); optional `size="sm"` for smaller CTAs |
| 1.2 | **Logo** | `src/components/ui/Logo.tsx` | Desktop `Logo.tsx` | Smaller default size for mobile (e.g. `h-8 w-9`) |
| 1.3 | **Input** | `src/components/ui/Input.tsx` | Desktop `Input.tsx` | Same; use for Contact form |
| 1.4 | **RadioGroup** | `src/components/ui/RadioGroup.tsx` | Desktop `RadioGroup.tsx` | Same; “How can we assist?” in Contact |
| 1.5 | **Card** (optional) | `src/components/ui/Card.tsx` | Desktop `Card.tsx` | Use for HowItWorks cards, FAQ items if same style |

**Done when:** Each UI component renders in isolation (or on a small test page) with Tailwind styles.

---

## Phase 2: Layout components

| # | Component | Path | Borrow from | Mobile-specific |
|---|-----------|------|-------------|-----------------|
| 2.1 | **Navbar** | `src/components/layout/Navbar.tsx` | Desktop `Navbar.tsx` | Mobile: logo left, single nav icon (e.g. cart) + hamburger right; no SearchBar or multi-links in bar; full-width, compact height; optional mobile menu drawer later |
| 2.2 | **Footer** | `src/components/layout/Footer.tsx` | Desktop `Footer.tsx` | Stack columns vertically; same links/newsletter/credits/social; single-column layout, centered or left-aligned |

**Done when:** Navbar and Footer render at top and bottom of the page with correct mobile layout.

---

## Phase 3: Section components (in page order)

Build one section at a time; add to `HomePage` after each so the page grows incrementally.

| # | Component | Path | Borrow from | Mobile-specific |
|---|-----------|------|-------------|-----------------|
| 3.1 | **HeroSection** | `src/components/sections/HeroSection.tsx` | Desktop `HeroSection.tsx` | Single column: headline, 2 paragraphs, 2 buttons (Shop now, Sign up), “*Free delivery…” note; hero illustration below or right; SNAP/EBT badge positioned for mobile; no English dropdown if not in mobile spec |
| 3.2 | **HowItWorksSection** | `src/components/sections/HowItWorksSection.tsx` | Desktop `HowItWorksSection.tsx` | Vertical stack of 3 steps; reuse **HowItWorksCard** (or inline); decorative orange slice asset; same copy (order → checkout → pick up) |
| 3.3 | **SnapBenefitsSection** | `src/components/sections/SnapBenefitsSection.tsx` | Desktop `SnapBenefitsSection.tsx` | One block of copy + 2 CTAs (Sign up, Shop now); bread decorative asset; cream background |
| 3.4 | **ProductsSection** | `src/components/sections/ProductsSection.tsx` | Desktop `ProductsSection.tsx` | Category strip: horizontal scroll with arrows; **CategoryCard** (reuse or adapt); “Featured products” row (e.g. $50/$75/$100 bags) using **ProductCard**; then 1–2 category rows (e.g. Produce, Meat & Seafood) with **ProductCard**; “See the full store” button |
| 3.5 | **CategoryCard** | `src/components/sections/CategoryCard.tsx` | Desktop `CategoryCard.tsx` | Icon + label; small touch targets in a horizontal strip |
| 3.6 | **ProductCard** | `src/components/sections/ProductCard.tsx` | Desktop `ProductCard.tsx` | Image, add-to-cart icon, title, price, optional subtitle; fixed width for grid |
| 3.7 | **BenefitsSection** | `src/components/sections/BenefitsSection.tsx` | Desktop `BenefitsSection.tsx` | Image + “Simpler Shopping…” heading + 2 benefit bullets; cream background |
| 3.8 | **TestimonialSection** | `src/components/sections/TestimonialSection.tsx` | Desktop `TestimonialSection.tsx` | Stars, quote, name, location; optional testimonial image; carrot decorative asset |
| 3.9 | **FaqSection** | `src/components/sections/FaqSection.tsx` | Desktop `FaqSection.tsx` | “FAQs” heading + intro; list of **AccordionItem** (question + icon); “Still have questions?” + Contact button |
| 3.10 | **AccordionItem** | `src/components/sections/AccordionItem.tsx` | Desktop `AccordionItem.tsx` | Question row with expand/collapse icon; optional expandable answer (or link to contact) |
| 3.11 | **ContactSection** | `src/components/sections/ContactSection.tsx` | Desktop `ContactSection.tsx` | “Get in Touch” + form: First/Last name, Email, Phone, “How can we assist?” (RadioGroup), Message textarea, Send button; use **Input** and **Button** |
| 3.12 | **CtaSection** | `src/components/sections/CtaSection.tsx` | Desktop `CtaSection.tsx` | Dark background, headline, short copy, 2 buttons (Sign up, Shop now); background image asset |

**Done when:** All sections render in order on one scrollable page with correct assets and copy from `1.jsx`.

---

## Phase 4: Page assembly

| # | Task | Details |
|---|------|---------|
| 4.1 | **HomePage** | `src/pages/HomePage.tsx`: one column with Navbar, then Hero, HowItWorks, SnapBenefits, Products, Benefits, Testimonial, Faq, Contact, Cta, Footer (same order as desktop). |
| 4.2 | **App** | `App.tsx`: render `HomePage`; optional wrapper (e.g. `max-w-[375px] mx-auto` for a phone frame during dev). |
| 4.3 | **Polish** | Remove any duplicate or unused styles; ensure all images use correct `src` from `public/images`; check links and buttons (hrefs/onClick); test on real device or narrow viewport. |

---

## Suggested build order (one component at a time)

1. **Phase 0** — Setup (Vite, Tailwind, assets, entry).
2. **Phase 1** — Button → Logo → Input → RadioGroup (and Card if used).
3. **Phase 2** — Navbar → Footer.
4. **Phase 3** — HeroSection → HowItWorksSection (+ HowItWorksCard if separate) → SnapBenefitsSection → CategoryCard → ProductCard → ProductsSection → BenefitsSection → TestimonialSection → AccordionItem → FaqSection → ContactSection → CtaSection.
5. **Phase 4** — HomePage → App → Polish.

---

## File structure (target)

```
landing-page-mobile/
├── public/
│   └── images/          # same structure as landing-page (categories, decorative, icons, logo, products, sections, social)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── HowItWorksCard.tsx
│   │   │   ├── SnapBenefitsSection.tsx
│   │   │   ├── ProductsSection.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── TestimonialSection.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   ├── AccordionItem.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   └── CtaSection.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Logo.tsx
│   │       ├── Input.tsx
│   │       └── RadioGroup.tsx
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── 1.jsx
├── 1.css
├── 2.css
└── BUILD_PLAN.md (this file)
```

---

## Next step

Start with **Phase 0**: initialize Vite + React + TypeScript in `landing-page-mobile`, add Tailwind and PostCSS, copy `index.css` and theme from desktop, then copy or link `public/images`. After that, we can build **Phase 1** (Button, then Logo, etc.) one component at a time.
