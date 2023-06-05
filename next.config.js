/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    APIKEY: process.env.APIKEY,
    ENDPOINT: process.env.ENDPOINT,
  },
}

module.exports = nextConfig
