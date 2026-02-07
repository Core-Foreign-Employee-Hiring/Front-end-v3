import { Button } from '@/components/common'
import { Dispatch, SetStateAction } from 'react'
import ToggleButton from '@/components/common/ToggleButton'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { WorkingDaysType } from '@/types/job-post'

interface WorkDayTypeDirectProps {
  type: 'LIST' | 'DIRECT' | 'ETC'
  setType: Dispatch<SetStateAction<'LIST' | 'DIRECT' | 'ETC'>>
}

// 요일 데이터를 관리하기 위한 상수 배열
const DAYS = [
  { label: '월요일', value: 'MONDAY' },
  { label: '화요일', value: 'TUESDAY' },
  { label: '수요일', value: 'WEDNESDAY' },
  { label: '목요일', value: 'THURSDAY' },
  { label: '금요일', value: 'FRIDAY' },
  { label: '토요일', value: 'SATURDAY' },
  { label: '일요일', value: 'SUNDAY' },
] as const

export default function WorkDayTypeDirect({ type, setType }: WorkDayTypeDirectProps) {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  // 현재 선택된 요일 리스트 (배열이 아닐 경우를 대비해 기본값 빈 배열 처리)
  const selectedDays = Array.isArray(createJobPost.workingDays) ? createJobPost.workingDays : []

  const handleDayClick = (dayValue: WorkingDaysType) => {
    let nextDays: WorkingDaysType[]

    if (selectedDays.includes(dayValue)) {
      // 이미 선택된 경우: 리스트에서 제거
      nextDays = selectedDays.filter((day) => day !== dayValue)
    } else {
      // 선택되지 않은 경우: 리스트에 추가
      nextDays = [...selectedDays, dayValue]
    }

    updateCreateJobPost('workingDays', nextDays)
  }

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
          {DAYS.map((day) => {
            const isSelected = selectedDays.includes(day.value)

            return (
              <Button
                key={day.value}
                onClick={() => handleDayClick(day.value)}
                size={'md'}
                variant={isSelected ? 'primary' : 'outline'}
              >
                {day.label}
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}
