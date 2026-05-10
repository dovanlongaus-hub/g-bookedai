'use client';

import { useState, useEffect, useMemo } from 'react';
import { AvailabilityCalendar } from '../components/availability-calendar';
import {
  StarterIllustration,
  MentorIllustration,
  Package5Illustration,
  Package10Illustration,
  TransformIllustration,
} from '../components/service-illustrations';
import { ServiceCard } from '../components/ServiceCard';
import { TrustStrip } from '../components/TrustStrip';
import { OrderSummary } from '../components/OrderSummary';
import { PaymentMethodSelector } from '../components/PaymentMethodSelector';
import { ServiceSearchFilter, type ServiceCategory } from '../components/ServiceSearchFilter';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { fetchServices, createGuestBooking, createGuestCheckout } from '../lib/api';
import type { Service } from '../lib/api';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Sparkles,
  Calendar as CalendarIcon,
  User as UserIcon,
  CreditCard,
  Search,
  MousePointerClick,
  CalendarCheck,
  BadgeCheck,
} from 'lucide-react';

type TabValue = 'service' | 'schedule' | 'details' | 'payment';

const TAB_ORDER: TabValue[] = ['service', 'schedule', 'details', 'payment'];

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

interface ServiceMetaEntry {
  illustration: React.FC;
  badge?: string;
  badgeColor?: string;
  tagline: string;
  duration: string;
  includes: string[];
  curriculum?: string[];
  nextCourse?: { name: string; reason: string };
  details: string;
  originalPrice?: string;
  category: ServiceCategory;
}

const SERVICE_META: Record<string, ServiceMetaEntry> = {
  '30-min AI Starter Session': {
    illustration: StarterIllustration,
    tagline: "Your first step into AI — discover what's possible",
    duration: '30 minutes',
    includes: [
      'Live 1-on-1 Google Meet session',
      'Introduction to AI tools (Gemini, ChatGPT)',
      'AI-generated session notes',
      'Personalised next-steps plan',
    ],
    curriculum: [
      'What is AI and how it works',
      'Live demo: your first AI prompt',
      'Finding AI tools for your specific needs',
      'Action plan: 3 things to try this week',
    ],
    nextCourse: { name: '1-hour AI Mentor', reason: 'Go deeper with custom AI workflows for your work' },
    details:
      'Perfect for anyone curious about AI. In 30 minutes, your mentor will show you practical AI applications relevant to YOUR work. No technical background needed.',
    originalPrice: '$49',
    category: '1on1',
  },
  '1-hour AI Mentor': {
    illustration: MentorIllustration,
    badge: 'MOST POPULAR',
    badgeColor: '#0369A1',
    tagline: 'Deep-dive mentoring tailored to your goals',
    duration: '60 minutes',
    includes: [
      '60-min live Google Meet session',
      'Custom AI workflow building',
      'Prompt engineering practice',
      'AI session summary + Q&A extraction',
      'Personalised learning path',
      'Google Docs notes shared to your Drive',
    ],
    curriculum: [
      'Review your current workflows & challenges',
      'Build custom AI prompts for your tasks',
      'Practice prompt engineering techniques',
      'Create an automation workflow',
      'Set goals for continued learning',
    ],
    nextCourse: { name: '5-Session Package', reason: 'Continue with a structured path — save $45 vs individual sessions' },
    details:
      "Our most popular session. Your mentor works with you 1-on-1 to solve real problems with AI. You'll leave with working prompts and workflows you can use immediately.",
    originalPrice: '$120',
    category: '1on1',
  },
  '5-Session Package': {
    illustration: Package5Illustration,
    badge: 'BEST VALUE',
    badgeColor: '#10b981',
    tagline: '5-week structured learning journey',
    duration: '5 x 60 minutes (weekly)',
    includes: [
      '5 x 60-min sessions (weekly)',
      'Structured AI curriculum',
      'Progress tracking dashboard',
      'All AI notes & session recordings',
      'Priority scheduling',
      'Email support between sessions',
      'Homework & practice exercises',
    ],
    curriculum: [
      'Week 1: AI Foundations & Your First Workflows',
      'Week 2: Prompt Engineering Mastery',
      'Week 3: AI for Content & Communication',
      'Week 4: Data Analysis & Decision Making with AI',
      'Week 5: Building Your AI Toolkit + Final Project',
    ],
    nextCourse: { name: '10-Session Package', reason: 'Continue to advanced topics and earn your certificate' },
    details:
      'A comprehensive 5-week program that takes you from AI basics to building practical workflows. Each session builds on the previous, with exercises between sessions to reinforce learning.',
    category: 'group',
  },
  '10-Session Package': {
    illustration: Package10Illustration,
    tagline: 'Complete AI mastery with certificate',
    duration: '10 x 60 minutes',
    includes: [
      '10 x 60-min sessions',
      'Complete AI curriculum (beginner → advanced)',
      'Certificate of Completion',
      'Lifetime access to all notes & recordings',
      'VIP priority scheduling',
      '24/7 WhatsApp mentor support',
      'Monthly check-in for 3 months after completion',
      'Capstone project with feedback',
    ],
    curriculum: [
      'Sessions 1-2: AI Foundations & Tools',
      'Sessions 3-4: Prompt Engineering & Automation',
      'Sessions 5-6: AI for Business Operations',
      'Sessions 7-8: Advanced AI Applications',
      'Session 9: Capstone Project Development',
      'Session 10: Project Review & Certificate',
    ],
    nextCourse: { name: 'AI Business Transformation', reason: 'Scale AI across your entire team and organisation' },
    details:
      'The ultimate AI learning experience. Covers everything from basics to deploying AI solutions in your business. Includes a capstone project where you build a complete AI workflow.',
    category: 'group',
  },
  'AI Business Transformation Program': {
    illustration: TransformIllustration,
    badge: 'PREMIUM',
    badgeColor: '#ec4899',
    tagline: 'Enterprise-grade AI transformation for your business',
    duration: 'Custom (10-20 sessions)',
    includes: [
      'Custom session count (10-20 sessions)',
      'Full business AI audit & strategy',
      'Team training (up to 10 people)',
      'Custom AI solution implementation',
      'ROI measurement & reporting',
      'Dedicated account manager',
      '90-day post-program support',
      'Executive summary reports',
    ],
    curriculum: [
      'Phase 1: Discovery & AI Audit (2-3 sessions)',
      'Phase 2: Strategy & Roadmap (2 sessions)',
      'Phase 3: Implementation & Training (4-8 sessions)',
      'Phase 4: Optimisation & Measurement (2-3 sessions)',
      'Phase 5: Handover & Ongoing Support',
    ],
    details:
      'For organisations serious about AI. We audit your operations, develop a custom AI strategy, implement solutions, train your team, and measure the business impact.',
    category: 'premium',
  },
};

const FLOW_CHIPS: { label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
  { label: 'Search', icon: Search },
  { label: 'Select', icon: MousePointerClick },
  { label: 'Book', icon: CalendarCheck },
  { label: 'Paid', icon: BadgeCheck },
];

export default function BookingPage() {
  // === STATE ===
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [bankCurrency, setBankCurrency] = useState<'AUD' | 'VND'>('AUD');
  const [audVndRate, setAudVndRate] = useState<number | null>(null);
  const [savedBooking, setSavedBooking] = useState<{ bookingRef: string; meetLink: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [bookingRef] = useState(`BOOK-${Date.now().toString(36).toUpperCase().slice(-6)}`);
  const [selectedSlots, setSelectedSlots] = useState<{ date: string; time: string }[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [agreedTerms, setAgreedTerms] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<TabValue>('service');

  // Search/filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('all');

  // Derived
  const selectedService = services.find((s) => s.id === selectedServiceId) || null;
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const contactValid = contactName.trim().length > 0 && isValidEmail(contactEmail);
  const meetLink =
    savedBooking?.meetLink || `https://meet.longcare.au/${savedBooking?.bookingRef || bookingRef}`;

  const isPackage =
    selectedService?.name.includes('Package') || selectedService?.name.includes('Transformation');
  const sessionCount = selectedService?.name.includes('10')
    ? 10
    : selectedService?.name.includes('5')
    ? 5
    : selectedService?.name.includes('Transformation')
    ? 10
    : 1;
  const calendarMode = isPackage ? ('multi' as const) : ('single' as const);

  // Tab progression: each tab is enabled if its prerequisite is satisfied.
  const tabEnabled: Record<TabValue, boolean> = {
    service: true,
    schedule: !!selectedServiceId,
    details: !!selectedServiceId && !!selectedTime,
    payment: !!selectedServiceId && !!selectedTime && contactValid,
  };

  const tabCompleted: Record<TabValue, boolean> = {
    service: !!selectedServiceId,
    schedule: !!selectedServiceId && !!selectedTime,
    details: !!selectedServiceId && !!selectedTime && contactValid,
    payment: false,
  };

  // === ANALYTICS ===
  const trackEvent = (name: string, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as { gtag?: (...args: unknown[]) => void }).gtag!('event', name, params);
    }
  };

  // === DATA FETCHING ===
  useEffect(() => {
    fetchServices()
      .then((data) => setServices(data))
      .catch(() => {})
      .finally(() => setLoading(false));
    fetch('https://api.exchangerate-api.com/v4/latest/AUD')
      .then((r) => r.json())
      .then((d) => {
        if (d.rates?.VND) setAudVndRate(Math.round(d.rates.VND));
      })
      .catch(() => setAudVndRate(16500));
  }, []);

  // Auto-advance tabs when prerequisite is freshly satisfied.
  useEffect(() => {
    if (selectedServiceId && activeTab === 'service') {
      setActiveTab('schedule');
    }
  }, [selectedServiceId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedTime && activeTab === 'schedule') {
      // For packages, only advance once enough slots are picked.
      if (!isPackage || selectedSlots.length >= sessionCount) {
        setActiveTab('details');
      }
    }
  }, [selectedTime, selectedSlots.length, isPackage, sessionCount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (contactValid && activeTab === 'details' && selectedTime) {
      setActiveTab('payment');
    }
  }, [contactValid]); // eslint-disable-line react-hooks/exhaustive-deps

  // === SERVICE SELECTION ===
  const selectService = (id: string) => {
    setSelectedServiceId(id);
    setSelectedSlots([]);
    setSelectedTime(null);
    const svc = services.find((s) => s.id === id);
    if (svc)
      trackEvent('view_service', {
        service_name: svc.name,
        price: svc.price_cents / 100,
        currency: 'AUD',
      });
  };

  // === TIME SELECTION ===
  const selectTime = (date: string, time: string) => {
    setSelectedTime(`${date} at ${time}`);
    trackEvent('select_time_slot', { time_slot: `${date} ${time}` });
  };

  // === BOOKING ===
  const handleBooking = async (paymentMethod: 'pay_later' | 'bank_transfer') => {
    if (!selectedService || !contactName || !contactEmail) return;
    try {
      const data = await createGuestBooking({
        serviceId: selectedService.id,
        slotTime: isPackage
          ? selectedSlots.map((s) => `${s.date} ${s.time}`).join(' | ')
          : selectedTime || '',
        sessionCount: isPackage ? sessionCount : 1,
        name: contactName,
        email: contactEmail,
        phone: contactPhone || undefined,
        paymentMethod,
      });
      setSavedBooking({ bookingRef: data.bookingRef, meetLink: data.meetLink });
      trackEvent('purchase', {
        method: paymentMethod,
        service_name: selectedService.name,
        value: selectedService.price_cents / 100,
      });

      if (typeof window !== 'undefined' && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as { gtag?: (...args: unknown[]) => void }).gtag!('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
          value: selectedService.price_cents / 100,
          currency: 'AUD',
          transaction_id: data.bookingRef,
        });
      }

      toast.success('Booking confirmed!', {
        description: `Your ${selectedService.name} session has been booked successfully.`,
      });
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      console.error('Booking failed:', err);
      toast.error('Booking failed', { description: message });
    }
  };

  // === STRIPE CHECKOUT ===
  const handleStripeCheckout = async () => {
    if (!selectedService) return;
    setStripeLoading(true);
    setStripeError(null);
    trackEvent('begin_checkout', {
      service_name: selectedService.name,
      value: selectedService.price_cents / 100,
      currency: 'AUD',
    });
    try {
      const { checkoutUrl } = await createGuestCheckout(selectedService.id);
      if (checkoutUrl) {
        toast.success('Redirecting to payment...', { description: 'You will be taken to Stripe Checkout.' });
        window.location.href = checkoutUrl;
      } else {
        setStripeError('Payment service unavailable. Please try bank transfer.');
        toast.error('Payment unavailable', {
          description: 'Please try bank transfer or Pay Later.',
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to connect to payment service. Please try bank transfer or Pay Later.';
      setStripeError(message);
      toast.error('Payment error', { description: message });
    } finally {
      setStripeLoading(false);
    }
  };

  // OrderSummary parts
  const selectedDate = selectedTime?.includes(' at ') ? selectedTime.split(' at ')[0] : selectedTime || '';
  const selectedTimeOnly = selectedTime?.includes(' at ') ? selectedTime.split(' at ')[1] : '';

  // Filtered services
  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return services.filter((s) => {
      const meta = SERVICE_META[s.name];
      if (category !== 'all' && meta?.category !== category) return false;
      if (!q) return true;
      const hay = `${s.name} ${s.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [services, searchQuery, category]);

  // Try to advance to a tab; only allows if enabled.
  const tryGoToTab = (next: TabValue) => {
    if (tabEnabled[next]) setActiveTab(next);
  };

  // ==========================
  // === SUCCESS VIEW ==========
  // ==========================
  if (showSuccess) {
    const ref = savedBooking?.bookingRef || bookingRef;
    return (
      <main className="container">
        <Toaster position="top-center" theme="light" richColors />
        <motion.div
          className="glass-panel"
          style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '2.5rem 1.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          >
            <Check size={40} style={{ color: '#22c55e' }} />
          </motion.div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#0F172A' }}>Booking Confirmed!</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Your session has been booked. Details below.
          </p>

          <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: 12, textAlign: 'left', marginBottom: '1.5rem' }}>
            {selectedService && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-muted)' }}>Service</span>
                <span style={{ fontWeight: 600 }}>{selectedService.name}</span>
              </div>
            )}
            {selectedTime && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-muted)' }}>Time</span>
                <span style={{ fontWeight: 600 }}>{selectedTime}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'var(--text-muted)' }}>Name</span>
              <span style={{ fontWeight: 600 }}>{contactName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'var(--text-muted)' }}>Email</span>
              <span style={{ fontWeight: 600 }}>{contactEmail}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'var(--text-muted)' }}>Amount</span>
              <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>
                {selectedService ? formatPrice(selectedService.price_cents) + ' AUD' : '—'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Ref</span>
              <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{ref}</span>
            </div>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <CalendarIcon size={20} style={{ color: '#4285F4' }} />
              <span style={{ fontWeight: 600, fontSize: '1.05rem' }}>Google Meet Session</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 12 }}>
              Meet link will be sent to {contactEmail}
            </p>
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                (selectedService?.name || 'AI Session') + ' — Longcare AU'
              )}&dates=${(() => {
                const d = new Date();
                d.setDate(d.getDate() + 3);
                const s = d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                d.setHours(d.getHours() + 1);
                return s + '/' + d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
              })()}&details=${encodeURIComponent(
                `Longcare AU — AI Mentoring Session\n\nService: ${selectedService?.name || ''}\nBooking Ref: ${ref}\nClient: ${contactName}\n\nJoin via Google Meet:\n${meetLink}\n\nContact: ceo@longcare.au\nWhatsApp: +61 455 301 335`
              )}&location=${encodeURIComponent(meetLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, margin: 0, width: 'auto', padding: '0.7rem 1.5rem', background: '#4285F4' }}
            >
              <CalendarIcon size={16} />
              Add to Google Calendar
            </a>
          </div>

          {contactPhone && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
              <a
                href={`https://wa.me/61455301335?text=${encodeURIComponent(
                  `Hi Longcare! I just booked: ${selectedService?.name || 'a session'}\nRef: ${ref}\nName: ${contactName}\nTime: ${selectedTime}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, margin: 0, width: 'auto', padding: '0.7rem 1.5rem', background: '#25D366' }}
              >
                Chat on WhatsApp
              </a>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: 8 }}>
              Your booking code — scan to manage
            </p>
            <div style={{ background: '#fff', display: 'inline-block', padding: 12, borderRadius: 12 }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                  `https://book.longcare.au/manage/${savedBooking?.bookingRef || bookingRef}`
                )}`}
                alt="Booking QR Code"
                width={160}
                height={160}
                style={{ display: 'block' }}
              />
            </div>
            <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontWeight: 600, fontSize: '1.1rem', marginTop: 8 }}>
              {savedBooking?.bookingRef || bookingRef}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 4 }}>
              <a
                href={`/manage/${savedBooking?.bookingRef || bookingRef}`}
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                Change date, cancel, or view details →
              </a>
            </p>
          </div>

          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '0.75rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#92400E' }}>
            Please complete payment before your session.
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://app.longcare.au"
              className="btn-primary"
              style={{ margin: 0, width: 'auto', padding: '0.7rem 1.5rem' }}
            >
              Dashboard
            </a>
            <button
              className="btn-secondary"
              style={{ margin: 0, width: 'auto', padding: '0.7rem 1.5rem' }}
              onClick={() => {
                setShowSuccess(false);
                setSelectedServiceId(null);
                setSelectedTime(null);
                setContactName('');
                setContactEmail('');
                setContactPhone('');
                setSavedBooking(null);
                setShowBankTransfer(false);
                setStripeError(null);
                setSelectedPaymentMethod(null);
                setAgreedTerms(false);
                setActiveTab('service');
              }}
            >
              Book Another
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  // ==========================
  // === MAIN BOOKING FLOW ====
  // ==========================
  const TAB_DEFS: { value: TabValue; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { value: 'service', label: 'Service', icon: Sparkles },
    { value: 'schedule', label: 'Schedule', icon: CalendarIcon },
    { value: 'details', label: 'Details', icon: UserIcon },
    { value: 'payment', label: 'Payment', icon: CreditCard },
  ];

  return (
    <main className="container">
      <Toaster position="top-center" theme="light" richColors />

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Book a Session</h1>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 mt-2">
          {FLOW_CHIPS.map(({ label, icon: Icon }, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={[
                  'inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-[12px] font-medium border',
                  TAB_ORDER.indexOf(activeTab) >= i
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : 'bg-transparent text-slate-400 border-slate-200',
                ].join(' ')}
              >
                <Icon size={12} />
                {label}
              </span>
              {i < FLOW_CHIPS.length - 1 && (
                <span className="text-slate-300 text-[10px]">→</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* === TABS === */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          const v = value as TabValue;
          if (TAB_ORDER.includes(v)) tryGoToTab(v);
        }}
      >
        <div className="sticky top-[64px] z-30 -mx-5 md:-mx-8 mb-6 bg-white/90 backdrop-blur-xl border-b border-slate-200">
          <div className="px-5 md:px-8">
            <TabsList className="w-full">
              {TAB_DEFS.map(({ value, label, icon: Icon }) => {
                const enabled = tabEnabled[value];
                const completed = tabCompleted[value];
                return (
                  <TabsTrigger key={value} value={value} disabled={!enabled}>
                    <Icon size={16} />
                    <span>{label}</span>
                    {completed && (
                      <Check size={14} className="text-emerald-600" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </div>

        {/* === TAB 1: SERVICE === */}
        <TabsContent value="service">
          <AnimatePresence mode="wait">
            <motion.div
              key="service"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ServiceSearchFilter
                query={searchQuery}
                onQueryChange={setSearchQuery}
                category={category}
                onCategoryChange={setCategory}
              />

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton" />
                  ))}
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-[14px] text-slate-500">
                  No services match your search.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((s) => {
                    const meta = SERVICE_META[s.name];
                    return (
                      <ServiceCard
                        key={s.id}
                        name={s.name}
                        price={formatPrice(s.price_cents)}
                        originalPrice={meta?.originalPrice}
                        duration={meta?.duration || ''}
                        features={meta?.includes?.slice(0, 3) || [s.description]}
                        shortDescription={meta?.tagline || s.description}
                        badge={meta?.badge}
                        badgeColor={meta?.badgeColor}
                        selected={selectedServiceId === s.id}
                        onClick={() => selectService(s.id)}
                        illustration={meta?.illustration}
                        details={meta?.details}
                        curriculum={meta?.curriculum}
                        includes={meta?.includes}
                        nextCourse={meta?.nextCourse}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* === TAB 2: SCHEDULE === */}
        <TabsContent value="schedule">
          <AnimatePresence mode="wait">
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass-panel"
            >
              <AvailabilityCalendar
                mode={calendarMode}
                sessionCount={sessionCount}
                onSelectSlot={(date, time) => selectTime(date, time)}
                onSelectMultiSlots={(slots) => {
                  setSelectedSlots(slots);
                  if (slots.length > 0) {
                    setSelectedTime(slots.map((s) => `${s.date} ${s.time}`).join(', '));
                  }
                }}
                selectedSlot={
                  selectedTime && !isPackage
                    ? { date: selectedTime.split(' at ')[0], time: selectedTime.split(' at ')[1] }
                    : undefined
                }
                selectedSlots={selectedSlots}
              />
              {selectedTime && !isPackage && (
                <p className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600">
                  <Check size={14} />
                  Selected: {selectedTime}
                </p>
              )}
              {isPackage && selectedSlots.length > 0 && selectedSlots.length < sessionCount && (
                <p className="mt-3 text-[13px] text-amber-600">
                  {selectedSlots.length}/{sessionCount} sessions selected. Pick {sessionCount - selectedSlots.length} more.
                </p>
              )}
              {isPackage && selectedSlots.length >= sessionCount && (
                <p className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600">
                  <Check size={14} />
                  All {sessionCount} sessions scheduled
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* === TAB 3: DETAILS === */}
        <TabsContent value="details">
          <AnimatePresence mode="wait">
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass-panel"
            >
              <div className="grid gap-3">
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Full name"
                  className="form-input"
                  autoComplete="name"
                />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Email address"
                  className="form-input"
                  autoComplete="email"
                />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Phone / WhatsApp (optional)"
                  className="form-input"
                  autoComplete="tel"
                />
                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the{' '}
                    <a href="https://longcare.au/terms" target="_blank" rel="noopener noreferrer">
                      Terms
                    </a>{' '}
                    and{' '}
                    <a href="https://longcare.au/privacy" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                <p className="text-[12px] text-slate-400">
                  Calendar invite + Meet link will be sent to your email
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* === TAB 4: PAYMENT === */}
        <TabsContent value="payment">
          <AnimatePresence mode="wait">
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {selectedService && (
                <OrderSummary
                  serviceName={selectedService.name}
                  date={selectedDate}
                  time={selectedTimeOnly || selectedTime || ''}
                  priceCents={selectedService.price_cents}
                  currency={selectedService.currency}
                />
              )}

              <div className="glass-panel">
                <PaymentMethodSelector
                  selectedMethod={selectedPaymentMethod}
                  onSelect={setSelectedPaymentMethod}
                  onStripeCheckout={handleStripeCheckout}
                  onBankTransfer={() => {
                    trackEvent('add_payment_info', { method: 'bank_transfer' });
                    setShowBankTransfer(!showBankTransfer);
                  }}
                  onPayLater={() => handleBooking('pay_later')}
                  stripeLoading={stripeLoading}
                  stripeError={stripeError}
                  showQR={showBankTransfer}
                  qrContent={
                    <div
                      style={{
                        background: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        borderRadius: 12,
                        padding: '1.5rem',
                        marginTop: '1rem',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <button
                          className={bankCurrency === 'AUD' ? 'btn-primary' : 'btn-secondary'}
                          style={{ flex: 1, margin: 0, padding: '0.6rem', fontSize: '0.9rem' }}
                          onClick={() => setBankCurrency('AUD')}
                        >
                          AUD (Australia)
                        </button>
                        <button
                          className={bankCurrency === 'VND' ? 'btn-primary' : 'btn-secondary'}
                          style={{ flex: 1, margin: 0, padding: '0.6rem', fontSize: '0.9rem' }}
                          onClick={() => setBankCurrency('VND')}
                        >
                          VND (Vietnam)
                        </button>
                      </div>

                      {bankCurrency === 'AUD' && (
                        <div style={{ textAlign: 'center' }}>
                          <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', fontSize: '1.05rem' }}>
                            Scan to Pay (AUD)
                          </h3>
                          <div style={{ background: '#fff', display: 'inline-block', padding: 16, borderRadius: 16 }}>
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                                `Bank: ${process.env.NEXT_PUBLIC_BANK_NAME || 'Westpac'}\n` +
                                `BSB: ${process.env.NEXT_PUBLIC_BANK_BSB || ''}\n` +
                                `Account: ${process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || ''}\n` +
                                `PayID: ${process.env.NEXT_PUBLIC_BANK_PAYID || ''}\n` +
                                `Name: ${process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || ''}\n` +
                                `Amount: ${selectedService ? (selectedService.price_cents / 100).toFixed(2) : '0'} AUD\n` +
                                `Ref: ${bookingRef}`,
                              )}`}
                              alt="Scan to Pay AUD"
                              width={220}
                              height={220}
                              style={{ display: 'block' }}
                            />
                          </div>
                          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            <div><strong>{process.env.NEXT_PUBLIC_BANK_NAME || 'Westpac'}</strong> · {process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME}</div>
                            <div>BSB {process.env.NEXT_PUBLIC_BANK_BSB} · Acc {process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER}</div>
                            <div>PayID: {process.env.NEXT_PUBLIC_BANK_PAYID}</div>
                          </div>
                          <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '1rem' }}>
                            {selectedService ? formatPrice(selectedService.price_cents) + ' AUD' : '—'}
                          </p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                            Open your banking app and scan this QR code
                          </p>
                        </div>
                      )}

                      {bankCurrency === 'VND' && (
                        <div style={{ textAlign: 'center' }}>
                          <h3 style={{ marginBottom: '1rem', color: 'var(--accent)', fontSize: '1.05rem' }}>
                            Quét mã thanh toán (VND)
                          </h3>
                          <div style={{ background: '#fff', display: 'inline-block', padding: 16, borderRadius: 16 }}>
                            <img
                              src={`https://img.vietqr.io/image/${process.env.NEXT_PUBLIC_VIETQR_BANK_CODE || 'VCB'}-${process.env.NEXT_PUBLIC_VIETQR_ACCOUNT_NUMBER || ''}-compact2.png?amount=${
                                selectedService ? Math.round((selectedService.price_cents * (audVndRate || 16500)) / 100) : 0
                              }&addInfo=${bookingRef}&accountName=${encodeURIComponent(process.env.NEXT_PUBLIC_VIETQR_ACCOUNT_NAME || '')}`}
                              alt="Scan to pay VND"
                              width={220}
                              height={220}
                              style={{ display: 'block' }}
                            />
                          </div>
                          <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.3rem', marginTop: '1rem' }}>
                            {selectedService
                              ? `${Math.round(
                                  (selectedService.price_cents * (audVndRate || 16500)) / 100
                                ).toLocaleString()} VND`
                              : '—'}
                          </p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                            {`Tỷ giá: 1 AUD ≈ ${(audVndRate || 16500).toLocaleString()} VND (cập nhật realtime)`}
                          </p>
                        </div>
                      )}

                      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem', textAlign: 'center' }}>
                        After transferring, click below. We will confirm within 24 hours.
                      </p>
                      <button
                        className="btn-primary"
                        style={{ marginTop: '1rem', margin: '1rem auto 0', background: 'var(--accent)' }}
                        onClick={() => handleBooking('bank_transfer')}
                      >
                        I have completed the transfer
                      </button>
                    </div>
                  }
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {/* Trust strip rendered once at the bottom */}
      <div className="mt-10">
        <TrustStrip />
      </div>
    </main>
  );
}
