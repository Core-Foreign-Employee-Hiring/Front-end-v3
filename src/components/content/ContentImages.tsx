'use client'

import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import ImageModal from '@/components/common/modal/ImageModal'

interface ContentImagesProps {
  imageUrls: string[]
}

export default function ContentImages({ imageUrls }: ContentImagesProps) {
  const { modals, toggleModal } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')

  return (
    <div className="desktop:px-[40px] tablet:px-[32px] px-[20px]">
      {modals.isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      {/* 1. items-end: 사진들을 바닥면 기준으로 정렬
          2. no-scrollbar: 스크롤바를 숨기고 싶을 때 유용 (필요시 추가)
      */}
      <div className="flex w-full items-end gap-x-3 overflow-x-auto pb-2">
        {imageUrls.map((imageUrl) => (
          <div
            onClick={() => {
              toggleModal('isImageModalOpen')
              setSelectedImageUrl(imageUrl)
            }}
            key={imageUrl}
            /* - h-[250px]: 최대 높이 고정
               - w-auto: 비율에 맞춰 너비 자동 조절
               - shrink-0: 스크롤 영역에서 찌그러지지 않게 방지
            */
            className="relative h-[250px] w-auto shrink-0 cursor-pointer"
          >
            <img src={imageUrl} alt="콘텐츠 사진" className="h-full w-auto rounded-[16px] object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}
