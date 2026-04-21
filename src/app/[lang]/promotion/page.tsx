'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useGTM } from '@/hooks/common/useGTM'
import { useEffect, useRef } from 'react'

export default function PromotionPage() {
  const { pushEvent } = useGTM()
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleLinkClick = () => {
    pushEvent('promotion_click', {
      button_location: 'bottom_sticky',
      button_text: '무료 LIVE CLASS 신청하기',
      target_url: 'https://forms.gle/ZAqJZLEwr4dW4shh7',
    })
  }

  useEffect(() => {
    const sentPoints = new Set<number>() // 이미 보낸 포인트 저장

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = Math.round((scrolled / scrollHeight) * 100)

      // 25%, 50%, 90% 지점 체크
      const checkPoints = [25, 50, 90]
      checkPoints.forEach((point) => {
        if (progress >= point && !sentPoints.has(point)) {
          pushEvent('promotion_scroll_depth', {
            scroll_percentage: point,
          })
          sentPoints.add(point)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pushEvent])

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-[600px]">
        {/* 포스터 영역 */}
        <div className="relative w-full">
          <Image
            src="/poster.png"
            alt="프로모션 포스터"
            width={600}
            height={800} // 예시 높이값
            className="h-auto w-full"
            priority
          />
        </div>

        <div className="h-[80px]" />

        <div ref={scrollRef} className="h-[10px] w-full" />

        {/* 하단 고정 버튼 섹션 */}
        <section className="fixed bottom-0 w-full max-w-[600px] bg-black px-[20px] py-[20px]">
          <Link
            href="https://forms.gle/ZAqJZLEwr4dW4shh7"
            onClick={handleLinkClick}
            className="bg-main-500 kr-subtitle-md flex h-[52px] w-full items-center justify-center rounded-[12px] text-white"
          >
            무료 LIVE CLASS 신청하기
          </Link>
        </section>
      </div>
    </main>
  )
}
