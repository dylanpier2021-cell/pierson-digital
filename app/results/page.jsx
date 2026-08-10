import ClientOnly from "@/components/ClientOnly";
import Results from "@/components/pages/Results";

export const metadata = {
  title: "Results — Real Growth for Businesses Nationwide",
  description: "Real results from Pierson Digital clients: page-1 SEO rankings within 60–90 days, Facebook & Instagram leads from Meta Ads, custom websites live in 5–7 days, and CRM automation trusted by 10,000+ companies. Serving businesses nationwide.",
  alternates: { canonical: "/results" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Results />
    </ClientOnly>
  );
}
