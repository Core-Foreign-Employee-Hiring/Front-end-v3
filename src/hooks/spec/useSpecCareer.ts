'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'
import { SpecCareerType } from '@/types/spec'
import { useToast } from '@/components/common/toast/ToastContext'
import { useTranslation } from 'react-i18next'

export default function useSpecCareer(careersData: SpecCareerType[] | null | undefined) {
  const router = useRouter()
  const pathname = usePathname()
  const { error } = useToast()
  const { t } = useTranslation('message')

  const { careers, editCareers, addCareer } = useSpecStore((state) => state)

  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  // 1. 변경 사항 감지 로직
  const isChanged = useMemo(() => {
    // 현재 화면의 모든 데이터를 합침 (수정 중인 것 + 새로 추가한 것)
    const currentTotal = [...editCareers, ...careers]
      .map((career) => ({
        companyName: career.companyName.trim(),
        position: career.position.trim(),
        startDate: career.startDate.trim(),
        endDate: career.endDate?.trim() || null,
        contractType: career.contractType,
        highlight: career.highlight.trim(),
      }))
      .filter((career) => career.companyName !== '' || career.position !== '')

    // 서버 원본 데이터 가공
    const original = (careersData || []).map((career) => ({
      companyName: career.companyName.trim(),
      position: career.position.trim(),
      startDate: career.startDate.trim(),
      endDate: career.endDate?.trim() || null,
      contractType: career.contractType,
      highlight: career.highlight.trim(),
    }))

    if (currentTotal.length !== original.length) return true
    return JSON.stringify(currentTotal) !== JSON.stringify(original)
  }, [careers, editCareers, careersData])

  // 2. 유효성 검사 (isActive)
  const isActive = useMemo(() => {
    if (!careers || careers.length === 0) return true

    return careers.every((career) => {
      const isCompanyNameFilled = career.companyName.trim() !== ''
      const isPositionFilled = career.position.trim() !== ''
      const isStartDateFilled = career.startDate.trim() !== '' && career.startDate.length >= 5
      const isEndDateValid = career.endDate === null || (career.endDate.trim() !== '' && career.endDate.length >= 5)

      return isCompanyNameFilled && isPositionFilled && isStartDateFilled && isEndDateValid
    })
  }, [careers])

  const handleNext = () => {
    if (isChanged) {
      error(t('message:save_error.title'), t('message:save_error.description'))
      return
    }
    navigateToStep('5')
  }

  return {
    careers,
    isActive,
    isChanged,
    handlePrev: () => navigateToStep('3'),
    handleNext,
  }
}
