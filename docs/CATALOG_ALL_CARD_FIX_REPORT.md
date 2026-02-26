# All Category Card – Selected & Disabled Logic Fix

## Problem

The "All" category card does not behave like the other category cards:

1. **Selected state:** It is never shown as selected. Other cards get `selected={true}` when `currentCategoryId === item.id`. The All card is explicitly excluded by `selected = !isAll && item.id != null && currentCategoryId === item.id`, so when the user is on the main catalog (`currentCategoryId === null`), the All card should be selected but it is not.

2. **Disabled state:** When the user is on the main catalog (`currentCategoryId === null`), the All card is disabled (`isAllDisabled = currentCategoryId === null`, then `disabled = isAll && isAllDisabled`). So the All card is greyed out and not clickable on the main catalog, unlike every other card which is never disabled for being "current".

## Desired Behavior (100% Normal)

- **Selected:** Same rule as others: the All card is selected when the current view matches that choice. So All is selected when `currentCategoryId === null` (main catalog). Other cards are selected when `currentCategoryId === item.id`.
- **No special “unselectable” logic:** The All card is never disabled. If the user clicks All while already on the main catalog, we can no-op (or navigate to `/catalog`); the card stays clickable and looks like the others.

## Implementation Plan

| Step | Action |
|------|--------|
| 1 | **Unify `selected`** – For All (`item.id === -1`): `selected = currentCategoryId === null`. For others: `selected = item.id != null && currentCategoryId === item.id`. So: `selected = (item.id === -1 && currentCategoryId === null) \|\| (item.id != null && currentCategoryId === item.id)`. |
| 2 | **Remove disabled for All** – Remove `isAllDisabled` and do not set `disabled` based on “we’re on All”. No card in the strip is disabled for being the current category. |
| 3 | **Keep click behavior** – `handleClick` for All: when `currentCategoryId !== null`, navigate to `/catalog`; when already `null`, clicking All can no-op (optional: still call `navigate('/catalog')` for consistency). |

## Files to Change

- **`devenv-main/frontend/src/pages/Catalog/Components/CategoryStrip.tsx`**
  - Remove `isAllDisabled` and the `disabled` prop derived from it.
  - Set `selected` so All is selected when `currentCategoryId === null`; other cards when `currentCategoryId === item.id`.

## Result

- All card shows the yellow selected state on the main catalog.
- All card is never disabled; it is clickable like every other card.
- Selection and click behavior are consistent across All and all other category cards.
