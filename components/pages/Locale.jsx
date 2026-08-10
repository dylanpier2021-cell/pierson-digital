"use client";
// Localized landing page — one per state (+ Champaign, IL), ported from the
// legacy static site so those indexed URLs keep working after the switch.
// Same design system as the rest of the site; copy is localized per `locale`.
import { Layout, PageHero, CTABlock } from "@/components/shared";
import { Sections3 } from "@/components/sections3";
import { Icon } from "@/components/icons";

const SERVICES = [
  { icon: "search", title: "SEO", desc: "Rank on page 1 — free custom website included with every plan.", price: "$997/mo", href: "/services#seo" },
  { icon: "trending", title: "Meta Ads", desc: "Facebook & Instagram campaigns built to convert into booked leads.", price: "$997/mo", href: "/services#meta-ads" },
  { icon: "globe", title: "Custom Websites", desc: "SEO-optimized, mobile-first sites that turn visitors into leads.", price: "$97/mo", href: "/services#websites" },
  { icon: "phoneMissed", title: "CRM & Automation", desc: "Missed-call text-back, 24/7 AI chat, and review automation.", price: "$297/mo", href: "/services#crm" },
];

function ServiceCard({ icon, title, desc, price, href }) {
  const Ic = Icon[icon] || Icon.arrowRight;
  return (
    <a href={href} style={{
      display: "block", padding: 28,
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      borderRadius: 16,
      transition: "all 0.2s var(--ease-default)",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border-strong))"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "hsl(var(--accent-soft))", color: "hsl(var(--accent))", display: "grid", placeItems: "center" }}>
          <Ic size={20} stroke={1.8} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "hsl(var(--accent))", fontWeight: 600 }}>{price}</span>
      </div>
      <div style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14.5, color: "hsl(var(--muted-foreground))", lineHeight: 1.55, marginBottom: 14 }}>{desc}</div>
      <span className="cc-link">Learn more <Icon.arrowRight size={14} /></span>
    </a>
  );
}

function LocalePage({ locale }) {
  const { label, region, cities = [] } = locale;
  const hasCities = cities.length > 0;
  const cityList = hasCities
    ? cities.slice(0, -1).join(", ") + (cities.length > 1 ? `, and ${cities[cities.length - 1]}` : cities[0])
    : region;
  const twoCol = typeof window !== "undefined" && window.innerWidth >= 900;

  return (
    <Layout active="">
      <PageHero
        eyebrow={`DIGITAL MARKETING IN ${label.toUpperCase()}`}
        title={<>Grow your <span style={{ color: "hsl(var(--accent))" }}>{label}</span> business online.</>}
        sub={`Pierson Digital helps ${label} businesses get found and win more customers — with SEO, Meta Ads, custom websites, and CRM automation. ${hasCities ? `Proudly serving ${cityList} and the surrounding area. ` : ""}No contracts. Results-focused.`}
        cta="Book a free strategy call"
      />

      {/* Services */}
      <section className="cc-section cc-section--card">
        <div className="cc-container">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 48px" }}>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 14 }}>WHAT WE DO</div>
            <h2 className="cc-h2" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>
              Everything your {label} business needs to grow.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: twoCol ? "repeat(2, 1fr)" : "1fr", gap: 16 }}>
            {SERVICES.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <a href="/pricing" className="cc-btn cc-btn--ghost">See all pricing <Icon.arrowRight size={14} /></a>
          </div>
        </div>
      </section>

      {/* Local proof + areas served */}
      <section className="cc-section cc-section--dark">
        <div className="cc-container">
          <div style={{ display: "grid", gridTemplateColumns: twoCol ? "1fr 1fr" : "1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div className="cc-eyebrow" style={{ marginBottom: 14 }}>SERVING {label.toUpperCase()}</div>
              <h2 className="cc-h2" style={{ fontSize: "clamp(26px, 2.6vw, 36px)", marginBottom: 16 }}>
                Local focus, nationwide firepower.
              </h2>
              <p className="cc-lede" style={{ margin: 0 }}>
                We work with {label} businesses of every size and industry — and back them with the same CRM trusted by 10,000+ companies across all 50 states.
                {hasCities ? ` From ${cityList}, we help you get found, get leads, and never let one slip away.` : ""}
              </p>
              {hasCities && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
                  {cities.map((c) => (
                    <span key={c} style={{
                      padding: "6px 12px", borderRadius: 999,
                      border: "1px solid hsl(var(--border-strong))",
                      fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.03em",
                      color: "hsl(var(--muted-foreground))",
                    }}>{c}</span>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { n: "10,000+", l: "companies on our CRM" },
                { n: "50", l: "states served" },
                { n: "5–7d", l: "to launch a site" },
                { n: "No", l: "long-term contracts" },
              ].map((s) => (
                <div key={s.l} style={{ padding: "20px 8px", textAlign: "center", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 16 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 12.5, color: "hsl(var(--muted-foreground))", marginTop: 8, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.03em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Sections3.Testimonials />

      <CTABlock
        title={`Ready to grow your ${label} business?`}
        sub={`Book a free 15-minute strategy call. We'll review your ${label} market, spot quick wins, and outline exactly what we'd do to get you more customers.`}
        cta="Book a free strategy call"
      />
    </Layout>
  );
}

export default LocalePage;
