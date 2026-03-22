import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "media.geeksforgeeks.org" },
      { protocol: "https", hostname: "content-management-files.canva.com" },
      { protocol: "https", hostname: "static.afteracademy.com" },
      { protocol: "https", hostname: "www.summarizer.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "media.istockphoto.com" },
    ],
  },
};

export default nextConfig;
