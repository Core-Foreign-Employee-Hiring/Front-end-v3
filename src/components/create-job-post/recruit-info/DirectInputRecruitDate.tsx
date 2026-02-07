import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { TextInput } from '@/components/common'
import { useState } from 'react'

export default function DirectInputRecruitDate() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  const [isDirectInputRecruitDateFieldOpen, setIsDirectInputRecruitDateFieldOpen] = useState(false)

  return (
    <div className="mt-2 flex w-full items-start gap-x-2">
      {isDirectInputRecruitDateFieldOpen ? (
        <CheckIcon
          onClick={() => {
            setIsDirectInputRecruitDateFieldOpen(false)
            updateCreateJobPost('directInputRecruitDate', null)
          }}
          className="cursor-pointer"
          width={24}
          height={24}
        />
      ) : (
        <UncheckIcon
          onClick={() => {
            setIsDirectInputRecruitDateFieldOpen(true)
            updateCreateJobPost('directInputRecruitDate', null)
          }}
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <div className="flex w-full flex-col gap-y-1">
        <p
          onClick={() => {
            setIsDirectInputRecruitDateFieldOpen(!isDirectInputRecruitDateFieldOpen)
          }}
          className="kr-body-md text-gray5 cursor-pointer"
        >
          직접 입력
        </p>
        {isDirectInputRecruitDateFieldOpen && (
          <TextInput
            placeholder={'상시모집, 채용시 모집마감 등 직접 입력'}
            onChange={(e) => updateCreateJobPost('directInputRecruitDate', e.target.value)}
            value={createJobPost.directInputRecruitDate ?? ''}
          />
        )}
      </div>
    </div>
  )
}
