import { DropDown, Label, Spacing } from '@/components/common'
import { useDropDown } from '@/hooks'

export default function InterviewQuestionCount() {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '질문 개수 선택' })
  return (
    <div className="w-full">
      <Label label={'질문 개수'} type={'titleSm'} />
      <Spacing height={8} />
      <DropDown
        selectedValue={selectedDropDownContent}
        defaultValue={initialValue}
        isDropDownOpen={isDropDownOpen}
        dropDownOpenHandler={dropDownOpenHandler}
      >
        <DropDown.DropBoxOptionItem onClick={() => {}}>우아 졸려</DropDown.DropBoxOptionItem>
      </DropDown>
      <Spacing height={8} />
      <p className="kr-badge-md text-gray5">개수에 따른 시간</p>
    </div>
  )
}
