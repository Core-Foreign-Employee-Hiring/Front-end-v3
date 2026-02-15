import type { Metadata } from 'next'
import '../globals.css'
import localFont from 'next/font/local'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import LayoutContent from '@/components/common/LayoutContent'
import Script from 'next/script'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.korfit.co.kr'

const inter = localFont({
  src: '../../../public/fonts/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter',
  display: 'swap',
})

const pretendard = localFont({
  src: '../../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KORFIT',
  description:
    '외국인을 위한 한국 취업 로드맵 서비스 KORFIT. 10단계 역량 검증 시스템, AI 취업 코칭, 포트폴리오 지원으로 성공적인 한국 취업을 시작하세요.',
  keywords: [
    'KORFIT',
    '외국인 취업',
    '한국 취업',
    '외국인 채용',
    '취업 로드맵',
    'AI 취업 코칭',
    '10단계 역량 검증',
    '외국인 구직',
    '한국 일자리',
    '글로벌 인재',
    '취업 플랫폼',
    '채용 정보',
    '포트폴리오 지원',
    '취업 역량 강화',
  ],
  openGraph: {
    title: 'KORFIT | 외국인을 위한 한국 취업 플랫폼',
    description:
      '외국인을 위한 한국 취업 로드맵 서비스 KORFIT. 10단계 역량 검증 시스템, AI 취업 코칭, 포트폴리오 지원으로 성공적인 한국 취업을 시작하세요.',
    url: `${SITE_URL}`,
    siteName: 'KORFIT',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'KORFIT - 외국인을 위한 한국 취업 플랫폼',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${SITE_URL}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            background: white;
            font-family: var(--font-pretendard), system-ui, sans-serif;
          }
          main {
            width: 375px;
            margin: 0 auto;
            background: white;
          }
        `}</style>

        {/* Schema.org 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Korfit',
              url: `${SITE_URL}`,
              logo: `${SITE_URL}/logo.svg`,
              description: 'Kickstart your job in Korea with a hiring roadmap for foreigners.',
              sameAs: ['https://www.instagram.com/korfit_official'],
            }),
          }}
        />
      </head>

      <body className={`${inter.variable} ${pretendard.variable} font-sans antialiased`}>
        <ReactQueryProvider>
          <LayoutContent>{children}</LayoutContent>
        </ReactQueryProvider>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
