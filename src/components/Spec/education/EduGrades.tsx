'use client'

import { FocusEvent } from 'react'
import Label from '@/components/common/Label'
import Spacing from '@/components/common/Spacing'
import TextInput from '@/components/common/TextInput'
import { useSpecStore } from '@/store/specStore'

export default function EduGrades() {
  const education = useSpecStore((state) => state.spec.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  // 1. education이 null이면 렌더링하지 않음 (타입 가드)
  if (!education) return null

  // 2. 숫자로 변환하여 업데이트하는 로직
  const updateField = (value: string, fieldName: 'earnedScore' | 'maxScore') => {
    // 입력값이 빈 문자열이면 0으로 처리하거나, 숫자 타입으로 변환
    const numValue = value === '' ? '' : Number(value)

    setEducation({
      ...education,
      [fieldName]: numValue,
    })
  }

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: 'earnedScore' | 'maxScore'
  ) => {
    if (e.target.value === '0') {
      updateField('', fieldName)
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: 'earnedScore' | 'maxScore') => {
    if (e.target.value === '') {
      updateField('0', fieldName)
    }
  }

  // score가 undefined나 null일 경우를 대비한 안전한 비교
  const getStatus = () => {
    const { earnedScore, maxScore } = education
    if (Number(earnedScore) < 0 || Number(earnedScore) > 4.5) {
      return 'error'
    }

    if (Number(maxScore) < 0 || Number(maxScore) > 4.5) {
      return 'error'
    }

    return Number(earnedScore) > Number(maxScore) ? 'error' : 'default'
  }

  const getHelperText = () => {
    const { earnedScore, maxScore } = education
    if (Number(earnedScore) < 0 || Number(earnedScore) > 4.5) return '학점은 0점 ~ 4.5점 사이 값이어야 합니다.'
    if (Number(maxScore) < 0 || Number(maxScore) > 4.5) return '총점은 0점 ~ 4.5점 사이 값이어야 합니다.'
    if (Number(earnedScore) > Number(maxScore)) return '학점이 총점보다 낮아야 합니다.'
  }

  return (
    <div className="w-full">
      <Label label={'학점'} className="kr-subtitle-lg text-gray5" isRequired={true} />
      <Spacing height={8} />
      <div className="flex w-full gap-x-4">
        <TextInput
          status={getStatus()}
          helperText={getHelperText()}
          onFocus={(e) => handleFocus(e, 'earnedScore')}
          onBlur={(e) => handleBlur(e, 'earnedScore')}
          onChange={(e) => updateField(e.target.value, 'earnedScore')}
          inputType={'number'}
          value={education.earnedScore ?? 0}
          placeholder={'학점'}
        />
        <TextInput
          status={getStatus()}
          onFocus={(e) => handleFocus(e, 'maxScore')}
          onBlur={(e) => handleBlur(e, 'maxScore')}
          onChange={(e) => updateField(e.target.value, 'maxScore')}
          inputType={'number'}
          value={education.maxScore ?? 0}
          placeholder={'총점'}
        />
      </div>
    </div>
  )
}
