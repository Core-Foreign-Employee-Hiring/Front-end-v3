'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddCareerForm, BottomButton } from '@/components/spec/index'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/spec/page'
import { useMemo } from 'react'

export default function SpecCareer() {
  const router = useRouter()
  const pathname = usePathname()
  const careers = useSpecStore((state) => state.spec.careers)
  const addCareer = useSpecStore((state) => state.addCareer)

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  const handleAddCareers = () => {
    addCareer({ companyName: '', position: '', startDate: '', endDate: '', contractType: 'INTERN', highlight: '' })
  }

  // isActive 로직 구현
  const isActive = useMemo(() => {
    if (!careers || careers.length === 0) return true

    // 모든 경력 항목이 필수 조건을 만족하는지 검사
    return careers.every((career) => {
      const isCompanyNameFilled = career.companyName.trim() !== ''
      const isPositionFilled = career.position.trim() !== ''

      // 시작일: 빈 값이 아니고 최소 5자 이상
      const isStartDateFilled = career.startDate.trim() !== '' && career.startDate.length >= 5

      // 종료일: null(재직중)이거나, null이 아니라면 빈 문자열이 아니어야 함
      // 즉, endDate가 '' 인 경우만 false가 됨
      const isEndDateValid = career.endDate === null || (career.endDate.trim() !== '' && career.endDate.length >= 5)

      return isCompanyNameFilled && isPositionFilled && isStartDateFilled && isEndDateValid
    })
  }, [careers])

  return (
    <div>
      <Label
        label={'경력'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={handleAddCareers}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />

      {careers?.map((career, index) => (
        <AddCareerForm
          key={index}
          index={index}
          companyName={career.companyName}
          position={career.position}
          startDate={career.startDate}
          endDate={career.endDate}
          contractType={career.contractType}
          highlight={career.highlight}
        />
      ))}

      <Spacing height={100} />
      <BottomButton
        handlePrev={() => handleStepClick('3')}
        isNextButtonActive={isActive}
        handleNext={() => handleStepClick('5')}
      />
    </div>
  )
}
