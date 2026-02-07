'use client'

import { Button, Label, TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function Career() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore()
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'경력'} isRequired={true} type={'titleSm'} />
      <div className="flex gap-x-3">
        <Button
          onClick={() => {
            updateCreateJobPost('carrerType', createJobPost.carrerType === 'NEWCOMER' ? null : 'NEWCOMER')
          }}
          size={'md'}
          variant={createJobPost.carrerType === 'NEWCOMER' ? 'primary' : 'outline'}
        >
          신입
        </Button>
        <Button
          onClick={() => {
            updateCreateJobPost('carrerType', createJobPost.carrerType === 'EXPERIENCED' ? null : 'EXPERIENCED')
          }}
          size={'md'}
          variant={createJobPost.carrerType === 'EXPERIENCED' ? 'primary' : 'outline'}
        >
          경력
        </Button>
        <Button
          onClick={() => {
            updateCreateJobPost('carrerType', createJobPost.carrerType === 'NOT_SPECIFIED' ? null : 'NOT_SPECIFIED')
          }}
          size={'md'}
          variant={createJobPost.carrerType === 'NOT_SPECIFIED' ? 'primary' : 'outline'}
        >
          경력 무관
        </Button>
      </div>
      {createJobPost.carrerType === 'EXPERIENCED' && (
        <TextInput
          placeholder={'경력 연차 입력 (예: 1~3년, 3~5년)'}
          value={createJobPost.directInputCarrerType ?? ''}
          onChange={(e) => {
            updateCreateJobPost('directInputCarrerType', e.target.value)
          }}
        />
      )}
    </div>
  )
}
