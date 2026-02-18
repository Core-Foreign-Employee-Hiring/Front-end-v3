'use client'

import { ResumeMemberBasicInfoType } from '@/types/resume'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { getJobRoleLabel, getNationality, getVisaLabel } from '@/utils/filterList'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import ImageModal from '@/components/common/modal/ImageModal'

interface IntroVer2Props {
  profileImageUrl: string | undefined
  introduction: string | undefined
  memberBasicInfo: ResumeMemberBasicInfoType | undefined
}
export default function IntroVer2({ profileImageUrl, introduction, memberBasicInfo }: IntroVer2Props) {
  const { t } = useTranslation()

  const { toggleModal, modals } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')

  return (
    <div className="tablet:py-[40px] tablet:px-[32px] desktop:py-[60px] desktop:px-[40px] flex flex-col gap-y-[32px] p-[20px]">
      {modals.isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      <div className="desktop:gap-x-[40px] tablet:gap-x-[40px] flex gap-x-[20px]">
        <div
          onClick={() => {
            toggleModal('isImageModalOpen')
            setSelectedImageUrl(profileImageUrl)
          }}
          className="tablet:w-[184px] tablet:h-[240px] desktop:h-[240px] desktop:w-[184px] relative h-[160px] w-[123px]"
        >
          <Image alt={'사진'} fill src={profileImageUrl || ''} className={'rounded-[8px] object-cover'} />
        </div>

        <section className="tablet:gap-y-[32px] desktop:gap-y-[32px] flex flex-col">
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
          <div className="desktop:block tablet:block hidden w-[80px] border-b border-black" />
          {introduction ? (
            <p className="desktop:kr-resume-md-light tablet:kr-resume-md-light kr-subtitle-md desktop:block tablet:block hidden">
              {introduction}
            </p>
          ) : null}
        </section>
      </div>
      {introduction ? (
        <p className="desktop:kr-resume-md-light tablet:kr-resume-md-light kr-subtitle-md desktop:hidden tablet:hidden block">
          {introduction}
        </p>
      ) : null}
      <div className="border-b-[2px] border-black" />
    </div>
  )
}
