'use client'

import { Button, Label } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useState } from 'react'
import DirectInputContractType from '@/components/create-job-post/recruit-info/DirectInputContractType'

export default function ContractType() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  const [isDirectInputContractTypeOpen, setIsDirectInputContractType] = useState(false)

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'고용형태'} isRequired={true} type={'titleSm'} />
      <div className="flex gap-x-3">
        <Button
          onClick={() => {
            updateCreateJobPost('contractType', createJobPost.contractType === 'REGULAR' ? null : 'REGULAR')
            setIsDirectInputContractType(false)
          }}
          variant={createJobPost.contractType === 'REGULAR' ? 'primary' : 'outline'}
          size={'md'}
        >
          정규직
        </Button>
        <Button
          onClick={() => {
            updateCreateJobPost('contractType', createJobPost.contractType === 'INTERN' ? null : 'INTERN')
            setIsDirectInputContractType(false)
          }}
          variant={createJobPost.contractType === 'INTERN' ? 'primary' : 'outline'}
          size={'md'}
        >
          인턴
        </Button>
        <Button
          onClick={() => {
            updateCreateJobPost('contractType', createJobPost.contractType === 'CONTRACT' ? null : 'CONTRACT')
            setIsDirectInputContractType(false)
          }}
          variant={createJobPost.contractType === 'CONTRACT' ? 'primary' : 'outline'}
          size={'md'}
        >
          계약직
        </Button>
        <Button
          onClick={() => {
            setIsDirectInputContractType(!isDirectInputContractTypeOpen)
            updateCreateJobPost('contractType', null)
          }}
          variant={isDirectInputContractTypeOpen ? 'primary' : 'outline'}
          size={'md'}
        >
          기타
        </Button>
      </div>
      {isDirectInputContractTypeOpen && <DirectInputContractType />}
    </div>
  )
}
