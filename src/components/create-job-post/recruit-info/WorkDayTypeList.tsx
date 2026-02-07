import { Button } from '@/components/common'
import ToggleButton from '@/components/common/ToggleButton'
import { Dispatch, SetStateAction } from 'react'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

interface WorkDayTypeListProps {
  type: 'LIST' | 'DIRECT' | 'ETC'
  setType: Dispatch<SetStateAction<'LIST' | 'DIRECT' | 'ETC'>>
}

export default function WorkDayTypeList({ type, setType }: WorkDayTypeListProps) {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  return (
    <div className="flex flex-col gap-y-3">
      <div
        onClick={() => {
          setType('LIST')
        }}
        className="flex cursor-pointer items-center gap-x-2"
      >
        <ToggleButton type={type === 'LIST' ? 'SELECT' : 'UNSELECT'} />
        <p className="kr-button text-gray5">목록에서 선택</p>
      </div>

      {type === 'LIST' && (
        <div className="flex gap-x-3">
          <Button
            onClick={() => {
              updateCreateJobPost(
                'workDayPatternType',
                createJobPost.workDayPatternType === 'WEEKDAYS' ? null : 'WEEKDAYS'
              )
            }}
            size={'md'}
            variant={createJobPost.workDayPatternType === 'WEEKDAYS' ? 'primary' : 'outline'}
          >
            평일 (월, 화, 수, 목, 금)
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost(
                'workDayPatternType',
                createJobPost.workDayPatternType === 'WEEKENDS' ? null : 'WEEKENDS'
              )
            }}
            size={'md'}
            variant={createJobPost.workDayPatternType === 'WEEKENDS' ? 'primary' : 'outline'}
          >
            주말 (토, 일)
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost(
                'workDayPatternType',
                createJobPost.workDayPatternType === 'FULL_WEEK' ? null : 'FULL_WEEK'
              )
            }}
            size={'md'}
            variant={createJobPost.workDayPatternType === 'FULL_WEEK' ? 'primary' : 'outline'}
          >
            주7일 (월~일)
          </Button>
          <Button
            onClick={() => {
              updateCreateJobPost(
                'workDayPatternType',
                createJobPost.workDayPatternType === 'SIX_DAYS' ? null : 'SIX_DAYS'
              )
            }}
            size={'md'}
            variant={createJobPost.workDayPatternType === 'SIX_DAYS' ? 'primary' : 'outline'}
          >
            주6일
          </Button>
        </div>
      )}
    </div>
  )
}
