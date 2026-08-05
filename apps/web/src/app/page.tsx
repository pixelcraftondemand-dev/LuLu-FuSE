const heroHighlights = [
  'Verified profiles for safer matching',
  'Consent-forward chat with clear boundaries',
  'Safety support and reporting built in',
  'Warm, real profiles that encourage authenticity',
];

const cardItems = [
  {
    title: 'Modern discovery',
    description: 'Find people who share your intent, values, and safety expectations.',
  },
  {
    title: 'Profile confidence',
    description: 'Verified identity and thoughtful profile prompts make connections more meaningful.',
  },
  {
    title: 'Respectful interactions',
    description: 'Tools for consent, moderation, and safe conversation keep the experience grounded.',
  },
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">LuLu & FuSE</div>
        <nav className="nav-links">
          <a href="/signup">Get started</a>
          <a href="/login">Sign in</a>
          <a href="/landing">Landing</a>
        </nav>
      </header>

      <section className="hero" style={{ paddingTop: 16 }}>
        <div>
          <p className="eyebrow">Designed for confident, consent-first connection</p>
          <h1>Meet with more clarity, safety, and sincerity.</h1>
          <p className="hero-copy">
            LuLu & FuSE is the dating experience for people who want modern discovery without compromise — verified profiles, respectful boundaries, and curated support for every step.
          </p>
          <div className="hero-actions">
            <a href="/signup" className="btn btn-primary">Create account</a>
            <a href="/login" className="btn btn-secondary">Sign in</a>
          </div>
        </div>

        <div className="hero-card" style={{ padding: 32 }}>
          <h3>What members love</h3>
          <ul style={{ marginTop: 18, display: 'grid', gap: 12 }}>
            {heroHighlights.map((item) => (
              <li key={item} className="feature-item">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-card" style={{ marginTop: 32 }}>
        <div className="section-intro">
          <p className="eyebrow">How it works</p>
          <h2>A safer, warmer path to meaningful matches</h2>
          <p className="secondary-text">
            Start with a verified profile, share your interests and boundaries, and connect through tools designed to support real consent and personal comfort.
          </p>
        </div>

        <div className="feature-grid" style={{ marginTop: 24 }}>
          {cardItems.map((item) => (
            <article key={item.title} className="panel-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card safety-card" style={{ marginTop: 32 }}>
        <h2>Safety is part of the experience, not an afterthought.</h2>
        <p>
          From identity verification to reporting and consent tools, every step is designed to reduce risk and increase comfort. You can focus on connection while our platform helps keep interactions respectful.
        </p>
      </section>

      <section className="section-card" style={{ marginTop: 32 }}>
        <div className="split-grid">
          <div>
            <p className="eyebrow">Community-first values</p>
            <h2>Real people, real choices, real respect.</h2>
            <p className="secondary-text">
              LuLu & FuSE supports people who want a dating app that feels modern, accountable, and welcoming.
            </p>
          </div>
          <div className="panel-card">
            <div className="badge">Featured</div>
            <h3>Private profiles with thoughtful signals</h3>
            <p>
              Every match starts with honest intent. Build a profile that reflects your identity, boundaries, and what matters most.
            </p>
          </div>
        </div>
      </section>

      <section className="section-card cta-banner" style={{ marginTop: 32 }}>
        <div>
          <h2>Ready to start something real?</h2>
          <p className="secondary-text">Create your account and begin with a safer, more respectful dating experience.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
          <a href="/signup" className="btn btn-primary">Create account</a>
          <a href="/login" className="btn btn-secondary">Sign in</a>
        </div>
      </section>

      <footer className="footer" style={{ marginTop: 34 }}>
        <span>© 2026 LuLu & FuSE</span>
        <span>18+ only • Consent-first • Safety-first</span>
      </footer>
    </main>
  );
}
