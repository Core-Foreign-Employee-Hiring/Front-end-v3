import Image from 'next/image'
import { Spacing } from '@/components/common'

export default function ContentSummary() {
  return (
    <div className="desktop:flex-row tablet:flex-row desktop:items-center flex flex-col gap-x-[24px] gap-y-[12px]">
      <div className="desktop:w-[342px] tablet:w-[342px] desktop:h-[214px] tablet:h-[214px] relative h-[195px] w-[335px] object-cover">
        <Image src={'/profile.jpg'} alt="썸네일" fill className="absolute rounded-[12px] object-cover" />
      </div>
      <div className="flex flex-col">
        <p className="kr-title-md">Title</p>
        <Spacing height={4} />
        <p className="kr-body-md text-gray5">한줄 설명</p>
        <Spacing height={12} />
        <p className="kr-title-sm">129,000원</p>
      </div>
    </div>
  )
}
