import Image from 'next/image'

import { Dispatch, SetStateAction } from 'react'
import { WhiteXIcon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

interface ImageModalProps {
  ImageUrl: string | undefined | null
  setSelectedImageUrl: Dispatch<SetStateAction<string | undefined | null>>
}

export default function ImageModal({ ImageUrl, setSelectedImageUrl }: ImageModalProps) {
  const { isImageModalOpen, setIsImageModalOpen } = useModalStore((state) => state)

  const handleCloseModal = () => {
    setIsImageModalOpen(isImageModalOpen) // 기존 코드가 (isImageModalOpen)으로 되어있어 false로 명시함이 좋습니다.
    setSelectedImageUrl(undefined)
  }

  return createPortal(
    <AnimatePresence>
      {isImageModalOpen && ( // 1. 조건부 렌더링을 추가해야 애니메이션이 작동합니다.
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 2. 부모를 Flex 중앙 정렬로 설정 */}
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="absolute inset-0 bg-black/50" // 전체 배경 어둡게
          />
          {/* 이미지 컨테이너 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 flex flex-col items-center justify-center" // 내부 정렬
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼: 이미지 상단 적절한 위치에 고정 */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 flex cursor-pointer items-center text-white transition-colors hover:text-gray-300"
            >
              닫기
              <WhiteXIcon width={32} height={32} className="hover:opacity-60" />
            </button>

            {/* 이미지 영역 */}
            <div className="overflow-hidden rounded-lg bg-white shadow-2xl">
              <Image
                src={ImageUrl || '/profile.jpg'}
                alt="Modal Image"
                width={800} // width, height 0 보다는 기준 값을 주거나 layout을 활용하는게 좋습니다.
                height={600}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                }}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
