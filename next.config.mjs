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
          hostname: 'api.dicebear.com', // Allow images from Dicebear
        },
      ],
      dangerouslyAllowSVG: true, // Allow SVGs
      contentSecurityPolicy: "default-src 'self'; img-src 'self' https://api.dicebear.com;", // Optional CSP to restrict sources
    },
  };
  
  export default nextConfig;