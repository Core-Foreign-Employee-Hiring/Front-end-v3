'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateContentStore } from '@/store/contentStore'

export default function InquiryUrlField() {
  const { updateCreateContent, createContent } = useCreateContentStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'문의하기 URL'} isRequired={true} />
      <TextInput
        value={createContent.inquiryUrl ?? ''}
        onChange={(e) => {
          updateCreateContent('inquiryUrl', e.target.value)
        }}
        placeholder={'문의 시 연결될 오픈채팅 URL을 입력해 주세요.'}
      />
    </div>
  )
}
