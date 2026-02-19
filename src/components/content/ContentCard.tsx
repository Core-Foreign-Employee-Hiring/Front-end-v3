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
      className="flex shrink-0 cursor-pointer flex-col gap-y-3"
    >
      <div className="relative h-[164px] w-full">
        <Image alt={'콘텐츠 사진'} src={thumbnailUrl} fill className="rounded-[16px] object-cover" />
      </div>

      <section className="flex flex-col gap-y-1">
        <h2 className="kr-subtitle-md line-clamp-2 h-[52px] overflow-hidden">{title}</h2>
        <p className="kr-body-sm text-gray5">{oneLineReview}</p>
        <p className="kr-subtitle-md">
          {price} {t('detail.contentSummary.unit')}
        </p>
        <div className="flex items-center gap-x-1">
          <StarIcon width={20} height={20} />
          <div className="flex gap-x-[2px]">
            <p className="kr-button">{star}</p>
            <p className="kr-small text-gray5">({starCount})</p>
          </div>
        </div>
      </section>
    </div>
  )
}
