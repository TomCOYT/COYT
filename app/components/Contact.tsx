'use client';
import { useEffect, useRef, useState } from 'react';

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: 14,
  color: '#121212',
  border: '1px solid #E8E8E8',
  borderRadius: 0,
  padding: '13px 16px',
  background: '#ffffff',
  width: '100%',
  outline: 'none',
  transition: 'border-color 200ms',
};

export default function Contact() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '', email: '', company: '', spend: '', message: '',
  });

  useEffect(() => {
    const els = [leftRef.current, rightRef.current].filter(Boolean) as HTMLDivElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#121212';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#E8E8E8';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', spend: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ background: '#F7F7F5', padding: '120px 80px' }} className="contact-section">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }} className="contact-grid">
          {/* Left */}
          <div ref={leftRef} className="fade-up">
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#00B5B5',
              marginBottom: 24,
            }}>Contact</p>
            <h2 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(40px, 4.5vw, 64px)',
              color: '#121212',
              lineHeight: 1.05,
              marginBottom: 32,
            }}>
              LET'S TALK ABOUT YOUR BRAND.
            </h2>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 16,
              color: '#777777',
              lineHeight: 1.75,
              marginBottom: 40,
              maxWidth: 440,
            }}>
              If you are spending on ads and not seeing the return, or your email is underperforming, get in touch. Straight conversation, no pitch deck.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <a href="mailto:tom@coyt.com.au" style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                color: '#777777',
                textDecoration: 'none',
                lineHeight: 2.4,
                transition: 'color 150ms',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#00B5B5'}
                onMouseLeave={e => e.currentTarget.style.color = '#777777'}
              >
                tom@coyt.com.au
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div ref={rightRef} className="fade-up">
            {status === 'success' ? (
              <div style={{
                border: '1px solid #E8E8E8',
                padding: 48,
                background: '#ffffff',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 32,
                  color: '#00B5B5',
                  marginBottom: 16,
                }}>MESSAGE SENT.</p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 15,
                  color: '#777777',
                  lineHeight: 1.7,
                }}>
                  Thanks for reaching out. We will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="contact-name-email" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <input
                    name="name"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={inputStyle}
                  />
                </div>
                <input
                  name="company"
                  placeholder="Company"
                  value={form.company}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={inputStyle}
                />
                <select
                  name="spend"
                  required
                  value={form.spend}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...inputStyle, color: form.spend ? '#121212' : '#AAAAAA', appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="" disabled>Monthly ad spend</option>
                  <option value="Under $3k">Under $3k</option>
                  <option value="$3k-$10k">$3k - $10k</option>
                  <option value="$10k-$30k">$10k - $30k</option>
                  <option value="$30k+">$30k+</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                />
                {status === 'error' && (
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#cc0000' }}>
                    Something went wrong. Please try again or email directly.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 18,
                    letterSpacing: '0.05em',
                    background: status === 'sending' ? '#444444' : '#00B5B5',
                    color: '#ffffff',
                    border: 'none',
                    padding: '18px 32px',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    width: '100%',
                    transition: 'background 200ms',
                  }}
                  onMouseEnter={e => { if (status !== 'sending') (e.currentTarget as HTMLButtonElement).style.background = '#009999'; }}
                  onMouseLeave={e => { if (status !== 'sending') (e.currentTarget as HTMLButtonElement).style.background = '#00B5B5'; }}
                >
                  {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-section { padding: 80px 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-name-email { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
