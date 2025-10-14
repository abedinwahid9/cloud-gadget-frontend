import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**", // allow all images under /uploads
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
