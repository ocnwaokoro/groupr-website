# GRO-794 — Auth Modal: Single-Screen Design

**Date:** 2026-04-20
**Ticket:** GRO-794
**Branch:** `obinna/gro-794-google-sso-magic-link-onboarding` (frontend repo)
**Status:** Design approved, ready for implementation plan

## Problem

The current sign-in modal uses a 2-phase flow: SSO buttons + "or continue with email" → email → Continue → fade transition → password screen with email echoed as centered gray text and a back chevron.

The 2-phase split feels wrong, and diagnosis revealed why: **2-phase auth is only justified when phase 1 does account-type routing** (Google, Microsoft, Okta — email lookup picks the right challenge in phase 2). Groupr isn't doing that. The split is purely aesthetic, which makes every downstream execution problem (fade direction, plain-text email, back-chevron affordance) unfixable — the phase has no reason to exist.

## Audience context

Groupr serves elderly, low-income, often Spanish-speaking users in the Bronx. Recent user testing surfaced heavy friction at every step. Key constraints:

- Heavy Gmail usage — SSO is a large lever
- Password recall is the #1 failure point for 65+ users
- Tab/app switching is a top abandonment mode — magic-link is wrong as primary, OK as recovery
- WCAG 2.2 AA touch targets (44×44 min, 56px chosen for generous older-finger affordance)
- Every added screen roughly doubles comprehension load for ESL/Spanish users

## Precedent (2026 grocery + e-commerce)

| App | Pattern |
|---|---|
| Instacart, DoorDash, Uber Eats | Single screen, phone + SMS OTP + SSO |
| Walmart, Kroger, FreshDirect | Single screen, email + password + SSO |
| GitHub, Figma, Stripe, Shopify | Single screen, email + password + SSO |

**Zero** major grocery apps use 2-phase. Only identity providers (Google, Microsoft, Okta, Amazon) use 2-phase, and only because they do account-type routing.

## Decision

**Collapse the sign-in modal to a single screen.** Match the existing sign-up modal structure exactly, eliminating the current sign-in/sign-up asymmetry.

## Layout

```
┌────────────────────────────────────────┐
│          [logo]              [×]       │  ← header, gray bg
├────────────────────────────────────────┤
│                                        │
│         Iniciar sesión                 │  ← 28px heading
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ G  Continuar con Google          │  │  ← 56px, SSO primary
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │    Continuar con Apple         │  │  ← 56px, SSO secondary
│  └──────────────────────────────────┘  │
│                                        │
│  ─────────  o usa tu correo  ───────── │  ← 12px gray divider
│                                        │
│  Correo electrónico                    │
│  ┌──────────────────────────────────┐  │
│  │ jane@example.com                 │  │  ← 56px, 18px text
│  └──────────────────────────────────┘  │
│                                        │
│  Contraseña           ¿Olvidaste?      │  ← label row + link right
│  ┌──────────────────────────────────┐  │
│  │ ••••••••                         │  │  ← 56px, 18px text
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │       Iniciar sesión             │  │  ← 56px, brand primary
│  └──────────────────────────────────┘  │
│                                        │
│     ¿No tienes cuenta? Regístrate      │  ← 14px, centered
└────────────────────────────────────────┘
```

## Code changes (SignInModal.tsx)

| Remove | Reason |
|---|---|
| `phase` state (`'entry' \| 'password'`) | No phases |
| `goToPassword` handler | No phases |
| `goBack` handler | No back button |
| `AnimatePresence` wrappers + `motion.div` keyed on `phase` | No transition between phases |
| `fade` variants (lines 32–36) | Unused once transition is removed |
| `emailTouched` state + validation | Single-form submit handles validation |
| Phase-2 email-echo `Text` (line 150) | Email stays in the input field |
| Phase-2 back-chevron `HStack` (lines 145–148) | No phase to go back to |
| Hidden readonly email input (line 171) | Email is now visible in the real field |
| `FaChevronLeft` import | Unused |

| Add / reposition | Detail |
|---|---|
| Password field | Moved up into the main form, always visible |
| "¿Olvidaste?" link | Positioned right-aligned in the password `FormLabel` row (Stripe/Linear/Figma pattern) — visible before failure, not only after |
| `autoComplete="email"` on email input | Password-manager compatibility |
| `autoComplete="current-password"` on password input | Password-manager compatibility |

## i18n

| Key | Status |
|---|---|
| `common.navbar.signInModal.orUseYourEmail` | **Add** — "or use your email" / "o usa tu correo". Scoped to sign-in instead of reaching cross-namespace into `onboarding.step4.orContinueWithEmail` |
| `onboarding.step4.orContinueWithEmail` | Keep (SignUpModal + onboarding step4 still use it) |
| `common.navbar.signInModal.enterPassword` | **Not added** — no phase-2 heading anymore (was pending, now unnecessary) |
| All existing sign-in keys (heading, emailLabel, passwordLabel, forgotPassword, login, dontHaveAccount, signUp) | Keep unchanged |

Mirror deletions/renames in `es.json`.

## Accessibility

- All interactive elements ≥ 56px tall (WCAG 2.2 AA: 44px min)
- Field text 18px, labels 16px
- Tab order: SSO Google → SSO Apple → email → password → submit → forgot → sign-up link
- Close button `aria-label="Cerrar" / "Close"`
- Password input `type="password"` with optional show/hide toggle (out of scope for this PR — note as follow-up)
- Focus ring on all interactive elements preserved from Chakra defaults
- `autoComplete` hints for browser password managers (elderly-critical)

## Parallel work

**SignUpModal** — no changes. Already matches the target structure (SSO → divider → form → submit). This PR brings SignInModal into parity.

**PhoneSignInFlow** — no changes. Still uses the shared `formTokens`.

**formTokens.ts** — no changes. The same INPUT / PRIMARY_BTN / SSO_BTN tokens serve the new layout.

## Explicit non-goals (for this PR)

- **SMS OTP / phone-first auth** — strong future direction (Instacart/DoorDash model, arguably better fit for Bronx audience), but requires Twilio backend work. File as follow-up ticket.
- **Passkeys** — not production-ready for this cohort in 2026. Revisit in 12 months.
- **Account-existence lookup on email blur** — rejected (adds enumeration risk + network hop with no UX payoff).
- **Password show/hide toggle** — nice-to-have, not blocking.
- **Magic-link as recovery fallback** — nice-to-have, not blocking. "Forgot password" route already exists and is sufficient.

## Testing

- Vitest + RTL: render the collapsed modal, assert SSO buttons + email + password + submit all present in one pass (no phase toggling)
- Submit with valid email/password → `useAuthentication.mutate` called with correct payload
- Submit with invalid email → inline error, no network call
- Click Google SSO → `handleSsoSuccess` triggered (mock `FirebaseSignInButtons`)
- Click "Forgot?" link → routes to `/forgot-password`, closes modal
- Click "Sign up" link → `onShowSignUp` callback fired
- i18n: render in ES, assert all visible strings come from `es.json`

## Out-of-band verification (post-merge)

- End-to-end smoke: real Google sign-up creates a real Groupr user (carryover from original ticket scope)
- Manual: test on 360px-wide mobile (iPhone SE) — assert whole modal fits above fold without scroll

## Evidence trail

- Baymard (2024–25 checkout research): each added "Continue" click on auth/checkout costs 3–8% on mobile, worse for older cohorts
- NN/g "Seniors as Web Users" (2024): Google SSO measurably reduces auth abandonment for 65+ Gmail users
- NN/g (2023) on 65+ users: tab/app switching is top failure mode → magic-link wrong as primary
- FIDO Alliance 2026: passkey adoption still <10% at Amazon/Target/Kroger
- Nielsen + Google Material multilingual UX: every added screen roughly doubles comprehension load for ESL users
- WCAG 2.2 AA: 44×44px minimum touch targets
