import { Button } from '@/components/common'
import { Dispatch, SetStateAction } from 'react'
import ToggleButton from '@/components/common/ToggleButton'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

interface WorkDayTypeDirectProps {
  type: 'LIST' | 'DIRECT' | 'ETC'
  setType: Dispatch<SetStateAction<'LIST' | 'DIRECT' | 'ETC'>>
}

export default function WorkDayTypeDirect({ type, setType }: WorkDayTypeDirectProps) {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  return (
    <div className="flex flex-col gap-y-3">
      <div
        onClick={() => {
          setType('DIRECT')
        }}
        className="flex cursor-pointer items-center gap-x-2"
      >
        <ToggleButton type={type === 'DIRECT' ? 'SELECT' : 'UNSELECT'} />
        <p className="kr-button text-gray5">직접선택</p>
      </div>

      {type === 'DIRECT' && (
        <div className="flex gap-x-3">
          <Button
            onClick={() => {
              updateCreateJobPost('workDayType', createJobPost.workDayType === 'MONDAY' ? null : 'MONDAY')
            }}
            size={'md'}
            variant={createJobPost.workDayType === 'MONDAY' ? 'primary' : 'outline'}
          >
            월요일
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost('workDayType', createJobPost.workDayType === 'TUESDAY' ? null : 'TUESDAY')
            }}
            size={'md'}
            variant={createJobPost.workDayType === 'TUESDAY' ? 'primary' : 'outline'}
          >
            화요일
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost('workDayType', createJobPost.workDayType === 'WEDNESDAY' ? null : 'WEDNESDAY')
            }}
            size={'md'}
            variant={createJobPost.workDayType === 'WEDNESDAY' ? 'primary' : 'outline'}
          >
            수요일
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost('workDayType', createJobPost.workDayType === 'THURSDAY' ? null : 'THURSDAY')
            }}
            size={'md'}
            variant={createJobPost.workDayType === 'THURSDAY' ? 'primary' : 'outline'}
          >
            목요일
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost('workDayType', createJobPost.workDayType === 'FRIDAY' ? null : 'FRIDAY')
            }}
            size={'md'}
            variant={createJobPost.workDayType === 'FRIDAY' ? 'primary' : 'outline'}
          >
            금요일
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost('workDayType', createJobPost.workDayType === 'SATURDAY' ? null : 'SATURDAY')
            }}
            size={'md'}
            variant={createJobPost.workDayType === 'SATURDAY' ? 'primary' : 'outline'}
          >
            토요일
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost('workDayType', createJobPost.workDayType === 'SUNDAY' ? null : 'SUNDAY')
            }}
            size={'md'}
            variant={createJobPost.workDayType === 'SUNDAY' ? 'primary' : 'outline'}
          >
            일요일
          </Button>
        </div>
      )}
    </div>
  )
}
