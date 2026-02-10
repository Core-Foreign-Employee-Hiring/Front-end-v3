'use client'

import { Button, Label } from '@/components/common'
import ContentCard from '@/components/content/ContentCard'
import { ContentType } from '@/types/content'
import { useRouter } from 'next/navigation'

interface ContentPostProps {
  lang: string
  contents: ContentType[] | undefined
}

export default function ContentPost({ lang, contents }: ContentPostProps) {
  const router = useRouter()
  return (
    <div className="desktop:px-[40px] tablet:px-[32px] flex flex-col gap-y-3 px-[20px]">
      <section className="flex items-end justify-between">
        <div className="flex flex-col gap-y-2">
          <Label type={'titleLg'} label={'콘텐츠'} />
          <p className="kr-body-md">커리어 성장과 한국생활을 위한 korfit만의 콘텐츠</p>
        </div>
        <Button
          variant={'ghost'}
          onClick={() => {
            router.push(`/${lang}/content`)
          }}
          size={'sm'}
          customClassName={'w-[70px] shrink-0'}
        >
          더보기
        </Button>
      </section>

      <section className="scrollbar-hide desktop:gap-[24px] flex gap-[20px] overflow-x-auto pb-4">
        {contents?.map((content) => (
          // ContentCard 내부나 감싸는 div에 너비 고정 및 flex-shrink-0 추가
          <div key={content.passArchiveId} className="w-[300px] flex-shrink-0">
            <ContentCard {...content} />
          </div>
        ))}
      </section>
    </div>
  )
}
