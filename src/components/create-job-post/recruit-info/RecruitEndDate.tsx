import { TextInput } from '@/components/common'
import { Gray4CalendarIcon } from '@/assets/svgComponents'
import { DayPicker } from 'react-day-picker'
import { useState } from 'react'
import { format } from 'date-fns'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

export default function RecruitEndDate() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  // 캘린더 오픈 상태 관리
  const [isEndOpen, setIsEndOpen] = useState(false)

  // 날짜 선택 핸들러
  const handleSelect = (date: Date | undefined, field: 'recruitStartDate' | 'recruitEndDate') => {
    if (!date) return

    // YYYY-MM-DD 형식으로 변환
    const formattedDate = format(date, 'yyyy-MM-dd')
    updateCreateJobPost(field, formattedDate)

    // 선택 후 닫기
    setIsEndOpen(false)
  }

  return (
    <div className="relative flex-1">
      <TextInput
        placeholder={'종료 날짜'}
        readOnly={true}
        onClick={() => setIsEndOpen(!isEndOpen)}
        value={createJobPost.recruitEndDate ?? ''}
        onChange={() => {}}
        rightElement={<Gray4CalendarIcon width={24} height={24} className="cursor-pointer" />}
      />
      {isEndOpen && (
        <div className="absolute right-0 z-10 mt-2 rounded-lg border bg-white p-2 shadow-lg">
          <DayPicker
            mode="single"
            selected={createJobPost.recruitEndDate ? new Date(createJobPost.recruitEndDate) : undefined}
            onSelect={(date) => handleSelect(date, 'recruitEndDate')}
            // 시작일보다 이전 날짜는 선택 못하게 하고 싶다면:
            disabled={createJobPost.recruitStartDate ? { before: new Date(createJobPost.recruitStartDate) } : undefined}
          />
        </div>
      )}
    </div>
  )
}
