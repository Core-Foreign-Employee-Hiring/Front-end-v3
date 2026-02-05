'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { AlarmIcon, BackIcon, LanguageIcon, LogoIcon, SearchIcon } from '@/assets/svgComponents'
import '@/lib/i18n-client'

interface HeaderProps {
  headerType?: 'default' | 'dynamic'
  currentLng: string
  path?: string
  title?: string
}

export default function Header({ headerType = 'default', currentLng = 'ko', path, title }: HeaderProps) {
  const { t } = useTranslation('common', { lng: currentLng })
  const currentPath = usePathname()
  const router = useRouter()

  const navItems = [
    { label: t('navigation.home'), href: `/${currentLng}` },
    { label: t('navigation.job-post'), href: `/${currentLng}/recruit` },
    { label: t('navigation.carrer'), href: `/${currentLng}/spec` },
    { label: t('navigation.interview'), href: `/${currentLng}/interview` },
    { label: t('navigation.content'), href: `/${currentLng}/content` },
    { label: t('navigation.program'), href: `/${currentLng}/program` },
  ]

  const iconClass = 'w-6 h-6 desktop:w-8 desktop:h-8 cursor-pointer'

  const renderDefaultHeader = () => (
    <div className="flex w-full items-center justify-between">
      <section className="desktop:gap-x-[60px] flex items-center gap-x-6">
        <Link href={`/${currentLng}`}>
          <LogoIcon className="desktop:h-9 desktop:w-[115px] h-7 w-[90px]" />
        </Link>

        <nav className="desktop:flex hidden gap-x-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`kr-title-sm transition-colors ${
                currentPath === item.href
                  ? 'text-main-500 hover:text-main-300'
                  : 'hover:text-main-400 hover:text-gray5 text-black'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="desktop:gap-x-5 flex items-center gap-x-3">
        <div className="flex items-center gap-x-3">
          <SearchIcon className={iconClass} />
          <LanguageIcon className={iconClass} />
          <AlarmIcon className={iconClass} />
        </div>

        <div className="kr-button text-gray4 tablet:flex hidden items-center gap-x-2">
          <Link href={`/${currentLng}/login`} className="hover:text-black">
            {t('navigation.login')}
          </Link>
          <span className="text-gray-300">|</span>
          <Link href={`/${currentLng}/sign-up`} className="hover:text-black">
            {t('navigation.signup')}
          </Link>
        </div>
      </section>
    </div>
  )

  const renderDynamicHeader = () => (
    <div className="relative flex w-full items-center">
      <button
        onClick={() => (path ? router.push(path) : router.back())}
        className="z-10 transition-transform active:scale-90"
      >
        <BackIcon className="h-8 w-8" />
      </button>
      <h1 className="kr-subtitle-md tablet:kr-subtitle-lg absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
        {title}
      </h1>
    </div>
  )

  return (
    <header className="tablet:px-8 desktop:h-[80px] desktop:px-10 desktop:py-5 sticky top-0 z-50 flex h-[56px] w-full items-center bg-white px-5 py-3">
      {headerType === 'default' ? renderDefaultHeader() : renderDynamicHeader()}
    </header>
  )
}
