'use client'

import Image from 'next/image'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import ImageModal from '@/components/common/modal/ImageModal'

interface ContentImagesProps {
  imageUrls: string[]
}
export default function ContentImages({ imageUrls }: ContentImagesProps) {
  const { isImageModalOpen, setIsImageModalOpen } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')

  return (
    <div className="desktop:px-[40px] tablet:px-[32px] px-[20px]">
      {isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      <div className="flex w-full gap-x-3 overflow-x-scroll">
        {imageUrls.map((imageUrl) => (
          <div
            onClick={() => {
              setIsImageModalOpen(isImageModalOpen)
              setSelectedImageUrl(imageUrl)
            }}
            key={imageUrl}
            className="relative h-[250px] w-[420px] shrink-0 whitespace-nowrap"
          >
            <Image src={imageUrl} alt={'사진'} className="rounded-[16px] object-cover" fill />
          </div>
        ))}
      </div>
    </div>
  )
}
