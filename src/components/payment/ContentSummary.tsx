'use client'

import Image from 'next/image'
import { Spacing } from '@/components/common'

interface ContentSummaryProps {
  orderName: string
  thumbnailUrl: string
  title: string
  oneLineReview: string
  quantity: number
  amount: string
}

export default function ContentSummary({
  orderName,
  amount,
  quantity,
  oneLineReview,
  title,
  thumbnailUrl,
}: ContentSummaryProps) {
  return (
    <div className="desktop:flex-row tablet:flex-row desktop:items-center flex flex-col gap-x-[24px] gap-y-[12px]">
      <div className="desktop:w-[342px] tablet:w-[342px] desktop:h-[214px] tablet:h-[214px] relative h-[195px] w-[335px] object-cover">
        <Image src={thumbnailUrl} alt="썸네일" fill className="absolute rounded-[12px] object-cover" />
      </div>
      <div className="flex flex-col">
        <p className="kr-title-md">{title}</p>
        <Spacing height={4} />
        <p className="kr-body-md text-gray5">{oneLineReview}</p>
        <Spacing height={12} />
        <p className="kr-title-sm">{amount}원</p>
      </div>
    </div>
  )
}
