"use client";
import React from "react";
import { Layout, CTABlock } from "@/components/shared";
import { Icon } from "@/components/icons";
import MetaPixelEvents from "@/components/MetaPixelEvents";
const { useEffect: useEffectB, useRef: useRefB } = React;

// Embeds the Pierson Digital (GoHighLevel) booking widget.
// Mount the iframe and inject the form_embed.js loader once. The loader
// listens for postMessage events from the booking widget and auto-resizes
// the iframe's height to match its content.
function GHLBookingEmbed() {
  const containerRef = useRefB(null);
  useEffectB(() => {
    // Inject the form_embed.js script once per page load
    const existing = document.querySelector('script[data-ghl-embed="true"]');
    if (existing) return;
    const s = document.createElement("script");
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.type = "text/javascript";
    s.async = true;
    s.dataset.ghlEmbed = "true";
    document.body.appendChild(s);
  }, []);

  return (
    <div ref={containerRef} style={{
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      borderRadius: 20,
      padding: 8,
      boxShadow: "var(--shadow-card)",
      overflow: "hidden",
      minHeight: 720,
    }}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/WD29jXNzNI40oG2KgKFG"
        style={{ width: "100%", border: "none", overflow: "hidden", display: "block", minHeight: 700, borderRadius: 12 }}
        scrolling="no"
        id="WD29jXNzNI40oG2KgKFG_1779227809855"
        title="Book a call with Pierson Digital"
      />
    </div>
  );
}

function BookACallPage() {
  return (
    <Layout active="book">
      <MetaPixelEvents />
      <section className="cc-section cc-section--card cc-section--hero">
        <div className="cc-container">
          <div style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1.2fr",
            gap: 56,
            alignItems: "start",
          }}>
            {/* Left — value props + agenda + social proof */}
            <div className="cc-stack-lg">
              <div className="cc-eyebrow">
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--accent))", marginRight: 8, verticalAlign: "middle" }} />
                BOOK A FREE 15-MIN STRATEGY CALL
              </div>
              <h1 className="cc-h1" style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>
                We'll show you what's <span style={{ color: "hsl(var(--muted-foreground))" }}>actually possible</span> for your business online.
              </h1>
              <p className="cc-lede">
                A free 15-minute strategy call, video. We look at your website, your search rankings, and your lead flow — then we tell you exactly what we'd fix and how we'd grow it. No pitch slides, no pressure. You walk away with a real plan.
              </p>

              <div
                style={{
                  padding: 24,
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 16,
                  marginTop: 8,
                  transition: "all 0.2s var(--ease-default)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.borderColor = "hsl(var(--accent) / 0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "hsl(var(--border))"; }}
              >
                <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>AGENDA</div>
                <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Look at your current site, SEO, and lead flow",
                    "Pinpoint where you're leaving leads on the table",
                    "Walk through a custom growth plan",
                    "Answer your questions (no pitch)",
                  ].map((t, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, fontSize: 14.5 }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: "50%",
                        border: "1px solid hsl(var(--border-strong))",
                        display: "grid", placeItems: "center",
                        fontFamily: "var(--font-mono)", fontSize: 11,
                        color: "hsl(var(--muted-foreground))",
                        flexShrink: 0,
                      }}>{i + 1}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Mini testimonial */}
              <div style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "20px 0",
                borderTop: "1px solid hsl(var(--border))",
                borderBottom: "1px solid hsl(var(--border))",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "hsl(var(--muted))",
                  display: "grid", placeItems: "center",
                  fontWeight: 600, fontSize: 14,
                  color: "hsl(var(--subtle-foreground))",
                  flexShrink: 0,
                }}>J</div>
                <div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.5, fontWeight: 500, letterSpacing: "-0.005em", marginBottom: 4 }}>
                    "The CRM and automation alone saved us 10 hours a week. Missed-call text-back recovered at least 5 jobs in the first month."
                  </div>
                  <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))" }}>
                    James T. · Landscaping, Dallas TX
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { n: "15 min", l: "free strategy call" },
                  { n: "10,000+", l: "companies on our CRM" },
                  { n: "50", l: "states served" },
                ].map((s) => (
                  <div key={s.l}>
                    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))", marginTop: 2, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — live GHL booking calendar */}
            <div>
              <GHLBookingEmbed />
              <div style={{
                marginTop: 12,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: "var(--font-mono)", fontSize: 11,
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: "hsl(var(--muted-foreground))",
              }}>
                <Icon.shield size={11} />
                Secured booking · powered by Pierson Digital
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default BookACallPage;
