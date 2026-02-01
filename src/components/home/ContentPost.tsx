'use client'

import { Button, Label } from '@/components/common'
import ContentCard from '@/components/content/ContentCard'
import { ContentType } from '@/types/content'

interface ContentPostProps {
  contents: ContentType[] | undefined
}

export default function ContentPost({ contents }: ContentPostProps) {
  return (
    <div className="flex flex-col gap-y-3 px-[40px]">
      <section className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <Label type={'titleLg'} label={'콘텐츠'} />
          <p className="kr-body-md">커리어 성장과 한국생활을 위한 korfit만의 콘텐츠</p>
        </div>
        <Button variant={'ghost'} onClick={() => {}} size={'sm'} customClassName={'w-[70px]'}>
          더보기
        </Button>
      </section>

      <section className="grid grid-cols-4 gap-[24px]">
        {contents?.map((content) => (
          <ContentCard key={content.passArchiveId} {...content} />
        ))}
      </section>
    </div>
  )
}
