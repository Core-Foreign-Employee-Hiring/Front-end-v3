'use client'

import Image from 'next/image'
import { ResumeMemberBasicInfoType } from '@/types/resume'
import { getJobRoleLabel, getNationality, getVisaLabel } from '@/utils/filterList'
import { useTranslation } from 'react-i18next'

interface IntroVer1Props {
  profileImageUrl: string | undefined
  introduction: string | undefined
  memberBasicInfo: ResumeMemberBasicInfoType | undefined
}

export default function IntroVer1({ memberBasicInfo, profileImageUrl, introduction }: IntroVer1Props) {
  const { t } = useTranslation()
  return (
    <div className="bg-main-50 desktop:px-[40px] desktop:py-[60px] tablet:py-[40px] tablet:px-[32px] flex gap-x-[40px] px-[20px] py-[24px]">
      <div className="flex w-full justify-between gap-x-[40px]">
        <div className="desktop:gap-y-[32px] tablet:gap-y-[32px] flex flex-col gap-y-[24px]">
          <section className="flex flex-col gap-y-2">
            <h1 className="desktop:kr-resume-lg tablet:kr-resume-lg kr-title-md">{memberBasicInfo?.name}</h1>
            <p className="desktop:kr-resume-lg-light tablet:kr-resume-lg-light kr-subtitle-lg">
              {t(getJobRoleLabel(memberBasicInfo?.jobRole))}
            </p>
            <p className="desktop:kr-body-md tablet:kr-body-md kr-body-sm">
              {t(getNationality(memberBasicInfo?.nationality))} | {t(getVisaLabel(memberBasicInfo?.visa))}
            </p>
            <p className="desktop:kr-body-md tablet:kr-body-md kr-body-sm text-gray5">{memberBasicInfo?.phoneNumber}</p>
            <p className="desktop:kr-body-md tablet:kr-body-md kr-body-sm text-gray5">{memberBasicInfo?.email}</p>
          </section>

          <div className="w-[80px] border-b border-black" />
          {introduction ? (
            <p className="desktop:kr-resume-md-light tablet:kr-resume-md-light kr-subtitle-md">{introduction}</p>
          ) : null}
        </div>
        <div className="tablet:w-[184px] tablet:h-[240px] desktop:h-[240px] desktop:w-[184px] relative h-[160px] w-[123px]">
          <Image alt={'사진'} fill src={profileImageUrl || ''} className={'rounded-[8px] object-cover'} />
        </div>
      </div>
    </div>
  )
}
