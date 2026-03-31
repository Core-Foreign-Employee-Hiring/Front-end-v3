'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateContentStore } from '@/store/contentStore'

export default function DescriptionField() {
  const { updateCreateContent, createContent } = useCreateContentStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'설명'} isRequired={true} />
      <TextInput
        onChange={(e) => {
          updateCreateContent('description', e.target.value)
        }}
        value={createContent.description ?? ''}
        placeholder={'상품에 대한 상세 설명을 작성해주세요.'}
      />
    </div>
  )
}
