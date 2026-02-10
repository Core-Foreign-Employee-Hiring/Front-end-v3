import { Label, Spacing, TextInput } from '@/components/common'

interface CareerCompanyNameProps {
  index: number
  companyName: string
  handleCareerChange: (
    index: number,
    fieldName: 'endDate' | 'startDate' | 'highlight' | 'position' | 'companyName' | 'contactType',
    value: string
  ) => void
}
export default function CareerCompanyName({ index, handleCareerChange, companyName }: CareerCompanyNameProps) {
  return (
    <div>
      <Label type={'inputLabel'} label={'회사명'} isRequired={true} className={'kr-title-sm text-gray5'} />
      <Spacing height={8} />
      <TextInput
        placeholder={'회사명을 입력해주세요.'}
        value={companyName}
        onChange={(e) => handleCareerChange(index, 'companyName', e.target.value)}
      />
    </div>
  )
}
