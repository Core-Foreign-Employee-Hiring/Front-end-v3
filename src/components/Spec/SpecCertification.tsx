'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddCertForm, BottomButton } from '@/components/spec/index'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/spec/page'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from 'react'

export default function SpecCertification() {
  const router = useRouter()
  const pathname = usePathname()
  const certifications = useSpecStore((state) => state.spec.certifications)
  const addCertification = useSpecStore((state) => state.addCertification)

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  const handleAddLanguageSkills = () => {
    addCertification({ certificationName: '', acquiredDate: '', documentUrl: null })
  }

  const isActive = useMemo(() => {
    // 1. certifications가 null이거나 빈 배열([])이면 다음 단계 진행 가능 (true)
    if (!certifications || certifications.length === 0) return true

    // 2. 항목이 하나라도 추가되었다면, 모든 항목의 필수값이 채워졌는지 확인
    return certifications.every((cert) => {
      const isNameFilled = cert.certificationName.trim() !== ''
      // 취득일이 YYYY-MM(7자) 형식이므로 최소 길이를 체크하거나 빈 값 체크
      const isDateFilled = cert.acquiredDate.trim() !== '' && cert.acquiredDate.length >= 5

      // 이름과 날짜가 모두 채워져야 해당 항목은 유효함
      return isNameFilled && isDateFilled
    })
  }, [certifications])

  return (
    <div>
      <Label
        label={'자격증'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={handleAddLanguageSkills}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />

      {certifications?.map((certification, index) => (
        <AddCertForm
          key={index}
          index={index}
          certificationName={certification.certificationName}
          acquiredDate={certification.acquiredDate}
          documentUrl={certification.documentUrl}
        />
      ))}

      <Spacing height={100} />
      <BottomButton
        handlePrev={() => handleStepClick('2')}
        isNextButtonActive={isActive}
        handleNext={() => handleStepClick('4')}
      />
    </div>
  )
}
