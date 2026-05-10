'use client';

import { useState } from 'react';

const faqCategories = [
  {
    category: 'Booking & Sessions',
    items: [
      {
        q: 'How do I book a mentoring session?',
        a: 'Visit book.longcare.au, choose your preferred service, select an available time slot, and enter your details. You will receive a confirmation email with your Google Meet link within minutes.',
      },
      {
        q: 'What happens after I book?',
        a: 'You will receive a confirmation email with your Google Meet link and calendar invite. Your mentor will review your goals before the session. After the session, AI-generated notes, a Q&A summary, and next-step recommendations are delivered to your dashboard and email.',
      },
      {
        q: 'What is included in each session?',
        a: 'Every session includes a live 1-on-1 Google Meet call with your mentor, screen sharing, real-time demonstrations, AI-generated session notes, a Q&A extraction, improvement suggestions, and a personalised next-step recommendation.',
      },
      {
        q: 'Can I reschedule or cancel a session?',
        a: 'Yes. You can reschedule or cancel free of charge up to 24 hours before your session. Simply use the link in your confirmation email or contact us via WhatsApp at +61 455 301 335.',
      },
    ],
  },
  {
    category: 'Payment',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex) via Stripe, as well as bank transfer and QR code payment. All prices are in AUD and include GST.',
      },
      {
        q: 'What is your refund policy?',
        a: 'If you cancel more than 24 hours before your session, you receive a full refund. Cancellations within 24 hours are non-refundable but can be rescheduled once. If you are unsatisfied with your session, contact us and we will work to make it right.',
      },
      {
        q: 'Do I need to pay upfront?',
        a: 'Yes, payment is collected at the time of booking to secure your time slot. For Business Transformation packages, we offer milestone-based payment plans. Contact us to discuss.',
      },
    ],
  },
  {
    category: 'Technology',
    items: [
      {
        q: 'What is Google Meet and how do I join?',
        a: 'Google Meet is a free video conferencing tool by Google. You do not need a Google account to join. Simply click the meet.longcare.au link in your confirmation email at your scheduled time. It works in any modern web browser.',
      },
      {
        q: 'Do I need to install any software?',
        a: 'No. Google Meet runs directly in your web browser (Chrome, Firefox, Safari, or Edge). No downloads or installations required. You just need a stable internet connection, a microphone, and optionally a webcam.',
      },
      {
        q: 'How are AI-generated notes created?',
        a: 'After your session, our AI (powered by Google Gemini) analyses the conversation to produce a structured summary, key Q&A pairs, areas for improvement, and personalised next-step recommendations. Notes are saved to Google Docs and shared with you via email and your dashboard.',
      },
    ],
  },
  {
    category: 'About',
    items: [
      {
        q: 'Who are the mentors?',
        a: 'Our mentors are experienced AI practitioners and educators based in Australia. They have hands-on experience implementing AI solutions for individuals and businesses, and are trained to deliver personalised, outcome-focused sessions.',
      },
      {
        q: 'Is this suitable for beginners?',
        a: 'Absolutely. Our 30-min AI Starter Session ($29) is designed specifically for people with no prior AI experience. Your mentor will tailor the session to your current skill level and goals, whether you are a complete beginner or looking to advance your existing knowledge.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${q.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 0',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text, #e0e0e0)',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0',
          lineHeight: 1.5,
        }}
      >
        <span>{q}</span>
        <span
          aria-hidden="true"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            fontSize: '1.2rem',
            marginLeft: '1rem',
            flexShrink: 0,
            color: 'var(--accent, #66fcf1)',
          }}
        >
          &#9662;
        </span>
      </button>
      {open && (
        <p
          id={panelId}
          role="region"
          style={{
            color: 'var(--text-muted, #9ba1a6)',
            lineHeight: 1.8,
            fontSize: '0.9rem',
            marginTop: '0.5rem',
            paddingRight: '2rem',
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>
            Frequently Asked Questions
          </h1>
          <p className="hero-subtitle">
            Everything you need to know about our AI mentoring sessions
          </p>
        </div>

        {faqCategories.map((cat) => (
          <div className="card" key={cat.category} style={{ marginBottom: '1.5rem' }}>
            <h2
              className="card-title"
              style={{
                fontSize: '1.25rem',
                marginBottom: '0.5rem',
                color: 'var(--accent, #66fcf1)',
              }}
            >
              {cat.category}
            </h2>
            {cat.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        ))}

        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            borderRadius: '1rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            marginTop: '2rem',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Still have questions?
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            We are happy to help. Reach out via WhatsApp or email.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/61455301335?text=Hi%2C%20I%20have%20a%20question%20about%20Longcare"
              className="btn btn-primary"
            >
              WhatsApp Us
            </a>
            <a href="/contact" className="btn btn-outline">
              Contact Page
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
