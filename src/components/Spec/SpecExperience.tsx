'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { StepType } from '@/app/[lang]/spec/page'
import { SpecAwardType, SpecExperienceType } from '@/types/spec'
import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { AddActivityForm, BottomButton } from '@/components/spec/index'

export default function SpecExperience() {
  const router = useRouter()
  const pathname = usePathname()
  const [activities, setActivities] = useState<(SpecAwardType | SpecExperienceType)[]>([])

  const handleStepClick = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  // 특정 인덱스의 데이터를 업데이트하는 함수
  const handleUpdateActivity = (index: number, newData: SpecAwardType | SpecExperienceType) => {
    setActivities((prev) => prev.map((item, i) => (i === index ? newData : item)))
  }

  // 특정 인덱스의 데이터를 삭제하는 함수
  const handleRemoveActivity = (index: number) => {
    setActivities((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddActivities = () => {
    setActivities([
      ...activities,
      {
        awardName: '',
        host: '',
        acquiredDate: '',
        description: '',
        documentUrl: '',
      },
    ])
  }

  const isActive = useMemo(() => {
    // 1. activities가 비어있으면 다음 단계 가능 (true)
    if (!activities || activities.length === 0) return true

    // 2. 모든 활동 내역이 조건을 만족하는지 검사
    return activities.every((activity) => {
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
  }, [activities])

  const handleSubmit = () => {
    //1. activities에 값을 map을 돌려서 SpecAwardType이면 updateAward, SpecExperienceType이면 updateExperience로 해야 함
    //2. 이미지 업로드 해야함 자격증, 수상 -> documentURL
    //3. post 요청을 보내야함
  }

  return (
    <>
      <Label
        label={'수상 및 기타 경험'}
        className="kr-title-md"
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

      {activities.map((activity, index) => (
        <AddActivityForm
          key={index}
          index={index}
          activity={activity} // 현재 데이터 전달
          onUpdate={handleUpdateActivity}
          onRemove={handleRemoveActivity}
        />
      ))}

      <Spacing height={80} />
      <BottomButton
        step={'5'}
        handlePrev={() => handleStepClick('4')}
        isNextButtonActive={isActive}
        handleNext={() => handleStepClick('5')}
      />
    </>
  )
}
