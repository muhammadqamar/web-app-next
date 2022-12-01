/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['stripe-camo.global.ssl.fastly.net'],
  },
};

module.exports = nextConfig;
