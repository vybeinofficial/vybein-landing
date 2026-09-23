import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.vybein.com",
      },
      {
        protocol: "https",
        hostname: "vybein.apnapackers.in",
      },
      {
        protocol: "https",
        hostname: "blog.vybein.com",
      },
      {
        protocol: "https",
        hostname: "vybein-media.sgp1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "vybein-media.sgp1.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "t4.ftcdn.net",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vybein.com" }],
        destination: "https://vybein.com/:path*",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/account-deletion.html",
        destination: "/account-deletion",
        permanent: true,
      },
      {
        source: "/careers.html",
        destination: "/careers",
        permanent: true,
      },
      {
        source: "/child-safety.html",
        destination: "/child-safety",
        permanent: true,
      },
      {
        source: "/cookies.html",
        destination: "/cookies",
        permanent: true,
      },
      {
        source: "/disclaimer.html",
        destination: "/disclaimer",
        permanent: true,
      },
      {
        source: "/privacy.html",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms.html",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/press.html",
        destination: "/press",
      },
    ];
  },
};

export default nextConfig;
