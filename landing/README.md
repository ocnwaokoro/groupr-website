# Landing — Unified responsive marketing site

Single responsive app for the Groupr marketing/landing page. Replaces **landing-page** (desktop) and **landing-page-mobile** (mobile).

- **Breakpoint:** `md` (768px). Below = mobile (hamburger nav, drawer, stacked layouts, horizontal scroll strips, 2-col product grid). Above = desktop (full nav + SearchBar, rows, hero illustration + badge, CTA full-bleed).
- **Stack:** Vite, React 19, TypeScript, Tailwind CSS.

## Run

From **this folder** (`landing/`):

```bash
npm install
npm run dev
```

Then open **the URL Vite prints** in the terminal (e.g. `http://localhost:5173`). Do not assume a specific port — other apps may be using it, so Vite may use another.

```bash
npm run build    # production build
npm run preview  # serve dist/
```

### If you see a white screen

1. **Use the correct URL.** Run `npm run dev` from `landing/` and open the URL Vite prints. Opening a different port (e.g. catalog or another app) will not show this app.
2. **Check for errors.** The app is wrapped in an error boundary. If React throws, you’ll see “Something went wrong” and the message; also check the browser console (F12 → Console).

## Layout

- **Navbar:** Desktop = Logo + Shop / Pickup Locations / Learn more / Contact us + SearchBar + Log in + Sign up + Cart. Mobile = Logo + account + cart + hamburger; **MobileNavDrawer** (close icon) for links.
- **Footer:** Responsive (stacked on small, row on desktop); same content.
- **Sections:** Hero, How It Works, SNAP Benefits, Products (featured row / horizontal scroll + produce/meat row or 2-col grid), Benefits, Testimonial, FAQ, Contact, CTA (desktop full-bleed background / mobile food-background), then Footer.

## Docs

- **Desktop vs mobile behavior:** `docs/LANDING_DESKTOP_VS_MOBILE_MAP.md` (repo root).
- **How the merge was done:** `docs/LANDING_MERGE_PROCESS.md` (repo root), §8 Implementation.
