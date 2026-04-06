import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/register",
        destination:
          "https://forms.gle/iE48gzEPCb8drgUX8",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
