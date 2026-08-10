import ClientOnly from "@/components/ClientOnly";
import Privacy from "@/components/pages/Privacy";

export const metadata = {
  title: "Privacy Policy — Pierson Digital",
  description: "How Pierson Digital collects, uses, and protects the information you submit through our booking form. Plain-English privacy policy for a Champaign, IL digital marketing agency serving businesses nationwide.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Privacy />
    </ClientOnly>
  );
}
