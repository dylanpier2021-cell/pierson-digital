import ClientOnly from "@/components/ClientOnly";
import Home from "@/components/pages/Home";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <ClientOnly>
      <Home />
    </ClientOnly>
  );
}
