import { Button, Label, TextInput } from '@/components/common'

export default function EmailField() {
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'이메알'} />
      <div className="flex gap-x-2">
        <TextInput value={''} onChange={(e) => {}} placeholder={'이메일을 입력해주세요.'} />
        <Button>이메일 전송</Button>
      </div>
    </div>
  )
}
