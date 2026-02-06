# Detailed Build Plan - Groupr Website

## 🎯 Overview
Build the Groupr grocery delivery website component by component, starting with foundation UI components and building up to complete sections.

---

## 📋 Phase 1: Foundation UI Components (Build First)

### 1. Logo Component
**File**: `src/components/ui/Logo.tsx`
- **Purpose**: Simple logo placeholder (will use SVG/icon later)
- **Props**: `className?` (optional)
- **Styling**: Height 52px, width 60px (from 2.txt)
- **Usage**: Navbar, Footer
- **Status**: ⏳ Ready to build

### 2. Button Component
**File**: `src/components/ui/Button.tsx`
- **Purpose**: Reusable button with variants
- **Props**: 
  - `variant: 'primary' | 'outline'`
  - `size: 'sm' | 'lg'` (default: lg)
  - `children: ReactNode`
  - `onClick?: () => void`
- **Variants**:
  - **Primary**: Orange background (`#ffa454`), dark text
  - **Outline**: Border (`#fc8c30` or `#00473d`), transparent bg
- **Sizes**:
  - **sm**: `12px 20px` padding
  - **lg**: `20px 24px` padding, height 64px
- **Styling**: Border radius 12px, font-weight 600
- **Usage**: Everywhere (Navbar, Hero, Sections, Footer)
- **Status**: ⏳ Ready to build

### 3. NavLink Component
**File**: `src/components/ui/NavLink.tsx`
- **Purpose**: Navigation link with hover underline
- **Props**: 
  - `href: string`
  - `children: ReactNode`
  - `active?: boolean`
- **Styling**: 
  - Font: Inter, 16px, weight 500
  - Color: `#003c34` (text-dark)
  - Hover: Underline border (2px, initially hidden)
  - Padding: `0px 16px`, `8px 0px 6px`
- **Usage**: Navbar, Footer
- **Status**: ⏳ Ready to build

### 4. SearchBar Component
**File**: `src/components/ui/SearchBar.tsx`
- **Purpose**: Search input with icon
- **Props**: 
  - `placeholder?: string` (default: "Search")
  - `onSearch?: (query: string) => void`
- **Styling**:
  - Border radius: 999px (pill shape)
  - Border: 1px solid `#47433a`
  - Background: `#fffefc`
  - Padding: `8px 12px`
  - Max width: 440px
  - Placeholder color: `#999489`
- **Usage**: Navbar
- **Status**: ⏳ Ready to build

### 5. Input Component
**File**: `src/components/ui/Input.tsx`
- **Purpose**: Form input (text, email, phone, textarea)
- **Props**:
  - `type: 'text' | 'email' | 'tel' | 'textarea'`
  - `label?: string`
  - `placeholder?: string`
  - `required?: boolean`
  - `error?: string`
  - `value?: string`
  - `onChange?: (e: ChangeEvent) => void`
- **Styling**:
  - Border radius: 4px (form inputs), 8px (search)
  - Border: 1px solid `#47433a`
  - Background: `#fffefc`
  - Padding: `8px 12px`
  - Label: Inter, 16px, line-height 160%
- **Usage**: Contact form, Newsletter
- **Status**: ⏳ Ready to build

### 6. Card Component
**File**: `src/components/ui/Card.tsx`
- **Purpose**: Base card container
- **Props**: 
  - `children: ReactNode`
  - `className?: string`
- **Styling**:
  - Border radius: 24px (cards), 20px (how-it-works)
  - Shadow: `0px 4px 12px -2px rgba(0, 0, 0, 0.05), 0px 2px 8px -2px rgba(0, 0, 0, 0.06)`
  - Background varies by usage
- **Usage**: HowItWorksCard, CategoryCard, ProductCard
- **Status**: ⏳ Ready to build

### 7. RadioGroup Component
**File**: `src/components/ui/RadioGroup.tsx`
- **Purpose**: Horizontal radio button group
- **Props**:
  - `options: Array<{value: string, label: string}>`
  - `selected?: string`
  - `onChange?: (value: string) => void`
  - `name: string`
- **Styling**:
  - Horizontal flex layout
  - Gap: 16px
  - Radio button: 24px icon
- **Usage**: Contact form ("How can we assist?")
- **Status**: ⏳ Ready to build

---

## 📋 Phase 2: Layout Components

### 8. Navbar Component
**File**: `src/components/layout/Navbar.tsx`
- **Purpose**: Main navigation bar
- **Dependencies**: Logo, NavLink, SearchBar, Button
- **Structure**:
  ```
  - Container (1440px max, padding 64px)
    - Left: Logo + NavLinks (Shop, Pickup Locations, Learn more, Contact us)
    - Center: SearchBar
    - Right: Log in link + Sign up button + Cart icon + Language toggle
  ```
- **Styling**:
  - Background: `#fffefc`
  - Height: Auto (padding 20px 0px)
  - Font: Inter, 16px
- **Status**: ⏳ After UI components done

### 9. Footer Component
**File**: `src/components/layout/Footer.tsx`
- **Purpose**: Site footer with links and newsletter
- **Dependencies**: Logo, NavLink, Input, Button
- **Structure**:
  ```
  - Container (1440px, padding 80px 64px)
    - Links section:
      - Logo
      - Quick Links column (Shop Now, How It Works, FAQs, Pickup Locations)
      - Stay Connected column (Sign Up, Contact Us, Customer Support, Refer a Friend)
    - Newsletter section:
      - Title + description
      - Email input + Subscribe button
      - Disclaimer text
    - Credits:
      - Divider
      - © 2025 Groupr + Privacy Policy + Terms + Cookie Settings
      - Social icons (5 icons)
  ```
- **Styling**:
  - Background: `#f1f7d9`
  - Font: Inter, 16px
- **Status**: ⏳ After UI components done

---

## 📋 Phase 3: Section Components

### 10. HeroSection Component
**File**: `src/components/sections/HeroSection.tsx`
- **Purpose**: Hero banner with headline and CTAs
- **Dependencies**: Button
- **Content**:
  - SNAP/EBT badge (circular, lime green `#c5dc5f`, rotated text)
  - Hero illustration (placeholder image)
  - Headline: "Affordable Grocery Delivery for NYC Residents" (60px, DM Sans, weight 800)
  - Description text (16px, Inter)
  - Pickup locations link (underlined)
  - Button row: "Shop now" (primary) + "Sign up" (outline)
  - Disclaimer: "*Free delivery on orders over $75" (14px)
- **Styling**:
  - Background: `#00473d` (dark teal)
  - Height: 638px
  - Padding: 64px
  - Text color: `#fffefc`
- **Status**: ⏳ After Button done

### 11. HowItWorksCard Component
**File**: `src/components/sections/HowItWorksCard.tsx`
- **Purpose**: Individual step card
- **Dependencies**: Card
- **Props**:
  - `step: number`
  - `title: string`
  - `description: string`
- **Styling**:
  - Background: `#f8fbe9`
  - Padding: 24px
  - Border radius: 20px
  - Title: 24px, bold
  - Description: 16px, Inter
- **Status**: ⏳ After Card done

### 12. HowItWorksSection Component
**File**: `src/components/sections/HowItWorksSection.tsx`
- **Purpose**: "How it works" section with 3 steps
- **Dependencies**: HowItWorksCard
- **Content**:
  - Decorative orange slice icon (left side)
  - Heading: "How it works:" (48px, DM Sans)
  - 3 cards:
    1. "Place Your Order" - Select groceries, choose delivery day
    2. "Checkout Securely" - Pay with EBT card
    3. "Pick Up Your Order" - Show QR code at pickup location
- **Styling**:
  - Background: `#d5e68b` (light green)
  - Padding: 64px 64px 80px
  - Gap: 32px between cards
- **Status**: ⏳ After HowItWorksCard done

### 13. SnapBenefitsSection Component
**File**: `src/components/sections/SnapBenefitsSection.tsx`
- **Purpose**: SNAP benefits callout
- **Dependencies**: Button
- **Content**:
  - Quote text: "Stretching your SNAP benefits..." (20px, bold)
  - Buttons: "Sign up" (primary dark) + "Shop now" (outline dark)
  - Decorative bread icon (right side)
- **Styling**:
  - Background: `#fff9f0` (cream)
  - Padding: 64px 64px 80px
- **Status**: ⏳ After Button done

### 14. CategoryCard Component
**File**: `src/components/sections/CategoryCard.tsx`
- **Purpose**: Product category card
- **Dependencies**: Card
- **Props**:
  - `name: string`
  - `icon?: string` (image path)
- **Structure**:
  - Image wrapper (98x98px, rounded 24px, bg `#fff1de`)
  - Category name below
- **Styling**:
  - Width: 124px
  - Shadow: drop-shadow
  - Text: 14px, weight 600
- **Categories**: All, Produce, Meat & Seafood, Pantry Staples, Dairy & Eggs, Cereals & Snacks, Breads & Bakery, Beverages
- **Status**: ⏳ After Card done

### 15. ProductCard Component
**File**: `src/components/sections/ProductCard.tsx`
- **Purpose**: Product display card
- **Dependencies**: Card, Button (for add to cart)
- **Props**:
  - `name: string`
  - `price: string`
  - `description: string`
  - `image?: string`
- **Structure**:
  - Image wrapper (300x280px)
  - Add to cart button (floating, bottom-right, green `#b3cf34`)
  - Product name
  - Price + description
- **Styling**:
  - Background: `#faf8f5`
  - Border radius: 24px
  - Shadow: drop-shadow
- **Status**: ⏳ After Card + Button done

### 16. ProductsSection Component
**File**: `src/components/sections/ProductsSection.tsx`
- **Purpose**: Full products section with categories and products
- **Dependencies**: CategoryCard, ProductCard
- **Structure**:
  1. Category row (8 CategoryCards)
  2. Featured products title + "Shop the full store" link
  3. Featured products row (3 ProductCards: $50, $75, $100 bags)
  4. Produce title + "View All" link
  5. Produce row (4 ProductCards: Bananas, Red Apples, Mandarin Oranges, Green Seedless Grapes)
  6. Meat & Seafood title + "View All" link
  7. Meat & Seafood row (4 ProductCards: Vienna Sausages, Sliced Bacon, Jumbo Shrimp, Beef Hot Dogs)
  8. "See the full store" button
- **Styling**:
  - Background: `#fffefc`
  - Padding: 120px 64px
  - Gap: 64px between sections
- **Status**: ⏳ After CategoryCard + ProductCard done

### 17. BenefitsSection Component
**File**: `src/components/sections/BenefitsSection.tsx`
- **Purpose**: Benefits with image
- **Content**:
  - Heading: "Simpler Shopping, Designed for You" (36px)
  - Benefit 1: "No extra costs. No surprise fees." (bold) + description
  - Benefit 2: "Secure checkout with EBT payment options" (bold) + description
  - Image (600x600px, rounded 32px)
- **Styling**:
  - Background: `#fff9f0`
  - Padding: 112px 64px
  - Layout: Flex, gap 80px
- **Status**: ⏳ Ready to build

### 18. TestimonialSection Component
**File**: `src/components/sections/TestimonialSection.tsx`
- **Purpose**: Customer testimonial
- **Content**:
  - Image (left)
  - Quote block (right):
    - 5 star icons
    - Quote: "Groupr has made grocery shopping so easy..." (24px, bold)
    - Name: "Maria Lopez"
    - Location: "Resident, Bronx River Houses"
  - Decorative carrot icon (bottom-right)
- **Styling**:
  - Background: `#fff9f0`
  - Padding: 112px 64px 160px
  - Layout: Flex, gap 80px
- **Status**: ⏳ Ready to build

### 19. AccordionItem Component
**File**: `src/components/sections/AccordionItem.tsx`
- **Purpose**: FAQ accordion item
- **Props**:
  - `question: string`
  - `answer?: string` (for future expansion)
  - `isOpen?: boolean`
  - `onToggle?: () => void`
- **Structure**:
  - Question row (question text + expand icon)
  - Answer (hidden for now, can add later)
- **Styling**:
  - Background: `#f8fbe9`
  - Border radius: 24px
  - Padding: 20px 36px
  - Question: 16px, weight 600
- **Status**: ⏳ Ready to build

### 20. FaqSection Component
**File**: `src/components/sections/FaqSection.tsx`
- **Purpose**: FAQ section with accordion items
- **Dependencies**: AccordionItem
- **Content**:
  - Title: "FAQs" (48px, DM Sans)
  - Subtitle: "Here are some common questions..."
  - 6 AccordionItems:
    1. "How do I order?"
    2. "Where do you deliver?"
    3. "When do you deliver?"
    4. "How can I pay?"
    5. "Are there any fees?"
    6. "What if I need help?"
  - "Still have questions?" section + Contact button
- **Styling**:
  - Background: `#d5e68b`
  - Padding: 112px 64px
  - Max width: 780px
- **Status**: ⏳ After AccordionItem done

### 21. ContactSection Component
**File**: `src/components/sections/ContactSection.tsx`
- **Purpose**: Contact form
- **Dependencies**: Input, Button, RadioGroup
- **Structure**:
  - Title: "Get in Touch" (48px)
  - Subtitle: "We're here to help..."
  - Form:
    - "* required" note
    - Row 1: First Name + Last Name inputs
    - Row 2: Email + Phone inputs
    - "How can we assist?" RadioGroup (6 options):
      - Order Help
      - Product Question
      - Delivery Issue
      - Feedback
      - Expand to my neighborhood!
      - Other
    - Message textarea
    - Send button
- **Styling**:
  - Background: `#fffefc`
  - Padding: 112px 64px
  - Form width: 600px
- **Status**: ⏳ After Input + Button + RadioGroup done

### 22. CtaSection Component
**File**: `src/components/sections/CtaSection.tsx`
- **Purpose**: Final call-to-action
- **Dependencies**: Button
- **Content**:
  - Background food image
  - Heading: "Get Your Groceries Delivered" (48px)
  - Description: "Join our community..."
  - Buttons: "Sign up" (white bg) + "Shop now" (outline white)
- **Styling**:
  - Background: `#00352e` (dark teal)
  - Padding: 136px 64px
  - Text color: `#fffefc`
- **Status**: ⏳ After Button done

---

## 📋 Phase 4: Page Assembly

### 23. HomePage Component
**File**: `src/pages/HomePage.tsx`
- **Purpose**: Main page assembling all sections
- **Dependencies**: All sections + Navbar + Footer
- **Structure**:
  ```
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <HowItWorksSection />
    <SnapBenefitsSection />
    <ProductsSection />
    <BenefitsSection />
    <TestimonialSection />
    <FaqSection />
    <ContactSection />
    <CtaSection />
    <Footer />
  </div>
  ```
- **Status**: ⏳ After all components done

---

## 🚀 Build Order Summary

### Week 1: Foundation (7 components)
1. Logo
2. Button
3. NavLink
4. SearchBar
5. Input
6. Card
7. RadioGroup

### Week 2: Layout (2 components)
8. Navbar
9. Footer

### Week 3: Sections Part 1 (5 components)
10. HeroSection
11. HowItWorksCard + HowItWorksSection
12. SnapBenefitsSection
13. CategoryCard + ProductCard
14. ProductsSection

### Week 4: Sections Part 2 (6 components)
15. BenefitsSection
16. TestimonialSection
17. AccordionItem + FaqSection
18. ContactSection
19. CtaSection

### Week 5: Assembly
20. HomePage
21. Testing & Polish

---

## 📝 Implementation Notes

### Styling Approach
- Use Tailwind utility classes matching original CSS
- Reference `tailwind.config.js` for custom colors/spacing
- Maintain responsive design (original is 1440px fixed, make responsive)

### Images
- All images are placeholders for now (empty `src` in original)
- Use placeholder images or SVG icons initially
- Can add real images later

### Content
- Copy all text content exactly from `1.txt`
- Maintain structure and hierarchy
- Keep accessibility in mind (alt tags, semantic HTML)

### Testing
- Test each component in isolation first
- Then test in context (sections, then full page)
- Verify Tailwind classes compile correctly
- Check responsive behavior

---

## ✅ Next Action
**Start with Logo component** - simplest, no dependencies, used in Navbar and Footer.
