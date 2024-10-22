/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
      // Add Facebook domain
      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "/tr",
      },
    ],
  },
};

export default nextConfig;
