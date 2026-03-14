import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'bitgo'
  ],
  turbopack: {},
}

export default nextConfig