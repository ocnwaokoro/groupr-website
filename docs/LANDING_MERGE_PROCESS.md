# Landing Merge Process — Full Documentation

This document records the process for merging **landing-page** (desktop marketing site) and **landing-page-mobile** (mobile marketing site) into a single responsive landing app.

---

## 1. Goal

**Create a new folder that merges `landing-page` and `landing-page-mobile`.**

Meaning: one responsive marketing/landing app that serves both desktop and mobile from a single codebase, replacing the two separate apps — the same approach used for the catalog merge.

---

## 2. Project context

### 2.1 Repo structure

- **Groupr** = affordable grocery delivery for NYC residents (SNAP/EBT).
- **landing-page** — desktop marketing site (Vite + React + Tailwind).
- **landing-page-mobile** — mobile marketing site (same stack, 375px-first).

### 2.2 Relationship between the two landing apps

- **Same product:** both implement the same page flow (Navbar → Hero → HowItWorks → SnapBenefits → Products → Benefits → Testimonial → Faq → Contact → Cta → Footer).
- **Same section names and content:** identical copy and structure.
- **Different implementations:** layout (max-width vs full width), Navbar (full nav + SearchBar vs hamburger + drawer), Hero (desktop illustration + badge vs mobile illustration), Products (rows vs scroll + 2-col grid), Cta (different background images), Footer (row vs stacked), and Tailwind theme (section spacing, typography, radii).

So the merge is **one marketing page implemented twice** → **one responsive implementation**.

---

## 3. Process phases

### Phase 1: Analysis

- Listed and read both codebases (App, HomePage, Navbar, Footer, HeroSection, HowItWorksSection, SnapBenefitsSection, ProductsSection, BenefitsSection, FaqSection, ContactSection, CtaSection, TestimonialSection, CategoryStrip, CategoryCard, ProductCard, HowItWorksCard, AccordionItem, MobileNavDrawer, UI components).
- Compared Tailwind configs and `public/images` (desktop has hero-illustration + cta-background; mobile has group-2, food-background, account-icon, close-icon).

### Phase 2: Detailed desktop vs mobile map

- Produced **`docs/LANDING_DESKTOP_VS_MOBILE_MAP.md`** with tables for: HomePage layout; Navbar; MobileNavDrawer; Footer; HeroSection; HowItWorksSection; SnapBenefitsSection; ProductsSection (and CategoryStrip, ProductCard); BenefitsSection; TestimonialSection; FaqSection; ContactSection; CtaSection; CategoryCard, ProductCard, HowItWorksCard, AccordionItem; UI primitives; Tailwind theme; assets; merge checklist.

### Phase 3: Process documentation

- **`docs/LANDING_MERGE_PROCESS.md`** (this file): goal, context, phases, deliverables, decisions, and implementation (§8).

### Phase 4: Implementation

- Create **`landing/`** app: Vite + React + TypeScript + Tailwind; single theme; assets from both apps; responsive components; ErrorBoundary; run instructions and white-screen notes (same pattern as catalog).

### Phase 5: Document implementation

- §8 in this doc + **`landing/README.md`** with run commands and “if you see a white screen.”

---

## 4. Deliverables

| Deliverable | Location | Purpose |
|------------|----------|---------|
| **Desktop vs mobile map** | `docs/LANDING_DESKTOP_VS_MOBILE_MAP.md` | Reference for every section/component desktop vs mobile; use during merge implementation. |
| **Process + implementation doc** | `docs/LANDING_MERGE_PROCESS.md` | Goal, context, phases, §8 Implementation (how it was built, run, white-screen fix). |
| **Merged landing app** | `landing/` | Single responsive marketing app. Run: `cd landing && npm run dev`; open URL Vite prints. |
| **Landing README** | `landing/README.md` | Run commands, white-screen note, layout summary, links to docs. |

---

## 5. Decisions

- **Folder name:** `landing/`.
- **Breakpoint:** `md` (768px). Below = mobile (hamburger, drawer, stacked layouts, scroll strips, 2-col grids). Above = desktop (full nav, SearchBar, rows, fixed widths where used).
- **Tailwind:** Single theme; responsive utilities in components; `section` spacing and typography/radii aligned with map.
- **Copyright:** © 2026 (unified).
- **Assets:** One `public/images`: merge from landing-page, add mobile-only (account-icon, close-icon, group-2.svg, food-background.svg) from landing-page-mobile.

---

## 6. Recommended next steps (pre-implementation)

1. Create `landing/` with Vite, React, TypeScript, Tailwind, PostCSS.
2. Merge `public/images` (desktop + mobile-only assets).
3. Implement layout (Navbar responsive + MobileNavDrawer), Footer responsive.
4. Implement sections in order: Hero, HowItWorks, SnapBenefits, Products, Benefits, Testimonial, Faq, Contact, Cta — each as a single responsive component.
5. Compose HomePage; add ErrorBoundary; update root README and add `landing/README.md`.

---

## 7. How to use this documentation

- **Implementing the merge:** Use **`docs/LANDING_DESKTOP_VS_MOBILE_MAP.md`** and the merge checklist at the end.
- **Onboarding / handoff:** Use this file for goal, context, phases, and §8 Implementation.

---

## 8. Implementation (how it was built)

### 8.1 Project setup

- **Folder:** `landing/`.
- **Stack:** Vite 7, React 19, TypeScript, Tailwind CSS, PostCSS.
- **Config:** `package.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `.gitignore`.
- **Breakpoint:** `md` (768px). Below = mobile; above = desktop.
- **Theme:** Single Tailwind theme; `borderRadius.input: '4px'` (mobile); desktop overrides with `md:rounded-sm` where needed; `screens.md: 768px`.

### 8.2 Assets

- **Source:** `landing-page/public/images` plus mobile-only from `landing-page-mobile`: `account-icon.svg`, `close-icon.svg`, `group-2.svg`, `food-background.svg`.
- **Location:** `landing/public/images/`. Hero: desktop `hero-illustration.svg`, mobile `group-2.svg`. CTA: desktop `cta-background-image.svg`, mobile `food-background.svg`.

### 8.3 Components

- **Entry:** `main.tsx` (ErrorBoundary + root mount check), `App.tsx` (renders HomePage), `index.css`, `vite-env.d.ts`.
- **ErrorBoundary:** `src/ErrorBoundary.tsx` — shows “Something went wrong” + message on React errors; no default React import (named only).
- **UI:** Logo, Button (primary/outline), Card, Input (rounded-input), NavLink, SearchBar, RadioGroup.
- **Layout:** Navbar (responsive: desktop = links + SearchBar + Log in + Sign up + Cart; mobile = Logo + account + cart + hamburger), MobileNavDrawer (close-icon, 280ms), Footer (responsive).
- **Sections:** HeroSection, HowItWorksSection, HowItWorksCard, SnapBenefitsSection, CategoryStrip, CategoryCard, ProductCard (fillWidth), ProductsSection (useMediaQuery: featured row vs horizontal scroll; produce/meat row vs 2-col grid), BenefitsSection, TestimonialSection, AccordionItem, FaqSection, ContactSection, CtaSection (desktop cta-background-image, mobile food-background).
- **Hook:** `useMediaQuery.ts` (used in ProductsSection).
- **Page:** HomePage composes sections in order: Navbar → Hero → HowItWorks → SnapBenefits → Products → Benefits → Testimonial → Faq → Contact → Cta → Footer; wrapper `min-h-screen w-full bg-bg-primary`; inner `w-full min-w-0 flex flex-col items-stretch`.

### 8.4 Build and run

- **Install:** `cd landing && npm install`
- **Dev:** `cd landing && npm run dev` — open the URL Vite prints (do not assume a port).
- **Build:** `cd landing && npm run build`
- **Preview:** `cd landing && npm run preview` (serves `dist/`).

### 8.5 White-screen fix

- Run from **`landing/`** with `npm run dev` and open the URL Vite prints. Opening another app’s port (e.g. catalog or another project) shows a blank page.
- If React throws, the ErrorBoundary shows “Something went wrong” and the error message; also check the browser console (F12 → Console).

### 8.6 Repo and README updates

- **Root README:** Lists `landing/` as the unified landing app; marks `landing-page` and `landing-page-mobile` as legacy/superseded.
- **`landing/README.md`:** Run commands, white-screen note, layout summary, links to `docs/LANDING_DESKTOP_VS_MOBILE_MAP.md` and `docs/LANDING_MERGE_PROCESS.md`.

---

*Last updated: 2025-02-07. Process: analysis → desktop/mobile map → process doc → implementation → implementation documentation.*
