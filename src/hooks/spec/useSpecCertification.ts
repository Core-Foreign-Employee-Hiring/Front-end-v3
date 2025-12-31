// hooks/useSpecCertification.ts
'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/spec/page'

export default function useSpecCertification() {
  const router = useRouter()
  const pathname = usePathname()

  const certifications = useSpecStore((state) => state.spec.certifications)
  const addCertification = useSpecStore((state) => state.addCertification)

  // 1. 단계 이동 공통 함수
  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  // 2. 자격증 추가 핸들러
  const handleAddCertification = () => {
    addCertification({
      certificationName: '',
      acquiredDate: '',
      documentUrl: null,
    })
  }

  // 3. 유효성 검사 로직
  const isActive = useMemo(() => {
    // 자격증 정보가 없거나 빈 배열이면 통과 (선택 사항)
    if (!certifications || certifications.length === 0) return true

    return certifications.every((cert) => {
      const isNameFilled = cert.certificationName.trim() !== ''
      // 취득일(YYYY-MM) 형식을 고려하여 최소 5자 이상 체크
      const isDateFilled = cert.acquiredDate.trim() !== '' && cert.acquiredDate.length >= 5

      return isNameFilled && isDateFilled
    })
  }, [certifications])

  return {
    certifications,
    isActive,
    handleAddCertification,
    handlePrev: () => navigateToStep('2'),
    handleNext: () => navigateToStep('4'),
  }
}
