# Post-Login Catalog Page – Assets Checklist

**Build location:** `post-login/` (this asset list is for the post-login app). **Already in Groupr** = copy from `../groupr/public/images/` into `post-login/public/images/`. **Need to add** = add in post-login (or create).

---

## 1. Icons (UI)

| Asset | Use | Size | In Groupr? | Action |
|-------|-----|------|------------|--------|
| **Logo** | Navbar, Footer | 60×52 (nav), 120×104 (footer) | ✅ `logo/groupr-logo.svg` | Reuse |
| **Search** | Navbar search, HeroSearch | 24×24 | ✅ `icons/search-icon.svg` | Reuse |
| **Cart** | Navbar right | 24×24 | ✅ `icons/cart-icon.svg` | Reuse |
| **Account** | Navbar (post-login: “Account” instead of Log in/Sign up) | 24×24 | — | **In post-login** – use `post-login/account.svg` → `post-login/public/images/icons/account-icon.svg` |
| **Dropdown (chevron down)** | Language toggle | 20×20 | ✅ `icons/dropdown-icon.svg` | Reuse |
| **Add to cart** | Product cards (floating button) | 32×32 | ✅ `icons/add-to-cart-icon.svg` | Reuse |
| **Clear / Close** | Promo banner dismiss | 24×24 | ❌ | **Add** – `icons/close-icon.svg` or `clear-icon.svg` (X or close) |
| **Pagination: First** | First page | e.g. 20×20 | ❌ | **Add** – `icons/pagination-first-icon.svg` (skip to start) |
| **Pagination: Back** | Previous page | e.g. 20×20 | ❌ | **Add** – `icons/pagination-prev-icon.svg` (chevron left) |
| **Pagination: Next** | Next page | e.g. 20×20 | ❌ | **Add** – `icons/pagination-next-icon.svg` (chevron right) |
| **Pagination: Last** | Last page | e.g. 20×20 | ❌ | **Add** – `icons/pagination-last-icon.svg` (skip to end) |

---

## 2. Category Icons (CategoryStrip)

All used inside category cards (98×98 display area). Groupr already has these:

| Category | In Groupr? | Path |
|----------|------------|------|
| All | ✅ | `categories/all-category-icon.svg` |
| Produce | ✅ | `categories/produce-category-icon.svg` |
| Meat & Seafood | ✅ | `categories/meat-seafood-category-icon.svg` |
| Pantry Staples | ✅ | `categories/pantry-staples-category-icon.svg` |
| Dairy & Eggs | ✅ | `categories/dairy-eggs-category-icon.svg` |
| Cereals & Snacks | ✅ | `categories/cereals-snacks-category-icon.svg` |
| Breads & Bakery | ✅ | `categories/breads-bakery-category-icon.svg` |
| Beverages | ✅ | `categories/beverages-category-icon.svg` |

**Action:** Reuse all from Groupr; no new category assets.

---

## 3. Product Images (ProductGrid)

Product cards use ~300×280 image area. List by product name and Groupr path.

| Product | In Groupr? | Path / Note |
|---------|------------|-------------|
| $50 Assortment Bag | ✅ | `products/featured/assortment-bag-50.png` |
| $75 Assortment Bag | ✅ | `products/featured/assortment-bag-75.png` |
| $100 Assortment Bag | ✅ | `products/featured/assortment-bag-100.png` |
| Libby's Vienna Sausages | ✅ | `products/meat-seafood/vienna-sausages-product.png` |
| Goya tomato sauce | ❌ | **Add** – e.g. `products/pantry/goya-tomato-sauce-product.png` |
| Goya black beans | ❌ | **Add** – e.g. `products/pantry/goya-black-beans-product.png` |
| Bananas | ✅ | `products/produce/bananas-product.png` |
| Barilla spaghetti | ❌ | **Add** – e.g. `products/pantry/barilla-spaghetti-product.png` |
| Sliced Bacon | ✅ | `products/meat-seafood/sliced-bacon-product.png` |
| Red Apples | ✅ | `products/produce/red-apples-product.png` |
| Hellmann's mayonnaise | ❌ | **Add** – e.g. `products/pantry/hellmanns-mayonnaise-product.png` |
| Mandarin Oranges | ✅ | `products/produce/mandarin-oranges-product.png` |
| Green Seedless Grapes | ✅ | `products/produce/green-seedless-grapes-product.png` |
| Jumbo Uncooked Shrimp | ✅ | `products/meat-seafood/jumbo-shrimp-product.png` |
| Beef Hot Dogs | ✅ | `products/meat-seafood/beef-hot-dogs-product.png` |

**Action:** Reuse existing; add 4 pantry product images (Goya tomato, Goya black beans, Barilla spaghetti, Hellmann's) or use placeholders until assets exist.

---

## 4. Merchant / Fulfillment (MerchantInfo)

| Asset | Use | In Groupr? | Action |
|-------|-----|------------|--------|
| **Foodtown logo** | “Items Fulfilled by: Foodtown” | ❌ | **Add** – `images/merchant/foodtown-logo.svg` (or .png). Or use a placeholder rectangle with “Foodtown” text until logo is provided. |

---

## 5. Footer / Social (reuse from Groupr)

| Asset | Path |
|-------|------|
| Facebook | ✅ `social/facebook-icon.svg` |
| Instagram | ✅ `social/instagram-icon.svg` |
| LinkedIn | ✅ `social/linkedin-icon.svg` |
| X (Twitter) | ✅ `social/x-icon.svg` |
| YouTube | ✅ `social/youtube-icon.svg` |

**Action:** Reuse; no new social assets.

---

## 6. Summary – What You Need to Provide or Add

| Category | Count | Assets to add |
|----------|-------|----------------|
| **Icons** | 6 | `account-icon.svg` (you have `post-login/account.svg`), `close-icon.svg`, `pagination-first-icon.svg`, `pagination-prev-icon.svg`, `pagination-next-icon.svg`, `pagination-last-icon.svg` |
| **Category icons** | 0 | None – all in Groupr |
| **Product images** | 4 | Goya tomato sauce, Goya black beans, Barilla spaghetti, Hellmann's mayonnaise (or placeholders) |
| **Merchant** | 1 | Foodtown logo (or text placeholder) |

---

## 7. Recommended Placements (in **post-login**)

Copy from Groupr into `post-login/public/images/` or create new files there:

```
post-login/public/images/
├── icons/
│   ├── account-icon.svg      ← copy from post-login/account.svg (same repo)
│   ├── close-icon.svg        ← NEW (X / close for promo banner)
│   ├── pagination-*.svg      ← optional
│   ├── search-icon.svg       ← copy from groupr
│   ├── cart-icon.svg         ← copy from groupr
│   ├── add-to-cart-icon.svg  ← copy from groupr
│   └── dropdown-icon.svg     ← copy from groupr
├── logo/
│   └── groupr-logo.svg       ← copy from groupr
├── categories/               ← copy all 8 from groupr
├── products/                 ← copy featured, produce, meat-seafood from groupr; add pantry
├── merchant/
│   └── foodtown-logo.svg     ← NEW or use text
└── social/                   ← copy all from groupr
```

---

## 8. Optional: Pagination Icons

Pagination can be built **without** custom icons by using:

- **Text only:** “First”, “Back”, “Next”, “Last” (no arrows), or  
- **Unicode / inline SVG:** e.g. « ‹ › » or simple arrow SVGs in the component.

So pagination icons are **optional** if you prefer text or inline SVG.

---

## Quick checklist (for **post-login** app)

- [ ] **account-icon.svg** – Use `post-login/account.svg` in `post-login/public/images/icons/account-icon.svg`
- [ ] **close-icon.svg** – For promo banner dismiss (or use “×” text)
- [ ] **Pagination** – Either 4 arrow/skip icons or text/inline SVG
- [ ] **Foodtown logo** – Or use “Foodtown” text only in post-login
- [ ] **Pantry product photos (4)** – In post-login (or placeholders)
- [ ] **Copy from Groupr** – Logo, category icons, product images, social icons, UI icons into `post-login/public/images/`

Build lives in **post-login**; Groupr is the asset/design source to copy from.
