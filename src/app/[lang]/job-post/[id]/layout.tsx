import { Header, PageLayout, Spacing } from '@/components/common'
import Footer from '@/components/common/Footer'
import { Metadata } from 'next'
import { Locale } from '@/lib/i18n.types'
import { getTranslationServer } from '@/lib/i18n'
import { fetchJobPostDetail } from '@/lib/server/job-post'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.korfit.co.kr'

/**
 * 1. 동적 메타데이터 생성 함수
 * Next.js가 페이지 렌더링 전 호출하며, 내부 fetch는 자동으로 캐싱(Memoization)됩니다.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}): Promise<Metadata> {
  const { id } = await params

  try {
    const result = await fetchJobPostDetail(id)
    const jobPost = result.data

    if (!jobPost) throw new Error('Job post not found')

    // 1. 제목 길이를 조절합니다. (카카오톡 기준 약 30~35자 내외가 안전)
    const rawTitle = jobPost.title
    const truncatedTitle = rawTitle.length > 30 ? `${rawTitle.slice(0, 30)}...` : rawTitle

    const pageTitle = `${truncatedTitle}`

    // 2. 설명글(Description)의 앞부분에 핵심 정보를 먼저 배치합니다.
    // 줄바꿈이나 특수문자를 제거하여 한 줄로 깔끔하게 보이게 처리
    const cleanDescription = jobPost.mainTasks
      ? jobPost.mainTasks.replace(/\r?\n|\r/g, ' ').slice(0, 100)
      : '상세 채용 정보를 확인하세요.'

    const pageDescription = cleanDescription

    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: `${SITE_URL}/job-post/${id}`, // 실제 경로 구조에 맞춰 수정하세요
        siteName: 'KORFIT',
        images: [
          {
            url: `${SITE_URL}/thumbnail-image.png`, // 필요 시 jobPost.imageUrl 등으로 동적 변경 가능
            width: 1200,
            height: 630,
            alt: jobPost.title,
          },
        ],
        type: 'website',
        locale: 'ko_KR',
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (error) {
    // 에러 발생 시 기본 메타데이터 반환
    return {
      title: 'KORFIT | 공고 상세페이지',
      description: '외국인을 위한 한국 취업 플랫폼 KORFIT입니다.',
    }
  }
}

/**
 * 2. 레이아웃 컴포넌트
 */
export default async function FindAuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string; id: string }>
}>) {
  const { lang, id } = await params
  const currentLang = lang as Locale

  // i18n 번역 데이터 로드
  const { t } = await getTranslationServer(currentLang, 'jobPost')

  return (
    <div>
      {/* 모바일 헤더 */}
      <div className="desktop:hidden block">
        <Header headerType={'dynamic'} currentLng={lang} title={t('detail.title')} />
      </div>

      {/* 데스크탑 헤더 */}
      <div className="desktop:block hidden">
        <Header headerType={'default'} currentLng={lang} />
      </div>

      <PageLayout>{children}</PageLayout>

      <Spacing height={60} />
      <Footer />
      <Spacing height={100} className={'desktop:hidden'} />
    </div>
  )
}
