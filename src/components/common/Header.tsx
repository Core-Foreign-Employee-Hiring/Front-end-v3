'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { useTranslation } from 'react-i18next'

import { AlarmIcon, BackIcon, LanguageIcon, LogoIcon, SearchIcon } from '@/assets/svgComponents'
import '@/lib/i18n-client'
import { router } from 'next/client'

interface HeaderProps {
  headerType: 'default' | 'dynamic'
  currentLng: string
  path?: string
  title?: string
}
export default function Header({ headerType = 'default', currentLng = 'ko', path, title }: HeaderProps) {
  const { t } = useTranslation('common', { lng: currentLng })

  const currentPath = usePathname()

  const headerMenuList = [
    { content: t('navigation.home'), path: `/${currentLng}` },
    { content: t('navigation.recruit'), path: `/${currentLng}/recruit` },
    { content: t('navigation.spec'), path: `/${currentLng}/spec` },
    { content: t('navigation.interview'), path: `/${currentLng}/interview` },
    { content: t('navigation.content'), path: `/${currentLng}/content` },
    { content: t('navigation.program'), path: `/${currentLng}/program` },
  ]

  const renderHeader = (headerType: 'default' | 'dynamic') => {
    switch (headerType) {
      case 'default':
        return (
          <div className="flex w-full justify-between">
            <section className="flex items-end gap-x-[60px]">
              <LogoIcon className="desktop:block hidden" width={115} height={36} />
              <LogoIcon className="desktop:hidden block" width={90} height={28} />
              <div className="desktop:flex hidden justify-end gap-x-[40px]">
                {headerMenuList.map((headerMenu) => (
                  <Link
                    className={`${currentPath === headerMenu.path ? 'text-main-500' : 'text-black'} kr-title-sm`}
                    href={headerMenu.path}
                    key={headerMenu.content}
                  >
                    {headerMenu.content}
                  </Link>
                ))}
              </div>
            </section>

            <section className="flex items-center gap-x-5">
              <div className="desktop:flex hidden gap-x-3">
                <SearchIcon width={32} height={32} />
                <LanguageIcon width={32} height={32} />
                <AlarmIcon width={32} height={32} />
              </div>
              <div className="desktop:hidden flex gap-x-3">
                <SearchIcon width={24} height={24} />
                <LanguageIcon width={24} height={24} />
                <AlarmIcon width={24} height={24} />
              </div>
              <div className="desktop:flex tablet:flex kr-button text-gray4 hidden gap-x-2">
                <Link href={`/${currentLng}/login`}>{t('navigation.login')}</Link>
                <p>|</p>
                <Link href={`/${currentLng}/sign-up`}>{t('navigation.signup')}</Link>
              </div>
            </section>
          </div>
        )
      case 'dynamic':
        return (
          <>
            <BackIcon
              onClick={() => {
                path ? router.push(path) : router.back()
              }}
              width={32}
              height={32}
            />
            <h1 className="tablet:kr-subtitle-lg kr-subtitle-md absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
              {title}
            </h1>
          </>
        )
    }
  }
  return (
    <header className="desktop:h-[80px] desktop:px-[40px] desktop:py-[20px] tablet:py-[12px] tablet:px-[32px] flex h-[56px] items-center bg-white px-[20px] py-[12px]">
      {renderHeader(headerType)}
    </header>
  )
}
