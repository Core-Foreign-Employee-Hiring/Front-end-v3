import { DropDown, Label, Spacing } from '@/components/common'
import { useDropDown } from '@/hooks'
import { useInterviewStore } from '@/store/interview/interviewStore'

export default function InterviewQuestionCount() {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '질문 개수 선택' })
  const { setSettingInterviewOption } = useInterviewStore((state) => state)
  const interviewQuestionCountList = [
    { content: '3개', enum: 3 },
    { content: '5개', enum: 5 },
    { content: '7개', enum: 7 },
  ]
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
        {interviewQuestionCountList.map((interviewQuestionCount) => (
          <DropDown.DropBoxOptionItem
            key={interviewQuestionCount.enum}
            onClick={() => {
              selectedDropDownHandler(interviewQuestionCount.content)
              setSettingInterviewOption({ question_count: interviewQuestionCount.enum })
              setIsDropDownOpen(false)
            }}
          >
            {interviewQuestionCount.content}
          </DropDown.DropBoxOptionItem>
        ))}
      </DropDown>
    </div>
  )
}
