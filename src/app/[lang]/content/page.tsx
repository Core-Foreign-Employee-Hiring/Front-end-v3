import { serverFetchAllContentPosts } from '@/lib/server/content'
import ContentCard from '@/components/content/ContentCard'
import { Label, PageLayout, Spacing } from '@/components/common'
import NavBar from '@/components/common/NavBar'

export default async function ContentPage({
  params,
}: Readonly<{
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const contentResult = await serverFetchAllContentPosts({ page: 0, size: 4 })
  const contents = contentResult.data?.content

  return (
    <div>
      <PageLayout>
        <main>
          <Label label={'콘텐츠'} type={'titleLg'} />
          <Spacing height={16} />
          <section className="desktop:grid-cols-3 desktop:gap-[24px] tablet:grid-cols-2 grid grid-cols-1 gap-[20px]">
            {contents?.map((content) => (
              // ContentCard 내부나 감싸는 div에 너비 고정 및 flex-shrink-0 추가
              <ContentCard key={content.passArchiveId} {...content} />
            ))}
          </section>
        </main>
      </PageLayout>

      <Spacing height={80} />
      <NavBar path={`/${lang}/interview`} lang={lang} />
    </div>
  )
}
