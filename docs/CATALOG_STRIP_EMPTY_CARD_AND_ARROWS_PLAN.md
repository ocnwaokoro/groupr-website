# Category Strip: Empty State Card & Desktop Arrows – Plan

## Current behavior

- **Strip contents:** `[All] [Produce] [Meat & Seafood] … [Beverages] [Empty / Error demo]`. The last card is the "Empty / Error demo" (id = -2) for demonstrating empty/error category state.
- **Mobile:** Left/right arrow buttons are visible; the strip is scrollable (`overflow-x-auto`). User can scroll with arrows or touch.
- **Desktop:** Arrows are hidden (`md:hidden`). Strip uses `md:overflow-visible` and `md:justify-between`, so all cards are shown in one row. If the viewport is narrow or there are many cards, they can wrap or overflow.

---

## Option A: Remove empty state card from the strip

**Goal:** Stop showing the "Empty / Error demo" card in the category strip. The strip only shows: All + the real categories (Produce, Meat & Seafood, etc.).

**Steps:**

1. **CategoryStrip.tsx**
   - In the `list` useMemo, remove the `demoCard` and do not append it to the array.
   - Change:
     - `return [ALL_CATEGORY, ...merged, demoCard]`
     - to:
     - `return [ALL_CATEGORY, ...merged]`
   - Remove `EMPTY_ERROR_DEMO_CATEGORY_ID` from imports if it’s only used for that card.
   - In `handleClick`, remove the branch that handles `item.id === EMPTY_ERROR_DEMO_CATEGORY_ID` (or keep it as a no-op if the id can still appear from URL).
   - In the ref callback, the demo card’s id (-2) will no longer be in the list, so no ref for -2; scroll-to-selected still works for All (-1) and real category ids.

2. **Routing and category page**
   - Route `/catalog/-2` (or `/catalog/:categoryId` with id -2) can remain. If a user lands there (e.g. bookmark), CategorizedProducts already treats -2 as the demo category (empty/error UI). No change required unless you want to redirect -2 to `/catalog` or 404.
   - Optional: add a redirect from `/catalog/-2` to `/catalog` if you no longer want to support the demo category page.

3. **Constants**
   - Keep `EMPTY_ERROR_DEMO_CATEGORY_ID` in `categoryConfig.ts` if it’s still used in CategorizedProducts or elsewhere for the demo category page. Otherwise it can be removed or left for reference.

**Result:** Strip has no "Empty / Error demo" card; only All + real categories. Demo flow is only reachable via direct URL if you keep the route.

---

## Option B: Desktop arrow logic (like mobile) when strip is too long

**Goal:** On desktop, when the category strip is too long to fit in one row, show left/right arrows and make the strip scrollable instead of overflowing or wrapping.

**Steps:**

1. **Show arrows on desktop when content overflows**
   - Use a single ref on the scroll container (the div that has `ref={scrollRef}`).
   - Use state or a ref to track whether the strip is overflowed:
     - **ResizeObserver** on the scroll container: compare `scrollWidth` vs `clientWidth`. If `scrollWidth > clientWidth`, set `canScroll = true` (or similar).
     - Or **useEffect** that runs on mount and on `window.resize`: read `scrollRef.current.scrollWidth` and `scrollRef.current.clientWidth`, update state (e.g. `isOverflowing`).
   - Render the left/right arrow buttons when `isOverflowing` is true, and remove the `md:hidden` that currently hides them on desktop. So:
     - Mobile: always show arrows (or show when overflowed, same logic).
     - Desktop: show arrows only when `scrollWidth > clientWidth`.

2. **Make the strip scrollable on desktop when overflowed**
   - When overflowed, the strip should scroll instead of staying `overflow: visible`. So:
     - Keep `overflow-x-auto` (or `overflow-x-auto` only when `isOverflowing`) on the scroll container so that when there are many cards, the container gets a horizontal scrollbar and responds to the arrow clicks.
     - On desktop, today the container has `md:overflow-visible`, which prevents scrolling. Change to something like:
       - `overflow-x-auto` for all breakpoints, **or**
       - `overflow-x-auto md:overflow-x-auto` when `isOverflowing`, and `md:overflow-visible` when not overflowed (so one row fits and no scrollbar).
   - Optional: hide the scrollbar with `scrollbar-hide` on desktop too so only arrows indicate scroll; or show a thin scrollbar for accessibility.

3. **Reuse existing scroll logic**
   - Keep the same `scroll('left' | 'right')` that uses `scrollBy({ left: amount, behavior: 'smooth' })`. Arrows on desktop will use the same logic as mobile.
   - Optional: adjust `SCROLL_AMOUNT` for desktop (e.g. scroll by one card width) so one click roughly moves one card.

4. **Scroll-to-selected**
   - Existing `useEffect` that scrolls the selected card into view (`scrollIntoView({ inline: 'center' })`) already works with a scrollable container. No change needed.

5. **Layout**
   - Ensure the strip’s parent and the scroll container have a bounded width (e.g. `max-w-full` or the same max-width as the catalog content) so that on large screens the strip can still overflow when there are many categories. The scroll container should have `min-w-0` and `flex-1` (or similar) so it shrinks and can overflow.

**Result:** When the strip is too long on desktop, arrows appear and the strip scrolls like on mobile; when it fits, no arrows and no scroll (current desktop behavior).

---

## Option C: Do both

- **Remove** the empty state card from the strip (Option A).
- **Add** desktop overflow detection and arrow + scroll behavior (Option B).

That gives a shorter strip (no demo card) and consistent arrow-based scrolling on both mobile and desktop when the strip doesn’t fit.

---

## Recommendation

- **Option A** if the demo card is no longer needed in the strip and you’re fine with the demo only via URL (or removing it).
- **Option B** if you want the strip to behave like mobile when there are many categories (arrows + scroll on desktop).
- **Option C** if you want both: no demo card in the strip and desktop arrows when the strip is too long.

## Files to touch

| Option | File(s) |
|--------|--------|
| A      | `CategoryStrip.tsx` (remove demo card from list, optional cleanup of handleClick/imports); optionally `AppRouter` or category page for redirect of `/catalog/-2`. |
| B      | `CategoryStrip.tsx` (overflow state, show arrows when overflowed, make scroll container scrollable on desktop when overflowed). |
| C      | Both of the above. |
