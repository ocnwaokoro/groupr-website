# Groupr Website Build Plan

## Project Setup ✅
- [x] Vite + React + TypeScript
- [x] Tailwind CSS configured
- [x] Design tokens (colors, fonts) from 2.txt
- [x] Google Fonts (Inter, Lexend, DM Sans)

## Component Build Order

### Phase 1: Foundation Components
1. **Logo** - Simple logo component (placeholder for now)
2. **Button** - Primary and outline variants
3. **NavLink** - Navigation link with hover states
4. **SearchBar** - Search input with icon
5. **Input** - Reusable form input component
6. **Card** - Base card component

### Phase 2: Layout Components
7. **Navbar/Header** - Complete navigation bar
   - Uses: Logo, NavLink, SearchBar, Button
8. **Footer** - Footer with links and newsletter
   - Uses: Logo, NavLink, Input, Button

### Phase 3: Section Components
9. **HeroSection** - Hero with headline, CTA, SNAP badge
   - Uses: Button
10. **HowItWorksCard** - Individual step card
11. **HowItWorksSection** - Section with 3 cards
    - Uses: HowItWorksCard
12. **SnapBenefitsSection** - SNAP benefits callout
    - Uses: Button
13. **CategoryCard** - Product category card
14. **ProductCard** - Product display card
15. **ProductsSection** - Full products section
    - Uses: CategoryCard, ProductCard
16. **BenefitsSection** - Benefits with image
17. **TestimonialSection** - Customer testimonial
18. **AccordionItem** - FAQ accordion item
19. **FaqSection** - FAQ section
    - Uses: AccordionItem
20. **ContactSection** - Contact form
    - Uses: Input, Button, RadioGroup
21. **CtaSection** - Call-to-action section
    - Uses: Button

### Phase 4: Assembly
22. **HomePage** - Main page component
    - Assembles all sections
23. **App** - Root component
    - Uses: HomePage

## File Structure
```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Logo.tsx
│   │   ├── NavLink.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── RadioGroup.tsx
│   ├── layout/          # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/        # Page sections
│       ├── HeroSection.tsx
│       ├── HowItWorksSection.tsx
│       ├── SnapBenefitsSection.tsx
│       ├── ProductsSection.tsx
│       ├── BenefitsSection.tsx
│       ├── TestimonialSection.tsx
│       ├── FaqSection.tsx
│       ├── ContactSection.tsx
│       └── CtaSection.tsx
├── pages/
│   └── HomePage.tsx
├── App.tsx
└── main.tsx
```

## Design Tokens (from 2.txt)

### Colors
- Backgrounds: `#fffefc`, `#00473d`, `#d5e68b`, `#fff9f0`, `#f8fbe9`, `#f1f7d9`
- Text: `#161411`, `#003c34`, `#332f29`, `#47433a`, `#999489`
- Accents: `#ffa454`, `#fc8c30`, `#c5dc5f`, `#b3cf34`

### Typography
- Headings: DM Sans (600, 700, 800)
- Body: Inter (400, 500, 600)
- Hero: Lexend (700)

### Spacing
- Section padding: 64px horizontal
- Card padding: 24px
- Button padding: 12px 20px (small), 20px 24px (large)

### Border Radius
- Cards: 24px
- Buttons: 12px
- Inputs: 8px (small), 4px (form inputs)

## Notes
- All images are placeholders for now (empty alt tags in original)
- Focus on structure and styling first, functionality later
- Use Tailwind utility classes matching the CSS module classes
- Maintain responsive design (original is 1440px fixed width, we'll make it responsive)
