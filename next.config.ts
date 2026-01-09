import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("http://localhost:8000/uploads"),
      new URL("https://i.pravatar.cc"),
      new URL("https://cloud-gadget-server.onrender.com"),
    ],
    domains: ["localhost", "cloud-gadget-server.onrender.com"],
  },

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:8000/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
