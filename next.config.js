/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.alpha-orbital.com"]
  }
}

module.exports = nextConfig
