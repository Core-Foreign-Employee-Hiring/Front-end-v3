'use client'

import Image from 'next/image'
import { Label } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface ReviewSummaryProps {
  title: string
  price: number
  thumbnailUrl: string
  approvedAt: string
}

export default function ReviewSummary({ title, thumbnailUrl, approvedAt, price }: ReviewSummaryProps) {
  const { t } = useTranslation('modal')
  return (
    <section className="flex items-center gap-x-[12px] rounded-[12px] bg-white p-3">
      <div className="relative h-[64px] w-[64px]">
        <Image src={thumbnailUrl} alt={'/profile.jpg'} fill className="rounded-[8px] object-cover" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Label label={title} type={'subtitleLg'} />
        {t('write_review.body.review_summary.price_unit', {
          price: price.toLocaleString(),
        })}
        <p className="kr-small text-gray4">
          {t('write_review.body.review_summary.payment_status', {
            date: approvedAt,
          })}
        </p>
      </div>
    </section>
  )
}
