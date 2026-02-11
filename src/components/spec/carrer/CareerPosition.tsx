import { Label, Spacing, TextInput } from '@/components/common'

interface CareerPositionProps {
  index: number
  position: string
  handleCareerChange: (
    index: number,
    fieldName: 'position' | 'companyName' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string
  ) => void
}
export default function CareerPosition({ index, position, handleCareerChange }: CareerPositionProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'포지션'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'포지션을 입력해주세요.'}
        value={position}
        onChange={(e) => handleCareerChange(index, 'position', e.target.value)}
      />
    </div>
  )
}
