import type { NextConfig } from "next";
import { allRedirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return allRedirects();
  },
};

export default nextConfig;
