import ClientOnly from "@/components/ClientOnly";
import Roofers from "@/components/pages/Roofers";

export const metadata = {
  title: "5 Booked Roofing Appointments in 30 Days — Guaranteed",
  description:
    "We put roofing companies at #1 on Google Maps — and guarantee 5 booked appointments in your first 30 days, or we work for free until we do. See if you qualify.",
  alternates: { canonical: "/roofers" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Roofers />
    </ClientOnly>
  );
}
