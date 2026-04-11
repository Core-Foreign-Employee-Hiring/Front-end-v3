'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Button, Label } from '@/components/common'
import ContentCard from '@/components/content/ContentCard'
import { ContentType } from '@/types/content'
import { useGTM } from '@/hooks/common/useGTM'

interface ContentPostProps {
  lang: string
  contents: ContentType[] | undefined
}

const GTM_EVENT = {
  ALL_CLICK: 'click_expose_content_home_all',
} as const

export default function ContentPost({ lang, contents }: ContentPostProps) {
  const router = useRouter()
  const { t } = useTranslation(['home'])
  const { pushEvent } = useGTM()

  const handleMoreClick = useCallback(() => {
    pushEvent(GTM_EVENT.ALL_CLICK, {
      element_id: 'click_expose_content_home_all',
    })
    router.push(`/${lang}/content`)
  }, [pushEvent, lang, router])

  return (
    <div className="desktop:px-[40px] tablet:px-[32px] flex flex-col items-center justify-center px-[20px]">
      <div className="flex w-full max-w-[1280px] flex-col gap-y-3">
        <section className="flex items-end justify-between">
          <div className="flex flex-col gap-y-2">
            <Label type="titleLg" label={t('contentPost.title')} />
            <p className="kr-body-md">{t('contentPost.description')}</p>
          </div>
          <Button
            id="click_expose_content_home_all"
            variant="ghost"
            onClick={handleMoreClick}
            size="sm"
            customClassName="w-[70px] shrink-0"
          >
            {t('contentPost.moreButton')}
          </Button>
        </section>

        <section className="scrollbar-hide desktop:gap-[24px] flex gap-[20px] overflow-x-auto pb-4">
          {contents?.map((content) => (
            <div key={content.passArchiveId} className="w-[300px] flex-shrink-0">
              <ContentCard {...content} />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
