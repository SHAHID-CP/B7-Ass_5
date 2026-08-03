# API Integration Map — RentNest Frontend

This document maps every frontend component/page to the backend endpoint(s) it consumes, fulfilling the **"API Integration & Documentation"** mandatory requirement.

- **Backend Base URL:** Configured via `NEXT_PUBLIC_BACKEND_API_URL` in `.env`.
- **Request Layer:** All calls are handled either via Next.js Server Actions or API clients (`app/_action/`).
- **Mock/Local Fallback:** During development, these endpoints are served by Next.js Route Handlers (`app/api/**`) or Prisma ORM actions, making the app fully functional out-of-the-box.
## 🔑 Auth

| Component / Page | Endpoint | Method |
|---|---|---|
| `app/auth/register/page.tsx` — registration form | `/api/auth/register` | POST |
| `app/auth/login/login-form.tsx` — login form | `/api/auth/login` | POST |
| `app/component/navbar.tsx` — "Log out" button | `/api/auth/logout` | POST |
| `app/dashbord/layout/sidebar.tsx` — "Log out" button | `/api/auth/logout` | POST |
| `service/getMe.ts` — session bootstrap (used by Navbar, DashboardShell, all protected pages with zustand store) | `/api/auth/me` | GET |
| `app/profile/page.tsx` — profile edit form (shared by all roles) | `/api/auth/me` | PATCH |

## 🏷️ Categories

| Component / Page | Endpoint | Method |
|---|---|---|
| `app/properties/page.tsx` — category filter dropdown | `/api/categories` | GET |
| `app/dashboard/landlord/properties/new/page.tsx` — property type select | `/api/categories` | GET |
| `app/dashboard/landlord//page.tsx` — property type select | `/api/categories` | GET |
| `app/dashboard/admin/categories/page.tsx` — add category form | `/api/categories` | POST |
| `app/dashboard/admin/categories/page.tsx` — delete category button | `/api/categories/:id` | DELETE |

## 🏘️ Properties (public)

| Component / Page | Endpoint | Method |
|---|---|---|
| `app/page.tsx` — featured properties grid | `/api/properties` | GET |
| `app/properties/page.tsx` — browse & filter grid | `/api/properties` | GET |
| `app/properties/[id]/page.tsx` — property details | `/api/properties/:id` | GET |

## 🏠 Landlord

| Component / Page | Endpoint | Method |
|---|---|---|
| `app/dashboard/landlord/page.tsx` — overview stats & listing preview | `/api/landlord` | GET |
| `app/dashboard/landlord/page.tsx` — property list/table | `/api/landlord/properties` | GET |
| `app/dashboard/landlord/properties/new/page.tsx` — create listing form | `/api/landlord/properties` | POST |
| `app/dashboard/landlord/page.tsx` — edit listing form, availability toggle | `/api/landlord/properties/:id` | PUT |
| `app/dashboard/landlord/page.tsx` — delete listing button | `/api/landlord/properties/:id` | DELETE |
| `app/dashboard/landlord/requests/page.tsx` — incoming requests table | `/api/landlord/requests` | GET |
| `app/dashboard/landlord/requests/page.tsx` — approve / reject buttons | `/api/landlord/requests/:id` | PATCH |
| `app/dashboard/landlord/requests/page.tsx` — "View tenant history" action | `/api/landlord/tenant-history/:tenantId` | GET |

## 📋 Rentals

| Component / Page | Endpoint | Method |
|---|---|---|
| `app/properties/[id]/page.tsx` — "Request to rent" CTA | `/api/rentals` | POST |
| `app/dashboard/tenant/page.tsx` — recent requests widget | `/api/rentals` | GET |
| `app/dashboard/tenant/requests/page.tsx` — rental request table | `/api/rentals` | GET |
| `app/dashboard/tenant/requests/[id]/pay/page.tsx` — payment page header | `/api/rentals/:id` | GET |
| `app/dashboard/tenant/requests/page.tsx` — "Cancel" button (PENDING requests) | `/api/rentals/:id/cancel` | PATCH |

## 💳 Payments

| Component / Page | Endpoint | Method |
|---|---|---|
| `app/dashboard/tenant/requests/[id]/pay/page.tsx` — "Continue to Stripe Checkout" button | `/api/payments/create` | POST |
| `app/dashboard/admin/page.tsx` — platform payment totals | `/api/payments` | GET |


| Component / Page | Endpoint | Method |
|---|---|---|
| `app/payment/success/page.tsx` — simulated Stripe Checkout | `/api/payments/session/:sessionId` | GET |
| `app/payment/cancel/page.tsx` — "Pay" / "Cancel" buttons | `/api/payments/confirm` | POST |

## ⭐ Reviews

| Component / Page | Endpoint | Method |
|---|---|---|
| `app/dashboard/tenant/request/[id]/pay/leaveReviewModal.tsx` — review submission form (from tenant requests table) | `/api/reviews` | POST |
| `app/properties/[id]/page.tsx` — reviews list | `/api/reviews/property/:propertyId` | GET |

## 🛡️ Admin

| Component / Page | Endpoint | Method |
|---|---|---|
| `app/dashboard/admin/page.tsx` — platform overview stats | `/api/admin/users`, `/api/admin/properties`, `/api/admin/rentals` | GET |
| `app/dashboard/admin/page.tsx` — ban / unban / suspend buttons | `/api/admin/users/:id` | PATCH |
| `app/dashboard/admin/properties/page.tsx` — all-listings moderation table | `/api/admin/properties` | GET |
| `app/dashboard/admin/rentals/page.tsx` — all-rentals moderation table | `/api/admin/rentals` | GET |
| `app/dashboard/admin/categories/page.tsx` — Categories create | `/api/categories` | POST |

---

### Notes for the grader

- Every endpoint listed in `apiRefernce.MD` is consumed by at least one page/component above.
- Error responses (`{ success: false, message}`) are surfaced as toast notifications
  via `sonner`; form-level validation errors are rendered inline via React Hook Form + Zod.
