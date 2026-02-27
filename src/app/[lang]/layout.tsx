import type { Metadata } from 'next'
import '../globals.css'
import localFont from 'next/font/local'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import LayoutContent from '@/components/common/LayoutContent'
import Script from 'next/script'
import { ToastProvider } from '@/components/common/toast/ToastContext'
import ToastContainer from '@/components/common/toast/ToastContainer'

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

// [수정] generateMetadata에서도 params를 Promise로 처리
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params // await 추가
  const OG_IMAGE_URL = `${SITE_URL}/og-image.png`

  return {
    metadataBase: new URL(SITE_URL),
    title: 'KORFIT',
    description:
      '외국인을 위한 한국 취업 로드맵 서비스 KORFIT. 10단계 역량 검증 시스템, AI 취업 코칭, 포트폴리오 지원으로 성공적인 한국 취업을 시작하세요.',
    openGraph: {
      title: 'KORFIT | 외국인을 위한 한국 취업 플랫폼',
      description: '외국인을 위한 한국 취업 로드맵 서비스 KORFIT.',
      url: SITE_URL,
      siteName: 'KORFIT',
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'KORFIT - 외국인을 위한 한국 취업 플랫폼',
        },
      ],
      type: 'website',
      locale: lang === 'ko' ? 'ko_KR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'KORFIT | 외국인을 위한 한국 취업 플랫폼',
      images: [OG_IMAGE_URL],
    },
    alternates: {
      canonical: SITE_URL,
    },
  }
}

// [수정] RootLayout을 async 함수로 바꾸고 params를 await 합니다.
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params // await 추가

  return (
    <html lang={lang}>
      <head>
        <meta httpEquiv="Cache-Control" content="public, max-age=3600" />
        <link
          rel="preload"
          href="/fonts/PretendardVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style>{`
          html, body {
            margin: 0;
            padding: 0;
            background: white;
            font-family: var(--font-pretendard), system-ui, sans-serif;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Korfit',
              url: SITE_URL,
              logo: `${SITE_URL}/logo.svg`,
            }),
          }}
        />
      </head>

      <body className={`${inter.variable} ${pretendard.variable} font-sans antialiased`}>
        <ReactQueryProvider>
          <LayoutContent>
            <ToastProvider>
              {children}
              <ToastContainer />
            </ToastProvider>
          </LayoutContent>
        </ReactQueryProvider>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
