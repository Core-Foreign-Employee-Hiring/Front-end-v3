'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateContentStore } from '@/store/contentStore'

export default function OneLineReviewField() {
  const { updateCreateContent, createContent } = useCreateContentStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'한줄 설명'} isRequired={true} />
      <TextInput
        onChange={(e) => {
          updateCreateContent('oneLineReview', e.target.value)
        }}
        value={createContent.oneLineReview ?? ''}
        placeholder={'상품에 대한 한줄 설명을 작성해주세요.'}
      />
    </div>
  )
}
