"use client";
import { Icon } from "@/components/icons";
import { Layout, PageHero, CTABlock } from "@/components/shared";
import React from "react";
const { useState: useStateF } = React;

const FAQ_GROUPS = [
  {
    cat: "Start here",
    items: [
      { q: "What does Pierson Digital do?", a: "Pierson Digital is a full-service digital marketing agency. We help businesses grow online with four core services — SEO, Meta Ads, custom websites, and a CRM with marketing automation. You can start with a single service or bundle everything into The Full Growth System. No contracts, results-focused." },
      { q: "What services do you offer?", a: "Four core services: SEO (page-1 rankings plus a free custom website, $997/mo), Meta Ads (Facebook & Instagram campaigns that convert, $997/mo), custom websites (built to generate leads, live in 5–7 days, $97/mo or $1,000 outright), and CRM & Automation (missed-call text-back, AI chat, and review automation, $297/mo). Bundle all four in The Full Growth System for $2,000/mo." },
      { q: "Do you work with any type of business?", a: "Yes. We work with businesses of all sizes across all 50 states, from solo providers to multi-location companies. Every engagement is tailored to your specific industry and market." },
      { q: "Where is Pierson Digital based?", a: "We're based in Champaign, Illinois, and serve businesses nationwide across all 50 states." },
    ],
  },
  {
    cat: "Services",
    items: [
      { q: "What's included in SEO?", a: "A custom SEO-optimized website (free), on-page and technical SEO, local SEO and Google Business Profile optimization, a monthly content strategy, backlink building, and a monthly rankings report. It's $997/mo with no contract." },
      { q: "What do your Meta Ads plans include?", a: "Facebook and Instagram ad campaigns with audience research and targeting, ad creative and copywriting, A/B testing, and weekly performance reports. Meta Ads is $997/mo with no contract and no setup fee." },
      { q: "What's included with a custom website?", a: "Custom design and development, an SEO-optimized structure, a mobile-first and fast build, plus hosting, maintenance, and ongoing updates. It's $97/mo, or buy it outright for $1,000 anytime. On our SEO plan, the website is included free." },
      { q: "What does the CRM do?", a: "Our CRM is trusted by 10,000+ companies. It includes missed-call text-back, a 24/7 AI chat widget, automated Google review requests, pipeline management, and your full CRM on your phone — so no lead slips through the cracks. It's $297/mo." },
    ],
  },
  {
    cat: "Timing & results",
    items: [
      { q: "How long does it take to see results from SEO?", a: "Most clients see measurable ranking improvements within 60–90 days. SEO is a long-term investment — the results compound over time, and we send you a monthly rankings report so you always know where you stand." },
      { q: "How fast can my website go live?", a: "Most custom websites go live within 5–7 days. Every site is custom-designed, SEO-optimized, mobile-first, and built to generate leads." },
    ],
  },
  {
    cat: "Pricing & contracts",
    items: [
      { q: "Is there a setup fee?", a: "For SEO and Meta Ads, there's no setup fee. The CRM has a one-time $750 startup fee that covers setup, onboarding, and configuration, then $297/mo after that." },
      { q: "Can I cancel anytime?", a: "Yes. All plans are month-to-month with no long-term contracts. You can cancel anytime." },
      { q: "Do I need to sign a contract?", a: "No. Everything is month-to-month with no long-term contracts. We earn your business every month with results, not paperwork." },
      { q: "What is The Full Growth System bundle?", a: "The Full Growth System is our all-in-one bundle — SEO, Meta Ads, a custom website, and the CRM — for $2,000/mo. Purchased separately those services run $2,388/mo, so you save $388/mo. One team, one point of contact, one bill." },
    ],
  },
];

function FAQItem({ q, a, open, onClick }) {
  return (
    <div className="cc-faq__item" data-open={open}>
      <button className="cc-faq__q" onClick={onClick}>
        <span>{q}</span>
        <span className="cc-faq__icon"><Icon.plus size={12} stroke={2.4} /></span>
      </button>
      <div className="cc-faq__a">{a}</div>
    </div>
  );
}

function FAQPage() {
  const [openKey, setOpenKey] = useStateF("0-0");
  const [search, setSearch] = useStateF("");
  const [activeCat, setActiveCat] = useStateF("All");

  const norm = (s) => s.toLowerCase();
  const filtered = FAQ_GROUPS.map((g, gi) => ({
    ...g,
    gi,
    items: g.items
      .map((it, ii) => ({ ...it, key: `${gi}-${ii}` }))
      .filter((it) => !search || norm(it.q + " " + it.a).includes(norm(search))),
  })).filter((g) => (activeCat === "All" || g.cat === activeCat) && g.items.length > 0);

  return (
    <Layout active="faq">
      <PageHero
        eyebrow="FAQ"
        title={<>Questions, answered.</>}
        sub="If something isn't here, a free 15-minute strategy call covers it. No pitch, no slideshow — we just answer your questions."
        cta="Ask us directly"
      />

      <section className="cc-section cc-section--card">
        <div className="cc-container">
          <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "260px 1fr", gap: 48, alignItems: "start" }}>
            {/* Sidebar */}
            <aside style={{ position: window.innerWidth < 900 ? "static" : "sticky", top: 96 }}>
              {/* search */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px",
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 999,
                marginBottom: 20,
              }}>
                <Icon.search size={14} style={{ color: "hsl(var(--muted-foreground))" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions…"
                  style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, minWidth: 0 }}
                />
              </div>

              <div className="cc-eyebrow cc-eyebrow--muted" style={{ marginBottom: 12 }}>CATEGORIES</div>
              <div style={{ display: "flex", flexDirection: window.innerWidth < 900 ? "row" : "column", gap: 4, flexWrap: "wrap" }}>
                {["All", ...FAQ_GROUPS.map((g) => g.cat)].map((c) => (
                  <button key={c} onClick={() => setActiveCat(c)} style={{
                    padding: "8px 12px",
                    textAlign: "left",
                    fontSize: 14,
                    fontWeight: 500,
                    background: activeCat === c ? "hsl(var(--muted))" : "transparent",
                    color: activeCat === c ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}>{c}</button>
                ))}
              </div>
            </aside>

            {/* Content */}
            <div>
              {filtered.length === 0 && (
                <div style={{ padding: 32, textAlign: "center", color: "hsl(var(--muted-foreground))", border: "1px dashed hsl(var(--border))", borderRadius: 16 }}>
                  No questions match "{search}". Try a different word, or <a className="cc-link" href="/book-a-call">ask us directly</a>.
                </div>
              )}
              {filtered.map((g) => (
                <div key={g.cat} style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: 14, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 4, fontWeight: 500 }}>
                    {g.cat}
                  </h2>
                  <div>
                    {g.items.map((it) => (
                      <FAQItem
                        key={it.key}
                        q={it.q}
                        a={it.a}
                        open={openKey === it.key}
                        onClick={() => setOpenKey(openKey === it.key ? null : it.key)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABlock title="Got a question we missed?" sub="We answer every email within a business day. Or jump on a free 15-minute strategy call." cta="Ask on a call" />
    </Layout>
  );
}

export default FAQPage;
