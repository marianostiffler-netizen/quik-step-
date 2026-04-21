import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
