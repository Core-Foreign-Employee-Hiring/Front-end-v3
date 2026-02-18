'use client'

import { Button, Label } from '@/components/common'
import { SpecCareerType } from '@/types/spec'
import { convertEnumToKorContractTypeLabel } from '@/utils/job-post'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { deleteSpecCareers } from '@/lib/client/spec/career'

interface CareerItemProps {
  career: SpecCareerType
  toggleFormOpenState: () => void
}

export default function CareerItem({ career, toggleFormOpenState }: CareerItemProps) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="border-gray2 flex items-start justify-between gap-x-[20px] rounded-[12px] border p-5">
      <section className="flex w-full flex-col gap-y-2">
        <Label label={career.companyName} type={'subtitleLg'} />
        <p className="kr-title-sm">{career.position}</p>
        <div className="kr-body-sm text-gray4 flex items-center gap-x-2">
          <p>
            {career.startDate} ~ {career.endDate ? `${career.endDate}` : '현재 재직중'}
          </p>
          <p>|</p>
          <p>{t(convertEnumToKorContractTypeLabel(career.contractType))}</p>
        </div>
        <p className="kr-body-md text-gray5">{career.highlight}</p>
      </section>

      <section className="flex shrink-0 gap-x-2 whitespace-nowrap">
        <Button onClick={toggleFormOpenState} size={'sm'} variant={'outline'} customClassName="w-fit">
          수정
        </Button>
        <Button
          onClick={async () => {
            const result = await deleteSpecCareers(`${career.careerId}`)
            if (result.success) {
              router.refresh()
            }
          }}
          size={'sm'}
          variant={'outline'}
          customClassName="w-fit"
        >
          삭제
        </Button>
      </section>
    </div>
  )
}
