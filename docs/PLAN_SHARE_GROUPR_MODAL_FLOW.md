# Plan: Share Groupr modal flow

**Goal:** When the user clicks **Share Groupr** in the promo banner, open a modal that offers **Copy link** and **Share** (Web Share API when available), with clear fallbacks and feedback.

**Scope:** Plan only. Implementation follows this spec.

---

## 1. User flow (recommended)

1. User sees promo: “Give $5, get $5” + “Share Groupr” button.
2. User clicks **Share Groupr** → modal opens (no navigation).
3. Modal shows:
   - Short reminder: “Share Groupr with a friend — you both get $5 off.”
   - **Copy link** button (always).
   - **Share** button (only when `navigator.share` is available; e.g. many mobile browsers).
4. **Copy link** → copy referral URL to clipboard → show brief “Link copied!” (inline or toast) → user can paste anywhere.
5. **Share** → `navigator.share(...)` opens system share sheet → user picks app (Messages, WhatsApp, etc.) → modal can stay open or close after share (TBD; recommend close on success).
6. User closes modal via X or clicking overlay → returns to catalog.

**Footer “Refer a Friend”** can later point to `#refer` (scroll to a refer section) or open this same modal for consistency. Out of scope for this plan: implementing footer behavior.

---

## 2. Referral URL and copy text

- **URL:** Use a single canonical value for now. Options:
  - **A.** `window.location.origin` (e.g. `https://groupr.com`) — no ref code yet.
  - **B.** `window.location.origin + '?ref=share'` (or `?ref=promo`) — ready for future ref tracking.
- **Recommendation:** **B** so analytics or backend can later attribute traffic to “Share Groupr” without code changes at copy time.

- **Share text (for Web Share API):**
  - `title`: e.g. `"Groupr"`
  - `text`: e.g. `"You get $5 off your next order when you try Groupr — and I get $5 too. Check it out: "`
  - `url`: same as referral URL above.

- **Copy link:** copy only the URL (no pre-pasted message). Optional: show the URL in a read-only field so users can see what was copied.

---

## 3. Component structure

| Component | Location | Responsibility |
|-----------|----------|----------------|
| **PromoBanner** | `catalog/src/components/sections/PromoBanner.tsx` | Renders banner; owns `shareModalOpen` state; “Share Groupr” button sets `shareModalOpen = true`; renders `ShareModal` when open. |
| **ShareModal** | `catalog/src/components/ui/ShareModal.tsx` (or `sections/ShareModal.tsx`) | Dialog overlay; title + short copy; Copy link button; Share button (conditional); close (X + overlay click). Handles clipboard and `navigator.share`. |

**Shared / config:** Referral URL and share text can live in a small constant (e.g. `src/lib/referral.ts` or inside `ShareModal`) so they’re easy to change later.

---

## 4. ShareModal behavior (detailed)

### 4.1 Layout and accessibility

- **Overlay:** Dimmed backdrop; clicking it closes the modal (same pattern as `MobileNavDrawer` overlay).
- **Panel:** Centered card/panel; max-width so it’s readable on mobile and desktop.
- **Focus:** On open, focus first focusable element (e.g. Copy link button) or the close button; trap focus inside modal while open; on close, return focus to “Share Groupr” button.
- **Escape:** `keydown Escape` closes the modal.
- **Role:** `role="dialog"` and `aria-modal="true"`, `aria-labelledby` for title.

### 4.2 Copy link

- **Action:** `navigator.clipboard.writeText(referralUrl)`.
- **Success:** Show feedback for ~2–3 s: e.g. “Link copied!” next to the button or replace button text temporarily; then revert.
- **Error (e.g. clipboard not allowed):** Show brief “Couldn’t copy. Try the Share button or copy from the address bar.” (and show Share button if available; if not, show URL as text so user can manually select and copy).

### 4.3 Share (Web Share API)

- **Detection:** `typeof navigator !== 'undefined' && navigator.share`.
- **Visibility:** Show “Share” only when `navigator.share` is available (avoids “Share” that does nothing on desktop without fallback).
- **Action:** `navigator.share({ title, text, url })`. Promise-based.
- **Success:** Close modal (optional but recommended); optionally brief “Shared!” feedback before close.
- **Dismiss / cancel:** User cancels share sheet → modal stays open; no error message.
- **Error (e.g. AbortError):** Do not show error (user cancelled). Other errors: optional short “Something went wrong. Try Copy link instead.”

### 4.4 Fallbacks

| Context | Copy link | Share |
|--------|-----------|--------|
| Desktop (Chrome, etc.) | ✅ clipboard API | ❌ hide Share (or show disabled “Share not supported”) |
| Mobile (iOS Safari, etc.) | ✅ clipboard API | ✅ show Share |
| Insecure context (non-HTTPS) | Clipboard may fail | Share often unavailable → show Copy link + optional URL text |
| Clipboard fails | Show message + optional visible URL for manual copy | Same as above |

No need for legacy `document.execCommand('copy')` unless you explicitly support very old browsers; prefer clipboard API + fallback message.

---

## 5. UI copy (suggested)

- **Modal title:** “Share Groupr”
- **Subtitle / body:** “Share with a friend — you both get $5 off your next order.”
- **Copy link button:** “Copy link” → after copy: “Link copied!” (then revert).
- **Share button:** “Share” (only when `navigator.share` is available).
- **Close:** X icon + “Dismiss” or no label (aria-label="Close").

---

## 6. File and code checklist

- [ ] **`catalog/src/lib/referral.ts`** (or inline in ShareModal): `REFERRAL_URL`, `SHARE_TITLE`, `SHARE_TEXT`.
- [ ] **`catalog/src/components/ui/ShareModal.tsx`**: New component; props: `isOpen`, `onClose`; internal state: `copyStatus` ('idle' | 'success' | 'error'); clipboard + share logic; conditional Share button; focus trap + Escape.
- [ ] **`catalog/src/components/sections/PromoBanner.tsx`**: Add `useState` for `shareModalOpen`; “Share Groupr” `onClick` sets `shareModalOpen = true`; render `<ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} />`.
- [ ] **Styling:** Reuse existing `Button` and Tailwind; overlay and panel styled to match Navbar/drawer (e.g. dark overlay, light panel or vice versa to match design system).
- [ ] **Optional:** If footer “Refer a Friend” should open the same modal: pass a way to open ShareModal from layout (e.g. context or callback) or use a shared route/hash like `#share` that PromoBanner + Footer both react to. (Can be a follow-up.)

---

## 7. Out of scope (for later)

- Backend referral codes (unique per user); this plan uses a static `?ref=share` (or similar).
- Analytics events (e.g. “Share modal opened”, “Copy link clicked”, “Share completed”) — add later if needed.
- Social share buttons (Twitter, Facebook intent URLs) — can add to modal later as optional row.
- A dedicated `/refer` page; modal is the primary share entry for now.

---

## 8. Summary

| Step | Action |
|------|--------|
| 1 | Add referral constants (URL, share text). |
| 2 | Implement `ShareModal` (dialog, Copy link + conditional Share, feedback, a11y). |
| 3 | Wire PromoBanner “Share Groupr” to open `ShareModal`. |
| 4 | Test on desktop (Copy link only) and mobile (Copy link + Share). |
| 5 | (Optional) Wire “Refer a Friend” in footer to same modal. |

This gives a single, consistent “Share Groupr” flow with copy and native share, and a clear path to add referral tracking and analytics later.
