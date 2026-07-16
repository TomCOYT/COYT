'use client';
import { useEffect, useRef, useState } from 'react';

const rows = [
  { num: '01', name: 'Meta and Google Ads', desc: 'Account builds, restructures, and ongoing management. Campaigns built around your margin, not platform defaults.' },
  { num: '02', name: 'Email and CRM', desc: 'Klaviyo, Mailjet, ActiveCampaign. Ecommerce brands should be generating 20-30% of revenue from email. Most are not close.' },
  { num: '03', name: 'Tracking and Attribution', desc: 'Server-side GTM, Meta CAPI, GA4. Wrong data means every downstream decision is wrong. Fix the source first.' },
  { num: '04', name: 'Funnel and CRO', desc: 'Landing page audits, conversion path analysis, and A/B testing frameworks built around real traffic data.' },
  { num: '05', name: 'Creative Production', desc: 'Short-form video scripted, directed, and produced to perform in the feed. Supporting capability, not a standalone service.' },
];

function ServiceRow({ num, name, desc }: { num: string; name: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 32,
        padding: '28px 24px',
        borderBottom: '1px solid #E8E8E8',
        background: hovered ? '#F7F7F5' : 'transparent',
        transition: 'background 200ms',
        cursor: 'default',
      }}
    >
      <span className="bebas" style={{ fontSize: 13, color: '#00B5B5', letterSpacing: '0.1em', flexShrink: 0, width: 28 }}>{num}</span>
      <span className="bebas" style={{ fontSize: 28, color: hovered ? '#00B5B5' : '#121212', flex: 1, lineHeight: 1, letterSpacing: '0.01em', transition: 'color 200ms' }}>{name}</span>
      <span className="sans" style={{ fontSize: 14, color: '#777777', maxWidth: 400, textAlign: 'right', lineHeight: 1.6, flexShrink: 0 }}>{desc}</span>
    </div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, listRef.current].filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" style={{ background: '#ffffff', padding: '120px 80px' }} className="services-section">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div ref={headerRef} className="fade-up" style={{ marginBottom: 64 }}>
          <p className="sans" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B5B5', marginBottom: 20 }}>
            What we do
          </p>
          <h2 className="bebas" style={{ fontSize: 'clamp(48px, 5.5vw, 72px)', lineHeight: 0.95, marginBottom: 20 }}>
            <span style={{ color: '#121212' }}>PERFORMANCE MARKETING.</span><br />
            <span style={{ color: '#00B5B5' }}>BUILT AROUND YOUR MARGINS.</span>
          </h2>
          <p className="sans" style={{ fontSize: 16, color: '#777777', lineHeight: 1.7 }}>
            The full stack, or just the part that needs fixing.
          </p>
        </div>

        <div ref={listRef} className="fade-up" style={{ borderTop: '1px solid #E8E8E8' }}>
          {rows.map(r => <ServiceRow key={r.num} {...r} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-section { padding: 80px 24px !important; }
          .services-section [style*="maxWidth: 400px"] { display: none; }
          .services-section [style*="max-width: 400px"] { display: none; }
        }
      `}</style>
    </section>
  );
}
