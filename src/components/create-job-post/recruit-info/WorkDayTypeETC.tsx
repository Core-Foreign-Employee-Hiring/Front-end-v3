import { TextInput } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { Dispatch, SetStateAction } from 'react'
import ToggleButton from '@/components/common/ToggleButton'

interface WorkDayTypeETCProps {
  type: 'LIST' | 'DIRECT' | 'ETC'
  setType: Dispatch<SetStateAction<'LIST' | 'DIRECT' | 'ETC'>>
}

export default function WorkDayTypeETC({ type, setType }: WorkDayTypeETCProps) {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  return (
    <div className="flex gap-x-2">
      <ToggleButton
        onClick={() => {
          setType('ETC')
        }}
        type={type === 'ETC' ? 'SELECT' : 'UNSELECT'}
      />
      <div className="mt-1 flex w-full flex-col gap-y-1">
        <div
          onClick={() => {
            setType('ETC')
          }}
          className="kr-button text-gray5 cursor-pointer"
        >
          기타사항
        </div>
        {type === 'ETC' && (
          <TextInput
            value={createJobPost.directInputWorkDayType ?? ''}
            onChange={(e) => {
              updateCreateJobPost('directInputWorkDayType', e.target.value)
            }}
            placeholder={'기타 근무요일을 입력해주세요.'}
          />
        )}
      </div>
    </div>
  )
}
