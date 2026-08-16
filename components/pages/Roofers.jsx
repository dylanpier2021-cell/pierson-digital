"use client";
// /roofers — application funnel for roofing company owners.
// Standalone landing page: no site nav, no footer links. One job: qualify → book.
import React from "react";
const { useState, useEffect, useRef } = React;

/* ═══════════════════════════════════════════════════════════════════════════
   ██  CONFIG — edit this block to launch. Nothing below it needs touching.  ██
   ═══════════════════════════════════════════════════════════════════════════ */

// The 15-second 16:9 hero video (already in /public/assets/roofers/).
// Swap the file or point this at a new URL to change it.
const HERO_VIDEO_URL = "/assets/roofers/hero.mp4";
const HERO_VIDEO_POSTER = ""; // optional poster image; "" = browser uses first frame

// GoHighLevel calendar embed (booking widget URL). Every CTA opens this
// straight in a popup — no opt-in form in between.
const CALENDAR_EMBED_URL = "https://api.leadconnectorhq.com/widget/booking/WD29jXNzNI40oG2KgKFG";

// The guarantee remedy line — one place to change the wording everywhere.
const GUARANTEE_REMEDY = "If we don't hit it, we work for free until we do.";

// The one qualification requirement, shown on the page and in the popup.
const QUALIFIER = "For roofing companies doing $30k+/month.";

// The social-proof stat shown where testimonials used to be.
const PROOF_STAT = "10,000+";
const PROOF_LINE = "people have run through our system.";

/* ═══════════════════════════════ END CONFIG ═══════════════════════════════ */

/* ── Hero video: autoplay muted, visible unmute toggle ─────────────────── */
function HeroVideo() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (v.paused) v.play().catch(() => {});
    setMuted(v.muted);
  };

  return (
    <div className="rf-video-frame">
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        poster={HERO_VIDEO_POSTER || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Pierson Digital roofing marketing intro video"
      />
      <button type="button" className="rf-sound-btn" onClick={toggleSound} aria-pressed={!muted}>
        {muted ? (
          <>
            <SoundOffIcon /> Tap for sound
          </>
        ) : (
          <>
            <SoundOnIcon /> Mute
          </>
        )}
      </button>
    </div>
  );
}

/* ── GHL calendar embed (same loader pattern as /book-a-call) ───────────── */
function CalendarEmbed() {
  useEffect(() => {
    if (document.querySelector('script[data-ghl-embed="true"]')) return;
    const s = document.createElement("script");
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.type = "text/javascript";
    s.async = true;
    s.dataset.ghlEmbed = "true";
    document.body.appendChild(s);
  }, []);

  return (
    <div className="rf-calendar-frame">
      <iframe
        src={CALENDAR_EMBED_URL}
        style={{ width: "100%", border: "none", overflow: "hidden", display: "block", minHeight: 700 }}
        scrolling="no"
        id="rf_booking_calendar"
        title="Pick a time for your 15-minute call"
      />
    </div>
  );
}

/* ── The booking popup: straight to the calendar, no opt-in. It stays
      mounted while closed so the calendar is already loaded on open. ───── */
function BookingModal({ open, onClose }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden"; // lock page scroll behind the popup
    if (cardRef.current) cardRef.current.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`rf-modal ${open ? "rf-modal--open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Book your call"
      aria-hidden={open ? undefined : "true"}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose(); // click the dark backdrop to close
      }}
    >
      <div className="rf-modal-card" ref={cardRef} tabIndex={-1}>
        <button type="button" className="rf-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="rf-form-card rf-form-card--calendar">
          <h2 className="rf-form-headline">Lock In Your Call.</h2>
          <p className="rf-form-subline">
            Pick a time below. It&rsquo;s a 15-minute call — we&rsquo;ll show you exactly what your #1 spot on Google
            Maps is worth. {QUALIFIER}
          </p>
          <CalendarEmbed />
        </div>
      </div>
    </div>
  );
}

/* ── Small inline icons ─────────────────────────────────────────────────── */
function SoundOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}
function SoundOnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

/* ── What You Get — 4 pillars ───────────────────────────────────────────── */
const PILLARS = [
  {
    title: "A Custom Website",
    line: "Built from scratch for your company. Not a template every other roofer in town is using.",
  },
  {
    title: "SEO That Works Everywhere",
    line: "Ranked on Google and inside ChatGPT and AI search, where customers are starting to look.",
  },
  {
    title: "#1 on Google Maps — Today",
    line: "SEO is the long game. Local Services Ads put you at the top of the map now, Google Guaranteed badge included.",
  },
  {
    title: "Your Own Lead System",
    line: "Your logo, your name, your app. Every lead lands on your phone, everything in one place.",
  },
];

/* ═══════════════════════════════ THE PAGE ═════════════════════════════════ */
export default function Roofers() {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  return (
    <div className="rf-page" data-theme="dark">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── Top bar: logo + one CTA. No nav. ── */}
      <header className="rf-topbar">
        <img src="/assets/logo-pd.png" alt="Pierson Digital" className="rf-logo" width="40" height="40" />
        <button type="button" className="rf-cta rf-cta--small" onClick={openForm}>
          Get My Roofing Plan
        </button>
      </header>

      {/* ── 1. Hero ── */}
      <section className="rf-hero">
        <h1 className="rf-h1">
          Your Competitor Isn&rsquo;t Better Than You. <span className="rf-h1-accent">He&rsquo;s Just Easier To Find.</span>
        </h1>
        <p className="rf-sub">
          We put roofing companies at <strong>#1 on Google Maps</strong> — and guarantee you{" "}
          <strong>5 booked calls in your first 30 days</strong>.
        </p>
        <HeroVideo />
        <button type="button" className="rf-cta rf-cta--big" onClick={openForm}>
          Get My Roofing Plan →
        </button>
      </section>

      {/* ── 2. The Guarantee Bar ── */}
      <section className="rf-guarantee" aria-label="Our guarantee">
        <div className="rf-guarantee-inner">
          <div className="rf-guarantee-headline">
            5 booked calls in your first 30 days — <span className="rf-guarantee-mark">guaranteed.</span>
          </div>
          <div className="rf-guarantee-terms">
            Requires a minimum $50/day Local Services Ads budget. <strong>{GUARANTEE_REMEDY}</strong>
          </div>
        </div>
      </section>

      {/* ── 3. Social proof ── */}
      <section className="rf-section rf-section--tight rf-section--center">
        <div className="rf-stat-number">{PROOF_STAT}</div>
        <p className="rf-stat-line">{PROOF_LINE}</p>
      </section>

      {/* ── 4. What You Get ── */}
      <section className="rf-section rf-section--tight">
        <h2 className="rf-h2">What You Get</h2>
        <div className="rf-pillars">
          {PILLARS.map((p) => (
            <div key={p.title} className="rf-pillar">
              <h3>{p.title}</h3>
              <p>{p.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Who This Is For ── */}
      <section className="rf-whofor">
        This is for roofing companies doing <strong>$30k+/month</strong>. If that&rsquo;s not you yet, keep
        scrolling.
      </section>

      {/* ── 7. Final CTA — the calendar lives in the popup ── */}
      <section className="rf-section rf-section--center">
        <h2 className="rf-h2">Lock In Your Call</h2>
        <p className="rf-form-intro">15 minutes. No pressure, no obligation. {QUALIFIER}</p>
        <button type="button" className="rf-cta rf-cta--big" onClick={openForm}>
          Get My Roofing Plan →
        </button>
      </section>

      {/* ── 8. The booking popup ── */}
      <BookingModal open={formOpen} onClose={() => setFormOpen(false)} />

      {/* ── Minimal footer: no links, page has one job ── */}
      <footer className="rf-footer">© {new Date().getFullYear()} Pierson Digital · Marketing for roofing companies</footer>
    </div>
  );
}

/* ═══════════════════════════════ STYLES ═══════════════════════════════════
   Page-scoped styles (rf-*). Builds on the site's dark-theme tokens from
   globals.css; adds a safety-orange accent for the roofing audience. */
const STYLES = `
.rf-page {
  --rf-accent: 24 94% 53%;        /* safety orange */
  --rf-accent-strong: 24 100% 60%;
  background: hsl(0 0% 5%);
  color: hsl(0 0% 98%);
  min-height: 100vh;
  overflow-x: clip;
}
.rf-page section { padding-left: 20px; padding-right: 20px; }

/* ── top bar ── */
.rf-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  max-width: 1100px;
  margin: 0 auto;
}
.rf-logo { width: 40px; height: 40px; object-fit: contain; }

/* ── type ── */
.rf-h1 {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(38px, 9vw, 76px);
  line-height: 0.98;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  margin: 0 auto;
  max-width: 900px;
}
.rf-h1-accent { color: hsl(var(--rf-accent-strong)); }
.rf-h2 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(28px, 6vw, 44px);
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  margin: 0 0 24px;
  text-align: center;
}
.rf-sub {
  font-size: clamp(17px, 4.4vw, 21px);
  line-height: 1.45;
  color: hsl(0 0% 82%);
  max-width: 640px;
  margin: 18px auto 24px;
}
.rf-sub strong { color: hsl(0 0% 100%); }

/* ── hero ── */
.rf-hero {
  text-align: center;
  padding-top: 28px;
  padding-bottom: 48px;
  max-width: 1000px;
  margin: 0 auto;
}

/* ── CTA buttons ── */
.rf-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: hsl(var(--rf-accent));
  color: hsl(0 0% 4%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-default), background-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default);
}
.rf-cta:hover { background: hsl(var(--rf-accent-strong)); transform: translateY(-1px); box-shadow: 0 8px 28px hsl(var(--rf-accent) / 0.35); }
.rf-cta:active { transform: translateY(0); }
.rf-cta:focus-visible { outline: 3px solid hsl(var(--rf-accent-strong)); outline-offset: 3px; }
.rf-cta--small { font-size: 14px; padding: 10px 16px; }
.rf-cta--big { font-size: 19px; padding: 18px 34px; margin-top: 26px; }
.rf-cta:disabled { opacity: 0.7; cursor: default; transform: none; }

/* ── video frames ── */
.rf-video-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  max-width: 760px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  background: hsl(0 0% 10%);
  border: 1px solid hsl(0 0% 18%);
  box-shadow: 0 24px 60px -20px rgba(0,0,0,0.6);
}
.rf-video-frame video { width: 100%; height: 100%; object-fit: cover; display: block; }
.rf-sound-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 14px;
  border-radius: var(--radius-pill);
  background: rgba(0,0,0,0.72);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.28);
  backdrop-filter: blur(6px);
}
.rf-sound-btn:hover { background: rgba(0,0,0,0.85); }
.rf-sound-btn:focus-visible { outline: 3px solid hsl(var(--rf-accent-strong)); outline-offset: 2px; }
/* ── guarantee bar ── */
.rf-guarantee {
  background: hsl(var(--rf-accent));
  color: hsl(0 0% 4%);
  padding-top: 40px;
  padding-bottom: 40px;
}
.rf-guarantee-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.rf-guarantee-headline {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(28px, 6.6vw, 54px);
  line-height: 1.02;
  text-transform: uppercase;
}
.rf-guarantee-mark { text-decoration: underline; text-decoration-thickness: 5px; text-underline-offset: 6px; }
.rf-guarantee-terms {
  margin-top: 14px;
  font-size: clamp(15px, 3.6vw, 18px);
  font-weight: 500;
  line-height: 1.45;
}

/* ── sections ── */
.rf-section { padding-top: 64px; padding-bottom: 64px; max-width: 1000px; margin: 0 auto; }
.rf-section--tight { padding-top: 40px; padding-bottom: 40px; }
.rf-section--center { text-align: center; }

/* ── social-proof stat ── */
.rf-stat-number {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(72px, 18vw, 140px);
  line-height: 0.95;
  color: hsl(var(--rf-accent-strong));
  letter-spacing: -0.01em;
}
.rf-stat-line {
  font-size: clamp(18px, 4.6vw, 24px);
  font-weight: 600;
  color: hsl(0 0% 88%);
  margin: 10px 0 0;
}

/* ── pillars ── */
.rf-pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 860px;
  margin: 0 auto;
}
.rf-pillar {
  background: hsl(0 0% 8%);
  border: 1px solid hsl(0 0% 16%);
  border-radius: 16px;
  padding: 22px 22px 20px;
}
.rf-pillar h3 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 22px;
  line-height: 1.05;
  text-transform: uppercase;
  margin: 0 0 8px;
  color: hsl(var(--rf-accent-strong));
}
.rf-pillar p { margin: 0; font-size: 15px; line-height: 1.5; color: hsl(0 0% 78%); }


/* ── who this is for ── */
.rf-whofor {
  max-width: 720px;
  margin: 0 auto;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  font-size: clamp(15px, 3.8vw, 17px);
  line-height: 1.55;
  color: hsl(0 0% 66%);
}
.rf-whofor strong { color: hsl(0 0% 92%); }

/* ── the popup ── */
.rf-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
}
.rf-modal--open { display: flex; }
.rf-modal-card {
  position: relative;
  width: min(620px, 100%);
  max-height: min(760px, 100%);
  overflow-y: auto;
  background: hsl(0 0% 9%);
  border: 1px solid hsl(0 0% 22%);
  border-radius: 20px;
  box-shadow: 0 32px 80px rgba(0,0,0,0.8);
  animation: rf-modal-in var(--duration-normal) var(--ease-default);
}
.rf-modal-card:focus { outline: none; }
@keyframes rf-modal-in {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .rf-modal-card { animation: none; }
}
.rf-modal-close {
  position: sticky;
  top: 10px;
  float: right;
  margin: 10px 12px 0 0;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid hsl(0 0% 30%);
  background: hsl(0 0% 14%);
  color: hsl(0 0% 85%);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  z-index: 5;
}
.rf-modal-close:hover { background: hsl(0 0% 20%); color: #fff; }
.rf-modal-close:focus-visible { outline: 3px solid hsl(var(--rf-accent-strong)); outline-offset: 2px; }
/* fullscreen popup on phones — fill the screen, no wasted edges */
@media (max-width: 720px) {
  .rf-modal { padding: 0; }
  .rf-modal-card {
    width: 100%;
    height: 100%;
    max-height: none;
    border-radius: 0;
    border: none;
  }
}

/* ── the form card (lives inside the popup) ── */
.rf-form-intro { text-align: center; margin: -10px 0 26px; color: hsl(0 0% 62%); font-size: 15px; }
.rf-form-card {
  padding: 26px 24px 22px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
/* ── calendar state ── */
.rf-form-card--calendar { padding: 26px 16px 16px; }
.rf-form-headline {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(26px, 6.4vw, 38px);
  line-height: 1.02;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 10px;
}
.rf-form-headline:focus { outline: none; }
.rf-form-subline { text-align: center; color: hsl(0 0% 72%); font-size: 15.5px; line-height: 1.5; margin: 0 0 20px; }
.rf-calendar-frame {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
}

/* ── footer ── */
.rf-footer {
  text-align: center;
  padding: 28px 20px 40px;
  font-size: 13px;
  color: hsl(0 0% 45%);
}

/* ── mobile ── */
@media (max-width: 720px) {
  .rf-pillars { grid-template-columns: 1fr; }
  .rf-section { padding-top: 48px; padding-bottom: 48px; }
  .rf-form-card { padding: 22px 16px 18px; }
}
`;
