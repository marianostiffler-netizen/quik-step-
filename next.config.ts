import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["framer-motion"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.faplaconline.com.ar",
      },
    ],
  },
};

export default nextConfig;
