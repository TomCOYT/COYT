'use client';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Results', href: '#results' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 300ms ease, border-color 300ms ease',
        background: scrolled ? '#ffffff' : 'transparent',
        borderBottom: scrolled ? '1px solid #E8E8E8' : '1px solid transparent',
      }}>
        <div className="nav-inner" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 80px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" className="bebas" style={{ fontSize: 26, letterSpacing: '0.12em', color: '#121212', textDecoration: 'none', lineHeight: 1 }}>
            COYT
          </a>

          <div className="nav-links" style={{ display: 'flex', gap: 40 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} className="sans" style={{ fontSize: 13, color: '#121212', textDecoration: 'none', letterSpacing: '0.01em', transition: 'color 150ms' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00B5B5'}
                onMouseLeave={e => e.currentTarget.style.color = '#121212'}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="nav-cta">
            <a href="#contact" className="pulse-cta sans" style={{ fontSize: 13, fontWeight: 500, background: '#121212', color: '#ffffff', padding: '10px 24px', textDecoration: 'none', display: 'inline-block', letterSpacing: '0.02em', transition: 'background 200ms' }}
              onMouseEnter={e => e.currentTarget.style.background = '#00B5B5'}
              onMouseLeave={e => e.currentTarget.style.background = '#121212'}
            >
              Get in touch
            </a>
          </div>

          <button className="nav-burger" onClick={() => setMenuOpen(true)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} aria-label="Open menu">
            <div style={{ width: 24, height: 1.5, background: '#121212', marginBottom: 6 }} />
            <div style={{ width: 24, height: 1.5, background: '#121212', marginBottom: 6 }} />
            <div style={{ width: 16, height: 1.5, background: '#121212' }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#0F0F0F', zIndex: 200, display: 'flex', flexDirection: 'column', padding: '28px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60 }}>
            <span className="bebas" style={{ fontSize: 26, letterSpacing: '0.12em', color: '#ffffff' }}>COYT</span>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 32, lineHeight: 1 }}>×</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="bebas"
                style={{ fontSize: 52, color: '#ffffff', textDecoration: 'none', letterSpacing: '0.02em', lineHeight: 1.1, transition: 'color 150ms' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00B5B5'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
              >{l.label}</a>
            ))}
          </div>
          <div style={{ marginTop: 'auto' }}>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="sans" style={{ fontSize: 14, fontWeight: 500, background: '#00B5B5', color: '#ffffff', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
              Get in touch
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-inner { padding: 0 24px !important; }
          .nav-links, .nav-cta { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </>
  );
}
