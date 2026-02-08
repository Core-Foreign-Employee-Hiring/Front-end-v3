'use client'

import { useMemo, useState, useSyncExternalStore } from 'react' // useMemo 추가
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BackIcon, DropDownGray3Icon, DropDownGray4Icon, LanguageIcon, LogoIcon } from '@/assets/svgComponents'
import '@/lib/i18n-client'
import PopUp from '@/components/common/PopUp'
import { Locale } from '@/lib/i18n.types'

interface HeaderProps {
  headerType?: 'default' | 'dynamic'
  currentLng: string
  path?: string
  title?: string
}

export default function Header({ headerType = 'default', currentLng = 'ko', path, title }: HeaderProps) {
  const { t } = useTranslation('common', { lng: currentLng })
  const { i18n } = useTranslation()
  const currentPath = usePathname()
  const router = useRouter()

  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [lng, setLng] = useState(currentLng)
  const pathname = usePathname()

  const [isLanguageSelectModalOpen, setIsLanguageSelectModalOpen] = useState(false)

  // 1. 원시 문자열(String)만 구독합니다. (문자열은 값이 같으면 참조가 같다고 간주됨)
  const rawUserInfo = useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback)
      return () => window.removeEventListener('storage', callback)
    },
    () => localStorage.getItem('userInfo'), // JSON.parse 제거
    () => null
  )

  // 2. 가져온 문자열을 메모이제이션하여 객체로 변환합니다.
  const userInfo = useMemo(() => {
    try {
      return rawUserInfo ? JSON.parse(rawUserInfo) : null
    } catch (e) {
      console.error('Failed to parse userInfo:', e)
      return null
    }
  }, [rawUserInfo])

  const handleLogout = () => {
    // 1. localStorage 삭제
    localStorage.removeItem('userInfo')

    // 2. 쿠키 삭제 (accessToken, refreshToken)
    // path=/ 설정이 있어야 모든 경로에서 생성된 쿠키를 확실히 지울 수 있습니다.
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    // 3. (선택사항) 만약 페이지 이동 전 상태를 즉시 반영하고 싶다면
    // storage 이벤트를 수동으로 발생시켜 useSyncExternalStore를 깨울 수 있습니다.
    window.dispatchEvent(new Event('storage'))

    // 4. 로그인 페이지로 이동
    router.push(`/${currentLng}/login`)
  }

  // 언어 변경 시 페이지 새로고침 (선택사항)
  const handleLanguageChange = (langCode: string) => {
    localStorage.setItem('language', langCode)
    setLng(langCode)
    i18n.changeLanguage(langCode)
    setIsLanguageSelectModalOpen(false)
    // 필요시 페이지 전체 새로고침
    // window.location.reload()
  }

  const changeLanguage = async (langCode: Locale) => {
    try {
      // i18n 언어 변경
      await i18n.changeLanguage(langCode)

      // localStorage에 저장 (선택사항)
      localStorage.setItem('i18nextLng', langCode)

      // 경로 변경 (언어 코드 포함)
      const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${langCode}`)
      router.push(newPathname)

      // 모달 닫기
      setIsLanguageSelectModalOpen(false)

      // 콜백 실행
      handleLanguageChange?.(langCode)
    } catch (error) {
      console.error('언어 변경 실패:', error)
    }
  }

  const loginPopupList = [
    {
      content: '마이페이지',
      textColor: 'text-black',
      onClick: () => router.push(`/${currentLng}/mypage/home`),
    },
    {
      content: '로그아웃',
      textColor: 'text-gray4',
      onClick: handleLogout,
    },
  ]

  const languagePopupList = [
    {
      content: '한국어',
      textColor: 'text-black',
      onClick: () => changeLanguage('ko'),
    },
    {
      content: '영어',
      textColor: 'text-black',
      onClick: () => changeLanguage('en'),
    },
  ]

  const navItems = [
    { label: t('navigation.home'), href: `/${currentLng}` },
    { label: t('navigation.recruit'), href: `/${currentLng}/job-post` },
    { label: t('navigation.spec'), href: `/${currentLng}/carrer` },
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

      <section className="desktop:gap-x-5 relative flex items-center gap-x-3">
        {isLanguageSelectModalOpen && (
          <PopUp className={'right-0'}>
            {languagePopupList.map((language) => (
              <PopUp.PopUpItem key={language.content} onClick={language.onClick} textColor={language.textColor}>
                {language.content}
              </PopUp.PopUpItem>
            ))}
          </PopUp>
        )}
        {isPopUpOpen && (
          <PopUp>
            {loginPopupList.map((popupItem) => (
              <PopUp.PopUpItem key={popupItem.content} onClick={popupItem.onClick} textColor={popupItem.textColor}>
                {popupItem.content}
              </PopUp.PopUpItem>
            ))}
          </PopUp>
        )}
        <div className="flex items-center gap-x-3">
          <LanguageIcon
            onClick={() => {
              setIsLanguageSelectModalOpen(!isLanguageSelectModalOpen)
            }}
            className={iconClass}
          />
        </div>

        <div className="kr-button text-gray4 tablet:flex hidden items-center gap-x-2">
          {userInfo?.name ? (
            <div
              onClick={() => {
                setIsPopUpOpen(!isPopUpOpen)
              }}
              className="flex cursor-pointer items-center gap-x-2"
            >
              <span className="kr-button text-gray5">{userInfo.name}</span>
              {isPopUpOpen ? (
                <DropDownGray3Icon width={20} height={20} />
              ) : (
                <DropDownGray4Icon width={20} height={20} />
              )}
            </div>
          ) : (
            <>
              <Link href={`/${currentLng}/login`} className="hover:text-black">
                {t('navigation.login')}
              </Link>
              <span className="text-gray-300">|</span>
              <Link href={`/${currentLng}/sign-up`} className="hover:text-black">
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
