import { UncheckIcon } from '@/assets/svgComponents'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { TextInput } from '@/components/common'

export default function DirectInputRecruitDate() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="mt-2 flex w-full items-start gap-x-2">
      <UncheckIcon width={24} height={24} className="cursor-pointer" />
      <div className="flex w-full flex-col gap-y-1">
        <p className="kr-body-md text-gray5">직접 입력</p>
        <TextInput
          placeholder={'상시모집, 채용시 모집마감 등 직접 입력'}
          onChange={(e) => updateCreateJobPost('directInputContractType', e.target.value)}
          value={createJobPost.directInputContractType ?? ''}
        />
      </div>
    </div>
  )
}
