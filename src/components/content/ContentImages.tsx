'use client'

import { useModalStore } from '@/store/modalStore'
import { useCallback, useRef, useState } from 'react'
import ImageModal from '@/components/common/modal/ImageModal'
import { useGTM } from '@/hooks/common/useGTM'

interface ContentImagesProps {
  imageUrls: string[]
}

// GTM dataLayer 타입 선언
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

const GTM_EVENT = {
  SCROLL: 'view_explore_content_scroll',
  SCROLL_END: 'view_explore_content_scroll_end',
} as const

export default function ContentImages({ imageUrls }: ContentImagesProps) {
  const { pushEvent } = useGTM()
  const isImageModalOpen = useModalStore((state) => state.modals.isImageModalOpen)
  const toggleModal = useModalStore((state) => state.toggleModal)

  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null | undefined>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const hasScrolledRef = useRef(false) // 스크롤 시작 여부 (중복 이벤트 방지)
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    // 스크롤 시작 이벤트 — 첫 스크롤에만 한 번 발송
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true
      pushEvent(GTM_EVENT.SCROLL, {
        element_id: 'view_explore_content_scroll',
        scroll_left: el.scrollLeft,
        total_width: el.scrollWidth,
      })
    }

    // 스크롤 종료 감지 — debounce 패턴 (150ms 뒤 멈추면 end 이벤트)
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current)
    scrollEndTimerRef.current = setTimeout(() => {
      const scrollRatio = el.scrollLeft / (el.scrollWidth - el.clientWidth)

      pushEvent(GTM_EVENT.SCROLL_END, {
        element_id: 'view_explore_content_scroll',
        scroll_left: Math.round(el.scrollLeft),
        scroll_ratio: Math.round(scrollRatio * 100), // 0~100%
        reached_end: scrollRatio >= 0.95, // 끝까지 봤는지 여부
      })

      // 다음 스크롤 시작 감지를 위해 초기화
      hasScrolledRef.current = false
    }, 150)
  }, [pushEvent])

  // ✅ 핸들러 인라인 X → 분리
  const handleImageClick = useCallback(
    (imageUrl: string) => {
      setSelectedImageUrl(imageUrl)
      toggleModal('isImageModalOpen')
    },
    [toggleModal]
  )

  return (
    <div className="desktop:px-[40px] tablet:px-[32px] px-[20px]">
      {isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      <div
        ref={scrollRef}
        id="view_explore_content_scroll"
        onScroll={handleScroll}
        className="flex w-full items-end gap-x-3 overflow-x-auto pb-2"
      >
        {imageUrls.map((imageUrl, index) => (
          <div
            // ✅ URL 중복 가능성 대비 index fallback
            key={`${imageUrl}-${index}`}
            onClick={() => handleImageClick(imageUrl)}
            className="relative h-[250px] w-auto shrink-0 cursor-pointer"
          >
            <img
              src={imageUrl}
              alt={`콘텐츠 사진 ${index + 1}`}
              className="h-full w-auto rounded-[16px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
