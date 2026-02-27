'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/carrer/page'
import { SpecAwardType } from '@/types/spec'
import { useToast } from '@/components/common/toast/ToastContext'
import { useTranslation } from 'react-i18next'

export default function useSpecAward(awardsData: SpecAwardType[] | null | undefined) {
  const router = useRouter()
  const pathname = usePathname()
  const { error } = useToast()
  const { t } = useTranslation('message')

  const { awards, editAwards } = useSpecStore((state) => state)

  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  // 1. 변경 사항 감지 로직
  const isChanged = useMemo(() => {
    // 현재 화면의 총합 (수정 중인 것 + 신규 추가)
    const currentTotal = [...editAwards, ...awards]
      .map((award) => ({
        awardName: award.awardName.trim(),
        host: award.host.trim(),
        acquiredDate: award.acquiredDate.trim(),
        description: award.description.trim(),
        hasFile: !!award.documentUrl,
        fileName: award.documentUrl instanceof File ? award.documentUrl.name : award.documentUrl,
      }))
      .filter((award) => award.awardName !== '' || award.host !== '')

    // 원본 데이터 가공
    const original = (awardsData || []).map((award) => ({
      awardName: award.awardName.trim(),
      host: award.host.trim(),
      acquiredDate: award.acquiredDate.trim(),
      description: award.description.trim(),
      hasFile: !!award.documentUrl,
      fileName: award.documentUrl,
    }))

    if (currentTotal.length !== original.length) return true
    return JSON.stringify(currentTotal) !== JSON.stringify(original)
  }, [awards, editAwards, awardsData])

  // 2. 유효성 검사 (신규 입력창 기준)
  const isActive = useMemo(() => {
    if (!awards || awards.length === 0) return true
    return awards.every((award) => {
      return award.awardName.trim() !== '' && award.host.trim() !== '' && award.acquiredDate.trim().length >= 5
    })
  }, [awards])

  const handleNext = () => {
    if (isChanged) {
      error(t('message:save_error.title'), t('message:save_error.description'))
      return
    }
    navigateToStep('6')
  }

  return {
    isActive,
    isChanged,
    handlePrev: () => navigateToStep('4'),
    handleNext,
  }
}
