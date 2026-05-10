import type { Metadata } from 'next';
import { CONTACT_EMAIL } from '@/lib/site-config';
import { getPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = getPageMetadata({
  title: 'Privacy Policy | LongCare AU',
  description: 'How LongCare AU collects, uses, and protects your personal information under the Australian Privacy Act 1988 (APP 1-13).',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
      <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>Last updated: 3 May 2026</p>

      <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>1. Introduction</h2>
          <p>
            Longcare AU (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy in accordance with the
            Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs 1-13). This Privacy Policy
            explains how we collect, use, disclose, and protect your personal information when you use our website
            at longcare.au and associated services.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>2. Information We Collect</h2>
          <p>We may collect the following types of personal information:</p>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc', marginTop: '0.75rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Identity information:</strong> Full name, display name, and profile photo.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Contact information:</strong> Email address, phone number, and WhatsApp number.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Booking history:</strong> Session dates, times, services booked, and session status.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Session notes:</strong> AI-generated session summaries, Q&A, action items, and learning path recommendations.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Communication data:</strong> Chat messages with our AI assistant and email correspondence.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Technical data:</strong> IP address, browser type, device information, and usage analytics.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>3. How We Use Your Information</h2>
          <p>We use your personal information for the following purposes:</p>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc', marginTop: '0.75rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Service delivery:</strong> To schedule and deliver mentoring sessions, generate session notes, and create personalised learning paths.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Communications:</strong> To send booking confirmations, session reminders (24h and 1h before), follow-up materials, and respond to your enquiries.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Payment processing:</strong> To process payments and issue invoices and receipts.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Service improvement:</strong> To analyse usage patterns, improve our AI systems, and enhance the quality of our mentoring services.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Legal compliance:</strong> To comply with Australian tax obligations (GST/BAS reporting) and other legal requirements.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>4. Google Services</h2>
          <p>We use the following Google services as part of our platform:</p>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc', marginTop: '0.75rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Google Calendar:</strong> To manage session scheduling, availability, and calendar invitations.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Google Meet:</strong> To host live video mentoring sessions.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Google Docs:</strong> To store and share AI-generated session notes and learning materials.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Google Drive:</strong> To store session-related documents and resources.</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            Your data processed through Google services is subject to{' '}
            <a href="https://policies.google.com/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
              Google&apos;s Privacy Policy
            </a>.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>5. Payment Data</h2>
          <p>
            Payment processing is handled securely by <a href="https://stripe.com/au/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Stripe</a>.
            We do not store your credit card numbers, CVV, or full card details on our servers. Stripe is PCI DSS Level 1
            certified, the highest level of payment security certification.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            We retain transaction records including payment amounts, dates, and invoice references for accounting and
            tax compliance purposes.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>6. Data Retention</h2>
          <p>We retain your personal information for as long as necessary to:</p>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc', marginTop: '0.75rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Provide our services to you and maintain your account.</li>
            <li style={{ marginBottom: '0.5rem' }}>Comply with legal obligations, including Australian tax record-keeping requirements (minimum 5 years).</li>
            <li style={{ marginBottom: '0.5rem' }}>Resolve disputes and enforce our agreements.</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            Session notes and learning materials are retained for the duration of your account. You may request deletion
            of your data at any time (see Your Rights below).
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>7. Your Rights</h2>
          <p>Under the Australian Privacy Act, you have the right to:</p>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc', marginTop: '0.75rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Access:</strong> Request access to the personal information we hold about you.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Correction:</strong> Request correction of any inaccurate or incomplete personal information.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Deletion:</strong> Request deletion of your personal information, subject to our legal retention obligations.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Complaint:</strong> Lodge a complaint with us or with the Office of the Australian Information Commissioner (OAIC) if you believe your privacy has been breached.</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            To exercise any of these rights, please contact us using the details below. We will respond to your request
            within 30 days.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>8. Data Security</h2>
          <p>
            We take reasonable steps to protect your personal information from misuse, interference, loss, and unauthorised
            access, modification, or disclosure. Our security measures include:
          </p>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc', marginTop: '0.75rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>SSL/TLS encryption for all data in transit.</li>
            <li style={{ marginBottom: '0.5rem' }}>Firebase Authentication for secure user access.</li>
            <li style={{ marginBottom: '0.5rem' }}>Role-based access controls for internal systems.</li>
            <li style={{ marginBottom: '0.5rem' }}>Regular security reviews and infrastructure monitoring.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
            &quot;Last updated&quot; date. We encourage you to review this policy periodically. Your continued use of our
            services after changes are posted constitutes your acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>10. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>Email:</strong>{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{CONTACT_EMAIL}</a>
          </p>
          <p style={{ marginTop: '0.25rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>Location:</strong> Sydney, NSW, Australia
          </p>
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
            You may also contact the Office of the Australian Information Commissioner (OAIC) at{' '}
            <a href="https://www.oaic.gov.au" style={{ color: 'var(--accent)', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
