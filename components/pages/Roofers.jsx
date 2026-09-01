"use client";
// /roofers — application funnel for roofing company owners.
// Standalone landing page: no site nav, no footer links. One job: qualify → book.
import React from "react";
import MetaPixelEvents from "@/components/MetaPixelEvents";
const { useEffect } = React;

/* ══════════════════════════════════════════════════════════════════════════════
   ██  CONFIG — edit this block to launch. Nothing below it needs touching.  ██
   ══════════════════════════════════════════════════════════════════════════════ */

// GoHighLevel calendar embed (booking widget URL). It renders inline on the
// page — every CTA just scrolls down to it.
const CALENDAR_EMBED_URL = "https://api.leadconnectorhq.com/widget/booking/3J6p4WzOCbo7hYmCDdsO";

// The guarantee remedy line — one place to change the wording everywhere.
const GUARANTEE_REMEDY = "If we don't hit it, we work for free until we do.";

// The guarantee's condition line. Prepares them for an ad budget without a hard number.
const GUARANTEE_TERMS =
  "Requires a Local Services Ads budget on top of our fee — we’ll size it to your market on the call.";

// The one qualification requirement, shown on the page and in the popup.
const REVENUE_FLOOR = "$60k+/month";
const QUALIFIER = `For roofing companies doing ${REVENUE_FLOOR}.`;

// The free field guide (the value piece). Direct download, not gated — no opt-in.
// Leave GUIDE_PDF_URL empty ("") to hide the section until the PDF is uploaded.
const GUIDE_PDF_URL = "/assets/roofers/easier-to-find-roofing-field-guide.pdf";
const GUIDE_COVER_URL = ""; // optional cover image; "" = show a typographic cover card
const GUIDE_PAGES = "59";
const GUIDE_FILENAME = "Easier-To-Find-Roofing-Field-Guide.pdf"; // the filename the browser saves it as

// The social-proof stat shown where testimonials used to be.
const PROOF_STAT = "10,000+";
const PROOF_LINE = "people have run through our system.";

/* ═══════════════════════════════ END CONFIG ═══════════════════════════════ */

/* ── GHL calendar embed (same loader pattern as /book-a-call) ───────────── */
function CalendarEmbed() {
  useEffect(() => {
    if (document.querySelector('script[data-ghl-embed="true"]')) return;
    const s = document.createElement("script");
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.type = "text/javascript";
    s.async = true;
    s.dataset.ghlEmbed = "true";
    document.body.appendChild(s);
  }, []);

  return (
    <div className="rf-calendar-frame">
      <iframe
        src={CALENDAR_EMBED_URL}
        style={{ width: "100%", border: "none", overflow: "hidden", display: "block", minHeight: 700 }}
        scrolling="no"
        id="rf_booking_calendar"
        title="Pick a time for your 30-minute call"
      />
    </div>
  );
}

/* ── What You Get — 4 pillars ───────────────────────────────────────────────── */
const PILLARS = [
  {
    title: "A Custom Website",
    line: "Built from scratch for your company. Not a template every other roofer in town is using.",
  },
  {
    title: "SEO That Works Everywhere",
    line: "Ranked on Google and inside ChatGPT and AI search, where customers are starting to look.",
  },
  {
    title: "#1 on Google Maps — Today",
    line: "SEO is the long game. Local Services Ads put you at the top of the map now, Google Guaranteed badge included.",
  },
  {
    title: "Your Own Lead System",
    line: "Your logo, your name, your app. Every lead lands on your phone, everything in one place.",
  },
];

/* ═══════════════════════════════ THE PAGE ═════════════════════════════════ */
export default function Roofers() {
  return (
    <div className="rf-page" data-theme="dark">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <MetaPixelEvents />

      {/* ── Top bar: logo + one CTA. No nav. ── */}
      <header className="rf-topbar">
        <img src="/assets/logo-pd.png" alt="Pierson Digital" className="rf-logo" width="40" height="40" />
        <a className="rf-cta rf-cta--small" href="#rf-book">
          Get My Roofing Plan
        </a>
      </header>

      {/* ── 1. Hero ── */}
      <section className="rf-hero">
        <h1 className="rf-h1">
          Your Competitor Isn&rsquo;t Better Than You. <span className="rf-h1-accent">He&rsquo;s Just Easier To Find.</span>
        </h1>
        <p className="rf-sub">
          We put roofing companies at <strong>#1 on Google Maps</strong> — and guarantee you{" "}
          <strong>5 booked calls in your first 30 days</strong>.
        </p>
        <a className="rf-cta rf-cta--big" href="#rf-book">
          Get My Roofing Plan →
        </a>
      </section>

      {/* ── 2. The Guarantee Bar ── */}
      <section className="rf-guarantee" aria-label="Our guarantee">
        <div className="rf-guarantee-inner">
          <div className="rf-guarantee-headline">
            5 booked calls in your first 30 days — <span className="rf-guarantee-mark">guaranteed.</span>
          </div>
          <div className="rf-guarantee-terms">
            {GUARANTEE_TERMS} <strong>{GUARANTEE_REMEDY}</strong>
          </div>
        </div>
      </section>

      {/* ── 3. Social proof ── */}
      <section className="rf-section rf-section--tight rf-section--center">
        <div className="rf-stat-number">{PROOF_STAT}</div>
        <p className="rf-stat-line">{PROOF_LINE}</p>
      </section>

      {/* ── 4. What You Get ── */}
      <section className="rf-section rf-section--tight">
        <h2 className="rf-h2">What You Get</h2>
        <div className="rf-pillars">
          {PILLARS.map((p) => (
            <div key={p.title} className="rf-pillar">
              <h3>{p.title}</h3>
              <p>{p.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4b. The free field guide — the value piece. No opt-in, no gate. ── */}
      {GUIDE_PDF_URL ? (
        <section className="rf-section rf-section--tight" aria-label="Free field guide">
          <div className="rf-guide">
            <a className="rf-guide-cover" href={GUIDE_PDF_URL} download={GUIDE_FILENAME} aria-label="Download the free field guide (PDF)">
              {GUIDE_COVER_URL ? (
                <img src={GUIDE_COVER_URL} alt="Easier To Find — the roofing company owner’s field guide" loading="lazy" width="320" height="414" />
              ) : (
                <div className="rf-guide-cover-card">
                  <span>Easier<br />To Find.</span>
                  <small>Field Guide · {GUIDE_PAGES} pages</small>
                </div>
              )}
            </a>
            <div className="rf-guide-body">
              <div className="rf-guide-kicker">Free · No email required</div>
              <h2 className="rf-h2 rf-guide-h2">Want the manual first?</h2>
              <p>
                {GUIDE_PAGES} pages on exactly how this works — Google Maps, Local Services Ads, real SEO, AI search, and
                never losing a lead to a slow callback. Written so you can do it yourself if you want to.
              </p>
              <a className="rf-cta rf-cta--big rf-cta--ghost" href={GUIDE_PDF_URL} download={GUIDE_FILENAME}>
                Download the Free Guide (PDF) →
              </a>
              <p className="rf-guide-note">If you read it and want us to run it for you, cool. If not, you should still know this.</p>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── 5. Who This Is For ── */}
      <section className="rf-whofor">
        This is for roofing companies doing <strong>{REVENUE_FLOOR}</strong>. If that&rsquo;s not you yet, keep
        scrolling.
      </section>

      {/* ── 7. Booking — the calendar is on the page, nothing to click ── */}
      <section id="rf-book" className="rf-section rf-section--center rf-book">
        <h2 className="rf-form-headline">Lock In Your Call.</h2>
        <p className="rf-form-subline">
          Pick a time below. It&rsquo;s a 30-minute call — we&rsquo;ll show you exactly what your #1 spot on Google
          Maps is worth. {QUALIFIER}
        </p>
        <CalendarEmbed />
      </section>

      {/* ── Minimal footer: no links, page has one job ── */}
      <footer className="rf-footer">© {new Date().getFullYear()} Pierson Digital · Marketing for roofing companies</footer>
    </div>
  );
}

/* ═══════════════════════════════ STYLES ════════════════════════════════════
   Page-scoped styles (rf-*). Builds on the site's dark-theme tokens from
   globals.css; adds a safety-orange accent for the roofing audience. */
const STYLES = `
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
.rf-page {
  --rf-accent: 24 94% 53%;        /* safety orange */
  --rf-accent-strong: 24 100% 60%;
  background: hsl(0 0% 5%);
  color: hsl(0 0% 98%);
  min-height: 100vh;
  overflow-x: clip;
}
.rf-page section { padding-left: 20px; padding-right: 20px; }

/* ── top bar ── */
.rf-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  max-width: 1100px;
  margin: 0 auto;
}
.rf-logo { width: 40px; height: 40px; object-fit: contain; }

/* ── type ── */
.rf-h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(34px, 8vw, 68px);
  line-height: 1.08;
  letter-spacing: 0;
  margin: 0 auto;
  max-width: 880px;
}
.rf-h1-accent { color: hsl(var(--rf-accent-strong)); }
.rf-h2 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(28px, 6vw, 44px);
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  margin: 0 0 24px;
  text-align: center;
}
.rf-sub {
  font-size: clamp(17px, 4.4vw, 21px);
  font-weight: 400;
  line-height: 1.55;
  color: hsl(0 0% 80%);
  max-width: 620px;
  margin: 20px auto 26px;
}
.rf-sub strong { font-weight: 600; color: hsl(0 0% 100%); }

/* ── hero ── */
.rf-hero {
  text-align: center;
  padding-top: 28px;
  padding-bottom: 48px;
  max-width: 1000px;
  margin: 0 auto;
}

/* ── CTA buttons ── */
.rf-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: hsl(var(--rf-accent));
  color: hsl(0 0% 4%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-default), background-color var(--duration-fast) var(--ease-default), box-shadow var(--duration-fast) var(--ease-default);
}
.rf-cta:hover { background: hsl(var(--rf-accent-strong)); transform: translateY(-1px); box-shadow: 0 8px 28px hsl(var(--rf-accent) / 0.35); }
.rf-cta:active { transform: translateY(0); }
.rf-cta:focus-visible { outline: 3px solid hsl(var(--rf-accent-strong)); outline-offset: 3px; }
.rf-cta--small { font-size: 14px; padding: 10px 16px; }
.rf-cta--big { font-size: 19px; padding: 18px 34px; margin-top: 26px; }
.rf-cta:disabled { opacity: 0.7; cursor: default; transform: none; }

/* ── guarantee bar ── */
.rf-guarantee {
  background: hsl(var(--rf-accent));
  color: hsl(0 0% 4%);
  padding-top: 40px;
  padding-bottom: 40px;
}
.rf-guarantee-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.rf-guarantee-headline {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(28px, 6.6vw, 54px);
  line-height: 1.02;
  text-transform: uppercase;
}
.rf-guarantee-mark { text-decoration: underline; text-decoration-thickness: 5px; text-underline-offset: 6px; }
.rf-guarantee-terms {
  margin-top: 14px;
  font-size: clamp(15px, 3.6vw, 18px);
  font-weight: 500;
  line-height: 1.45;
}

/* ── sections ── */
.rf-section { padding-top: 64px; padding-bottom: 64px; max-width: 1000px; margin: 0 auto; }
.rf-section--tight { padding-top: 40px; padding-bottom: 40px; }
.rf-section--center { text-align: center; }

/* ── social-proof stat ── */
.rf-stat-number {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(72px, 18vw, 140px);
  line-height: 0.95;
  color: hsl(var(--rf-accent-strong));
  letter-spacing: -0.01em;
}
.rf-stat-line {
  font-size: clamp(18px, 4.6vw, 24px);
  font-weight: 600;
  color: hsl(0 0% 88%);
  margin: 10px 0 0;
}

/* ── pillars ── */
.rf-pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 860px;
  margin: 0 auto;
}
.rf-pillar {
  background: hsl(0 0% 8%);
  border: 1px solid hsl(0 0% 16%);
  border-radius: 16px;
  padding: 22px 22px 20px;
}
.rf-pillar h3 {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 22px;
  line-height: 1.05;
  text-transform: uppercase;
  margin: 0 0 8px;
  color: hsl(var(--rf-accent-strong));
}
.rf-pillar p { margin: 0; font-size: 15px; line-height: 1.5; color: hsl(0 0% 78%); }


/* ── free field guide ── */
.rf-guide {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 28px;
  align-items: center;
  max-width: 860px;
  margin: 0 auto;
  background: hsl(0 0% 8%);
  border: 1px solid hsl(0 0% 16%);
  border-radius: 16px;
  padding: 26px;
}
.rf-guide-cover { display: block; text-decoration: none; }
.rf-guide-cover img,
.rf-guide-cover-card {
  width: 100%;
  aspect-ratio: 8.5 / 11;
  display: block;
  border-radius: 8px;
  border: 1px solid hsl(0 0% 22%);
  box-shadow: 0 18px 40px -16px rgba(0,0,0,0.85);
  object-fit: cover;
}
.rf-guide-cover-card {
  background: hsl(0 0% 4%);
  color: #fff;
  padding: 16px 14px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 30px;
  line-height: 0.95;
  text-transform: uppercase;
  border-bottom: 10px solid hsl(var(--rf-accent));
}
.rf-guide-cover-card small {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: hsl(0 0% 60%);
}
.rf-guide-kicker {
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: hsl(var(--rf-accent-strong));
  margin-bottom: 8px;
}
.rf-guide-h2 { text-align: left; margin-bottom: 10px; }
.rf-guide-body p { color: hsl(0 0% 78%); font-size: 16px; line-height: 1.5; margin: 0 0 6px; }
.rf-guide-note { font-size: 13px !important; color: hsl(0 0% 55%) !important; margin-top: 12px !important; }
.rf-cta--ghost {
  background: transparent;
  color: hsl(var(--rf-accent-strong));
  border: 2px solid hsl(var(--rf-accent-strong));
  margin-top: 14px;
}
.rf-cta--ghost:hover { background: hsl(var(--rf-accent)); color: hsl(0 0% 4%); }
@media (max-width: 720px) {
  .rf-guide { grid-template-columns: 1fr; padding: 20px; text-align: center; }
  .rf-guide-cover { max-width: 180px; margin: 0 auto; }
  .rf-guide-h2 { text-align: center; }
}

/* ── who this is for ── */
.rf-whofor {
  max-width: 720px;
  margin: 0 auto;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  font-size: clamp(15px, 3.8vw, 17px);
  line-height: 1.55;
  color: hsl(0 0% 66%);
}
.rf-whofor strong { color: hsl(0 0% 92%); }

/* ── booking section: the calendar sits inline on the page ── */
.rf-book { max-width: 820px; margin: 0 auto; scroll-margin-top: 16px; }
.rf-form-headline {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(26px, 6.4vw, 38px);
  line-height: 1.02;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 10px;
}
.rf-form-headline:focus { outline: none; }
.rf-form-subline { text-align: center; color: hsl(0 0% 72%); font-size: 15.5px; line-height: 1.5; margin: 0 0 20px; }
.rf-calendar-frame {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
}

/* ── footer ── */
.rf-footer {
  text-align: center;
  padding: 28px 20px 40px;
  font-size: 13px;
  color: hsl(0 0% 45%);
}

/* ── mobile ── */
@media (max-width: 720px) {
  .rf-pillars { grid-template-columns: 1fr; }
  .rf-section { padding-top: 48px; padding-bottom: 48px; }
  .rf-form-card { padding: 22px 16px 18px; }
}
`;
