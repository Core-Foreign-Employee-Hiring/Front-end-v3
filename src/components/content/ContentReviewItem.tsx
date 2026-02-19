'use client'
import { StarIcon } from '@/assets/svgComponents'
import { ReviewType } from '@/types/content'
import { formatRelativeTime } from '@/utils/content'
import { useTranslation } from 'react-i18next'

interface ContentReviewItemProps {
  content: ReviewType
}

export default function ContentReviewItem({ content }: ContentReviewItemProps) {
  const { t } = useTranslation(['content'])
  return (
    <div className="border-gray2 flex flex-col gap-y-3 border-t px-5 py-4">
      <section className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-1">
          <StarIcon width={20} height={20} />
          <p className="kr-badge-md">{content.star}</p>
        </div>
        <p className="kr-small text-gray4">{formatRelativeTime(content.createdAt, t)}</p>
      </section>
      <p className="kr-body-md">{content.content}</p>
    </div>
  )
}
