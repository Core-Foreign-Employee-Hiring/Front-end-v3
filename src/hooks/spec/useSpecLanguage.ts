// hooks/useSpecLanguage.ts
'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'

export default function useSpecLanguage() {
  const router = useRouter()
  const pathname = usePathname()

  const languageSkills = useSpecStore((state) => state.spec.languageSkills)
  const addLanguageSkills = useSpecStore((state) => state.addLanguageSkills)

  // 1. 단계 이동 공통 함수
  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  // 2. 어학 능력 항목 추가 핸들러
  const handleAddLanguageSkills = () => {
    addLanguageSkills({ title: '', score: '' })
  }

  // 3. 다음 단계 활성화 조건 (유효성 검사)
  const isActive = useMemo(() => {
    // 항목이 없으면 통과 (선택 사항일 경우)
    if (!languageSkills || languageSkills.length === 0) return true

    // 모든 항목의 제목과 점수가 입력되었는지 확인
    return languageSkills.every((lang) => {
      return lang.title.trim() !== '' && lang.score.trim() !== ''
    })
  }, [languageSkills])

  return {
    languageSkills,
    isActive,
    handleAddLanguageSkills,
    handlePrev: () => navigateToStep('1'),
    handleNext: () => navigateToStep('3'),
  }
}
