import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder art ships as local SVGs in /public/images. Allowing SVG
    // through next/image is safe here because every file is first-party and
    // checked into the repo. If you swap in remote/raster imagery later you
    // can remove these two lines.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
