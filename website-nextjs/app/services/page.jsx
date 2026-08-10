import ClientOnly from "@/components/ClientOnly";
import Services from "@/components/pages/Services";

export const metadata = {
  title: "Digital Marketing Services — SEO, Meta Ads, Websites & CRM",
  description: "Four services from Pierson Digital: SEO with a free custom website, Meta Ads for Facebook & Instagram, custom lead-generating web design, and CRM & marketing automation with missed-call text-back. Plus the Full Growth System bundle. Serving businesses nationwide — no contracts.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Services />
    </ClientOnly>
  );
}
