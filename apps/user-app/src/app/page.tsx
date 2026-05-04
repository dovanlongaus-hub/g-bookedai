export default function Dashboard() {
  const upcomingBookings = [
    {
      id: 'BK-1047',
      service: 'AI Strategy Consultation',
      date: 'Mon 5 May 2026, 10:00 AM',
      duration: '60 min',
      status: 'confirmed' as const,
      meetLink: 'https://meet.google.com/abc-defg-hij',
      mentor: 'Dr. Sarah Chen',
    },
    {
      id: 'BK-1052',
      service: 'Machine Learning Fundamentals',
      date: 'Wed 7 May 2026, 2:00 PM',
      duration: '90 min',
      status: 'confirmed' as const,
      meetLink: 'https://meet.google.com/klm-nopq-rst',
      mentor: 'James Nguyen',
    },
    {
      id: 'BK-1058',
      service: 'Career Pathway Review',
      date: 'Fri 9 May 2026, 11:00 AM',
      duration: '45 min',
      status: 'pending' as const,
      meetLink: null,
      mentor: 'Dr. Sarah Chen',
    },
  ];

  const learningHistory = [
    {
      id: 'LS-0041',
      title: 'Introduction to Neural Networks',
      date: '28 Apr 2026',
      summary: 'Covered perceptrons, activation functions, and backpropagation fundamentals. Built a simple classifier from scratch.',
      docsLink: 'https://docs.google.com/document/d/1abc123',
      progress: 100,
    },
    {
      id: 'LS-0039',
      title: 'Data Pipeline Architecture',
      date: '21 Apr 2026',
      summary: 'Designed an ETL pipeline using Cloud Dataflow. Discussed batch vs streaming patterns and error handling strategies.',
      docsLink: 'https://docs.google.com/document/d/2def456',
      progress: 100,
    },
    {
      id: 'LS-0036',
      title: 'Python for Data Science',
      date: '14 Apr 2026',
      summary: 'Pandas, NumPy, and matplotlib deep dive. Completed exploratory data analysis on a real-world dataset.',
      docsLink: 'https://docs.google.com/document/d/3ghi789',
      progress: 100,
    },
  ];

  const recommendations = [
    {
      title: 'Deep Learning with TensorFlow',
      reason: 'Based on your neural networks session, this is the natural next step.',
      type: 'Course',
    },
    {
      title: 'Cloud ML Deployment Workshop',
      reason: 'You have strong pipeline skills — learn to deploy models to production.',
      type: 'Workshop',
    },
    {
      title: 'Resume & Portfolio Review',
      reason: 'With 12 sessions completed, it is time to showcase your new skills.',
      type: 'Career',
    },
  ];

  return (
    <main className="dashboard animate-in">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p className="user-info" style={{ marginTop: '0.25rem' }}>
            Welcome back, Long D.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p className="user-info">app.longcare.au</p>
          <p className="user-info" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Member since Jan 2026
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Sessions</div>
          <div className="stat-value learning">12</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            +3 this month
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Upcoming Bookings</div>
          <div className="stat-value bookings">3</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Next: Mon 5 May
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Learning Progress</div>
          <div className="stat-value learning">78%</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '78%' }} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Hours Invested</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>18.5</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Avg 1.5h per session
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <section className="section">
        <h2>Upcoming Bookings</h2>
        {upcomingBookings.map((booking) => (
          <div className="card" key={booking.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <strong style={{ fontSize: '1.05rem' }}>{booking.service}</strong>
                  <span className={`badge ${booking.status}`}>
                    {booking.status === 'confirmed' ? 'Confirmed' : 'Pending Payment'}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {booking.date} &middot; {booking.duration} &middot; with {booking.mentor}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  Ref: {booking.id}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {booking.meetLink ? (
                  <a href={booking.meetLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Join Meet
                  </a>
                ) : (
                  <a href="https://book.longcare.au/payment" className="btn btn-outline">
                    Complete Payment
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Learning History */}
      <section className="section">
        <h2>Learning History</h2>
        {learningHistory.map((session) => (
          <div className="card" key={session.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <strong>{session.title}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{session.date}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {session.summary}
                </p>
              </div>
              <a href={session.docsLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer" style={{ whiteSpace: 'nowrap' }}>
                View Notes
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Recommended Next Steps */}
      <section className="section">
        <h2>Recommended Next Steps</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Personalised by AI based on your learning history
        </p>
        {recommendations.map((rec, i) => (
          <div className="card" key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <strong>{rec.title}</strong>
                  <span className="badge confirmed">{rec.type}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {rec.reason}
                </p>
              </div>
              <a href="https://book.longcare.au" className="btn btn-outline">
                Book Now
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <a href="https://book.longcare.au" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '1rem' }}>
          Book Next Session
        </a>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
          Sessions from $99 AUD incl. GST &middot; Google Meet &middot; AI session notes included
        </p>
      </div>
    </main>
  );
}
