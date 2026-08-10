import ClientOnly from "@/components/ClientOnly";
import BookACall from "@/components/pages/BookACall";

export const metadata = {
  title: "Book a Free Strategy Call",
  description: "Book a free 15-minute strategy call with Pierson Digital. We'll map out how SEO, Meta Ads, a custom website, and CRM automation can grow your business online. No pitch slides, no pressure, no contracts.",
  alternates: { canonical: "/book-a-call" },
};

export default function Page() {
  return (
    <ClientOnly>
      <BookACall />
    </ClientOnly>
  );
}
