"use client";
import React from "react";
import { Icon } from "@/components/icons";
import { Mock } from "@/components/mocks";
import { Layout, PageHero, CTABlock } from "@/components/shared";

function ServiceRow({ id, idx, eyebrow, price, title, body, bullets, mock, reverse }) {
  const rightOnLeft = reverse;
  return (
    <section id={id} className="cc-section cc-section--card" style={{ scrollMarginTop: 80 }}>
      <div className="cc-container">
        <div style={{
          display: "grid",
          gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1fr",
          gap: 56,
          alignItems: "center",
          direction: rightOnLeft && window.innerWidth >= 900 ? "rtl" : "ltr",
        }}>
          <div style={{ direction: "ltr" }} className="cc-stack-md">
            <div className="cc-eyebrow">
              <span style={{ fontFamily: "var(--font-mono)", marginRight: 8 }}>0{idx}</span>
              {eyebrow}
            </div>
            <h2 className="cc-h2" style={{ fontSize: "clamp(28px, 3.4vw, 44px)" }}>{title}</h2>
            {price && (
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, letterSpacing: "-0.01em", color: "hsl(var(--accent))" }}>{price}</span>
              </div>
            )}
            <p className="cc-lede">{body}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.55 }}>
                  <span style={{ flexShrink: 0, marginTop: 4, color: "hsl(var(--accent))" }}><Icon.check size={14} stroke={2.4} /></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 8 }}>
              <a href="/book-a-call" className="cc-btn cc-btn--ghost">Book a free strategy call <Icon.arrowRight size={14} /></a>
            </div>
          </div>
          <div style={{ direction: "ltr" }}>
            <div style={{
              position: "relative",
              height: 380,
              background: "hsl(var(--page))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 20,
              overflow: "hidden",
              transition: "all 0.2s var(--ease-default)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.borderColor = "hsl(var(--accent) / 0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "hsl(var(--border))"; }}>
              {mock}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  const services = [
    {
      id: "seo",
      eyebrow: "SEARCH ENGINE OPTIMIZATION",
      price: "$997/mo",
      title: "Rank on page 1 — and get a free website while you're at it.",
      body: "We optimize your site and Google Business Profile to rank for the terms your customers are already searching. Every SEO plan includes a custom, SEO-optimized website — free. Month-to-month, no contract.",
      bullets: [
        "Custom SEO-optimized website included — free",
        "On-page & technical SEO",
        "Local SEO & Google Business Profile optimization",
        "Monthly content strategy & backlink building",
        "Monthly rankings report — results typically in 60–90 days",
      ],
      mock: <Mock.Website />,
    },
    {
      id: "meta-ads",
      eyebrow: "META ADS",
      price: "$997/mo",
      title: "Facebook & Instagram ads built to convert, not just get clicks.",
      body: "Precise targeting, tested creative, and full campaign management across Facebook and Instagram — so your ad spend turns into booked leads instead of vanity metrics. Month-to-month, no contract.",
      bullets: [
        "Facebook & Instagram campaign management",
        "Audience research & targeting",
        "Ad creative & copywriting",
        "A/B testing to find what converts",
        "Weekly performance reports",
      ],
      mock: <Mock.FollowUp />,
      reverse: true,
    },
    {
      id: "websites",
      eyebrow: "CUSTOM WEBSITES",
      price: "$97/mo or $1,000 outright",
      title: "A website engineered to turn visitors into leads.",
      body: "SEO-optimized, mobile-first, and fast — custom-designed to generate leads and live in 5–7 days. $97/mo with hosting and updates included, or buy it outright for $1,000 anytime.",
      bullets: [
        "Custom design & development",
        "SEO-optimized structure",
        "Mobile-first & fast-loading",
        "Hosting & maintenance included",
        "Ongoing updates — buy out anytime for $1,000",
      ],
      mock: <Mock.Form />,
    },
    {
      id: "crm",
      eyebrow: "CRM & AUTOMATION",
      price: "$297/mo + $750 setup",
      title: "Never lose another lead to a missed call.",
      body: "Missed-call text-back, a 24/7 AI chat widget, Google review automation, and a full CRM in your pocket — the same system trusted by 10,000+ companies. $297/mo plus a one-time $750 startup fee.",
      bullets: [
        "Missed-call text-back — auto-text every missed call",
        "AI chat widget, 24/7",
        "Google review automation",
        "Full CRM on your phone",
        "Pipeline management & unified inbox",
      ],
      mock: <Mock.MissedCall />,
      reverse: true,
    },
  ];

  return (
    <Layout active="services">
      <PageHero
        eyebrow="SERVICES"
        title={<>Four services. <br /><span style={{ color: "hsl(var(--muted-foreground))" }}>One growth engine.</span></>}
        sub="SEO, Meta Ads, custom websites, and CRM — pick the one you need or stack them all. One team, one point of contact, real results for businesses nationwide."
        cta="Book a free strategy call"
      />

      {/* Service jump-links */}
      <section style={{ borderTop: "1px solid hsl(var(--border))", borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}>
        <div className="cc-container" style={{ padding: "16px 24px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
          {services.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} style={{
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
              color: "hsl(var(--muted-foreground))",
              border: "1px solid hsl(var(--border))",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "all 0.15s",
            }} onMouseEnter={(e) => { e.currentTarget.style.color = "hsl(var(--foreground))"; e.currentTarget.style.borderColor = "hsl(var(--border-strong))"; }}
               onMouseLeave={(e) => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.borderColor = "hsl(var(--border))"; }}>
              0{i + 1} · {s.eyebrow}
            </a>
          ))}
        </div>
      </section>

      {services.map((s, i) => (
        <React.Fragment key={s.id}>
          <ServiceRow {...s} idx={i + 1} />
          {i < services.length - 1 && (
            <div className="cc-container"><hr className="cc-divider" /></div>
          )}
        </React.Fragment>
      ))}

      <CTABlock title="Want the whole stack for one price?" sub="The Full Growth System bundles SEO, Meta Ads, a custom website, and CRM for $2,000/mo — a $388/mo saving versus buying them separately. One team, one bill." cta="See the Full Growth System" />
    </Layout>
  );
}

export default ServicesPage;
