# Component Build Plan - Table Format

## Build Order & Dependencies

| # | Component | Category | Dependencies | Status | File Path |
|---|-----------|----------|--------------|-------|-----------|
| 1 | **Logo** | UI | None | ⏳ Pending | `src/components/ui/Logo.tsx` |
| 2 | **Button** | UI | None | ⏳ Pending | `src/components/ui/Button.tsx` |
| 3 | **NavLink** | UI | None | ⏳ Pending | `src/components/ui/NavLink.tsx` |
| 4 | **SearchBar** | UI | None | ⏳ Pending | `src/components/ui/SearchBar.tsx` |
| 5 | **Input** | UI | None | ⏳ Pending | `src/components/ui/Input.tsx` |
| 6 | **Card** | UI | None | ⏳ Pending | `src/components/ui/Card.tsx` |
| 7 | **RadioGroup** | UI | None | ⏳ Pending | `src/components/ui/RadioGroup.tsx` |
| 8 | **Navbar** | Layout | Logo, NavLink, SearchBar, Button | ⏳ Pending | `src/components/layout/Navbar.tsx` |
| 9 | **HeroSection** | Section | Button | ⏳ Pending | `src/components/sections/HeroSection.tsx` |
| 10 | **HowItWorksCard** | Section | Card | ⏳ Pending | `src/components/sections/HowItWorksCard.tsx` |
| 11 | **HowItWorksSection** | Section | HowItWorksCard | ⏳ Pending | `src/components/sections/HowItWorksSection.tsx` |
| 12 | **SnapBenefitsSection** | Section | Button | ⏳ Pending | `src/components/sections/SnapBenefitsSection.tsx` |
| 13 | **CategoryCard** | Section | Card | ⏳ Pending | `src/components/sections/CategoryCard.tsx` |
| 14 | **ProductCard** | Section | Card, Button | ⏳ Pending | `src/components/sections/ProductCard.tsx` |
| 15 | **ProductsSection** | Section | CategoryCard, ProductCard | ⏳ Pending | `src/components/sections/ProductsSection.tsx` |
| 16 | **BenefitsSection** | Section | None | ⏳ Pending | `src/components/sections/BenefitsSection.tsx` |
| 17 | **TestimonialSection** | Section | None | ⏳ Pending | `src/components/sections/TestimonialSection.tsx` |
| 18 | **AccordionItem** | Section | None | ⏳ Pending | `src/components/sections/AccordionItem.tsx` |
| 19 | **FaqSection** | Section | AccordionItem | ⏳ Pending | `src/components/sections/FaqSection.tsx` |
| 20 | **ContactSection** | Section | Input, Button, RadioGroup | ⏳ Pending | `src/components/sections/ContactSection.tsx` |
| 21 | **CtaSection** | Section | Button | ⏳ Pending | `src/components/sections/CtaSection.tsx` |
| 22 | **Footer** | Layout | Logo, NavLink, Input, Button | ⏳ Pending | `src/components/layout/Footer.tsx` |
| 23 | **HomePage** | Page | All sections + Navbar + Footer | ⏳ Pending | `src/pages/HomePage.tsx` |

## Component Details

### UI Components (Foundation)

| Component | Props | Variants/Features |
|-----------|-------|------------------|
| **Logo** | `className?` | Placeholder SVG/icon |
| **Button** | `variant: 'primary' \| 'outline'`, `size: 'sm' \| 'lg'`, `children`, `onClick?` | Primary (filled), Outline (bordered) |
| **NavLink** | `href`, `children`, `active?` | Hover underline effect |
| **SearchBar** | `placeholder?`, `onSearch?` | Icon + input field |
| **Input** | `type`, `label?`, `placeholder?`, `required?`, `error?` | Text, email, phone, textarea |
| **Card** | `children`, `className?` | Base card with shadow/radius |
| **RadioGroup** | `options: Array<{value, label}>`, `selected?`, `onChange?` | Horizontal radio buttons |

### Layout Components

| Component | Props | Contains |
|-----------|-------|----------|
| **Navbar** | None | Logo, nav links (Shop, Pickup Locations, Learn more, Contact), SearchBar, Log in/Sign up buttons, Cart icon, Language toggle |
| **Footer** | None | Logo, Quick Links, Stay Connected, Newsletter signup, Credits, Social icons |

### Section Components

| Component | Props | Content |
|-----------|-------|---------|
| **HeroSection** | None | SNAP badge, headline "Affordable Grocery Delivery for NYC Residents", description, CTA buttons, delivery disclaimer |
| **HowItWorksSection** | None | Heading, 3 cards: "Place Your Order", "Checkout Securely", "Pick Up Your Order" |
| **SnapBenefitsSection** | None | SNAP benefits quote, Sign up/Shop now buttons |
| **ProductsSection** | None | 8 category cards, Featured products (3 bags), Produce section (4 items), Meat & Seafood (4 items) |
| **BenefitsSection** | None | Heading, 2 benefit items, image |
| **TestimonialSection** | None | 5-star rating, quote, customer name/location, image |
| **FaqSection** | None | 6 accordion items (How do I order?, Where/When deliver?, Payment, Fees, Help) |
| **ContactSection** | None | Form: First/Last name, Email, Phone, "How can we assist?" (6 radio options), Message, Send button |
| **CtaSection** | None | Background image, heading, description, Sign up/Shop now buttons |

## Next Steps

1. Start with **Logo** component (simplest, no dependencies)
2. Build **Button** component (used everywhere)
3. Build **NavLink** and **SearchBar**
4. Assemble **Navbar** using the UI components
5. Continue with sections in order

## Design Reference

- Original React component: `../1.txt`
- Original CSS: `../2.txt`
- Design tokens: `tailwind.config.js`
