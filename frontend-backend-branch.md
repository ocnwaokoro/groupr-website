Workflow for pushing your work to a **new branch** from the devenv folders:

---

## Backend (`devenv-main/backend`)

```bash
cd /Users/ocnwaokoro/Desktop/groupr-website/devenv-main/backend

# 1. Make sure you're up to date with staging
git fetch origin
git checkout staging
git pull origin staging

# 2. Create and switch to your new branch (name it for the feature)
git checkout -b feature/your-feature-name

# 3. Make your changes, then stage and commit
git add -A
git status   # double-check what you're committing
git commit -m "Short description of the change"

# 4. Push the new branch to GitHub
git push origin feature/your-feature-name
```

Then on GitHub: open a PR **from** `feature/your-feature-name` **into** `staging`.

---

## Frontend (`devenv-main/frontend`)

Same pattern:

```bash
cd /Users/ocnwaokoro/Desktop/groupr-website/devenv-main/frontend

git fetch origin
git checkout staging
git pull origin staging

git checkout -b feature/your-feature-name

git add -A
git status
git commit -m "Short description of the change"

git push origin feature/your-feature-name
```

Then open a PR from `feature/your-feature-name` into `staging`.

---

## One-line summary

**New branch from latest staging → work → commit → push branch → open PR into staging.**

If you want, we can add a short `docs/GIT_WORKFLOW.md` (or a `scripts/` helper) in `devenv-main` with this so it’s easy to copy-paste next time.