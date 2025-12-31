import { Label, Spacing, TextInput } from '@/components/common'

export default function InterviewTitle() {
  return (
    <div>
      <Label label={'면접명'} type={'titleSm'} />
      <Spacing height={8} />
      <TextInput status={'default'} placeholder={'면접 명을 입력해주세요.'} />
    </div>
  )
}
