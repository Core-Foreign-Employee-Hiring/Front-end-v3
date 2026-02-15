'use client'

import { ChangeEvent } from 'react'
import { ErrorHelperText, Label, Spacing, TextInput } from '@/components/common'
import { useSpecStore } from '@/store/specStore'
import { formatYYYYMM, padMonth } from '@/utils/spec'
import { SpecEducationType } from '@/types/spec' // 타입 경로에 맞춰 수정하세요

export default function EduDuration() {
  const education = useSpecStore((state) => state.education)
  const setEducation = useSpecStore((state) => state.setEducation)

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
    return value.length > 0 && value.length < 5 ? 'error' : 'default'
  }

  return (
    <div className="w-full">
      <Label label="기간" className="kr-subtitle-lg text-gray5" isRequired />
      <Spacing height={8} />

      <div className="flex flex-col gap-y-2">
        <div className="flex w-full gap-x-4">
          <TextInput
            value={education?.admissionDate ?? ''}
            onChange={(e) => handleChange(e, 'admissionDate')}
            onBlur={() => handleBlur(education?.admissionDate, 'admissionDate')}
            status={getStatus(education?.admissionDate ?? '')}
            placeholder="YYYY-MM"
          />

          <TextInput
            value={education?.graduationDate ?? ''}
            onChange={(e) => handleChange(e, 'graduationDate')}
            onBlur={() => handleBlur(education?.graduationDate, 'graduationDate')}
            status={getStatus(education?.graduationDate ?? '')}
            placeholder="YYYY-MM"
          />
        </div>
        {getStatus(education?.admissionDate ?? '') === 'error' ? (
          <ErrorHelperText>입학일을 YYYY-MM 형태로 입력해주세요.</ErrorHelperText>
        ) : getStatus(education?.graduationDate ?? '') === 'error' ? (
          <ErrorHelperText>졸업(예정)일을 YYYY-MM 형태로 입력해주세요.</ErrorHelperText>
        ) : null}
      </div>

      <Spacing height={8} />
    </div>
  )
}
