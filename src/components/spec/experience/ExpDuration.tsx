'use client'

import { ChangeEvent, useState } from 'react'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { SpecExperienceType } from '@/types/spec'

interface ExpDurationProps {
  experience: SpecExperienceType
  index: number
  handleExperienceChange: (index: number, fieldName: keyof SpecExperienceType, value: string | null) => void
}

export default function ExpDuration({ index, experience, handleExperienceChange }: ExpDurationProps) {
  // 초기 상태: graduationDate가 null이면 재학 중으로 간주
  const [isInProgress, setIsInProgress] = useState<boolean>(experience.endDate === null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: 'startDate' | 'endDate') => {
    handleExperienceChange(index, fieldName, formatYYYYMM(e.target.value))
  }

  const handleBlur = (value: string | undefined | null, fieldName: 'startDate' | 'endDate') => {
    handleExperienceChange(index, fieldName, padMonth(value || ''))
  }

  const getStatus = (value: string) => (value.length > 0 && value.length < 5 ? 'error' : 'default')

  return (
    <div className="w-full">
      <Label label="기간" className="kr-subtitle-lg text-gray5" isRequired />
      <Spacing height={8} />

      <div className="flex flex-col gap-y-2">
        <div className="flex w-full gap-x-4">
          <TextInput
            value={experience.startDate ?? ''}
            onChange={(e) => handleChange(e, 'startDate')}
            onBlur={() => handleBlur(experience.startDate, 'startDate')}
            status={getStatus(experience.startDate ?? '')}
            placeholder="YYYY-MM"
          />

          {!isInProgress && (
            <TextInput
              value={experience.endDate ?? ''}
              onChange={(e) => handleChange(e, 'endDate')}
              onBlur={() => handleBlur(experience.endDate, 'endDate')}
              status={getStatus(experience.endDate ?? '')}
              placeholder="YYYY-MM"
            />
          )}
        </div>
        {getStatus(experience.startDate ?? '') === 'error' ? (
          <ErrorHelperText>시작일을 YYYY-MM 형태로 입력해주세요.</ErrorHelperText>
        ) : getStatus(experience.endDate ?? '') === 'error' ? (
          <ErrorHelperText>종료일을 YYYY-MM 형태로 입력해주세요.</ErrorHelperText>
        ) : null}
      </div>

      <Spacing height={8} />
      <button
        type="button"
        onClick={() => {
          const nextState = !isInProgress
          setIsInProgress(nextState)
          handleExperienceChange(index, 'endDate', nextState ? null : '')
        }}
        className="flex items-center gap-x-2"
      >
        {isInProgress ? <CheckIcon width={24} height={24} /> : <UncheckIcon width={24} height={24} />}
        <p className="kr-subtitle-md text-gray5">진행중</p>
      </button>
    </div>
  )
}
