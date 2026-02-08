import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coreforwork.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**', // 버킷 내의 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'imgs.jobkorea.co.kr',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig
