import { FocusEvent } from 'react'
import Label from '@/components/common/Label'
import Spacing from '@/components/common/Spacing'
import TextInput from '@/components/common/TextInput'
import { useSpecStore } from '@/store/specStore'

export default function EduGrades() {
  const education = useSpecStore((state) => state.spec.education)
  const setEducation = useSpecStore((state) => state.setEducation)

  const updateField = (value: string, fieldName: keyof typeof education) => {
    setEducation({
      ...education,
      [fieldName]: value,
    })
  }

  // 1. 포커스 시 0 제거 로직
  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof typeof education) => {
    // 값이 '0'이면 빈 값으로 변경 (사용자가 바로 입력할 수 있게)
    if (e.target.value === '0') {
      updateField('', fieldName)
    }
  }

  // 2. 포커스 아웃 시 빈 값이면 다시 0으로 채우는 로직 (선택 사항)
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof typeof education) => {
    if (e.target.value === '') {
      updateField('0', fieldName)
    }
  }

  const getStatus = () => (education.earnedScore > education.maxScore ? 'error' : 'default')

  return (
    <div className="w-full">
      <Label label={'학점'} className="kr-subtitle-lg text-gray5" isRequired={true}></Label>
      <Spacing height={8} />
      <div className="flex w-full gap-x-4">
        <TextInput
          status={getStatus()}
          helperText={'학점이 총점보다 낮아야 합니다.'}
          onFocus={(e) => handleFocus(e, 'earnedScore')}
          onBlur={(e) => handleBlur(e, 'earnedScore')}
          onChange={(e) => updateField(e.target.value, 'earnedScore')}
          inputType={'number'}
          value={education.earnedScore}
          placeholder={'학점'}
        />
        <TextInput
          status={getStatus()}
          onFocus={(e) => handleFocus(e, 'maxScore')}
          onBlur={(e) => handleBlur(e, 'maxScore')}
          onChange={(e) => updateField(e.target.value, 'maxScore')}
          inputType={'number'}
          value={education.maxScore}
          placeholder={'총점'}
        />
      </div>
    </div>
  )
}
