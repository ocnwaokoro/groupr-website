# Plan: Push backend and frontend to respective PR branches

**Goal:** Update your existing PRs with the latest code from this workspace. Push **devenv-main/backend** to the backend PR branch and **devenv-main/frontend** to the frontend PR branch. No code or git commands will be run until you approve this plan.

---

## Current setup (from your record)

| Repo | PR | Branch | Base |
|------|-----|--------|------|
| **gropupr/frontend** | [#163](https://github.com/gropupr/frontend/pull/163) | `feature/catalog-and-search-updates` | `staging` |
| **gropupr/backend** | [#166](https://github.com/gropupr/backend/pull/166) | `feature/catalog-products-per-category` | `staging` |

**Source of truth (this workspace):**
- **Frontend:** `groupr-website/devenv-main/frontend/`
- **Backend:** `groupr-website/devenv-main/backend/`

**Previous push locations (from DEVENV_FRONTEND_PUSH_RECORD):**
- Frontend was cloned to `~/Desktop/frontend-push` (direct push to gropupr/frontend).
- Backend was done “the same way” (clone gropupr/backend, then copy); clone path not specified (could be e.g. `~/Desktop/backend-push` or similar).

---

## Prerequisites (you do these)

1. **Clones**
   - You need a local clone of **gropupr/frontend** (e.g. `~/Desktop/frontend-push` or a new clone).
   - You need a local clone of **gropupr/backend** (e.g. `~/Desktop/backend-push` or wherever you used last time).
   - If you don’t have them, clone outside `groupr-website`:
     - `git clone https://github.com/gropupr/frontend.git ~/Desktop/frontend-push`
     - `git clone https://github.com/gropupr/backend.git ~/Desktop/backend-push`

2. **Branches**
   - In the frontend clone: checkout `feature/catalog-and-search-updates` (create from `staging` if it’s the first time: `git fetch origin && git checkout -b feature/catalog-and-search-updates origin/staging`).
   - In the backend clone: checkout `feature/catalog-products-per-category` (same idea if needed).

3. **Auth**
   - You can push to gropupr/frontend and gropupr/backend (or to your fork and then the PR is from the fork). Plan below assumes you push to **origin** (gropupr repo).

---

## Step 1: Frontend – copy, commit, push

**1.1 Copy latest frontend into the frontend clone**

From the **frontend clone root** (e.g. `~/Desktop/frontend-push`), run:

```bash
rsync -av \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='.vite' \
  --exclude='*.local' \
  --exclude='.git' \
  /Users/ocnwaokoro/Desktop/groupr-website/devenv-main/frontend/ \
  /Users/ocnwaokoro/Desktop/frontend-push/
```

- Replace the last path with your actual frontend clone path if different.
- Trailing slashes matter: first path = contents of `frontend/`, second = clone root.

**1.2 In the frontend clone**

```bash
cd /Users/ocnwaokoro/Desktop/frontend-push   # or your path
git checkout feature/catalog-and-search-updates
git status
git diff
```

- Confirm changes match what you expect (catalog, search, modal, CategoryStrip, SearchResults, etc.).
- Ensure **node_modules**, **dist**, **.env** are not staged.

```bash
git add -A
git commit -m "Catalog and search: search results rows, no View all, breadcrumb and modal fixes, remove Empty/Error demo strip"
git push origin feature/catalog-and-search-updates
```

- PR #163 will update automatically with the new commit.

---

## Step 2: Backend – copy, commit, push

**2.1 Copy latest backend into the backend clone**

From the **backend clone root** (e.g. `~/Desktop/backend-push`), run:

```bash
rsync -av \
  --exclude='tmp' \
  --exclude='log' \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.env' \
  --exclude='.env.*' \
  /Users/ocnwaokoro/Desktop/groupr-website/devenv-main/backend/ \
  /Users/ocnwaokoro/Desktop/backend-push/
```

- Replace the last path with your actual backend clone path if different.

**2.2 In the backend clone**

```bash
cd /Users/ocnwaokoro/Desktop/backend-push   # or your path
git checkout feature/catalog-products-per-category
git status
git diff
```

- Confirm the diff matches your backend changes (controllers, specs, migrations, etc.).

```bash
git add -A
git commit -m "Catalog products: sort indexes, products_per_category, request specs, product import"
git push origin feature/catalog-products-per-category
```

- PR #166 will update automatically.

---

## Summary

| Step | Repo | Clone path (example) | Branch | Action |
|------|------|----------------------|--------|--------|
| 1 | gropupr/frontend | e.g. ~/Desktop/frontend-push | feature/catalog-and-search-updates | Rsync from devenv-main/frontend → clone, commit, push |
| 2 | gropupr/backend | e.g. ~/Desktop/backend-push | feature/catalog-products-per-category | Rsync from devenv-main/backend → clone, commit, push |

**Excludes (important):**
- Frontend: `node_modules`, `dist`, `.env`, `.env.*`, `.vite`, `*.local`, `.git`
- Backend: `tmp`, `log`, `node_modules`, `.git`, `.env`, `.env.*`

**Result:** Both PRs (#163 and #166) will show the latest commits from this workspace. No changes are made to the **groupr-website** repo itself; only the separate frontend and backend clones are updated and pushed.

---

*Approve this plan if you want to proceed; then you can run the commands yourself or ask to have them run step by step.*
