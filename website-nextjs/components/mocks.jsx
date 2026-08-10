import { Icon } from "./icons";

// ===== Mocked UI illustrations that sit inside feature cards =====
// Inspired by the reference: small "chip cards" + UI-ish artifacts on a soft background.

function MockMissedCall() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: 24 }}>
      <div className="cc-chip-card cc-fade-up" style={{ top: 36, left: 24, right: 24, animationDelay: "0.05s" }}>
        <div className="cc-chip-card__dot" style={{ background: "#fee2e2", color: "#dc2626" }}>
          <Icon.phoneMissed size={16} stroke={2} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="cc-chip-card__title">Missed call <span style={{ color: "hsl(var(--muted-foreground))", fontWeight: 400, marginLeft: 4 }}>· 10s ago</span></div>
          <div className="cc-chip-card__meta">from (555) 218-4567 · new lead inquiry</div>
        </div>
      </div>

      <div className="cc-chip-card cc-fade-up" style={{ top: 116, left: 48, right: 16, animationDelay: "0.35s" }}>
        <div className="cc-chip-card__dot" style={{ background: "hsl(var(--accent-soft))", color: "hsl(var(--accent))" }}>
          <Icon.message size={16} stroke={2} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="cc-chip-card__title">Auto-text sent <span style={{ color: "hsl(142 71% 45%)", fontWeight: 500, marginLeft: 4 }}>· delivered</span></div>
          <div className="cc-chip-card__meta">"Sorry we missed you — when's a good time?"</div>
        </div>
      </div>

      <div className="cc-chip-card cc-fade-up" style={{ top: 196, left: 24, right: 40, animationDelay: "0.7s" }}>
        <div className="cc-chip-card__dot" style={{ background: "#dcfce7", color: "#16a34a" }}>
          <Icon.calendar size={16} stroke={2} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="cc-chip-card__title">Booked · Thu 9am</div>
          <div className="cc-chip-card__meta">Customer replied in 47 seconds</div>
        </div>
      </div>
    </div>
  );
}

function MockFollowUp() {
  // A "fanned out" stack of file/touchpoint chips like the reference second card
  const items = [
    { name: "day-1.sms", desc: "Hey — still need that quote?" },
    { name: "day-3.email", desc: "Here's what we'd do at your place…" },
    { name: "day-7.call", desc: "Quick voicemail drop, no ringback" },
    { name: "day-30.sms", desc: "Spring slot just opened up." },
    { name: "day-90.email", desc: "Just checking in — still interested?" },
    { name: "day-365.sms", desc: "It's been a year — checkin?" },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, padding: "32px 0 0 32px", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 12, transform: "translateY(0)" }}>
        {items.map((it, i) => (
          <div key={i} className="cc-fade-up" style={{
            flex: "0 0 130px",
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 10,
            padding: 12,
            boxShadow: "var(--shadow-sm)",
            animationDelay: `${i * 0.06}s`,
            opacity: 1 - i * 0.05,
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "hsl(var(--muted-foreground))", marginBottom: 8 }}>
              {it.name}
            </div>
            <div style={{ fontSize: 11.5, lineHeight: 1.4, color: "hsl(var(--subtle-foreground))" }}>{it.desc}</div>
          </div>
        ))}
      </div>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, transparent 60%, hsl(var(--page)))",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 20, left: 32, right: 32,
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "var(--font-mono)", fontSize: 10.5,
        color: "hsl(var(--muted-foreground))",
        textTransform: "uppercase", letterSpacing: "0.1em",
      }}>
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--accent))" }} />
        <span>52-touchpoint sequence · auto-paused on reply</span>
      </div>
    </div>
  );
}

function MockWebsite() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: 32, display: "grid", placeItems: "center" }}>
      <div style={{
        width: "100%", maxWidth: 320,
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 12,
        boxShadow: "var(--shadow-lift)",
        overflow: "hidden",
      }}>
        {/* fake browser chrome */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--muted))" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5e7eb" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5e7eb" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5e7eb" }} />
          <span style={{
            marginLeft: 12, flex: 1, padding: "3px 10px",
            background: "hsl(var(--card))", borderRadius: 999,
            fontSize: 10, color: "hsl(var(--muted-foreground))",
            fontFamily: "var(--font-mono)",
          }}>yourbusiness.com</span>
        </div>
        {/* fake page */}
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 8 }}>
            Trusted local service, done right.
          </div>
          <div style={{ fontSize: 10.5, color: "hsl(var(--muted-foreground))", marginBottom: 12, lineHeight: 1.4 }}>
            Serving your area. 4.9 ★ from 412 reviews.
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 26, background: "hsl(var(--foreground))", borderRadius: 999, display: "grid", placeItems: "center", color: "hsl(var(--background))", fontSize: 10, fontWeight: 600 }}>
              Get a quote
            </div>
            <div style={{ height: 26, padding: "0 12px", background: "hsl(var(--muted))", borderRadius: 999, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 500 }}>
              Call
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ aspectRatio: "1", background: "hsl(var(--muted))", borderRadius: 6 }} />
            ))}
          </div>
        </div>
      </div>
      <div className="cc-chip-card" style={{ position: "absolute", bottom: 26, right: 26, padding: "8px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600 }}>
          <span style={{
            display: "inline-block", width: 22, height: 22, borderRadius: 6,
            background: "hsl(142 71% 45%)", color: "white", display: "grid", placeItems: "center",
          }}>
            <Icon.trending size={12} stroke={2.4} />
          </span>
          PageSpeed 98
        </div>
      </div>
    </div>
  );
}

function MockReviews() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: 24, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
      {[
        { name: "Maria T.", stars: 5, t: "Showed up exactly when they said they would.", d: "yesterday" },
        { name: "Dale R.", stars: 5, t: "Honest pricing, great service. Recommend.", d: "2d ago" },
        { name: "Kim H.", stars: 5, t: "Texted me back in under a minute. Booked next morning.", d: "4d ago" },
      ].map((r, i) => (
        <div key={i} className="cc-chip-card cc-fade-up" style={{
          position: "relative", left: i * 12, padding: "12px 14px",
          animationDelay: `${i * 0.1}s`,
        }}>
          <div className="cc-chip-card__dot" style={{ background: "hsl(var(--muted))", color: "hsl(var(--foreground))", fontSize: 13, fontWeight: 600 }}>
            {r.name[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <div className="cc-chip-card__title">{r.name}</div>
              <div style={{ display: "flex", gap: 1, color: "#f59e0b" }}>
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Icon.star key={j} size={11} stroke={0} style={{ fill: "currentColor" }} />
                ))}
              </div>
            </div>
            <div className="cc-chip-card__meta" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {r.t}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MockForm() {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        borderRadius: 14,
        padding: 18,
        boxShadow: "var(--shadow-card)",
      }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
          Free quote · 0/3
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {["Name", "Phone or email", "How can we help?"].map((l, i) => (
            <div key={l} style={{
              padding: "8px 12px",
              background: i === 0 ? "hsl(var(--page))" : "transparent",
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
              fontSize: 12,
              color: i === 0 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              {i === 0 && <span style={{ width: 1.5, height: 12, background: "hsl(var(--accent))", animation: "cc-spin 1s steps(2) infinite", animationName: "cc-fade-up" }} />}
              {l}
            </div>
          ))}
          <div style={{
            marginTop: 4, padding: "9px 14px",
            background: "hsl(var(--foreground))", color: "hsl(var(--background))",
            borderRadius: 999, fontSize: 12, fontWeight: 600, textAlign: "center",
          }}>
            Get my quote →
          </div>
        </div>
      </div>
      <div className="cc-chip-card" style={{ position: "absolute", bottom: 20, left: 20, padding: "8px 12px", fontSize: 11 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="cc-live-dot" />
          <span style={{ fontWeight: 500 }}>3 leads captured today</span>
        </div>
      </div>
    </div>
  );
}

export const Mock = { MissedCall: MockMissedCall, FollowUp: MockFollowUp, Website: MockWebsite, Reviews: MockReviews, Form: MockForm };
