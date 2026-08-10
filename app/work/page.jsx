import ClientOnly from "@/components/ClientOnly";
import Work from "@/components/pages/Work";

export const metadata = {
  title: "Selected Work",
  description: "A private portfolio of live Pierson Digital client websites.",
  alternates: { canonical: "/work" },
  // Unlisted page: keep it out of search results and AI indexes.
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <ClientOnly>
      <Work />
    </ClientOnly>
  );
}
