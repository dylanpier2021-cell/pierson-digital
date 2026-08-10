"use client";
import React from "react";
import { Layout, PageHero, CTABlock } from "@/components/shared";
import { Icon } from "@/components/icons";
const { useState: useStateR, useEffect: useEffectR, useRef: useRefR } = React;

// ============================================================
// REVIEW FLOW — animated 10-step sequence
// ============================================================
// Step map:
// 0 idle | 1 app blank | 2 typing name | 3 typing phone
// 4 send | 5 sms arrives | 6 customer opens link | 7 taps stars
// 8 redirect to google compose | 9 review submitted | 10 done → loop
const STEP_LABELS = [
  "Ready",
  "Owner opens app",
  "Types customer name",
  "Types customer phone",
  "Sends review request",
  "SMS lands on customer's phone",
  "Customer taps the link",
  "Customer rates the job",
  "Routed to Google",
  "Review submitted",
];
const STEP_DURATIONS = [400, 900, 1500, 1500, 1100, 1300, 1100, 1800, 1300, 1500];
const NAME_FULL = "Maria Torres";
const PHONE_FULL = "(555) 218-4567";

function useTypingProgress(target, step, activeStep, durationMs) {
  // Returns the typed-out portion of `target` based on time elapsed in this step.
  const [shown, setShown] = useStateR("");
  useEffectR(() => {
    if (step < activeStep) { setShown(""); return; }
    if (step > activeStep) { setShown(target); return; }
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / durationMs);
      const n = Math.floor(p * target.length);
      setShown(target.slice(0, n));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step, activeStep, target, durationMs]);
  return shown;
}

function ReviewFlowDemo() {
  const [step, setStep] = useStateR(0);
  const [playing, setPlaying] = useStateR(true);
  const [rating, setRating] = useStateR(0);
  const [hoverStar, setHoverStar] = useStateR(0);
  const timerRef = useRefR(null);

  useEffectR(() => {
    if (!playing) return;
    if (step >= STEP_LABELS.length) {
      // Loop after a beat
      timerRef.current = setTimeout(() => { setStep(0); setRating(0); }, 1500);
      return () => clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setStep((s) => s + 1);
      // rating reveal during step 7
      if (step === 6) {
        // stars fill in during step 7 via separate effect
      }
    }, STEP_DURATIONS[step] || 1200);
    return () => clearTimeout(timerRef.current);
  }, [step, playing]);

  // Animate the 5 stars during step 7
  useEffectR(() => {
    if (step !== 7) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setRating(i);
      if (i >= 5) clearInterval(id);
    }, 280);
    return () => clearInterval(id);
  }, [step]);

  // Reset rating when looping back
  useEffectR(() => { if (step <= 6) setRating(0); }, [step]);

  const nameTyped = useTypingProgress(NAME_FULL, step, 2, STEP_DURATIONS[2]);
  const phoneTyped = useTypingProgress(PHONE_FULL, step, 3, STEP_DURATIONS[3]);

  const onJump = (s) => { setPlaying(false); setStep(s); setRating(s >= 8 ? 5 : 0); };

  return (
    <section className="cc-section cc-section--card">
      <div className="cc-container">
        <div style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 24,
          overflow: "hidden",
        }}>
          {/* Header bar */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 16,
            justifyContent: "space-between", alignItems: "center",
            padding: "20px 32px",
            borderBottom: "1px solid hsl(var(--border))",
            background: "hsl(var(--page))",
          }}>
            <div className="cc-eyebrow">
              <span className="cc-live-dot" />
              LIVE SEQUENCE
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
                STEP {String(Math.min(step, STEP_LABELS.length - 1)).padStart(2, "0")} · {STEP_LABELS[Math.min(step, STEP_LABELS.length - 1)]}
              </span>
              <button className="cc-btn cc-btn--ghost cc-btn--sm" onClick={() => setPlaying(!playing)}>
                {playing ? <>⏸ Pause</> : <><Icon.play size={11} /> Play</>}
              </button>
              <button className="cc-btn cc-btn--ghost cc-btn--sm" onClick={() => { setStep(0); setRating(0); setPlaying(true); }}>
                <Icon.refresh size={13} /> Restart
              </button>
            </div>
          </div>

          {/* Stage */}
          <div style={{ position: "relative", padding: 32, background: "hsl(var(--page))", minHeight: 600 }}>
            <div className="cc-grid-bg" style={{ opacity: 0.5 }} />
            <div style={{
              display: "grid",
              gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1fr",
              gap: 32, position: "relative",
              alignItems: "center",
              maxWidth: 900, margin: "0 auto",
            }}>
              {/* LEFT: Owner phone (steps 1-4) — shows Pierson CRM app */}
              <div style={{ position: "relative" }}>
                <ColumnLabel n="01" title="Your phone" sub="Pierson CRM app · post-job" />
                <PhoneShell brand="Pierson CRM · Job complete">
                  {step <= 4 && (
                    <OwnerAppView
                      name={nameTyped}
                      phone={phoneTyped}
                      sending={step === 4}
                      step={step}
                    />
                  )}
                  {step > 4 && (
                    <OwnerSentView />
                  )}
                </PhoneShell>
              </div>

              {/* Connecting arrow */}
              {window.innerWidth >= 900 && (
                <FlightPath active={step === 4} />
              )}

              {/* RIGHT: Customer phone (steps 5-9) */}
              <div style={{ position: "relative" }}>
                <ColumnLabel n="02" title="Customer's phone" sub={step >= 7 ? "reviews.oakridge.co/r/k4" : "incoming sms"} />
                <PhoneShell brand={step >= 6 ? "Oakridge Co. · Review" : "Messages"}>
                  {step < 5 && <CustomerIdleView />}
                  {step === 5 && <CustomerSmsView arrived="just now" />}
                  {step === 6 && <CustomerSmsView arrived="just now" highlighted />}
                  {(step === 7) && <ReviewLandingView rating={rating} setRating={setRating} hover={hoverStar} setHover={setHoverStar} />}
                  {step === 8 && <GoogleHandoffView rating={5} />}
                  {step === 9 && <ReviewSubmittedView />}
                </PhoneShell>
              </div>
            </div>
          </div>

          {/* Footer step bar */}
          <div style={{ borderTop: "1px solid hsl(var(--border))", padding: "16px 32px", display: "flex", gap: 6, overflowX: "auto" }}>
            {STEP_LABELS.map((l, i) => (
              <button key={i} onClick={() => onJump(i)} style={{
                padding: "6px 10px",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.04em",
                background: step === i ? "hsl(var(--foreground))" : "transparent",
                color: step === i ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                border: "1px solid",
                borderColor: step === i ? "hsl(var(--foreground))" : "hsl(var(--border))",
                borderRadius: 999,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}>
                {String(i).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PHONE PRIMITIVES & SUB-VIEWS
// ============================================================

function ColumnLabel({ n, title, sub }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
      <span style={{
        width: 28, height: 28, borderRadius: "50%",
        border: "1px solid hsl(var(--border-strong))",
        display: "grid", placeItems: "center",
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "hsl(var(--muted-foreground))",
      }}>{n}</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.01em" }}>{title}</div>
        <div style={{ fontSize: 11, color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{sub}</div>
      </div>
    </div>
  );
}

function PhoneShell({ brand, children }) {
  return (
    <div className="cc-phone" style={{ maxWidth: 320, margin: "0 auto" }}>
      <div className="cc-phone__screen">
        <div className="cc-phone__notch" />
        <div className="cc-phone__statusbar">
          <span>9:41</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "hsl(var(--muted-foreground))" }}>{brand}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function FlightPath({ active }) {
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 5 }}>
      <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
        <path d="M5 30 C 40 10, 80 50, 115 30" stroke="hsl(var(--border-strong))" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <circle r="6" fill="hsl(var(--accent))" style={{
          opacity: active ? 1 : 0,
          transition: "opacity 0.3s",
        }}>
          <animateMotion dur="0.9s" begin={active ? "0s" : "indefinite"} fill="freeze">
            <mpath href="#path-shape" />
          </animateMotion>
        </circle>
        <path id="path-shape" d="M5 30 C 40 10, 80 50, 115 30" fill="none" stroke="none" />
        <path d="M5 30 C 40 10, 80 50, 115 30" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" style={{
          strokeDasharray: 200,
          strokeDashoffset: active ? 0 : 200,
          transition: "stroke-dashoffset 0.9s var(--ease-default)",
        }} />
      </svg>
    </div>
  );
}

// ===== Owner phone screens =====
function OwnerAppView({ name, phone, sending, step }) {
  return (
    <div style={{ flex: 1, padding: "16px 16px 20px", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
      {/* Just-completed job banner */}
      <div style={{
        background: "hsl(142 71% 96%)",
        border: "1px solid hsl(142 50% 80%)",
        color: "hsl(142 60% 22%)",
        borderRadius: 10,
        padding: "10px 12px",
        fontSize: 12,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Icon.check size={13} stroke={2.4} />
        <span><strong>Job complete</strong> · Order #1042 · 2:14pm</span>
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 4 }}>Ask for a review</div>
      <div style={{ fontSize: 11.5, color: "hsl(var(--muted-foreground))", marginTop: -8 }}>Type their name + number, we'll text them.</div>

      <Field label="Customer name" value={name} caret={step === 2} />
      <Field label="Mobile number" value={phone} caret={step === 3} mono />

      <button style={{
        marginTop: 4,
        padding: "11px 14px",
        background: sending ? "hsl(var(--accent))" : "hsl(var(--foreground))",
        color: "hsl(var(--background))",
        borderRadius: 999,
        fontSize: 12.5, fontWeight: 600,
        border: "none",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transition: "background 0.3s",
        boxShadow: sending ? "0 0 0 8px hsla(var(--accent), 0.18)" : "none",
      }}>
        {sending ? <><Icon.bolt size={12} stroke={2.4} /> Sending…</> : <>Send review request <Icon.arrowRight size={12} /></>}
      </button>

      <div style={{ marginTop: "auto", fontSize: 10, fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))", letterSpacing: "0.06em", textAlign: "center", paddingTop: 4 }}>
        We'll filter to Google or private feedback
      </div>
    </div>
  );
}

function Field({ label, value, caret, mono }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
      <div style={{
        padding: "9px 11px",
        background: caret ? "hsl(var(--card))" : "hsl(var(--page))",
        border: "1px solid",
        borderColor: caret ? "hsl(var(--foreground))" : "hsl(var(--border))",
        borderRadius: 8,
        fontSize: 13,
        fontFamily: mono ? "var(--font-mono)" : "inherit",
        minHeight: 18,
        display: "flex", alignItems: "center", gap: 2,
      }}>
        <span>{value}</span>
        {caret && <span style={{ width: 1.5, height: 13, background: "hsl(var(--foreground))", animation: "cc-caret 1s steps(2) infinite" }} />}
        {!value && !caret && <span style={{ color: "hsl(var(--muted-foreground))", fontWeight: 400 }}>{mono ? "(555) 000-0000" : "Customer name"}</span>}
      </div>
    </div>
  );
}

function OwnerSentView() {
  return (
    <div style={{ flex: 1, padding: "16px 16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 10,
        padding: 12,
        display: "flex", alignItems: "center", gap: 10,
      }} className="cc-fade-up">
        <span style={{ width: 32, height: 32, borderRadius: "50%", background: "hsl(var(--accent-soft))", color: "hsl(var(--accent))", display: "grid", placeItems: "center" }}>
          <Icon.check size={15} stroke={2.4} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>Request sent</div>
          <div style={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}>to Maria Torres · (555) 218-4567</div>
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: "hsl(var(--muted-foreground))", lineHeight: 1.55, padding: "0 4px" }}>
        We'll text Maria the link now. You'll see her response come back here within minutes.
      </div>
      <div style={{ marginTop: "auto", padding: "10px 12px", background: "hsl(var(--page))", borderRadius: 10, fontSize: 11, fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))", letterSpacing: "0.04em" }}>
        QUEUE · 12 sent today · 9 replied · 8 ★★★★★
      </div>
    </div>
  );
}

// ===== Customer phone screens =====
function CustomerIdleView() {
  return (
    <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
      <div>
        <div style={{ width: 56, height: 56, margin: "0 auto 14px", borderRadius: "50%", background: "hsl(var(--muted))", display: "grid", placeItems: "center", color: "hsl(var(--muted-foreground))" }}>
          <Icon.message size={22} stroke={1.6} />
        </div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>No messages yet</div>
        <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))", marginTop: 4 }}>Waiting for owner to send…</div>
      </div>
    </div>
  );
}

function CustomerSmsView({ arrived, highlighted }) {
  return (
    <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{
        background: "hsl(var(--card))",
        border: "1px solid",
        borderColor: highlighted ? "hsl(var(--accent))" : "hsl(var(--border))",
        borderRadius: 14,
        padding: "12px 14px",
        boxShadow: highlighted ? "0 0 0 4px hsla(var(--accent), 0.15)" : "var(--shadow-sm)",
        transition: "all 0.25s",
      }} className="cc-fade-up">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontWeight: 600, fontSize: 12.5 }}>Oakridge Co.</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "hsl(var(--muted-foreground))", letterSpacing: "0.04em" }}>{arrived}</div>
        </div>
        <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "hsl(var(--subtle-foreground))" }}>
          Hey Maria! Tony at Oakridge Co. — thanks for choosing us today. Mind sharing how we did?{" "}
          <span style={{ color: "hsl(var(--accent))", fontWeight: 500 }}>reviews.oakridge.co/r/k4</span>
        </div>
      </div>
      <div style={{ marginTop: "auto", padding: "8px 12px", background: "hsl(var(--page))", borderRadius: 10, fontSize: 10.5, fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))", letterSpacing: "0.04em", textAlign: "center" }}>
        {highlighted ? "TAPPING LINK…" : "DELIVERED · OPEN TO RATE"}
      </div>
    </div>
  );
}

function ReviewLandingView({ rating, setRating, hover, setHover }) {
  const display = hover || rating;
  return (
    <div style={{ flex: 1, padding: "20px 18px", display: "flex", flexDirection: "column", gap: 14, textAlign: "center" }} className="cc-fade-up">
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: "hsl(var(--foreground))",
        color: "hsl(var(--background))",
        display: "grid", placeItems: "center",
        margin: "8px auto 0",
        fontWeight: 700, letterSpacing: "-0.02em",
      }}>OC</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14.5, letterSpacing: "-0.01em" }}>How was your service?</div>
        <div style={{ fontSize: 11.5, color: "hsl(var(--muted-foreground))", marginTop: 4 }}>Oakridge Co. · Maria</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "8px 0" }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(s)}
            style={{
              padding: 0,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: s <= display ? "#f59e0b" : "hsl(var(--border-strong))",
              transition: "transform 0.15s, color 0.15s",
              transform: s <= rating ? "scale(1.05)" : "scale(1)",
            }}>
            <Icon.star size={28} stroke={0} style={{ fill: "currentColor" }} />
          </button>
        ))}
      </div>
      {rating === 0 && (
        <div style={{ fontSize: 11, color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
          TAP TO RATE
        </div>
      )}
      {rating > 0 && rating < 4 && (
        <div className="cc-fade-up" style={{
          padding: "10px 12px",
          background: "hsl(var(--muted))",
          borderRadius: 10,
          fontSize: 11.5,
          color: "hsl(var(--subtle-foreground))",
          lineHeight: 1.5,
        }}>
          Sorry to hear that — tell us what went wrong so we can fix it.
        </div>
      )}
      {rating >= 4 && (
        <div className="cc-fade-up" style={{
          padding: "10px 12px",
          background: "hsl(142 71% 96%)",
          color: "hsl(142 60% 22%)",
          borderRadius: 10,
          fontSize: 11.5,
          fontWeight: 500,
          lineHeight: 1.5,
          border: "1px solid hsl(142 50% 80%)",
        }}>
          Thanks! Routing you to Google so it helps others find us…
        </div>
      )}
    </div>
  );
}

function GoogleHandoffView({ rating }) {
  return (
    <div style={{ flex: 1, padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }} className="cc-fade-up">
      {/* Fake browser chrome to suggest we left the app */}
      <div style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 10,
        padding: "8px 10px",
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 10, fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))",
      }}>
        <Icon.shield size={11} />
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>google.com/maps/oakridge-co/review</span>
      </div>
      <div style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 12,
        padding: 14,
        flex: 1,
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Rate &amp; review</div>
        <div style={{ fontSize: 11, color: "hsl(var(--muted-foreground))", marginTop: -6 }}>Oakridge Co. · Austin, TX</div>
        <div style={{ display: "flex", gap: 4, padding: "4px 0" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon.star key={i} size={20} stroke={0} style={{ fill: i < rating ? "#f59e0b" : "hsl(var(--border-strong))" }} />
          ))}
        </div>
        <div style={{
          padding: 10,
          background: "hsl(var(--page))",
          borderRadius: 8,
          border: "1px solid hsl(var(--border))",
          fontSize: 11.5, color: "hsl(var(--subtle-foreground))", lineHeight: 1.5,
          minHeight: 60,
        }}>
          Share details of your experience…
          <span style={{ display: "inline-block", width: 1.5, height: 11, background: "hsl(var(--foreground))", marginLeft: 2, verticalAlign: "middle", animation: "cc-caret 1s steps(2) infinite" }} />
        </div>
        <button style={{
          padding: "10px 12px",
          background: "hsl(var(--foreground))",
          color: "hsl(var(--background))",
          border: "none",
          borderRadius: 8,
          fontSize: 12, fontWeight: 600,
        }}>Post review</button>
      </div>
    </div>
  );
}

function ReviewSubmittedView() {
  return (
    <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 24, textAlign: "center" }} className="cc-fade-up">
      <div>
        <div style={{
          width: 72, height: 72, margin: "0 auto 18px", borderRadius: "50%",
          background: "hsl(142 71% 96%)",
          color: "hsl(142 71% 30%)",
          display: "grid", placeItems: "center",
          border: "1px solid hsl(142 50% 80%)",
        }}>
          <Icon.check size={32} stroke={2.4} />
        </div>
        <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em" }}>Posted to Google ★★★★★</div>
        <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))", marginTop: 6, lineHeight: 1.5, padding: "0 12px" }}>
          412 reviews · 4.9 avg<br />
          Your business just moved up the local map pack.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BRANCH EXPLANATION — happy / unhappy paths
// ============================================================
function SentimentBranches() {
  return (
    <section className="cc-section cc-section--card" id="branches">
      <div className="cc-container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 12 }}>HOW THE FILTER WORKS</div>
          <h2 className="cc-h2">Happy customers go public. Unhappy ones come to you.</h2>
          <p className="cc-lede" style={{ margin: "16px auto 0" }}>
            One tap rates the job. Four or five stars routes them to Google. Three or below routes to a private form — you fix the issue before it becomes a 1-star review.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1fr", gap: 20 }}>
          <BranchCard
            kind="happy"
            stars={5}
            label="HAPPY PATH · 4–5 ★"
            title="Routed to Google."
            body="Their rating is pre-baked, the destination is your Google Business Profile, and the prompt is ready to write. Most customers just hit post."
            rate="Most replies"
          />
          <BranchCard
            kind="unhappy"
            stars={2}
            label="PRIVATE PATH · 1–3 ★"
            title="Routed to your inbox."
            body="They land on a private feedback form. You see it within minutes, you reach out, you fix it. Whatever happens next, it doesn't go on Google."
            rate="The rest"
          />
        </div>
      </div>
    </section>
  );
}

function BranchCard({ kind, stars, label, title, body, rate }) {
  const isHappy = kind === "happy";
  return (
    <div style={{
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      borderRadius: 20,
      overflow: "hidden",
    }}>
      <div style={{
        padding: 24,
        background: isHappy ? "hsl(142 71% 96%)" : "hsl(45 100% 96%)",
        borderBottom: "1px solid hsl(var(--border))",
        position: "relative",
        height: 220,
        overflow: "hidden",
      }}>
        <div className="cc-eyebrow" style={{ color: isHappy ? "hsl(142 71% 30%)" : "hsl(35 90% 38%)" }}>{label}</div>
        {/* Mocked phone snippet */}
        <div style={{
          position: "absolute", bottom: 20, left: 24, right: 24,
          padding: 16,
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          boxShadow: "var(--shadow-card)",
        }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 8 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon.star key={i} size={16} stroke={0} style={{ fill: i < stars ? "#f59e0b" : "hsl(var(--border-strong))" }} />
            ))}
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 500, lineHeight: 1.4 }}>
            {isHappy ? "Routing you to Google →" : "Tell us what we can do better →"}
          </div>
        </div>
      </div>
      <div style={{ padding: 28 }}>
        <h3 style={{ fontSize: 20, letterSpacing: "-0.01em", fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
        <p style={{ fontSize: 14.5, color: "hsl(var(--muted-foreground))", margin: "0 0 14px", lineHeight: 1.55 }}>{body}</p>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.06em", color: "hsl(var(--muted-foreground))", textTransform: "uppercase" }}>
          {rate}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// WEBSITE INTEGRATION — same link lives on the site
// ============================================================
function WebsiteIntegration() {
  const [hovered, setHovered] = useStateR(false);
  return (
    <section className="cc-section cc-section--card">
      <div className="cc-container">
        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1.2fr", gap: 56, alignItems: "center" }}>
          <div className="cc-stack-md">
            <div className="cc-eyebrow">SAME LINK · TWO PLACES</div>
            <h2 className="cc-h2">It's on your website, too.</h2>
            <p className="cc-lede">
              The same review landing page is embedded on your Pierson Digital-built website — every page, in the footer, and as a dedicated "Leave a review" button. Past customers can drop a review months later without you having to ask twice.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Site-wide footer link to your review page",
                "Dedicated review button on every service page",
                "QR codes for invoices, business cards, receipts",
                "All routes through the same sentiment filter",
              ].map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 12, fontSize: 14.5 }}>
                  <span style={{ color: "hsl(var(--accent))", marginTop: 3 }}><Icon.check size={14} stroke={2.4} /></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Browser mock with review button */}
          <div style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 16,
            boxShadow: "var(--shadow-lift)",
            overflow: "hidden",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--muted))" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e5e7eb" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e5e7eb" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e5e7eb" }} />
              <span style={{
                marginLeft: 12, flex: 1, padding: "5px 12px",
                background: "hsl(var(--card))", borderRadius: 999,
                fontSize: 11.5, color: "hsl(var(--muted-foreground))",
                fontFamily: "var(--font-mono)",
              }}>oakridge.co/contact</span>
            </div>
            <div style={{ padding: 32, minHeight: 320, position: "relative" }}>
              <div style={{ fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", marginBottom: 8 }}>Contact Oakridge Co.</div>
              <div style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", marginBottom: 28, maxWidth: 360 }}>
                Serving Austin &amp; Travis County. Call, text, or drop us a line.
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                <span className="cc-btn cc-btn--ghost" style={{ pointerEvents: "none" }}>(512) 555-2218</span>
                <span className="cc-btn cc-btn--ghost" style={{ pointerEvents: "none" }}>Get a quote</span>
              </div>

              {/* The review button */}
              <div style={{ padding: "20px 0", borderTop: "1px solid hsl(var(--border))", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                    Already a customer?
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Tell us how we did →</div>
                </div>
                <button
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="cc-btn"
                  style={{
                    background: hovered ? "hsl(var(--accent))" : "hsl(var(--foreground))",
                    borderColor: hovered ? "hsl(var(--accent))" : "hsl(var(--foreground))",
                    transition: "all 0.2s",
                  }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon.star key={i} size={11} stroke={0} style={{ fill: "currentColor" }} />
                    ))}
                  </div>
                  Leave a review
                </button>
              </div>

              {hovered && (
                <div className="cc-fade-up" style={{
                  position: "absolute",
                  right: 32, bottom: 76,
                  padding: "8px 12px",
                  background: "hsl(var(--foreground))",
                  color: "hsl(var(--background))",
                  borderRadius: 8,
                  fontSize: 11.5,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}>
                  → reviews.oakridge.co/r/k4
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STATS
// ============================================================
function ReviewStats() {
  return (
    <section className="cc-section cc-section--dark">
      <div className="cc-container">
        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 700 ? "1fr 1fr" : "repeat(4, 1fr)", gap: 24 }}>
          {[
            { n: "10,000+", l: "companies trust our CRM" },
            { n: "50", l: "states served nationwide" },
            { n: "24/7", l: "AI chat + follow-up" },
            { n: "$297", l: "/mo · CRM & automation" },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: window.innerWidth < 700 ? "left" : "center", padding: "20px 8px" }}>
              <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 8, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PAGE
// ============================================================
function ReviewEnginePage() {
  return (
    <Layout active="how-it-works">
      <PageHero
        eyebrow="REVIEW ENGINE · STEP-BY-STEP"
        title={<>Job done → <br /><span style={{ color: "hsl(var(--muted-foreground))" }}>5-star Google review.</span></>}
        sub="The whole sequence runs from your phone in under a minute. Type the customer's name, hit send — the system handles the rest, including filtering unhappy customers away from Google."
        cta="Watch the demo below"
        ctaHref="#stage"
      />

      <div id="stage" />
      <ReviewFlowDemo />
      <SentimentBranches />
      <WebsiteIntegration />
      <ReviewStats />

      <CTABlock
        title="Want every job to end in a 5-star review?"
        sub="The review engine is one part of Pierson Digital's CRM & Automation system. It also includes missed-call text-back, a 24/7 AI chat widget, and a full CRM on your phone — all working the same way: automated, on-brand, in your voice."
        cta="Book a free strategy call"
      />
    </Layout>
  );
}

export default ReviewEnginePage;
