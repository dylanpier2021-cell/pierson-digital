import ClientOnly from "@/components/ClientOnly";
import Pricing from "@/components/pages/Pricing";

export const metadata = {
  title: "Pricing — SEO, Meta Ads, Websites & CRM Plans",
  description: "Simple, no-contract pricing from Pierson Digital: SEO at $997/mo, Meta Ads at $997/mo, custom websites from $97/mo, and CRM & automation at $297/mo — or the Full Growth System bundle at $2,000/mo. Month-to-month, cancel anytime.",
  alternates: { canonical: "/pricing" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Pricing />
    </ClientOnly>
  );
}
