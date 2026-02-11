import Image from 'next/image'

interface ContentSummaryProps {
  title: string
  oneLineReview: string
  thumbnailUrl: string
  price: number
}

export default function ContentSummary({ title, price, thumbnailUrl, oneLineReview }: ContentSummaryProps) {
  return (
    <div className="desktop:pt-[40px] desktop:px-[40px] tablet:pt-[32px] tablet:px-[32px] desktop:flex-row tablet:flex-row tablet:gap-x-[20px] desktop:gap-x-[24px] flex flex-col gap-y-3 px-[20px] pt-[24px]">
      <div className="desktop:w-[384px] tablet:w-[308px] tablet:h-[180px] desktop:h-[224px] relative h-[196px] w-full">
        <Image
          alt={'썸네일 사진'}
          src={thumbnailUrl}
          fill
          className="desktop:rounded-[12px] rounded-[16px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <section className="flex flex-col gap-y-1">
          <p className="kr-subtitle-lg">{title}</p>
          <p className="kr-body-sm text-gray5">{oneLineReview}</p>
        </section>
        <p className="kr-title-sm">{price.toLocaleString()}원</p>
      </div>
    </div>
  )
}
