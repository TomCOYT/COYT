'use client';
export default function Footer() {
  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Results', href: '#results' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer style={{ background: '#121212', padding: '64px 80px 0' }} className="footer-outer">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 64, paddingBottom: 64 }} className="footer-grid">
          {/* Left */}
          <div>
            <div style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 24,
              letterSpacing: '0.1em',
              color: '#00B5B5',
              marginBottom: 12,
            }}>COYT</div>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 14,
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.6,
            }}>Performance marketing for product brands.</p>
          </div>

          {/* Center: nav */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'color 150ms',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right: contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href="mailto:tom@coyt.com.au"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#00B5B5'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              tom@coyt.com.au
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '24px 0',
        }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.25)',
          }}>
            2026 COYT. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-outer { padding: 48px 24px 0 !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  );
}
