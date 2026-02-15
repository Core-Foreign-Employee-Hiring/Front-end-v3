import Image from 'next/image'
import { Label } from '@/components/common'

interface ReviewSummaryProps {
  title: string
  price: number
  thumbnailUrl: string
  approvedAt: string
}

export default function ReviewSummary({ title, thumbnailUrl, approvedAt, price }: ReviewSummaryProps) {
  return (
    <section className="flex items-center gap-x-[12px] rounded-[12px] bg-white p-3">
      <div className="relative h-[64px] w-[64px]">
        <Image src={thumbnailUrl} alt={'/profile.jpg'} fill className="rounded-[8px] object-cover" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Label label={title} type={'subtitleLg'} />
        <p className="kr-body-sm">{price.toLocaleString()}원</p>
        <p className="kr-small text-gray4">{approvedAt} 결제완료</p>
      </div>
    </section>
  )
}
