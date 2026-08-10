"use client";
import { Layout, PageHero, CTABlock } from "@/components/shared";
import { Sections3 } from "@/components/sections3";

function CaseStudy({ name, trade, location, hero, stats, quote, quoteBy }) {
  return (
    <div
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 20,
        overflow: "hidden",
        transition: "all 0.2s var(--ease-default)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.borderColor = "hsl(var(--accent) / 0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "hsl(var(--border))"; }}
    >
      <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1.4fr" }}>
        {/* Left meta */}
        <div style={{
          padding: 32,
          borderRight: window.innerWidth < 900 ? "none" : "1px solid hsl(var(--border))",
          borderBottom: window.innerWidth < 900 ? "1px solid hsl(var(--border))" : "none",
          background: "linear-gradient(160deg, hsl(250 60% 98.5%), hsl(252 52% 95%))",
        }}>
          <div style={{
            width: 48, height: 48,
            borderRadius: "50%",
            background: "hsl(var(--foreground))",
            color: "hsl(var(--background))",
            display: "grid", placeItems: "center",
            fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em",
            marginBottom: 20,
          }}>{name.split(" ").map(w => w[0]).slice(0, 2).join("")}</div>
          <div style={{ fontWeight: 650, fontSize: 18, letterSpacing: "-0.01em" }}>{name}</div>
          <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 2, fontFamily: "var(--font-mono)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
            {trade} · {location}
          </div>
          <div style={{ marginTop: 24, padding: "18px 0 0", borderTop: "1px solid hsl(252 40% 90%)" }}>
            <div className="cc-eyebrow" style={{ marginBottom: 10 }}>HEADLINE</div>
            <div style={{ fontSize: 38, fontWeight: 750, letterSpacing: "-0.03em", lineHeight: 1 }}>{hero.n}</div>
            <div style={{ fontSize: 13.5, color: "hsl(var(--muted-foreground))", marginTop: 8 }}>{hero.l}</div>
          </div>
        </div>

        {/* Right detail */}
        <div style={{ padding: 32, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 600 ? "1fr 1fr" : "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            {stats.map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{s.n}</div>
                <div style={{ fontSize: 11.5, color: "hsl(var(--muted-foreground))", marginTop: 5, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ margin: "auto 0 0" }}>
            {/* testimonial styled as an incoming text message */}
            <div style={{
              display: "inline-block",
              maxWidth: "94%",
              background: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
              padding: "13px 17px",
              fontSize: 15, lineHeight: 1.5, fontWeight: 500,
              letterSpacing: "-0.005em",
              borderRadius: 20,
              borderBottomLeftRadius: 6,
            }}>
              {quote}
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: "hsl(var(--muted-foreground))" }}>— {quoteBy}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  const cases = [
    {
      name: "Mike R.", trade: "HVAC", location: "Phoenix AZ",
      hero: { n: "Page 1", l: "Google rankings within 90 days" },
      stats: [
        { n: "60–90 days", l: "typical time to rank" },
        { n: "Free site", l: "included with SEO" },
        { n: "No contract", l: "month-to-month" },
      ],
      quote: "Pierson Digital got us ranking on page 1 within 90 days. Our phone started ringing from customers we never would have reached before.",
      quoteBy: "Mike R., HVAC Contractor · Phoenix AZ",
    },
    {
      name: "Sarah K.", trade: "Attorney", location: "Chicago IL",
      hero: { n: "6 days", l: "from kickoff to a live site" },
      stats: [
        { n: "5–7 days", l: "typical go-live" },
        { n: "Mobile-first", l: "SEO-optimized build" },
        { n: "$97/mo", l: "or $1,000 outright" },
      ],
      quote: "The website went live in 6 days and it looked better than anything I'd seen from agencies charging 3x the price. Professional from start to finish.",
      quoteBy: "Sarah K., Attorney · Chicago IL",
    },
    {
      name: "James T.", trade: "Landscaping", location: "Dallas TX",
      hero: { n: "10 hrs/wk", l: "saved with automation" },
      stats: [
        { n: "10,000+", l: "companies on our CRM" },
        { n: "5 jobs", l: "recovered in month one" },
        { n: "24/7", l: "AI chat + text-back" },
      ],
      quote: "The CRM and automation alone saved us 10 hours a week. Missed-call text-back recovered at least 5 jobs in the first month.",
      quoteBy: "James T., Landscaping · Dallas TX",
    },
  ];

  return (
    <Layout active="results">
      <PageHero
        eyebrow="RESULTS"
        title={<>Real businesses. <br /><span style={{ color: "hsl(var(--muted-foreground))" }}>Real results.</span></>}
        sub="No vanity metrics. No cherry-picked screenshots. Here's what Pierson Digital is actually doing for businesses across all 50 states right now."
        cta="See if we can do this for you"
      />

      {/* Big stats strip */}
      <section className="cc-section cc-section--dark" style={{ padding: "48px 0" }}>
        <div className="cc-container">
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 700 ? "1fr 1fr" : "repeat(4, 1fr)", gap: 24 }}>
            {[
              { n: "10,000+", l: "companies using our CRM" },
              { n: "50", l: "states served" },
              { n: "60–90 days", l: "typical time to rank page 1" },
              { n: "5–7 days", l: "to launch a new website" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: window.innerWidth < 700 ? "left" : "center" }}>
                <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 8, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="cc-section cc-section--card" id="cases">
        <div className="cc-container">
          <div style={{ marginBottom: 40 }}>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>CASE STUDIES</div>
            <h2 className="cc-h2">Three businesses. Three services. Real results.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            {cases.map((c) => <CaseStudy key={c.name} {...c} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Sections3.Testimonials />

      <CTABlock title="Want to be the next case study?" sub="A free 15-minute strategy call. We'll show you exactly how we'd grow your business online — in your own numbers." />
    </Layout>
  );
}

export default ResultsPage;
