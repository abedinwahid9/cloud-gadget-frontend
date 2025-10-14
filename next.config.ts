import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "cloud-gadget-server.onrender.com",
      },
    ],
    domains: ["localhost", "cloud-gadget-server.onrender.com"],
  },
};

export default nextConfig;
