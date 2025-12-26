'use client'

import { ChangeEvent } from 'react'
import { Label, Spacing, TextInput } from '@/components/common'
import { useSpecStore } from '@/store/specStore'
import { formatYYYYMM, padMonth } from '@/utils/spec'

export default function EduDuration() {
  const education = useSpecStore((state) => state.spec.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  const updateField = (fieldName: keyof typeof education, value: string) => {
    setEducation({
      ...education,
      [fieldName]: value,
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof typeof education) => {
    updateField(fieldName, formatYYYYMM(e.target.value))
  }

  const handleBlur = (value: string, fieldName: keyof typeof education) => {
    updateField(fieldName, padMonth(value))
  }

  const getStatus = (value: string) => (value.length > 0 && value.length < 7 ? 'error' : 'default')

  return (
    <div className="w-full">
      <Label label="기간" className="kr-subtitle-lg text-gray5" isRequired />
      <Spacing height={8} />

      <div className="flex w-full gap-x-4">
        {/* 시작일 입력 */}
        <TextInput
          value={education.admissionDate ?? ''}
          onChange={(e) => handleChange(e, 'admissionDate')}
          onBlur={() => handleBlur(education.admissionDate, 'admissionDate')}
          status={getStatus(education.admissionDate ?? '')}
          helperText="YYYY-MM 형태로 입력해주세요."
          placeholder="YYYY-MM"
        />

        {/* 종료일 입력 */}
        <TextInput
          value={education.graduationDate ?? ''}
          onChange={(e) => handleChange(e, 'graduationDate')}
          onBlur={() => handleBlur(education.graduationDate, 'graduationDate')}
          status={getStatus(education.graduationDate ?? '')}
          helperText="YYYY-MM 형태로 입력해주세요."
          placeholder="YYYY-MM"
        />
      </div>
    </div>
  )
}
