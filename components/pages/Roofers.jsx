"use client";
// /roofers — application funnel for roofing company owners.
// Standalone landing page: no site nav, no footer links. One job: qualify → book.
import React from "react";
const { useState, useEffect, useRef } = React;

/* ═══════════════════════════════════════════════════════════════════════════
   ██  CONFIG — edit this block to launch. Nothing below it needs touching.  ██
   ═══════════════════════════════════════════════════════════════════════════ */

// Two 15-second 16:9 videos (already in /public/assets/roofers/).
// Swap the files or point these at new URLs to change them.
const HERO_VIDEO_URL = "/assets/roofers/hero.mp4";
const HERO_VIDEO_POSTER = ""; // optional poster image; "" = browser uses first frame
const EXPLAINER_VIDEO_URL = "/assets/roofers/explainer.mp4";
const EXPLAINER_VIDEO_POSTER = ""; // optional poster image

// GoHighLevel calendar embed (booking widget URL).
const CALENDAR_EMBED_URL = "https://api.leadconnectorhq.com/widget/booking/WD29jXNzNI40oG2KgKFG";

// GoHighLevel inbound webhook — the full application payload POSTs here.
// "" = skip the POST (calendar still shows, so you can test before wiring GHL).
const FORM_WEBHOOK_URL = "";

// The guarantee remedy line — one place to change the wording everywhere.
const GUARANTEE_REMEDY = "If we don't hit it, we work for free until we do.";

// The social-proof stat shown where testimonials used to be.
const PROOF_STAT = "10,000+";
const PROOF_LINE = "people have run through our system.";

/* ═══════════════════════════════ END CONFIG ═══════════════════════════════ */

// The 7 multiple-choice questions (Q8 is the contact step, rendered separately).
const QUESTIONS = [
  {
    id: "workType",
    question: "What kind of roofing work do you do?",
    options: ["Residential", "Commercial", "Both residential and commercial", "Storm & insurance restoration"],
  },
  {
    id: "monthlyRevenue",
    question: "What's your current monthly revenue?",
    options: ["Under $30k", "$30k – $50k", "$50k – $100k", "$100k+"],
  },
  {
    id: "yearsInBusiness",
    question: "How long have you been in business?",
    options: ["Under 2 years", "2 – 5 years", "5 – 10 years", "10+ years"],
  },
  {
    id: "licensedInsured",
    question: "Are you licensed and insured?",
    options: ["Yes, both", "Licensed, not insured", "Neither yet"],
  },
  {
    id: "leadSource",
    question: "Where do most of your jobs come from right now?",
    options: [
      "Word of mouth and referrals",
      "Shared lead services (Angi, HomeAdvisor, etc.)",
      "Google / our website",
      "Door knocking and canvassing",
      "Honestly, it's not consistent",
    ],
  },
  {
    id: "biggestProblem",
    question: "What's costing you the most money right now?",
    options: [
      "Not enough leads coming in",
      "The leads I get are junk",
      "Leads slip through the cracks — we're disorganized",
      "A competitor outranks me on Google",
      "My website makes us look small",
    ],
  },
  {
    id: "readyToInvest",
    question: "This runs $3,500/month plus a minimum $50/day ad budget. Are you ready to invest that to grow?",
    options: ["Yes — ready to start now", "Yes — if it's the right fit", "Not right now"],
  },
];

const TOTAL_STEPS = QUESTIONS.length + 1; // 7 choice questions + contact step

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

/* ── Explainer video: click-to-play (one autoplaying video is enough) ───── */
function ExplainerVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    setPlaying(true);
  };

  return (
    <div className="rf-video-frame">
      <video
        ref={videoRef}
        src={EXPLAINER_VIDEO_URL}
        poster={EXPLAINER_VIDEO_POSTER || undefined}
        preload="metadata"
        playsInline
        controls={playing}
        onEnded={() => setPlaying(false)}
        aria-label="How the roofing growth system works"
      />
      {!playing && (
        <button type="button" className="rf-play-overlay" onClick={start} aria-label="Play video">
          <span className="rf-play-circle">
            <PlayIcon />
          </span>
        </button>
      )}
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

/* ── Phone auto-format: digits in → (217) 555-0134 out ─────────────────── */
function formatPhone(raw) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/* ── The application form: one question per screen, then contact, then
      the calendar replaces the card in place ──────────────────────────── */
function ApplicationForm() {
  const [step, setStep] = useState(0); // 0..6 = choice questions, 7 = contact
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ fullName: "", companyName: "", phone: "", email: "", city: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const advanceTimer = useRef(null);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  // Move focus to the question heading on step change so keyboard and
  // screen-reader users land in the right place. preventScroll keeps the
  // card fixed in the viewport — the page must not jump on mobile.
  useEffect(() => {
    if (headingRef.current) headingRef.current.focus({ preventScroll: true });
  }, [step]);

  // Choice questions: clicking an answer selects it, shows the selection for
  // a beat, then auto-advances. Functional updates — no stale-closure races.
  const choose = (questionId, option) => {
    setAnswers((a) => ({ ...a, [questionId]: option }));
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => setStep((s) => s + 1), 250);
  };

  const back = () => {
    clearTimeout(advanceTimer.current);
    setStep((s) => Math.max(0, s - 1));
  };

  const setField = (field) => (e) => {
    const value = field === "phone" ? formatPhone(e.target.value) : e.target.value;
    setContact((c) => ({ ...c, [field]: value }));
    setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!contact.fullName.trim()) err.fullName = "We need your name.";
    if (!contact.companyName.trim()) err.companyName = "What's your company called?";
    if (contact.phone.replace(/\D/g, "").length !== 10) err.phone = "Enter a 10-digit phone number.";
    if (!/^\S+@\S+\.\S+$/.test(contact.email.trim())) err.email = "That email doesn't look right.";
    if (!contact.city.trim()) err.city = "Tell us the city or area you work in.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);

    // Fire the webhook first — but never let a GHL hiccup cost a booking.
    // 6-second cap, all failures swallowed; the calendar shows regardless.
    if (FORM_WEBHOOK_URL) {
      const payload = {
        ...answers,
        fullName: contact.fullName.trim(),
        companyName: contact.companyName.trim(),
        phone: contact.phone,
        email: contact.email.trim(),
        city: contact.city.trim(),
        page: "/roofers",
        submittedAt: new Date().toISOString(),
      };
      try {
        await Promise.race([
          fetch(FORM_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error("webhook timeout")), 6000)),
        ]);
      } catch {
        /* calendar still shows — do not block the booking */
      }
    }

    // Meta Pixel is loaded globally in layout.jsx — count the application.
    try {
      if (typeof window.fbq === "function") window.fbq("track", "Lead");
    } catch {
      /* pixel blocked — ignore */
    }

    setSubmitting(false);
    setShowCalendar(true);
  };

  // Scroll the calendar into view when it replaces the form card.
  useEffect(() => {
    if (showCalendar && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showCalendar]);

  const stepNumber = step + 1;
  const percent = Math.floor((stepNumber / TOTAL_STEPS) * 100);
  const currentQuestion = step < QUESTIONS.length ? QUESTIONS[step] : null;

  /* ── Calendar state: the form card is replaced in place ── */
  if (showCalendar) {
    return (
      <div ref={cardRef} className="rf-form-card rf-form-card--calendar">
        <h2 className="rf-form-headline" ref={headingRef} tabIndex={-1}>
          You&rsquo;re Qualified. Lock In Your Call.
        </h2>
        <p className="rf-form-subline">
          Pick a time below. It&rsquo;s a 15-minute call — we&rsquo;ll show you exactly what your #1 spot on Google
          Maps is worth.
        </p>
        <CalendarEmbed />
      </div>
    );
  }

  return (
    <div ref={cardRef} className="rf-form-card">
      {/* Progress */}
      <div className="rf-progress-label">
        Question {stepNumber} of {TOTAL_STEPS} · {percent}%
      </div>
      <div
        className="rf-progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`Application progress: question ${stepNumber} of ${TOTAL_STEPS}`}
      >
        <div className="rf-progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {/* One question per screen. Fixed min-height keeps the card from
          resizing between steps so the viewport never jumps on mobile.
          key={step} re-runs the slide-in animation on every step change. */}
      <div key={step} className="rf-step rf-step--in">
        {currentQuestion ? (
          <>
            <h3 className="rf-question" ref={headingRef} tabIndex={-1}>
              {currentQuestion.question}
            </h3>
            <div className="rf-options" role="group" aria-label={currentQuestion.question}>
              {currentQuestion.options.map((option) => {
                const selected = answers[currentQuestion.id] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    className={`rf-option ${selected ? "rf-option--selected" : ""}`}
                    onClick={() => choose(currentQuestion.id, option)}
                    aria-pressed={selected}
                  >
                    <span className="rf-option-dot" aria-hidden="true" />
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          /* Q8 — contact details, the only step with text inputs */
          <form onSubmit={submit} noValidate>
            <h3 className="rf-question" ref={headingRef} tabIndex={-1}>
              Last step — where do we send your plan?
            </h3>
            <div className="rf-fields">
              {[
                { field: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
                { field: "companyName", label: "Company Name", type: "text", autoComplete: "organization" },
                { field: "phone", label: "Phone", type: "tel", autoComplete: "tel", inputMode: "tel" },
                { field: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email" },
                { field: "city", label: "City / Service Area", type: "text", autoComplete: "address-level2" },
              ].map(({ field, label, type, autoComplete, inputMode }) => (
                <div key={field} className="rf-field">
                  <label htmlFor={`rf-${field}`}>{label}</label>
                  <input
                    id={`rf-${field}`}
                    type={type}
                    inputMode={inputMode}
                    autoComplete={autoComplete}
                    value={contact[field]}
                    onChange={setField(field)}
                    required
                    aria-invalid={errors[field] ? "true" : undefined}
                    aria-describedby={errors[field] ? `rf-${field}-error` : undefined}
                    className={errors[field] ? "rf-input--error" : ""}
                  />
                  {errors[field] && (
                    <div className="rf-field-error" id={`rf-${field}-error`} role="alert">
                      {errors[field]}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className="rf-cta rf-cta--submit" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="rf-spinner" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>See My Availability →</>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Back link on every step except the first. Answers are kept. */}
      {step > 0 && (
        <button type="button" className="rf-back" onClick={back}>
          ← Back
        </button>
      )}
    </div>
  );
}

/* ── The application popup. The form stays mounted while closed, so a
      roofer who closes it and comes back hasn't lost their answers. ────── */
function ApplicationModal({ open, onClose }) {
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
      aria-label="Get your roofing plan"
      aria-hidden={open ? undefined : "true"}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose(); // click the dark backdrop to close
      }}
    >
      <div className="rf-modal-card" ref={cardRef} tabIndex={-1}>
        <button type="button" className="rf-modal-close" onClick={onClose} aria-label="Close the form">
          ×
        </button>
        <ApplicationForm />
      </div>
    </div>
  );
}

/* ── Small inline icons ─────────────────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.54-6.86a1.04 1.04 0 0 0 0-1.76L9.56 4.26A1.04 1.04 0 0 0 8 5.14Z" />
    </svg>
  );
}
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
          <strong>5 booked appointments in your first 30 days</strong>.
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
            5 booked appointments in your first 30 days — <span className="rf-guarantee-mark">guaranteed.</span>
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

      {/* ── 5. Explainer video ── */}
      <section className="rf-section rf-section--tight rf-section--center">
        <h2 className="rf-h2">Here&rsquo;s Exactly How It Works</h2>
        <div className="rf-explainer">
          <ExplainerVideo />
        </div>
        <button type="button" className="rf-cta rf-cta--big" onClick={openForm}>
          Get My Roofing Plan →
        </button>
      </section>

      {/* ── 6. Who This Is For ── */}
      <section className="rf-whofor">
        This is for roofing companies that are <strong>licensed &amp; insured</strong>, doing{" "}
        <strong>$30k+/month</strong>, <strong>2+ years in business</strong>, with <strong>real customer reviews</strong>.
        If that&rsquo;s not you, keep scrolling.
      </section>

      {/* ── 7. Final CTA — the form itself lives in the popup ── */}
      <section className="rf-section rf-section--center">
        <h2 className="rf-h2">See If You Qualify</h2>
        <p className="rf-form-intro">8 quick questions. Takes about 60 seconds. No spam, no obligation.</p>
        <button type="button" className="rf-cta rf-cta--big" onClick={openForm}>
          Get My Roofing Plan →
        </button>
      </section>

      {/* ── 8. The application popup (form → calendar) ── */}
      <ApplicationModal open={formOpen} onClose={() => setFormOpen(false)} />

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
.rf-cta--submit { width: 100%; font-size: 18px; padding: 17px 24px; margin-top: 22px; }
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
.rf-play-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.25);
  border: none;
  transition: background var(--duration-fast) var(--ease-default);
}
.rf-play-overlay:hover { background: rgba(0,0,0,0.4); }
.rf-play-overlay:focus-visible { outline: 3px solid hsl(var(--rf-accent-strong)); outline-offset: -3px; }
.rf-play-circle {
  width: 74px;
  height: 74px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: hsl(var(--rf-accent));
  color: hsl(0 0% 4%);
  box-shadow: 0 10px 36px rgba(0,0,0,0.5);
  transition: transform var(--duration-fast) var(--ease-spring);
}
.rf-play-overlay:hover .rf-play-circle { transform: scale(1.08); }
.rf-play-circle--sm { width: 58px; height: 58px; }

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

/* ── explainer ── */
.rf-explainer { max-width: 760px; margin: 0 auto; }

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
.rf-progress-label {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: hsl(0 0% 60%);
  margin-bottom: 8px;
}
.rf-progress-track {
  height: 8px;
  border-radius: 999px;
  background: hsl(0 0% 17%);
  overflow: hidden;
  margin-bottom: 26px;
}
.rf-progress-fill {
  height: 100%;
  border-radius: 999px;
  background: hsl(var(--rf-accent));
  transition: width var(--duration-slow) var(--ease-default);
}

/* one-question-per-screen step area; flex fill + min-height keep the popup
   height stable between steps, and centering fills the card on tall phones */
.rf-step {
  flex: 1;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.rf-step > form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.rf-step--in { animation: rf-step-in var(--duration-normal) var(--ease-default); }
@keyframes rf-step-in {
  from { opacity: 0; transform: translateX(18px); }
  to   { opacity: 1; transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .rf-step--in { animation: none; }
}

.rf-question {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(22px, 5.4vw, 30px);
  line-height: 1.1;
  margin: 0 0 20px;
}
.rf-question:focus { outline: none; }
.rf-options { display: flex; flex-direction: column; gap: 10px; }
.rf-option {
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  text-align: left;
  font-size: 16.5px;
  font-weight: 600;
  color: hsl(0 0% 96%);
  background: hsl(0 0% 13%);
  border: 2px solid hsl(0 0% 22%);
  border-radius: 13px;
  padding: 15px 16px;
  transition: border-color var(--duration-fast) var(--ease-default), background-color var(--duration-fast) var(--ease-default), transform var(--duration-fast) var(--ease-default);
}
.rf-option:hover { border-color: hsl(var(--rf-accent)); background: hsl(0 0% 16%); }
.rf-option:active { transform: scale(0.99); }
.rf-option:focus-visible { outline: 3px solid hsl(var(--rf-accent-strong)); outline-offset: 2px; }
.rf-option--selected {
  border-color: hsl(var(--rf-accent));
  background: hsl(var(--rf-accent) / 0.16);
}
.rf-option-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid hsl(0 0% 40%);
  flex-shrink: 0;
  transition: all var(--duration-fast) var(--ease-default);
}
.rf-option--selected .rf-option-dot {
  border-color: hsl(var(--rf-accent));
  background: hsl(var(--rf-accent));
  box-shadow: inset 0 0 0 3px hsl(0 0% 9%);
}

.rf-back {
  margin-top: 18px;
  background: none;
  border: none;
  color: hsl(0 0% 60%);
  font-size: 14.5px;
  font-weight: 600;
  padding: 6px 2px;
}
.rf-back:hover { color: hsl(0 0% 90%); }
.rf-back:focus-visible { outline: 3px solid hsl(var(--rf-accent-strong)); outline-offset: 2px; border-radius: 6px; }

/* ── contact fields ── */
.rf-fields { display: flex; flex-direction: column; gap: 14px; }
.rf-field label {
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 6px;
  color: hsl(0 0% 78%);
}
.rf-field input {
  width: 100%;
  font-size: 16px; /* ≥16px prevents iOS zoom-on-focus */
  padding: 13px 14px;
  border-radius: 11px;
  background: hsl(0 0% 13%);
  border: 2px solid hsl(0 0% 24%);
  color: hsl(0 0% 98%);
  transition: border-color var(--duration-fast) var(--ease-default);
}
.rf-field input:focus { outline: none; border-color: hsl(var(--rf-accent)); }
.rf-field input.rf-input--error { border-color: hsl(0 72% 55%); }
.rf-field-error { margin-top: 5px; font-size: 13.5px; font-weight: 500; color: hsl(0 82% 68%); }

.rf-spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid hsl(0 0% 4% / 0.3);
  border-top-color: hsl(0 0% 4%);
  animation: rf-spin 0.7s linear infinite;
}
@keyframes rf-spin { to { transform: rotate(360deg); } }

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
  .rf-step { min-height: 420px; }
}
`;
