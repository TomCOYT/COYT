'use client';
import { useEffect, useRef } from 'react';

const statRows = [
  { value: '5+',           label: 'Years in performance marketing' },
  { value: 'Full stack',   label: 'Paid, email, tracking, and creative' },
  { value: 'Partner level', label: 'Senior specialists on every engagement' },
];

export default function About() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [leftRef.current, rightRef.current].filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: '#ffffff', padding: '120px 80px' }} className="about-section">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>

          {/* Left */}
          <div ref={leftRef} className="fade-up">
            <p className="sans" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B5B5', marginBottom: 24 }}>About</p>
            <h2 className="bebas" style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', color: '#121212', lineHeight: 1, marginBottom: 40 }}>
              PARTNER-LEVEL WORK.<br />NO AGENCY BLOAT.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <p className="sans" style={{ fontSize: 16, color: '#777777', lineHeight: 1.8 }}>
                COYT is a performance marketing agency focused on Meta ads, Google ads, Klaviyo, and the technical infrastructure that makes all of it work. We run the full stack or come in on the part that is broken.
              </p>
              <p className="sans" style={{ fontSize: 16, color: '#777777', lineHeight: 1.8 }}>
                Every engagement runs at partner level. Senior specialists across paid media, email, and technical systems brought in where the work demands it.
              </p>
              <p className="sans" style={{ fontSize: 16, color: '#777777', lineHeight: 1.8 }}>
                We take on the full stack or come in on the single channel that is underperforming. Either way, the work is done by people who have done it before.
              </p>
            </div>
          </div>

          {/* Right: stat rows */}
          <div ref={rightRef} className="fade-up">
            {statRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '24px 0',
                  borderBottom: '1px solid #E8E8E8',
                }}
              >
                <span className="bebas about-stat-val" style={{ fontSize: 48, color: '#121212', lineHeight: 1 }}>{row.value}</span>
                <span className="sans about-stat-label" style={{ fontSize: 13, color: '#AAAAAA', textAlign: 'right', maxWidth: 220, lineHeight: 1.45 }}>{row.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-section { padding: 80px 24px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-stat-val { font-size: 36px !important; }
          .about-stat-label { font-size: 12px !important; max-width: 160px !important; }
        }
      `}</style>
    </section>
  );
}
