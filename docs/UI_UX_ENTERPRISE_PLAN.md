# BookedAI — Enterprise UI/UX Design System & Implementation Plan

> **Version:** 1.0 | **Date:** 2026-05-06
> **Based on:** Competitive research (14 platforms), UX best practices (2025-2026), Codebase audit
> **Synced with:** IMPLEMENTATION_ROADMAP.md Phase 7, IMPLEMENTATION_PLAN.md Phase 5-8
> **Target:** UI/UX Maturity 7.5/10 -> 9.5/10

---

## 1. Executive Summary

### Current State Assessment
| Area | Score | Issues |
|------|-------|--------|
| Component Library | 40% | Only 5 of 20+ needed components |
| Design Consistency | 60% | 3 different accent colors across apps |
| Responsive Design | 30% | No tablet breakpoints, mobile untested |
| Accessibility (WCAG) | 40% | Missing ARIA, color contrast, keyboard nav |
| Performance | 60% | No image optimization, no lazy loading |
| Enterprise Polish | 50% | Inline styles, no form validation UI |

### Target State (9.5/10)
- Unified design system with 20+ components
- Single color palette across all 6 apps
- WCAG 2.2 AA compliance
- Mobile-first responsive (320px - 1920px)
- Lighthouse Performance 90+, Accessibility 95+
- Enterprise-grade admin dashboard

---

## 2. Design System Foundation

### 2.1 Color Palette (Unified)

Based on Stripe's accessible color system + Linear's calm design philosophy:

```
PRIMARY PALETTE
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Primary (Indigo)     Secondary (Cyan)    Accent (Teal)  │
│  ██ #6366f1           ██ #06b6d4          ██ #14b8a6     │
│  ██ #4f46e5 (hover)   ██ #0891b2 (hover)  ██ #0d9488     │
│  ██ #818cf8 (light)   ██ #22d3ee (light)  ██ #2dd4bf     │
│  ██ #3730a3 (dark)    ██ #0e7490 (dark)   ██ #0f766e     │
│                                                          │
│  SEMANTIC COLORS                                         │
│  ██ Success  #22c55e   (confirmed, paid, online)         │
│  ██ Warning  #f59e0b   (pending, hold, expiring)         │
│  ██ Danger   #ef4444   (cancelled, error, overdue)       │
│  ██ Info     #3b82f6   (info, links, highlights)         │
│                                                          │
│  NEUTRAL PALETTE (Dark-first)                            │
│  ██ bg-deep     #050510   (page background)              │
│  ██ bg-surface  #0a0a1a   (card background)              │
│  ██ bg-elevated #111127   (elevated surfaces)            │
│  ██ border      #1e1e3a   (borders, dividers)            │
│  ██ text-muted  #8b92a5   (secondary text)               │
│  ██ text-main   #e2e8f0   (primary text)                 │
│  ██ text-bright #f8fafc   (headings, emphasis)           │
│                                                          │
│  LIGHT MODE (toggle)                                     │
│  ██ bg-deep     #ffffff   (page background)              │
│  ██ bg-surface  #f8fafc   (card background)              │
│  ██ bg-elevated #f1f5f9   (elevated surfaces)            │
│  ██ border      #e2e8f0   (borders, dividers)            │
│  ██ text-muted  #64748b   (secondary text)               │
│  ██ text-main   #1e293b   (primary text)                 │
│  ██ text-bright #0f172a   (headings, emphasis)           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Rule:** ALL apps MUST use these exact colors. No more `#0070f3` in g.bookedai.au.

### 2.2 Typography

```
FONT STACK
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Headings:  Outfit (600-700)                             │
│  Body:      Outfit (300-400)                             │
│  Mono:      JetBrains Mono (code, technical)             │
│                                                          │
│  TYPE SCALE (rem)                                        │
│  ──────────────────────────────                          │
│  Display:   3rem    (48px)  — Hero headlines only        │
│  H1:        2.25rem (36px)  — Page titles                │
│  H2:        1.875rem(30px)  — Section titles             │
│  H3:        1.5rem  (24px)  — Card titles                │
│  H4:        1.25rem (20px)  — Subsection titles          │
│  Body LG:   1.125rem(18px)  — Lead paragraphs            │
│  Body:      1rem    (16px)  — Default text               │
│  Body SM:   0.875rem(14px)  — Secondary text, labels     │
│  Caption:   0.75rem (12px)  — Captions, badges           │
│                                                          │
│  LINE HEIGHTS                                            │
│  Headings: 1.2  |  Body: 1.6  |  Tight: 1.1             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 2.3 Spacing Scale

```
SPACING (Tailwind standard)
4px  (1)   — Icon padding, badge padding
8px  (2)   — Tight spacing, inline gaps
12px (3)   — Form field gaps
16px (4)   — Card padding (compact), list items
20px (5)   — Section gaps
24px (6)   — Card padding (default)
32px (8)   — Between sections
40px (10)  — Large section gaps
48px (12)  — Page section separators
64px (16)  — Major page sections
96px (24)  — Hero section padding
```

### 2.4 Border Radius

```
RADIUS SCALE
sm:   6px   — Badges, small buttons
md:   8px   — Buttons, inputs, tags
lg:   12px  — Cards, modals
xl:   16px  — Large cards, panels
2xl:  24px  — Feature cards, hero elements
full: 9999px — Avatars, pills
```

### 2.5 Shadow & Effects

```
ELEVATION SYSTEM (Dark theme)
Level 0:  none
Level 1:  0 1px 3px rgba(0,0,0,0.4)                    — Cards
Level 2:  0 4px 6px rgba(0,0,0,0.4)                    — Elevated cards
Level 3:  0 10px 15px rgba(0,0,0,0.5)                  — Dropdowns, popovers
Level 4:  0 20px 25px rgba(0,0,0,0.5)                  — Modals, dialogs

GLASSMORPHISM
Glass:    background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);

GLOW EFFECTS
Primary:  0 0 20px rgba(99,102,241,0.3)                — Primary buttons hover
Accent:   0 0 20px rgba(20,184,166,0.3)                — Accent elements
Success:  0 0 15px rgba(34,197,94,0.3)                 — Success states
```

---

## 3. Component Library — @bookedai/ui Expansion

### 3.1 Priority Matrix

```
PRIORITY 1 (Week 1) — Core Components
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  [x] Button     — 5 variants, 5 sizes (DONE)            │
│  [x] Card       — 5 variants (DONE)                     │
│  [x] Badge      — 6 colors (DONE)                       │
│  [x] Input      — Label, error, hint (DONE)             │
│  [ ] Select     — Single/multi, search, keyboard nav    │
│  [ ] Modal      — Focus trap, ESC, animations           │
│  [ ] Toast      — Auto-dismiss, stacking, 4 variants    │
│  [ ] Tabs       — Animated indicator, keyboard nav      │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  PRIORITY 2 (Week 2) — Data & Forms                     │
│                                                          │
│  [ ] DataTable  — Sort, filter, pagination, bulk select  │
│  [ ] Checkbox   — Indeterminate state, group             │
│  [ ] Radio      — Group, cards variant                   │
│  [ ] Textarea   — Auto-resize, char count               │
│  [ ] Switch     — Toggle with label                     │
│  [ ] Accordion  — Animated, multi/single open            │
│  [ ] Dropdown   — Menu, contextual actions               │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  PRIORITY 3 (Week 3) — Navigation & Layout              │
│                                                          │
│  [ ] Sidebar    — Collapsible, responsive                │
│  [ ] Breadcrumb — Truncation, mobile                     │
│  [ ] Stepper    — Horizontal/vertical, clickable         │
│  [ ] Pagination — Pages, per-page selector               │
│  [ ] Avatar     — Image, initials, status dot            │
│  [ ] Tooltip    — Positions, delay, rich content         │
│  [ ] Popover    — Click/hover trigger                    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  PRIORITY 4 (Week 4) — Specialized                      │
│                                                          │
│  [ ] Calendar   — Month/week view, slot selection        │
│  [ ] Chart      — Line, bar, pie, funnel (SVG)           │
│  [ ] Skeleton   — Shimmer animation variants             │
│  [ ] EmptyState — Illustration + CTA                     │
│  [ ] FileUpload — Drag & drop, progress                  │
│  [ ] Pricing    — Tier cards with toggle                 │
│  [ ] Timeline   — Booking history, activity log          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 3.2 Component API Standards

Every component MUST follow:

```typescript
// Pattern: Composable, Accessible, Theme-aware
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | ...;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;        // Tailwind merge support
  disabled?: boolean;
  'aria-label'?: string;     // Accessibility
  'data-testid'?: string;    // Testing
}

// Tools: class-variance-authority + clsx + tailwind-merge
// Pattern: cva() for variants, cn() for class merging
```

---

## 4. Page-by-Page UI/UX Redesign Specifications

### 4.1 Booking Flow — book.longcare.au

**Reference:** Calendly's minimal 3-step + HoneyBook's Smart File approach

```
REDESIGNED BOOKING FLOW
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─── Progress Bar ──────────────────────────────────────┐  │
│  │  ● Service    ● Schedule    ○ Details    ○ Payment    │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░  │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  STEP 1: SERVICE SELECTION                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐      │    │
│  │  │           │  │ ★ POPULAR │  │ BEST VALUE│      │    │
│  │  │  30-min   │  │  1-hour   │  │  5-Session│      │    │
│  │  │  AI Start │  │  AI Mentor│  │  Package  │      │    │
│  │  │           │  │           │  │           │      │    │
│  │  │  [Icon]   │  │  [Icon]   │  │  [Icon]   │      │    │
│  │  │           │  │           │  │           │      │    │
│  │  │  $29      │  │  $99      │  │  $450     │      │    │
│  │  │  ~~$49~~  │  │  ~~$120~~ │  │  $90/ea   │      │    │
│  │  │           │  │           │  │           │      │    │
│  │  │ [Select]  │  │ [Select]  │  │ [Select]  │      │    │
│  │  └───────────┘  └───────────┘  └───────────┘      │    │
│  │                                                     │    │
│  │  ┌───────────┐  ┌───────────┐                      │    │
│  │  │ PREMIUM   │  │           │  Trust Strip:        │    │
│  │  │ 10-Session│  │  Business │  ✓ 500+ sessions     │    │
│  │  │  Package  │  │  Transform│  ✓ 100% satisfaction │    │
│  │  │  $850     │  │  $1,500+  │  ✓ Money-back        │    │
│  │  │  $85/ea   │  │  Custom   │     guarantee        │    │
│  │  │ [Select]  │  │ [Inquire] │                      │    │
│  │  └───────────┘  └───────────┘                      │    │
│  │                                                     │    │
│  │  ▼ Expandable: Curriculum, What's Included          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  STEP 2: SCHEDULE                                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ┌─── Calendar (8-week range) ──────────────────┐   │    │
│  │  │  ◄ April 2026                  May 2026 ►    │   │    │
│  │  │  Mo Tu We Th Fr Sa Su                        │   │    │
│  │  │  28 29 30  1  2  3  4    ● = Available       │   │    │
│  │  │   5  6  7  8  9 10 11    ○ = Limited          │   │    │
│  │  │  12 13 14 15 16 17 18    — = Unavailable      │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │                                                     │    │
│  │  Selected: Tuesday, May 12                          │    │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │    │
│  │  │ 9:00 │ │10:00 │ │11:00 │ │14:00 │ │15:00 │    │    │
│  │  │  AM  │ │  AM  │ │  AM  │ │  PM  │ │  PM  │    │    │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘    │    │
│  │                                                     │    │
│  │  Multi-session (5/10 packs):                        │    │
│  │  ┌─── Recurring Pattern ────────────────────────┐   │    │
│  │  │ ☑ Same day/time weekly (recommended)         │   │    │
│  │  │ ○ Custom pick each session                   │   │    │
│  │  │                                              │   │    │
│  │  │ Session 1: Tue May 12, 10:00 AM  ✓           │   │    │
│  │  │ Session 2: Tue May 19, 10:00 AM  ✓           │   │    │
│  │  │ Session 3: Tue May 26, 10:00 AM  ⊘ edit      │   │    │
│  │  │ Session 4: Picking...            ○            │   │    │
│  │  │ Session 5: Not scheduled         ○            │   │    │
│  │  │                                              │   │    │
│  │  │ Progress: ███████████░░░░ 3/5 selected       │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  STEP 3: YOUR DETAILS                                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Full Name*    [________________________]           │    │
│  │  Email*        [________________________]           │    │
│  │  Phone         [________________________]           │    │
│  │  Notes         [________________________]           │    │
│  │                                                     │    │
│  │  ☑ I agree to the Terms of Service                  │    │
│  │  ☑ Send me session reminders via email              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  STEP 4: PAYMENT                                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │  Order Summary                                      │    │
│  │  ┌───────────────────────────────────────────┐      │    │
│  │  │ 1-Hour AI Mentor Session          $99.00  │      │    │
│  │  │ GST (10%)                          $9.00  │      │    │
│  │  │ ─────────────────────────────────────────  │      │    │
│  │  │ Total                            $108.90  │      │    │
│  │  └───────────────────────────────────────────┘      │    │
│  │                                                     │    │
│  │  Payment Method                                     │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐   │    │
│  │  │ ● Card  │ │ ○ PayID │ │ ○ VND   │ │○ Later │   │    │
│  │  │ (Stripe)│ │ QR Code │ │ QR Code │ │Pay b4  │   │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └────────┘   │    │
│  │                                                     │    │
│  │  🔒 Secured by Stripe · SSL Encrypted              │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │         [ Complete Booking — $108.90 ]       │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │                                                     │    │
│  │  ✓ Free cancellation up to 24 hours before          │    │
│  │  ✓ Instant confirmation via email                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─── Sticky Mobile CTA ────────────────────────────────┐  │
│  │  $108.90 · 1-Hour AI Mentor   [ Continue → ]        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key UX Improvements:**
- 4-step wizard with clear progress bar (30-50% higher completion)
- Trust signals near every CTA (84-270% conversion lift)
- Sticky mobile CTA (always visible, thumb-zone)
- Real-time social proof: "3 people booked this week"
- Urgency: "Only 2 spots left today" (real data only)
- Package savings prominently displayed
- Recurring scheduling auto-suggest for packages

---

### 4.2 Admin Dashboard — admin.longcare.au

**Reference:** Stripe Dashboard + Linear's sidebar navigation

```
ADMIN DASHBOARD REDESIGN
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─── Sidebar (Persistent) ──┐  ┌─── Main Content ──────┐  │
│  │                           │  │                        │  │
│  │  [Logo] BookedAI          │  │  ┌── KPI Cards Row ──┐ │  │
│  │                           │  │  │                    │ │  │
│  │  ● Dashboard              │  │  │ ┌────┐┌────┐┌────┐│ │  │
│  │  ○ Bookings        (12)   │  │  │ │$2.4k││ 47 ││156 ││ │  │
│  │  ○ Users           (156)  │  │  │ │Rev. ││Book││User││ │  │
│  │  ○ Payments         (3)   │  │  │ │+12% ││+8% ││+23%││ │  │
│  │  ○ Marketing              │  │  │ │ ╱╲  ││ ╱╲ ││ ╱╲ ││ │  │
│  │  ○ Learning               │  │  │ └────┘└────┘└────┘│ │  │
│  │  ─────────────────        │  │  │                    │ │  │
│  │  ○ Analytics              │  │  │ ┌────┐             │ │  │
│  │  ○ Health          ●      │  │  │ │68% │ Conversion  │ │  │
│  │  ○ Webhooks               │  │  │ │Conv│ Rate        │ │  │
│  │  ○ Emails                 │  │  │ │+5% │             │ │  │
│  │  ─────────────────        │  │  │ └────┘             │ │  │
│  │  ○ Settings               │  │  └────────────────────┘ │  │
│  │                           │  │                        │  │
│  │                           │  │  ┌── Revenue Chart ──┐  │  │
│  │                           │  │  │                    │  │  │
│  │                           │  │  │    ╱╲              │  │  │
│  │                           │  │  │   ╱  ╲    ╱╲      │  │  │
│  │                           │  │  │  ╱    ╲  ╱  ╲     │  │  │
│  │                           │  │  │ ╱      ╲╱    ╲    │  │  │
│  │                           │  │  │╱              ╲   │  │  │
│  │                           │  │  │                    │  │  │
│  │                           │  │  │ 7d | 30d | 90d    │  │  │
│  │                           │  │  └────────────────────┘  │  │
│  │                           │  │                        │  │
│  │                           │  │  ┌── Recent Bookings ┐  │  │
│  │                           │  │  │                    │  │  │
│  │                           │  │  │ Tabs: All|Pending  │  │  │
│  │                           │  │  │       |Confirmed   │  │  │
│  │                           │  │  │                    │  │  │
│  │  ┌─ User ────────────┐   │  │  │ ┌──────────────┐  │  │  │
│  │  │ 👤 CEO            │   │  │  │ │☑ Name  Svc   │  │  │  │
│  │  │ ceo@longcare.au   │   │  │  │ │  Date  Status│  │  │  │
│  │  └───────────────────┘   │  │  │ │  Amount  Act │  │  │  │
│  │                           │  │  │ └──────────────┘  │  │  │
│  └───────────────────────────┘  │  │                    │  │  │
│                                  │  │ [Export CSV]       │  │  │
│                                  │  └────────────────────┘  │  │
│                                  │                        │  │
│                                  └────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**
- Persistent sidebar (Linear/Notion pattern) for rapid navigation
- KPI cards: number + trend arrow + sparkline (Stripe pattern)
- Color-coded trends: green = positive, red = negative
- Revenue chart with time range selector (7d/30d/90d)
- Data tables with tabs, checkbox selection, bulk actions
- Real-time badge counts on sidebar items
- Health indicator dot (green/amber/red) on sidebar

---

### 4.3 Landing Page — longcare.au

**Reference:** Linear's calm design + Vercel's hero pattern

```
LANDING PAGE REDESIGN
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Nav: [Logo] Services  Pricing  How it Works  Blog  [Login] │
│                                                             │
│  ┌─── Hero Section ─────────────────────────────────────┐   │
│  │                                                       │   │
│  │           Fill Your Calendar.                         │   │
│  │           Grow Your Practice.                         │   │
│  │                                                       │   │
│  │   AI-powered mentoring sessions that transform        │   │
│  │   customer intent into revenue — automatically.       │   │
│  │                                                       │   │
│  │   [ Book a Session — From $29 ]  [ Watch Demo ▶ ]    │   │
│  │                                                       │   │
│  │   ★★★★★ 4.9/5 from 50+ sessions                      │   │
│  │                                                       │   │
│  │   ┌─── Product Preview (Screenshot/Video) ─────┐     │   │
│  │   │                                             │     │   │
│  │   │   [Interactive booking demo embedded]       │     │   │
│  │   │                                             │     │   │
│  │   └─────────────────────────────────────────────┘     │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─── Social Proof Strip ────────────────────────────────┐  │
│  │  "Trusted by professionals across Sydney"              │  │
│  │  [Logo] [Logo] [Logo] [Logo]  |  500+ sessions booked │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── How It Works (3 Steps) ────────────────────────────┐  │
│  │                                                        │  │
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐           │  │
│  │  │  1.     │───▶│  2.     │───▶│  3.     │           │  │
│  │  │ Choose  │    │ Schedule│    │ Learn   │           │  │
│  │  │ Service │    │ Session │    │ & Grow  │           │  │
│  │  │         │    │         │    │         │           │  │
│  │  │ Pick    │    │ Select  │    │ Join    │           │  │
│  │  │ AI      │    │ your    │    │ video   │           │  │
│  │  │ Mentor  │    │ perfect │    │ session │           │  │
│  │  │ package │    │ time    │    │ & get   │           │  │
│  │  │         │    │ slot    │    │ AI notes│           │  │
│  │  └─────────┘    └─────────┘    └─────────┘           │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Testimonials Carousel ─────────────────────────────┐  │
│  │                                                        │  │
│  │  "BookedAI transformed my learning journey..."         │  │
│  │   — Sarah M., Software Developer, Sydney               │  │
│  │   ★★★★★                                               │  │
│  │                                                        │  │
│  │  ○ ● ○ ○                                              │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Pricing Section ───────────────────────────────────┐  │
│  │                                                        │  │
│  │  ┌──────────┐  ┌──────────────┐  ┌──────────┐        │  │
│  │  │ Starter  │  │ ★ POPULAR    │  │ Premium  │        │  │
│  │  │          │  │              │  │          │        │  │
│  │  │ 30-min   │  │ 1-Hour       │  │ 5/10     │        │  │
│  │  │ $29      │  │ $99          │  │ Sessions │        │  │
│  │  │          │  │              │  │ From $85 │        │  │
│  │  │ ✓ AI     │  │ ✓ Everything │  │ /session │        │  │
│  │  │ ✓ Notes  │  │   in Starter │  │          │        │  │
│  │  │          │  │ ✓ 60 min     │  │ ✓ Save   │        │  │
│  │  │ [Book]   │  │ ✓ Follow-up  │  │   20%+   │        │  │
│  │  │          │  │              │  │          │        │  │
│  │  │          │  │ [Book Now]   │  │ [Book]   │        │  │
│  │  └──────────┘  └──────────────┘  └──────────┘        │  │
│  │                                                        │  │
│  │  All prices include GST · Free cancellation 24h prior  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── CTA Section ───────────────────────────────────────┐  │
│  │                                                        │  │
│  │  Ready to accelerate your AI journey?                  │  │
│  │  [ Book Your First Session — $29 ]                     │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── AI Chat Widget (Bottom-Right) ──┐                     │
│  │  💬 Need help? Chat with AI        │                     │
│  └────────────────────────────────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.4 User Dashboard — app.longcare.au

**Reference:** Notion's clean layout + Duolingo's gamification

```
USER DASHBOARD REDESIGN
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Welcome back, Sarah! 👋                    🔔(3)  ⚙️       │
│                                                             │
│  ┌─── Next Session Alert ────────────────────────────────┐  │
│  │  🟢 Your session starts in 2 hours                     │  │
│  │  1-Hour AI Mentor · Today 2:00 PM AEST                 │  │
│  │  [ Join Meeting ]  [ Reschedule ]                      │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Stats Grid ────────────────────────────────────────┐  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │  │
│  │  │ Sessions │ │  Hours   │ │  Streak  │ │ Package  │ │  │
│  │  │    7     │ │   14     │ │  3 wks   │ │  7/10    │ │  │
│  │  │ completed│ │ learned  │ │  🔥🔥🔥   │ │ ████░░░  │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Upcoming Bookings ─────────────────────────────────┐  │
│  │                                                        │  │
│  │  ┌─ May 12 ──────────────────────────────────────┐    │  │
│  │  │ 2:00 PM  1-Hour AI Mentor  [Join] [Reschedule]│    │  │
│  │  └────────────────────────────────────────────────┘    │  │
│  │  ┌─ May 19 ──────────────────────────────────────┐    │  │
│  │  │ 2:00 PM  1-Hour AI Mentor  [— 7 days —]      │    │  │
│  │  └────────────────────────────────────────────────┘    │  │
│  │  ┌─ May 26 ──────────────────────────────────────┐    │  │
│  │  │ 2:00 PM  1-Hour AI Mentor  [— 14 days —]     │    │  │
│  │  └────────────────────────────────────────────────┘    │  │
│  │                                                        │  │
│  │  [ Book Next Session ]                                 │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Learning Progress ─────────────────────────────────┐  │
│  │                                                        │  │
│  │  Track A: AI Foundations                               │  │
│  │  ● Lesson 1  ● Lesson 2  ● Lesson 3  ○ L4  ○ L5     │  │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░ 60%          │  │
│  │                                                        │  │
│  │  Recent AI Notes:                                      │  │
│  │  📝 Session 7 — Advanced Prompt Engineering            │  │
│  │  📝 Session 6 — AI Ethics & Governance                 │  │
│  │                                                        │  │
│  │  Recommended Next:                                     │  │
│  │  ┌─────────────────────────────────────────────────┐   │  │
│  │  │ 📚 Track B: AI for Business — Based on your     │   │  │
│  │  │    progress in Track A, this is your next step  │   │  │
│  │  │    [ Start Track B ]                            │   │  │
│  │  └─────────────────────────────────────────────────┘   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.5 SaaS Platform — g.bookedai.au (g.longcare.au)

**Reference:** Vercel's developer platform + Linear's enterprise landing

```
SAAS PLATFORM REDESIGN
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Nav: [BookedAI Logo] Features Pricing Docs [Login] [Start] │
│                                                             │
│  ┌─── Hero ──────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │     The AI Revenue Engine                              │  │
│  │     for Service Businesses                             │  │
│  │                                                        │  │
│  │     Turn customer intent into revenue — automatically. │  │
│  │     AI chat, booking, payment, meetings,               │  │
│  │     and analytics in one platform.                     │  │
│  │                                                        │  │
│  │     [ Start Free ]   [ Book a Demo ]                   │  │
│  │                                                        │  │
│  │     ┌── Live Product Demo ──────────────────────┐      │  │
│  │     │ [Interactive embedded product screenshot]  │      │  │
│  │     └───────────────────────────────────────────┘      │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Logo Strip ────────────────────────────────────────┐  │
│  │  Powering businesses across Australia                  │  │
│  │  [longcare.au] [+ 3 more coming soon]                 │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Features Grid (6 capabilities) ────────────────────┐  │
│  │                                                        │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │  │
│  │  │ 🤖 AI Chat   │ │ 📅 Booking   │ │ 💳 Payments  │   │  │
│  │  │              │ │              │ │              │   │  │
│  │  │ 24/7 AI      │ │ Auto-booking │ │ Stripe +     │   │  │
│  │  │ assistant    │ │ with smart   │ │ QR + bank    │   │  │
│  │  │ in 3         │ │ calendar     │ │ transfer     │   │  │
│  │  │ languages    │ │ management   │ │              │   │  │
│  │  └──────────────┘ └──────────────┘ └──────────────┘   │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │  │
│  │  │ 🎥 Meetings  │ │ 🧠 AI Notes  │ │ 📊 Analytics │   │  │
│  │  │              │ │              │ │              │   │  │
│  │  │ Branded      │ │ Smart        │ │ Revenue,     │   │  │
│  │  │ video rooms  │ │ session      │ │ conversion,  │   │  │
│  │  │ via Google   │ │ summaries    │ │ booking      │   │  │
│  │  │ Meet         │ │ & next steps │ │ funnel       │   │  │
│  │  └──────────────┘ └──────────────┘ └──────────────┘   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Pricing (3 Tiers) ─────────────────────────────────┐  │
│  │                                                        │  │
│  │  Monthly | Annual (Save 20%)                           │  │
│  │                                                        │  │
│  │  ┌──────────┐  ┌───────────────┐  ┌──────────┐       │  │
│  │  │ Starter  │  │ ★ Growth      │  │Enterprise│       │  │
│  │  │ $0/mo    │  │ $99/mo        │  │ Custom   │       │  │
│  │  │          │  │               │  │          │       │  │
│  │  │ 10 books │  │ Unlimited     │  │ White-   │       │  │
│  │  │ 1 lang   │  │ 3 languages   │  │ label    │       │  │
│  │  │ Basic    │  │ AI notes      │  │ API      │       │  │
│  │  │          │  │ WhatsApp      │  │ Dedicated│       │  │
│  │  │          │  │ Analytics     │  │ Support  │       │  │
│  │  │          │  │               │  │          │       │  │
│  │  │[Get      │  │[Start Free   ]│  │[Contact  │       │  │
│  │  │ Started] │  │               │  │ Sales]   │       │  │
│  │  └──────────┘  └───────────────┘  └──────────┘       │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─── Integration Grid (17 integrations) ────────────────┐  │
│  │  [Stripe] [Google] [WhatsApp] [Xero] [Twilio] [GA4]  │  │
│  │  [Firebase] [Meet] [Calendar] [Drive] [Gmail] [GTM]  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4.6 AI Chat Widget — All Pages

**Reference:** Intercom + Drift best practices

```
AI CHAT WIDGET REDESIGN
┌─────────────────────────────────────────┐
│                                         │
│  ┌─── Chat Header ──────────────────┐  │
│  │ 🤖 BookedAI Assistant      ─  ×  │  │
│  │ Typically replies in seconds      │  │
│  │ [EN ▼] language selector          │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌─── Chat Body ────────────────────┐  │
│  │                                   │  │
│  │  🤖 Hi! I'm your AI assistant.  │  │
│  │     How can I help you today?    │  │
│  │                                   │  │
│  │  Quick Actions:                   │  │
│  │  ┌──────────┐ ┌──────────────┐   │  │
│  │  │📅 Book a │ │💬 Ask about  │   │  │
│  │  │  Session │ │   Services   │   │  │
│  │  └──────────┘ └──────────────┘   │  │
│  │  ┌──────────┐ ┌──────────────┐   │  │
│  │  │💰 Check  │ │📞 Contact    │   │  │
│  │  │  Pricing │ │   Support    │   │  │
│  │  └──────────┘ └──────────────┘   │  │
│  │                                   │  │
│  │  👤 I'd like to book a session   │  │
│  │                                   │  │
│  │  🤖 Great! Here are our          │  │
│  │     available services:           │  │
│  │                                   │  │
│  │  ┌─ Service Card (inline) ────┐  │  │
│  │  │ 1-Hour AI Mentor — $99     │  │  │
│  │  │ ★ Most Popular             │  │  │
│  │  │ [ Book Now → ]             │  │  │
│  │  └────────────────────────────┘  │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌─── Input Area ────────────────────┐  │
│  │  Type your message...    [Send ▶] │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Proactive Triggers:
- Pricing page (30s): "Need help choosing a plan?"
- Booking page (2min idle): "Need help completing booking?"
- Exit intent: "Before you go — any questions?"
- Return visitor: "Welcome back! Ready to book?"
```

---

### 4.7 Meeting Lobby — meet.longcare.au

```
MEETING LOBBY REDESIGN
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              ┌─── Meeting Card ───────────────────┐         │
│              │                                     │         │
│              │   [BookedAI Logo]                    │         │
│              │                                     │         │
│              │   Your Session                      │         │
│              │   ─────────────                     │         │
│              │   📅 Tuesday, May 12 at 2:00 PM     │         │
│              │   📝 1-Hour AI Mentor Session        │         │
│              │   👤 Mentor: Long Do Van             │         │
│              │   🔖 Ref: BOOK-A1B2C                │         │
│              │                                     │         │
│              │   ┌─── Equipment Check ──────────┐  │         │
│              │   │ ✅ Camera ready               │  │         │
│              │   │ ✅ Microphone working         │  │         │
│              │   │ ✅ Speaker connected          │  │         │
│              │   └──────────────────────────────┘  │         │
│              │                                     │         │
│              │   Joining in 0:05...                 │         │
│              │   ━━━━━━━━━━━━━━━━━░░░ (countdown)  │         │
│              │                                     │         │
│              │   [ Join Google Meet Now → ]         │         │
│              │                                     │         │
│              │   Need help? WhatsApp: +61 455 301  │         │
│              │                                     │         │
│              └─────────────────────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Responsive Breakpoints

```
BREAKPOINT SYSTEM
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Mobile S:    320px   — Minimum supported width             │
│  Mobile M:    375px   — Standard iPhone                     │
│  Mobile L:    425px   — Large phones                        │
│  Tablet:      768px   — iPad portrait                       │
│  Laptop:     1024px   — iPad landscape / small laptop       │
│  Desktop:    1280px   — Standard desktop                    │
│  Large:      1440px   — Large desktop                       │
│  XL:         1920px   — Full HD monitors                    │
│                                                             │
│  STRATEGY: Mobile-first (min-width media queries)           │
│                                                             │
│  Tailwind Classes:                                          │
│  Default    → Mobile (320px+)                               │
│  sm:        → 640px+                                        │
│  md:        → 768px+                                        │
│  lg:        → 1024px+                                       │
│  xl:        → 1280px+                                       │
│  2xl:       → 1536px+                                       │
│                                                             │
│  GRID SYSTEM                                                │
│  Mobile:   1 column  | padding: 16px                        │
│  Tablet:   2 columns | padding: 24px                        │
│  Desktop:  3 columns | padding: 32px                        │
│  Large:    4 columns | padding: 48px                        │
│  Max-width: 1280px (container)                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Accessibility Checklist (WCAG 2.2 AA)

```
ACCESSIBILITY REQUIREMENTS
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  COLOR CONTRAST                                             │
│  ✓ Text on background: 4.5:1 minimum                       │
│  ✓ Large text (18px+): 3:1 minimum                         │
│  ✓ UI components: 3:1 against adjacent colors              │
│  ✓ Never use color-only indicators (add icons/text)        │
│                                                             │
│  KEYBOARD NAVIGATION                                        │
│  ✓ All interactive elements focusable via Tab               │
│  ✓ Focus indicators visible (2px solid primary)            │
│  ✓ Escape closes modals/dropdowns                          │
│  ✓ Arrow keys navigate within components                   │
│  ✓ Enter/Space activates buttons                           │
│                                                             │
│  ARIA                                                       │
│  ✓ aria-label on icon-only buttons                         │
│  ✓ aria-expanded on accordions/dropdowns                   │
│  ✓ aria-selected on tabs                                   │
│  ✓ aria-live for dynamic content (toasts, chat)            │
│  ✓ role="progressbar" on progress indicators               │
│  ✓ Landmarks: main, nav, aside, footer                     │
│                                                             │
│  FORMS                                                      │
│  ✓ Labels associated with inputs (htmlFor)                 │
│  ✓ Error messages linked (aria-describedby)                │
│  ✓ Required fields marked (aria-required)                  │
│  ✓ Form validation announced to screen readers             │
│                                                             │
│  MOTION                                                     │
│  ✓ Respect prefers-reduced-motion                          │
│  ✓ No auto-playing animations over 5 seconds               │
│  ✓ Pause/stop controls on any animation                    │
│                                                             │
│  TOUCH TARGETS                                              │
│  ✓ Minimum 48x48px on mobile                               │
│  ✓ Minimum 8px spacing between targets                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Priority & Sprint Mapping

### Sprint Alignment (synced with IMPLEMENTATION_ROADMAP.md)

```
IMPLEMENTATION TIMELINE
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  SPRINT 1 (Week 1): Design System Foundation               │
│  ─────────────────────────────────────────                  │
│  • Unify color palette across all 6 apps                   │
│  • Create CSS custom properties file (tokens.css)          │
│  • Build: Select, Modal, Toast, Tabs components            │
│  • Migrate globals.css to single source                    │
│  • Add responsive breakpoints to all grids                 │
│  Est: 24 hours                                              │
│                                                             │
│  SPRINT 2 (Week 2): Booking Flow Redesign                  │
│  ─────────────────────────────────────────                  │
│  • Implement 4-step wizard with progress bar               │
│  • Build Stepper component                                 │
│  • Add trust signals (badges, social proof)                │
│  • Sticky mobile CTA                                       │
│  • Package booking UX (recurring scheduler)                │
│  • Payment method selector redesign                        │
│  Est: 32 hours                                              │
│                                                             │
│  SPRINT 3 (Week 3): Admin Dashboard                        │
│  ─────────────────────────────────────────                  │
│  • Persistent sidebar navigation                           │
│  • KPI cards with sparklines                               │
│  • Revenue chart (SVG line chart)                           │
│  • DataTable component (sort, filter, paginate)            │
│  • Booking management with bulk actions                    │
│  • Build: Chart, Table, Sidebar components                 │
│  Est: 32 hours                                              │
│                                                             │
│  SPRINT 4 (Week 4): Landing Pages                          │
│  ─────────────────────────────────────────                  │
│  • longcare.au hero section redesign                       │
│  • Social proof strip + testimonial carousel               │
│  • How it Works 3-step visualization                       │
│  • Pricing section with tier comparison                    │
│  • g.bookedai.au enterprise hero                           │
│  • Feature grid with icons                                 │
│  Est: 24 hours                                              │
│                                                             │
│  SPRINT 5 (Week 5): User Dashboard + Polish                │
│  ─────────────────────────────────────────                  │
│  • User dashboard with session alerts                      │
│  • Learning progress visualization                         │
│  • Meeting lobby redesign                                   │
│  • AI chat widget proactive triggers                       │
│  • Dark/Light mode toggle                                  │
│  • Accessibility audit + fixes                             │
│  • Performance optimization (lazy load, images)            │
│  Est: 32 hours                                              │
│                                                             │
│  TOTAL ESTIMATED: ~144 hours (3.5 weeks full-time)         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Technical Debt to Resolve

| Issue | Files Affected | Priority | Effort |
|-------|---------------|----------|--------|
| Inline styles in booking page.tsx (615 lines) | booking-web/page.tsx | CRITICAL | 8h |
| 3 different accent colors across apps | All globals.css | CRITICAL | 2h |
| No form validation framework | All form pages | HIGH | 4h |
| SVGs inlined (12kb+ per page) | All apps | HIGH | 3h |
| No shared component usage | All page files | HIGH | 16h |
| Missing ARIA attributes | All interactive elements | HIGH | 6h |
| No tablet breakpoints | All apps | MEDIUM | 8h |
| Custom CSS class naming per app | All globals.css | MEDIUM | 4h |
| No image optimization | All apps | MEDIUM | 3h |
| No lazy loading | All data pages | MEDIUM | 4h |

---

## 9. Design Quality Metrics (KPIs)

| Metric | Current | Sprint 3 | Sprint 5 |
|--------|---------|----------|----------|
| Lighthouse Performance | ~65 | 80+ | 90+ |
| Lighthouse Accessibility | ~50 | 80+ | 95+ |
| Component Reusability | 20% | 60% | 85% |
| Responsive Coverage | 30% | 70% | 95% |
| Design Consistency | 60% | 85% | 95% |
| WCAG 2.2 AA Compliance | 40% | 75% | 95% |
| Form Validation Coverage | 10% | 70% | 95% |
| Mobile Booking Conversion | Unknown | Baseline | +20% |

---

## 10. Competitive Advantages After Implementation

| Feature | Calendly | Cal.com | HoneyBook | BookedAI |
|---------|----------|---------|-----------|----------|
| AI Chat + Booking | ✗ | ✗ | ✗ | ✓ |
| Multi-language (3) | ✗ | ✗ | ✗ | ✓ |
| Session AI Notes | ✗ | ✗ | ✗ | ✓ |
| Learning Engine | ✗ | ✗ | ✗ | ✓ |
| QR Payment (AUD+VND) | ✗ | ✗ | ✗ | ✓ |
| Marketing Automation | ✗ | ✗ | Partial | ✓ |
| White-label SaaS | ✗ | ✓ | ✗ | ✓ |
| Branded Video Meetings | ✗ | ✗ | ✗ | ✓ |
| CEO AI Reports | ✗ | ✗ | ✗ | ✓ |
| Enterprise Design System | ✓ | ✓ | ✓ | ✓ (target) |

---

*Document owner: bookedai.au Engineering*
*Last updated: 2026-05-06*
*Co-Authored-By: Claude Opus 4.6 (1M context)*
