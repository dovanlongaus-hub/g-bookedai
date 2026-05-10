'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, Settings, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Toaster, toast } from 'sonner';
import { SessionAlert } from '../components/SessionAlert';
import { StatsGrid } from '../components/StatsGrid';
import { BookingCard } from '../components/BookingCard';
import { LearningProgress } from '../components/LearningProgress';
import {
  fetchMyBookings,
  fetchMyNotifications,
  fetchUnreadCount,
  fetchLearningHistory,
  isAuthenticated,
} from '../lib/api';

// Inline initAuth to avoid cross-package build issues
function checkAuthFromUrl() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const token = params.get('auth_token');
  const provider = params.get('auth_provider');
  if (token) {
    localStorage.setItem('auth_token', token);
    if (provider) localStorage.setItem('auth_provider', provider);
    const url = new URL(window.location.href);
    url.searchParams.delete('auth_token');
    url.searchParams.delete('auth_provider');
    window.history.replaceState({}, '', url.pathname + url.search);
  }
}

interface Booking {
  id: string;
  service_name: string;
  starts_at: string;
  ends_at: string;
  status: string;
  google_meet_url?: string;
}

interface LearningSession {
  id: string;
  service_name: string;
  summary: string;
  next_cta: string;
  created_at: string;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Dashboard() {
  const [isDemo, setIsDemo] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [learningHistory, setLearningHistory] = useState<LearningSession[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pick up cross-domain auth token from URL if present
    checkAuthFromUrl();

    if (!isAuthenticated()) {
      setIsDemo(true);
      setLoading(false);
      return;
    }

    setIsDemo(false);
    setLoading(true);

    Promise.allSettled([
      fetchMyBookings(),
      fetchLearningHistory(),
      fetchUnreadCount(),
    ]).then(([bookingsRes, learningRes, unreadRes]) => {
      if (bookingsRes.status === 'fulfilled' && bookingsRes.value.success) {
        setBookings(bookingsRes.value.data || []);
      }
      if (learningRes.status === 'fulfilled' && learningRes.value.success) {
        setLearningHistory(learningRes.value.data || []);
      }
      if (unreadRes.status === 'fulfilled' && unreadRes.value.success) {
        setUnreadCount(unreadRes.value.data?.count || 0);
      }
      setLoading(false);
    });
  }, []);

  // Separate upcoming vs past bookings
  const now = new Date();
  const upcomingBookings = bookings.filter(
    (b) => b.starts_at && new Date(b.starts_at) > now && !['CANCELLED', 'REFUNDED'].includes(b.status),
  );
  const completedCount = bookings.filter((b) => b.status === 'CONFIRMED' && b.starts_at && new Date(b.starts_at) < now).length;

  // Compute learning steps from history
  const learningSteps = learningHistory.slice(0, 5).map((s) => ({
    label: s.service_name || 'Session',
    completed: true,
  }));

  // Compute a next upcoming session for the alert
  const nextSession = upcomingBookings.length > 0
    ? upcomingBookings.sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())[0]
    : null;

  // Format date/time helpers
  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Australia/Sydney' });
  }
  function formatTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', timeZone: 'Australia/Sydney' }) + ' AEST';
  }
  function countdown(iso: string) {
    const diff = new Date(iso).getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `in ${days} days`;
  }

  // --- Demo data fallback ---
  const demoBookings = [
    { id: 'BK-1047', service: '1-Hour AI Mentor', date: 'Mon 5 May', time: '10:00 AM AEST', countdown: 'Tomorrow', meetLink: 'https://meet.google.com/abc-defg-hij' },
    { id: 'BK-1052', service: 'Machine Learning Fundamentals', date: 'Wed 7 May', time: '2:00 PM AEST', countdown: 'in 3 days', meetLink: 'https://meet.google.com/klm-nopq-rst' },
    { id: 'BK-1058', service: 'Career Pathway Review', date: 'Fri 9 May', time: '11:00 AM AEST', countdown: 'in 5 days', meetLink: undefined },
  ];

  const demoLearningSteps = [
    { label: 'Intro to AI', completed: true },
    { label: 'Data Pipelines', completed: true },
    { label: 'Neural Networks', completed: true },
    { label: 'Deep Learning', completed: false },
    { label: 'Deployment', completed: false },
  ];

  const recentNotes = learningHistory.length > 0
    ? learningHistory.slice(0, 3).map((s) => ({ title: s.service_name || 'Session Notes', link: '#' }))
    : [
        { title: 'Introduction to Neural Networks', link: 'https://docs.google.com/document/d/1abc123' },
        { title: 'Data Pipeline Architecture', link: 'https://docs.google.com/document/d/2def456' },
        { title: 'Python for Data Science', link: 'https://docs.google.com/document/d/3ghi789' },
      ];

  return (
    <main className="dashboard">
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 15, 36, 0.95)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#f8f9fa',
          },
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div variants={fadeUpItem} className="dashboard-header">
          <div>
            <h1>Welcome back!</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              variant="outline"
              size="icon"
              className="relative border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[rgba(255,255,255,0.04)]"
              title="Notifications"
              onClick={() => window.location.href = '/notifications'}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1.5 -right-1.5 h-4 min-w-4 p-0 flex items-center justify-center text-[0.6rem] bg-[#ef4444] text-white border-0">
                  {unreadCount}
                </Badge>
              )}
            </Button>
            <a href="/settings">
              <Button
                variant="outline"
                size="icon"
                className="border-[rgba(255,255,255,0.08)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[rgba(255,255,255,0.04)]"
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Demo Mode Banner */}
        {isDemo && (
          <motion.div variants={fadeUpItem}>
            <Card className="demo-banner-card mb-6">
              <div className="flex justify-between items-center flex-wrap gap-3 p-4">
                <div>
                  <strong>Demo Mode</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.75rem' }}>
                    Sign in with Google to see your real bookings and learning history
                  </span>
                </div>
                <a href={`https://g.bookedai.au/login?redirect=${encodeURIComponent('https://app.longcare.au')}`}>
                  <Button size="sm">
                    <LogIn className="mr-1.5 h-3.5 w-3.5" />
                    Sign In
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Loading state */}
        {loading && !isDemo && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ display: 'inline-block', width: 32, height: 32, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Session Alert - real or demo */}
        {!loading && nextSession && (
          <motion.div variants={fadeUpItem}>
            <SessionAlert
              serviceName={nextSession.service_name}
              dateTime={`${formatDate(nextSession.starts_at)} ${formatTime(nextSession.starts_at)}`}
              meetLink={nextSession.google_meet_url}
              onReschedule={() => window.open('https://book.longcare.au', '_blank')}
            />
          </motion.div>
        )}
        {!loading && isDemo && (
          <motion.div variants={fadeUpItem}>
            <SessionAlert
              serviceName="1-Hour AI Mentor"
              dateTime="Today 2:00 PM AEST"
              meetLink="https://meet.google.com/abc-defg-hij"
              onReschedule={() => window.open('https://book.longcare.au', '_blank')}
            />
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div variants={fadeUpItem}>
          <StatsGrid
            sessionsCompleted={isDemo ? 12 : completedCount}
            hoursLearned={isDemo ? 18 : learningHistory.length * 1.5}
            currentStreak={isDemo ? 4 : Math.min(upcomingBookings.length, 7)}
            packageUsed={isDemo ? 7 : bookings.length}
            packageTotal={isDemo ? 10 : Math.max(bookings.length, 10)}
          />
        </motion.div>

        {/* Upcoming Bookings */}
        <motion.section variants={fadeUpItem} className="section">
          <h2>Upcoming Bookings</h2>
          {!isDemo && upcomingBookings.length === 0 && !loading && (
            <p style={{ color: 'var(--text-muted)', padding: '1rem 0' }}>No upcoming bookings. Book a session to get started!</p>
          )}
          {!isDemo
            ? upcomingBookings
                .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
                .map((booking) => (
                  <BookingCard
                    key={booking.id}
                    date={formatDate(booking.starts_at)}
                    time={formatTime(booking.starts_at)}
                    serviceName={booking.service_name}
                    meetLink={booking.google_meet_url}
                    countdown={countdown(booking.starts_at)}
                    onReschedule={() => window.open('https://book.longcare.au', '_blank')}
                  />
                ))
            : demoBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  date={booking.date}
                  time={booking.time}
                  serviceName={booking.service}
                  meetLink={booking.meetLink}
                  countdown={booking.countdown}
                  onReschedule={() => window.open('https://book.longcare.au', '_blank')}
                />
              ))}

          {/* Book Next Session CTA */}
          <a href="https://book.longcare.au">
            <Button className="w-full mt-3 shimmer-button text-base py-5" size="lg">
              Book Next Session
            </Button>
          </a>
        </motion.section>

        {/* Learning Progress */}
        <motion.div variants={fadeUpItem}>
          <LearningProgress
            trackTitle="Track A: AI Foundations"
            completionPercent={isDemo ? 60 : (learningHistory.length > 0 ? Math.round((learningHistory.length / Math.max(learningHistory.length + 2, 5)) * 100) : 0)}
            steps={isDemo ? demoLearningSteps : learningSteps}
            recentNotes={recentNotes}
            recommendedTitle="Deep Learning with TensorFlow"
            recommendedDesc="Based on your neural networks session, this is the natural next step."
            onBookRecommended={() => window.open('https://book.longcare.au', '_blank')}
          />
        </motion.div>

        {/* Footer info */}
        <motion.div variants={fadeUpItem} style={{ textAlign: 'center', padding: '1.5rem 0 1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Sessions from $99 AUD incl. GST &middot; Google Meet &middot; AI session notes included
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
