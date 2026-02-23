import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("http://localhost:8000/uploads"),
      new URL("https://cloud-gadget-server.onrender.com"),
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
    domains: [
      "localhost",
      "cloud-gadget-server.onrender.com",
      "https://i.pravatar.cc",
    ],
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
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "https",
//         hostname: "i.pravatar.cc",
//         pathname: "/**",
//       },
//       {
//         protocol: "https",
//         hostname: "cloud-gadget-server.onrender.com",
//         pathname: "/uploads/**",
//       },
//     ],
//   },

//   async rewrites() {
//     return [
//       {
//         source: "/uploads/:path*",
//         destination: "http://localhost:8000/uploads/:path*",
//       },
//     ];
//   },
// };

// export default nextConfig;
