# How landing-page-mobile handles spacing so screens expand to fit the entire mobile viewport

Summary of patterns used in **landing-page-mobile** so the layout fills the full width and height of the viewport on mobile (and scales with different screen sizes).

---

## 1. Viewport (index.html)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

- **width=device-width** — layout width = device width (e.g. 375px, 414px).
- **maximum-scale=1.0, user-scalable=no** — optional; prevents zoom for a more app-like feel.

No fixed pixel width is set; the browser viewport defines the width.

---

## 2. Page root (HomePage)

**Outer wrapper:**

```tsx
<div className="min-h-screen w-full bg-bg-primary text-center text-text-primary font-sans">
```

- **min-h-screen** — page is at least 100vh, so it fills the screen height even when content is short.
- **w-full** — uses 100% of the viewport width. There is **no max-w-[375px]** or other max-width, so the layout expands to whatever width the device gives (375px, 414px, etc.).

**Inner column:**

```tsx
<div className="w-full min-w-0 flex flex-col items-stretch">
  <Navbar />
  <HeroSection />
  …
</div>
```

- **w-full** — column is full width of the outer wrapper.
- **min-w-0** — important in flexbox: allows the flex child to shrink below its content width so you don’t get horizontal overflow or scroll on small viewports; content can wrap and scroll vertically instead.
- **flex flex-col items-stretch** — vertical stack; each child is stretched to full width (so sections are full width).

So: **full viewport width**, **at least full viewport height**, and **no horizontal overflow** from the main column.

---

## 3. Sections and layout components

Every **section** and **Navbar/Footer** follows the same width pattern:

**Section:**

```tsx
<section className="w-full max-w-full bg-… overflow-hidden … px-0">
  <div className="w-full … px-5 py-16 …">
```

**Navbar:**

```tsx
<nav className="w-full max-w-full mx-auto …">
  <div className="w-full flex items-center justify-between px-5 py-3 …">
```

**Footer:**

```tsx
<footer className="w-full bg-bg-footer …">
  <div className="w-full max-w-full mx-auto … px-5 py-16 …">
```

Meaning:

- **w-full** — use full width of the parent (the main column, which is viewport width).
- **max-w-full** — never grow beyond the parent; in a flex context this keeps the section within the viewport and avoids overflow.
- **overflow-hidden** — on sections, clip any overflow.
- **Horizontal padding** — always **px-5** (20px) on the **inner** content div, not on the section itself. So the section is full width; the content has a 20px gutter on both sides.

No section or layout component sets a fixed max-width (e.g. 375px). Width is always “full parent” (viewport on the root, then full column, then full section).

---

## 4. Vertical spacing

- **Page:** Only **min-h-screen** on the root; no fixed height so content can grow.
- **Sections:** Vertical padding is section-specific, e.g.:
  - `pt-16 px-5 pb-5`
  - `px-5 pt-8 pb-20`
  - `px-5 py-16`
  - `pt-16 pb-[104px]`
- **Gaps:** `gap-6`, `gap-8`, `gap-10`, `gap-16`, etc. between blocks inside sections.
- **Main content:** Uses **flex-1** only where something should grow (e.g. main content area between header and footer); most sections don’t need flex-1, they just stack.

So vertical “expansion” is: **min-h-screen** on the page, and sections stack with their own padding and gaps. The page scrolls as needed and never constrains height to a fixed box.

---

## 5. Content inside sections

- **Inner containers:** `w-full` so they fill the section (minus the section’s px-5).
- **Buttons / inputs:** `w-full` so they span the content area and feel full-width on mobile.
- **Images / fixed elements:** Some use fixed px widths (e.g. hero illustration 375px) or percentages; the section still stays `w-full max-w-full` so the section expands with the viewport; only the asset may have a fixed or max size.

---

## 6. Checklist for “expand to fit entire screen”

| Layer            | Do | Avoid |
|------------------|----|--------|
| **Viewport**     | `width=device-width` in meta | Fixed width in meta |
| **Page root**    | `min-h-screen w-full`, inner `w-full min-w-0 flex flex-col items-stretch` | `max-w-[375px]` or any max-width on the page |
| **Navbar/Footer**| `w-full max-w-full mx-auto`, inner `px-5` | `max-w-[375px]` on nav/footer |
| **Sections**     | `w-full max-w-full overflow-hidden`, inner `px-5` + section-specific vertical padding | Fixed width or missing `max-w-full` |
| **Main column**  | `min-w-0` so flex can shrink | Omitting `min-w-0` (risk of horizontal overflow) |

Result: the screen always uses the **full width** of the device and **at least the full height** (min-h-screen), with consistent **px-5** gutters and section-specific vertical padding. Layout expands to fit the entire mobile screen given to it.
