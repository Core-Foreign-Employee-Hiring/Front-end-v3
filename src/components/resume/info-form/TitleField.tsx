import { Label, Spacing, TextInput } from '@/components/common'

export default function TitleField() {
  return (
    <div>
      <Label label={'이력서 이름'} type={'titleSm'} isRequired={true} />
      <Spacing height={8} />
      <TextInput value={''} onChange={(e) => {}} placeholder={'예. 00직무 이력서, 00회사 지원용 이력서'} />
    </div>
  )
}
