import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'korfit.s3.ap-northeast-2.amazonaws.com', // 에러 발생한 호스트 추가
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'coreforwork.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgs.jobkorea.co.kr',
        pathname: '/**', // 경로 패턴 형식을 위와 통일 (/**)
      },
    ],
  },
}

export default nextConfig
