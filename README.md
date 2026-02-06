# Groupr Website

Affordable grocery delivery for NYC residents (SNAP/EBT). This repo contains design reference and a React app.

## Structure

- **`design/`** – Source material (exported layout, typography doc, and asset folders).
  - `site.jsx` – Original single-file layout reference.
  - `text-styles.md` – Typography and text styles.
  - `landing-page-login-2/` – SVG assets (logos, icons, illustrations).
  - `groupr-web-app-img/` – PNG assets (hero images, product photos).

- **`app/`** – React app (Vite + React + Tailwind).
  - Run: `cd app && npm install && npm run dev`
  - Build: `cd app && npm run build`
  - Preview build: `cd app && npm run preview`

## App stack

- **Vite** – Build and dev server
- **React 18** – UI
- **Tailwind CSS** – Styling with design tokens
- **Assets** – Logos, icons, illustrations, and images live under `app/src/assets/` and are imported in components.

Open [http://localhost:5174](http://localhost:5174) (or the port Vite prints) after running `npm run dev` in `app/`.
