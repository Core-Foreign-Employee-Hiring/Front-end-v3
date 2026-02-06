import { serverFetchAllJobPosts } from '@/lib/server/job-post'
import { Label, PageLayout, Spacing } from '@/components/common'
import Filters from '@/components/job-post/Filters'
import JobPostCard from '@/components/job-post/JobPostCard'
import Banner from '@/components/home/Banner'

export default async function JobPostDetail() {
  const jobPostResult = await serverFetchAllJobPosts({ page: 0, size: 21 })
  const recruitData = jobPostResult.data?.content
  return (
    <main>
      <Banner />
      <PageLayout>
        <div className="flex flex-col">
          <Label label={'채용 정보'} type={'titleLg'} />
          <Spacing height={8} />

          <div className="flex items-center justify-between">
            <div className="kr-subtitle-lg flex gap-x-1">
              <p className="text-main-500">3333</p> 건
            </div>
            <Filters />
          </div>

          <Spacing height={12} />
          <section className="tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-6">
            {recruitData?.map((job) => (
              <JobPostCard key={job.recruitId} {...job} />
            ))}
          </section>
        </div>
      </PageLayout>
    </main>
  )
}
