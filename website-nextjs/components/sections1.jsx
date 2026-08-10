"use client";
import React from "react";
const { useState, useEffect, useRef } = React;
import { Icon } from "@/components/icons";

// ===== Hero orbital background — spinning ring of business artifacts =====
const ORBIT_CARDS = [
  { angle:   0, kind: "metric",  num: "50",       label: "States served" },
  { angle:  24, kind: "sms",     name: "Mike T.", body: "Yes — let's get started 👍", time: "9:42a" },
  { angle:  48, kind: "pill",    text: "New lead · reply sent", good: true },
  { angle:  72, kind: "review",  name: "Dana R.", text: "Showed up on time, great work.", stars: 5 },
  { angle:  96, kind: "metric",  num: "$997",     label: "Starting /mo" },
  { angle: 120, kind: "notif",   icon: "📅", title: "New consult booked", body: "Strategy call · nationwide" },
  { angle: 144, kind: "sms",     name: "Priya S.", body: "Tuesday at 2pm works", time: "11:08a" },
  { angle: 168, kind: "pill",    text: "12 new leads · today" },
  { angle: 192, kind: "metric",  num: "10,000+",  label: "Companies" },
  { angle: 216, kind: "review",  name: "Jared P.", text: "Easy. Five stars from me.", stars: 5 },
  { angle: 240, kind: "notif",   icon: "✉", title: "Quote sent", body: "New estimate · lead follow-up" },
  { angle: 264, kind: "pill",    text: "5-star review posted ★", good: true },
  { angle: 288, kind: "sms",     name: "Lena M.", body: "Thanks for the follow-up!", time: "2:14p" },
  { angle: 312, kind: "metric",  num: "5–7 days", label: "Site live" },
  { angle: 336, kind: "notif",   icon: "↻", title: "Ranking report", body: "Page-1 keywords · +8 this month" },
];

function HeroOrbit() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const velRef = useRef(0);

  // Deterministic per-card jitter — tilt and radius offset
  const tilts = ORBIT_CARDS.map((_, i) => (((i * 53) % 25) - 12));
  const rJit = ORBIT_CARDS.map((_, i) => 0.92 + (((i * 37) % 100) / 100) * 0.22);

  useEffect(() => {
    const cont = containerRef.current;
    const layoutStatic = () => {
      if (!cont) return;
      const w = cont.offsetWidth, h = cont.offsetHeight;
      const xR = Math.max(w * 0.42, 360), yR = Math.max(h * 0.55, 280);
      for (let i = 0; i < ORBIT_CARDS.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const c = ORBIT_CARDS[i];
        const a = c.angle * Math.PI / 180;
        const x = Math.cos(a) * xR * rJit[i];
        const y = Math.sin(a) * yR * rJit[i];
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${tilts[i]}deg)`;
      }
    };

    // Respect the OS "reduce motion" setting: place cards once, no spinning.
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { layoutStatic(); return; }

    let rotation = 0;
    let lastScroll = window.scrollY;
    let raf;
    const BASE_SPEED = 0.035; // deg per frame, baseline drift
    const MAX_VEL = 3.5;

    const tick = () => {
      rotation += BASE_SPEED + velRef.current;
      velRef.current *= 0.93;
      if (Math.abs(velRef.current) < 0.001) velRef.current = 0;

      const c2 = containerRef.current;
      if (c2) {
        const w = c2.offsetWidth;
        const h = c2.offsetHeight;
        const xR = Math.max(w * 0.42, 360);
        const yR = Math.max(h * 0.55, 280);

        for (let i = 0; i < ORBIT_CARDS.length; i++) {
          const el = cardRefs.current[i];
          if (!el) continue;
          const c = ORBIT_CARDS[i];
          const a = (c.angle + rotation) * Math.PI / 180;
          const x = Math.cos(a) * xR * rJit[i];
          const y = Math.sin(a) * yR * rJit[i];
          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${tilts[i]}deg)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      // Scroll down → spin one way; scroll up → reverse. Magnitude scales with velocity.
      velRef.current += -dy * 0.022;
      if (velRef.current > MAX_VEL) velRef.current = MAX_VEL;
      if (velRef.current < -MAX_VEL) velRef.current = -MAX_VEL;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="cc-hero-orbit" ref={containerRef} aria-hidden="true">
      {ORBIT_CARDS.map((c, i) => (
        <div
          key={i}
          ref={(el) => { cardRefs.current[i] = el; }}
          className={`cc-orbit-card cc-orbit-card--${c.kind}${c.good ? " cc-orbit-card--pill-good" : ""}`}
        >
          {c.kind === "metric" && (
            <>
              <div className="cc-orbit-card__num">{c.num}</div>
              <div className="cc-orbit-card__label">{c.label}</div>
            </>
          )}
          {c.kind === "sms" && (
            <>
              <div className="cc-orbit-card__head">
                <span className="cc-orbit-card__avatar">{c.name[0]}</span>
                <span className="cc-orbit-card__name">{c.name}</span>
                <span className="cc-orbit-card__time">{c.time}</span>
              </div>
              <div className="cc-orbit-card__body">{c.body}</div>
            </>
          )}
          {c.kind === "review" && (
            <>
              <div className="cc-orbit-card__stars">{"★".repeat(c.stars)}</div>
              <div className="cc-orbit-card__quote">"{c.text}"</div>
              <div className="cc-orbit-card__attrib">— {c.name}</div>
            </>
          )}
          {c.kind === "pill" && (
            <>
              <span className="cc-orbit-card__dot" />
              <span>{c.text}</span>
            </>
          )}
          {c.kind === "notif" && (
            <>
              <div className="cc-orbit-card__notif-head">
                <span className="cc-orbit-card__notif-icon">{c.icon}</span>
                <span className="cc-orbit-card__title">{c.title}</span>
              </div>
              <div className="cc-orbit-card__body">{c.body}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// ===== Hero =====
function Hero({ variant }) {
  const [missed, setMissed] = useState(0);

  // little live counter on the side
  useEffect(() => {
    let n = 1247;
    setMissed(n);
    const t = setInterval(() => {
      n += Math.floor(Math.random() * 3);
      setMissed(n);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="cc-hero cc-hero--sky" id="top">
      <div className="cc-hero-sky" aria-hidden="true">
        <span className="cc-hero-sky__sun" />
        <span className="cc-hero-sky__cloud cc-hero-sky__cloud--1" />
        <span className="cc-hero-sky__cloud cc-hero-sky__cloud--2" />
        <span className="cc-hero-sky__cloud cc-hero-sky__cloud--3" />
      </div>
      <div className="cc-container cc-hero__center">
        <h1 className="cc-h1">
          Grow your business<br />
          <span style={{ position: "relative", whiteSpace: "nowrap" }}>
            <span style={{ position: "relative", zIndex: 1 }}>online.</span>
            <svg style={{ position: "absolute", left: -4, right: -4, bottom: -4, width: "calc(100% + 8px)", height: 14, zIndex: 0 }} viewBox="0 0 220 14" preserveAspectRatio="none">
              <path d="M2 10 C 60 2, 160 2, 218 8" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="cc-lede" style={{ maxWidth: 560 }}>
          SEO, Meta Ads, custom websites, and CRM — one team delivering real results for businesses across all 50 states.
        </p>

        <div className="cc-hero__cta" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="/book-a-call" className="cc-btn cc-btn--lg">
            Book a Free Call <Icon.arrowUpRight size={14} />
          </a>
          <a href="/services" className="cc-btn cc-btn--ghost cc-btn--lg">
            Our Services <Icon.arrowRight size={14} />
          </a>
        </div>

        <div className="cc-hero__tags">
          <span>10,000+ companies</span>
          <span>All 50 states</span>
          <span>No contracts</span>
          <span>5–7 day launch</span>
        </div>
      </div>

      {/* Product phone rising halfway up out of the bottom of the hero */}
      <div className="cc-hero__phone-stage">
        <HeroPhone variant="B" missed={missed} />
      </div>
    </section>
  );
}

function HeroPhone({ variant, missed }) {
  const [step, setStep] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const order = [0, 1, 2, 3];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % order.length;
      setStep(order[i]);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div className="cc-phone">
        <div className="cc-phone__screen">
          <div className="cc-phone__notch" />
          <div className="cc-phone__statusbar">
            <span>{time || "9:41"}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ display: "inline-block", width: 14, height: 9, border: "1.5px solid currentColor", borderRadius: 2, position: "relative" }}>
                <span style={{ position: "absolute", inset: 1, background: "currentColor", borderRadius: 1 }} />
              </span>
            </span>
          </div>

          {/* SMS thread */}
          <div className="cc-sms" style={{ flex: 1, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div className="cc-sms__meta">Today {time || "9:41"}</div>

            {step >= 0 && (
              <div className="cc-fade-up" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12.5 }}>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fee2e2", color: "#dc2626", display: "grid", placeItems: "center" }}>
                  <Icon.phoneMissed size={14} stroke={2.2} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>Missed call</div>
                  <div style={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}>(555) 218-4567</div>
                </div>
                <span style={{ fontSize: 10.5, color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-mono)" }}>{time || "9:41"}</span>
              </div>
            )}

            {step >= 1 && (
              <div className="cc-sms__bubble cc-sms__bubble--out" key={`b1-${step}`}>
                Hi! Thanks for reaching out — sorry we missed your call. How can we help?
              </div>
            )}
            {step >= 2 && (
              <div className="cc-sms__bubble cc-sms__bubble--in" key={`b2-${step}`}>
                Do you have any availability this week?
              </div>
            )}
            {step >= 3 && (
              <div className="cc-sms__bubble cc-sms__bubble--out" key={`b3-${step}`}>
                You're booked for Tue 2pm — confirm? <span style={{ opacity: 0.85 }}>piersondigital.co/c/9k4</span>
              </div>
            )}
          </div>

          {/* bottom keyboard hint */}
          <div style={{ padding: "10px 14px 18px", borderTop: "1px solid hsl(var(--border))", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, padding: "8px 12px", background: "hsl(var(--muted))", borderRadius: 999, fontSize: 11.5, color: "hsl(var(--muted-foreground))" }}>
              Auto-reply sent by Pierson Digital
            </div>
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: "hsl(var(--accent))", color: "white", display: "grid", placeItems: "center" }}>
              <Icon.bolt size={13} stroke={2.4} />
            </span>
          </div>
        </div>
      </div>

      {/* Side floating stat */}
      <div className="cc-chip-card cc-float cc-hero__chip cc-hero__chip--left" style={{ position: "absolute", top: 36, left: -28, padding: "10px 14px", display: variant === "B" ? "none" : "flex" }}>
        <div className="cc-chip-card__dot" style={{ background: "hsl(var(--accent-soft))", color: "hsl(var(--accent))" }}>
          <Icon.bolt size={15} stroke={2.4} />
        </div>
        <div>
          <div className="cc-chip-card__title">5–7 day launch</div>
          <div className="cc-chip-card__meta">custom site, live fast</div>
        </div>
      </div>
      <div className="cc-chip-card cc-float cc-hero__chip cc-hero__chip--right" style={{ position: "absolute", bottom: 48, right: -36, padding: "10px 14px", animationDelay: "1.2s", display: variant === "B" ? "none" : "flex" }}>
        <div className="cc-chip-card__dot" style={{ background: "#dcfce7", color: "#16a34a" }}>
          <Icon.trending size={15} stroke={2.4} />
        </div>
        <div>
          <div className="cc-chip-card__title">+{missed.toLocaleString()}</div>
          <div className="cc-chip-card__meta">leads recovered this month</div>
        </div>
      </div>
    </div>
  );
}

// ===== Trades trust strip =====
function Trades() {
  const trades = [
    { name: "SEO", icon: <Icon.search size={14} /> },
    { name: "Meta Ads", icon: <Icon.trending size={14} /> },
    { name: "Custom Websites", icon: <Icon.globe size={14} /> },
    { name: "CRM & Automation", icon: <Icon.refresh size={14} /> },
    { name: "Local SEO", icon: <Icon.shield size={14} /> },
    { name: "Google Reviews", icon: <Icon.star size={14} /> },
    { name: "Lead Generation", icon: <Icon.check size={14} /> },
  ];
  return (
    <div className="cc-section--card" style={{ padding: "26px clamp(20px, 4vw, 64px)" }}>
      <div className="cc-container">
        <div style={{ textAlign: "center", padding: "20px 0 8px" }}>
          <div className="cc-eyebrow cc-eyebrow--muted">FULL-SERVICE DIGITAL MARKETING</div>
        </div>
        <div className="cc-trades">
          {trades.map((t) => (
            <span key={t.name} className="cc-trade">{t.icon}{t.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Sections1 = { Hero, Trades };
