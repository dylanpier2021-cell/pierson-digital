"use client";
import { Sections2 } from "@/components/sections2";
import { Sections3 } from "@/components/sections3";
import { Layout, PageHero, CTABlock } from "@/components/shared";

function HowItWorksPage() {
  return (
    <Layout active="how-it-works">
      <PageHero
        eyebrow="HOW IT WORKS"
        title={<>From first call to <br /><span style={{ color: "hsl(var(--muted-foreground))" }}>live and growing.</span></>}
        sub="A simple, proven process — from our first conversation to a live website and a marketing engine that keeps improving. Here's exactly how Pierson Digital gets you up and running."
        cta="Book a free strategy call"
      />

      {/* Interactive steps */}
      <Sections2.HowItWorks />

      {/* Live demo */}
      <Sections3.LiveDemo />

      {/* Workforce */}
      <Sections2.WorkforceSection />

      {/* Setup timeline */}
      <section className="cc-section cc-section--dark" id="setup-timeline" style={{ scrollMarginTop: 80 }}>
        <div className="cc-container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>SETUP TIMELINE</div>
            <h2 className="cc-h2">Most clients are live within 5–7 business days.</h2>
            <p className="cc-lede" style={{ margin: "16px auto 0", textAlign: "center" }}>
              A few short calls on your end. We handle everything else.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 700 ? "1fr" : "repeat(4, 1fr)", gap: 16 }}>
            {[
              { d: "Day 1", t: "Discovery call", b: "A free 15-minute strategy call. We learn your business and goals, then map which services fit — SEO, Meta Ads, website, CRM, or the full system." },
              { d: "Days 2–5", t: "Build & set up", b: "We design and build your custom, SEO-optimized website, configure your CRM and automations, and prepare your ad campaigns." },
              { d: "Days 5–7", t: "Launch", b: "Your new website goes live — most sites launch within 5–7 business days — and your campaigns and follow-up automations switch on." },
              { d: "Ongoing", t: "Optimize & grow", b: "We track rankings, ads, and leads and refine every month. SEO results typically show within 60–90 days. No contract — cancel anytime." },
            ].map((s, i) => (
              <div key={i} className="cc-step">
                <div className="cc-step__num">{s.d}</div>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock title="Want to be live within 5–7 days?" />
    </Layout>
  );
}

export default HowItWorksPage;
