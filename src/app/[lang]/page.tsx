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
      <Header headerType={'default'} currentLng={lang}></Header>
      <Banner />
      <AICareerVerifyCTA lang={lang} />
      <Spacing height={100} />

      <JobPost recruitData={recruitData} lang={lang} />
      <Spacing height={100} />

      <ContentPost contents={contents} lang={lang} />
      <Spacing height={100} />

      {/*<ProgramPost lang={lang} />*/}
      {/*<Spacing height={100} />*/}

      <Footer />
      <Spacing height={80} />

      <NavBar path={`/${lang}`} lang={lang} />
    </main>
  )
}
