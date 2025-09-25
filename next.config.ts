import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' for local development
        hostname: "i.pravatar.cc", // Replace with your image host
        port: "", // Optional: Specify port if needed (e.g., '8000' for local API)
      },
    ],
  },
};

export default nextConfig;
