# Groupr Website

Affordable grocery delivery for NYC residents (SNAP/EBT). This repo contains the marketing site, post-login catalog, and mobile prototypes.

## Structure

- **`landing-page/`** – Main marketing site (Vite + React + Tailwind).
  - Run: `cd landing-page && npm install && npm run dev`
  - Build: `cd landing-page && npm run build`

- **`catalog-page/`** – Post-login catalog / “All Products” experience (Vite + React + Tailwind).
  - Run: `cd catalog-page && npm install && npm run dev`
  - Build: `cd catalog-page && npm run build`

- **`landing-page-mobile/`** – Mobile landing prototype (JSX + CSS snippets).

- **`catalog-page-mobile`** – Placeholder for future mobile catalog work.

## Stack

- **Vite** – Build and dev server
- **React 18** – UI
- **Tailwind CSS** – Styling with design tokens

Each app has its own `package.json`, `public/`, and `src/`. See each folder’s README for details.
