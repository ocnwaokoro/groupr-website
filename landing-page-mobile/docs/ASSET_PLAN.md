# Asset plan – include all assets

## Current situation

- **Files on disk:** All asset files are under `public/` but **not** under `public/images/`.  
  So we have `public/logo/`, `public/icons/`, etc.  
  Vite serves `public/` at the site root, so:
  - `public/logo/groupr-logo.svg` → **`/logo/groupr-logo.svg`**
  - The app instead requests **`/images/logo/groupr-logo.svg`** → 404.

- **Component references:** Every image uses paths like `/images/...` (e.g. `/images/logo/groupr-logo.svg`, `/images/icons/cart-icon.svg`). So the app expects an **`images`** folder under `public/`.

## Plan (3 steps)

### 1. Fix path structure so `/images/*` resolve

- **Create** `public/images/`.
- **Move** (or copy) into `public/images/`:
  - `public/categories/` → `public/images/categories/`
  - `public/decorative/` → `public/images/decorative/`
  - `public/icons/` → `public/images/icons/`
  - `public/logo/` → `public/images/logo/`
  - `public/products/` → `public/images/products/`
  - `public/sections/` → `public/images/sections/`
  - `public/social/` → `public/images/social/`
- **Remove** the old top-level folders from `public/` if we moved them (so we don’t have two copies).
- **Result:** All existing component references (`/images/...`) will work; no code changes needed.

### 2. Use the only unused asset: SNAP/EBT badge

- **Asset:** `public/images/sections/snap-ebt-badge.svg` (already in sections).
- **Change:** In `HeroSection.tsx`, replace the current custom “SNAP/EBT accepted” div (green circle + text) with an `<img src="/images/sections/snap-ebt-badge.svg" alt="SNAP/EBT accepted" />` so the design asset is actually used and all section assets are included.

### 3. Document the full asset map

- **Add** `docs/ASSET_MAPPING.md` (or a section in BUILD_PLAN) that lists:
  - Every file under `public/images/` (by folder: categories, decorative, icons, logo, products, sections, social).
  - Where each is used (component + usage, e.g. “HeroSection – hero illustration”, “Navbar – cart icon”).
  - Any asset not used in the UI (e.g. `search-icon.svg` if we keep the minimal mobile nav without search).
- **Result:** “Include all of the assets” is clearly defined and auditable.

## Summary

| Step | Action | Outcome |
|------|--------|--------|
| 1 | Put all assets under `public/images/` | All `/images/...` URLs work. |
| 2 | Use `snap-ebt-badge.svg` in Hero | All section assets are used. |
| 3 | Add ASSET_MAPPING.md | Full list of assets and where they’re used. |

No new assets need to be added; the desktop `landing-page/public/images/` set is already the source. This plan only fixes paths, wires the last asset into the UI, and documents the mapping.
