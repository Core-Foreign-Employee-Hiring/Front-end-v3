'use client'

import {
  NavCloseIcon,
  SelectedAiIcon,
  SelectedCarrerIcon,
  SelectedHomeIcon,
  SelectedRecruitIcon,
  UnselectedAiIcon,
  UnselectedCarrerIcon,
  UnselectedHomeIcon,
  UnselectedMoreIcon,
  UnselectedRecruitIcon,
} from '@/assets/svgComponents'
import Link from 'next/link'
import { useModalStore } from '@/store/modalStore'

interface NavBarProps {
  path: string
  lang: string
}

export default function NavBar({ path, lang }: NavBarProps) {
  const { setIsMoreOptionsMenuOpen, isMoreOptionsMenuOpen } = useModalStore((state) => state)
  return (
    <div className="border-gray2 desktop:hidden tablet:px-[32px] bg-gray1 fixed bottom-0 z-60 flex w-full justify-between border-t-[1px] px-[20px] pt-[12px] pb-[32px]">
      {path === `/${lang}` && !isMoreOptionsMenuOpen ? (
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

      {path === `/${lang}/job-post` && !isMoreOptionsMenuOpen ? (
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

      {path === `/${lang}/carrer` && !isMoreOptionsMenuOpen ? (
        <Link href={`/${lang}/carrer`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <SelectedCarrerIcon width={24} height={24} />
          <p className="kr-badge-sm text-main-500">커리어 진단</p>
        </Link>
      ) : (
        <Link href={`/${lang}/carrer`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <UnselectedCarrerIcon width={24} height={24} />
          <p className="kr-badge-sm text-gray3">커리어 진단</p>
        </Link>
      )}

      {path === `/${lang}/interview` && !isMoreOptionsMenuOpen ? (
        <Link href={`/${lang}/interview`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <SelectedAiIcon width={24} height={24} />
          <p className="kr-badge-sm text-main-500">AI 면접</p>
        </Link>
      ) : (
        <Link href={`/${lang}/interview`} className="flex w-[63px] flex-col items-center gap-y-[6px]">
          <UnselectedAiIcon width={24} height={24} />
          <p className="kr-badge-sm text-gray3">AI 면접</p>
        </Link>
      )}

      <button
        onClick={() => {
          setIsMoreOptionsMenuOpen(isMoreOptionsMenuOpen)
        }}
        className="flex w-[63px] flex-col items-center gap-y-[6px]"
      >
        {isMoreOptionsMenuOpen ? (
          <NavCloseIcon width={24} height={24} />
        ) : (
          <UnselectedMoreIcon width={24} height={24} />
        )}

        {isMoreOptionsMenuOpen ? (
          <p className="kr-badge-sm text-main-500">닫기</p>
        ) : (
          <p className="kr-badge-sm text-gray3">더보기</p>
        )}
      </button>
    </div>
  )
}
