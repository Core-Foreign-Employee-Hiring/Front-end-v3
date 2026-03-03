// components/GoogleAnalytics.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  const pathname = usePathname()

  // 1. 페이지 뷰 추적
  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return

    window.gtag('config', GA_ID, {
      page_path: pathname,
    })
  }, [pathname])

  // 2. 스크롤 추적 (성능 최적화를 위해 별도 효과로 분리 권장)
  useEffect(() => {
    if (!GA_ID) return

    let maxScrollRatio = 0
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const totalHeight = document.body.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return

      const currentRatio = scrollTop / totalHeight
      if (currentRatio > maxScrollRatio) {
        maxScrollRatio = currentRatio
        // 너무 자주 전송되지 않도록 특정 구간(예: 25, 50, 75, 100)에서만 쏘는 것이 데이터 관리에 좋습니다.
        if (typeof window.gtag === 'function' && Math.floor(maxScrollRatio * 100) % 25 === 0) {
          window.gtag('event', 'scroll_depth', {
            event_category: 'Scroll',
            value: Math.floor(maxScrollRatio * 100),
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* GA 스크립트 로드 */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
