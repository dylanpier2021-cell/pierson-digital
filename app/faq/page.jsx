import ClientOnly from "@/components/ClientOnly";
import Faq from "@/components/pages/Faq";

export const metadata = {
  title: "FAQ — SEO, Meta Ads, Websites & CRM Questions",
  description: "Common questions about Pierson Digital: pricing, contracts, SEO timelines, Meta Ads, custom websites, and CRM & marketing automation. Learn how our digital marketing agency helps businesses nationwide generate leads — no contracts, month-to-month.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Faq />
    </ClientOnly>
  );
}
