'use client';
import { useEffect, useRef, useState } from 'react';

const items = [
  {
    title: 'AD ACCOUNT ARCHITECTURE',
    body: 'Campaign structure, audience segmentation, and budget allocation built around your margin. This is where most accounts leak money.',
  },
  {
    title: 'CREATIVE THAT CONVERTS',
    body: 'Hook, angle, and format decided before the camera rolls. Not retrofitted after.',
  },
  {
    title: 'EMAIL THAT COMPOUNDS',
    body: 'Abandoned cart, post-purchase, winback. The infrastructure that turns ad spend into retained customers.',
  },
  {
    title: 'DATA YOU CAN TRUST',
    body: 'Server-side tracking so you know what is actually working. Most accounts are running on broken data.',
  },
];

function AccordionItem({ title, body, open, onToggle }: {
  title: string; body: string; open: boolean; onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: '1px solid #D8D8D8' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          cursor: 'pointer', padding: '22px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}
      >
        <span className="bebas" style={{ fontSize: 22, color: open ? '#00B5B5' : '#121212', letterSpacing: '0.03em', lineHeight: 1, transition: 'color 200ms' }}>{title}</span>
        <span style={{
          width: 28, height: 28, flexShrink: 0, border: `1px solid ${open ? '#00B5B5' : '#D8D8D8'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: open ? '#00B5B5' : '#777777', fontSize: 18, lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 250ms, border-color 200ms, color 200ms',
        }}>+</span>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? 200 : 0, transition: 'max-height 320ms cubic-bezier(0.4,0,0.2,1)', borderLeft: open ? '2px solid #00B5B5' : '2px solid transparent' }}>
        <p className="sans" style={{ fontSize: 15, color: '#777777', lineHeight: 1.75, paddingBottom: 24, paddingLeft: open ? 16 : 0, transition: 'padding-left 200ms' }}>{body}</p>
      </div>
    </div>
  );
}

export default function Approach() {
  const [openIndex, setOpenIndex] = useState(0);
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
    <section id="approach" style={{ background: '#F7F7F5', padding: '120px 80px' }} className="approach-section">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="approach-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left sticky */}
          <div ref={leftRef} className="fade-up approach-left" style={{ position: 'sticky', top: 110 }}>
            <p className="sans" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B5B5', marginBottom: 24 }}>How we work</p>
            <h2 className="bebas" style={{ fontSize: 'clamp(40px, 4vw, 56px)', lineHeight: 1, color: '#121212', marginBottom: 36 }}>
              THE BRIEF AND THE MEDIA PLAN ARE WRITTEN IN THE SAME ROOM.
            </h2>
            <p className="sans" style={{ fontSize: 16, color: '#777777', lineHeight: 1.8 }}>
              Most media buyers brief a separate creative team. Most content people cannot read an ad account. We do both, which means the creative is already built to convert before it touches the ad account. That is the difference.
            </p>
          </div>

          {/* Right accordion */}
          <div ref={rightRef} className="fade-up" style={{ paddingTop: 56 }}>
            <div style={{ borderTop: '1px solid #D8D8D8' }}>
              {items.map((item, i) => (
                <AccordionItem
                  key={i}
                  title={item.title}
                  body={item.body}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .approach-section { padding: 80px 24px !important; }
          .approach-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .approach-left { position: static !important; }
        }
      `}</style>
    </section>
  );
}
