'use client';
import { useEffect, useRef } from 'react';

export default function DarkStatBand() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="grain" style={{ background: '#0F0F0F', width: '100%', padding: '88px 80px' }}>
      <div ref={ref} className="fade-up" style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <h2
          className="bebas"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '0.01em',
            marginBottom: 28,
          }}
        >
          ONE CLIENT. FULL STACK. EVERY NUMBER IS REAL.
        </h2>
        <p
          className="sans"
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          Departed Spirits. Meta ads, Klaviyo, tracking, and creative production. End to end.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section.grain { padding: 64px 24px !important; }
        }
      `}</style>
    </section>
  );
}
