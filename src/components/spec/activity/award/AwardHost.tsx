import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface AwardHostProps {
  index: number
  activity: SpecAwardType
  onUpdate: (index: number, newData: SpecAwardType) => void
  host: string
}
export default function AwardHost({ index, activity, onUpdate, host }: AwardHostProps) {
  // 공통 변경 핸들러: 기존 activity를 복사하고 특정 필드만 업데이트
  const handleAwardChange = (index: number, fieldName: keyof SpecAwardType, value: string | number) => {
    onUpdate(index, {
      ...activity,
      [fieldName]: value,
    })
  }

  return (
    <div>
      <Label type={'inputLabel'} label={'수여기관'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'수여기관을 입력해주세요.'}
        value={host}
        onChange={(e) => handleAwardChange(index, 'host', e.target.value)}
      />
    </div>
  )
}
