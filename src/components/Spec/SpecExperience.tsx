'use client'

import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { StepType } from '@/app/[lang]/spec/page'
import { SpecAwardType, SpecExperienceType, SpecType } from '@/types/spec'
import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddActivityForm, BottomButton } from '@/components/spec/index'
import { useSpecStore } from '@/store/specStore'
import { uploadFile } from '@/lib/client/common'
import { postSpecData, postSpecResult } from '@/lib/client/spec'

export default function SpecExperience() {
  const {
    addAward,
    addExperience,
    setSpecEvaluationId,
    updateActivities,
    removeActivities,
    addActivities,
    specActivities,
  } = useSpecStore((state) => state)

  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  // 특정 인덱스의 데이터를 업데이트하는 함수
  const handleUpdateActivity = (index: number, newData: SpecAwardType | SpecExperienceType) => {
    updateActivities(index, newData)
  }

  // 특정 인덱스의 데이터를 삭제하는 함수
  const handleRemoveActivity = (index: number) => {
    removeActivities(index)
  }

  const handleAddActivities = () => {
    addActivities({
      awardName: '',
      host: '',
      acquiredDate: '',
      description: '',
      documentUrl: '',
    })
  }

  const isActive = useMemo(() => {
    // 1. activities가 비어있으면 다음 단계 가능 (true)
    if (!specActivities || specActivities.length === 0) return true

    // 2. 모든 활동 내역이 조건을 만족하는지 검사
    return specActivities.every((activity) => {
      // SpecAwardType인지 확인 (awardName 속성 존재 여부)
      if ('awardName' in activity) {
        return (
          activity.awardName.trim() !== '' &&
          activity.host.trim() !== '' &&
          activity.acquiredDate.trim() !== '' &&
          activity.acquiredDate.length >= 5
        )
      }

      // SpecExperienceType인 경우
      else {
        const isBaseValid =
          activity.experience.trim() !== '' &&
          activity.description.trim() !== '' &&
          activity.startDate.trim().length >= 5 // 시작일 5글자 이상

        // 종료일: null(진행중)이거나, string이면 5글자 이상
        const isEndDateValid =
          activity.endDate === null || (activity.endDate.trim() !== '' && activity.endDate.trim().length >= 5)

        return isBaseValid && isEndDateValid
      }
    })
  }, [specActivities])

  // awardName 속성이 있으면 SpecAwardType으로 간주
  const isAward = (item: SpecAwardType | SpecExperienceType): item is SpecAwardType => {
    return 'awardName' in item
  }

  // experience 속성이 있으면 SpecExperienceType으로 간주
  const isExperience = (item: SpecAwardType | SpecExperienceType): item is SpecExperienceType => {
    return 'experience' in item
  }

  const distributeActivities = () => {
    specActivities.forEach((activity) => {
      if (isAward(activity)) {
        // TypeScript가 여기서 activity를 SpecAwardType으로 자동 추론합니다.
        addAward(activity)
      } else if (isExperience(activity)) {
        // 여기서 activity는 SpecExperienceType으로 추론됩니다.
        addExperience(activity)
      }
    })
    console.log('')
  }

  const finalizeSpecData = async (currentSpec: SpecType): Promise<SpecType> => {
    // 1. 복사본 생성 (원본 훼손 방지)
    const finalSpec = { ...currentSpec }

    // 2. 자격증(certifications) 처리
    if (finalSpec.certifications) {
      finalSpec.certifications = await Promise.all(
        finalSpec.certifications.map(async (cert) => {
          if (cert.documentUrl instanceof File) {
            const uploadedUrl = await uploadFile(cert.documentUrl)
            return { ...cert, documentUrl: uploadedUrl }
          }
          return cert
        })
      )
    }

    // 3. 수상 내역(awards) 처리
    if (finalSpec.awards) {
      finalSpec.awards = await Promise.all(
        finalSpec.awards.map(async (award) => {
          if (award.documentUrl instanceof File) {
            console.log('award.documentUrl', award.documentUrl)
            const uploadedUrl = await uploadFile(award.documentUrl)
            return { ...award, documentUrl: uploadedUrl }
          }
          return award
        })
      )
    }

    return finalSpec
  }

  const handleSubmit = async () => {
    try {
      // 1. 먼저 Zustand Store에 활동 데이터들을 분배하여 저장 (동기 실행)
      distributeActivities()

      // 2. 중요: Hook으로 가져온 'spec'이 아닌, Store에서 '최신 상태'를 직접 가져옵니다.
      // Zustand의 set은 동기적으로 작동하므로 getState()로 즉시 최신본을 얻을 수 있습니다.
      const latestSpec = useSpecStore.getState().spec

      console.log('1️⃣. 분배 직후 Store Spec (Awards/Experiences):', {
        awards: latestSpec.awards,
        experiences: latestSpec.experiences,
      })

      // 3. 파일 업로드 및 URL 교체 작업 수행
      // Hook의 'spec' 대신 'latestSpec'을 전달합니다.
      const completedSpec = await finalizeSpecData(latestSpec)

      console.log('2️⃣. 파일 업로드 완료된 전체 Spec (CompletedSpec):', completedSpec)

      // 4. 최종 완성된 데이터를 백엔드 API로 전송
      const result = await postSpecData(completedSpec)

      console.log('3️⃣. 최종 서버 응답 결과 (Result):', result)

      if (result.success) {
        const specResult = await postSpecResult()
        if (specResult.success && specResult.data) {
          console.log('specResultId', specResult.data)
          if (specResult.data.data) {
            alert('성공적으로 저장되었습니다.')
            setSpecEvaluationId(specResult.data.data)
            router.push(`/spec/${specResult.data.data}`)
          }
        }
        // 저장 성공 후 다음 단계로 이동 등 후속 조치
      }
    } catch (error) {
      console.error('Submit Error:', error)
      alert('처리 중 오류가 발생했습니다.')
    }
  }

  return (
    <>
      <Label
        label={'수상 및 기타 경험'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={handleAddActivities}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />
      <Spacing height={16} />

      {specActivities.map((activity, index) => (
        <AddActivityForm
          key={index}
          index={index}
          activity={activity} // 현재 데이터 전달
          onUpdate={handleUpdateActivity}
          onRemove={handleRemoveActivity}
        />
      ))}

      <Spacing height={100} />
      <BottomButton
        step={'5'}
        handlePrev={() => handleStepClick('4')}
        isNextButtonActive={isActive}
        handleNext={() => {
          handleSubmit()
        }}
      />
    </>
  )
}
