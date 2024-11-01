/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ai-persona-quiz.vercel.app'],
  },
  optimizeFonts: true,
  experimental: {
    runtime: 'edge'
  }
}

module.exports = nextConfig