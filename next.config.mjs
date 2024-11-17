/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nimbooda.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'robohash.org',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com', // Added this domain for Easebuzz S3 bucket
      },
    ],
    dangerouslyAllowSVG: true, // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; img-src 'self' https://api.dicebear.com https://s3.ap-south-1.amazonaws.com;", // Updated CSP
  },
  reactStrictMode: true, // Ensure strict mode is enabled
};

export default nextConfig;
