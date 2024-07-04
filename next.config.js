/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  transpilePackages: ['three'],
  images: {
    domains: ['dhanrajsp.me'],
    unoptimized: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: {
    test: /\.svg$/i,
    use: ['@svgr/webpack']  
  }
};

module.exports = nextConfig;