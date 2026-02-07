# Groupr Website

Affordable grocery delivery for NYC residents (SNAP/EBT). This repo contains the marketing site, post-login catalog, mobile prototypes, and the shared development environment (devenv).

## Structure

- **`landing-page/`** – Main marketing site (Vite + React + Tailwind).
  - Run: `cd landing-page && npm install && npm run dev`
  - Build: `cd landing-page && npm run build`

- **`catalog-page/`** – Post-login catalog / "All Products" experience (Vite + React + Tailwind).
  - Run: `cd catalog-page && npm install && npm run dev`
  - Build: `cd catalog-page && npm run build`

- **`landing-page-mobile/`** – Mobile landing (Vite + React + Tailwind). Run: `cd landing-page-mobile && npm install && npm run dev`

- **`catalog-page-mobile/`** – Mobile catalog (Vite + React + Tailwind). Run: `cd catalog-page-mobile && npm install && npm run dev`

## Stack

- **Vite** – Build and dev server
- **React 18** – UI
- **Tailwind CSS** – Styling with design tokens

Each app has its own `package.json`, `public/`, and `src/`. See each folder's README for details.

---

## Development environment (devenv)

The project can use a containerized setup with backend (Rails), frontend (React), and PostgreSQL. The layout is:

```
.
├── backend/           # Rails API application
├── frontend/         # React frontend application
├── docker-compose.yml
└── setup.sh          # Development environment setup script
```

### Prerequisites

- Docker and Docker Compose
- Git
- SSH key configured for the repositories

### Setup

1. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   This will clone frontend/backend if missing, build DB, then backend and frontend.

2. Access:
   - Frontend: http://localhost:4000
   - Backend API: http://localhost:3000

### Commands

- Backend console: `docker-compose run --rm backend rails c`
- Backend tests: `docker-compose run --rm backend rspec`
- Frontend tests: `docker-compose run --rm frontend npm test`

### Troubleshooting

- Ensure ports 3000, 4000, 5432 are free.
- Rebuild: `docker-compose build --no-cache`
- Logs: `docker-compose logs -f [service_name]`
