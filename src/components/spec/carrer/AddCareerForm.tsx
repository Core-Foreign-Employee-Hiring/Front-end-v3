'use client'

import { Button, Label, Spacing } from '@/components/common'
import { useSpecStore } from '@/store/specStore'
import {
  CareerCompanyName,
  CareerContractType,
  CareerDuration,
  CareerHighlight,
  CareerPosition,
} from '@/components/spec'
import { SpecCareerType } from '@/types/spec'
import { useTranslation } from 'react-i18next'

interface AddCareerFormProps {
  index: number
  toggleFormOpenState: () => void
  career: SpecCareerType
}

export default function AddCareerForm({ index, toggleFormOpenState, career }: AddCareerFormProps) {
  const { t } = useTranslation(['spec'])
  const { removeCareer, updateCareer } = useSpecStore((state) => state)
  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleCareerChange = (
    index: number,
    fieldName: 'companyName' | 'position' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string | null
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    updateCareer(index, {
      companyName: career.companyName,
      startDate: career.startDate,
      endDate: career.endDate,
      contractType: career.contractType,
      position: career.position,
      highlight: career.highlight,
      [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
    })
  }
  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Spacing height={16} />

      <Label
        label={t('career.form.title')}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleFormOpenState()
              removeCareer(index)
            }}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            {t('buttons.delete')}
          </Button>
        }
      />

      <Spacing height={16} />
      <CareerCompanyName index={index} companyName={career.companyName} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <CareerPosition index={index} position={career.position} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <CareerDuration
        index={index}
        startDate={career.startDate}
        endDate={career.endDate}
        handleCareerChange={handleCareerChange}
      />

      <Spacing height={16} />
      <CareerContractType index={index} contractType={career.contractType} handleCareerChange={handleCareerChange} />

      <Spacing height={16} />
      <CareerHighlight index={index} highlight={career.highlight} handleCareerChange={handleCareerChange} />
    </div>
  )
}
