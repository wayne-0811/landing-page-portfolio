/** Static export. Asset URLs are relative so the page works from any folder,
    including one with a space in its name ("morrow house/"). */
const nextConfig = {
  output: 'export',
  assetPrefix: '.',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
