import ClientOnly from "@/components/ClientOnly";
import ReviewEngine from "@/components/pages/ReviewEngine";

export const metadata = {
  title: "Google Review Automation — CRM & Marketing Automation",
  description: "See how Pierson Digital's CRM review engine works: enter a customer's name and the system texts a one-tap Google review link. Happy customers post to Google, unhappy ones reach you privately — part of our CRM & marketing automation service.",
  alternates: { canonical: "/review-engine" },
};

export default function Page() {
  return (
    <ClientOnly>
      <ReviewEngine />
    </ClientOnly>
  );
}
