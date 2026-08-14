/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Legacy standalone service URLs → the consolidated Services page sections.
      { source: "/seo", destination: "/services#seo", permanent: true },
      { source: "/meta-ads", destination: "/services#meta-ads", permanent: true },
      { source: "/websites", destination: "/services#websites", permanent: true },
      { source: "/crm", destination: "/services#crm", permanent: true },
      // Roofing funnel — both URLs work in ads.
      { source: "/roofer", destination: "/roofers", permanent: true },
    ];
  },
};

export default nextConfig;
