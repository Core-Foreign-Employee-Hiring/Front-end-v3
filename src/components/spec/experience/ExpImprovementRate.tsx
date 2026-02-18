'use client'

import { SpecExperienceType } from '@/types/spec'
import { FocusEvent } from 'react'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'

interface ExpImprovementRateProps {
  experience: SpecExperienceType
  index: number
  handleExperienceChange: (index: number, fieldName: keyof SpecExperienceType, value: string | number | null) => void
}
export default function ExpImprovementRate({ index, handleExperienceChange, experience }: ExpImprovementRateProps) {
  // 1. 포커스 시 0 제거 로직
  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof SpecExperienceType) => {
    // 값이 '0'이면 빈 값으로 변경 (사용자가 바로 입력할 수 있게)
    if (e.target.value === '0') {
      handleExperienceChange(index, fieldName, '')
    }
  }

  // 2. 포커스 아웃 시 빈 값이면 다시 0으로 채우는 로직 (선택 사항)
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof SpecExperienceType) => {
    if (e.target.value === '') {
      handleExperienceChange(index, fieldName, '0')
    }
  }

  const getStatus = () => {
    if (typeof experience.afterImprovementRate === 'string' && typeof experience.beforeImprovementRate === 'string') {
      return parseInt(experience.beforeImprovementRate) > parseInt(experience.afterImprovementRate)
        ? 'error'
        : 'default'
    }
  }

  return (
    <div className="w-full">
      <Label label={'개선률'} className="kr-subtitle-lg text-gray5"></Label>
      <Spacing height={8} />
      <div className="flex flex-col gap-y-2">
        <div className="flex w-full gap-x-4">
          <TextInput
            status={getStatus()}
            onFocus={(e) => handleFocus(e, 'beforeImprovementRate')}
            onBlur={(e) => handleBlur(e, 'beforeImprovementRate')}
            onChange={(e) => handleExperienceChange(index, 'beforeImprovementRate', Number(e.target.value))}
            inputType={'number'}
            value={experience.beforeImprovementRate}
            placeholder={'이전 개선률'}
          />
          <TextInput
            status={getStatus()}
            onFocus={(e) => handleFocus(e, 'afterImprovementRate')}
            onBlur={(e) => handleBlur(e, 'afterImprovementRate')}
            onChange={(e) => handleExperienceChange(index, 'afterImprovementRate', Number(e.target.value))}
            inputType={'number'}
            value={experience.afterImprovementRate}
            placeholder={'이후 개선률'}
          />
        </div>
        {getStatus() === 'error' ? (
          <ErrorHelperText>이전 개선률이 이후 개선률보다 낮아야 합니다.</ErrorHelperText>
        ) : null}
      </div>
    </div>
  )
}
