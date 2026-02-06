# Post-Login Build – Asset Map

Single reference for **every asset**: where to pull it from, where it lives in post-login, and how to reference it in code.

**Reference rule:** Assets in `post-login/public/` are served from the root. In JSX/TS use:

```ts
// Pattern: path from site root (no "public" in path)
src="/images/logo/groupr-logo.svg"
```

---

## 1. Pull sources

| Source | Meaning |
|--------|--------|
| **groupr** | Copy from `../groupr/public/images/<path>` into `post-login/public/images/<path>` |
| **post-login** | Already in post-login repo (e.g. `account.svg` at root); copy into `public/images/` as needed |
| **new** | Create or add new file in post-login (placeholder or final asset) |

---

## 2. Icons (UI)

| Asset | Pull from | Destination in post-login | Reference in code | Used in |
|-------|-----------|----------------------------|-------------------|---------|
| Logo | groupr | `public/images/logo/groupr-logo.svg` | `/images/logo/groupr-logo.svg` | Navbar, Footer |
| Search | groupr | `public/images/icons/search-icon.svg` | `/images/icons/search-icon.svg` | Navbar, HeroSearch |
| Cart | groupr | `public/images/icons/cart-icon.svg` | `/images/icons/cart-icon.svg` | Navbar |
| Account | post-login | `public/images/icons/account-icon.svg` | `/images/icons/account-icon.svg` | Navbar |
| Dropdown (chevron) | groupr | `public/images/icons/dropdown-icon.svg` | `/images/icons/dropdown-icon.svg` | LanguageToggle |
| Add to cart | groupr | `public/images/icons/add-to-cart-icon.svg` | `/images/icons/add-to-cart-icon.svg` | ProductCard |
| Close (X) | new | `public/images/icons/close-icon.svg` | `/images/icons/close-icon.svg` | PromoBanner |
| Pagination First | new (optional) | `public/images/icons/pagination-first-icon.svg` | `/images/icons/pagination-first-icon.svg` | Pagination |
| Pagination Prev | new (optional) | `public/images/icons/pagination-prev-icon.svg` | `/images/icons/pagination-prev-icon.svg` | Pagination |
| Pagination Next | new (optional) | `public/images/icons/pagination-next-icon.svg` | `/images/icons/pagination-next-icon.svg` | Pagination |
| Pagination Last | new (optional) | `public/images/icons/pagination-last-icon.svg` | `/images/icons/pagination-last-icon.svg` | Pagination |

---

## 3. Category icons (CategoryStrip)

| Category key | Pull from | Destination in post-login | Reference in code | Used in |
|--------------|-----------|----------------------------|-------------------|---------|
| all | groupr | `public/images/categories/all-category-icon.svg` | `/images/categories/all-category-icon.svg` | CategoryStrip |
| produce | groupr | `public/images/categories/produce-category-icon.svg` | `/images/categories/produce-category-icon.svg` | CategoryStrip |
| meat-seafood | groupr | `public/images/categories/meat-seafood-category-icon.svg` | `/images/categories/meat-seafood-category-icon.svg` | CategoryStrip |
| pantry-staples | groupr | `public/images/categories/pantry-staples-category-icon.svg` | `/images/categories/pantry-staples-category-icon.svg` | CategoryStrip |
| dairy-eggs | groupr | `public/images/categories/dairy-eggs-category-icon.svg` | `/images/categories/dairy-eggs-category-icon.svg` | CategoryStrip |
| cereals-snacks | groupr | `public/images/categories/cereals-snacks-category-icon.svg` | `/images/categories/cereals-snacks-category-icon.svg` | CategoryStrip |
| breads-bakery | groupr | `public/images/categories/breads-bakery-category-icon.svg` | `/images/categories/breads-bakery-category-icon.svg` | CategoryStrip |
| beverages | groupr | `public/images/categories/beverages-category-icon.svg` | `/images/categories/beverages-category-icon.svg` | CategoryStrip |

**Code mapping (for CategoryStrip):**

```ts
const CATEGORIES = [
  { id: 'all', label: 'All', icon: '/images/categories/all-category-icon.svg' },
  { id: 'produce', label: 'Produce', icon: '/images/categories/produce-category-icon.svg' },
  { id: 'meat-seafood', label: 'Meat & Seafood', icon: '/images/categories/meat-seafood-category-icon.svg' },
  { id: 'pantry-staples', label: 'Pantry Staples', icon: '/images/categories/pantry-staples-category-icon.svg' },
  { id: 'dairy-eggs', label: 'Dairy & Eggs', icon: '/images/categories/dairy-eggs-category-icon.svg' },
  { id: 'cereals-snacks', label: 'Cereals & Snacks', icon: '/images/categories/cereals-snacks-category-icon.svg' },
  { id: 'breads-bakery', label: 'Breads & Bakery', icon: '/images/categories/breads-bakery-category-icon.svg' },
  { id: 'beverages', label: 'Beverages', icon: '/images/categories/beverages-category-icon.svg' },
];
```

---

## 4. Product images (ProductGrid)

| Product (display name) | Id / slug | Pull from | Destination in post-login | Reference in code | Used in |
|------------------------|-----------|-----------|----------------------------|-------------------|---------|
| $50 Assortment Bag | assortment-50 | groupr | `public/images/products/featured/assortment-bag-50.png` | `/images/products/featured/assortment-bag-50.png` | ProductCard |
| $75 Assortment Bag | assortment-75 | groupr | `public/images/products/featured/assortment-bag-75.png` | `/images/products/featured/assortment-bag-75.png` | ProductCard |
| $100 Assortment Bag | assortment-100 | groupr | `public/images/products/featured/assortment-bag-100.png` | `/images/products/featured/assortment-bag-100.png` | ProductCard |
| Libby's Vienna Sausages | vienna-sausages | groupr | `public/images/products/meat-seafood/vienna-sausages-product.png` | `/images/products/meat-seafood/vienna-sausages-product.png` | ProductCard |
| Goya tomato sauce | goya-tomato | new | `public/images/products/pantry/goya-tomato-sauce-product.png` | `/images/products/pantry/goya-tomato-sauce-product.png` | ProductCard |
| Goya black beans | goya-beans | new | `public/images/products/pantry/goya-black-beans-product.png` | `/images/products/pantry/goya-black-beans-product.png` | ProductCard |
| Bananas | bananas | groupr | `public/images/products/produce/bananas-product.png` | `/images/products/produce/bananas-product.png` | ProductCard |
| Barilla spaghetti | barilla-spaghetti | new | `public/images/products/pantry/barilla-spaghetti-product.png` | `/images/products/pantry/barilla-spaghetti-product.png` | ProductCard |
| Sliced Bacon | sliced-bacon | groupr | `public/images/products/meat-seafood/sliced-bacon-product.png` | `/images/products/meat-seafood/sliced-bacon-product.png` | ProductCard |
| Red Apples | red-apples | groupr | `public/images/products/produce/red-apples-product.png` | `/images/products/produce/red-apples-product.png` | ProductCard |
| Hellmann's mayonnaise | hellmanns-mayo | new | `public/images/products/pantry/hellmanns-mayonnaise-product.png` | `/images/products/pantry/hellmanns-mayonnaise-product.png` | ProductCard |
| Mandarin Oranges | mandarin-oranges | groupr | `public/images/products/produce/mandarin-oranges-product.png` | `/images/products/produce/mandarin-oranges-product.png` | ProductCard |
| Green Seedless Grapes | green-grapes | groupr | `public/images/products/produce/green-seedless-grapes-product.png` | `/images/products/produce/green-seedless-grapes-product.png` | ProductCard |
| Jumbo Uncooked Shrimp | jumbo-shrimp | groupr | `public/images/products/meat-seafood/jumbo-shrimp-product.png` | `/images/products/meat-seafood/jumbo-shrimp-product.png` | ProductCard |
| Beef Hot Dogs | beef-hot-dogs | groupr | `public/images/products/meat-seafood/beef-hot-dogs-product.png` | `/images/products/meat-seafood/beef-hot-dogs-product.png` | ProductCard |

**Code pattern (ProductCard):** each product object has an `image` field set to the reference path above, e.g. `image: '/images/products/featured/assortment-bag-50.png'`. Component uses:

```tsx
<img src={product.image} alt={product.name} />
```

---

## 5. Merchant (MerchantInfo)

| Asset | Pull from | Destination in post-login | Reference in code | Used in |
|-------|-----------|----------------------------|-------------------|---------|
| Foodtown logo | new | `public/images/merchant/foodtown-logo.svg` (or .png) | `/images/merchant/foodtown-logo.svg` | MerchantInfo |

If no logo asset: use text only (“Foodtown”) and omit `img` or use a placeholder.

---

## 6. Social icons (Footer)

| Platform | Pull from | Destination in post-login | Reference in code | Used in |
|----------|-----------|----------------------------|-------------------|---------|
| Facebook | groupr | `public/images/social/facebook-icon.svg` | `/images/social/facebook-icon.svg` | Footer |
| Instagram | groupr | `public/images/social/instagram-icon.svg` | `/images/social/instagram-icon.svg` | Footer |
| LinkedIn | groupr | `public/images/social/linkedin-icon.svg` | `/images/social/linkedin-icon.svg` | Footer |
| X (Twitter) | groupr | `public/images/social/x-icon.svg` | `/images/social/x-icon.svg` | Footer |
| YouTube | groupr | `public/images/social/youtube-icon.svg` | `/images/social/youtube-icon.svg` | Footer |

**Code pattern (Footer):**

```tsx
const SOCIAL_LINKS = [
  { href: '#facebook', label: 'Facebook', icon: '/images/social/facebook-icon.svg' },
  { href: '#instagram', label: 'Instagram', icon: '/images/social/instagram-icon.svg' },
  { href: '#linkedin', label: 'LinkedIn', icon: '/images/social/linkedin-icon.svg' },
  { href: '#x', label: 'X', icon: '/images/social/x-icon.svg' },
  { href: '#youtube', label: 'YouTube', icon: '/images/social/youtube-icon.svg' },
];
```

---

## 7. Folder structure in post-login (after pull)

```
post-login/
├── account.svg                          ← keep at root; copy to public for use
├── public/
│   └── images/
│       ├── logo/
│       │   └── groupr-logo.svg          ← from groupr
│       ├── icons/
│       │   ├── account-icon.svg         ← from post-login/account.svg
│       │   ├── search-icon.svg          ← from groupr
│       │   ├── cart-icon.svg            ← from groupr
│       │   ├── dropdown-icon.svg        ← from groupr
│       │   ├── add-to-cart-icon.svg     ← from groupr
│       │   ├── close-icon.svg           ← new
│       │   └── pagination-*-icon.svg    ← new (optional)
│       ├── categories/
│       │   ├── all-category-icon.svg
│       │   ├── produce-category-icon.svg
│       │   ├── meat-seafood-category-icon.svg
│       │   ├── pantry-staples-category-icon.svg
│       │   ├── dairy-eggs-category-icon.svg
│       │   ├── cereals-snacks-category-icon.svg
│       │   ├── breads-bakery-category-icon.svg
│       │   └── beverages-category-icon.svg
│       ├── products/
│       │   ├── featured/
│       │   │   ├── assortment-bag-50.png
│       │   │   ├── assortment-bag-75.png
│       │   │   └── assortment-bag-100.png
│       │   ├── produce/
│       │   │   ├── bananas-product.png
│       │   │   ├── red-apples-product.png
│       │   │   ├── mandarin-oranges-product.png
│       │   │   └── green-seedless-grapes-product.png
│       │   ├── meat-seafood/
│       │   │   ├── vienna-sausages-product.png
│       │   │   ├── sliced-bacon-product.png
│       │   │   ├── jumbo-shrimp-product.png
│       │   │   └── beef-hot-dogs-product.png
│       │   └── pantry/
│       │       ├── goya-tomato-sauce-product.png
│       │       ├── goya-black-beans-product.png
│       │       ├── barilla-spaghetti-product.png
│       │       └── hellmanns-mayonnaise-product.png
│       ├── merchant/
│       │   └── foodtown-logo.svg        ← new or placeholder
│       └── social/
│           ├── facebook-icon.svg
│           ├── instagram-icon.svg
│           ├── linkedin-icon.svg
│           ├── x-icon.svg
│           └── youtube-icon.svg
```

---

## 8. Reference cheat sheet (how it looks in code)

| Context | How to reference |
|---------|-------------------|
| **Any `<img>` in JSX** | `src="/images/logo/groupr-logo.svg"` (string literal or variable) |
| **Logo component** | `src="/images/logo/groupr-logo.svg"` |
| **Navbar account** | `src="/images/icons/account-icon.svg"` |
| **Search bar** | `src="/images/icons/search-icon.svg"` |
| **Cart** | `src="/images/icons/cart-icon.svg"` |
| **Category card** | `src={category.icon}` where `category.icon` is e.g. `/images/categories/produce-category-icon.svg` |
| **Product card** | `src={product.image}` where `product.image` is e.g. `/images/products/produce/bananas-product.png` |
| **Add to cart button** | `src="/images/icons/add-to-cart-icon.svg"` |
| **Promo banner close** | `src="/images/icons/close-icon.svg"` |
| **Language dropdown** | `src="/images/icons/dropdown-icon.svg"` |
| **Pagination** | `src="/images/icons/pagination-prev-icon.svg"` etc. (or text only) |
| **MerchantInfo** | `src="/images/merchant/foodtown-logo.svg"` |
| **Footer social** | `src={link.icon}` e.g. `/images/social/facebook-icon.svg` |

All paths are **absolute from site root** (start with `/`). Vite serves files in `public/` at `/`, so `public/images/logo/x.svg` → `/images/logo/x.svg`.

---

## 9. Copy checklist (pull from groupr)

Run from repo root or use your own copy method. Paths relative to `groupr-website/`:

- [ ] `groupr/public/images/logo/groupr-logo.svg` → `post-login/public/images/logo/`
- [ ] `groupr/public/images/icons/search-icon.svg` → `post-login/public/images/icons/`
- [ ] `groupr/public/images/icons/cart-icon.svg` → `post-login/public/images/icons/`
- [ ] `groupr/public/images/icons/dropdown-icon.svg` → `post-login/public/images/icons/`
- [ ] `groupr/public/images/icons/add-to-cart-icon.svg` → `post-login/public/images/icons/`
- [ ] All 8 files in `groupr/public/images/categories/` → `post-login/public/images/categories/`
- [ ] All 3 in `groupr/public/images/products/featured/` → `post-login/public/images/products/featured/`
- [ ] All 4 in `groupr/public/images/products/produce/` → `post-login/public/images/products/produce/`
- [ ] All 4 in `groupr/public/images/products/meat-seafood/` → `post-login/public/images/products/meat-seafood/`
- [ ] All 5 in `groupr/public/images/social/` → `post-login/public/images/social/`
- [ ] `post-login/account.svg` → `post-login/public/images/icons/account-icon.svg`

Create new in post-login: `close-icon.svg`; optional pagination icons; `merchant/foodtown-logo.svg`; 4 pantry product images (or placeholders).
