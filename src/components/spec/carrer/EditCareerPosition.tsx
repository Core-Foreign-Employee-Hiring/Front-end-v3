import { Label, Spacing, TextInput } from '@/components/common'

interface EditCareerPositionProps {
  position: string
  handleCareerChange: (
    fieldName: 'companyName' | 'endDate' | 'startDate' | 'highlight' | 'position' | 'contractType',
    value: string | null
  ) => void
}
export default function EditCareerPosition({ position, handleCareerChange }: EditCareerPositionProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'포지션'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'포지션을 입력해주세요.'}
        value={position}
        onChange={(e) => handleCareerChange('position', e.target.value)}
      />
    </div>
  )
}
