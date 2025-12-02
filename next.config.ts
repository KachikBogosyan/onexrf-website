import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/technologies",
        destination: "/resources/technologies",
        permanent: true,
      },
      {
        source: "/technologies/:slug",
        destination: "/resources/technologies/:slug",
        permanent: true,
      },
      {
        source: "/materials",
        destination: "/resources/materials",
        permanent: true,
      },
      {
        source: "/materials/:slug",
        destination: "/resources/materials/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
