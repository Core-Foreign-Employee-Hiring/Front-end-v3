import Footer from '@/components/common/Footer'
import { Spacing } from '@/components/common'
import BottomButtons from '@/components/content/BottomButtons'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.korfit.co.kr'

export const metadata: Metadata = {
  title: 'KORFIT | 콘텐츠 상세',
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
        url: `${SITE_URL}/thumbnail-image.png`,
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

export default async function ContentDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string; id: string }>
}>) {
  const { lang, id } = await params
  return (
    <div>
      {children}
      <Spacing height={80} />
      <Footer />

      <Spacing className={'desktop:hidden'} height={100} />
      <BottomButtons archiveId={id} />
    </div>
  )
}
