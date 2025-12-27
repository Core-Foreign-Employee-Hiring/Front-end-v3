import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface AwardNameProps {
  index: number
  activity: SpecAwardType
  onUpdate: (index: number, newData: SpecAwardType) => void
  awardName: string
}

export default function AwardName({ index, awardName, onUpdate, activity }: AwardNameProps) {
  // 공통 변경 핸들러: 기존 activity를 복사하고 특정 필드만 업데이트
  const handleAwardChange = (index: number, fieldName: keyof SpecAwardType, value: string | number) => {
    onUpdate(index, {
      ...activity,
      [fieldName]: value,
    })
  }

  return (
    <div>
      <Label type={'inputLabel'} label={'수상명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'수상명을 입력해주세요.'}
        value={awardName}
        onChange={(e) => handleAwardChange(index, 'awardName', e.target.value)}
      />
    </div>
  )
}
