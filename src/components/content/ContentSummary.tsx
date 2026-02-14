'use client'

import Image from 'next/image'
import DesktopActionButtons from '@/components/content/DesktopActionButtons'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import ImageModal from '@/components/common/modal/ImageModal'

interface ContentSummaryProps {
  title: string
  oneLineReview: string
  thumbnailUrl: string
  price: number
  archiveId: string
}

export default function ContentSummary({ archiveId, title, price, thumbnailUrl, oneLineReview }: ContentSummaryProps) {
  const { isImageModalOpen, setIsImageModalOpen } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')
  return (
    <div className="desktop:pt-[40px] desktop:px-[40px] tablet:pt-[32px] tablet:px-[32px] desktop:flex-row tablet:flex-row tablet:gap-x-[20px] desktop:gap-x-[24px] flex flex-col gap-y-3 px-[20px] pt-[24px]">
      {isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}
      <div className="desktop:w-[384px] tablet:w-[308px] tablet:h-[180px] desktop:h-[224px] relative h-[196px] w-full shrink-0 whitespace-nowrap">
        <Image
          onClick={() => {
            setIsImageModalOpen(isImageModalOpen)
            setSelectedImageUrl(thumbnailUrl)
          }}
          alt={'썸네일 사진'}
          src={thumbnailUrl}
          fill
          className="desktop:rounded-[12px] rounded-[16px] object-cover"
        />
      </div>

      <div className="flex w-full flex-col items-end justify-between">
        <div className="flex w-full flex-col gap-y-3">
          <section className="flex flex-col gap-y-1">
            <p className="kr-subtitle-lg">{title}</p>
            <p className="kr-body-sm text-gray5">{oneLineReview}</p>
          </section>
          <p className="kr-title-sm">{price.toLocaleString()}원</p>
        </div>
        <DesktopActionButtons archiveId={archiveId} />
      </div>
    </div>
  )
}
