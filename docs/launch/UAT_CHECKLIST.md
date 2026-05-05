# UAT Test Suite — bookedai.au Platform

> **Version:** 1.0 | **Date:** 2026-05-04
> **Tester:** _________________________ | **Environment:** Production
> **Browser:** Chrome 126+ / Safari 17+ / Firefox 127+

---

## Instructions

- Execute each test case in order within its category.
- Record the status: **PASS**, **FAIL**, or **SKIP** (with reason).
- For FAIL results, capture a screenshot and note the observed behavior.
- Re-test after fixes and update the status column.

---

## Category 1: Landing Page (g.bookedai.au)

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| LP-001 | Page loads successfully | 1. Navigate to https://g.bookedai.au | Page loads within 3 seconds, no console errors, HTTP 200 | |
| LP-002 | Logo displays correctly | 1. Observe the navbar | Official bookedai.au logo (logo-light.png) is visible, properly sized, not distorted | |
| LP-003 | EN/VI language toggle | 1. Click language toggle in navbar 2. Select Vietnamese 3. Observe page content 4. Toggle back to English | All page text translates to Vietnamese via Google Translate; reverts cleanly to English | |
| LP-004 | Chat widget opens | 1. Locate floating chat button (bottom-right) 2. Click to open | Chat widget expands, input field is visible, can type a message | |
| LP-005 | Chat sends message | 1. Open chat widget 2. Type "What services do you offer?" 3. Press Send | AI responds with relevant service information (or fallback message if AI unavailable) | |
| LP-006 | Hero section visible | 1. Scroll to top of page | Hero section shows headline, gradient accent, two CTA buttons, trust badges | |
| LP-007 | Stats section animates | 1. Scroll down to stats section | 4 animated counters trigger on scroll (IntersectionObserver), numbers count up | |
| LP-008 | Features section | 1. Scroll to features section | 3-column grid displays, 1px gap borders visible, hover effects work on each card | |
| LP-009 | How It Works section | 1. Scroll to How It Works | 3 numbered steps displayed clearly with descriptions | |
| LP-010 | Pricing section | 1. Scroll to pricing section | 3 pricing tiers visible ($29/$99/$450), middle card is featured/highlighted | |
| LP-011 | Pricing CTA buttons | 1. Click "Get Started" on any pricing card | Navigates to booking.g.bookedai.au with correct service pre-selected | |
| LP-012 | Testimonials section | 1. Scroll to testimonials | 3 quote cards display with star ratings and customer names | |
| LP-013 | CTA section | 1. Scroll to bottom CTA section | Strong heading visible with action button | |
| LP-014 | Footer section | 1. Scroll to footer | Links, social icons, and copyright text are visible and correct | |
| LP-015 | Footer links work | 1. Click each footer link | Each link navigates to the correct destination, no 404 errors | |
| LP-016 | Navbar glassmorphism | 1. Scroll down the page | Navbar has blur/glassmorphism effect, remains sticky at top | |
| LP-017 | Dark theme consistency | 1. Inspect full page visually | Background is #0a0a0a, text is #ededed, accent is #0070f3, no white-flash | |
| LP-018 | PWA manifest | 1. Open DevTools > Application > Manifest | Valid manifest.json loads, app name and icons are correct | |
| LP-019 | No console errors | 1. Open DevTools > Console 2. Reload page | Zero JavaScript errors or warnings (network errors acceptable in dev) | |

---

## Category 2: Booking Flow (booking.g.bookedai.au)

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| BK-001 | Booking page loads | 1. Navigate to https://booking.g.bookedai.au | 4-step booking wizard loads, Step 1 (Service) is active | |
| BK-002 | Select service | 1. View service list 2. Click on "AI Starter Session ($29)" | Service is selected, highlighted, price shown, Next button enabled | |
| BK-003 | Service details display | 1. Select a service | Duration, price (GST-inclusive), and description are visible | |
| BK-004 | Availability calendar | 1. Proceed to Step 2 (Time) | Calendar displays with available time slots highlighted | |
| BK-005 | Select time slot | 1. Choose an available date 2. Select a time slot | Slot is highlighted, date and time shown in summary | |
| BK-006 | Unavailable slots blocked | 1. Attempt to click a grayed-out/unavailable slot | Slot is not selectable, visual indicator shows unavailable | |
| BK-007 | Enter contact details | 1. Proceed to Step 3 (Details) 2. Fill in name, email, phone | Form validates correctly, all fields accept input | |
| BK-008 | Required field validation | 1. Leave required fields empty 2. Click Next | Validation errors appear for each empty required field | |
| BK-009 | Email format validation | 1. Enter "invalid-email" in email field | Error message: invalid email format | |
| BK-010 | Phone format validation | 1. Enter phone number in Australian format | Accepts valid AU phone numbers (04xx xxx xxx or +614xxxxxxxx) | |
| BK-011 | Payment step displays | 1. Proceed to Step 4 (Payment) | Payment options visible: Stripe card payment AND bank transfer | |
| BK-012 | Stripe checkout | 1. Select card payment 2. Click Pay | Redirects to Stripe Checkout page with correct amount and service name | |
| BK-013 | Stripe test payment | 1. Complete Stripe Checkout with test card 4242 4242 4242 4242 | Payment succeeds, redirected to confirmation page | |
| BK-014 | Bank transfer option | 1. Select bank transfer / PayID | Bank details displayed: Van Long DO, BSB 062-517, Account 11404999, reference code shown | |
| BK-015 | QR payment (VND) | 1. Switch language to Vietnamese 2. Select bank transfer | VietQR code displays with Vietcombank details and real-time AUD/VND rate | |
| BK-016 | Pay Later option | 1. Select "Pay Later" if available | Booking created with PENDING_PAYMENT status, instructions shown | |
| BK-017 | Booking confirmation | 1. Complete any payment method | Confirmation page shows booking ID, service, date, time, and status | |
| BK-018 | Booking persisted to DB | 1. Complete a booking 2. Check API /booking endpoint or admin dashboard | Booking appears in database with correct details | |
| BK-019 | Hold slot mechanism | 1. Begin booking 2. Select time slot 3. Wait | Slot is held for 10 minutes, unavailable to other users | |
| BK-020 | Hold expiry | 1. Hold a slot 2. Wait 10+ minutes without completing | Slot is released, becomes available again | |
| BK-021 | Progress indicator | 1. Navigate through booking steps | Step indicator (1-4) updates correctly, completed steps are marked | |
| BK-022 | Back navigation | 1. On Step 3, click Back | Returns to Step 2 with previous selection preserved | |
| BK-023 | Error boundary | 1. Trigger a network error during booking | Error boundary catches the error, user sees a friendly message, not a crash | |
| BK-024 | Loading skeletons | 1. Reload booking page on slow connection | Skeleton loaders appear while content loads | |

---

## Category 3: User Dashboard (app.g.bookedai.au)

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| UD-001 | Dashboard loads | 1. Navigate to https://app.g.bookedai.au | Login page or dashboard loads (depending on auth state) | |
| UD-002 | Google Sign-In | 1. Click "Sign in with Google" 2. Complete Google OAuth | User is authenticated, redirected to dashboard, name displayed | |
| UD-003 | ChatGPT Sign-In | 1. Click "Sign in with ChatGPT" 2. Complete OpenAI OAuth | User is authenticated via JWT, redirected to dashboard | |
| UD-004 | Dashboard overview | 1. Login successfully | Dashboard shows user name, upcoming bookings count, recent activity | |
| UD-005 | View bookings list | 1. Navigate to bookings section | List of user's bookings displayed with status badges (CONFIRMED, PENDING, etc.) | |
| UD-006 | Booking detail view | 1. Click on a booking | Full booking details: service, date, time, status, payment status, meeting link | |
| UD-007 | Cancel booking | 1. Click Cancel on a future booking 2. Confirm cancellation | Booking status changes to CANCELLED, slot is released | |
| UD-008 | Reschedule booking | 1. Click Reschedule 2. Select new date/time 3. Confirm | Booking updated with new time, calendar event updated | |
| UD-009 | View learning history | 1. Navigate to learning section | List of past learning sessions with summaries and dates | |
| UD-010 | Learning session detail | 1. Click on a learning session | Session summary (Gemini-generated), key takeaways, next-step CTA visible | |
| UD-011 | View profile | 1. Navigate to profile section | User's name, email, phone, language preference displayed | |
| UD-012 | Update profile | 1. Edit display name or phone 2. Save | Changes persist, confirmation message shown | |
| UD-013 | Notification preferences | 1. Navigate to notification settings | Toggle options for email, SMS, push notifications | |
| UD-014 | Course content access | 1. Navigate to courses/learning | Track A courses visible, Lesson 1 accessible | |
| UD-015 | Logout | 1. Click logout button | Session cleared, redirected to login page, cannot access dashboard | |
| UD-016 | Session persistence | 1. Login 2. Close browser 3. Reopen and navigate to dashboard | User remains logged in (within 7-day JWT expiry) | |
| UD-017 | Unauthorized redirect | 1. Clear cookies 2. Navigate to /dashboard | Redirected to login page, no dashboard content exposed | |
| UD-018 | Dark/Light theme toggle | 1. Click theme toggle | Theme switches cleanly, preference is persisted | |

---

## Category 4: Admin Dashboard (admin.g.bookedai.au)

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| AD-001 | Admin login | 1. Navigate to https://admin.g.bookedai.au 2. Login with admin account | Admin dashboard loads with full navigation | |
| AD-002 | Non-admin blocked | 1. Login with a customer-role account | Access denied message, cannot view admin features | |
| AD-003 | Revenue KPIs display | 1. View dashboard overview | Revenue chart (SVG), total bookings, total revenue, conversion rate visible | |
| AD-004 | Revenue chart data | 1. Inspect revenue chart | Chart reflects real database data, not mock/seed data | |
| AD-005 | Bookings management | 1. Navigate to bookings section | All bookings listed with filters (status, date, service) | |
| AD-006 | Booking detail (admin) | 1. Click on a booking | Full details including payment info, customer contact, audit trail | |
| AD-007 | Approve bank transfer | 1. Find a PENDING_PAYMENT booking (bank transfer) 2. Click Approve | Booking status changes to CONFIRMED, customer notified | |
| AD-008 | Marketing campaigns | 1. Navigate to campaigns section | Campaign list with statuses (DRAFT, NEEDS_REVIEW, APPROVED, etc.) | |
| AD-009 | Approve campaign | 1. Select a NEEDS_REVIEW campaign 2. Click Approve | Status changes to APPROVED, content ready for publishing | |
| AD-010 | Create campaign | 1. Click "New Campaign" 2. Fill details 3. Submit | AI generates 8-channel content, campaign saved as DRAFT | |
| AD-011 | User management | 1. Navigate to users section | User list with roles, last login, booking count | |
| AD-012 | Change user role | 1. Select a user 2. Change role from customer to mentor | Role updated, user gains new permissions | |
| AD-013 | Webhook logs viewer | 1. Navigate to webhook logs | Recent Stripe webhook events listed with status and payload preview | |
| AD-014 | CSV export - bookings | 1. Click Export CSV on bookings page | CSV file downloads with all booking data | |
| AD-015 | CSV export - revenue | 1. Click Export CSV on revenue page | CSV file downloads with revenue breakdown | |
| AD-016 | CSV export - users | 1. Click Export CSV on users page | CSV file downloads with user data (no passwords/tokens) | |
| AD-017 | Partner onboarding | 1. Navigate to partners section 2. Start onboarding wizard | 4-step wizard works: business info, services, availability, confirmation | |
| AD-018 | Referral tracking | 1. Navigate to referrals section | Referral links, click counts, and conversion data visible | |
| AD-019 | Services management | 1. Navigate to services | Active services listed with pricing, duration, and edit capability | |
| AD-020 | Availability management | 1. Navigate to availability | 70 slots visible, can add/edit/remove time slots | |
| AD-021 | Tenant management | 1. Navigate to tenants section | 2 tenants listed (bookedai.au, longcare.au) with configurations | |
| AD-022 | API guide link | 1. Find API documentation link | Opens API guide with code examples | |

---

## Category 5: API (api.g.bookedai.au)

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| API-001 | Health check | 1. `GET https://api.g.bookedai.au/health` | 200 OK, JSON body includes `{ "status": "ok", "db": "connected" }` | |
| API-002 | Auth providers | 1. `GET /auth/providers` | 200 OK, returns list of available auth providers (firebase, openai) | |
| API-003 | OpenAI OAuth login | 1. `GET /auth/openai/login` | 302 redirect to OpenAI authorization URL with correct CSRF state | |
| API-004 | Services list | 1. `GET /services` | 200 OK, returns array of active services with id, name, price, duration | |
| API-005 | Services search | 1. `POST /services/search` with `{ "query": "mentor" }` | 200 OK, returns filtered services matching "mentor" | |
| API-006 | Booking hold | 1. `POST /booking/hold` with valid slot_id and auth token | 200 OK, slot status changes to HOLD, 10-min expiry set | |
| API-007 | Booking hold - no auth | 1. `POST /booking/hold` without auth header | 401 Unauthorized | |
| API-008 | Booking confirm | 1. `POST /booking/confirm` with held booking_id | 200 OK, status changes to CONFIRMED, calendar/email triggered | |
| API-009 | Booking cancel | 1. `POST /booking/cancel` with booking_id | 200 OK, status changes to CANCELLED, slot released | |
| API-010 | Booking reschedule | 1. `POST /booking/reschedule` with booking_id and new slot_id | 200 OK, old slot released, new slot held, booking updated | |
| API-011 | Guest checkout | 1. `POST /payment/checkout` with service and guest details (no auth) | 200 OK, Stripe checkout session URL returned | |
| API-012 | Stripe webhook valid | 1. `POST /webhooks/stripe` with valid signature and checkout.session.completed event | 200 OK, booking confirmed, idempotency key stored in webhook_events | |
| API-013 | Stripe webhook replay | 1. Replay same webhook event (same event ID) | 200 OK, no duplicate processing (idempotency check) | |
| API-014 | Stripe webhook invalid sig | 1. `POST /webhooks/stripe` with invalid signature | 400 Bad Request, webhook rejected | |
| API-015 | Learning session summary | 1. `POST /learning/session-summary` with session data and auth | 200 OK, Gemini-generated summary returned | |
| API-016 | Learning history | 1. `GET /learning/history` with auth token | 200 OK, array of user's past learning sessions | |
| API-017 | Marketing campaign create | 1. `POST /marketing/campaigns` with admin auth and campaign data | 200 OK, 8-channel content generated, campaign saved as DRAFT | |
| API-018 | Marketing campaign approve | 1. `POST /marketing/approve` with campaign_id and admin auth | 200 OK, status changes from NEEDS_REVIEW to APPROVED | |
| API-019 | Marketing - non-admin | 1. `POST /marketing/campaigns` with customer auth | 403 Forbidden | |
| API-020 | Chat endpoint | 1. `POST /chat` with `{ "message": "hello" }` | 200 OK, AI response returned (or fallback message) | |
| API-021 | SSE booking events | 1. `GET /events/booking/:id` with valid booking ID | SSE stream opens, receives status update events | |
| API-022 | SSE chat stream | 1. `GET /events/chat/:id` | SSE stream opens, receives AI response tokens | |
| API-023 | Rate limiting | 1. Send 101 requests in 15 minutes from same IP | 429 Too Many Requests on the 101st request | |
| API-024 | CORS enforcement | 1. Send request with `Origin: https://evil.com` | Request blocked by CORS policy, no Access-Control-Allow-Origin header | |
| API-025 | CORS allowed | 1. Send request with `Origin: https://g.bookedai.au` | Response includes `Access-Control-Allow-Origin: https://g.bookedai.au` | |
| API-026 | Zod validation | 1. `POST /booking/hold` with invalid body `{ "slot_id": "abc" }` | 400 Bad Request with Zod validation error details | |
| API-027 | Security headers | 1. Inspect response headers | Helmet headers present: X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security | |
| API-028 | API key auth | 1. Send request with `X-API-Key` header for tenant-specific endpoint | Request processed for correct tenant | |
| API-029 | Partner signup | 1. `POST /partner/signup` with business details | 200 OK, partner record created | |
| API-030 | 404 handling | 1. `GET /nonexistent-route` | 404 Not Found with JSON error body | |

---

## Category 6: Notifications

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| NF-001 | Booking confirmation email | 1. Complete a booking 2. Check customer's inbox | Email received with booking details, service name, date/time, meeting link | |
| NF-002 | Email from address | 1. Inspect confirmation email headers | Sent from official bookedai.au or longcare.au email via Gmail API | |
| NF-003 | Booking reminder email | 1. Have a confirmed booking within 24 hours 2. Wait for reminder | Reminder email sent 24h before session with join link | |
| NF-004 | Cancellation email | 1. Cancel a booking | Customer receives cancellation confirmation email with refund info | |
| NF-005 | Payment receipt email | 1. Complete a Stripe payment | Receipt email sent with amount, transaction ID, service name | |
| NF-006 | Admin notification | 1. New booking is created | Admin receives notification of new booking | |
| NF-007 | Bank transfer pending | 1. Select bank transfer payment | Customer receives email with bank details and reference number | |
| NF-008 | Bank transfer approved | 1. Admin approves bank transfer | Customer receives confirmation email that payment was received | |
| NF-009 | Email template rendering | 1. Inspect any notification email | HTML renders correctly, no broken images, branding consistent | |
| NF-010 | Reschedule notification | 1. Reschedule a booking | Both customer and admin receive notification with old and new times | |
| NF-011 | Pub/Sub event fired | 1. Complete a booking 2. Check Pub/Sub topic | booking.created and booking.paid events published | |
| NF-012 | WhatsApp auto-reply | 1. Send WhatsApp message to business number | Auto-reply received with relevant information | |

---

## Category 7: Mobile Responsive (375px Width)

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| MR-001 | Landing page mobile | 1. Set viewport to 375px 2. Load g.bookedai.au | All sections stack vertically, no horizontal scroll, text readable | |
| MR-002 | Navbar mobile | 1. View navbar at 375px | Hamburger menu appears, logo resized, navigation accessible | |
| MR-003 | Chat widget mobile | 1. Open chat widget at 375px | Widget expands to near-full width, input usable with mobile keyboard | |
| MR-004 | Pricing cards mobile | 1. View pricing section at 375px | Cards stack vertically, all pricing info visible, CTAs tappable | |
| MR-005 | Booking page mobile | 1. Load booking.g.bookedai.au at 375px | Step wizard adapts, calendar scrollable, form inputs full-width | |
| MR-006 | Calendar mobile | 1. View availability calendar at 375px | Calendar dates and time slots are tappable, no overlapping elements | |
| MR-007 | Payment form mobile | 1. Reach payment step at 375px | Stripe checkout and bank details readable, buttons full-width | |
| MR-008 | User dashboard mobile | 1. Load app.g.bookedai.au at 375px | Dashboard cards stack, navigation via hamburger or bottom nav | |
| MR-009 | Admin dashboard mobile | 1. Load admin.g.bookedai.au at 375px | Table data scrollable horizontally, key actions accessible | |
| MR-010 | Touch targets | 1. Test all buttons/links at 375px | All interactive elements are at least 44x44px (WCAG target) | |
| MR-011 | Font scaling | 1. View pages at 375px | Text is minimum 16px for body, headings scale proportionally | |
| MR-012 | Images responsive | 1. Check all images at 375px | Images scale down, no overflow, no loss of critical content | |
| MR-013 | Longcare.au mobile | 1. Load longcare.au at 375px | Hero, services, FAQ, footer all render correctly | |

---

## Category 8: Cross-Browser and Accessibility

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| XB-001 | Chrome desktop | 1. Test all apps in Chrome 126+ | All features work as expected | |
| XB-002 | Safari desktop | 1. Test all apps in Safari 17+ | All features work, glassmorphism renders correctly | |
| XB-003 | Firefox desktop | 1. Test all apps in Firefox 127+ | All features work as expected | |
| XB-004 | Chrome mobile (Android) | 1. Test booking flow on Chrome Android | Full flow works, touch interactions smooth | |
| XB-005 | Safari mobile (iOS) | 1. Test booking flow on Safari iOS | Full flow works, no viewport issues, keyboard doesn't cover inputs | |
| XB-006 | ARIA labels | 1. Run accessibility audit (axe-core or Lighthouse) | All interactive elements have ARIA labels, roles defined | |
| XB-007 | Keyboard navigation | 1. Tab through all pages without mouse | All interactive elements reachable and operable via keyboard | |
| XB-008 | Screen reader | 1. Enable VoiceOver/NVDA and navigate pages | Content reads logically, form fields announced correctly | |
| XB-009 | Color contrast | 1. Run contrast check on all text | Text meets WCAG 2.2 AA contrast ratio (4.5:1 normal, 3:1 large) | |
| XB-010 | Progress bar accessibility | 1. Inspect booking step indicator | Has role="progressbar" and aria-valuenow/aria-valuemax attributes | |

---

## Category 9: longcare.au (Tenant Site)

| ID | Test Case | Steps | Expected Result | Status |
|----|-----------|-------|-----------------|--------|
| LC-001 | Landing page loads | 1. Navigate to https://longcare.au | Page loads, hero section, services, FAQ visible | |
| LC-002 | Longcare logo (not bookedai) | 1. Check navbar logo | Longcare.au own logo displays (not bookedai logo) | |
| LC-003 | Navigation links | 1. Click Services, About, Contact links | Each navigates correctly, no 404 errors | |
| LC-004 | Schema.org markup | 1. View page source or use Google Rich Results Test | LocalBusiness and FAQ schema markup present and valid | |
| LC-005 | SEO meta tags | 1. Inspect `<head>` tags | Title, description, OG tags, canonical URL all present | |
| LC-006 | sitemap.xml | 1. Navigate to https://longcare.au/sitemap.xml | Valid XML sitemap with all page URLs | |
| LC-007 | robots.txt | 1. Navigate to https://longcare.au/robots.txt | Valid robots.txt allowing search engine crawling | |
| LC-008 | i18n (EN/VI/ZH) | 1. Toggle language switcher | Content translates to Vietnamese and Chinese correctly | |
| LC-009 | AI chatbot widget | 1. Click floating chat button | Chat opens, can interact with AI assistant | |
| LC-010 | Service icons | 1. View services section | SVG icons display correctly for each service | |

---

## Summary

| Category | Total Tests | Pass | Fail | Skip |
|----------|-------------|------|------|------|
| Landing Page (g.bookedai.au) | 19 | | | |
| Booking Flow (booking.g.bookedai.au) | 24 | | | |
| User Dashboard (app.g.bookedai.au) | 18 | | | |
| Admin Dashboard (admin.g.bookedai.au) | 22 | | | |
| API (api.g.bookedai.au) | 30 | | | |
| Notifications | 12 | | | |
| Mobile Responsive | 13 | | | |
| Cross-Browser & Accessibility | 10 | | | |
| longcare.au | 10 | | | |
| **TOTAL** | **158** | | | |

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Product Owner | | | |
| Tech Lead | | | |

---

*Generated: 2026-05-04 | bookedai.au Engineering*
