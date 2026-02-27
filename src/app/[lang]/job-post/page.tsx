import { Header, PageLayout, Spacing } from '@/components/common'
import Banner from '@/components/home/Banner'
import JobPostList from '@/components/job-post/JobPostList'
import Footer from '@/components/common/Footer'
import NavBar from '@/components/common/NavBar'

export default async function JobPostDetail({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return (
    <main>
      <Header currentLng={lang} headerType={'default'} />

      <Banner />
      <PageLayout>
        <JobPostList />
      </PageLayout>

      <Footer />
      <Spacing height={100} className={'desktop:hidden'} />
      <NavBar path={`/${lang}/job-post`} lang={lang} />
    </main>
  )
}
