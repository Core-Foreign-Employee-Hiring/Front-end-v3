// hooks/useSpecCareer.ts
'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'

export default function useSpecCareer() {
  const router = useRouter()
  const pathname = usePathname()

  const careers = useSpecStore((state) => state.spec.careers)
  const addCareer = useSpecStore((state) => state.addCareer)

  // 1. 단계 이동 로직
  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  // 2. 경력 추가 로직
  const handleAddCareer = () => {
    addCareer({
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      contractType: 'INTERN',
      highlight: '',
    })
  }

  // 3. 유효성 검사 (isActive)
  const isActive = useMemo(() => {
    // 경력 사항이 없으면 통과 (선택 사항일 경우)
    if (!careers || careers.length === 0) return true

    return careers.every((career) => {
      const isCompanyNameFilled = career.companyName.trim() !== ''
      const isPositionFilled = career.position.trim() !== ''

      // 시작일: 필수이며 YYYY-MM 형식을 위해 5자 이상 체크
      const isStartDateFilled = career.startDate.trim() !== '' && career.startDate.length >= 5

      // 종료일: null(재직 중)이거나, 값이 있다면 5자 이상이어야 함
      const isEndDateValid = career.endDate === null || (career.endDate.trim() !== '' && career.endDate.length >= 5)

      return isCompanyNameFilled && isPositionFilled && isStartDateFilled && isEndDateValid
    })
  }, [careers])

  return {
    careers,
    isActive,
    handleAddCareer,
    handlePrev: () => navigateToStep('3'),
    handleNext: () => navigateToStep('5'),
  }
}
