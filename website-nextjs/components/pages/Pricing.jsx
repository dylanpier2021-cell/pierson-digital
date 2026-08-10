"use client";
import { Icon } from "@/components/icons";
import { Layout, PageHero, CTABlock } from "@/components/shared";
import React from "react";

// ── Real packages from Pierson Digital's rate card ────────────────────────────
const BUNDLE_FEATURES = [
  "Custom SEO-optimized website (FREE)",
  "On-page, technical & local SEO",
  "Google Business Profile optimization",
  "Monthly content strategy & backlinks",
  "Facebook & Instagram ad campaigns",
  "Audience research & ad creative",
  "A/B testing & weekly ad reports",
  "Missed-call text-back automation",
  "AI chat widget, 24/7",
  "Google review automation",
  "Full CRM on your phone",
  "Dedicated account manager",
  "No contract — cancel anytime",
];

const SERVICES = [
  {
    name: "SEO",
    price: "$997",
    period: "/mo",
    strike: "Regularly $1,497/mo",
    note: "Free website included",
    href: "/services#seo",
    cta: "Get started with SEO",
    features: [
      "Custom SEO-optimized website (FREE)",
      "On-page & technical SEO",
      "Local SEO & Google Business Profile",
      "Monthly content strategy",
      "Backlink building",
      "Monthly rankings report",
      "No contract",
    ],
  },
  {
    name: "Meta Ads",
    price: "$997",
    period: "/mo",
    strike: "Regularly $1,497/mo",
    href: "/services#meta-ads",
    cta: "Get started with Meta Ads",
    features: [
      "Facebook & Instagram campaigns",
      "Audience research & targeting",
      "Ad creative & copywriting",
      "A/B testing",
      "Weekly performance reports",
      "No contract",
    ],
  },
  {
    name: "Custom Websites",
    price: "$97",
    period: "/mo",
    note: "Or buy outright for $1,000",
    href: "/services#websites",
    cta: "Get a website",
    features: [
      "Custom design & development",
      "SEO-optimized structure",
      "Mobile-first & fast",
      "Hosting & maintenance",
      "Ongoing updates",
      "Buy out anytime for $1,000",
    ],
  },
  {
    name: "CRM & Automation",
    price: "$297",
    period: "/mo",
    note: "+ one-time $750 startup fee",
    href: "/services#crm",
    cta: "Start with CRM",
    features: [
      "Missed-call text-back",
      "AI chat widget, 24/7",
      "Google review automation",
      "Full CRM on your phone",
      "Pipeline management",
      "10,000+ companies trust us",
    ],
  },
];

// The featured all-in-one bundle.
function BundleCard() {
  return (
    <div style={{
      position: "relative",
      background: "hsl(var(--foreground))",
      color: "hsl(var(--background))",
      border: "1px solid hsl(var(--foreground))",
      borderRadius: 28,
      padding: "clamp(28px, 4vw, 44px)",
      boxShadow: "var(--shadow-float)",
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "0.9fr 1.1fr",
      gap: window.innerWidth < 900 ? 28 : 48,
      alignItems: "center",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 0% 0%, hsla(var(--accent), 0.22) 0%, transparent 55%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block",
          padding: "5px 12px",
          background: "hsl(var(--accent))",
          color: "white",
          borderRadius: 999,
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 500,
          marginBottom: 18,
        }}>Most Popular · Best Value</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 42px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 8px", lineHeight: 1.02 }}>
          The Full Growth System
        </h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 10 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 58, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>$2,000</span>
          <span style={{ fontSize: 16, color: "hsla(0,0%,100%,0.6)", fontWeight: 500 }}>/month</span>
        </div>
        <div style={{ fontSize: 13.5, color: "hsla(0,0%,100%,0.55)", marginTop: 8, textDecoration: "line-through" }}>
          Regularly $2,388/mo if purchased separately
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "hsl(var(--accent))", marginTop: 10, fontWeight: 600 }}>
          Save $388/mo · SEO + Meta Ads + Website + CRM
        </div>
        <a href="/book-a-call" className="cc-btn cc-btn--lg" style={{
          marginTop: 24,
          background: "hsl(var(--accent))",
          color: "white",
          borderColor: "hsl(var(--accent))",
          justifyContent: "center",
          width: "100%",
          maxWidth: 340,
        }}>Get the Full Growth System <Icon.arrowUpRight size={14} /></a>
      </div>
      <ul style={{
        position: "relative", zIndex: 1,
        listStyle: "none", padding: 0, margin: 0,
        display: "grid",
        gridTemplateColumns: window.innerWidth < 560 ? "1fr" : "1fr 1fr",
        gap: 12,
      }}>
        {BUNDLE_FEATURES.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, lineHeight: 1.45, color: "hsla(0,0%,100%,0.9)" }}>
            <span style={{ flexShrink: 0, marginTop: 1, color: "hsl(var(--accent))" }}><Icon.check size={14} stroke={2.6} /></span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServiceCard({ name, price, period, strike, note, features, cta, href }) {
  return (
    <div style={{
      position: "relative",
      background: "hsl(var(--card))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--border))",
      borderRadius: 22,
      padding: 30,
      display: "flex", flexDirection: "column", gap: 18,
      boxShadow: "var(--shadow-card)",
      transition: "all 0.2s var(--ease-default)",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lift)"; e.currentTarget.style.borderColor = "hsl(var(--accent) / 0.4)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.borderColor = "hsl(var(--border))"; }}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 10 }}>
          {name}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 46, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{price}</span>
          <span style={{ fontSize: 15, color: "hsl(var(--muted-foreground))", fontWeight: 500 }}>{period}</span>
        </div>
        {strike && (
          <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 6, textDecoration: "line-through" }}>{strike}</div>
        )}
        {note && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", color: "hsl(var(--accent))", marginTop: strike ? 4 : 8, fontWeight: 600 }}>{note}</div>
        )}
      </div>

      <a href="/book-a-call" className="cc-btn cc-btn--lg" style={{
        background: "hsl(var(--foreground))",
        color: "hsl(var(--background))",
        borderColor: "hsl(var(--foreground))",
        justifyContent: "center",
      }}>{cta} <Icon.arrowUpRight size={14} /></a>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: 12, fontSize: 14, lineHeight: 1.5 }}>
            <span style={{
              width: 18, height: 18, borderRadius: "50%",
              background: "hsl(var(--accent-soft))",
              color: "hsl(var(--accent))",
              display: "grid", placeItems: "center",
              flexShrink: 0, marginTop: 2,
            }}>
              <Icon.check size={10} stroke={2.8} />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PricingPage() {
  return (
    <Layout active="pricing">
      <PageHero
        eyebrow="PRICING"
        title={<>Transparent pricing. <br /><span style={{ color: "hsl(var(--muted-foreground))" }}>No surprises.</span></>}
        sub="Every plan is month-to-month with no long-term contracts. Pick one service or bundle them all — no setup fees unless noted."
      />

      {/* Featured bundle */}
      <section className="cc-section cc-section--card" style={{ paddingBottom: 40 }}>
        <div className="cc-container" style={{ maxWidth: 1160 }}>
          <BundleCard />
        </div>
      </section>

      {/* Individual services */}
      <section className="cc-section cc-section--card" style={{ paddingTop: 24 }}>
        <div className="cc-container" style={{ maxWidth: 1240 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 12 }}>OR PICK A SINGLE SERVICE</div>
            <h2 className="cc-h2" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>Mix and match what you need.</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth < 700 ? "1fr" : window.innerWidth < 1100 ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 20,
            alignItems: "stretch",
          }}>
            {SERVICES.map((s) => (
              <ServiceCard key={s.name} {...s} />
            ))}
          </div>

          <p style={{
            textAlign: "center",
            marginTop: 32,
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "hsl(var(--muted-foreground))",
          }}>
            Month-to-month · No long-term contracts · Cancel anytime
          </p>
        </div>
      </section>

      {/* Why work with us */}
      <section className="cc-section cc-section--dark" style={{ padding: "64px 0" }}>
        <div className="cc-container">
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 700 ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
            {[
              { i: <Icon.sparkles size={22} />, t: "One full-service team", b: "SEO, paid ads, web design, and automation specialists — all under one roof, one point of contact, one bill." },
              { i: <Icon.bolt size={22} />, t: "Live in days, not months", b: "Most clients are live within 5–7 business days. We move fast because every day offline is revenue lost." },
              { i: <Icon.refresh size={22} />, t: "No contracts. Ever.", b: "Every plan is month-to-month. We keep clients by producing results, not by locking them in." },
            ].map((g) => (
              <div key={g.t} style={{
                padding: 28,
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 16,
                transition: "all 0.2s var(--ease-default)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.borderColor = "hsl(var(--accent) / 0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "hsl(var(--border))"; }}>
                <div style={{ color: "hsl(var(--accent))", marginBottom: 14 }}>{g.i}</div>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, letterSpacing: "-0.01em" }}>{g.t}</div>
                <div style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", lineHeight: 1.55 }}>{g.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock title="Not sure which plan fits?" sub="Book a free 15-minute strategy call. We'll look at your business and tell you exactly what makes sense — even if it's just one service." cta="Book a free strategy call" />
    </Layout>
  );
}

export default PricingPage;
