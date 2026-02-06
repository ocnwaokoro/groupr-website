# Asset Mapping Table - Found Assets

## ✅ Confirmed Assets Found

| Placeholder Name | Component Location | Found Asset Path | Status |
|-----------------|-------------------|------------------|--------|
| **Logo (Navbar & Footer)** | Logo component | `site/assets/groupr-logo.svg` | ✅ Confirmed |
| **Search Icon** | SearchBar component | `site/assets/Icon.svg` | ✅ Confirmed |
| **Cart Icon** | Navbar component | `site/assets/cart.svg` | ✅ Confirmed |
| **Hero Illustration** | HeroSection | `site/assets/Illustration@2x.svg` | ✅ Found |
| **Language Dropdown Icon** | Navbar | `design/landing-page-login-2/Home/Logged Out/Icon/keyboard_arrow_down.svg` | ✅ Found |
| **Add to Cart Icon** | ProductCard | `design/landing-page-login-2/Home/Logged Out/Add-to-cart-button/Icon/add.svg` | ✅ Found |
| **FAQ Accordion Icon** | AccordionItem | `design/landing-page-login-2/Home/Logged Out/Icon/keyboard_arrow_down.svg` | ✅ Found (same as dropdown) |
| **Radio Button Icon** | ContactSection | `design/landing-page-login-2/Home/Logged Out/Icon/radio_button_unchecked.svg` | ✅ Found |
| **Orange Slice (Decorative)** | HowItWorksSection | `design/landing-page-login-2/Home/Logged Out/Orange Slice.svg` | ✅ Found |
| **Bread Icon (Decorative)** | SnapBenefitsSection | `design/landing-page-login-2/Home/Logged Out/Bread.svg` | ✅ Found |
| **Carrot Icon (Decorative)** | TestimonialSection | `design/landing-page-login-2/Home/Logged Out/Carrot.svg` | ✅ Found |

## 📦 Product Images Found

| Placeholder Name | Component Location | Found Asset Path | Status |
|-----------------|-------------------|------------------|--------|
| **$50 Assortment Bag** | ProductCard | `design/groupr-web-app-img/source/Grocery Bag 50.png` | ✅ Found |
| **$75 Assortment Bag** | ProductCard | `design/groupr-web-app-img/source/Grocery Bag 75.png` | ✅ Found |
| **$100 Assortment Bag** | ProductCard | `design/groupr-web-app-img/source/Grocery Bag 100.png` | ✅ Found |
| **Bananas** | ProductCard | `design/groupr-web-app-img/source/Fresh Bananas.png` | ✅ Found |
| **Red Apples** | ProductCard | `design/groupr-web-app-img/source/Red Apples, 4 lbs.png` | ✅ Found |
| **Mandarin Oranges** | ProductCard | `design/groupr-web-app-img/source/Mandarins, 5 lbs.png` | ✅ Found |
| **Green Seedless Grapes** | ProductCard | `design/groupr-web-app-img/source/Green Seedless Grapes.png` | ✅ Found |
| **Libby's Vienna Sausages** | ProductCard | `design/groupr-web-app-img/source/Libby's Vienna Sausages (4.6 oz).png` | ✅ Found |
| **Sliced Bacon** | ProductCard | `design/groupr-web-app-img/source/Kirkland Signature Sliced Bacon, Hickory Smoked, 1 lb, 4 ct _ Costco-1.png` | ✅ Found |
| **Jumbo Uncooked Shrimp** | ProductCard | `design/groupr-web-app-img/source/Extra Jumbo Uncooked Shrimp, 1.5 lbs. (31-38 Shrimp)_converted.png` | ✅ Found |
| **Beef Hot Dogs** | ProductCard | `design/groupr-web-app-img/source/Nathan's Famous Skinless Bun Length Beef Franks, 28 ct.png` | ✅ Found |

## 🖼️ Section Images Found

| Placeholder Name | Component Location | Found Asset Path | Status |
|-----------------|-------------------|------------------|--------|
| **Benefits Image** | BenefitsSection | `design/groupr-web-app-img/source/two women.png` | ✅ Found (likely) |
| **Testimonial Image** | TestimonialSection | `design/groupr-web-app-img/source/woman and kid.png` | ✅ Found (likely) |
| **CTA Background** | CtaSection | *Need to check if exists* | ⚠️ Unknown |

## 🎨 Category Icons - Need Mapping

Found Frame icons (need to determine which category each represents):

| Frame File | Possible Category | Status |
|-----------|------------------|--------|
| `Frame.svg` | All (likely) | ✅ Found |
| `Frame-1.svg` | ? | ✅ Found |
| `Frame-2.svg` | ? | ✅ Found |
| `Frame-3.svg` | ? | ✅ Found |
| `Frame-4.svg` | ? | ✅ Found |
| `Frame-5.svg` | ? | ✅ Found |
| `Frame-6.svg` | ? | ✅ Found |
| `Frame-7.svg` | ? | ✅ Found |

**Location**: `design/landing-page-login-2/Home/Logged Out/Frame*.svg`

## 🌐 Social Media Icons Found

| Placeholder Name | Component Location | Found Asset Path | Status |
|-----------------|-------------------|------------------|--------|
| **Social Icon 1** | Footer | `design/landing-page-login-2/Home/Logged Out/Social Icon/Icon/Facebook.svg` | ✅ Found |
| **Social Icon 2** | Footer | `design/landing-page-login-2/Home/Logged Out/Social Icon/Icon/Instagram.svg` | ✅ Found |
| **Social Icon 3** | Footer | `design/landing-page-login-2/Home/Logged Out/Social Icon/Icon/LinkedIn.svg` | ✅ Found |
| **Social Icon 4** | Footer | `design/landing-page-login-2/Home/Logged Out/Social Icon/Icon/X.svg` | ✅ Found |
| **Social Icon 5** | Footer | `design/landing-page-login-2/Home/Logged Out/Social Icon/Icon/Youtube.svg` | ✅ Found |

## ⚠️ Missing/Unclear Assets

| Placeholder Name | Component Location | Status | Notes |
|-----------------|-------------------|--------|-------|
| **Category Icons (8)** | CategoryCard | ⚠️ Need mapping | Frame-1 through Frame-7 + Frame.svg exist, need to match to categories |
| **CTA Background Image** | CtaSection | ❓ Unknown | May need to check other image folders |
| **Star Icons** | TestimonialSection | ✅ Keep SVG | Currently using inline SVG (can keep) |

## 📋 Summary

- **Total Assets Needed**: ~35
- **Found & Confirmed**: 28
- **Found but Need Mapping**: 8 (category icons)
- **Missing**: 1 (CTA background - may exist elsewhere)
- **Keep as SVG**: 1 (Star icons - already implemented)

## 🎯 Next Steps

1. **Confirm category icon mapping** - Need to determine which Frame icon goes with which category
2. **Find CTA background** - Check if exists in other folders
3. **Copy all assets** - Once confirmed, copy to `groupr/public/images/` with organized structure
