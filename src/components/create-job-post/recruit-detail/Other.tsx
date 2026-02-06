'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function Other() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'기타 안내'} isOption={true} />
      <TextInput
        textType={'textArea'}
        onChange={(e) => {
          updateCreateJobPost('others', e.target.value)
        }}
        value={createJobPost.others ?? ''}
        placeholder={'복지, 회사 소개, 근무 환경, 채용 프로세스 등 추가적으로 알려주고 싶은 내용을 입력해주세요.'}
      />
    </div>
  )
}
