"use client";
import { Layout, CTABlock } from "@/components/shared";
import { Sections1 } from "@/components/sections1";
import { Sections2 } from "@/components/sections2";
import { Sections3 } from "@/components/sections3";
import { Icon } from "@/components/icons";
import { Mock } from "@/components/mocks";

function ServiceTeaser({ icon, title, body, href }) {
  return (
    <a href={href} style={{
      display: "block",
      padding: 28,
      background: "hsl(var(--card))",
      border: "1px solid hsl(var(--border))",
      borderRadius: 16,
      transition: "all 0.2s var(--ease-default)",
      cursor: "pointer",
    }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border-strong))"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
       onMouseLeave={(e) => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: "hsl(var(--accent-soft))",
        color: "hsl(var(--accent))",
        display: "grid", placeItems: "center",
        marginBottom: 20,
      }}>{icon}</div>
      <div style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14.5, color: "hsl(var(--muted-foreground))", lineHeight: 1.55, marginBottom: 14 }}>{body}</div>
      <span className="cc-link">Learn more <Icon.arrowRight size={14} /></span>
    </a>
  );
}

function HomePage() {
  return (
    <Layout active="home">
      <Sections1.Hero variant="A" />

      {/* Teaser grid linking to /services */}
      <section className="cc-section cc-section--dark" id="features">
        <div className="cc-container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>WHAT WE DO</div>
            <h2 className="cc-h2" style={{ maxWidth: 720, margin: "0 auto" }}>
              Four services that work together. One team behind them all.
            </h2>
            <p className="cc-lede" style={{ margin: "16px auto 0" }}>
              Pick one or stack them all — built, managed, and optimized for your growth.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
            <ServiceTeaser icon={<Icon.search size={20} stroke={1.8} />} title="SEO" body="Rank on page 1 for the terms your customers search — and get a custom, SEO-optimized website free with every plan." href="/services#seo" />
            <ServiceTeaser icon={<Icon.trending size={20} stroke={1.8} />} title="Meta Ads" body="Facebook & Instagram campaigns built to convert — precise targeting, tested creative, and full campaign management." href="/services#meta-ads" />
            <ServiceTeaser icon={<Icon.globe size={20} stroke={1.8} />} title="Custom Websites" body="SEO-optimized, mobile-first sites that turn visitors into leads. Live in 5–7 days, or buy out for $1,000." href="/services#websites" />
            <ServiceTeaser icon={<Icon.phoneMissed size={20} stroke={1.8} />} title="CRM & Automation" body="Missed-call text-back, 24/7 AI chat, and review automation — a full CRM in your pocket. Trusted by 10,000+ companies." href="/services#crm" />
            <ServiceTeaser icon={<Icon.bolt size={20} stroke={1.8} />} title="The Full Growth System" body="All four services bundled for $2,000/mo — a $388/mo saving versus buying them separately." href="/pricing" />
            <ServiceTeaser icon={<Icon.sparkles size={20} stroke={1.8} />} title="A dedicated team" body="Not a freelancer — SEO, paid ads, design, and automation specialists, all focused on your results." href="/how-it-works" />
          </div>
        </div>
      </section>

      {/* How the booking system works — 3 visual steps */}
      <section className="cc-section cc-section--card" id="how-it-works-intro">
        <div className="cc-container">
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 56px" }}>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>HOW OUR CRM WORKS</div>
            <h2 className="cc-h2" style={{ marginBottom: 16 }}>
              Turn every lead into a booked customer.
            </h2>
            <p className="cc-lede" style={{ margin: "0 auto" }}>
              SEO and Meta Ads bring the leads in — our CRM & Automation makes sure not one of them slips away. Here's how it runs, in three moves.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
            {[
              { title: "Catch every lead", mock: <Mock.MissedCall />, grad: "linear-gradient(135deg, hsl(248 72% 89%), hsl(286 66% 92%))", body: "the second a call goes unanswered, missed-call text-back reaches the caller in seconds — while they're still holding the phone. Most reply within a minute." },
              { title: "Follow up automatically", mock: <Mock.FollowUp />, grad: "linear-gradient(135deg, hsl(322 76% 91%), hsl(346 82% 93%))", body: "leads that don't buy right away drop into an automated sequence across text and email that pauses the instant someone replies. Nothing falls through the cracks." },
              { title: "Earn the reviews", mock: <Mock.Reviews />, grad: "linear-gradient(135deg, hsl(26 92% 91%), hsl(44 92% 91%))", body: "once the job's done, review automation turns happy customers into five-star Google reviews that bring the next customer straight to your door." },
            ].map((s) => (
              <div className="cc-step" key={s.title}>
                <div className="cc-step__visual" style={{ backgroundImage: s.grad }}>
                  {s.mock}
                </div>
                <div className="cc-step__body" style={{ padding: "20px 6px 0" }}>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "hsl(var(--muted-foreground))" }}>
                    <strong style={{ color: "hsl(var(--foreground))", fontWeight: 650 }}>{s.title} —</strong> {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries we serve — meaningful, scannable copy per trade */}
      <section className="cc-section cc-section--card cc-section--gradient" id="industries">
        <div className="cc-container">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>INDUSTRIES WE SERVE</div>
            <h2 className="cc-h2" style={{ marginBottom: 16 }}>
              Built for any business that runs on new customers.
            </h2>
            <p className="cc-lede" style={{ margin: 0 }}>
              Whatever your industry, the playbook is the same: get found with SEO and Meta Ads, convert visitors with a high-performing website, and never lose a lead with CRM automation. Here's how that plays out across the businesses we work with, in all 50 states.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 700 ? "1fr" : window.innerWidth < 1000 ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "calendar", t: "Restaurants", d: "A reservation-and-ordering system that catches every call, fills slow nights with automated offers, and turns first-time guests into regulars." },
              { icon: "globe", t: "E-Commerce", d: "A fast, conversion-tuned storefront plus abandoned-cart and post-purchase follow-up that recover lost sales and bring buyers back." },
              { icon: "shield", t: "Contractors & Home Services", d: "Missed-call text back and year-long follow-up that turn inbound calls and inspection requests into booked jobs — roofing, HVAC, plumbing, electrical and more." },
              { icon: "user", t: "Professional Services", d: "Lead capture and qualification for law firms, accountants, and consultants — every inquiry answered fast and routed to your calendar with full context." },
              { icon: "check", t: "Health & Wellness", d: "New-patient booking, reminders, and reactivation for clinics and practitioners — fewer no-shows and more filled appointments, hands-off." },
              { icon: "bolt", t: "Gyms & Fitness", d: "Trial sign-ups, automated nurture, and rebooking that turn website visitors and walk-ins into members who actually show up." },
              { icon: "sparkles", t: "Med Spas & Aesthetics", d: "Compliant booking, reminders, and review collection for aesthetic practices — new-client acquisition that passes platform review." },
              { icon: "mapPin", t: "Local Retail & Shops", d: "A website, click-to-call, and follow-up that drive foot traffic, promote in-store events, and turn nearby shoppers into repeat customers." },
              { icon: "search", t: "Smoke Shops", d: "Compliant lead capture, SEO, and owned email/SMS audiences for a category most platforms decline — growth inside the rules.", restricted: true },
            ].map((it) => {
              const Ic = Icon[it.icon] || Icon.arrowRight;
              return (
                <a
                  key={it.t}
                  href="/services"
                  style={{ position: "relative", display: "flex", flexDirection: "column", padding: 26, background: "hsl(250 40% 99%)", border: "1px solid hsl(250 35% 92%)", borderRadius: 16, boxShadow: "0 2px 10px -4px hsl(250 50% 50% / 0.15)", transition: "all 0.2s var(--ease-default)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "hsl(250 45% 85%)"; e.currentTarget.style.boxShadow = "0 12px 28px -10px hsl(250 55% 50% / 0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "hsl(250 35% 92%)"; e.currentTarget.style.boxShadow = "0 2px 10px -4px hsl(250 50% 50% / 0.15)"; e.currentTarget.style.transform = "none"; }}
                >
                  {it.restricted && (
                    <span style={{ position: "absolute", top: 14, right: 14, fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "hsl(35 92% 42%)", background: "hsl(40 95% 95%)", border: "1px solid hsl(38 85% 80%)", borderRadius: 999, padding: "3px 8px" }}>Restricted</span>
                  )}
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "hsl(var(--accent-soft))", color: "hsl(var(--accent))", display: "grid", placeItems: "center", marginBottom: 18 }}>
                    <Ic size={18} />
                  </div>
                  <div style={{ fontWeight: 650, fontSize: 17, letterSpacing: "-0.01em", marginBottom: 8 }}>{it.t}</div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "hsl(var(--muted-foreground))", flex: 1 }}>{it.d}</p>
                  <span className="cc-link" style={{ marginTop: 16 }}>See the playbook <Icon.arrowRight size={14} /></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workforce section — strong second-act pitch */}
      <Sections2.WorkforceSection />

      {/* Stat strip */}
      <section className="cc-section cc-section--dark">
        <div className="cc-container">
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 700 ? "1fr 1fr" : "repeat(4, 1fr)", gap: 24 }}>
            {[
              { n: "10,000+", l: "companies on our CRM" },
              { n: "50", l: "states served" },
              { n: "5–7d", l: "to launch a site" },
              { n: "$997/mo", l: "starting price" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center", padding: "16px 8px" }}>
                <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 8, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Sections3.Testimonials />

      {/* About — plain-language who/what/who-for/where for humans and crawlers */}
      <section className="cc-section cc-section--card" id="about">
        <div className="cc-container">
          <div style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "0.8fr 1.2fr",
            gap: window.innerWidth < 900 ? 24 : 64,
            alignItems: "start",
            padding: window.innerWidth < 900 ? "8px 0" : "16px 0",
          }}>
            <div>
              <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 16 }}>ABOUT PIERSON DIGITAL</div>
              <h2 className="cc-h2" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                The full marketing team your business never had to hire.
              </h2>
            </div>
            <div className="cc-stack-sm" style={{ fontSize: 17, lineHeight: 1.65, color: "hsl(var(--muted-foreground))" }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: "hsl(var(--foreground))" }}>Pierson Digital is a full-service digital marketing agency — SEO, Meta Ads, custom websites, and CRM</strong> — one team delivering real results for businesses of every size, in every industry.
              </p>
              <p style={{ margin: 0 }}>
                We get you found with SEO and paid ads, convert visitors with a high-performing website, and make sure no lead slips through with CRM automation — missed-call text-back, 24/7 AI chat, and review automation trusted by 10,000+ companies. One point of contact, one bill, no long-term contracts.
              </p>
              <p style={{ margin: 0 }}>
                Based in <strong style={{ color: "hsl(var(--foreground))" }}>Champaign, Illinois</strong>, serving businesses across all 50 states.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABlock />
    </Layout>
  );
}

export default HomePage;
