'use client'

import {
  SelectedAiIcon,
  SelectedCarrerIcon,
  SelectedHomeIcon,
  SelectedMyIcon,
  SelectedRecruitIcon,
  UnselectedAiIcon,
  UnselectedCarrerIcon,
  UnselectedHomeIcon,
  UnselectedMyIcon,
  UnselectedRecruitIcon,
} from '@/assets/svgComponents'
import Link from 'next/link'
import { useModalStore } from '@/store/modalStore'

interface NavBarProps {
  path: string
  lang: string
}

export default function NavBar({ path, lang }: NavBarProps) {
  const { modals } = useModalStore((state) => state)
  return (
    <div className="border-gray2 desktop:hidden tablet:px-[32px] bg-gray1 fixed bottom-0 z-60 flex w-full justify-between border-t-[1px] px-[20px] pt-[12px] pb-[32px]">
      {path === `/${lang}` && !modals.isMoreOptionsMenuOpen ? (
        <Link href={`/${lang}`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <SelectedHomeIcon width={24} height={24} />
          <p className="kr-badge-sm text-main-500">홈</p>
        </Link>
      ) : (
        <Link href={`/${lang}`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <UnselectedHomeIcon width={24} height={24} />
          <p className="kr-badge-sm text-gray3">홈</p>
        </Link>
      )}

      {path === `/${lang}/job-post` && !modals.isMoreOptionsMenuOpen ? (
        <Link href={`/${lang}/job-post`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <SelectedRecruitIcon width={24} height={24} />
          <p className="kr-badge-sm text-main-500">채용</p>
        </Link>
      ) : (
        <Link href={`/${lang}/job-post`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <UnselectedRecruitIcon width={24} height={24} />
          <p className="kr-badge-sm text-gray3">채용</p>
        </Link>
      )}

      {path === `/${lang}/carrer` && !modals.isMoreOptionsMenuOpen ? (
        <Link href={`/${lang}/carrer?tab=spec`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <SelectedCarrerIcon width={24} height={24} />
          <p className="kr-badge-sm text-main-500">커리어 진단</p>
        </Link>
      ) : (
        <Link href={`/${lang}/carrer?tab=spec`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <UnselectedCarrerIcon width={24} height={24} />
          <p className="kr-badge-sm text-gray3">커리어 진단</p>
        </Link>
      )}

      {path === `/${lang}/interview` && !modals.isMoreOptionsMenuOpen ? (
        <Link href={`/${lang}/interview?tab=home`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <SelectedAiIcon width={24} height={24} />
          <p className="kr-badge-sm text-main-500">AI 면접</p>
        </Link>
      ) : (
        <Link href={`/${lang}/interview?tab=home`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <UnselectedAiIcon width={24} height={24} />
          <p className="kr-badge-sm text-gray3">AI 면접</p>
        </Link>
      )}

      {path === `/${lang}/mypage` && !modals.isMoreOptionsMenuOpen ? (
        <Link href={`/${lang}/mypage/home`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <SelectedMyIcon width={24} height={24} />
          <p className="kr-badge-sm text-main-500">MY</p>
        </Link>
      ) : (
        <Link href={`/${lang}/mypage/home`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <UnselectedMyIcon width={24} height={24} />
          <p className="kr-badge-sm text-gray3">MY</p>
        </Link>
      )}
    </div>
  )
}
