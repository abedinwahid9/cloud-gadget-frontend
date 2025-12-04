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
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://cloud-gadget-server.onrender.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
