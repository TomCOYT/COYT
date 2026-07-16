'use client';
import { useEffect, useRef, useState } from 'react';

const videos = [
  { src: '/videos/mango-gin-intro.mp4',         label: 'Departed Spirits', sublabel: 'Mango Gin Intro' },
  { src: '/videos/passionfruit-vodka-shots.mp4', label: 'Departed Spirits', sublabel: 'Passionfruit Vodka Shots' },
  { src: '/videos/salted-mango-mule.mp4',        label: 'Departed Spirits', sublabel: 'Salted Mango Mule' },
  { src: '/videos/hard-rated.mp4',               label: 'Hard Rated',       sublabel: 'Brand film' },
  { src: '/videos/compressed-lift.mp4',          label: 'Departed Spirits', sublabel: 'Lift' },
  { src: '/videos/departed-reel-extra.mp4',      label: 'Handson Gloves',   sublabel: 'Meta campaign' },
];

function VideoCard({ src, label, sublabel, onClick, index }: {
  src: string; label: string; sublabel: string; onClick: () => void; index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  // Accent colors cycling
  const accents = ['rgba(0,181,181,0.7)', 'rgba(255,255,255,0.4)', 'rgba(0,181,181,0.5)', 'rgba(255,255,255,0.3)', 'rgba(0,181,181,0.6)'];
  const accent = accents[index % accents.length];

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 240,
        flexShrink: 0,
        aspectRatio: '9/16',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        background: '#0A0A0A',
        transition: 'border-color 200ms',
        borderColor: hovered ? '#00B5B5' : 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Placeholder — shows until video loads */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        opacity: loaded ? 0 : 1, transition: 'opacity 300ms',
        pointerEvents: loaded ? 'none' : 'auto',
        background: '#0A0A0A',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: 20,
      }}>
        <div>
          {/* Index number */}
          <span className="bebas" style={{ fontSize: 48, color: 'rgba(255,255,255,0.06)', lineHeight: 1 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        {/* Bottom label */}
        <div>
          <div style={{ width: 20, height: 1, background: accent, marginBottom: 10 }} />
          <p className="sans" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>
            {label}
          </p>
          <p className="sans" style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
            {sublabel}
          </p>
        </div>
      </div>

      <video
        ref={videoRef}
        src={src}
        muted loop playsInline preload="auto" autoPlay
        onLoadedData={() => setLoaded(true)}
        onCanPlay={() => { setLoaded(true); videoRef.current?.play().catch(() => {}); }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1 }}
      />

      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.5)',
        transition: 'background 200ms',
      }}>
        {/* Play icon */}
        <div style={{
          width: 48, height: 48,
          border: `1.5px solid ${hovered ? '#00B5B5' : 'rgba(255,255,255,0.5)'}`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 200ms, border-color 200ms',
        }}>
          <div style={{
            width: 0, height: 0,
            borderStyle: 'solid',
            borderWidth: '7px 0 7px 14px',
            borderColor: `transparent transparent transparent ${hovered ? '#00B5B5' : '#ffffff'}`,
            marginLeft: 3,
            transition: 'border-color 200ms',
          }} />
        </div>
      </div>
    </div>
  );
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxHeight: '90vh', maxWidth: '90vw' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: -44, right: 0, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 28, cursor: 'pointer', lineHeight: 1, padding: 8 }}>×</button>
        <video src={src} autoPlay controls playsInline style={{ maxHeight: '86vh', maxWidth: '90vw', display: 'block' }} />
      </div>
    </div>
  );
}

export default function Work() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
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
    <section id="work" style={{ background: '#ffffff', paddingTop: 120, paddingBottom: 80 }}>
      {/* Header */}
      <div ref={headerRef} className="fade-up work-header" style={{ maxWidth: 1400, margin: '0 auto 48px', padding: '0 80px' }}>
        <p className="sans" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B5B5', marginBottom: 16 }}>Work</p>
        <h2 className="bebas" style={{ fontSize: 'clamp(48px, 5vw, 72px)', color: '#121212', lineHeight: 0.95, marginBottom: 40 }}>
          BUILT TO PERFORM IN THE FEED.
        </h2>

        {/* Context row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #E8E8E8', paddingTop: 28 }} className="work-context-row">
          {/* Left: client context */}
          <div>
            <p className="sans" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#00B5B5', marginBottom: 6 }}>
              Departed Spirits
            </p>
            <p className="sans" style={{ fontSize: 15, color: '#777777', maxWidth: 380, lineHeight: 1.6 }}>
              Short-form content directed, produced, and tested in the ad account.
            </p>
          </div>
          {/* Right: three inline stats */}
          <div style={{ display: 'flex', gap: 40, flexShrink: 0 }}>
            {[
              { num: '400K', label: 'Monthly views' },
              { num: '446%', label: 'Revenue lift' },
              { num: '82%',  label: 'Higher CVR' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'right' }}>
                <div className="bebas" style={{ fontSize: 24, color: '#121212', lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                <div className="sans" style={{ fontSize: 11, color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: auto-scroll reel */}
      <div
        className="work-desktop"
        style={{ overflow: 'hidden', width: '100%' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`reel-track${paused ? ' paused' : ''}`}
          style={{ display: 'flex', gap: 12, width: 'max-content', padding: '0 80px' }}
        >
          {[...videos, ...videos].map((v, i) => (
            <VideoCard key={i} src={v.src} label={v.label} sublabel={v.sublabel} index={i % videos.length} onClick={() => setLightboxSrc(v.src)} />
          ))}
        </div>
      </div>

      {/* Mobile: horizontal snap scroll */}
      <div className="work-mobile reel-mobile" style={{ padding: '0 24px' }}>
        {videos.map((v, i) => (
          <div key={i} className="reel-mobile-card" style={{ width: 200, flexShrink: 0, aspectRatio: '9/16' }}>
            <VideoCard src={v.src} label={v.label} sublabel={v.sublabel} index={i} onClick={() => setLightboxSrc(v.src)} />
          </div>
        ))}
      </div>

      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}

      <style>{`
        @media (min-width: 769px) { .work-mobile { display: none !important; } }
        @media (max-width: 768px) {
          .work-desktop { display: none !important; }
          .work-header { padding: 0 24px !important; }
          .work-context-row { flex-direction: column; align-items: flex-start !important; gap: 24px; }
        }
      `}</style>
    </section>
  );
}
