'use client'

import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { StarIcon } from '@/assets/svgComponents'
import { ContentType } from '@/types/content'
import { useGTM } from '@/hooks/common/useGTM'

const GTM_EVENT = {
  CARD_CLICK: 'click_explore_content_card',
} as const

export default function ContentCard({
  passArchiveId,
  thumbnailUrl,
  title,
  oneLineReview,
  price,
  star,
  starCount,
}: ContentType) {
  const router = useRouter()
  const { t } = useTranslation(['content'])
  const { pushEvent } = useGTM()
  const pathname = usePathname()

  const handleCardClick = useCallback(() => {
    pushEvent(GTM_EVENT.CARD_CLICK, {
      element_id: 'click_explore_content_card',
      archive_id: passArchiveId,
      source_path: pathname,
      title,
      price,
    })
    router.push(`/content/${passArchiveId}`)
  }, [pushEvent, passArchiveId, title, price, router, pathname])

  return (
    <div
      id="click_explore_content_card"
      onClick={handleCardClick}
      className="flex w-full shrink-0 cursor-pointer flex-col gap-y-3"
    >
      <div className="relative aspect-[8/5] w-full overflow-hidden">
        <Image
          alt={title}
          src={thumbnailUrl}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="rounded-[16px] object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <section className="flex flex-col gap-y-1">
          <h2 className="kr-subtitle-md line-clamp-2 min-h-[48px] overflow-hidden">{title}</h2>
          <p className="kr-body-sm text-gray5 line-clamp-2 h-[40px] overflow-hidden">{oneLineReview}</p>
        </section>

        <div className="mt-2 flex items-center justify-between">
          <p className="kr-subtitle-md">
            {price.toLocaleString()} {t('detail.contentSummary.unit')}
          </p>
          <div className="flex items-center gap-x-1">
            <StarIcon width={20} height={20} />
            <div className="flex gap-x-[2px]">
              <p className="kr-button text-gray5">{star}</p>
              <p className="kr-small text-gray5">({starCount})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
