'use client'

import { SpecExperienceType } from '@/types/spec'
import { Button, Label, Spacing } from '@/components/common'
import { ExpDescription, ExpDuration, Experience, ExpImprovementRate } from '@/components/spec'
import { useSpecStore } from '@/store/specStore'
import { useTranslation } from 'react-i18next'

interface AddExperienceFormProps {
  index: number
  toggleFormOpenState: () => void
  experience: SpecExperienceType
}
export default function AddExperienceForm({ index, toggleFormOpenState, experience }: AddExperienceFormProps) {
  const { t } = useTranslation(['spec'])
  const { removeExperience, updateExperience } = useSpecStore((state) => state)
  /**
   * 특정 인덱스의 전공명 수정 핸들러
   */
  const handleExperienceChange = (
    index: number,
    fieldName: keyof SpecExperienceType,
    value: string | null | number
  ) => {
    // 업데이트 함수 호출 시 변경된 필드만 덮어씌웁니다.
    updateExperience(index, {
      experience: experience.experience,
      beforeImprovementRate: experience.beforeImprovementRate,
      afterImprovementRate: experience.afterImprovementRate,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate,
      [fieldName]: value, // 현재 바뀐 값으로 덮어쓰기
    })
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Spacing height={16} />

      <Label
        label={t('experience.form.title')}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleFormOpenState()
              removeExperience(index)
            }}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            {t('buttons.delete')}
          </Button>
        }
      />
      <Spacing height={24} />
      <Experience experience={experience} index={index} handleExperienceChange={handleExperienceChange} />

      <Spacing height={24} />
      <ExpDuration experience={experience} index={index} handleExperienceChange={handleExperienceChange} />

      <Spacing height={24} />
      <ExpDescription experience={experience} index={index} handleExperienceChange={handleExperienceChange} />

      <Spacing height={24} />
      <ExpImprovementRate experience={experience} index={index} handleExperienceChange={handleExperienceChange} />
    </div>
  )
}
