import ClientOnly from "@/components/ClientOnly";
import HowItWorks from "@/components/pages/HowItWorks";

export const metadata = {
  title: "How It Works — Digital Marketing That Drives Leads",
  description: "See how Pierson Digital grows your business online — SEO, Meta Ads, a custom website, and CRM automation working together to capture, follow up, and convert leads, with missed-call text-back and Google review automation.",
  alternates: { canonical: "/how-it-works" },
};

export default function Page() {
  return (
    <ClientOnly>
      <HowItWorks />
    </ClientOnly>
  );
}
