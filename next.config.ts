import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Prevent broken bundling of googleapis on Vercel (can cause 500 on /api/register at runtime)
  serverExternalPackages: ["googleapis", "google-auth-library"],
};

export default nextConfig;
