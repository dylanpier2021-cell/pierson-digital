import ClientOnly from "@/components/ClientOnly";
import Terms from "@/components/pages/Terms";

export const metadata = {
  title: "Terms & Conditions — Pierson Digital",
  description: "The terms of use for the Pierson Digital website. Pierson Digital provides digital marketing services — SEO, Meta Ads, custom websites, and CRM — to businesses across the United States, from Champaign, Illinois.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Terms />
    </ClientOnly>
  );
}
