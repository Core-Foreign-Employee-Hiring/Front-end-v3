import type { Metadata } from 'next'
import '../globals.css'
import localFont from 'next/font/local'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import LayoutContent from '@/components/common/LayoutContent'
import Script from 'next/script'
import { ToastProvider } from '@/components/common/toast/ToastContext'
import ToastContainer from '@/components/common/toast/ToastContainer'
import GoogleAnalytics from '@/components/common/GoogleAnalytics'

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

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const OG_IMAGE_URL = `${SITE_URL}/thumbnail-image.png`

  return {
    metadataBase: new URL(SITE_URL),
    title: 'KORFIT',
    description: '외국인을 위한 한국 취업 로드맵 서비스 KORFIT...',
    openGraph: {
      title: 'KORFIT | 외국인을 위한 한국 취업 플랫폼',
      description: '외국인을 위한 한국 취업 로드맵 서비스 KORFIT.',
      url: SITE_URL,
      siteName: 'KORFIT',
      images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'KORFIT' }],
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <head>
        {/* --- Google Tag Manager (Head) --- */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M66X5FLW');
            `,
          }}
        />
        {/* ------------------------------- */}

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
        {/* --- Google Tag Manager (Body / noscript) --- */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M66X5FLW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* ------------------------------------------- */}

        <ReactQueryProvider>
          <LayoutContent>
            <ToastProvider>
              <GoogleAnalytics />
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
