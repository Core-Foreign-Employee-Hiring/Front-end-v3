import { DropDown, Label, Spacing } from '@/components/common'
import { useDropDown } from '@/hooks'

export default function InterviewLevel() {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '지원 레벨 선택' })
  return (
    <div className="w-full">
      <Label label={'지원 레벨'} />
      <Spacing height={8} />
      <DropDown
        selectedValue={selectedDropDownContent}
        defaultValue={initialValue}
        isDropDownOpen={isDropDownOpen}
        dropDownOpenHandler={dropDownOpenHandler}
      >
        <DropDown.DropBoxOptionItem onClick={() => {}}>우아 졸려</DropDown.DropBoxOptionItem>
      </DropDown>
    </div>
  )
}
