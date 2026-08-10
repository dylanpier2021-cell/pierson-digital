import ClientOnly from "@/components/ClientOnly";
import LocalePage from "@/components/pages/Locale";
import { LOCALES, LOCALE_MAP } from "@/components/locales.data";
import { notFound } from "next/navigation";

// Only the ported locale slugs are valid; anything else 404s.
export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: l.slug }));
}
export const dynamicParams = false;

export function generateMetadata({ params }) {
  const l = LOCALE_MAP[params.locale];
  if (!l) return {};
  return {
    // absolute → bypass the "%s | Pierson Digital" template (title already brands itself)
    title: { absolute: l.title },
    description: l.description,
    alternates: { canonical: `/${l.slug}` },
    openGraph: {
      title: l.title,
      description: l.description,
      url: `/${l.slug}`,
    },
  };
}

export default function Page({ params }) {
  const locale = LOCALE_MAP[params.locale];
  if (!locale) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pierson Digital",
    url: `https://piersondigitalmarketing.com/${locale.slug}`,
    description: locale.description,
    areaServed: locale.region,
    address: {
      "@type": "PostalAddress",
      addressRegion: locale.region,
      addressCountry: "US",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ClientOnly>
        <LocalePage locale={locale} />
      </ClientOnly>
    </>
  );
}
