import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface AwardHostProps {
  index: number
  award: SpecAwardType
  handleAwardChange: (
    index: number,
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}
export default function AwardHost({ index, award, handleAwardChange }: AwardHostProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'수여기관'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'수여기관을 입력해주세요.'}
        value={award.host}
        onChange={(e) => handleAwardChange(index, 'host', e.target.value)}
      />
    </div>
  )
}
