"use client";
import { Layout, PageHero, CTABlock } from "@/components/shared";

const PRIVACY_EFFECTIVE = "May 31, 2026";

const PRIVACY_TOC = [
  ["who-we-are", "Who we are"],
  ["info-we-collect", "Information we collect"],
  ["booking-form", "Our booking form & GoHighLevel"],
  ["cookies", "Cookies"],
  ["how-we-use", "How we use your information"],
  ["how-we-share", "How we share information"],
  ["retention", "How long we keep your data"],
  ["your-rights", "Your privacy rights"],
  ["access-delete", "Access or delete your information"],
  ["security", "How we protect your information"],
  ["children", "Children's privacy"],
  ["changes", "Changes to this policy"],
  ["contact", "Contact us"],
];

function PrivacyPage() {
  return (
    <Layout active={null}>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy Policy</>}
        sub="Plain-English version: we only collect what you type into our booking form, we use it to get back to you and schedule a time, and you can ask us to delete it any time."
      />

      <section className="cc-section cc-section--card">
        <div className="cc-container">
          <div className="cc-legal">
            <p className="cc-legal__meta">Effective date: {PRIVACY_EFFECTIVE} · Last updated: {PRIVACY_EFFECTIVE}</p>

            {/* TOC */}
            <nav className="cc-legal__toc" aria-label="On this page">
              <div className="cc-legal__toc-h">On this page</div>
              <ol>
                {PRIVACY_TOC.map(([id, label]) => (
                  <li key={id}><a href={`#${id}`}>{label}</a></li>
                ))}
              </ol>
            </nav>

            <p className="cc-legal__lead">
              This Privacy Policy describes how Pierson Digital ("Pierson Digital," "we," "us," or "our") handles
              the information you share with us when you visit our website or submit our booking form. We've written
              it to be readable. If anything here is unclear, email us at <a href="mailto:hello@piersondigitalmarketing.com">hello@piersondigitalmarketing.com</a> and we'll explain.
            </p>

            <section id="who-we-are">
              <h2>Who we are</h2>
              <p>
                Pierson Digital is a full-service digital marketing agency based in <strong>Champaign, Illinois</strong>.
                We provide SEO, Meta Ads, custom websites, and CRM & automation for businesses, and we work with
                customers across the entire United States. This policy covers the website at piersondigitalmarketing.com and
                the booking form on it.
              </p>
            </section>

            <section id="info-we-collect">
              <h2>Information we collect</h2>
              <p>The main way we collect information is when you fill out and submit our booking form. That can include:</p>
              <ul>
                <li><strong>Your name</strong></li>
                <li><strong>Your email address</strong></li>
                <li><strong>Your phone number</strong></li>
                <li><strong>Scheduling details</strong> — the date and time you choose, and anything you type into the form (for example, a note about your business or what you're looking for)</li>
              </ul>
              <p>
                We also collect a limited amount of basic technical information automatically, such as general usage
                data and information set by cookies (see the Cookies section below). We do not ask for, and you should
                not submit, sensitive information such as financial account numbers or government ID numbers through the form.
              </p>
            </section>

            <section id="booking-form">
              <h2>Our booking form & GoHighLevel</h2>
              <p>
                Our booking form is provided by <strong>GoHighLevel (GHL)</strong>, a third-party software platform.
                When you submit the form, your information is sent to, processed by, and stored within GoHighLevel
                <strong> on Pierson Digital' behalf</strong>. In other words, GoHighLevel acts as our service provider for
                handling booking submissions — it holds the data so we can read it and respond to you.
              </p>
              <p>
                Because the form is embedded from GoHighLevel, the GoHighLevel embed may set its own cookies in your
                browser and may collect technical information as part of delivering and securing the form. GoHighLevel's
                handling of that information is also governed by GoHighLevel's own privacy practices. We encourage you to
                review GoHighLevel's privacy policy if you'd like more detail on how they operate as our processor.
              </p>
            </section>

            <section id="cookies">
              <h2>Cookies</h2>
              <p>
                A cookie is a small file a website stores in your browser. Our site, and the embedded GoHighLevel booking
                form, may use cookies to keep the form working correctly, remember basic preferences, and understand
                general site usage. You can control or delete cookies through your browser settings. Blocking cookies may
                affect how the booking form functions.
              </p>
            </section>

            <section id="how-we-use">
              <h2>How we use your information</h2>
              <p>We use the information you submit through the booking form to:</p>
              <ul>
                <li>Respond to your request and contact you back</li>
                <li>Schedule and confirm a call or appointment with you</li>
                <li>Answer questions you've asked and provide the information you requested</li>
                <li>Keep a basic record of our communication with you</li>
              </ul>
              <p>
                We do not sell your personal information. We use it to do what you reached out for: get in touch and
                set up a time.
              </p>
            </section>

            <section id="how-we-share">
              <h2>How we share information</h2>
              <p>We share information only in limited ways:</p>
              <ul>
                <li><strong>With GoHighLevel</strong>, which stores and processes booking submissions for us, as described above.</li>
                <li><strong>With service providers</strong> who help us operate (for example, email or hosting), only as needed to do their job for us.</li>
                <li><strong>When required by law</strong>, such as to comply with a valid legal request, or to protect our rights, safety, or property.</li>
              </ul>
              <p>We do not sell or rent your personal information to third parties for their own marketing.</p>
            </section>

            <section id="retention">
              <h2>How long we keep your data</h2>
              <p>
                We keep booking information for as long as we need it to respond to you and, where relevant, to maintain a
                record of our relationship or comply with legal obligations. If you ask us to delete your information, we
                will do so unless we're required to keep it. Because submissions are stored in GoHighLevel, deleting your
                data includes removing it from our GoHighLevel account.
              </p>
            </section>

            <section id="your-rights">
              <h2>Your privacy rights</h2>
              <p>
                Pierson Digital serves customers nationwide. Depending on where you live, you may have specific rights over
                your personal information. <strong>Residents of certain states — including California, and other states with
                comprehensive privacy laws such as Colorado, Connecticut, Virginia, and Utah —</strong> may have the right to:
              </p>
              <ul>
                <li><strong>Access</strong> the personal information we hold about you</li>
                <li><strong>Correct</strong> inaccurate personal information</li>
                <li><strong>Delete</strong> your personal information</li>
                <li><strong>Opt out</strong> of the "sale" or "sharing" of your personal information</li>
                <li><strong>Not be discriminated against</strong> for exercising these rights</li>
              </ul>
              <div className="cc-legal__callout">
                <p>
                  <strong>We do not sell your personal information</strong> in the everyday sense of the word, and we do not
                  share it for cross-context behavioral advertising. To exercise any of the rights above — including a request
                  to access, delete, or opt out — email us at <a href="mailto:hello@piersondigitalmarketing.com">hello@piersondigitalmarketing.com</a> with
                  the details of your request. We may need to verify your identity before we act on it, and you can use an
                  authorized agent where the law allows.
                </p>
              </div>
            </section>

            <section id="access-delete">
              <h2>Access or delete your information</h2>
              <p>
                No matter where you live, you can ask us what booking information we hold about you, ask us to correct it,
                or ask us to delete it. Just email <a href="mailto:hello@piersondigitalmarketing.com">hello@piersondigitalmarketing.com</a> from
                the email address you used, or include enough detail for us to find your submission. We'll confirm when it's done.
              </p>
            </section>

            <section id="security">
              <h2>How we protect your information</h2>
              <p>
                We rely on reputable providers, including GoHighLevel, to store booking data, and we take reasonable steps to
                protect the information you share. No method of transmitting or storing data is 100% secure, so we can't
                guarantee absolute security — but we work to keep your information safe and limit access to it.
              </p>
            </section>

            <section id="children">
              <h2>Children's privacy</h2>
              <p>
                Our website and services are intended for businesses and adults. We do not knowingly collect personal
                information from children under 13. If you believe a child has submitted information to us, contact us and
                we'll delete it.
              </p>
            </section>

            <section id="changes">
              <h2>Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we'll change the "Last updated" date at the
                top of this page. If the changes are significant, we'll make that clear. Your continued use of the site after
                an update means you accept the revised policy.
              </p>
            </section>

            <section id="contact">
              <h2>Contact us</h2>
              <p>
                Questions about this policy, or a privacy request? Email <a href="mailto:hello@piersondigitalmarketing.com">hello@piersondigitalmarketing.com</a>.
                Pierson Digital is based in Champaign, Illinois, USA.
              </p>
            </section>
          </div>
        </div>
      </section>

      <CTABlock title="Still have questions?" sub="If anything here isn't clear, reach out — we'll give you a straight answer." cta="Book a free strategy call" />
    </Layout>
  );
}

export default PrivacyPage;
