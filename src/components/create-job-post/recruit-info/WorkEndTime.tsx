import { useDropDown } from '@/hooks'
import { DropDown } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

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
