// hooks/useSpecEducation.ts
'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'

export default function useSpecEducation() {
  const router = useRouter()
  const pathname = usePathname()

  const education = useSpecStore((state) => state.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  // 1. 단계 이동 로직
  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  // 2. 학력 정보 초기화(추가) 로직
  const handleAddEducation = () => {
    setEducation({
      schoolName: '',
      admissionDate: '',
      graduationDate: '',
      majors: [''],
      earnedScore: '',
      maxScore: '',
    })
  }

  // 3. 유효성 검사 로직 (비즈니스 로직의 핵심)
  const isActive = useMemo(() => {
    if (!education) return false

    const { admissionDate, graduationDate, earnedScore, maxScore, schoolName, majors } = education

    const isAdmissionInvalid = !admissionDate || admissionDate.length <= 4
    const isGraduationInvalid = graduationDate && graduationDate.length <= 4

    const isRangeInvalid =
      Number(earnedScore) < 0 || Number(earnedScore) > 4.5 || Number(maxScore) < 0 || Number(maxScore) > 4.5

    const isScoreInvalid = Number(earnedScore) > Number(maxScore)
    const isSchoolEmpty = !schoolName || schoolName.trim() === ''
    const isMajorEmpty = !majors || majors.length === 0 || (majors.length === 1 && majors[0] === '')

    const isScoreEmpty = [earnedScore, maxScore].some((val) => val === null || val === '' || val === undefined)

    return !(
      isAdmissionInvalid ||
      isGraduationInvalid ||
      isRangeInvalid ||
      isScoreInvalid ||
      isSchoolEmpty ||
      isMajorEmpty ||
      isScoreEmpty
    )
  }, [education])

  return {
    education,
    isActive,
    handleAddEducation,
    handleNextStep: () => handleStepClick('2'),
  }
}
