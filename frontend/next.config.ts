/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Local development
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Strapi media CDN (your current error)
      {
        protocol: "https",
        hostname: "perfect-belief-e537fc91cf.media.strapiapp.com",
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
