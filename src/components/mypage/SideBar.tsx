'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  SidebarSelectedContentIcon,
  SidebarSelectedHomeIcon,
  SidebarUnselectedContentIcon,
  SidebarUnselectedHomeIcon,
} from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

interface SideBarProps {
  lang: string
}

export default function SideBar({ lang }: SideBarProps) {
  const { t } = useTranslation('my')
  const router = useRouter()
  const pathname = usePathname()

  /**
   * 활성화 여부 판단 함수
   * pathname에 'mypage/home' 또는 'mypage/content'가 포함되어 있는지 확인합니다.
   * 이렇게 하면 뒤에 쿼리스트링(?type=sold)이 붙어도 불이 유지됩니다.
   */
  const isActive = (pathKey: string) => pathname.includes(`/mypage/${pathKey}`)

  const getTabClass = (pathKey: string) =>
    `${
      isActive(pathKey) ? 'bg-main-50 text-main-500 kr-subtitle-md' : 'kr-body-md text-gray3 hover:bg-gray-50'
    } flex w-full cursor-pointer items-center gap-x-2 rounded-[8px] p-3 transition-colors`

  return (
    <nav className="desktop:w-[180px] desktop:block hidden space-y-1">
      {/* MY 홈 탭 */}
      <div onClick={() => router.push(`/${lang}/mypage/home`)} className={getTabClass('home')}>
        {isActive('home') ? (
          <SidebarSelectedHomeIcon width={24} height={24} />
        ) : (
          <SidebarUnselectedHomeIcon width={24} height={24} />
        )}
        <p>{t('side_bar.home')}</p>
      </div>

      {/* 콘텐츠 내역 탭 */}
      <div onClick={() => router.push(`/${lang}/mypage/content?type=sold&page=0`)} className={getTabClass('content')}>
        {isActive('content') ? (
          <SidebarSelectedContentIcon width={24} height={24} />
        ) : (
          <SidebarUnselectedContentIcon width={24} height={24} />
        )}
        <p>{t('side_bar.content')}</p>
      </div>
    </nav>
  )
}
