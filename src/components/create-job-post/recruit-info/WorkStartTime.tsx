import { DropDown } from '@/components/common'
import { useDropDown } from '@/hooks'
import { useCreateJobPostStore } from '@/store/createJobPostStore'

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
