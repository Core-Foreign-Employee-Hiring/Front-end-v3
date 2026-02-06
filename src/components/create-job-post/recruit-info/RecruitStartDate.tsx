import { TextInput } from '@/components/common'
import { Gray4CalendarIcon } from '@/assets/svgComponents'
import { DayPicker } from 'react-day-picker'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useState } from 'react'
import { format } from 'date-fns'

export default function RecruitStartDate() {
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)
  const [isStartOpen, setIsStartOpen] = useState(false)

  // 날짜 선택 핸들러
  const handleSelect = (date: Date | undefined, field: 'recruitStartDate' | 'recruitEndDate') => {
    if (!date) return

    // YYYY-MM-DD 형식으로 변환
    const formattedDate = format(date, 'yyyy-MM-dd')
    updateCreateJobPost(field, formattedDate)

    // 선택 후 닫기
    setIsStartOpen(false)
  }

  return (
    <div className="relative flex-1">
      <TextInput
        placeholder={'시작 날짜'}
        readOnly={true} // 타이핑 방지
        onClick={() => setIsStartOpen(!isStartOpen)}
        value={createJobPost.recruitStartDate ?? ''}
        onChange={() => {}}
        rightElement={<Gray4CalendarIcon width={24} height={24} className="cursor-pointer" />}
      />
      {isStartOpen && (
        <div className="absolute z-10 mt-2 rounded-lg border bg-white p-2 shadow-lg">
          <DayPicker
            mode="single"
            selected={createJobPost.recruitStartDate ? new Date(createJobPost.recruitStartDate) : undefined}
            onSelect={(date) => handleSelect(date, 'recruitStartDate')}
          />
        </div>
      )}
    </div>
  )
}
