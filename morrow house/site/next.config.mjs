/** Static export. Pages export as flat files beside index.html (homes.html,
    pricing.html…) and asset URLs are relative, so the site works from any
    folder, including one with a space in its name ("morrow house/"). */
const nextConfig = {
  output: 'export',
  assetPrefix: '.',
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
