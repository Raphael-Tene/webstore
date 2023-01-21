/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // @ts-ignore
    stripe_publishable_key: process.env.Publishable_key,
  },
};

module.exports = nextConfig;
