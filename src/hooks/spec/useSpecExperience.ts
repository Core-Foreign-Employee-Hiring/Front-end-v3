'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'
import { SpecExperienceType } from '@/types/spec'
import { useToast } from '@/components/common/toast/ToastContext'
import { useTranslation } from 'react-i18next'

export default function useSpecExperience(experiencesData: SpecExperienceType[] | null | undefined) {
  const router = useRouter()
  const pathname = usePathname()
  const { error } = useToast()
  const { t } = useTranslation('message')

  const { experiences, editExperiences } = useSpecStore((state) => state)

  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  // 1. 변경 사항 감지 로직
  const isChanged = useMemo(() => {
    // 현재 총 데이터 (기존 수정본 + 신규 입력본)
    const currentTotal = [...editExperiences, ...experiences]
      .map((exp) => ({
        experience: exp.experience.trim(),
        beforeImprovementRate: String(exp.beforeImprovementRate).trim(),
        afterImprovementRate: String(exp.afterImprovementRate).trim(),
        description: exp.description.trim(),
        startDate: exp.startDate.trim(),
        endDate: exp.endDate?.trim() || null,
      }))
      .filter((exp) => exp.experience !== '') // 최소한 제목은 있어야 데이터로 간주

    // 원본 데이터 가공
    const original = (experiencesData || []).map((exp) => ({
      experience: exp.experience.trim(),
      beforeImprovementRate: String(exp.beforeImprovementRate).trim(),
      afterImprovementRate: String(exp.afterImprovementRate).trim(),
      description: exp.description.trim(),
      startDate: exp.startDate.trim(),
      endDate: exp.endDate?.trim() || null,
    }))

    if (currentTotal.length !== original.length) return true
    return JSON.stringify(currentTotal) !== JSON.stringify(original)
  }, [experiences, editExperiences, experiencesData])

  // 2. 유효성 검사 (입력 중인 항목이 있다면 필수값 체크)
  const isActive = useMemo(() => {
    if (!experiences || experiences.length === 0) return true
    return experiences.every((exp) => {
      return exp.experience.trim() !== '' && exp.startDate.trim().length >= 5 && exp.description.trim() !== ''
    })
  }, [experiences])

  return {
    isActive,
    isChanged,
    handlePrev: () => navigateToStep('5'),
  }
}
