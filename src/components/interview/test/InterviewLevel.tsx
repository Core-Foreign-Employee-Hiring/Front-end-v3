import { DropDown, Label, Spacing } from '@/components/common'
import { useDropDown } from '@/hooks'
import { LevelType } from '@/types/interview'
import { useInterviewStore } from '@/store/interview/interviewStore'

export default function InterviewLevel() {
  const { setSettingInterviewOption } = useInterviewStore((state) => state)
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '지원 레벨 선택' })
  const levelList: { content: string; enum: LevelType }[] = [
    { content: '인턴', enum: 'intern' },
    { content: '신입', enum: 'entry' },
    { content: '경력', enum: 'experienced' },
  ]
  return (
    <div className="w-full">
      <Label isRequired={true} label={'지원 레벨'} />
      <Spacing height={8} />
      <DropDown
        selectedValue={selectedDropDownContent}
        defaultValue={initialValue}
        isDropDownOpen={isDropDownOpen}
        dropDownOpenHandler={dropDownOpenHandler}
      >
        {levelList.map((level) => (
          <DropDown.DropBoxOptionItem
            key={level.enum}
            onClick={() => {
              setSettingInterviewOption({ level: level.enum })
              selectedDropDownHandler(level.content)
              setIsDropDownOpen(false)
            }}
          >
            {level.content}
          </DropDown.DropBoxOptionItem>
        ))}
      </DropDown>
    </div>
  )
}
