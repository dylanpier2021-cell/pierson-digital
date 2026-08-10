"use client";
// Shared layout: Nav + Footer + tweaks wrapper for every page.
import React from "react";
import { Icon } from "./icons";
import { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakColor } from "./tweaks";
import { LOCALES } from "./locales.data";
const { useState: useStateL, useEffect: useEffectL, useRef: useRefL } = React;

// Brand mark — Pierson Digital monogram (blue P / green D) + wordmark.
// The monogram is a transparent PNG that reads on light and dark nav alike;
// the wordmark text inherits the theme foreground so it flips automatically.
function BrandLogo({ compact }) {
  if (compact) {
    return (
      <img
        src="/assets/logo-pd.png"
        alt="Pierson Digital logo"
        width="34"
        height="34"
        className="cc-brand__icon"
        style={{ width: 34, height: 34, objectFit: "contain" }}
      />
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <img
        src="/assets/logo-pd.png"
        alt="Pierson Digital logo"
        width="34"
        height="34"
        style={{ width: 34, height: 34, objectFit: "contain" }}
      />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 23,
          letterSpacing: "0.005em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        Pierson <span style={{ color: "hsl(var(--accent))" }}>Digital</span>
      </span>
    </span>
  );
}
const SERVICES_DROPDOWN = {
  features: [
    {
      title: "SEO",
      desc: "Page-1 rankings for the terms your customers search — plus a free custom website with every plan.",
      href: "/services#seo",
      icon: "search",
      mockKind: "steps",
    },
    {
      title: "CRM & Automation",
      desc: "Missed-call text-back, AI chat, and Google review automation — trusted by 10,000+ companies.",
      href: "/services#crm",
      icon: "phoneMissed",
      mockKind: "sms",
    },
  ],
  items: [
    { title: "Meta Ads", desc: "Facebook & Instagram leads that convert.", href: "/services#meta-ads", icon: "trending" },
    { title: "Custom Websites", desc: "Lead-generating sites, live in 5–7 days.", href: "/services#websites", icon: "globe" },
    { title: "The Full Growth System", desc: "SEO + Ads + Website + CRM — $2,000/mo.", href: "/pricing", icon: "bolt" },
    { title: "All services overview", desc: "Every service, side by side.", href: "/services", icon: "arrowRight" },
  ],
};

const HOW_DROPDOWN = {
  features: [
    {
      title: "Our process, end to end",
      desc: "From strategy call to live campaigns — see exactly how we get you growing.",
      href: "/how-it-works",
      icon: "bolt",
      mockKind: "steps",
    },
    {
      title: "Real client results",
      desc: "Rankings, leads, and reviews we've driven for businesses nationwide.",
      href: "/results",
      icon: "trending",
      mockKind: "stars",
    },
  ],
  items: [
    { title: "SEO in 60–90 days", desc: "How we get you to page 1.", href: "/how-it-works", icon: "search" },
    { title: "Websites live in 5–7 days", desc: "From kickoff to launch.", href: "/how-it-works", icon: "calendar" },
    { title: "Why one team wins", desc: "SEO, ads, web & CRM together.", href: "/how-it-works", icon: "trending" },
    { title: "Book a strategy call", desc: "15 min, no pressure.", href: "/book-a-call", icon: "arrowUpRight" },
  ],
};

const NAV_LINKS = [
  { label: "Services", href: "/services", key: "services", dropdown: SERVICES_DROPDOWN },
  { label: "How it works", href: "/how-it-works", key: "how-it-works", dropdown: HOW_DROPDOWN },
  { label: "Pricing", href: "/pricing", key: "pricing" },
  { label: "Results", href: "/results", key: "results" },
  { label: "FAQ", href: "/faq", key: "faq" },
];

// Renders the visual mock at the bottom of a featured dropdown card.
function FeatureMock({ kind }) {
  if (kind === "sms") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
        <div style={{ alignSelf: "flex-start", background: "hsl(var(--muted))", borderRadius: 12, borderBottomLeftRadius: 3, padding: "5px 10px", fontSize: 10.5, color: "hsl(var(--subtle-foreground))", maxWidth: "75%" }}>
          Sorry we missed you — how can we help?
        </div>
        <div style={{ alignSelf: "flex-end", background: "hsl(var(--accent))", color: "white", borderRadius: 12, borderBottomRightRadius: 3, padding: "5px 10px", fontSize: 10.5, maxWidth: "70%" }}>
          Need a quote today
        </div>
      </div>
    );
  }
  if (kind === "stars") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon.star key={i} size={18} stroke={0} style={{ fill: "#f59e0b" }} />
          ))}
        </div>
        <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))", letterSpacing: "0.04em" }}>
          4.9 · 412
        </div>
      </div>
    );
  }
  if (kind === "steps") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        {[1, 2, 3, 4].map((n, i) => (
          <React.Fragment key={n}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%",
              background: i < 2 ? "hsl(var(--foreground))" : "hsl(var(--card))",
              border: "1px solid hsl(var(--border-strong))",
              color: i < 2 ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
              display: "grid", placeItems: "center",
              fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600,
              flexShrink: 0,
            }}>{n}</div>
            {i < 3 && <div style={{ flex: 1, height: 1, background: i < 1 ? "hsl(var(--foreground))" : "hsl(var(--border-strong))" }} />}
          </React.Fragment>
        ))}
      </div>
    );
  }
  return null;
}

// Dropdown panel rendered alongside the trigger; CSS :hover on .cc-nav__item
// controls visibility (with a transition-delay so the panel stays open while
// the cursor moves between the trigger and the panel). No JS hover state.
function NavDropdown({ dropdown }) {
  return (
    <div className="cc-dropdown">
      <div className="cc-dropdown__features">
        {dropdown.features.map((f) => {
          const Ic = Icon[f.icon] || Icon.arrowRight;
          return (
            <a key={f.title} href={f.href} className="cc-dropdown__feature">
              <div className="cc-dropdown__feature-icon"><Ic size={18} /></div>
              <div className="cc-dropdown__feature-title">{f.title}</div>
              <div className="cc-dropdown__feature-desc">{f.desc}</div>
              <div className="cc-dropdown__feature-mock">
                <FeatureMock kind={f.mockKind} />
              </div>
            </a>
          );
        })}
      </div>
      <div className="cc-dropdown__items">
        {dropdown.items.map((it) => {
          const Ic = Icon[it.icon] || Icon.arrowRight;
          return (
            <a key={it.title} href={it.href} className="cc-dropdown__item">
              <div className="cc-dropdown__item-icon"><Ic size={15} /></div>
              <div>
                <div className="cc-dropdown__item-title">{it.title}</div>
                <div className="cc-dropdown__item-desc">{it.desc}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function NavItem({ link, active }) {
  const has = !!link.dropdown;
  return (
    <div className="cc-nav__item">
      <a
        href={link.href}
        className="cc-nav__link"
        data-active={active === link.key ? "true" : "false"}
        data-has-dropdown={has ? "true" : "false"}
        style={!has && active === link.key ? { color: "hsl(var(--foreground))", background: "hsl(var(--muted))" } : null}
        aria-haspopup={has ? "true" : undefined}
      >
        {link.label}
        {has && <Icon.chevronDown size={11} stroke={2} />}
      </a>
      {has && <NavDropdown dropdown={link.dropdown} />}
    </div>
  );
}

function Nav({ active }) {
  const [scrolled, setScrolled] = useStateL(false);
  const [mobileOpen, setMobileOpen] = useStateL(false);
  useEffectL(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;
  return (
    <nav className="cc-nav" data-scrolled={scrolled ? "true" : "false"}>
      <div className="cc-container cc-nav__inner">
        <a href="/" className="cc-nav__brand cc-brand">
          <BrandLogo compact={isMobile} />
        </a>
        {!isMobile && (
          <div className="cc-nav__links">
            {NAV_LINKS.map((l) => (
              <NavItem key={l.key} link={l} active={active} />
            ))}
          </div>
        )}
        <div className="cc-nav__cta">
          <a href="/book-a-call" className="cc-btn cc-btn--sm">
            Book a Call <Icon.arrowUpRight size={14} />
          </a>
          {isMobile && (
            <button className="cc-btn cc-btn--ghost cc-btn--sm" style={{ width: 36, height: 36, padding: 0, justifyContent: "center", borderRadius: "50%" }} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <Icon.x size={16} /> : <Icon.menu size={16} />}
            </button>
          )}
        </div>
      </div>
      {isMobile && mobileOpen && (
        <div style={{ borderTop: "1px solid hsl(var(--border))", background: "hsl(var(--background))" }}>
          <div className="cc-container" style={{ padding: "12px 24px" }}>
            {NAV_LINKS.map((l) => (
              <React.Fragment key={l.key}>
                <a href={l.href} className="cc-nav__link" style={{ display: "block", padding: "12px 8px", fontWeight: 600 }}>
                  {l.label}
                </a>
                {l.dropdown && (
                  <div style={{ paddingLeft: 16, marginBottom: 4 }}>
                    {[...l.dropdown.features, ...l.dropdown.items].map((s) => (
                      <a key={s.title} href={s.href} className="cc-nav__link" style={{ display: "block", padding: "8px 8px", fontSize: 13, color: "hsl(var(--muted-foreground))" }}>
                        {s.title}
                      </a>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Real business contact, surfaced in the footer.
// phoneLabel is intentionally empty until a public number is provided —
// the phone row stays hidden rather than showing a placeholder. Pierson is
// booking-first: the primary contact path is the free strategy call.
const CONTACT = {
  phoneLabel: "",
  phoneHref: "",
  email: "hello@piersondigitalmarketing.com",
  location: "Champaign, IL · Serving all 50 states",
};
// No public social profiles wired yet — add Instagram/Facebook/LinkedIn URLs here to show icons.
const SOCIALS = [];

function Footer() {
  const cols = [
    { h: "Product", links: [
      { l: "Services overview", href: "/services" },
      { l: "How it works", href: "/how-it-works" },
      { l: "Pricing", href: "/pricing" },
      { l: "Results", href: "/results" },
      { l: "FAQ", href: "/faq" },
    ]},
    { h: "Services", links: [
      { l: "SEO", href: "/services#seo" },
      { l: "Meta Ads", href: "/services#meta-ads" },
      { l: "Custom Websites", href: "/services#websites" },
      { l: "CRM & Automation", href: "/services#crm" },
      { l: "The Full Growth System", href: "/pricing" },
    ]},
    { h: "Company", links: [
      { l: "Book a call", href: "/book-a-call" },
      { l: "Contact", href: "/book-a-call" },
      { l: "Our work", href: "/work" },
      { l: "Privacy Policy", href: "/privacy" },
      { l: "Terms & Conditions", href: "/terms" },
    ]},
  ];
  return (
    <footer className="cc-footer">
      <div className="cc-container">
        <div className="cc-footer__grid">
          <div>
            <a href="/" className="cc-nav__brand cc-brand" style={{ marginBottom: 16, display: "inline-flex" }}>
              <BrandLogo />
            </a>
            <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", lineHeight: 1.6, maxWidth: 320, margin: "12px 0 0" }}>
              Full-service digital marketing agency — SEO, Meta Ads, custom websites, and CRM — serving businesses nationwide. No contracts. Results-focused.
            </p>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "20px 0 0", fontSize: 13.5 }}>
              <a href={`tel:${CONTACT.phoneHref}`} style={{ display: CONTACT.phoneLabel ? "inline-flex" : "none", alignItems: "center", gap: 9, color: "hsl(var(--foreground))", textDecoration: "none", fontWeight: 500 }}>
                <Icon.phone size={15} style={{ color: "hsl(var(--muted-foreground))", flexShrink: 0 }} /> {CONTACT.phoneLabel}
              </a>
              <a href={`mailto:${CONTACT.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "hsl(var(--muted-foreground))", textDecoration: "none" }}>
                <Icon.mail size={15} style={{ flexShrink: 0 }} /> Email us
              </a>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "hsl(var(--muted-foreground))" }}>
                <Icon.mapPin size={15} style={{ flexShrink: 0 }} /> {CONTACT.location}
              </span>
            </div>

            {/* Social */}
            {SOCIALS.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {SOCIALS.map((s) => {
                  const Ic = Icon[s.icon];
                  return (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}
                      style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid hsl(var(--border))", display: "grid", placeItems: "center", color: "hsl(var(--muted-foreground))", background: "hsl(var(--card))", transition: "all 0.18s var(--ease-default)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "hsl(var(--accent))"; e.currentTarget.style.borderColor = "hsl(var(--accent))"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "hsl(var(--muted-foreground))"; e.currentTarget.style.borderColor = "hsl(var(--border))"; }}>
                      <Ic size={17} />
                    </a>
                  );
                })}
              </div>
            )}

            {/* Meta / Facebook disclaimer — we run Meta Ads + a Meta Pixel */}
            <p style={{ fontSize: 11.5, color: "hsl(var(--muted-foreground))", lineHeight: 1.6, maxWidth: 340, margin: "20px 0 0", opacity: 0.75 }}>
              This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is not endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc. Results may vary. Testimonials are not claimed to represent typical results.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h} className="cc-footer__col">
              <h5>{c.h}</h5>
              {c.links.map((l) => <a key={l.l} href={l.href}>{l.l}</a>)}
            </div>
          ))}
        </div>

        {/* Areas we serve — internal links to every localized landing page */}
        <div style={{ borderTop: "1px solid hsl(var(--border))", paddingTop: 24, marginTop: 8 }}>
          <h5 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)", color: "hsl(var(--muted-foreground))", margin: "0 0 14px", fontWeight: 500 }}>
            Areas we serve
          </h5>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px" }}>
            {LOCALES.map((l) => (
              <a key={l.slug} href={`/${l.slug}`} style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", textDecoration: "none", whiteSpace: "nowrap" }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="cc-footer__bottom">
          <span>© 2026 Pierson Digital. All rights reserved.</span>
          <span style={{ display: "inline-flex", gap: 18, flexWrap: "wrap" }}>
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
            <a href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms &amp; Conditions</a>
          </span>
          <span>PIERSON DIGITAL · BUILT FOR BUSINESSES NATIONWIDE</span>
        </div>
      </div>
    </footer>
  );
}

// Small page-hero used by inner pages (not the home hero, that's its own thing).
function PageHero({ eyebrow, title, sub, cta, ctaHref = "/book-a-call", children }) {
  return (
    <section className="cc-section cc-section--card cc-section--hero">
      <div className="cc-container" style={{ position: "relative", textAlign: "center" }}>
        <div className="cc-stack-md" style={{ maxWidth: 760, margin: "0 auto", alignItems: "center" }}>
          {eyebrow && <div className="cc-eyebrow">{eyebrow}</div>}
          <h1 className="cc-h1" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>{title}</h1>
          {sub && <p className="cc-lede" style={{ maxWidth: 640, margin: "0 auto" }}>{sub}</p>}
          {cta && (
            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {typeof ctaHref === "string" && ctaHref.startsWith("#") ? (
                <button
                  type="button"
                  className="cc-btn"
                  onClick={() => {
                    const el = document.querySelector(ctaHref);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >{cta} <Icon.arrowUpRight size={14} /></button>
              ) : (
                <a href={ctaHref} className="cc-btn">{cta} <Icon.arrowUpRight size={14} /></a>
              )}
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Small "in-page CTA" block reused on every subpage
function CTABlock({ title = "Ready to grow your business online?", sub = "Book a free 15-minute strategy call. We'll review your current digital presence, spot quick wins, and outline exactly what we'd do for your business.", cta = "Book a free strategy call" }) {
  return (
    <section className="cc-section" style={{ padding: "32px 0 96px" }}>
      <div style={{ margin: "0 14px" }}>
        <div style={{
          padding: "104px 40px 136px",
          textAlign: "center",
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 32,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Aurora glow fanning up from the bottom + dot grid */}
          <div className="cc-aurora" aria-hidden="true">
            <div className="cc-aurora__glow" />
            <div className="cc-aurora__dots" />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="cc-eyebrow" style={{ marginBottom: 12 }}>READY WHEN YOU ARE</div>
            <h2 className="cc-h2" style={{ maxWidth: 720, margin: "0 auto" }}>{title}</h2>
            <p className="cc-lede" style={{ margin: "16px auto 32px" }}>{sub}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/book-a-call" className="cc-btn cc-btn--lg">{cta} <Icon.arrowUpRight size={14} /></a>
              <a href="/pricing" className="cc-btn cc-btn--ghost cc-btn--lg">See pricing</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Layout wrapper: nav + page + footer + tweaks (accent/dark only — variant is per page)
const TWEAK_DEFAULTS_SHARED = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "#2563EB"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  "#2563EB": { h: 217, s: 91, l: 60, soft_l: 96 },
  "#219045": { h: 142, s: 63, l: 35, soft_l: 94 },
  "#0F172A": { h: 222, s: 47, l: 11, soft_l: 96 },
  "#059669": { h: 158, s: 91, l: 32, soft_l: 94 },
};

function Layout({ active, children }) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_SHARED);
  useEffectL(() => {
    const root = document.documentElement;
    const preset = ACCENT_PRESETS[t.accent] || ACCENT_PRESETS["#2563EB"];
    root.style.setProperty("--accent", `${preset.h} ${preset.s}% ${preset.l}%`);
    root.style.setProperty("--accent-soft", `${preset.h} ${preset.s}% ${preset.soft_l}%`);
    root.style.setProperty("--ring", `${preset.h} ${preset.s}% ${preset.l}%`);
    root.dataset.theme = t.dark ? "dark" : "light";
  }, [t.accent, t.dark]);

  return (
    <>
      <Nav active={active} />
      <main>{children}</main>
      <Footer />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Look & feel">
          <TweakColor
            label="Accent color"
            value={t.accent}
            options={["#2563EB", "#219045", "#0F172A", "#059669"]}
            onChange={(v) => setTweak("accent", v)}
          />
          <TweakToggle
            label="Dark mode"
            value={t.dark}
            onChange={(v) => setTweak("dark", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

export { Nav, Footer, Layout, PageHero, CTABlock, NAV_LINKS };
