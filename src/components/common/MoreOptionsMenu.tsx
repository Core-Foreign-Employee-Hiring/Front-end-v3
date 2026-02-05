'use client'

import { Spacing } from '@/components/common/index'
import Label from '@/components/common/Label'
import Button from '@/components/common/Button'
import {
  SelectedAiIcon,
  SelectedCarrerIcon,
  SelectedContentIcon,
  SelectedHomeIcon,
  SelectedProgramIcon,
  SelectedRecruitIcon,
  UnselectedAiIcon,
  UnselectedCarrerIcon,
  UnselectedContentIcon,
  UnselectedHomeIcon,
  UnselectedProgramIcon,
  UnselectedRecruitIcon,
} from '@/assets/svgComponents'

interface MoreOptionsMenuProps {
  lang: string
  path: string
}

export default function MoreOptionsMenu({ lang, path }: MoreOptionsMenuProps) {
  return (
    <div className="desktop:hidden flex min-h-screen flex-col bg-white p-5">
      <section className="border-gray2 bg-gray1 flex flex-col gap-y-4 rounded-[12px] p-[20px]">
        <Label label={'로그인이 필요해요'} type={'subtitleMd'} />
        <div className="flex gap-x-2">
          <Button onClick={() => {}} variant={'outline'}>
            회원가입
          </Button>
          <Button onClick={() => {}}>로그인</Button>
        </div>
      </section>
      <Spacing height={32} />

      <Label label={'전체 메뉴'} type={'subtitleSm'} />
      <Spacing height={8} />
      {path === `/${lang}` ? (
        <div className="flex gap-x-3 py-3">
          <SelectedHomeIcon width={24} height={24} />
          <p className="text-main-500 kr-subtitle-sm">홈</p>
        </div>
      ) : (
        <div className="flex gap-x-3 py-3">
          <UnselectedHomeIcon width={24} height={24} />
          <p className="text-gray4 kr-subtitle-sm">홈</p>
        </div>
      )}

      {path === `/${lang}/job-post` ? (
        <div className="flex gap-x-3 py-3">
          <SelectedRecruitIcon width={24} height={24} />
          <p className="text-main-500 kr-subtitle-sm">채용</p>
        </div>
      ) : (
        <div className="flex gap-x-3 py-3">
          <UnselectedRecruitIcon width={24} height={24} />
          <p className="text-gray4 kr-subtitle-sm">채용</p>
        </div>
      )}

      {path === `/${lang}/carrer` ? (
        <div className="flex gap-x-3 py-3">
          <SelectedCarrerIcon width={24} height={24} />
          <p className="text-main-500 kr-subtitle-sm">커리어 진단</p>
        </div>
      ) : (
        <div className="flex gap-x-3 py-3">
          <UnselectedCarrerIcon width={24} height={24} />
          <p className="text-gray4 kr-subtitle-sm">커리어 진단</p>
        </div>
      )}

      {path === `/${lang}/interview` ? (
        <div className="flex gap-x-3 py-3">
          <SelectedAiIcon width={24} height={24} />
          <p className="text-main-500 kr-subtitle-sm">AI 면접</p>
        </div>
      ) : (
        <div className="flex gap-x-3 py-3">
          <UnselectedAiIcon width={24} height={24} />
          <p className="text-gray4 kr-subtitle-sm">AI 면접</p>
        </div>
      )}

      {path === `/${lang}/content` ? (
        <div className="flex gap-x-3 py-3">
          <SelectedContentIcon width={24} height={24} />
          <p className="text-main-500 kr-subtitle-sm">콘텐츠</p>
        </div>
      ) : (
        <div className="flex gap-x-3 py-3">
          <UnselectedContentIcon width={24} height={24} />
          <p className="text-gray4 kr-subtitle-sm">콘텐츠</p>
        </div>
      )}

      {path === `/${lang}/program` ? (
        <div className="flex gap-x-3 py-3">
          <SelectedProgramIcon width={24} height={24} />
          <p className="text-main-500 kr-subtitle-sm">프로그램</p>
        </div>
      ) : (
        <div className="flex gap-x-3 py-3">
          <UnselectedProgramIcon width={24} height={24} />
          <p className="text-gray4 kr-subtitle-sm">프로그램</p>
        </div>
      )}
    </div>
  )
}
