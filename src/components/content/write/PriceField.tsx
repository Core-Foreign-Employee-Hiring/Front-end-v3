'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateContentStore } from '@/store/contentStore'

export default function PriceField() {
  const { updateCreateContent, createContent } = useCreateContentStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'가격'} isRequired={true} />
      <div className="flex items-center gap-x-3">
        <TextInput
          inputType={'number'}
          onChange={(e) => {
            updateCreateContent('price', parseInt(e.target.value))
          }}
          value={createContent.price ?? 0}
          placeholder={'숫자만 입력해 주세요.'}
        />
        <p className="kr-subtitle-md">원</p>
      </div>
    </div>
  )
}
