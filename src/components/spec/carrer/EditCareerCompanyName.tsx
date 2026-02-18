import { Label, Spacing, TextInput } from '@/components/common'

interface EditCareerCompanyNameProps {
  companyName: string
  handleCareerChange: (
    fieldName: 'companyName' | 'position' | 'endDate' | 'startDate' | 'highlight' | 'contractType',
    value: string | null
  ) => void
}
export default function EditCareerCompanyName({ companyName, handleCareerChange }: EditCareerCompanyNameProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'회사명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'회사명을 입력해주세요.'}
        value={companyName}
        onChange={(e) => handleCareerChange('companyName', e.target.value)}
      />
    </div>
  )
}
