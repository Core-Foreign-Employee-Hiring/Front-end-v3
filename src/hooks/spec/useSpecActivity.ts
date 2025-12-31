// hooks/useSpecActivity.ts
'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { StepType } from '@/app/[lang]/spec/page'
import { SpecAwardType, SpecExperienceType, SpecType } from '@/types/spec'
import { uploadFile } from '@/lib/client/common'
import { postSpecData, postSpecResult } from '@/lib/client/spec'

export default function useSpecActivity() {
  const router = useRouter()
  const pathname = usePathname()

  const {
    specActivities,
    addActivities,
    updateActivities,
    removeActivities,
    addAward,
    addExperience,
    setSpecEvaluationId,
  } = useSpecStore()

  // 1. 네비게이션
  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  // 2. 활동(Activities) CRUD 핸들러
  const handleAddActivities = () => {
    addActivities({
      awardName: '',
      host: '',
      acquiredDate: '',
      description: '',
      documentUrl: '',
    })
  }

  // 3. 타입 가드 도우미
  const isAward = (item: SpecAwardType | SpecExperienceType): item is SpecAwardType => 'awardName' in item
  const isExperience = (item: SpecAwardType | SpecExperienceType): item is SpecExperienceType => 'experience' in item

  // 4. 유효성 검사 (isActive)
  const isActive = useMemo(() => {
    if (!specActivities || specActivities.length === 0) return true

    return specActivities.every((activity) => {
      if (isAward(activity)) {
        return (
          activity.awardName.trim() !== '' && activity.host.trim() !== '' && activity.acquiredDate.trim().length >= 5
        )
      } else {
        const isBaseValid =
          activity.experience.trim() !== '' &&
          activity.description.trim() !== '' &&
          activity.startDate.trim().length >= 5
        const isEndDateValid =
          activity.endDate === null || (activity.endDate.trim() !== '' && activity.endDate.trim().length >= 5)
        return isBaseValid && isEndDateValid
      }
    })
  }, [specActivities])

  // 5. 내부 비즈니스 로직: 데이터 분배 및 파일 업로드 처리
  const finalizeSpecData = async (currentSpec: SpecType): Promise<SpecType> => {
    const finalSpec = { ...currentSpec }

    // 자격증 및 수상내역 파일 업로드 처리 루프
    const processFiles = async (items: any[]) => {
      if (!items) return items
      return Promise.all(
        items.map(async (item) => {
          if (item.documentUrl instanceof File) {
            const uploadedUrl = await uploadFile(item.documentUrl)
            return { ...item, documentUrl: uploadedUrl }
          }
          return item
        })
      )
    }

    finalSpec.certifications = await processFiles(finalSpec.certifications || [])
    finalSpec.awards = await processFiles(finalSpec.awards || [])

    return finalSpec
  }

  // 6. 최종 제출 핸들러
  const handleSubmit = async () => {
    try {
      // 활동 분배 (Store 업데이트)
      specActivities.forEach((activity) => {
        if (isAward(activity)) addAward(activity)
        else if (isExperience(activity)) addExperience(activity)
      })

      const latestSpec = useSpecStore.getState().spec
      const completedSpec = await finalizeSpecData(latestSpec)

      const result = await postSpecData(completedSpec)

      if (result.success) {
        const specResult = await postSpecResult()
        if (specResult.success && specResult.data?.data) {
          alert('성공적으로 저장되었습니다.')
          setSpecEvaluationId(specResult.data.data)
          router.push(`/spec/${specResult.data.data}`)
        }
      }
    } catch (error) {
      console.error('Submit Error:', error)
      alert('처리 중 오류가 발생했습니다.')
    }
  }

  return {
    specActivities,
    isActive,
    handleAddActivities,
    handleUpdateActivity: updateActivities,
    handleRemoveActivity: removeActivities,
    handlePrev: () => handleStepClick('4'),
    handleSubmit,
  }
}
