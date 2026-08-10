import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://piersondigitalmarketing.com"),
  title: {
    default: "Digital Marketing Agency | SEO, Meta Ads, Websites & CRM | Pierson Digital",
    template: "%s | Pierson Digital",
  },
  description:
    "Pierson Digital is a full-service digital marketing agency — SEO, Meta Ads, custom websites, and CRM — serving businesses nationwide. No contracts. Results-focused.",
  keywords: [
    "digital marketing agency",
    "SEO",
    "Meta Ads",
    "Facebook ads",
    "Instagram ads",
    "custom websites",
    "web design",
    "CRM",
    "marketing automation",
    "missed-call text-back",
    "local SEO",
    "lead generation",
  ],
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Pierson Digital",
    title: "Digital Marketing Agency | SEO, Meta Ads, Websites & CRM | Pierson Digital",
    description:
      "Full-service digital marketing agency — SEO, Meta Ads, custom websites, and CRM — serving businesses nationwide. No contracts. Results-focused.",
    url: "https://piersondigitalmarketing.com",
    images: ["/assets/favicon.png"],
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pierson Digital",
  url: "https://piersondigitalmarketing.com",
  description:
    "Full-service digital marketing agency offering SEO, Meta Ads, websites, and CRM nationwide.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: "https://piersondigitalmarketing.com/book-a-call",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1478279757334117');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1478279757334117&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
