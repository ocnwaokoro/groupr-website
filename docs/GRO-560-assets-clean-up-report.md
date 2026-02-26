# GRO-560: Assets clean-up — Step 1 & 2

**Ticket:** [GRO-560 – Assets clean-up](https://linear.app/groupr/issue/GRO-560/assets-clean-up)  
**Process:** [LINEAR_TICKET_PROCESS.md](../LINEAR_TICKET_PROCESS.md)

---

## Step 1: Identify the ticket and goal

- **Ticket:** GRO-560, title “Assets clean-up”.
- **Goal (one sentence):** Reduce clutter and risk by removing unused or redundant assets and, if needed, clarifying where assets live (e.g. `public/images` vs `src/assets`).

*Note: The Linear issue body wasn’t available (page load error). If the ticket specifies something different (e.g. “only remove unused”, “only consolidate under public”), we’ll adjust scope in Step 3.*

---

## Step 2: Analyze the system

### Where assets live

| Location | Purpose | Count (approx) |
|----------|---------|----------------|
| **`frontend/public/images/`** | Served by path (e.g. `/images/icons/...`). Used by Catalog, CategoryStrip, Pagination, HeroSearch, ProductCard, MerchantInfo, categoryConfig. | 46 files (categories, icons, logo, merchant, products, social) |
| **`frontend/public/`** (root) | `vite.svg`, `logo.svg` — may be Vite defaults or legacy. | 2 files |
| **`frontend/src/assets/`** | Imported in TS/JS (bundled by Vite). Used by Landing, Checkout, Orders, RefundSummary, OrderSummary, Catalog Carousel, NavBar, Footer, getProductImage, useLandingPage. | 38 files |

### How they’re referenced

- **Public (path):** Code uses string paths like `/images/icons/chevron-left.svg`, `/images/categories/produce-category-icon.svg`, `/images/merchant/foodtown-logo.png`. No import.
- **Src/assets (import):** Code uses `import x from '../assets/logo.svg'` (or similar). Build resolves these at bundle time.

### What’s used (from grep)

**From `src/assets` (imported):**

- `placeholder2.svg`, `placeholder3.svg` — getProductImage
- `allCategories.svg` — useLandingPage, OrderList, Carousel Slide1
- `snap_logo.svg` — RefundSummary, OrderSummary
- `logo.svg` — LoadRefundModal, LoadOrderModal, SignUpModal, SignInModal, LeftSideNav
- `Bread.svg` — ValueProposition
- `testimonial1.png`, `testimonial2.png`, `star.svg`, `Carrot.svg` — TestimonialsSection
- `slice-orange.svg` — HowItWorksSection, HowItWorksCard
- `hero_illustration.svg` — HeroSection
- `Carrot.svg`, `Pear.svg`, `Lime.svg`, `Papaya.svg`, `Pepper.svg`, `Cabbage.svg` — CallToActionBanner
- `placeholder_product_image.png` — Checkout ItemsReview
- `carousel2.png` — Carousel Slide2
- `LogoFooter.svg` — Footer

**From `public/images`:** All current references in code are to paths under `/images/` (categories, icons, merchant). No scan for “every file in public” was run; we can add that in the implementation plan if we decide to remove unused public assets too.

### Likely unused in `src/assets`

Files in `src/assets` that do **not** appear in any import in the codebase (from the grep above):

- `cerealCategory.svg`
- `milkCategory.svg`
- `visa_logo.svg`
- `bananaCategory.svg`
- `juiceCategory.svg`
- `breadCategory.svg`
- `foodtown-small-logo.svg`
- `oilCategory.svg`
- `meatCategory.svg`
- `react.svg` (Vite default)
- `placeholder.svg` (placeholder2/3 are used; this one may be legacy)
- `shrimp.png`, `canSauges.png`, `oranges.png`, `beef.png`, `grapes.png`, `apple.png`, `banana.png`, `bacon.png`

**Public root:**

- `public/logo.svg` — may duplicate `src/assets/logo.svg` or be Vite default.
- `public/vite.svg` — typical Vite default; often unused.

### Duplication / overlap

- **Logo:** `src/assets/logo.svg` (NavBar, modals) vs `public/images/logo/groupr-logo.svg` (could be used elsewhere). Need to confirm which screens use which.
- **All categories:** `src/assets/allCategories.svg` (Landing, OrderList, Carousel) vs category icons in `public/images/categories/`. Different use (illustration vs strip icons).
- **Merchant:** `public/images/merchant/foodtown-logo.png` and `.svg` used by MerchantInfo; `src/assets/foodtown-small-logo.svg` not referenced in grep — candidate for removal if truly unused.

### Gaps and risks

- **Unused files** in `src/assets` and possibly in `public` add noise and can cause confusion (“is this still needed?”).
- **Two homes** for assets (public vs src/assets) is valid (path vs import) but can lead to duplicate concepts (e.g. two logos).
- **Naming** is inconsistent (e.g. `Carrot.svg` vs `slice-orange.svg`); optional to standardize in a later pass.

---

## Next: Step 3 (Align on scope)

Before planning changes, we need your confirmation on:

1. **Remove unused only** — Delete only files that are not referenced anywhere (starting with the `src/assets` list above and, if you want, then checking `public`).
2. **Remove unused + consolidate** — Same as (1), plus e.g. move remaining illustration/static assets into a single convention (e.g. all under `public/images/` or all under `src/assets/`) and update imports/paths.
3. **Something else** — If the Linear ticket specifies “only delete X” or “only move Y”, we’ll follow that.

Also: do you want a **quick automated check** (e.g. script or grep) that lists every file in `public` and `src/assets` and marks “referenced” vs “not referenced” before we delete anything? That would make the clean-up safe and auditable.

Once you confirm scope (and whether to include the automated audit), we’ll do **Step 4: Plan exact changes** (file-by-file) and then **Step 5: Confirm before coding**.
