'use client'

import { Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import WorkStartTime from '@/components/create-job-post/recruit-info/WorkStartTime'
import WorkEndTime from '@/components/create-job-post/recruit-info/WorkEndTime'

export default function WorkTime() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  const timeContents = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ]

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'근무 시간'} isRequired={true} type={'titleSm'} />
      <div className="flex gap-x-3">
        <WorkStartTime timeList={timeContents} />
        <WorkEndTime timeList={timeContents} />
      </div>
      <div className="flex items-center gap-x-3">
        <div className="kr-subtitle-sm text-gray5 shrink-0">기타사항</div>
        <TextInput
          placeholder={'기타 근무형태를 입력해주세요.'}
          onChange={(e) => {
            updateCreateJobPost('directInputWorkTime', e.target.value)
          }}
          value={createJobPost.directInputWorkTime ?? ''}
        />
      </div>
    </div>
  )
}
