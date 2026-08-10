"use client";
import React from "react";
import { Layout, PageHero, CTABlock } from "@/components/shared";
const { useState, useEffect, useRef } = React;

// ── Your client work. To add a site, drop an entry into this array. ───────────
// Each entry renders a live, self-scaling preview (a real thumbnail of the site).
// Keep `note` factual — what was actually built. Leave the array empty to show
// the "coming soon" placeholder below.
// Example entry:
//   { name: "Client Name", trade: "Industry", location: "City, ST",
//     url: "https://theirsite.com", note: "What we built for them." }
const CLIENTS = [];

// Live, self-scaling preview of a site. Renders the real page in an iframe sized
// to a desktop viewport, then scales it to fit the card. It's display-only —
// pointer events are disabled so it reads as a thumbnail, not a link.
function SitePreview({ url }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  const DESIGN_W = 1280;
  const DESIGN_H = 800;
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={boxRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        background: "hsl(var(--muted))",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      <iframe
        src={url}
        title={url}
        loading="lazy"
        tabIndex={-1}
        scrolling="no"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: DESIGN_W,
          height: DESIGN_H,
          border: 0,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function WorkCard({ name, trade, location, url, note }) {
  return (
    <div
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <SitePreview url={url} />
      <div style={{ padding: "20px 22px 22px" }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>{name}</div>
        <div style={{ fontSize: 12, color: "hsl(var(--muted-foreground))", marginTop: 3, fontFamily: "var(--font-mono)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
          {trade} · {location}
        </div>
        <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", lineHeight: 1.55, margin: "12px 0 0" }}>
          {note}
        </p>
      </div>
    </div>
  );
}

function WorkPage() {
  const twoCol = typeof window !== "undefined" && window.innerWidth >= 760;
  return (
    <Layout active="">
      <PageHero
        eyebrow="SELECTED WORK"
        title={<>Sites built to <span style={{ color: "hsl(var(--muted-foreground))" }}>turn visits into leads.</span></>}
        sub="A look at the custom, SEO-optimized websites we design and build for clients — the same kind of site we can launch for you in 5–7 days."
        cta="Get a site like these"
      />

      <section className="cc-section cc-section--card">
        <div className="cc-container">
          {CLIENTS.length > 0 ? (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: twoCol ? "1fr 1fr" : "1fr",
                  gap: 24,
                }}
              >
                {CLIENTS.map((c) => (
                  <WorkCard key={c.url} {...c} />
                ))}
              </div>
              <p style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 28, maxWidth: 640, lineHeight: 1.6 }}>
                Want a closer look? Book a free call and we'll walk you through recent projects in detail.
              </p>
            </>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "72px 32px",
              background: "hsl(var(--card))",
              border: "1px dashed hsl(var(--border-strong))",
              borderRadius: 24,
              maxWidth: 720,
              margin: "0 auto",
            }}>
              <h2 className="cc-h3" style={{ marginBottom: 12 }}>Portfolio coming soon.</h2>
              <p className="cc-lede" style={{ margin: "0 auto 24px" }}>
                We're adding live previews of recent client sites here. In the meantime, book a free strategy call and we'll walk you through examples that match your industry.
              </p>
              <a href="/book-a-call" className="cc-btn">Book a free call</a>
            </div>
          )}
        </div>
      </section>

      <CTABlock
        title="Want one built for your business?"
        sub="A free 15-minute strategy call. We'll show you exactly what your site could look like — and how it'd fit alongside your SEO, Meta Ads, and CRM."
        cta="Book a free 15-min call"
      />
    </Layout>
  );
}

export default WorkPage;
