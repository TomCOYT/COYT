'use client';

export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', background: '#ffffff', paddingTop: 68, display: 'flex', alignItems: 'center' }}>
      <div className="hero-inner" style={{ maxWidth: 1400, margin: '0 auto', width: '100%', padding: '80px 80px' }}>

        <h1 className="bebas hero-h1" style={{ fontSize: 'clamp(56px, 9.5vw, 130px)', lineHeight: 0.93, letterSpacing: '-0.01em', color: '#121212', marginBottom: 36, maxWidth: 800 }}>
          THE SYSTEM
          <br />
          BEHIND SCALING
          <br />
          BRANDS.
        </h1>

        <p className="sans hero-sub" style={{ fontSize: 18, color: '#777777', lineHeight: 1.7, maxWidth: 560, marginBottom: 44 }}>
          Meta ads, Google ads, Klaviyo, and the creative that makes all of it work. One team. Full stack. No handoffs.
        </p>

        <div className="hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="#contact"
            className="pulse-cta sans"
            style={{ fontSize: 13, fontWeight: 500, background: '#121212', color: '#ffffff', padding: '13px 32px', textDecoration: 'none', display: 'inline-block', letterSpacing: '0.02em', transition: 'background 200ms' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#00B5B5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#121212')}
          >
            Get in touch
          </a>
          <a
            href="#work"
            className="sans"
            style={{ fontSize: 13, fontWeight: 500, background: '#ffffff', color: '#121212', border: '1px solid #121212', padding: '13px 32px', textDecoration: 'none', display: 'inline-block', letterSpacing: '0.02em', transition: 'border-color 200ms, color 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00B5B5'; e.currentTarget.style.color = '#00B5B5'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#121212'; e.currentTarget.style.color = '#121212'; }}
          >
            See our work
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner { padding: 60px 24px !important; }
          .hero-sub { font-size: 16px !important; }
          .hero-ctas a { width: 100%; text-align: center; box-sizing: border-box; }
        }
      `}</style>
    </section>
  );
}
