'use client'

import { Button, Label } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useState } from 'react'
import DirectInputWorkType from '@/components/create-job-post/recruit-info/DirectInputWorkType'

export default function WorkType() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  const [isDirectInputWorkTypeOpen, setIsDirectInputWorkTypeOpen] = useState(false)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'근무형태'} isRequired={true} type={'titleSm'} />
      <div className="flex gap-x-3">
        <Button
          onClick={() => {
            updateCreateJobPost('workType', createJobPost.workType === 'ONSITE' ? null : 'ONSITE')
            setIsDirectInputWorkTypeOpen(false)
          }}
          variant={createJobPost.workType === 'ONSITE' ? 'primary' : 'outline'}
          size={'md'}
        >
          대면
        </Button>
        <Button
          onClick={() => {
            updateCreateJobPost('workType', createJobPost.workType === 'REMOTE' ? null : 'REMOTE')
            setIsDirectInputWorkTypeOpen(false)
          }}
          variant={createJobPost.workType === 'REMOTE' ? 'primary' : 'outline'}
          size={'md'}
        >
          비대면
        </Button>
        <Button
          onClick={() => {
            updateCreateJobPost('workType', createJobPost.workType === 'HYBRID' ? null : 'HYBRID')
            setIsDirectInputWorkTypeOpen(false)
          }}
          variant={createJobPost.workType === 'HYBRID' ? 'primary' : 'outline'}
          size={'md'}
        >
          혼합 근무(대면 + 비대면)
        </Button>
        <Button
          onClick={() => {
            setIsDirectInputWorkTypeOpen(!isDirectInputWorkTypeOpen)
            updateCreateJobPost('workType', createJobPost.workType === 'ETC' ? null : 'ETC')
          }}
          variant={isDirectInputWorkTypeOpen ? 'primary' : 'outline'}
          size={'md'}
        >
          기타
        </Button>
      </div>
      {isDirectInputWorkTypeOpen && <DirectInputWorkType />}
    </div>
  )
}
