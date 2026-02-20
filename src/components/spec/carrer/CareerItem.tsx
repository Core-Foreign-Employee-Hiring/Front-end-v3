'use client'

import { Button, Label } from '@/components/common'
import { SpecCareerType } from '@/types/spec'
import { convertEnumToKorContractTypeLabel } from '@/utils/job-post'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { deleteSpecCareers } from '@/lib/client/spec/career'
import { DeleteIcon, EditIcon } from '@/assets/svgComponents'

interface CareerItemProps {
  career: SpecCareerType
  toggleFormOpenState: () => void
}

export default function CareerItem({ career, toggleFormOpenState }: CareerItemProps) {
  const { t } = useTranslation(['spec', 'filter'])
  const router = useRouter()

  return (
    <div className="border-gray2 flex flex-col gap-y-2 rounded-[12px] border p-5">
      <div className="flex items-start justify-between gap-x-[20px]">
        <section className="flex w-full flex-col gap-y-2">
          <Label label={career.companyName} type={'subtitleLg'} />
          <p className="kr-title-sm">{career.position}</p>
        </section>
        <section className="desktop:flex tablet:flex hidden shrink-0 gap-x-2 whitespace-nowrap">
          <Button onClick={toggleFormOpenState} size={'sm'} variant={'outline'} customClassName="w-fit">
            {t('spec:buttons.edit')}
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
            {t('spec:buttons.delete')}
          </Button>
        </section>
        <section className="desktop:hidden tablet:hidden flex shrink-0 gap-x-2 whitespace-nowrap">
          <Button
            leftIcon={<EditIcon width={24} height={24} />}
            onClick={toggleFormOpenState}
            size={'sm'}
            variant={'outline'}
            customClassName="w-[36px]"
          />
          <Button
            leftIcon={<DeleteIcon width={24} height={24} />}
            onClick={async () => {
              const result = await deleteSpecCareers(`${career.careerId}`)
              if (result.success) {
                router.refresh()
              }
            }}
            size={'sm'}
            variant={'outline'}
            customClassName="w-[36px]"
          />
        </section>
      </div>

      <div className="kr-body-sm text-gray4 flex items-center gap-x-2">
        <p>
          {career.startDate} ~ {career.endDate ? `${career.endDate}` : t('career.form.duration.isWorking')}
        </p>
        <p>|</p>
        <p>{t(convertEnumToKorContractTypeLabel(career.contractType))}</p>
      </div>
      <p className="kr-body-md text-gray5">{career.highlight}</p>
    </div>
  )
}
