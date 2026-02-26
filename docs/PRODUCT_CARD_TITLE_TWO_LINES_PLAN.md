# Plan: Product card title – two lines, no crop

## Problem

Product card titles use a two-line clamp (`line-clamp-2` + `overflow-hidden`) but can show a **crop issue**: the second line (or the ellipsis) is cut off at the bottom, or the visible text is clipped.

## Root cause

1. **No explicit height for the title box**  
   The title div only has `line-clamp-2` and `overflow-hidden`. Its height is implied by the content. With `leading-[140%]`, the exact height of two lines can be affected by:
   - Subpixel rounding
   - Descenders (g, y, p)
   - Font metrics and browser differences  

   So the box can end up slightly shorter than two full lines, and the bottom of the text (or the ellipsis) gets clipped.

2. **line-clamp behavior**  
   `line-clamp-2` (Tailwind) sets `-webkit-line-clamp: 2` and `display: -webkit-box`. The box height comes from the line-clamped content. If that computed height is rounded down or doesn’t match the actual two-line height, you get a crop.

## Approach

Reserve a **fixed height for exactly two lines** so the visible area is never too small, and keep `line-clamp-2` for overflow + ellipsis.

- Use a **min-height** (or fixed height) derived from line-height and 2 lines.
- Current styles: `text-xs md:text-sm`, `leading-[140%]`.
- Two lines at 140% line-height ⇒ height = `2 × 1.4 = 2.8em`. So the title container should have at least **2.8em** height (e.g. `min-h-[2.8em]`). That way:
  - Two lines always fit.
  - No clipping of the second line or the ellipsis.
  - Long names still truncate with ellipsis via `line-clamp-2`.

## Implementation

| Item | Detail |
|------|--------|
| **File** | `frontend/src/common/products/ProductCard.tsx` |
| **Change** | On the product **name** div (the title), add a min-height that fits exactly two lines: `min-h-[2.8em]`. Keep `line-clamp-2`, `overflow-hidden`, `w-full`, and existing font/leading. |
| **Optional** | If the description line (weight/description) also crops, apply the same idea there: `min-h-[2.8em]` for its two-line area. |

## Verification

- Short names: 1 line, no extra gap (min-height only reserves space; content can be one line).
- Long names: 2 lines + ellipsis, no bottom crop.
- Different viewports (mobile `text-xs`, desktop `text-sm`): 2.8em scales with font-size, so both stay correct.

## Summary

| Before | After |
|--------|--------|
| Title box height = content-derived, can be slightly too small | Title box has `min-h-[2.8em]` so 2 lines always fit |
| Risk of second line or ellipsis cropped | No crop; overflow still truncated with ellipsis |
