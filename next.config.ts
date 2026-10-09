import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old links pointed at a generated PDF route; the CV is a static file now.
  async redirects() {
    return [{ source: "/resume", destination: "/Kshitij_Jha_CV.pdf", permanent: false }];
  },
};

export default nextConfig;
