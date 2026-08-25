import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
        hostname: "blog.vybein.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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
      // Redirect HTML files to clean URLs
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
};

export default nextConfig;

