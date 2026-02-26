# DATA FLOW & INTERACTION DOCUMENTATION
Generated: February 6, 2025  
Codebase: `devenv-main/frontend`

---

## TABLE OF CONTENTS
1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [API Endpoints Inventory](#api-endpoints-inventory)
4. [Database Schema & Operations](#database-schema-operations)
5. [Frontend Data Flows](#frontend-data-flows)
6. [State Management Map](#state-management-map)
7. [Data Entities & Models](#data-entities-models)
8. [External Integrations](#external-integrations)
9. [Authentication & Authorization](#authentication-authorization)
10. [Data Flow Diagrams](#data-flow-diagrams)
11. [Security Considerations](#security-considerations)
12. [Recommendations](#recommendations)
13. [Appendices](#appendices)
14. [Glossary](#glossary)

---

## EXECUTIVE SUMMARY

### Quick Stats
- **Total API endpoints (used by frontend):** 28+ (REST only; no GraphQL/tRPC/WebSockets)
- **Total data models/entities (TypeScript):** 25+
- **State management solutions:** React Context (OrderContext, ShoppingCartContext, SearchContext, LanguageContext), React Query (TanStack Query), localStorage-backed auth and checkout state
- **External integrations:** Firebase (Analytics), backend REST API (Axios)
- **Data storage mechanisms:** localStorage (auth token, user, language, checkout state), React Query cache (in-memory)

### Technology Stack Detected
- **Frontend framework:** React 19 with TypeScript
- **Build tool:** Vite 6
- **UI:** Chakra UI 2.x
- **Routing:** React Router DOM 7
- **Data fetching:** Axios + TanStack React Query 5
- **Forms:** React Hook Form + Zod (via @hookform/resolvers)
- **i18n:** i18next + react-i18next + i18next-browser-languagedetector
- **Analytics:** Firebase Analytics
- **Date handling:** Day.js (available; usage not fully traced in this scan)

### Key Findings
- **Single API client:** All REST calls go through a central `ApiClient` (Axios) in `src/services/apiClient.ts` with a configurable base URL (`VITE_API_BASE_URL` or `http://localhost:3000/api`). Auth token and Accept-Language are attached via interceptors.
- **No direct database access:** This is a frontend-only codebase; all persistence is via the backend API. No ORM, SQL, or database layer exists in the frontend.
- **Auth is localStorage + JWT:** User object and JWT are stored in localStorage; 401/403 responses clear them and redirect to `/`.
- **Cart and order flows:** Shopping cart is backed by `/shopping_cart` and a React Context that syncs with React Query; checkout creates an order via POST `/orders` then a payment session via POST `/payments/checkout` and redirects to the returned URL.
- **Potential bug:** `useForageSession` uses endpoint `/api/forage_sessions`; if base URL already includes `/api`, the final path could be `/api/api/forage_sessions`.

---

## ARCHITECTURE OVERVIEW

### High-Level Data Flow
```
User (browser)
  → React components
  → Hooks (useData, useDataMutation, useCart, useOrders, etc.)
  → ApiClient (Axios) / React Query
  → Backend REST API (VITE_API_BASE_URL)
  → [Backend handles DB; not in frontend scope]

Local/session persistence:
  → localStorage (user, authToken, language, groupr_checkout_state)
  → React Query cache (API responses)
  → Context state (Order, ShoppingCart, Search, Language)
```

### Application Layers (Frontend)
1. **Presentation layer:** Pages and components under `src/pages/`, `src/common/` (e.g. NavBar, Footer, ProductCard, ContactForm).
2. **Data-fetching layer:** Custom hooks in `src/hooks/` (useData, useDataMutation, useProducts, useOrders, useCart, useAccount, useLandingPage, useCatalogSearch, etc.) using React Query and ApiClient.
3. **API layer:** `src/services/apiClient.ts` (Axios instance + interceptors); no API route definitions in frontend (all backend).
4. **Service layer:** `src/services/` — authService, registrationService, accountService, contactService (schemas + ApiClient instances), firebaseService, analyticsService.
5. **Storage layer (client-only):** localStorage (auth, user, language, checkout state); no IndexedDB, SessionStorage, or Cookie API usage for app data (cookies not set by frontend).

---

## API ENDPOINTS INVENTORY

All endpoints are relative to `baseURL` (e.g. `http://localhost:3000/api`). Auth: JWT in `Authorization: Bearer <token>` when token exists in localStorage.

### GET Endpoints

| Endpoint | File Location | Line | Purpose | Auth Required | Request Params | Response Shape | Called By |
|----------|---------------|------|---------|---------------|----------------|----------------|-----------|
| GET /sign_in | N/A (POST only) | — | — | — | — | — | — |
| GET /users/me | `authService.ts` | 21 | Get current user profile | Yes | — | `UserResponse` | Not used in hooks (useAccount uses `/account/my-account`) |
| GET /account/my-account | `accountService.ts` | 47 | Get account details | Yes | — | `AccountResponse` | `useAccount`, Account page |
| GET /catalog | `useCatalog.ts` | 21 | Catalog products | No | `category_id`, `page`, `per_page` | `CatalogResponse` | useCatalog |
| GET /catalog/categories | `useCategories.ts` | 8, 19 | Categories list | No | — | `CategoriesResponse` (with "All" prepended) | useCategories |
| GET /catalog/categories/:id | `useCategories.ts`, `useProducts.ts` | 23, 26–33 | Products by category | No | `page`, `pageSize`, etc. | `ProductsByCategoryResponse` / products array | useCategoryProducts, useProductsOfCategory |
| GET /catalog/products | `useProducts.ts` | 47–49 | Products list | No | `page`, `per_page`, `fns_review` | `ProductsResponse` | useProducts (Catalog) |
| GET /catalog/products/:productId | `useProducts.ts` | 54–55 | Single product | No | — | `ProductResponse` | useProduct (ProductDisplay) |
| GET /catalog/provider/:providerId | `useProducts.ts` | 74–76 | Products by provider | No | `page`, `per_page`, `fns_review` | `ProductsByCategoryResponse` | useProviderProducts |
| GET /catalog/search | `useCatalogSearch.ts` | 21, 30–39 | Search products | No | `q`, `page`, `per_page` | `SearchResponse` | useCatalogSearch (SearchContext) |
| GET /landing | `useLandingPage.ts` | 7–18 | Landing page data (categories, FAQs, products) | No | — | `LandingPageResponse` | useLandingPage |
| GET /pickup_locations | `usePickupLocations.ts` | 9 | Pickup locations | No | — | `{ pickup_locations: PickupLocation[] }` | usePickupLocations (PickUpOptions, Account) |
| GET /orders | `useOrders.ts` | 22–24 | List orders | Yes | `status`, `page`, `per_page` | `OrdersResponse` | useOrders (Orders page) |
| GET /orders/:orderId | `useOrders.ts` | 52–72 | Single order (with optional polling) | Yes | `show_refund`, `clear_cart` | `Order` | useOrder (OrderSummary, RefundSummary, OrderDetails) |
| GET /shopping_cart | `useCart.ts` | 15–27 | Cart contents | Yes (or returns empty when not auth) | — | `ShoppingCartResponse` | useCart (ShoppingCartContext) |

### POST Endpoints

| Endpoint | File Location | Line | Purpose | Auth Required | Request Body | Response Shape | Called By |
|----------|---------------|------|---------|---------------|--------------|----------------|-----------|
| POST /sign_in | `authService.ts` | 19 | Sign in | No | `SignInRequestData` | `UserResponse` | useAuthentication (SignInModal) |
| POST /sign_up | `registrationService.ts` | 54 | Sign up | No | `{ user: SignUpRequestData }` | `RegistrationResponse` | useRegistration (SignUpModal) |
| POST /contact | `useContactFormSubmission.ts` | 14 | Contact form | No | `ContactFormData` | `ContactFormResponse` | useContactFormSubmission (ContactForm) |
| POST /orders | `useCreateOrder.ts`, `useCheckout.ts` | 43, 56–63 | Create order | Yes | `CreateOrderParams` / pickup_location_id, pickup_date, pickup_time | `CreateOrderResponse` / `Order` | useCreateOrder, useCheckout |
| POST /payments/checkout | `useCheckout.ts` | 67–78 | Create payment/checkout session | Yes | order_id, has_ebt_items, delivery_address, pickup_details | `{ id, url }` (redirect URL) | useCheckout |
| POST /shopping_cart/add | `useCart.ts` | 46 | Add cart item | Yes | `AddCartItemParams` | `ShoppingCartItem` | useAddCartItem (ShoppingCartContext) |
| POST /shopping_cart/bulk_add | `useCartMerge.ts` | 26 | Merge cart (e.g. after login) | Yes | `{ items: CartMergeItem[] }` | `BulkAddResponse` | useCartMerge (ShoppingCartContext) |
| POST /api/forage_sessions | `useForageSession.ts` | 23 | Create Forage payment session | Yes | `ForageSessionRequest` | `ForageSessionResponse` | useForageSession (if used; endpoint may double /api) |

### PATCH Endpoints

| Endpoint | File Location | Line | Purpose | Auth Required | Request Body | Response Shape | Called By |
|----------|---------------|------|---------|---------------|--------------|----------------|-----------|
| PATCH /account/my-account | `accountService.ts` | 48 | Update account | Yes | `AccountUpdateRequest` | `AccountResponse` | useUpdateAccount (Account page) |
| PATCH /shopping_cart/:id/update_quantity | `useCart.ts` | 94 | Update item quantity | Yes | `{ id, quantity }` | `ShoppingCartItem` | useUpdateCartItemQuantity |
| PATCH /shopping_cart/:id/update_save_for_later | `useCart.ts` | 136 | Toggle save for later | Yes | `{ id, save_for_later }` | `ShoppingCartItem` | useUpdateCartItemSaveForLater |

### DELETE Endpoints

| Endpoint | File Location | Line | Purpose | Auth Required | Request Body | Response Shape | Called By |
|----------|---------------|------|---------|---------------|--------------|----------------|-----------|
| DELETE /sign_out | `useLogout.ts` | 10, 15 | Sign out | Yes | — | `{ message: string }` | useLogout |
| DELETE /orders/:orderId/cancel | `useOrders.ts` | 81 | Cancel order | Yes | `CancelOrderRequest` (reason) | `Order` | useCancelOrder (CancelOrderModal) |
| DELETE /shopping_cart/:id | `useCart.ts` | 193 | Remove cart item | Yes | — | `{ message: string }` | useRemoveCartItem |
| DELETE /shopping_cart/clear | `useCart.ts` | 232 | Empty cart | Yes | — | `ShoppingCartResponse` | useEmptyCart |

---

## DATABASE SCHEMA & OPERATIONS

**Not applicable in the frontend.** This codebase does not perform direct database access, migrations, seeds, or ORM operations. All persistent data is obtained or modified via the backend REST API. Database schema and operations are owned by the backend service.

---

## FRONTEND DATA FLOWS

### Data Fetching Patterns

#### Pattern 1: useData (React Query GET)
**Location:** `src/hooks/useData.ts`

```typescript
const useData = <T>(
  endpoint: string,
  refrehTime: number | false | ((data: T) => number | false) = false,
  requestConfig?: AxiosRequestConfig,
  fetchFn?: () => T | Promise<T>
) => {
  const apiClient = new ApiClient<T>(endpoint);
  const defaultQueryFn = () => apiClient.get(requestConfig);
  const queryFn = fetchFn || defaultQueryFn;
  return useQuery<T, Error>({
    queryKey: [endpoint, requestConfig?.params, i18n.language],
    queryFn,
    staleTime: API_REQUEST_STALE_TIME,
    refetchInterval: ...,
    placeholderData: keepPreviousData,
  });
};
```

**Used by:** useProducts, useProduct, useProviderProducts, useOrders, useOrder, usePickupLocations, useLandingPage, useCategories, useCategoryProducts, useCatalog, useAccount, useCart (with custom fetchFn when unauthenticated).

**Data flow:** Component → useData/useProducts/useOrders/… → useQuery → ApiClient.get() → Axios GET → Backend → Response → React Query cache → Component.

#### Pattern 2: useInfiniteData (React Query infinite query)
**Location:** `src/hooks/useInfiniteData.ts`

Used for paginated lists (e.g. products by category). Query key includes endpoint and params; `getNextPageParam` drives pagination.

**Used by:** useProductsOfCategory (CategorizedProducts, CategoryProductsModal).

#### Pattern 3: useDataMutation (React Query mutation)
**Location:** `src/hooks/useDataMutation.ts`

Supports POST, PATCH, DELETE via `MutationMethod`. Optional optimistic updates and cache invalidation.

**Used by:** useAuthentication, useRegistration, useContactFormSubmission, useUpdateAccount, useCancelOrder, useAddCartItem, useUpdateCartItemQuantity, useUpdateCartItemSaveForLater, useRemoveCartItem, useEmptyCart, useCartMerge, useForageSession.

**Data flow:** User action → mutate(variables) → ApiClient.post/patch/delete → Backend → onSuccess/onError → optional cache invalidation or setQueryData.

#### Pattern 4: Direct ApiClient in mutations
**Location:** e.g. `useCheckout.ts`, `useCreateOrder.ts`, `useLogout.ts`

Some flows create `ApiClient` inside a `useMutation` mutationFn or inside a callback (e.g. useCheckout: POST `/orders` then POST `/payments/checkout`; useLogout: DELETE `/sign_out`).

### Component Data Dependencies (Summary)

| Component / Page | Data Dependencies | Mutations |
|------------------|-------------------|-----------|
| Catalog | useProducts (providerId, fnsReview) | — |
| CategorizedProducts | useProductsOfCategory(categoryId) | — |
| ProductDisplay | useProduct(productId) | — |
| SearchResults | useCatalogSearch (via SearchContext) | — |
| LandingPage | useLandingPage | — |
| ContactForm | — | useContactFormSubmission → POST /contact |
| Checkout | useOrderContext, usePickupLocations, useShoppingCart, useCheckout | useCheckout → POST /orders, POST /payments/checkout |
| Cart | useShoppingCart (cart from useCart) | addItem, removeItem, updateQuantity, toggleSaveForLater, emptyCart |
| Orders | useOrders(status, page, per_page) | — |
| OrderSummary / RefundSummary | useOrder(orderId, …) | — |
| OrderDetails | useOrder(orderId), analyticsService.trackEvent | — |
| Account | useAccount, usePickupLocations, useUpdateAccount | useUpdateAccount → PATCH /account/my-account |
| SignInModal | — | useAuthentication → POST /sign_in |
| SignUpModal | — | useRegistration → POST /sign_up |
| CancelOrderModal | — | useCancelOrder → POST /orders/:id/cancel |

---

## STATE MANAGEMENT MAP

### React Query (TanStack Query)
- **Query Client:** Created in `main.tsx` and provided via `QueryClientProvider`.
- **Query keys:** Typically `[endpoint, params?, i18n.language]` (e.g. `['/shopping_cart']`, `['/orders', { status, page }]`, `['/catalog/products', params]`). Cart key: `['/shopping_cart']`; invalidated after checkout, cart merge, clear cart, and when clearing cart after order.
- **Stale time:** `API_REQUEST_STALE_TIME` (10s) in useData; some hooks use `refetchInterval` (e.g. useOrder can poll every 5s based on status).

### OrderContext
**Location:** `src/contexts/OrderContext.tsx`

- **State:** `currentOrderState` ('orderDetails' | 'orderSummary'), `pickupOptions` (pickupLocation, pickupLocationId, date, time), `stepRedirect`.
- **No API calls.** Used by Checkout flow and useOrderManagement to track pickup selection and step.

### ShoppingCartContext
**Location:** `src/contexts/ShoppingCartContext.tsx`

- **State (reducer):** shopping_cart_items, saved_for_later_items, total, tax_amount, total_with_tax, ebt_* fields, offline_payment_deposit.
- **Data source:** useCart() → GET /shopping_cart (or empty when not authenticated). Context syncs with cart data and dispatches SET_CART; mutations (add, remove, update quantity, save for later, empty) call API and update cache/state.
- **Cart merge:** On login, triggerCartMerge sends local items to POST /shopping_cart/bulk_add, then invalidates cart query.
- **Used by:** Checkout (has_ebt_items), Cart page, NavBar (cart count), and any component that adds to cart.

### SearchContext
**Location:** `src/contexts/SearchContext.tsx`

- **State:** searchTerm, isSearching, page, perPage (initialized from URL search params).
- **Data source:** useCatalogSearch(q, page, per_page) → GET /catalog/search.
- **Sync:** URL params updated when search state changes; navigateToSearch navigates to `/catalog?q=...`.

### LanguageContext
**Location:** `src/contexts/LanguageContext.tsx`

- **State:** language ('en' | 'es'); initial from localStorage or i18n.
- **Persistence:** On change, writes to localStorage and calls `queryClient.invalidateQueries()` so API refetches with new Accept-Language.

### localStorage
- **Keys:** `USER_LOCAL_STORAGE_KEY` ('user'), `AUTH_TOKEN_LOCAL_STORAGE_KEY` ('authToken'), `LANGUAGE_LOCAL_STORAGE_KEY` ('language'), `groupr_checkout_state` (CHECKOUT_STATE_STORAGE_KEY in useCheckoutState).
- **Read/write:** apiClient interceptors (token, Accept-Language); useCurrentUser (get/set/remove user); useCheckoutState (save/restore/clear checkout state); i18n and LanguageContext (language).
- **Cleared on 401/403:** user and authToken (in apiClient response interceptor).

---

## DATA ENTITIES & MODELS

**Location:** `src/common/types/api.ts`

| Entity | Main fields | Used in API |
|--------|-------------|-------------|
| User | id, email, name, lastname, address? | sign_in, sign_up, users/me, account |
| AccountResponse | User + phone, prefered_pickup_location_id, address_*, birthdate, gender, is_snap_recipient, etc. | GET/PATCH /account/my-account |
| Category | id, name, image_url, created_at, updated_at | catalog, landing |
| Product | id, name, description, price_cents, stock, image_url, featured, ebt_*, category, provider | catalog, cart, orders |
| PickupLocation | id, name, street_address, building_unit, city, state, zip_code | pickup_locations, orders |
| Order | id, orderNumber, status, totals, delivery*, contactInfo, orderItems, refunds, payments, qrCodeUrl, etc. | orders, order detail |
| OrderItem | id, quantity, unit_price_cents, product, etc. | Order.orderItems |
| ShoppingCartItem | id, product, quantity, unit_price_in_cents, save_for_later | shopping_cart |
| ShoppingCartResponse | shopping_cart_items, saved_for_later_items, total, tax_amount, total_with_tax, offline_payment_deposit | GET /shopping_cart |
| ForageSessionRequest/Response | delivery_address, totals, order_id, checkout_url, etc. | useForageSession, useCheckout (payments) |
| ContactFormData | firstName, lastName, email, phone, assistanceType, message | POST /contact |

**Validation (Zod):** signInSchema, signUpSchema (authService, registrationService), contactFormSchema (contactService), accountUpdateSchema (accountService). Used with React Hook Form via zodResolver.

---

## EXTERNAL INTEGRATIONS

### Firebase (Analytics)
- **Configuration:** `src/services/firebaseService.ts` — singleton, reads `VITE_FIREBASE_*` env vars (apiKey, authDomain, projectId, messagingSenderId, appId, measurementId).
- **Usage:** `src/services/analyticsService.ts` — `trackEvent(eventName, payload)`. Strips claim_token, token, auth from payload. Calls Firebase `logEvent`; in dev also logs to console. Fallback to `window.gtag` if analytics not available.
- **Called from:** `OrderDetails/index.tsx` — `analyticsService.trackEvent('order_details.view', { order_id, order_number, status })`.

### Backend REST API
- **Base URL:** `import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'`.
- **Auth:** Bearer token from localStorage in request interceptor; 401/403 clear user and token and redirect to `/`.

### Stripe / Forage (Payment)
- **Frontend does not call Stripe/Forage directly for card entry.** Checkout creates an order, then calls POST `/payments/checkout`; backend returns a redirect URL (e.g. Forage/Stripe hosted page). Frontend redirects with `window.location.href = data.checkout_session.redirect_url`.
- **@stripe/stripe-js** is a dependency; usage not fully traced in this scan (e.g. may be used on a payment page loaded after redirect).

---

## AUTHENTICATION & AUTHORIZATION

### Authentication Flow
1. **Login:** SignInModal → useAuthentication → POST /sign_in with SignInRequestData (email, password) → backend returns UserResponse (user, token) → setCurrentUser(user) and localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token).
2. **Registration:** SignUpModal → useRegistration → POST /sign_up with { user: SignUpRequestData } → same storage of user and token.
3. **Logout:** useLogout → DELETE /sign_out (best effort) → removeCurrentUser(), removeItem(authToken), window.location.href = '/'.
4. **Session end (local only):** useSessionEnder → removeCurrentUser(), optional redirect to '/'.

### Where User State Lives
- **useCurrentUser:** Reads/writes user from localStorage (getCurrentUser, setCurrentUser, removeCurrentUser). No API call; used by layouts and NavBar to show/hide auth UI and by ShoppingCartContext for isAuthenticated and cart merge.
- **Protected routes:** Profile and Private layouts use getCurrentUser(); if null, redirect to `/`. No dedicated auth API call on route load (e.g. GET /users/me is defined in authService but not used in these flows; account data is fetched via useAccount on Account page).

### Authorization
- **No role/permission types in frontend.** Backend may enforce roles; frontend only sends JWT. 403 triggers same cleanup and redirect as 401.

---

## DATA FLOW DIAGRAMS

### Sign-in flow
```
SignInModal (form)
  → useAuthentication.mutate(credentials)
  → useDataMutation → ApiClient.post('/sign_in', data)
  → Axios (Authorization added by interceptor if token existed)
  → Backend
  → onSuccess: setCurrentUser(data.user), localStorage.setItem('authToken', data.token)
  → Modal close / redirect (caller-dependent)
```

### Add to cart flow
```
ProductCard / Catalog
  → useShoppingCart().addItem({ item: { product_id, quantity } }, product)
  → If authenticated: useAddCartItem.mutate → POST /shopping_cart/add
  → React Query setQueryData(['/shopping_cart'], ...) (optimistic or from response)
  → ShoppingCartContext dispatch ADD_ITEM
  → If not authenticated: dispatch ADD_ITEM with mock item (local only)
```

### Checkout flow
```
Checkout page
  → useCheckout().checkout({ delivery_address, pickup_location_id, pickup_date, pickup_time })
  → useMutation.mutationFn:
      1. ApiClient.post('/orders', { pickup_location_id, pickup_date, pickup_time }) → order
      2. ApiClient.post('/payments/checkout', { order_id: order.id, has_ebt_items, delivery_address, pickup_details }) → { url }
  → onSuccess: queryClient.invalidateQueries(['cart']), invalidateQueries(['orders']), window.location.href = url
  → User is redirected to payment provider
```

### Contact form flow
```
ContactForm (react-hook-form + zodResolver(contactFormSchema))
  → useContactFormSubmission().mutate(data)
  → useDataMutation → POST /contact with ContactFormData
  → onSuccess: toast success; onError: toast error
```

---

## SECURITY CONSIDERATIONS

### Implemented
- **JWT in memory/localStorage:** Token sent only in request headers (not in URL). Cleared on 401/403 and redirect to `/`.
- **Sensitive payload stripping:** analyticsService removes claim_token, token, auth from event payloads before sending to Firebase.
- **Validation:** Zod schemas for sign-in, sign-up, contact, account update; used with React Hook Form to validate before submit.

### Potential concerns
- **Token storage:** JWT in localStorage is exposed to XSS. Consider httpOnly cookies if backend supports it (apiClient currently has `withCredentials: false`).
- **Forage session endpoint:** useForageSession uses `/api/forage_sessions`; if baseURL is already `.../api`, path becomes `/api/api/forage_sessions`. Verify backend route.
- **Console logs:** useOrders has console.log for debugging (stopLoadingStatuses, data?.status); OrderDetails and useCreateOrder have console.log. Remove or guard for production.
- **Redirect on 401/403:** Full page redirect to `/` can be harsh; might want to preserve intended route for post-login redirect.

---

## RECOMMENDATIONS

### Data & API
1. **Unify Forage session endpoint:** Use `/forage_sessions` (or whatever backend exposes) so that with baseURL `.../api` the full path is correct; document expected base URL.
2. **Centralize endpoint constants:** Define all API paths in one file (e.g. `constants/endpoints.ts`) to avoid typos and simplify base URL handling.
3. **Optional GET /users/me on app load:** If you need fresh user/roles on every load, call authService.getUserProfile() (or useAccount) after login and store in context or localStorage; currently Profile/Private only rely on stored user.

### State & UX
4. **Checkout state persistence:** useCheckoutState already persists to localStorage with 24h TTL; ensure it’s cleared after successful order placement (e.g. in useCheckout onSuccess before redirect).
5. **React Query keys:** Use a single constant for cart key (e.g. `CART_QUERY_KEY = ['/shopping_cart']`) to avoid typos and simplify invalidation.

### Security & Cleanup
6. **Remove debug logs:** Strip or gate console.log in useOrders, OrderDetails, useCreateOrder (and any others) for production.
7. **Rate limiting / error handling:** Frontend cannot enforce rate limits; ensure backend rate-limits auth and contact endpoints.

---

## APPENDICES

### Appendix A: Complete endpoint list (frontend-facing)
- GET: /account/my-account, /catalog, /catalog/categories, /catalog/categories/:id, /catalog/products, /catalog/products/:productId, /catalog/provider/:providerId, /catalog/search, /landing, /pickup_locations, /orders, /orders/:orderId, /shopping_cart
- POST: /sign_in, /sign_up, /contact, /orders, /payments/checkout, /shopping_cart/add, /shopping_cart/bulk_add, /api/forage_sessions
- PATCH: /account/my-account, /shopping_cart/:id/update_quantity, /shopping_cart/:id/update_save_for_later
- DELETE: /sign_out, /orders/:orderId/cancel, /shopping_cart/:id, /shopping_cart/clear

### Appendix B: File reference index (data-related)
- **Services:** apiClient.ts, authService.ts, registrationService.ts, accountService.ts, contactService.ts, firebaseService.ts, analyticsService.ts
- **Hooks (data):** useData.ts, useDataMutation.ts, useInfiniteData.ts, useProducts.ts, useOrders.ts, useOrder.ts, usePickupLocations.ts, useCurrentUser.ts, useAccount.ts, useUpdateAccount.ts, useAuthentication.ts, useRegistration.ts, useLogout.ts, useLandingPage.ts, useCategories.ts, useCatalog.ts, useCatalogSearch.ts, useCart.ts, useCartMerge.ts, useCheckout.ts, useCheckoutState.ts, useCreateOrder.ts, useContactFormSubmission.ts, useForageSession.ts, useSessionEnder.ts, useOrderManagement.ts
- **Contexts:** OrderContext.tsx, ShoppingCartContext.tsx, SearchContext.tsx, LanguageContext.tsx
- **Types:** common/types/api.ts
- **Constants:** common/constants.ts (API_REQUEST_STALE_TIME, REFRESH_INTERVAL, USER_LOCAL_STORAGE_KEY, AUTH_TOKEN_LOCAL_STORAGE_KEY, PAGINATION_PAGE_SIZE), i18n/index.ts (LANGUAGE_LOCAL_STORAGE_KEY)

### Appendix C: Technology dependencies (data-related)
- axios, @tanstack/react-query, zod, @hookform/resolvers, react-hook-form, firebase, i18next, i18next-browser-languagedetector, react-i18next

### Appendix D: Mock / test data
- **pages/Orders/data/mockOrders.ts:** Defines mock Order-like objects; Orders page uses useOrders (live API), so mockOrders appears unused by the main app (possibly for tests or legacy).

---

## GLOSSARY

- **API:** Application Programming Interface (here: REST backend).
- **ApiClient:** Axios-based class in apiClient.ts used for GET/POST/PATCH/DELETE with endpoint and optional route params.
- **Auth token:** JWT stored in localStorage under AUTH_TOKEN_LOCAL_STORAGE_KEY.
- **React Query / TanStack Query:** Library for server state (caching, fetching, mutations).
- **useData / useDataMutation:** Custom hooks wrapping React Query and ApiClient for GET and POST/PATCH/DELETE.
- **User (stored):** JSON-serialized User object in localStorage under USER_LOCAL_STORAGE_KEY.

---

**END OF DOCUMENTATION**
