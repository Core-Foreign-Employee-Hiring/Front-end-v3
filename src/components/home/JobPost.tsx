'use client'

import { Button, Label } from '@/components/common'
import JobPostCard from '@/components/job-post/JobPostCard'
import { JobPostType } from '@/types/job-post'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface JobPostProps {
  lang: string
  recruitData: JobPostType[] | undefined
}

export default function JobPost({ lang, recruitData }: JobPostProps) {
  const { t } = useTranslation(['home'])
  const router = useRouter()
  return (
    <div className="desktop:px-[40px] tablet:px-[32px] flex flex-col gap-y-3 px-[20px]">
      <section className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <Label type={'titleLg'} label={t('jobPost.title')} />
          <p className="kr-body-md">{t('jobPost.description')}</p>
        </div>
        <Button
          variant={'ghost'}
          onClick={() => {
            router.push(`/${lang}/job-post`)
          }}
          size={'sm'}
          customClassName={'w-[70px] shrink-0'}
        >
          {t('jobPost.moreButton')}
        </Button>
      </section>

      <section className="tablet:grid-cols-2 desktop:grid-cols-3 tablet:gap-[20px] desktop:gap-[24px] grid grid-cols-1 gap-y-[16px]">
        {recruitData?.map((job) => (
          <JobPostCard key={job.recruitId} {...job} />
        ))}
      </section>
    </div>
  )
}
