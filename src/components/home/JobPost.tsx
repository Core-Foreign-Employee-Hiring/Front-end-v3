'use client'

import { Button, Label } from '@/components/common'
import JobPostCard from '@/components/job-post/JobPostCard'
import { JobPostType } from '@/types/job-post'

interface JobPostProps {
  recruitData: JobPostType[] | undefined
}

export default function JobPost({ recruitData }: JobPostProps) {
  return (
    <div className="flex flex-col gap-y-3 px-[40px]">
      <section className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <Label type={'titleLg'} label={'채용 정보'} />
          <p className="kr-body-md">다양한 기업의 채용 정보를 확인해보세요.</p>
        </div>
        <Button variant={'ghost'} onClick={() => {}} size={'sm'} customClassName={'w-[70px]'}>
          더보기
        </Button>
      </section>

      <section className="grid grid-cols-3 gap-[24px]">
        {recruitData?.map((job) => (
          <JobPostCard key={job.recruitId} {...job} />
        ))}
      </section>
    </div>
  )
}
