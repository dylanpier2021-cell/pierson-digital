"use client";
import React from "react";
import { Icon } from "@/components/icons";
const { useState: useState3, useEffect: useEffect3, useRef: useRef3 } = React;

// ===== Live Demo — interactive missed-call → text-back simulator =====
function LiveDemo() {
  const [step, setStep] = useState3(0); // 0 idle, 1 ringing, 2 missed, 3 typing, 4 sent, 5 reply, 6 booked
  const [playing, setPlaying] = useState3(false);

  const reset = () => { setStep(0); setPlaying(false); };
  const play = () => {
    setStep(0);
    setPlaying(true);
  };

  useEffect3(() => {
    if (!playing) return;
    const timings = [900, 1400, 1100, 1100, 1500, 1400];
    if (step < 6) {
      const t = setTimeout(() => setStep(step + 1), timings[step] || 1200);
      return () => clearTimeout(t);
    } else {
      setPlaying(false);
    }
  }, [step, playing]);

  return (
    <section className="cc-section cc-section--card" id="live-demo" style={{ scrollMarginTop: 80 }}>
      <div className="cc-container">
        <div style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 24,
          overflow: "hidden",
          padding: 0,
          display: "grid",
          gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1fr",
        }}>
          {/* Left copy */}
          <div style={{ padding: window.innerWidth < 900 ? 32 : 56, display: "flex", flexDirection: "column", gap: 20, justifyContent: "center" }}>
            <div className="cc-eyebrow">
              <span className="cc-live-dot" />
              TRY IT LIVE · NO SIGN-UP
            </div>
            <h2 className="cc-h2" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
              Press play. Watch a missed call become a booked job.
            </h2>
            <p className="cc-lede">
              This is roughly what your customer sees the second the system kicks in. The whole sequence — from missed call to confirmed appointment — runs in under 90 seconds in production.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="cc-btn" onClick={play} disabled={playing}>
                {playing ? <><span className="cc-spinner" /> Playing…</> : <><Icon.play size={12} /> Run the demo</>}
              </button>
              <button className="cc-btn cc-btn--ghost" onClick={reset}>
                <Icon.refresh size={14} /> Reset
              </button>
            </div>
            <DemoTimeline step={step} />
          </div>

          {/* Right phone */}
          <div style={{
            background: "hsl(var(--page))",
            borderLeft: window.innerWidth < 900 ? "none" : "1px solid hsl(var(--border))",
            borderTop: window.innerWidth < 900 ? "1px solid hsl(var(--border))" : "none",
            padding: 32, display: "grid", placeItems: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div className="cc-grid-bg" style={{ opacity: 0.6 }} />
            <DemoPhone step={step} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoTimeline({ step }) {
  const items = [
    { at: 0, label: "Call comes in" },
    { at: 2, label: "Missed → text fires" },
    { at: 4, label: "Customer replies" },
    { at: 6, label: "Job booked" },
  ];
  return (
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((it, i) => {
        const done = step >= it.at + 1;
        const active = step >= it.at && step < (items[i + 1]?.at ?? 99);
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "8px 0",
            color: done || active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
            transition: "color 0.3s",
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: "50%",
              border: "1.5px solid",
              borderColor: done ? "hsl(var(--accent))" : active ? "hsl(var(--accent))" : "hsl(var(--border-strong))",
              background: done ? "hsl(var(--accent))" : "transparent",
              color: "white",
              display: "grid", placeItems: "center",
              flexShrink: 0,
              transition: "all 0.3s",
            }}>
              {done && <Icon.check size={11} stroke={3} />}
            </span>
            <span style={{ fontSize: 14, fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>
              {it.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function DemoPhone({ step }) {
  return (
    <div className="cc-phone" style={{ maxWidth: 320 }}>
      <div className="cc-phone__screen">
        <div className="cc-phone__notch" />
        <div className="cc-phone__statusbar">
          <span>9:41</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "hsl(var(--muted-foreground))" }}>Pierson Digital</span>
        </div>

        {step === 0 && (
          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
            <div>
              <div style={{ width: 60, height: 60, margin: "0 auto 16px", borderRadius: "50%", background: "hsl(var(--muted))", display: "grid", placeItems: "center" }}>
                <Icon.phone size={24} stroke={1.8} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Waiting for a call…</div>
              <div style={{ fontSize: 12.5, color: "hsl(var(--muted-foreground))", marginTop: 4 }}>Press play to start</div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 24, textAlign: "center" }} className="cc-fade-up">
            <div>
              <div style={{ width: 80, height: 80, margin: "0 auto 18px", borderRadius: "50%", background: "hsl(var(--accent-soft))", color: "hsl(var(--accent))", display: "grid", placeItems: "center" }} className="cc-pulse-ring">
                <Icon.phone size={30} stroke={1.8} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 17 }}>Incoming…</div>
              <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 4, fontFamily: "var(--font-mono)" }}>(555) 218-4567</div>
            </div>
          </div>
        )}

        {step >= 2 && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 14px", gap: 8, overflow: "hidden" }}>
            <div className="cc-fade-up" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px",
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
            }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fee2e2", color: "#dc2626", display: "grid", placeItems: "center" }}>
                <Icon.phoneMissed size={14} stroke={2.2} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Missed call</div>
                <div style={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}>(555) 218-4567 · just now</div>
              </div>
            </div>

            {step === 3 && (
              <div className="cc-fade-up" style={{
                alignSelf: "flex-end",
                padding: "10px 14px",
                background: "hsl(var(--accent))",
                color: "white",
                borderRadius: 18,
                borderBottomRightRadius: 4,
                fontSize: 12.5,
                display: "flex", gap: 4,
              }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "white", animation: "cc-fade-up 0.8s infinite" }} />
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "white", animation: "cc-fade-up 0.8s 0.2s infinite" }} />
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "white", animation: "cc-fade-up 0.8s 0.4s infinite" }} />
              </div>
            )}

            {step >= 4 && (
              <div className="cc-sms__bubble cc-sms__bubble--out cc-fade-up">
                Hi! Thanks for calling — sorry we missed you. How can we help?
              </div>
            )}
            {step >= 5 && (
              <div className="cc-sms__bubble cc-sms__bubble--in cc-fade-up">
                Do you have any availability this week?
              </div>
            )}
            {step >= 6 && (
              <div className="cc-sms__bubble cc-sms__bubble--out cc-fade-up" style={{ background: "hsl(142 71% 40%)" }}>
                You're booked for Tue 2pm. Confirm here → piersondigital.co/c/9k4
              </div>
            )}
            {step >= 6 && (
              <div className="cc-fade-up" style={{
                marginTop: "auto",
                padding: 10,
                background: "hsl(142 71% 96%)",
                color: "hsl(142 60% 25%)",
                borderRadius: 10,
                fontSize: 12,
                display: "flex", alignItems: "center", gap: 8,
                border: "1px solid hsl(142 50% 80%)",
              }}>
                <Icon.check size={14} stroke={2.4} />
                <span><strong>Booked — 2:00pm today.</strong> Calendar synced.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ===== Testimonials =====
function Testimonials() {
  const quotes = [
    { t: "Pierson Digital got us ranking on page 1 within 90 days. Our phone started ringing from customers we never would have reached before.", n: "Mike R.", r: "HVAC Contractor · Phoenix, AZ" },
    { t: "The website went live in 6 days and it looked better than anything I'd seen from agencies charging 3x the price. Professional from start to finish.", n: "Sarah K.", r: "Attorney · Chicago, IL" },
    { t: "The CRM and automation alone saved us 10 hours a week. Missed-call text-back recovered at least 5 jobs in the first month.", n: "James T.", r: "Landscaping · Dallas, TX" },
  ];
  return (
    <section className="cc-section cc-section--card">
      <div className="cc-container">
        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 2fr", gap: 48, alignItems: "start" }}>
          <div className="cc-stack-md">
            <div className="cc-eyebrow cc-eyebrow--muted">CUSTOMERS</div>
            <h2 className="cc-h2">Real businesses. Real results.</h2>
            <p className="cc-lede">
              From contractors to law firms to local shops, businesses across all 50 states trust Pierson Digital to grow their traffic, leads, and revenue online.
            </p>
            <div style={{ display: "flex", gap: 24, marginTop: 8, flexWrap: "wrap" }}>
              <Stat n="10,000+" l="companies" />
              <Stat n="50" l="states served" />
              <Stat n="5–7 day" l="site launch" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 700 ? "1fr" : "1fr 1fr", gap: 16 }}>
            {quotes.map((q, i) => (
              <div key={i} className="cc-quote">
                <div className="cc-quote__text">"{q.t}"</div>
                <div className="cc-quote__person">
                  <div className="cc-quote__avatar">{q.n[0]}</div>
                  <div>
                    <div className="cc-quote__name">{q.n}</div>
                    <div className="cc-quote__role">{q.r}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 4, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{l}</div>
    </div>
  );
}

// ===== Pricing / Offer =====
function Offer() {
  return (
    <section className="cc-section cc-section--card" id="offer">
      <div className="cc-container">
        <div className="cc-offer">
          <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="cc-offer__badge">
              <Icon.sparkles size={12} />
              FREE WEBSITE INCLUDED
            </span>
            <h2 className="cc-h2" style={{ marginTop: 20, color: "white" }}>
              One team. One price. <br />
              Everything you need to grow online.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: "hsla(0,0%,100%,0.7)", maxWidth: 480, marginTop: 16 }}>
              With The Full Growth System, your custom website is included — designed, built, and hosted by us, free for as long as you're a customer.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button className="cc-btn cc-btn--blue cc-btn--lg">Book a free call <Icon.arrowUpRight size={14} /></button>
              <button className="cc-btn cc-btn--ghost cc-btn--lg" style={{ background: "transparent", color: "white", borderColor: "hsla(0,0%,100%,0.2)" }}>See live examples</button>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              background: "hsla(0,0%,100%,0.05)",
              border: "1px solid hsla(0,0%,100%,0.12)",
              borderRadius: 16,
              padding: 28,
              backdropFilter: "blur(20px)",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsla(0,0%,100%,0.6)", marginBottom: 16 }}>
                WHAT'S INCLUDED
              </div>
              <div className="cc-stack-sm">
                {[
                  "Page-1 SEO + free custom website",
                  "Facebook & Instagram ad campaigns",
                  "Missed-call text-back automation",
                  "AI chat widget 24/7",
                  "Google review automation",
                  "Full CRM on your phone",
                  "No contract — cancel anytime",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", fontSize: 15, color: "hsla(0,0%,100%,0.92)" }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: "hsla(0,0%,100%,0.1)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <Icon.check size={11} stroke={2.6} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FAQ =====
function FAQ() {
  const items = [
    { q: "How much does it cost?", a: "Services start at $997/mo. SEO and Meta Ads are $997/mo each, custom websites from $97/mo (or $1,000 outright), and CRM & Automation is $297/mo. The Full Growth System bundles all four for $2,000/mo — month-to-month, no contracts." },
    { q: "How long until I see SEO results?", a: "SEO typically starts showing movement in 60–90 days. Several of our clients reach page-1 rankings within 90 days. Your Meta Ads and CRM start generating leads much faster while SEO builds." },
    { q: "How fast can my website go live?", a: "Most custom websites are live in 5–7 days. Every site is SEO-optimized, mobile-first, and built to generate leads — hosting and maintenance included." },
    { q: "Am I locked into a contract?", a: "No. Everything is month-to-month. No contracts, cancel anytime. You get a dedicated account manager and we earn your business every month." },
    { q: "What's included in CRM & Automation?", a: "Missed-call text-back, an AI chat widget that answers 24/7, Google review automation, pipeline management, and your full CRM on your phone. Over 10,000 companies trust our CRM." },
    { q: "Do you work with businesses in my area?", a: "Yes — we serve businesses across all 50 states. Whether you're a contractor, an attorney, or a local shop, the system works nationwide." },
  ];
  const [open, setOpen] = useState3(0);
  return (
    <section className="cc-section cc-section--card" id="faq">
      <div className="cc-container">
        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1.6fr", gap: 64, alignItems: "start" }}>
          <div>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>FAQ</div>
            <h2 className="cc-h2">Questions, answered.</h2>
            <p className="cc-lede" style={{ marginTop: 16 }}>
              Still curious? <a href="/book-a-call" className="cc-link" style={{ display: "inline-flex" }}>Book a free call →</a>
            </p>
          </div>
          <div>
            {items.map((it, i) => (
              <div key={i} className="cc-faq__item" data-open={open === i}>
                <button className="cc-faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{it.q}</span>
                  <span className="cc-faq__icon"><Icon.plus size={12} stroke={2.4} /></span>
                </button>
                <div className="cc-faq__a">{it.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Final CTA =====
function FinalCTA() {
  return (
    <section className="cc-section cc-section--card" style={{ padding: "64px 0 96px" }}>
      <div className="cc-container">
        <div style={{
          padding: "80px 32px",
          textAlign: "center",
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 24,
          position: "relative",
          overflow: "hidden",
        }}>
          <div className="cc-grid-bg" />
          <div style={{ position: "relative" }}>
            <div className="cc-eyebrow" style={{ marginBottom: 16 }}>READY WHEN YOU ARE</div>
            <h2 className="cc-h2" style={{ maxWidth: 720, margin: "0 auto" }}>
              Ready to grow your business online?
            </h2>
            <p className="cc-lede" style={{ margin: "16px auto 32px" }}>
              Free 15-minute strategy call — no slideshow, no pressure. We'll map out exactly how to grow your traffic, leads, and revenue.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cc-btn cc-btn--lg">Book a Free Call <Icon.arrowUpRight size={14} /></button>
              <button className="cc-btn cc-btn--ghost cc-btn--lg">See pricing</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Footer =====
function Footer() {
  const cols = [
    { h: "Product", links: ["Services overview", "How it works", "Pricing", "Results", "FAQ"] },
    { h: "Services", links: ["SEO", "Meta Ads", "Custom Websites", "CRM & Automation", "The Full Growth System"] },
    { h: "Company", links: ["Book a call", "Contact", "Our work", "Privacy Policy", "Terms & Conditions"] },
  ];
  return (
    <footer className="cc-footer">
      <div className="cc-container">
        <div className="cc-footer__grid">
          <div>
            <div className="cc-nav__brand" style={{ marginBottom: 16 }}>
              <span className="cc-logo">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8a5 5 0 0 1 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="11.5" cy="11.5" r="1.5" fill="currentColor" />
                </svg>
              </span>
              <span>Pierson Digital</span>
            </div>
            <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", lineHeight: 1.6, maxWidth: 280, margin: 0 }}>
              Full-service digital marketing agency — SEO, Meta Ads, custom websites, and CRM — serving businesses nationwide. No contracts. Results-focused.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="cc-footer__col">
              <h5>{c.h}</h5>
              {c.links.map((l) => <a key={l} href="#">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="cc-footer__bottom">
          <span>© 2026 Pierson Digital.</span>
          <span>BUILT FOR BUSINESSES NATIONWIDE</span>
        </div>
      </div>
    </footer>
  );
}

export const Sections3 = { LiveDemo, Testimonials, Offer, FAQ, FinalCTA };
