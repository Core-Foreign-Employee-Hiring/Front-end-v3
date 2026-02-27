'use client'

import { StarIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import { ContentType } from '@/types/content'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

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
  return (
    <div
      onClick={() => {
        router.push(`/content/${passArchiveId}`)
      }}
      className="desktop:h-[342px] flex h-[311px] shrink-0 cursor-pointer flex-col gap-y-3"
    >
      <div className="desktop:h-[223px] tablet:h-[192px] relative h-[195px] w-full">
        <Image alt={'콘텐츠 사진'} src={thumbnailUrl} fill className="rounded-[16px] object-cover" />
      </div>

      <div className="flex flex-col justify-between">
        <section className="flex flex-col gap-y-1">
          <h2 className="kr-subtitle-md line-clamp-2 overflow-hidden">{title}</h2>
          <p className="kr-body-sm text-gray5 line-clamp-2 overflow-hidden">{oneLineReview}</p>
        </section>
        <div className="flex items-center justify-between">
          <p className="kr-subtitle-md">
            {price}
            {t('detail.contentSummary.unit')}
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
