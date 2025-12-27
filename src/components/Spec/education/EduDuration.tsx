'use client'

import { ChangeEvent, useState } from 'react'
import { Label, Spacing, TextInput } from '@/components/common'
import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { useSpecStore } from '@/store/specStore'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { SpecEducationType } from '@/types/spec' // 타입 경로에 맞춰 수정하세요

export default function EduDuration() {
  const education = useSpecStore((state) => state.spec.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  // 초기 상태: graduationDate가 null이면 재학 중으로 간주
  const [isInProgress, setIsInProgress] = useState<boolean>(education?.graduationDate === null)

  // 1. value 타입을 string | null로 확장
  const updateField = (fieldName: keyof SpecEducationType, value: string | null) => {
    if (!education) return // education 자체가 null이면 업데이트 불가

    setEducation({
      ...education,
      [fieldName]: value,
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof SpecEducationType) => {
    updateField(fieldName, formatYYYYMM(e.target.value))
  }

  const handleBlur = (value: string | null | undefined, fieldName: keyof SpecEducationType) => {
    // null이나 undefined가 들어올 수 있으므로 기본값 처리
    updateField(fieldName, padMonth(value ?? ''))
  }

  const getStatus = (value: string | null) => {
    if (!value) return 'default'
    return value.length > 0 && value.length < 7 ? 'error' : 'default' // YYYY-MM은 7자이므로 기준 수정 제안
  }

  return (
    <div className="w-full">
      <Label label="기간" className="kr-subtitle-lg text-gray5" isRequired />
      <Spacing height={8} />

      <div className="flex w-full gap-x-4">
        {/* 시작일 입력 */}
        <TextInput
          value={education?.admissionDate ?? ''}
          onChange={(e) => handleChange(e, 'admissionDate')}
          onBlur={() => handleBlur(education?.admissionDate, 'admissionDate')}
          status={getStatus(education?.admissionDate ?? '')}
          helperText="YYYY-MM 형태로 입력해주세요."
          placeholder="YYYY-MM"
        />

        {/* 종료일 입력: 재학 중이 아닐 때만 렌더링 */}
        {!isInProgress && (
          <TextInput
            value={education?.graduationDate ?? ''}
            onChange={(e) => handleChange(e, 'graduationDate')}
            onBlur={() => handleBlur(education?.graduationDate, 'graduationDate')}
            status={getStatus(education?.graduationDate ?? '')}
            helperText="YYYY-MM 형태로 입력해주세요."
            placeholder="YYYY-MM"
          />
        )}
      </div>

      <Spacing height={8} />
      <button
        type="button"
        onClick={() => {
          const nextState = !isInProgress
          setIsInProgress(nextState)
          // 재학중 체크 시 graduationDate를 null로 변경
          updateField('graduationDate', nextState ? null : '')
        }}
        className="flex items-center gap-x-2"
      >
        {isInProgress ? <CheckIcon width={24} height={24} /> : <UncheckIcon width={24} height={24} />}
        <p className="kr-subtitle-md text-gray5">재학중</p>
      </button>
    </div>
  )
}
