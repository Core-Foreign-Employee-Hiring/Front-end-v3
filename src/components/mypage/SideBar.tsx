'use client'

import { usePathname, useRouter } from 'next/navigation' // usePathname 추가
import {
  SidebarSelectedContentIcon,
  SidebarSelectedHomeIcon,
  SidebarUnselectedContentIcon,
  SidebarUnselectedHomeIcon,
} from '@/assets/svgComponents'

interface SideBarProps {
  lang: string
}

export default function SideBar({ lang }: SideBarProps) {
  const router = useRouter()
  const pathname = usePathname() // 현재 전체 경로 (예: /ko/mypage/home)

  // URL에서 마지막 부분을 추출하여 'home' 또는 'content'를 판별합니다.
  const currentTab = pathname.split('/').pop()

  // 공통 스타일 클래스 추출 (유지보수 용이)
  const getTabClass = (tabName: string) =>
    `${currentTab === tabName ? 'bg-main-50 text-main-500 kr-subtitle-md' : 'kr-body-md text-gray3 hover:bg-gray-50'} 
     flex w-full cursor-pointer items-center gap-x-2 rounded-[8px] p-3 transition-colors`

  return (
    <nav className="desktop:w-[180px] desktop:block hidden space-y-1">
      {/* MY 홈 탭 */}
      <div onClick={() => router.push(`/${lang}/mypage/home`)} className={getTabClass('home')}>
        {currentTab === 'home' ? (
          <SidebarSelectedHomeIcon width={24} height={24} />
        ) : (
          <SidebarUnselectedHomeIcon width={24} height={24} />
        )}
        <p>my 홈</p>
      </div>

      {/* 콘텐츠 내역 탭 */}
      <div onClick={() => router.push(`/${lang}/mypage/content?type=sold&page=0`)} className={getTabClass('content')}>
        {currentTab === 'content' ? (
          <SidebarSelectedContentIcon width={24} height={24} />
        ) : (
          <SidebarUnselectedContentIcon width={24} height={24} />
        )}
        <p>콘텐츠 내역</p>
      </div>
    </nav>
  )
}
