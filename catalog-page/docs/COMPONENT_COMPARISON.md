# Post-Login vs Groupr Component Comparison

Assumption: **Groupr = refined reference.** Post-login is aligned to match.

---

## 1. Logo

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Structure | Multi-line return, semicolons | Compact return | Match Groupr structure |
| Props/behavior | Same | Same | None |

**Verdict:** Effectively identical; minor formatting alignment.

---

## 2. NavLink

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Return | Explicit `return ( ... );` | Arrow return `( )` | Use Groupr return style |
| Class string | Multi-line template, `${active}`, `${className}` on own lines | Single template | Match Groupr formatting |

**Verdict:** Same API and behavior; align formatting and return style.

---

## 3. SearchBar

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Icon wrapper | `<div className="flex items-start">` around img | No wrapper | Add wrapper for consistency |
| Input | No min-w-0 | `min-w-0` (good for flex) | Keep min-w-0 |
| Img | No flex-shrink-0 | `flex-shrink-0` | Keep flex-shrink-0 |

**Verdict:** Add icon wrapper from Groupr; keep post-login input refinements.

---

## 4. Button

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Variants | primary, outline + getOutlineClasses() for dark/light context | primary, outline, light, dark (flat) | Port getOutlineClasses(); keep light/dark for catalog |
| Class logic | baseClasses, variantClasses, sizeClasses, outlineDarkClasses, outlineLightClasses, getOutlineClasses() | Simple map + ?? | Use Groupr's full logic |
| Size/variant | Objects with explicit keys | Record<string, string> | Use Groupr object style |

**Verdict:** Port full Groupr Button (including outline context); add `light` and `dark` to variant map for PromoBanner/HeroSearch.

---

## 5. Input

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Class vars | baseInputClasses, textareaClasses multi-line | Single-line base, textareaClass | Use Groupr multi-line class strings |
| ChangeEvent | `ChangeEvent` (no type-only) | `type ChangeEvent` | Keep type-only (verbatimModuleSyntax) |

**Verdict:** Match Groupr class variable pattern; keep type-only import.

---

## 6. Card

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Classes | variantClasses object, then `const classes = \`...\`.trim().replace(...)` | Inline in JSX | Use Groupr's classes variable |

**Verdict:** Use same class-building pattern as Groupr.

---

## 7. Navbar

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Container | `w-full` only, `px-section py-1` | `max-w-[1440px] mx-auto`, `py-5` | Use Groupr: w-full, px-section py-1 |
| Inner row | `gap-0`, `py-1 z-0 flex-shrink-0` | `gap-5` | Match gap-0, py-1, z-0, flex-shrink-0 |
| Left | `gap-16`, nav links `w-[530px] justify-between gap-5` | `gap-10`, `gap-2` | Match gap-16, w-[530px], justify-between gap-5 |
| Right | `justify-end gap-8`, cart `flex flex-col items-center gap-0 py-1.5 text-[10px]`, img flex-shrink-0 | `gap-8`, Account+cart similar | Match cart structure (gap-0, py-1.5, leading-tight); keep Account |
| Logo | Not wrapped in `<a>` | Wrapped in `<a href="/">` | Keep link for catalog |
| Content | Learn more, Log in, Sign up, Cart | About Groupr, Account, Cart, Language toggle | Keep post-login content |

**Verdict:** Use Groupr layout/spacing/structure; keep post-login-specific content (Account, About Groupr, language toggle).

---

## 8. Footer

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Wrapper | `w-full max-w-[1440px] mx-auto ... box-border gap-10` | Same but no box-border | Add box-border |
| First row | `h-[248px] flex items-start gap-32` | flex-wrap, gap-32, no h-[248px] | Add h-[248px], match structure |
| Logo | Double wrapper: flex-1 overflow-hidden > div flex items-start > Logo | Single wrapper | Use double wrapper |
| Headings | `self-stretch relative ... font-semibold` | `self-stretch font-semibold` | Add `relative` |
| NavLink | `className="self-stretch flex items-start py-2 pl-0 pr-4"` | `className="py-2 pl-0 pr-4"` | Add self-stretch flex items-start |
| Newsletter | Button wrapper: `self-stretch rounded-button flex items-start text-center text-text-light`; Button "Subscribe" + `className="bg-text-brown text-text-light hover:bg-text-border"` | "Sign up", no wrapper div, opacity-90 | Use wrapper div, "Subscribe", Groupr button className |
| Divider | `h-px relative bg-bg-dark border border-bg-dark box-border` | Same minus box-border | Add box-border |
| Copyright | © 2026 | © 2025 | Use © 2026 |
| Social | `alt="Facebook"` etc. | `alt=""` | Restore descriptive alts |

**Verdict:** Align structure, labels, and class names with Groupr; keep post-login layout where it’s intentional.

---

## 9. CategoryCard

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Label color | `text-text-brown` | `text-text-primary` | Use text-text-brown |
| Inner wrapper | Extra div: `flex flex-col items-center justify-center w-full` around label div | Omitted | Restore wrapper |
| Card | No flex-shrink-0 | flex-shrink-0 on Card | Keep flex-shrink-0 (needed in strip) |

**Verdict:** Match Groupr label color and inner structure; keep flex-shrink-0.

---

## 10. ProductCard

| Aspect | Groupr | Post-login (before) | Change |
|--------|--------|---------------------|--------|
| Card width | No width on Card | `w-[300px] flex-shrink-0` on Card | Move to inner container; Groupr uses w-[300px] h-[280px] on image container |
| Image container | `w-[300px] h-[280px] ... relative isolation-isolate` | `w-full h-[280px] ... relative` | Add w-[300px], isolation-isolate |
| Image | `self-stretch flex-1 ... object-contain ... z-0 flex-shrink-0 rounded-lg bg-bg-primary/30` | `object-cover`, simpler | Use object-contain, full Groupr classes |
| Placeholder | Same + `z-0 flex-shrink-0` | text-sm | Match Groupr placeholder classes |
| Add-to-cart img | `alt="Add to cart"` | `alt=""` | Add alt text |
| Content area | `h-[140px]`, name `text-xl` | `min-h-[140px]`, name `text-base` | Use h-[140px], text-xl |
| Details | `w-[276px] h-[55px] ... text-xl` | No fixed size, no text-xl on container | Add w-[276px] h-[55px], text-xl |
| Button | flex-shrink-0 on button | No flex-shrink-0 | Add flex-shrink-0 |

**Verdict:** Align fully with Groupr structure and classes; keep Card without fixed width and use inner w-[300px] for image block.
