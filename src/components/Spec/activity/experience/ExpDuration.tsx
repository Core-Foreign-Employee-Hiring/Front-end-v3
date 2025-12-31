'use client'
import { ChangeEvent, useState } from 'react'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { SpecExperienceType } from '@/types/spec'

interface ExpDurationProps {
  index: number
  activity: SpecExperienceType
  startDate: string
  endDate: string | null
  onUpdate: (index: number, newData: SpecExperienceType) => void
}

export default function ExpDuration({ index, activity, startDate, endDate, onUpdate }: ExpDurationProps) {
  // 초기 상태: graduationDate가 null이면 재학 중으로 간주
  const [isInProgress, setIsInProgress] = useState<boolean>(endDate === null)
  // 공통 변경 핸들러: 기존 activity를 복사하고 특정 필드만 업데이트
  const handleExperienceChange = (
    index: number,
    fieldName: keyof SpecExperienceType,
    value: string | number | null
  ) => {
    onUpdate(index, {
      ...activity, // 1. 기존 데이터(experience, description 등) 복사
      [fieldName]: value, // 2. 변경된 필드만 덮어쓰기
    })
  }

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
            value={startDate ?? ''}
            onChange={(e) => handleChange(e, 'startDate')}
            onBlur={() => handleBlur(startDate, 'startDate')}
            status={getStatus(startDate ?? '')}
            placeholder="YYYY-MM"
          />

          {!isInProgress && (
            <TextInput
              value={endDate ?? ''}
              onChange={(e) => handleChange(e, 'endDate')}
              onBlur={() => handleBlur(endDate, 'endDate')}
              status={getStatus(endDate ?? '')}
              placeholder="YYYY-MM"
            />
          )}
        </div>
        {getStatus(startDate ?? '') === 'error' ? (
          <ErrorHelperText>시작일을 YYYY-MM 형태로 입력해주세요.</ErrorHelperText>
        ) : getStatus(endDate ?? '') === 'error' ? (
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
