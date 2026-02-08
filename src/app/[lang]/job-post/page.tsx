import { PageLayout } from '@/components/common'
import Banner from '@/components/home/Banner'
import JobPostList from '@/components/job-post/JobPostList'

export default async function JobPostDetail() {
  return (
    <main>
      <Banner />
      <PageLayout>
        <JobPostList />
      </PageLayout>
    </main>
  )
}
