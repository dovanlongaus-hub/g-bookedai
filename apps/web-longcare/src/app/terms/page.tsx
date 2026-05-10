import type { Metadata } from 'next';
import { CONTACT_EMAIL } from '@/lib/site-config';
import { getPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = getPageMetadata({
  title: 'Terms of Service | LongCare AU',
  description: 'Terms of service for the LongCare AU AI mentoring and learning platform — booking, payment, cancellation, and liability.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="container" style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
      <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>Last updated: 3 May 2026</p>

      <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>1. Service Description</h2>
          <p>
            Longcare AU (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides AI mentoring sessions, personalised learning programs, and business
            transformation consulting for individuals and small-to-medium enterprises (SMEs). Our services are delivered
            via live video sessions on Google Meet, supported by AI-generated session notes, learning paths, and follow-up materials.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            By accessing or using our website at longcare.au and associated services, you agree to be bound by these Terms of Service.
            If you do not agree, please do not use our services.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>2. Booking &amp; Cancellation Policy</h2>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Free cancellation:</strong> You may cancel or reschedule any booking free of charge up to 24 hours before the scheduled session time.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Late cancellation:</strong> Cancellations made less than 24 hours before the scheduled session will incur a $15 AUD rebooking fee.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>No-show:</strong> If you fail to attend a scheduled session without prior notice, no refund will be issued.
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Rescheduling:</strong> You may reschedule a session free of charge up to 24 hours before the scheduled time, subject to availability.
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>3. Payment Terms</h2>
          <ul style={{ paddingLeft: '1.5rem', listStyle: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}>All prices are displayed and charged in Australian Dollars (AUD).</li>
            <li style={{ marginBottom: '0.5rem' }}>All prices are GST-inclusive (10% GST for Australian tax purposes).</li>
            <li style={{ marginBottom: '0.5rem' }}>We accept payment via Stripe (all major credit and debit cards) and Australian bank transfer.</li>
            <li style={{ marginBottom: '0.5rem' }}>Payment is required at the time of booking to confirm your session.</li>
            <li style={{ marginBottom: '0.5rem' }}>Refunds for eligible cancellations will be processed within 5-10 business days to the original payment method.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>4. Intellectual Property</h2>
          <p>
            All content, materials, AI-generated session notes, learning paths, and resources provided through our services
            remain the intellectual property of Longcare AU unless otherwise stated. You are granted a personal, non-transferable
            licence to use session materials for your own learning and business purposes.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            You may not reproduce, distribute, or commercially exploit any materials without our prior written consent.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>5. Privacy</h2>
          <p>
            We are committed to protecting your personal information in accordance with the Australian Privacy Act 1988 (Cth)
            and the Australian Privacy Principles (APPs). For full details on how we collect, use, and protect your data,
            please refer to our <a href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Longcare AU shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to loss of profits, revenue, data, or business
            opportunities arising from your use of our services.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            Our total liability for any claim arising from or related to our services shall not exceed the amount you paid
            for the specific session or service giving rise to the claim.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            AI-generated session notes and recommendations are provided for informational purposes only and do not constitute
            professional advice. You should seek independent professional advice before making business decisions based on
            our session content.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>7. Governing Law</h2>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of New South Wales, Australia.
            Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of New South Wales.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>8. Changes to These Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Changes will be posted on this page with an updated
            &quot;Last updated&quot; date. Your continued use of our services after changes are posted constitutes your acceptance
            of the revised terms.
          </p>
        </section>

        <section>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1rem' }}>9. Contact</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>Email:</strong>{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{CONTACT_EMAIL}</a>
          </p>
          <p style={{ marginTop: '0.25rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>Location:</strong> Sydney, NSW, Australia
          </p>
        </section>
      </div>
    </div>
  );
}
