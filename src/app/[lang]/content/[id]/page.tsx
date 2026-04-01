import { serverFetchContentDetail } from '@/lib/server/content'
import { Header, Loading, Spacing } from '@/components/common'
import ContentSummary from '@/components/content/ContentSummary'
import ContentDescription from '@/components/content/ContentDescription'
import ContentReview from '@/components/content/ContentReview'
import BottomBoarder from '@/components/content/BottomBoarder'
import ContentImages from '@/components/content/ContentImages'
import AuthWatcher from '@/components/auth/AuthWatcher'
import { Locale } from '@/lib/i18n.types'
import { getTranslationServer } from '@/lib/i18n'
import Footer from '@/components/common/Footer'
import BottomButtons from '@/components/content/BottomButtons'

export default async function ContentDetailPage({
  params,
}: Readonly<{
  params: Promise<{ lang: string; id: string }>
}>) {
  const { id, lang } = await params
  const result = await serverFetchContentDetail(id)
  const contentData = result.data
  const currentLang = lang as Locale

  const { t } = await getTranslationServer(currentLang, 'content')

  if (!contentData) {
    return <Loading size={'lg'} />
  }

  return (
    <main>
      <div className="desktop:block hidden">
        <Header headerType={'default'} currentLng={lang} />
      </div>
      <div className="desktop:hidden block">
        <Header headerType={'dynamic'} currentLng={lang} title={t('home.title')} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <main className="flex w-full max-w-[1280px] flex-col gap-y-[32px]">
          <AuthWatcher results={[result]} />

          <ContentSummary
            archiveId={id}
            price={contentData.price}
            oneLineReview={contentData.oneLineReview}
            title={contentData.title}
            thumbnailUrl={contentData.thumbnailUrl}
          />
          <BottomBoarder customClassName={'block desktop:hidden'} />
          <ContentDescription description={contentData.description} />
          <ContentImages imageUrls={contentData.imageUrls} />
          <BottomBoarder customClassName={'desktop:mx-[40px]'} />
          <ContentReview archiveId={id} starCount={contentData.starCount} star={contentData.star} />
        </main>
      </div>
      <Spacing height={80} />
      <Footer />

      <Spacing className={'desktop:hidden'} height={100} />
      <BottomButtons archiveId={id} />
    </main>
  )
}
