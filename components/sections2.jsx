"use client";
import React from "react";
import { Icon } from "@/components/icons";
import { Mock } from "@/components/mocks";
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

// ===== Features =====
function Features() {
  const features = [
    {
      eyebrow: "MISSED-CALL TEXT-BACK",
      title: "Never miss a lead. Ever.",
      desc: "When a call hits voicemail, our CRM fires a personalized text within seconds — keeping the conversation warm while you get back to work.",
      mock: <Mock.MissedCall />,
      large: false,
    },
    {
      eyebrow: "1-YEAR FOLLOW-UP",
      title: "Follow up for a full year, automatically.",
      desc: "52 touchpoints across SMS, email, and ringless voicemail. Pauses the moment a lead replies. Re-engages months later when they're finally ready.",
      mock: <Mock.FollowUp />,
      large: true,
    },
    {
      eyebrow: "CUSTOM WEBSITES",
      title: "A site built to generate leads.",
      desc: "Conversion-tuned pages, SEO-optimized structure, fast Core Web Vitals, and lead forms that route straight to your phone — live in 5–7 days.",
      mock: <Mock.Website />,
      large: true,
    },
    {
      eyebrow: "GOOGLE REVIEW AUTOMATION",
      title: "Reviews on autopilot.",
      desc: "Right after the work is done, the customer gets a one-tap link to drop a Google review. We route the unhappy ones to a private form so you can fix things fast.",
      mock: <Mock.Reviews />,
      large: false,
    },
  ];

  return (
    <section className="cc-section cc-section--card" id="features">
      <div className="cc-container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>INSIDE THE GROWTH SYSTEM</div>
          <h2 className="cc-h2" style={{ maxWidth: 720, margin: "0 auto" }}>
            Everything your "marketing guy" <em style={{ fontStyle: "normal", color: "hsl(var(--muted-foreground))" }}>should've</em> been doing
          </h2>
          <p className="cc-lede" style={{ margin: "16px auto 0" }}>
            Four systems that work together. Plug them in once. They run every hour you don't.
          </p>
        </div>

        <div className="cc-stack-md">
          <div className="cc-feature-grid">
            <FeatureCard {...features[0]} />
            <FeatureCard {...features[1]} />
          </div>
          <div className="cc-feature-grid cc-feature-grid--row2">
            <FeatureCard {...features[2]} />
            <FeatureCard {...features[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ eyebrow, title, desc, mock }) {
  return (
    <div className="cc-feature-card">
      <div className="cc-feature-card__visual">
        {mock}
      </div>
      <div className="cc-feature-card__body">
        <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 12, fontSize: 11 }}>{eyebrow}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <a href="/how-it-works" className="cc-link">Learn more <Icon.arrowRight size={14} /></a>
      </div>
    </div>
  );
}

// ===== Big numbered section (inspired by reference) =====
function WorkforceSection() {
  return (
    <section className="cc-section cc-section--card" id="proof">
      <div className="cc-container">
        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div className="cc-stack-lg">
            <div className="cc-eyebrow">YOUR MARKETING TEAM</div>
            <h2 className="cc-h2">A full digital marketing team, working for you.</h2>
            <p className="cc-lede">
              While you run your business, Pierson Digital is driving your SEO, running your Facebook & Instagram ads, building your site, and automating follow-up — SEO, paid ads, web design, and automation specialists, all under one roof.
            </p>
            <div className="cc-stack-md" style={{ marginTop: 8 }}>
              <NumberedItem n="1" title="One team, every channel" body="SEO, Meta Ads, custom web design, and CRM automation — specialists in each, coordinated as one." />
              <NumberedItem n="2" title="Real results, tracked" body="Monthly rankings reports, weekly ad performance, and live lead tracking. You always see exactly what's working." />
              <NumberedItem n="3" title="No contracts, ever" body="Month-to-month with a dedicated account manager. Cancel anytime — we earn your business every single month." />
            </div>
            <div style={{ marginTop: 8 }}>
              <a href="/review-engine" className="cc-btn cc-btn--ghost">Watch the review flow <Icon.arrowRight size={14} /></a>
            </div>
          </div>

          <ToolGrid />
        </div>
      </div>
    </section>
  );
}

function NumberedItem({ n, title, body }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <span style={{
        width: 28, height: 28, borderRadius: "50%",
        border: "1px solid hsl(var(--border-strong))",
        display: "grid", placeItems: "center",
        fontFamily: "var(--font-mono)", fontSize: 12,
        color: "hsl(var(--muted-foreground))",
        flexShrink: 0,
      }}>{n}</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: 16.5, letterSpacing: "-0.01em", marginBottom: 4 }}>{title}</div>
        <div style={{ color: "hsl(var(--muted-foreground))", fontSize: 14.5, lineHeight: 1.55 }}>{body}</div>
      </div>
    </div>
  );
}

function ToolGrid() {
  const tools = [
    { label: "Calls", icon: <Icon.phone size={20} />, active: true },
    { label: "Texts", icon: <Icon.message size={20} />, active: true },
    { label: "Email", icon: <Icon.mail size={20} />, active: true },
    { label: "Forms", icon: <Icon.form size={20} />, active: true },
    { label: "Reviews", icon: <Icon.star size={20} />, active: true },
    { label: "Calendar", icon: <Icon.calendar size={20} />, active: true },
    { label: "Analytics", icon: <Icon.trending size={20} />, active: false },
    { label: "Security", icon: <Icon.shield size={20} />, active: false },
    { label: "Search", icon: <Icon.search size={20} />, active: false },
  ];
  return (
    <div style={{
      position: "relative",
      borderRadius: 20,
      border: "1px solid hsl(var(--border))",
      background: "hsl(var(--card))",
      padding: 28,
      overflow: "hidden",
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 30% 30%, hsl(var(--accent-soft)) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
        position: "relative",
      }}>
        {tools.map((t, i) => (
          <div
            key={t.label}
            className={`cc-tool-tile${t.active ? " cc-tool-tile--active" : ""}`}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {t.icon}
            <span>{t.label}</span>
          </div>
        ))}
      </div>
      <div style={{
        position: "absolute", top: 16, right: 16,
        padding: "5px 10px",
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 999,
        fontFamily: "var(--font-mono)", fontSize: 10.5,
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: "hsl(var(--muted-foreground))",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span className="cc-live-dot" /> Live · 6 integrations
      </div>
    </div>
  );
}

// ===== How it works (interactive tabs) =====
function HowItWorks() {
  const [active, setActive] = useState2(0);

  useEffect2(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % 4);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const steps = [
    {
      num: "01",
      title: "Customer makes contact",
      body: "Call, form, or text — every channel funnels into one inbox.",
      mock: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { icon: <Icon.phone size={18} />, label: "Call", val: "(555) 218-4567" },
            { icon: <Icon.form size={18} />, label: "Form", val: "Quote request" },
            { icon: <Icon.message size={18} />, label: "Text", val: "Need help today" },
          ].map((s) => (
            <div key={s.label} style={{
              padding: 14, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
              borderRadius: 12,
            }}>
              <div style={{ color: "hsl(var(--accent))", marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{s.label}</div>
              <div style={{ fontSize: 11.5, color: "hsl(var(--muted-foreground))", marginTop: 2 }}>{s.val}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: "02",
      title: "Instant text response",
      body: "Within 60 seconds, they get a real, personal-sounding reply.",
      mock: (
        <div className="cc-sms" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, padding: 14 }}>
          <div className="cc-sms__bubble cc-sms__bubble--out">
            Hey — thanks for reaching out! We've got availability this week if you're still looking. What works best for you?
          </div>
          <div style={{ fontSize: 10.5, color: "hsl(var(--muted-foreground))", fontFamily: "var(--font-mono)", textAlign: "right" }}>
            sent · 00:47 after call
          </div>
        </div>
      ),
    },
    {
      num: "03",
      title: "Long-tail nurture",
      body: "If they don't book, the system follows up for a year — politely.",
      mock: (
        <div style={{ position: "relative", height: 140 }}>
          {[
            { d: "Day 1", t: "Hey, still need that quote?" },
            { d: "Day 7", t: "Just opened a new slot." },
            { d: "Day 30", t: "Checking in — still interested?" },
            { d: "Day 90", t: "New offer this month for you." },
          ].map((it, i) => (
            <div key={i} style={{
              position: "absolute",
              top: i * 28, left: i * 14, right: i * 14,
              padding: "8px 12px",
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 10,
              fontSize: 12,
              display: "flex", justifyContent: "space-between",
              boxShadow: "var(--shadow-sm)",
              opacity: 1 - i * 0.15,
            }}>
              <span style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))", fontSize: 11 }}>{it.d}</span>
              <span style={{ color: "hsl(var(--subtle-foreground))" }}>{it.t}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      num: "04",
      title: "Work done → 5-star review",
      body: "Project completion fires the review request. Happy customers go straight to Google.",
      mock: (
        <div style={{ padding: 14, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "hsl(var(--muted))", display: "grid", placeItems: "center", fontWeight: 600, fontSize: 13, color: "hsl(var(--subtle-foreground))" }}>M</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Maria T.</div>
              <div style={{ display: "flex", gap: 2, color: "#f59e0b" }}>
                {Array.from({ length: 5 }).map((_, i) => <Icon.star key={i} size={12} stroke={0} style={{ fill: "currentColor" }} />)}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "hsl(var(--subtle-foreground))", lineHeight: 1.5 }}>
            "Showed up exactly when they said. Walked me through the whole thing. Best experience I've had with a company like this."
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="cc-section cc-section--card" id="how">
      <div className="cc-container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>HOW IT WORKS</div>
          <h2 className="cc-h2">Four steps from first contact to five-star review.</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1.2fr",
          gap: 48,
          alignItems: "start",
        }}>
          {/* Step list */}
          <div className="cc-stack-sm">
            {steps.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                display: "flex", gap: 20, padding: 20,
                background: active === i ? "hsl(var(--card))" : "transparent",
                border: "1px solid",
                borderColor: active === i ? "hsl(var(--border))" : "transparent",
                borderRadius: 14,
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.2s var(--ease-default)",
                boxShadow: active === i ? "var(--shadow-card)" : "none",
                color: "hsl(var(--foreground))",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: active === i ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))",
                  fontWeight: 500,
                  flexShrink: 0,
                  paddingTop: 2,
                }}>{s.num}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16.5, letterSpacing: "-0.01em", marginBottom: 4 }}>{s.title}</div>
                  <div style={{
                    fontSize: 14.5, color: "hsl(var(--muted-foreground))", lineHeight: 1.5,
                    maxHeight: active === i ? 60 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s var(--ease-default), margin 0.3s var(--ease-default)",
                  }}>{s.body}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Step visual */}
          <div style={{
            background: "hsl(var(--page))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 20,
            padding: 32,
            minHeight: 380,
            position: "relative",
          }}>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 24 }}>
              STEP {steps[active].num} · LIVE
            </div>
            <div key={active} className="cc-fade-up">
              {steps[active].mock}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Sections2 = { Features, WorkforceSection, HowItWorks };
