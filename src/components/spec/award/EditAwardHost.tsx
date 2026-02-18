import { SpecAwardType } from '@/types/spec'
import { Label, Spacing, TextInput } from '@/components/common'

interface EditAwardHostProps {
  editAward: SpecAwardType
  handleAwardChange: (
    fieldName: 'awardName' | 'host' | 'acquiredDate' | 'description' | 'documentUrl',
    value: string | File | null
  ) => void
}
export default function EditAwardHost({ editAward, handleAwardChange }: EditAwardHostProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'수여기관'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'수여기관을 입력해주세요.'}
        value={editAward.host}
        onChange={(e) => handleAwardChange('host', e.target.value)}
      />
    </div>
  )
}
