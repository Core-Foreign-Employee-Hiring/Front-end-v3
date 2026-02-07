'use client'

import { Label } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import ToggleButton from '@/components/common/ToggleButton'
import DirectInputApplicationMethod from '@/components/create-job-post/recruit-detail/DirectInputApplicationMethod'

export default function ApplicationMethod() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'지원방법'} isRequired={true} />
      <div className="flex gap-x-3">
        <div
          onClick={() => {
            updateCreateJobPost('applicationMethod', createJobPost.applicationMethod === 'WEBSITE' ? null : 'WEBSITE')
          }}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <ToggleButton type={createJobPost.applicationMethod === 'WEBSITE' ? 'SELECT' : 'UNSELECT'} />
          <p className="kr-button text-gray5">홈페이지 지원</p>
        </div>

        <div
          onClick={() => {
            updateCreateJobPost(
              'applicationMethod',
              createJobPost.applicationMethod === 'PHONE_SMS' ? null : 'PHONE_SMS'
            )
          }}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <ToggleButton type={createJobPost.applicationMethod === 'PHONE_SMS' ? 'SELECT' : 'UNSELECT'} />
          <p className="kr-button text-gray5">전화/문자 지원</p>
        </div>

        <div
          onClick={() => {
            updateCreateJobPost('applicationMethod', createJobPost.applicationMethod === 'EMAIL' ? null : 'EMAIL')
          }}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <ToggleButton type={createJobPost.applicationMethod === 'EMAIL' ? 'SELECT' : 'UNSELECT'} />
          <p className="kr-button text-gray5">이메일 지원</p>
        </div>
      </div>

      <DirectInputApplicationMethod />
    </div>
  )
}
