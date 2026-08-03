import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  images : {
    remotePatterns:[
      {
        hostname: "static.vecteezy.com"
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        hostname: "example.com"
      }
    ]
  }
};

export default nextConfig;
