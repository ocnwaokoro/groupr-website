# Groupr Website

Affordable grocery delivery for NYC residents (SNAP/EBT). This repo contains the marketing site, post-login catalog, and mobile prototypes.

## Structure

- **`landing/`** – **Unified** marketing site (responsive: desktop + mobile). Single app replacing `landing-page` and `landing-page-mobile`.
  - Run: `cd landing && npm install && npm run dev`
  - Build: `cd landing && npm run build`

- **`catalog/`** – **Unified** post-login catalog (responsive: desktop + mobile). Single app replacing `catalog-page` and `catalog-page-mobile`.
  - Run: `cd catalog && npm install && npm run dev`
  - Build: `cd catalog && npm run build`

- **`landing-page/`** – Legacy desktop-only marketing site (superseded by `landing/`).
  - Run: `cd landing-page && npm install && npm run dev`

- **`landing-page-mobile/`** – Legacy mobile-only marketing site (superseded by `landing/`).
  - Run: `cd landing-page-mobile && npm install && npm run dev`

- **`catalog-page/`** – Legacy desktop-only catalog (superseded by `catalog/`).
  - Run: `cd catalog-page && npm install && npm run dev`

- **`catalog-page-mobile/`** – Legacy mobile-only catalog (superseded by `catalog/`).
  - Run: `cd catalog-page-mobile && npm install && npm run dev`

## Stack

- **Vite** – Build and dev server
- **React 18** – UI
- **Tailwind CSS** – Styling with design tokens

Each app has its own `package.json`, `public/`, and `src/`. See each folder’s README for details.
