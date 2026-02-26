# GRO-560: Commit plan (frontend)

One commit for GRO-560 on branch **`021026-bugfixes`** in the **frontend** repo (`devenv-main/frontend`).

---

## 1. Where to run commands

```bash
cd /Users/ocnwaokoro/Desktop/groupr-website/devenv-main/frontend
```

You are already on branch **`021026-bugfixes`**.

---

## 2. Optional: Restore `package-lock.json` (recommended)

`package-lock.json` is currently deleted in the working tree. GRO-560 did not change dependencies. To **keep the commit limited to GRO-560** and avoid committing a lockfile removal:

```bash
git checkout -- package-lock.json
```

If you intentionally removed it for another reason, skip this step.

---

## 3. What will be in the commit

| Type | Summary |
|------|--------|
| **Deleted** | Entire `public/images/` (categories, icons, logo, merchant, products, social) |
| **Deleted** | 19 unused files from old flat `src/assets/` (e.g. `react.svg`, `*Category.svg`, product PNGs) |
| **Deleted** | 20 old flat asset files (moved into subfolders, so they show as D in root) |
| **New** | `src/assets/categories/`, `logo/`, `merchant/`, `payments/`, `landing/`, `placeholders/`, `products/`, `social/` with all moved/renamed assets |
| **Modified** | 22 source files (imports, categoryConfig, Md icons, MerchantInfo) |

---

## 4. Stage and commit

```bash
# Restore lockfile so it’s not part of this commit (optional)
git checkout -- package-lock.json

# Stage everything else (all GRO-560 changes)
git add -A

# Review what’s staged
git status

# One commit for GRO-560 (Linear ID first)
git commit -F - <<'MSG'
GRO-560 Remove public/images; use react-icons and src/assets subfolders

What changed:
- Deleted entire public/images/ (icons, categories, logo, merchant, products, social).
- Replaced every icon that pointed at /images/icons/ with Material Design icons from react-icons/md (chevrons, search, close, add-to-cart, pagination, dropdown).
- Moved all non-icon assets into src/assets under subfolders: categories, logo, merchant, payments, landing, placeholders, products, social.
- Removed 19 unused assets from old flat src/assets; moved and renamed 20 used assets into these subfolders (kebab-case filenames).
- categoryConfig now imports category SVGs from assets and getCategoryIconPath returns those URLs (no /images/ paths).
- MerchantInfo imports foodtown-logo.png from assets/merchant.
- Updated all 22 consuming files to import from the new asset paths.

Result: No references to /images/ remain; icons are react-icons; assets live under src/assets with a consistent structure.
MSG
```

Or use the short subject only (no body):

```bash
git commit -m "GRO-560 Remove public/images; use react-icons and src/assets subfolders"
```

---

## 5. Full commit message (copy-paste for `git commit`)

**Subject (50 chars):**
```text
GRO-560 Remove public/images; use react-icons and src/assets subfolders
```

**Body (what changed + result):**
```text
What changed:
- Deleted entire public/images/ (icons, categories, logo, merchant, products, social).
- Replaced every icon that pointed at /images/icons/ with Material Design icons from react-icons/md (chevrons, search, close, add-to-cart, pagination, dropdown).
- Moved all non-icon assets into src/assets under subfolders: categories, logo, merchant, payments, landing, placeholders, products, social.
- Removed 19 unused assets from old flat src/assets; moved and renamed 20 used assets into these subfolders (kebab-case filenames).
- categoryConfig now imports category SVGs from assets and getCategoryIconPath returns those URLs (no /images/ paths).
- MerchantInfo imports foodtown-logo.png from assets/merchant.
- Updated all 22 consuming files to import from the new asset paths.

Result: No references to /images/ remain; icons are react-icons; assets live under src/assets with a consistent structure.
```

---

## 6. After the commit

- **Push:** `git push origin 021026-bugfixes`
- **PR:** Open a PR from `021026-bugfixes` into `staging`; in the description reference **GRO-560** and, if useful, link to `docs/GRO-560-resolution-process.md` (in the workspace that contains the docs).

---

## 7. Docs (outside frontend repo)

The GRO-560 docs (implementation plan, resolution process, execution order, etc.) live in the **workspace root** `docs/`, not inside `devenv-main/frontend`. If your main repo is the workspace root and you want these docs in version control, commit them there in a separate commit (e.g. “docs: GRO-560 resolution and asset plan”). If the frontend is the only repo you push for this ticket, the code commit above is enough.
