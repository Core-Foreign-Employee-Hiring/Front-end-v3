'use client'

import { SpecExperienceType } from '@/types/spec'
import { usePathname, useRouter } from 'next/navigation'
import { StepType } from '@/app/[lang]/carrer/page'
import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { BottomButton } from '@/components/spec'
import { useSpecStore } from '@/store/specStore'
import { useEffect } from 'react'
import EditExperienceEntry from '@/components/spec/experience/EditExperienceEntry'
import ExperienceEntry from '@/components/spec/experience/ExperienceEntry'
import { postSpecExperiences } from '@/lib/client/spec/experience'
import { postSpecResult } from '@/lib/client/spec'

interface SpecExperienceProps {
  experiencesData: SpecExperienceType[] | null | undefined
}
export default function SpecExperience({ experiencesData }: SpecExperienceProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { addExperience, editExperiences, setEditExperiences, experiences, setExperiences, setSpecEvaluationId } =
    useSpecStore((state) => state)

  useEffect(() => {
    if (experiencesData) {
      setEditExperiences(experiencesData)
    }
  }, [experiencesData])

  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  const handlePrev = () => navigateToStep('5')
  const handleNext = async () => {
    const specResult = await postSpecResult()
    console.log('스펙 데이터 결과 response', specResult)

    if (specResult.success && specResult.data?.data) {
      alert('성공적으로 저장되었습니다.')
      setSpecEvaluationId(specResult.data.data)
      router.push(`/carrer/${specResult.data.data}`)
    }
  }

  const handleSave = async () => {
    try {
      const result = await postSpecExperiences(experiences)

      // 3. 성공 후 처리
      if (result.success) {
        setExperiences([]) // 추가용 임시 상태 초기화 (필요시)
        router.refresh()
        alert('모든 경험이 성공적으로 저장되었습니다.')
      }
    } catch (error) {
      console.error('저장 과정 중 오류 발생:', error)
      alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div>
      <Label
        label={'기타 경험'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={() => {
              addExperience({
                experience: '',
                beforeImprovementRate: '',
                afterImprovementRate: '',
                description: '',
                startDate: '',
                endDate: '',
              })
            }}
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
      <div className="flex flex-col gap-y-[16px]">
        {editExperiences.map((editExperience) => (
          <EditExperienceEntry
            experiencesData={experiencesData}
            initialFormOpenState={false}
            key={editExperience.experienceId}
            editExperience={editExperience}
          />
        ))}
      </div>

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {experiences.map((experience, index) => (
          <ExperienceEntry key={index} experience={experience} index={index} initialFormOpenState={true} />
        ))}
      </div>

      <Button onClick={handleSave}>저장</Button>

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={true} handleNext={handleNext} />
    </div>
  )
}
