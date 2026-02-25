'use client'

import { BottomBorder, Spacing } from '@/components/common/index'
import Label from '@/components/common/Label'
import Button from '@/components/common/Button'
import {
  SelectedAiIcon,
  SelectedCarrerIcon,
  SelectedContentIcon,
  SelectedHomeIcon,
  SelectedProgramIcon,
  SelectedRecruitIcon,
  UnselectedContentIcon,
  UnselectedGray4CarrerIcon,
  UnselectedGray4HomeIcon,
  UnselectedGray4RecruitIcon,
  UnselectedGrayAiInterviewIcon,
  UnselectedProgramIcon,
} from '@/assets/svgComponents'
import NavBar from '@/components/common/NavBar'
import Header from '@/components/common/Header'
import { useRouter } from 'next/navigation'
import { useMemo, useSyncExternalStore } from 'react'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'

interface MoreOptionsMenuProps {
  lang: string
  path: string
}

export default function MoreOptionsMenu({ lang, path }: MoreOptionsMenuProps) {
  const { t } = useTranslation('common')
  const router = useRouter()

  const { toggleModal } = useModalStore((state) => state)

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
    router.push(`/${lang}/login`)
    toggleModal('isMoreOptionsMenuOpen')
  }

  return (
    <div className="desktop:hidden flex min-h-screen flex-col bg-white">
      <Header path={path} headerType={'default'} currentLng={lang} />

      <div className="p-5">
        {userInfo?.name ? (
          <section className="border-gray2 flex flex-col gap-y-4 rounded-[12px] border bg-white p-[20px]">
            <div className="flex flex-col gap-y-1">
              <Label label={`${userInfo.name}`} type={'subtitleMd'} />
              <p className="kr-body-sm text-gray4">{userInfo.email}</p>
            </div>
            <Button
              onClick={() => {
                router.push(`/${lang}/mypage/home?type=sold&page=0`)
                toggleModal('isMoreOptionsMenuOpen')
              }}
              variant={'secondary'}
            >
              {t('navigation.my_page_text')}
            </Button>
          </section>
        ) : (
          <section className="border-gray2 bg-gray1 flex flex-col gap-y-4 rounded-[12px] p-[20px]">
            <Label label={'로그인이 필요해요'} type={'subtitleMd'} />
            <div className="flex gap-x-2">
              <Button
                onClick={() => {
                  router.push(`/${lang}/sign-up`)
                  toggleModal('isMoreOptionsMenuOpen')
                }}
                variant={'outline'}
              >
                {t('navigation.signup')}
              </Button>
              <Button
                onClick={() => {
                  router.push(`/${lang}/login`)
                  toggleModal('isMoreOptionsMenuOpen')
                }}
              >
                {t('navigation.login')}
              </Button>
            </div>
          </section>
        )}

        <Spacing height={32} />

        <Label label={t('navigation.menu_label')} type={'subtitleSm'} />
        <Spacing height={8} />
        {path === `/${lang}` ? (
          <div
            onClick={() => {
              router.push(`/${lang}`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <SelectedHomeIcon width={24} height={24} />
            <p className="text-main-500 kr-subtitle-sm">{t('navigation.home')}</p>
          </div>
        ) : (
          <div
            onClick={() => {
              router.push(`/${lang}`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <UnselectedGray4HomeIcon width={24} height={24} />
            <p className="text-gray4 kr-subtitle-sm">{t('navigation.home')}</p>
          </div>
        )}

        {path === `/${lang}/job-post` ? (
          <div
            onClick={() => {
              router.push(`/${lang}/job-post`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <SelectedRecruitIcon width={24} height={24} />
            <p className="text-main-500 kr-subtitle-sm">{t('navigation.job_post')}</p>
          </div>
        ) : (
          <div
            onClick={() => {
              router.push(`/${lang}/job-post`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <UnselectedGray4RecruitIcon width={24} height={24} />
            <p className="text-gray4 kr-subtitle-sm">{t('navigation.job_post')}</p>
          </div>
        )}

        {path === `/${lang}/carrer` ? (
          <div
            onClick={() => {
              router.push(`/${lang}/carrer?tab=resume`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <SelectedCarrerIcon width={24} height={24} />
            <p className="text-main-500 kr-subtitle-sm">{t('navigation.career')}</p>
          </div>
        ) : (
          <div
            onClick={() => {
              router.push(`/${lang}/carrer?tab=resume`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <UnselectedGray4CarrerIcon width={24} height={24} />
            <p className="text-gray4 kr-subtitle-sm">{t('navigation.career')}</p>
          </div>
        )}

        {path === `/${lang}/interview` ? (
          <div
            onClick={() => {
              router.push(`/${lang}/interview`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <SelectedAiIcon width={24} height={24} />
            <p className="text-main-500 kr-subtitle-sm">{t('navigation.interview')}</p>
          </div>
        ) : (
          <div
            onClick={() => {
              router.push(`/${lang}/interview`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <UnselectedGrayAiInterviewIcon width={24} height={24} />
            <p className="text-gray4 kr-subtitle-sm">{t('navigation.interview')}</p>
          </div>
        )}

        {path === `/${lang}/content` ? (
          <div
            onClick={() => {
              router.push(`/${lang}/content`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <SelectedContentIcon width={24} height={24} />
            <p className="text-main-500 kr-subtitle-sm">{t('navigation.content')}</p>
          </div>
        ) : (
          <div
            onClick={() => {
              router.push(`/${lang}/content`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <UnselectedContentIcon width={24} height={24} />
            <p className="text-gray4 kr-subtitle-sm">{t('navigation.content')}</p>
          </div>
        )}

        {path === `/${lang}/program` ? (
          <div
            onClick={() => {
              router.push(`/${lang}/program`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <SelectedProgramIcon width={24} height={24} />
            <p className="text-main-500 kr-subtitle-sm">{t('navigation.program')}</p>
          </div>
        ) : (
          <div
            onClick={() => {
              router.push(`/${lang}/program`)
              toggleModal('isMoreOptionsMenuOpen')
            }}
            className="flex cursor-pointer items-center gap-x-3 py-3"
          >
            <UnselectedProgramIcon width={24} height={24} />
            <p className="text-gray4 kr-subtitle-sm">{t('navigation.program')}</p>
          </div>
        )}

        {userInfo?.name && (
          <div>
            <Spacing height={20} />
            <BottomBorder />
            <button onClick={handleLogout} className="text-gray4 kr-subtitle-sm flex items-center py-3">
              {t('navigation.logout')}
            </button>
          </div>
        )}
      </div>

      <Spacing height={80} />
      <NavBar lang={lang} path={path} />
    </div>
  )
}
