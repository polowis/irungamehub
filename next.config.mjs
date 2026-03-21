/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/irungamehub",
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
