'use client'

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
  BackIcon,
  DropDownGray3Icon,
  DropDownGray4Icon,
  LanguageIcon,
  LogoIcon,
  MenuCloseIcon,
  MenuIcon,
} from '@/assets/svgComponents'
import '@/lib/i18n-client'
import PopUp from '@/components/common/PopUp'
import { Locale } from '@/lib/i18n.types'
import { useModalStore } from '@/store/modalStore'

interface HeaderProps {
  headerType?: 'default' | 'dynamic'
  currentLng: string
  path?: string
  title?: string
}

export default function Header({ headerType = 'default', currentLng = 'ko', path, title }: HeaderProps) {
  const { t, i18n } = useTranslation('common')
  const pathname = usePathname()
  const router = useRouter()

  // 1. 현재 URL 경로에서 언어(ko/en)를 직접 추출합니다.
  // 이 방식이 props보다 정확하며, URL 변경 시 즉시 반응합니다.
  const activeLng = useMemo(() => {
    const segment = pathname.split('/')[1]
    return (segment === 'ko' || segment === 'en' ? segment : currentLng) as Locale
  }, [pathname, currentLng])

  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isLanguageSelectModalOpen, setIsLanguageSelectModalOpen] = useState(false)
  const { toggleModal, modals } = useModalStore((state) => state)

  // --- 기존 사용자 정보 로직 유지 ---
  const rawUserInfo = useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback)
      return () => window.removeEventListener('storage', callback)
    },
    () => localStorage.getItem('userInfo'),
    () => null
  )

  const userInfo = useMemo(() => {
    try {
      return rawUserInfo ? JSON.parse(rawUserInfo) : null
    } catch (e) {
      return null
    }
  }, [rawUserInfo])

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    window.dispatchEvent(new Event('storage'))
    router.push(`/${activeLng}/login`)
  }

  // 언어 변경 함수
  const changeLanguage = async (langCode: Locale) => {
    if (activeLng === langCode) {
      setIsLanguageSelectModalOpen(false)
      return
    }

    try {
      // 1. i18n 상태 변경
      await i18n.changeLanguage(langCode)
      // 2. localStorage 업데이트
      localStorage.setItem('i18nextLng', langCode)
      // 3. 경로 변경 (예: /ko/career -> /en/career)
      const newPathname = pathname.replace(/^\/(ko|en)/, `/${langCode}`)
      router.push(newPathname)
      setIsLanguageSelectModalOpen(false)
    } catch (error) {
      console.error('언어 변경 실패:', error)
    }
  }

  // URL 언어와 i18n 인스턴스 동기화
  useEffect(() => {
    if (i18n.language !== activeLng) {
      i18n.changeLanguage(activeLng)
    }
  }, [activeLng, i18n])

  const languagePopupList = [
    { content: t('language.ko'), onClick: () => changeLanguage('ko') },
    { content: t('language.en'), onClick: () => changeLanguage('en') },
  ]

  const loginPopupList = [
    {
      content: t('navigation.my_page_text'),
      textColor: 'text-black',
      onClick: () => router.push(`/${activeLng}/mypage/home`),
    },
    { content: t('navigation.logout'), textColor: 'text-gray4', onClick: handleLogout },
  ]

  const navItems = [
    { label: t('navigation.home'), href: `/${activeLng}` },
    { label: t('navigation.job_post'), href: `/${activeLng}/job-post` },
    { label: t('navigation.career'), href: `/${activeLng}/carrer?tab=spec` },
    { label: t('navigation.interview'), href: `/${activeLng}/interview?tab=home` },
    { label: t('navigation.content'), href: `/${activeLng}/content` },
    { label: t('navigation.program'), href: `/${activeLng}/program` },
  ]

  const renderDefaultHeader = () => (
    <div className="flex w-full items-center justify-between">
      <section className="desktop:gap-x-[60px] flex items-center gap-x-6">
        <Link href={`/${activeLng}`}>
          <LogoIcon className="desktop:h-9 desktop:w-[115px] h-7 w-[90px]" />
        </Link>

        <nav className="desktop:flex hidden gap-x-10">
          {navItems.map((item) => {
            const pureItemPath = item.href.split('?')[0]
            const pureCurrentPath = pathname.split('?')[0]
            const isActive =
              pureItemPath === `/${activeLng}`
                ? pureCurrentPath === pureItemPath
                : pureCurrentPath.startsWith(pureItemPath)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`kr-title-sm transition-colors ${
                  isActive ? 'text-main-500' : 'hover:text-main-400 text-black'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </section>

      <section className="desktop:gap-x-5 relative flex items-center gap-x-3">
        {isLanguageSelectModalOpen && (
          <PopUp className={'right-0'}>
            {languagePopupList.map((lang) => (
              <PopUp.PopUpItem key={lang.content} onClick={lang.onClick}>
                {lang.content}
              </PopUp.PopUpItem>
            ))}
          </PopUp>
        )}
        {isPopUpOpen && (
          <PopUp>
            {loginPopupList.map((item) => (
              <PopUp.PopUpItem key={item.content} onClick={item.onClick} textColor={item.textColor}>
                {item.content}
              </PopUp.PopUpItem>
            ))}
          </PopUp>
        )}

        <div className="flex items-center gap-x-2">
          <LanguageIcon
            onClick={() => setIsLanguageSelectModalOpen(!isLanguageSelectModalOpen)}
            className="desktop:w-8 desktop:h-8 h-6 w-6 cursor-pointer"
          />
          <div onClick={() => toggleModal('isMoreOptionsMenuOpen')} className="desktop:hidden cursor-pointer">
            {modals.isMoreOptionsMenuOpen ? (
              <MenuCloseIcon width={24} height={24} />
            ) : (
              <MenuIcon width={24} height={24} />
            )}
          </div>
        </div>

        <div className="kr-button text-gray4 tablet:flex hidden items-center gap-x-2">
          {userInfo?.name ? (
            <div onClick={() => setIsPopUpOpen(!isPopUpOpen)} className="flex cursor-pointer items-center gap-x-2">
              <span className="kr-button text-gray5">{userInfo.name}</span>
              {isPopUpOpen ? (
                <DropDownGray3Icon width={20} height={20} />
              ) : (
                <DropDownGray4Icon width={20} height={20} />
              )}
            </div>
          ) : (
            <>
              <Link href={`/${activeLng}/login`} className="hover:text-black">
                {t('navigation.login')}
              </Link>
              <span className="text-gray-300">|</span>
              <Link href={`/${activeLng}/sign-up?step=1`} className="hover:text-black">
                {t('navigation.signup')}
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  )

  const renderDynamicHeader = () => (
    <div className="relative flex w-full items-center">
      <button onClick={() => (path ? router.push(path) : router.back())} className="z-10">
        <BackIcon className="h-8 w-8" />
      </button>
      <h1 className="kr-subtitle-md absolute left-1/2 -translate-x-1/2 whitespace-nowrap">{title}</h1>
    </div>
  )

  return (
    <header className="desktop:h-[80px] tablet:px-8 desktop:px-10 sticky top-0 z-50 flex h-[56px] w-full items-center bg-white px-5 py-3">
      {headerType === 'default' ? renderDefaultHeader() : renderDynamicHeader()}
    </header>
  )
}
