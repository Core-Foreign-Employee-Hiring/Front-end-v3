import Header from '@/components/common/Header'
import Banner from '@/components/home/Banner'
import AICareerVerifyCTA from '@/components/home/AICareerVerifyCTA'
import { Spacing } from '@/components/common'
import JobPost from '@/components/home/JobPost'
import ContentPost from '@/components/home/ContentPost'
import Footer from '@/components/common/Footer'
import { serverFetchAllJobPosts } from '@/lib/server/job-post'
import { serverFetchAllContentPosts } from '@/lib/server/content'
import NavBar from '@/components/common/NavBar'
import GATracker from '@/components/common/GATracker'

interface HomeProps {
  params: Promise<{ lang: string }>
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params
  const jobPostResult = await serverFetchAllJobPosts({ page: 0, size: 6 })
  const recruitData = jobPostResult.data?.content
  const contentResult = await serverFetchAllContentPosts({ page: 0, size: 4 })
  const contents = contentResult.data?.content
  return (
    <main>
      <GATracker />
      <Header headerType={'default'} currentLng={lang}></Header>
      <Banner />
      <div className="desktop:gap-y-[100px] flex flex-col gap-y-[60px]">
        <AICareerVerifyCTA lang={lang} />
        <JobPost recruitData={recruitData} lang={lang} />
        <ContentPost contents={contents} lang={lang} />
        {/*<ProgramPost lang={lang} />*/}
        <Footer />
      </div>

      <Spacing height={80} className={'desktop:hidden'} />

      <NavBar path={`/${lang}`} lang={lang} />
    </main>
  )
}
