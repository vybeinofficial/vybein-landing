import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
  async headers() {
    return [
      {
        source: "/home/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/logo.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
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
