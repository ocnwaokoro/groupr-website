# Plan: Push frontend changes to gropupr/frontend on a new branch (for eventual merge into staging)

**Goal:** Get the **frontend** changes (catalog, search, modal, product cards, etc.) from `groupr-website/devenv-main/frontend/` into **https://github.com/gropupr/frontend**, on a **new branch** that will eventually be merged into the **staging** branch. Use GitHub CLI (`gh`) where helpful.

---

## 1. Correct flow (clarified)

| Repo | Role |
|------|------|
| **gropupr/devenv** | Orchestration repo (docker-compose, setup.sh). When you clone it and run setup, it clones **frontend** and **backend** into `./frontend` and `./backend`. You **pulled from** this. |
| **gropupr/frontend** | The actual React frontend app. Your **changes must be committed here**. The repo root = app root (package.json, src/, public/, etc.). |
| **staging** | Branch on gropupr/frontend into which your work will eventually be merged (not main). |

So:
- **Source of code:** Only the contents of **`groupr-website/devenv-main/frontend/`** (the frontend app you’ve been editing).
- **Target repo:** **gropupr/frontend** (not devenv).
- **Target merge branch:** **staging**. You will create a **feature branch from staging**, push it to your fork, then open a PR **into staging** (not main).

---

## 2. Prerequisites

- **GitHub CLI:** `gh` installed and logged in (`gh auth status`).
- **Access:** You need to be able to push to gropupr/frontend. If you don’t have write access, you will **fork** gropupr/frontend, push your branch to the fork, then open a PR from fork → gropupr/frontend **staging**.
- **staging branch:** Confirm that **staging** exists on gropupr/frontend (e.g. on GitHub or with `git ls-remote origin staging` after cloning). The plan assumes it exists; if the default branch is something else, substitute that as the base for your feature branch.

---

## 3. Solidify package.json (before copying to the fork)

Ensure **`devenv-main/frontend/package.json`** is correct for both **local runs** and **Docker** so nothing is lost when pushing to gropupr/frontend.

**Checklist (do this in `groupr-website/devenv-main/frontend/` before Step 4):**

| Item | Purpose |
|------|---------|
| **Scripts** | `dev` (Vite dev server), `build` (tsc + vite build), `preview`, `test`, `test:watch`, `lint`. These are what the Docker container and README expect (`npm run dev`, `npm test`, etc.). |
| **engines.node** | Set to `">=20"` so it matches the frontend Dockerfile (`node:20-alpine`) and documents the minimum Node version for local runs. Prevents drift between Docker and local. |
| **package-lock.json** | Must be present and committed. The Dockerfile runs `npm ci`, which requires a lockfile; setup/fix-frontend scripts also use `npm ci` when the lockfile exists. When you rsync to the fork, **do not** exclude `package-lock.json` (it’s not in the exclude list below). |
| **Dependencies** | All runtime and build deps already in package.json (React, Vite, Chakra, Tailwind, etc.). No need to add anything unless the app fails to start or build. |

**If you change package.json:** Run `npm install` in `devenv-main/frontend/` (or in the container) so `package-lock.json` stays in sync, then commit both files in groupr-website before copying to the fork.

Result: The frontend runs the same way locally (`npm run dev`) and in Docker (`npm run dev` in the container), and the fork gets a consistent, locked dependency set.

---

## 4. Step-by-step plan

### Step 1: Fork gropupr/frontend (if you need a fork)

If you do **not** have push access to gropupr/frontend:

```bash
gh repo fork https://github.com/gropupr/frontend --clone=false
```

This creates **https://github.com/YOUR_USERNAME/frontend**. You’ll push your branch to this fork and open a PR from your-fork → gropupr/frontend, base branch **staging**.

If you **do** have push access, you can skip forking and clone gropupr/frontend directly; then you’ll push your branch to **origin** (gropupr/frontend) and open a PR there (feature-branch → staging).

---

### Step 2: Clone the repo you’ll push to (fork or upstream)

Clone **outside** the groupr-website repo to avoid mixing histories.

**If you forked (no direct push to gropupr/frontend):**

```bash
cd ~/Desktop
git clone https://github.com/YOUR_USERNAME/frontend.git frontend-fork
cd frontend-fork
```

**If you have push access to gropupr/frontend:**

```bash
cd ~/Desktop
git clone https://github.com/gropupr/frontend.git frontend-repo
cd frontend-repo
```

In both cases, add the upstream remote so you can base your work on **staging**:

```bash
git remote add upstream https://github.com/gropupr/frontend.git
git fetch upstream
```

---

### Step 3: Base your work on staging and create a feature branch

Create a branch from **upstream/staging** (so your PR will be into staging):

```bash
git checkout -b feature/catalog-and-search-updates upstream/staging
```

If **staging** doesn’t exist on upstream, use the default branch (e.g. **main** or **master**) and confirm with the team that the PR should target staging once it exists:

```bash
git branch -a
git checkout -b feature/catalog-and-search-updates upstream/main
```

Your commits will live only on **feature/catalog-and-search-updates**; staging (or main) stays unchanged until the PR is merged.

---

### Step 4: Copy only the frontend app contents (exclude build artifacts and deps)

Copy from **devenv-main/frontend/** into the clone root. Exclude **node_modules**, **dist**, **.env**, and other generated or local-only paths so you don’t overwrite the repo with build artifacts or secrets.

Using **rsync** (recommended):

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
  /Users/ocnwaokoro/Desktop/frontend-fork/
```

- If you used a different clone path (e.g. `~/Desktop/frontend-repo`), replace the last path.
- Trailing slashes matter: first path = contents of frontend dir, second = clone root.
- The clone’s **.git** is untouched (we didn’t copy from a parent that had .git into the clone).

**Alternative (manual):** Copy the contents of `devenv-main/frontend/` into the clone root (e.g. drag in Finder), then delete **node_modules**, **dist**, and any **.env** files from the clone so they aren’t committed.

---

### Step 5: Review and commit

```bash
cd /Users/ocnwaokoro/Desktop/frontend-fork
git status
git diff
```

- Confirm that the changes match what you expect (catalog pages, SearchContext, ProductCard, CategoryStrip, CategoryProductsModal, CategorizedProducts, HeroSearch, NavBar SearchBar, hooks, etc.).
- Ensure **node_modules**, **dist**, and **.env** are not staged (they should be in .gitignore or not present).

Then commit on the feature branch:

```bash
git add -A
git commit -m "Catalog UI and search: client-side search, strip overflow, modal spacing, product card alignment, search override on category page"
```

Use one or several commits as you prefer.

---

### Step 6: Push the feature branch

**If you’re using a fork:**

```bash
git push -u origin feature/catalog-and-search-updates
```

**If you’re pushing directly to gropupr/frontend:**

```bash
git push -u origin feature/catalog-and-search-updates
```

Only the feature branch is pushed; **staging** (and main) are not updated.

---

### Step 7: Open a PR into staging (for eventual merge)

**If you used a fork:** On GitHub, open a PR **from** your fork’s **feature/catalog-and-search-updates** **into** **gropupr/frontend**, base branch **staging**.

**If you pushed to gropupr/frontend:** Open a PR **from** **feature/catalog-and-search-updates** **into** **staging** on the same repo.

Using `gh` (from the clone directory, with the correct base repo and branch):

```bash
gh pr create --base staging --head feature/catalog-and-search-updates --title "Catalog UI and search updates" --body "Catalog and search improvements: client-side search (no q in URL), category strip overflow/arrows, modal spacing, product card title alignment, search results override on category page."
```

If your branch is on a fork, ensure `gh` is pointing at the right repo (e.g. `gh pr create --repo gropupr/frontend --base staging --head YOUR_USERNAME:feature/catalog-and-search-updates ...`).

---

## 4. Summary table

| Step | Action |
|------|--------|
| 1 | Fork gropupr/frontend if you don’t have push access: `gh repo fork gropupr/frontend --clone=false` |
| 2 | Clone your fork (or gropupr/frontend) outside groupr-website; add `upstream` = gropupr/frontend, `git fetch upstream` |
| 3 | Create feature branch **from staging**: `git checkout -b feature/catalog-and-search-updates upstream/staging` |
| — | **Solidify package.json** in devenv-main/frontend: engines.node ≥20, scripts present, package-lock.json in sync and included in copy. |
| 4 | Copy **devenv-main/frontend/** into clone root with rsync (exclude node_modules, dist, .env, .git; **include** package-lock.json) |
| 5 | Review, `git add -A`, `git commit -m "..."` |
| 6 | Push feature branch: `git push -u origin feature/catalog-and-search-updates` |
| 7 | Open PR: **base = staging**, head = your feature branch (fork or same repo) |

---

## 6. Result

- **gropupr/devenv** is unchanged; it was only the source you pulled from.
- **gropupr/frontend** (or your fork) has a new branch **feature/catalog-and-search-updates** with your frontend changes.
- A PR targets **staging** for eventual merge; **main** is not involved unless the team merges staging into main later.

---

## 7. Optional: Keep upstream in sync

To later pull the latest **staging** and update your feature branch:

```bash
git fetch upstream
git checkout feature/catalog-and-search-updates
git merge upstream/staging
# or: git rebase upstream/staging
git push
```
