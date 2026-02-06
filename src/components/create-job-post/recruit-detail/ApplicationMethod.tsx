'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import ToggleButton from '@/components/common/ToggleButton'

export default function ApplicationMethod() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'지원방법'} isRequired={true} />
      <div className="flex gap-x-3">
        <div className="flex items-center gap-x-2">
          <ToggleButton type={'SELECT'} />
          <p className="kr-button text-gray5">홈페이지 지원</p>
        </div>

        <div className="flex items-center gap-x-2">
          <ToggleButton type={'SELECT'} />
          <p className="kr-button text-gray5">전화/문자 지원</p>
        </div>

        <div className="flex items-center gap-x-2">
          <ToggleButton type={'SELECT'} />
          <p className="kr-button text-gray5">이메일 지원</p>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <div className="kr-subtitle-sm text-gray5 shrink-0">링크</div>
        <TextInput
          value={createJobPost.directInputApplicationMethod ?? ''}
          onChange={(e) => {
            updateCreateJobPost('directInputApplicationMethod', e.target.value)
          }}
          placeholder={'링크를 입력해주세요.'}
        />
      </div>
    </div>
  )
}
