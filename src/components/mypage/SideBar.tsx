'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SidebarSelectedHomeIcon, SidebarUnselectedHomeIcon } from '@/assets/svgComponents'

export type MyPageTabType = 'home' | 'content' | 'program' | 'purchase' | 'payment'

interface SideBarProps {
  lang: string
}

export default function SideBar({ lang }: SideBarProps) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'home'
  const router = useRouter()

  return (
    <nav className="w-[180px]">
      {/* tab 값에 따라 하이라이트 처리 */}
      <div
        onClick={() => {
          router.push(`/${lang}/mypage/home`)
        }}
        className={`${tab === 'home' ? 'bg-main-50 text-main-500 kr-subtitle-md' : 'kr-body-md text-gray3'} flex w-full items-center gap-x-2 rounded-[8px] p-3`}
      >
        {tab === 'home' ? (
          <SidebarSelectedHomeIcon width={24} height={24} />
        ) : (
          <SidebarUnselectedHomeIcon width={24} height={24} />
        )}
        <p className={`${tab === 'home' ? 'text-main-500 kr-subtitle-md' : 'kr-body-md text-gray3'}`}>my 홈</p>
      </div>
    </nav>
  )
}
