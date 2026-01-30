import { Label, TextInput } from '@/components/common'

export default function IdField() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'아이디'} />
      <TextInput value={''} onChange={(e) => {}} placeholder={'아이디를 입력해주세요.'} />
    </div>
  )
}
