'use client'

import { Label } from '@/components/common'
import Image from 'next/image'
import Link from 'next/link'
import { CompanyType } from '@/types/job-post'
import { useTranslation } from 'react-i18next'
import { changeCompanyTypeEnumToKor } from '@/utils/filterList'
import ImageModal from '@/components/common/modal/ImageModal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'

interface CompanyInfoProps {
  companyName: string
  companyType: CompanyType
  companyImageUrl: string
  representativeName: string
  establishedDate: string
  businessType: string
}

export default function CompanyInfo({
  companyName,
  companyType,
  businessType,
  companyImageUrl,
  representativeName,
  establishedDate,
}: CompanyInfoProps) {
  const { t } = useTranslation()
  const { isImageModalOpen, setIsImageModalOpen } = useModalStore((state) => state)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | undefined | null>('')

  return (
    <div className="flex flex-col gap-y-2">
      {isImageModalOpen && <ImageModal setSelectedImageUrl={setSelectedImageUrl} ImageUrl={selectedImageUrl} />}

      <Label label={'기업 정보'} />
      <section className="bg-gray1 flex flex-col gap-y-4 rounded-[12px] p-4">
        <div className="flex gap-x-2">
          <div
            onClick={() => {
              setIsImageModalOpen(isImageModalOpen)
              setSelectedImageUrl(companyImageUrl)
            }}
            className="relative h-[48px] w-[48px]"
          >
            <Image src={companyImageUrl} alt={'썸네일'} fill className="rounded-[10px] object-cover" />
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="kr-title-sm">{companyName}</p>
            <p className="kr-body-md text-gray5">{businessType}</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <div className="flex">
            <div className="kr-body-md text-gray4 w-[80px]">대표</div>
            <p className="kr-subtitle-md text-gray5">{representativeName}</p>
          </div>

          <div className="flex">
            <div className="kr-body-md text-gray4 w-[80px]">설립일</div>
            <p className="kr-subtitle-md text-gray5">{establishedDate}</p>
          </div>

          <div className="flex">
            <div className="kr-body-md text-gray4 w-[80px]">회사형태</div>
            <p className="kr-subtitle-md text-gray5">{changeCompanyTypeEnumToKor(companyType)}</p>
          </div>

          <div className="flex">
            <div className="kr-body-md text-gray4 w-[80px]">웹사이트</div>
            <Link
              href={'/https://www.korfit.co.kr/ko'}
              className="kr-subtitle-md text-gray5 underline decoration-1 underline-offset-4"
            >
              웹사이트
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
