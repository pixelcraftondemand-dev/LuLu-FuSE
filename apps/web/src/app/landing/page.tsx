const heroHighlights = [
  'Verified profiles for safer matching',
  'Consent-forward communication tools',
  'Privacy and support built into every connection',
  'Protection from fake, scam, and spam accounts',
];

const featureCards = [
  {
    title: 'Verified connections',
    description: 'Trust the people you meet with strong profile checks and active moderation.',
  },
  {
    title: 'Clear intentions',
    description: 'Share whether you want to date, chat, or discover new people with confidence.',
  },
  {
    title: 'Instant conversation',
    description: 'Jump into chats with people who are ready to connect, without waiting for a match.',
  },
  {
    title: 'Safety-first support',
    description: 'Report concerns or get guidance from tools built to keep your experience respectful.',
  },
];

export default function LandingPage() {
  return (
    <main className="page-shell">
      <header className="topbar landing-topbar">
        <div className="brand">LuLu & FuSE</div>
        <nav className="nav-links">
          <a href="/landing">Home</a>
          <a href="/safety">Safety</a>
          <a href="/community-guidelines">Community</a>
          <a href="/login">Sign in</a>
          <a href="/signup" className="btn btn-sm btn-primary">Create account</a>
        </nav>
      </header>

      <section className="hero landing-hero">
        <div className="hero-copy-block">
          <p className="eyebrow">Consent-first dating</p>
          <h1>It starts with intention, not a download.</h1>
          <p className="hero-copy">
            LuLu & FuSE is the modern connection space for adults who want thoughtful matching, clear boundaries, and safer conversations.
          </p>
          <div className="hero-actions">
            <a href="/signup" className="btn btn-primary">Create account</a>
            <a href="/login" className="btn btn-secondary">Sign in</a>
          </div>
        </div>

        <aside className="hero-card landing-hero-card">
          <h3>Why LuLu & FuSE?</h3>
          <ul className="feature-list">
            {heroHighlights.map((item) => (
              <li key={item} className="feature-item">{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="section-card" style={{ marginTop: 32 }}>
        <div className="section-intro">
          <p className="eyebrow">Our promise</p>
          <h2>A safe, respectful dating space for real people.</h2>
          <p className="secondary-text">
            Every detail is designed to support consent, comfort, and authentic connection.
          </p>
        </div>

        <div className="feature-grid" style={{ marginTop: 24 }}>
          {featureCards.map((card) => (
            <article key={card.title} className="panel-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>

        <div className="landing-trust-panel" style={{ marginTop: 28 }}>
          <p className="eyebrow">Confidence matters</p>
          <h3>Millions of people find better matches when the experience is built on trust.</h3>
          <p className="secondary-text">
            Our community is backed by safety checks, reporting tools, and a welcoming environment for people who care about honesty and respect.
          </p>
        </div>
      </section>

      <section className="section-card safety-card" style={{ marginTop: 32 }}>
        <h2>Safety is built into the experience.</h2>
        <p>
          From verification to reporting and privacy controls, LuLu & FuSE makes safety a core part of every interaction.
        </p>
      </section>

      <section className="section-card cta-banner" style={{ marginTop: 32 }}>
        <div>
          <h2>Ready to begin a better dating journey?</h2>
          <p className="secondary-text">Create your account and start with intention, safety, and respect.</p>
        </div>
        <div className="cta-actions">
          <a href="/signup" className="btn btn-primary">Create account</a>
          <a href="/login" className="btn btn-secondary">Sign in</a>
        </div>
      </section>
    </main>
  );
}
