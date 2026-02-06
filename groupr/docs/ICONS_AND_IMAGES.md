# Icons and Images Documentation - Groupr Website

## Overview
This document catalogs all icons, images, and visual assets referenced in the Groupr website codebase. All images in the original design (`1.txt`) have empty `src` attributes, indicating they are placeholders that need to be replaced with actual assets.

---

## 🎨 Icons (UI Elements)

### 1. **Logo** 
- **Location**: Navbar (top-left), Footer
- **Original Reference**: `styles.vectorGroupIcon` / `styles.logo`
- **Current Implementation**: Placeholder div with "G" text
- **Size**: 60px × 52px (Navbar), 120px × 104px (Footer)
- **File Needed**: `logo.svg` or `logo.png`
- **Usage**: Brand identity, appears in header and footer

### 2. **Search Icon**
- **Location**: SearchBar component (Navbar)
- **Original Reference**: `styles.icon` inside search input
- **Current Implementation**: SVG search icon (Heroicons)
- **Size**: 24px × 24px
- **Status**: ✅ Implemented with SVG
- **File Needed**: None (using inline SVG)

### 3. **Cart Icon**
- **Location**: Navbar (right side, next to Sign up button)
- **Original Reference**: `styles.icon` inside `styles.navLinkicon`
- **Current Implementation**: SVG shopping cart icon (Heroicons)
- **Size**: 24px × 24px
- **Status**: ✅ Implemented with SVG
- **File Needed**: None (using inline SVG)

### 4. **Language Toggle Dropdown Icon**
- **Location**: Navbar (below main nav, left side)
- **Original Reference**: `styles.iconKeyboardArrowDown`
- **Current Implementation**: SVG chevron down icon
- **Size**: 20px × 20px
- **Status**: ✅ Implemented with SVG
- **File Needed**: None (using inline SVG)

### 5. **Add to Cart Icon** (Product Cards)
- **Location**: ProductCard component (floating button on product images)
- **Original Reference**: `styles.iconAdd` inside `styles.addToCartButtonclosed`
- **Current Implementation**: SVG plus icon (+)
- **Size**: 32px × 32px
- **Status**: ✅ Implemented with SVG
- **File Needed**: None (using inline SVG)

### 6. **FAQ Accordion Expand/Collapse Icon**
- **Location**: AccordionItem component (FAQ section)
- **Original Reference**: `styles.icon3` inside `styles.question`
- **Current Implementation**: SVG chevron down icon (rotates when open)
- **Size**: 32px × 32px
- **Status**: ✅ Implemented with SVG
- **File Needed**: None (using inline SVG)

### 7. **Star Icons** (Testimonial)
- **Location**: TestimonialSection (5 stars for rating)
- **Original Reference**: `styles.vectorIcon` (5 instances)
- **Current Implementation**: SVG star icons (filled)
- **Size**: 20px × 18.9px
- **Status**: ✅ Implemented with SVG
- **File Needed**: None (using inline SVG)

### 8. **Radio Button Icons** (Contact Form)
- **Location**: ContactSection - "How can we assist?" radio group
- **Original Reference**: `styles.icon` inside `styles.selectionWrapper` (6 instances)
- **Current Implementation**: Native HTML radio inputs
- **Status**: ✅ Implemented with native inputs
- **File Needed**: None

### 9. **Textarea Resize Icon**
- **Location**: ContactSection - Message textarea
- **Original Reference**: `styles.multilineIcon` (bottom-right corner)
- **Current Implementation**: Not implemented (textarea has native resize)
- **Size**: 6px × 6px
- **File Needed**: Optional - small resize handle icon

---

## 🖼️ Images (Photos/Illustrations)

### 1. **Hero Illustration**
- **Location**: HeroSection (right side, behind text)
- **Original Reference**: `styles.illustrationIcon`
- **Current Implementation**: Placeholder div with text "Hero Illustration"
- **Size**: 633.5px × 600.7px
- **Position**: Absolute, top: 132.81px, left: 791.75px
- **File Needed**: `hero-illustration.png` or `hero-illustration.svg`
- **Description**: Main hero image showing grocery delivery concept

### 2. **Orange Slice Icon** (Decorative)
- **Location**: HowItWorksSection (left side, decorative element)
- **Original Reference**: `styles.orangeSliceIcon`
- **Current Implementation**: Placeholder div
- **Size**: 8.67% width × 30.22% height of section
- **Position**: Absolute, top: 13.35%, left: 1.94%
- **File Needed**: `orange-slice.svg` or `orange-slice.png`
- **Description**: Decorative fruit illustration

### 3. **Bread Icon** (Decorative)
- **Location**: SnapBenefitsSection (right side)
- **Original Reference**: `styles.breadIcon`
- **Current Implementation**: Placeholder div
- **Size**: 13.79% width × 60.95% height of section
- **Position**: Absolute, top: 25.27%, right: 8.22%
- **File Needed**: `bread-icon.svg` or `bread-icon.png`
- **Description**: Decorative bread illustration

### 4. **Category Icons** (8 total)
- **Location**: ProductsSection - CategoryRow
- **Original Reference**: `styles.frameIcon`, `styles.frameIcon2` (various)
- **Current Implementation**: Placeholder divs with first letter of category
- **Size**: 98px × 98px each
- **Categories**:
  1. **All** - `styles.frameIcon`
  2. **Produce** - `styles.frameIcon2`
  3. **Meat & Seafood** - `styles.frameIcon2`
  4. **Pantry Staples** - `styles.frameIcon2`
  5. **Dairy & Eggs** - `styles.frameIcon2`
  6. **Cereals & Snacks** - `styles.frameIcon2`
  7. **Breads & Bakery** - `styles.frameIcon2`
  8. **Beverages** - `styles.frameIcon2`
- **Files Needed**: 
  - `category-all.svg`
  - `category-produce.svg`
  - `category-meat-seafood.svg`
  - `category-pantry.svg`
  - `category-dairy-eggs.svg`
  - `category-cereals-snacks.svg`
  - `category-breads-bakery.svg`
  - `category-beverages.svg`

### 5. **Product Images** (11 total)
- **Location**: ProductsSection - ProductCard components
- **Original Reference**: `styles.imageIcon` (multiple instances)
- **Current Implementation**: Placeholder divs with "Product Image" text
- **Size**: 300px × 280px each
- **Products**:
  - **Featured Products** (3):
    1. $50 Assortment Bag
    2. $75 Assortment Bag
    3. $100 Assortment Bag
  - **Produce** (4):
    1. Bananas
    2. Red Apples
    3. Mandarin Oranges
    4. Green Seedless Grapes
  - **Meat & Seafood** (4):
    1. Libby's Vienna Sausages
    2. Sliced Bacon
    3. Jumbo Uncooked Shrimp
    4. Beef Hot Dogs
- **Files Needed**: Product photos (JPG/PNG format recommended)
  - `product-50-bag.jpg`
  - `product-75-bag.jpg`
  - `product-100-bag.jpg`
  - `product-bananas.jpg`
  - `product-red-apples.jpg`
  - `product-mandarin-oranges.jpg`
  - `product-grapes.jpg`
  - `product-vienna-sausages.jpg`
  - `product-bacon.jpg`
  - `product-shrimp.jpg`
  - `product-hot-dogs.jpg`

### 6. **Benefits Section Image**
- **Location**: BenefitsSection (right side)
- **Original Reference**: `styles.imageIcon12`
- **Current Implementation**: Placeholder div
- **Size**: 600px × 600px
- **Border Radius**: 32px (rounded corners)
- **File Needed**: `benefits-image.jpg` or `benefits-image.png`
- **Description**: Image showing benefits of the service

### 7. **Testimonial Image**
- **Location**: TestimonialSection (left side)
- **Original Reference**: `styles.imageIcon12` (same class name as benefits)
- **Current Implementation**: Placeholder div
- **Size**: 600px × 600px
- **Border Radius**: 32px (rounded corners)
- **File Needed**: `testimonial-image.jpg` or `testimonial-image.png`
- **Description**: Customer photo or testimonial visual

### 8. **Carrot Icon** (Decorative)
- **Location**: TestimonialSection (bottom-right corner)
- **Original Reference**: `styles.carrotIcon`
- **Current Implementation**: Placeholder div
- **Size**: 11.42% width × 18.9% height of section
- **Position**: Absolute, top: 70.3%, right: 4.42%
- **File Needed**: `carrot-icon.svg` or `carrot-icon.png`
- **Description**: Decorative vegetable illustration

### 9. **CTA Background Image**
- **Location**: CtaSection (background, behind text)
- **Original Reference**: `styles.foodBackgroundIcon`
- **Current Implementation**: Placeholder div
- **Size**: 1546px × 491.3px
- **Position**: Absolute, top: 9.77px, left: 0.48px
- **File Needed**: `cta-background.jpg` or `cta-background.png`
- **Description**: Food/grocery background image for final CTA section

### 10. **Social Media Icons** (5 total)
- **Location**: Footer (bottom-right, credits section)
- **Original Reference**: `styles.socialIconIconFacebook` (5 instances)
- **Current Implementation**: Placeholder divs
- **Size**: 24px × 24px each
- **Platforms**: Not specified in original (likely Facebook, Instagram, Twitter, LinkedIn, etc.)
- **Files Needed**: 
  - `social-facebook.svg`
  - `social-instagram.svg`
  - `social-twitter.svg`
  - `social-linkedin.svg`
  - `social-youtube.svg` (or other platform)

---

## 📊 Summary

### Icons Status
- **Total Icons**: 9 types
- **Implemented with SVG**: 6 (Search, Cart, Dropdown, Add to Cart, Accordion, Stars)
- **Using Native HTML**: 1 (Radio buttons)
- **Needs Implementation**: 2 (Logo, Textarea resize icon - optional)

### Images Status
- **Total Images**: 10 types (30+ individual images)
- **Implemented**: 0 (all placeholders)
- **Needs Assets**: 30+ files

### Breakdown by Category

| Category | Count | Status |
|----------|-------|--------|
| Logo | 1 | ⚠️ Needs asset |
| UI Icons | 6 | ✅ SVG implemented |
| Decorative Icons | 3 | ⚠️ Needs assets (Orange slice, Bread, Carrot) |
| Category Icons | 8 | ⚠️ Needs assets |
| Product Images | 11 | ⚠️ Needs assets |
| Section Images | 3 | ⚠️ Needs assets (Hero, Benefits, Testimonial) |
| Background Image | 1 | ⚠️ Needs asset (CTA) |
| Social Icons | 5 | ⚠️ Needs assets |

---

## 📁 Recommended File Structure

```
public/
├── images/
│   ├── logo/
│   │   ├── logo.svg (or logo.png)
│   ├── hero/
│   │   ├── hero-illustration.png
│   ├── decorative/
│   │   ├── orange-slice.svg
│   │   ├── bread-icon.svg
│   │   └── carrot-icon.svg
│   ├── categories/
│   │   ├── category-all.svg
│   │   ├── category-produce.svg
│   │   ├── category-meat-seafood.svg
│   │   ├── category-pantry.svg
│   │   ├── category-dairy-eggs.svg
│   │   ├── category-cereals-snacks.svg
│   │   ├── category-breads-bakery.svg
│   │   └── category-beverages.svg
│   ├── products/
│   │   ├── featured/
│   │   │   ├── product-50-bag.jpg
│   │   │   ├── product-75-bag.jpg
│   │   │   └── product-100-bag.jpg
│   │   ├── produce/
│   │   │   ├── product-bananas.jpg
│   │   │   ├── product-red-apples.jpg
│   │   │   ├── product-mandarin-oranges.jpg
│   │   │   └── product-grapes.jpg
│   │   └── meat-seafood/
│   │       ├── product-vienna-sausages.jpg
│   │       ├── product-bacon.jpg
│   │       ├── product-shrimp.jpg
│   │       └── product-hot-dogs.jpg
│   ├── sections/
│   │   ├── benefits-image.jpg
│   │   ├── testimonial-image.jpg
│   │   └── cta-background.jpg
│   └── social/
│       ├── social-facebook.svg
│       ├── social-instagram.svg
│       ├── social-twitter.svg
│       ├── social-linkedin.svg
│       └── social-youtube.svg
```

---

## 🎯 Priority for Asset Creation

### High Priority (Visible Above Fold)
1. **Logo** - Appears in navbar immediately
2. **Hero Illustration** - Main visual on homepage
3. **Featured Product Images** (3) - First products users see

### Medium Priority (Visible on Scroll)
4. **Category Icons** (8) - Important for navigation
5. **Product Images** (8 remaining) - Core content
6. **Benefits Image** - Supports messaging
7. **Testimonial Image** - Builds trust

### Low Priority (Decorative/Footer)
8. **Decorative Icons** (3) - Orange slice, Bread, Carrot
9. **CTA Background** - Final section
10. **Social Icons** (5) - Footer only

---

## 💡 Notes

- All original images have empty `alt=""` attributes - should be updated with descriptive alt text for accessibility
- SVG format recommended for icons and logos (scalable, smaller file size)
- JPG/PNG format recommended for product photos and section images
- Consider using WebP format for better compression on product images
- All placeholder divs currently have background colors matching the design system
- Image dimensions are specified in pixels from the original CSS - consider responsive sizing
