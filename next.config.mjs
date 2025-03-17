/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hcgqaubltkhwikijvccr.supabase.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sxnics-bucket.s3.eu-west-1.amazonaws.com",
        port: "",
      }
    ],
  },
};

export default nextConfig;
