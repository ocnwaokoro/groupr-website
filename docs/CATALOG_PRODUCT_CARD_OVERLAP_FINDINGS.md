# Product Card Text Overlap – Findings

## Root cause

1. **Fixed card height vs non-shrinking text block**
   - The card has `md:aspect-[300/420]`, so its height is determined by its width.
   - The image block has `md:aspect-[300/280]` and `flex-shrink-0`, so it keeps a fixed proportion.
   - The text block also has `flex-shrink-0`, so it never shrinks. Its height is driven by its content.

2. **Content height exceeds remaining space**
   - Remaining space for the text block is ~140px (420 − 280 in aspect units).
   - The text block contains: name (`min-h-[2.5em]`), price row, description (`min-h-[2.5em]`), plus `p-3` and `gap-3`. With `text-xs`/`text-sm`, two lines of name + two lines of description + price + gaps can exceed 140px.
   - Because the text block cannot shrink (`flex-shrink-0`), it overflows the card and overlaps or pushes layout.

3. **Mobile**
   - The text block has `min-h-[136px]` when `isCompact`. Together with the fixed image height (120px), the card can grow past the grid cell and overlap adjacent content or get clipped inconsistently.

## Fix (applied in code)

- **Allow the text block to shrink:** Use `min-h-0` and allow flex shrinking (e.g. `flex-1 min-h-0`) so the text area stays within the card.
- **Clip overflow:** Add `overflow-hidden` on the text container so any overflow is clipped and does not overlap.
- **Avoid oversized minimums:** Remove `min-h-[2.5em]` from name and description; rely on `line-clamp-2` and line-height so height is predictable and smaller.
- **Tighten spacing:** Slightly reduce padding/gap so name (2 lines) + price + description (2 lines) fit within the allotted space.
- **Modal:** Same ProductCard is used in the modal; the same layout fix applies. No separate “modal” card component.
- **Buttons:** Scale add-to-cart and quantity controls to fit the card; scale pagination Prev/Next to match.
