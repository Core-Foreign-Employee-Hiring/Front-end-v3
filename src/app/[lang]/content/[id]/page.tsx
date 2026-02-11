import { serverFetchContentDetail } from '@/lib/server/content'
import { Loading } from '@/components/common'
import ContentSummary from '@/components/content/ContentSummary'
import ContentDescription from '@/components/content/ContentDescription'
import ContentReview from '@/components/content/ContentReview'
import BottomBoarder from '@/components/content/BottomBoarder'
import ContentImages from '@/components/content/ContentImages'

export default async function ContentDetailPage({
  params,
}: Readonly<{
  params: Promise<{ lang: string; id: number }>
}>) {
  const { id, lang } = await params
  const result = await serverFetchContentDetail(id)
  const contentData = result.data

  console.log('result', result)

  if (!contentData) {
    return <Loading size={'lg'} />
  }

  return (
    <main className="flex flex-col gap-y-[32px]">
      <ContentSummary
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
  )
}
