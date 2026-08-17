import ClientOnly from "@/components/ClientOnly";
import Roofers from "@/components/pages/Roofers";

export const metadata = {
  title: "5 Booked Roofing Calls in 30 Days — Guaranteed",
  description:
    "We put roofing companies at #1 on Google Maps — and guarantee 5 booked calls in your first 30 days, or we work for free until we do. For roofing companies doing $60k+/month.",
  alternates: { canonical: "/roofers" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Roofers />
    </ClientOnly>
  );
}
