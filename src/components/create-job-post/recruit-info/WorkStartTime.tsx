import { DropDown } from '@/components/common'
import { useDropDown } from '@/hooks'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useEffect } from 'react'

interface WorkStartTimeProps {
  timeList: string[]
}

export default function WorkStartTime({ timeList }: WorkStartTimeProps) {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '시작 시간' })

  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  /**
   * 컴포넌트가 마운트될 때(다시 돌아왔을 때)
   * Store에 이미 값이 있다면 드롭다운의 UI 상태를 업데이트합니다.
   */
  useEffect(() => {
    if (createJobPost.workStartTime) {
      selectedDropDownHandler(createJobPost.workStartTime)
    }
  }, [createJobPost.workStartTime, selectedDropDownHandler])

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
            updateCreateJobPost('workStartTime', time)
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
