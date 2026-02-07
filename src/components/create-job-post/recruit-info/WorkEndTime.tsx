import { useDropDown } from '@/hooks'
import { DropDown } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useEffect } from 'react'

interface WorkEndTimeProps {
  timeList: string[]
}

export default function WorkEndTime({ timeList }: WorkEndTimeProps) {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '종료 시간' })

  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  /**
   * 컴포넌트가 마운트될 때(다시 돌아왔을 때)
   * Store에 이미 값이 있다면 드롭다운의 UI 상태를 업데이트합니다.
   */
  useEffect(() => {
    if (createJobPost.workEndTime) {
      selectedDropDownHandler(createJobPost.workEndTime)
    }
  }, [createJobPost.workEndTime, selectedDropDownHandler])

  return (
    <DropDown
      selectedValue={selectedDropDownContent}
      defaultValue={initialValue}
      isDropDownOpen={isDropDownOpen}
      dropDownOpenHandler={dropDownOpenHandler}
    >
      {timeList.map((time) => (
        <DropDown.DropBoxOptionItem
          key={time}
          onClick={() => {
            updateCreateJobPost('workEndTime', time)
            selectedDropDownHandler(time)
            setIsDropDownOpen(false)
          }}
        >
          {time}
        </DropDown.DropBoxOptionItem>
      ))}
    </DropDown>
  )
}
