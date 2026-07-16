'use client';
import { useEffect, useRef, useState } from 'react';

function useCountUpOnView(target: number, duration: number, delay: number) {
  const [value, setValue] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) setTriggered(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [triggered, target, duration, delay]);

  return { value, ref };
}

function MetricBlock({ target, suffix, label, note, delay }: {
  target: number; suffix: string; label: string; note?: string; delay: number;
}) {
  const { value, ref } = useCountUpOnView(target, 1300, delay);
  return (
    <div
      ref={ref}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 10, right: 10, width: 12, height: 12, borderTop: '1px solid rgba(0,181,181,0.3)', borderRight: '1px solid rgba(0,181,181,0.3)' }} />
      <div className="bebas count-num" style={{ fontSize: 'clamp(52px, 5vw, 76px)', color: '#ffffff', lineHeight: 1, marginBottom: 10 }}>
        {value}{suffix}
      </div>
      <div className="sans" style={{ fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00B5B5', fontWeight: 500, lineHeight: 1.4 }}>
        {label}
      </div>
      {note && (
        <div className="sans" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginTop: 8, lineHeight: 1.5 }}>
          {note}
        </div>
      )}
    </div>
  );
}

function RevenueCurve() {
  const pathRef = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setDrawn(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = drawn ? '0' : String(len);
  }, [drawn]);

  const W = 480, H = 280;
  const padL = 48, padR = 20, padT = 24, padB = 48;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const points: [number, number][] = [
    [0, 8], [1, 12], [2, 18], [3, 38], [4, 62], [5, 81], [6, 92], [7, 100],
  ];
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'];

  const toSvgX = (i: number) => padL + (i / (points.length - 1)) * chartW;
  const toSvgY = (v: number) => padT + chartH - (v / 100) * chartH;

  const pathD = points.reduce((acc, [, v], i) => {
    const x = toSvgX(i);
    const y = toSvgY(v);
    if (i === 0) return `M ${x} ${y}`;
    const [, pv] = points[i - 1];
    const px = toSvgX(i - 1);
    const py = toSvgY(pv);
    const cpX = (px + x) / 2;
    return `${acc} C ${cpX} ${py}, ${cpX} ${y}, ${x} ${y}`;
  }, '');

  const endX = toSvgX(points.length - 1);
  const endY = toSvgY(100);
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 24, height: 1, background: '#00B5B5' }} />
        <span className="sans" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#00B5B5' }}>
          Departed Spirits — Revenue trajectory
        </span>
      </div>

      <div
        style={{ position: 'relative', flex: 1, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ display: 'block' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {gridLines.map(v => {
            const y = toSvgY(v);
            const label = v === 0 ? '0%' : v === 100 ? '+446%' : null;
            return (
              <g key={v}>
                <line
                  x1={padL} y1={y} x2={W - padR} y2={y}
                  stroke={v === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'}
                  strokeWidth={v === 0 ? 1 : 0.5}
                  strokeDasharray={v === 0 ? 'none' : '3 4'}
                />
                {label && (
                  <text
                    x={padL - 6} y={y + 4}
                    fill={v === 100 ? '#00B5B5' : 'rgba(255,255,255,0.25)'}
                    fontSize="10"
                    textAnchor="end"
                    fontFamily="var(--font-inter), Inter, sans-serif"
                  >
                    {label}
                  </text>
                )}
              </g>
            );
          })}

          {months.map((m, i) => (
            <text
              key={m}
              x={toSvgX(i)}
              y={H - 10}
              fill="rgba(255,255,255,0.2)"
              fontSize="9"
              textAnchor="middle"
              fontFamily="var(--font-inter), Inter, sans-serif"
            >
              {m}
            </text>
          ))}

          <line
            x1={toSvgX(2)} y1={padT}
            x2={toSvgX(2)} y2={H - padB}
            stroke="rgba(0,181,181,0.2)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x={toSvgX(2) + 6} y={padT + 14}
            fill="rgba(0,181,181,0.5)"
            fontSize="8"
            fontFamily="var(--font-inter), Inter, sans-serif"
          >
            COYT engaged
          </text>

          <defs>
            <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00B5B5" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00B5B5" stopOpacity="0" />
            </linearGradient>
            <clipPath id="curveClip">
              <rect x={padL} y={padT} width={chartW} height={chartH} />
            </clipPath>
          </defs>

          <path
            d={`${pathD} L ${toSvgX(points.length - 1)} ${toSvgY(0)} L ${padL} ${toSvgY(0)} Z`}
            fill="url(#curveGrad)"
            clipPath="url(#curveClip)"
            style={{ opacity: drawn ? 1 : 0, transition: 'opacity 800ms 800ms ease' }}
          />

          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#00B5B5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#curveClip)"
            style={{ transition: 'stroke-dashoffset 1600ms cubic-bezier(0.25, 1, 0.5, 1)' }}
          />

          {drawn && (
            <>
              <circle cx={endX} cy={endY} r="8" fill="rgba(0,181,181,0.15)" className="pulse-dot" />
              <circle cx={endX} cy={endY} r="4" fill="#00B5B5" />
              <circle cx={endX} cy={endY} r="2" fill="#ffffff" />
            </>
          )}
        </svg>

        {showTooltip && drawn && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: '#00B5B5', color: '#ffffff',
            padding: '7px 14px', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
          }}>
            446% REVENUE LIFT — DEPARTED SPIRITS
          </div>
        )}
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 24 }}>
        {[
          { label: 'Channel', value: 'Meta Ads' },
          { label: 'Email', value: 'Klaviyo flows' },
          { label: 'Creative', value: 'Brand content' },
        ].map(item => (
          <div key={item.label}>
            <div className="sans" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 3 }}>{item.label}</div>
            <div className="sans" style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const metrics = [
  { target: 446, suffix: '%', label: 'Online store revenue lift', delay: 0 },
  { target: 32,  suffix: '%', label: 'Of total revenue from email', note: 'Was zero before we built the flows.', delay: 120 },
  { target: 82,  suffix: '%', label: 'Higher conversion rate', delay: 240 },
  { target: 148, suffix: '%', label: 'More sessions', delay: 360 },
];

export default function Results() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="results" className="grain results-section" style={{ background: '#0F0F0F', padding: '120px 80px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <div ref={headerRef} className="fade-up" style={{ marginBottom: 72 }}>
          <p className="sans" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B5B5', marginBottom: 18 }}>
            Case study — Departed Spirits
          </p>
          <h2 className="bebas" style={{ fontSize: 'clamp(52px, 6.5vw, 88px)', color: '#ffffff', lineHeight: 0.95 }}>
            WHAT HAPPENS WHEN
            <br />
            IT ALL WORKS TOGETHER.
          </h2>
        </div>

        <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, marginBottom: 72, alignItems: 'start' }}>
          <RevenueCurve />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {metrics.map(m => <MetricBlock key={m.label} {...m} />)}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 48 }}>
          <p className="sans" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
            What we did
          </p>
          <div className="results-what-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {[
              { num: '01', title: 'Meta ads', body: 'Full account build, audience strategy, creative testing framework, and ongoing management.' },
              { num: '02', title: 'Brand content production', body: 'Short-form video scripted, directed, and produced. Built to perform in the feed, not just look good.' },
              { num: '03', title: 'Klaviyo flows', body: 'Abandoned cart, post-purchase, winback, and welcome series. 32% of total revenue now comes from email.' },
              { num: '04', title: 'SEO audit and fixes', body: 'Technical SEO review and on-page fixes. Underlying issues that were costing organic sessions.' },
            ].map(item => (
              <div key={item.num}>
                <span className="bebas" style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', display: 'block', marginBottom: 10, letterSpacing: '0.1em' }}>{item.num}</span>
                <p className="sans" style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', marginBottom: 8, lineHeight: 1.4 }}>{item.title}</p>
                <p className="sans" style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
          <p className="sans" style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginTop: 48 }}>
            More case studies in progress.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .results-section { padding: 80px 24px !important; }
          .results-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .results-what-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 600px) {
          .results-what-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
