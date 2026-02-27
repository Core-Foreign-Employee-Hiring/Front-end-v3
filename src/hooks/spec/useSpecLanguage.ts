'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'
import { SpecLanguageSkillType } from '@/types/spec'
import { useToast } from '@/components/common/toast/ToastContext'
import { useTranslation } from 'react-i18next'

export default function useSpecLanguage(languageSkillsData: SpecLanguageSkillType[] | null | undefined) {
  const router = useRouter()
  const pathname = usePathname()
  const { error } = useToast()
  const { t } = useTranslation('message')

  // editLanguageSkills(기존 데이터)도 함께 가져옵니다.
  const { languageSkills, addLanguageSkill, editLanguageSkills } = useSpecStore((state) => state)

  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  const isChanged = useMemo(() => {
    // 1. 현재 화면의 모든 데이터를 하나로 합칩니다.
    // (빈 입력창은 비교 대상에서 제외하기 위해 filter 처리)
    const currentTotal = [...editLanguageSkills, ...languageSkills]
      .map((lang) => ({
        title: lang.title.trim(),
        score: lang.score.trim(),
      }))
      .filter((lang) => lang.title !== '' || lang.score !== '')

    // 2. 서버에서 온 원본 데이터 가공
    const original = (languageSkillsData || []).map((lang) => ({
      title: lang.title.trim(),
      score: lang.score.trim(),
    }))

    // 3. 개수 비교
    if (currentTotal.length !== original.length) return true

    // 4. 내용 비교 (ID를 제외하고 순수하게 텍스트만 비교)
    return JSON.stringify(currentTotal) !== JSON.stringify(original)
  }, [languageSkills, editLanguageSkills, languageSkillsData])

  const isActive = useMemo(() => {
    // 신규 입력창(languageSkills)에 입력 중인 내용이 있다면 모두 채워져야 통과
    if (!languageSkills || languageSkills.length === 0) return true
    return languageSkills.every((lang) => lang.title.trim() !== '' && lang.score.trim() !== '')
  }, [languageSkills])

  const handleNext = () => {
    if (isChanged) {
      error(t('message:save_error.title'), t('message:save_error.description'))
      return
    }
    navigateToStep('3')
  }

  return {
    languageSkills,
    isActive,
    isChanged,
    handleAddLanguageSkills: () => addLanguageSkill({ title: '', score: '' }),
    handlePrev: () => navigateToStep('1'),
    handleNext,
  }
}
