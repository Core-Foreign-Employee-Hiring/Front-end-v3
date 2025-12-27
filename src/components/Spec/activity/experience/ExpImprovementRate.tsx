import { SpecExperienceType } from '@/types/spec'
import { FocusEvent } from 'react'
import { Label, Spacing, TextInput } from '@/components/common'

interface ExpImprovementRateProps {
  index: number
  beforeImprovementRate: number
  afterImprovementRate: number
  activity: SpecExperienceType
  onUpdate: (index: number, newData: SpecExperienceType) => void
}
export default function ExpImprovementRate({
  index,
  afterImprovementRate,
  beforeImprovementRate,
  activity,
  onUpdate,
}: ExpImprovementRateProps) {
  // 공통 변경 핸들러: 기존 activity를 복사하고 특정 필드만 업데이트
  const handleExperienceChange = (index: number, fieldName: keyof SpecExperienceType, value: string | number) => {
    onUpdate(index, {
      ...activity,
      [fieldName]: value,
    })
  }

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

  const getStatus = () => (beforeImprovementRate > afterImprovementRate ? 'error' : 'default')

  return (
    <div className="w-full">
      <Label label={'개선률'} className="kr-subtitle-lg text-gray5"></Label>
      <Spacing height={8} />
      <div className="flex w-full gap-x-4">
        <TextInput
          status={getStatus()}
          helperText={'이전 개선률이 이후 개선률보다 낮아야 합니다.'}
          onFocus={(e) => handleFocus(e, 'beforeImprovementRate')}
          onBlur={(e) => handleBlur(e, 'beforeImprovementRate')}
          onChange={(e) => handleExperienceChange(index, 'beforeImprovementRate', e.target.value)}
          inputType={'number'}
          value={beforeImprovementRate}
          placeholder={'이전 개선률'}
        />
        <TextInput
          status={getStatus()}
          onFocus={(e) => handleFocus(e, 'afterImprovementRate')}
          onBlur={(e) => handleBlur(e, 'afterImprovementRate')}
          onChange={(e) => handleExperienceChange(index, 'afterImprovementRate', e.target.value)}
          inputType={'number'}
          value={afterImprovementRate}
          placeholder={'이후 개선률'}
        />
      </div>
    </div>
  )
}
