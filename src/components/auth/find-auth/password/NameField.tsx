import { Label, TextInput } from '@/components/common'

export default function NameField() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'이름'} />
      <TextInput value={''} onChange={(e) => {}} placeholder={'이름을 입력해주세요.'} />
    </div>
  )
}
