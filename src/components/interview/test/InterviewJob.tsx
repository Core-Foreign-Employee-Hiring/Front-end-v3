import { DropDown, Label, Spacing } from '@/components/common'
import { useDropDown } from '@/hooks'
import { JobType } from '@/types/interview'
import { useInterviewStore } from '@/store/interview/interviewStore'

export default function InterviewJob() {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '직무 선택' })
  const { setSettingInterviewOption } = useInterviewStore((state) => state)
  const jobList: { content: string; enum: JobType }[] = [
    { content: '마케팅', enum: 'marketing' },
    { content: 'IT', enum: 'it' },
  ]
  return (
    <div className="w-full">
      <Label isRequired={true} label={'지원 직무'} />
      <Spacing height={8} />
      <DropDown
        selectedValue={selectedDropDownContent}
        defaultValue={initialValue}
        isDropDownOpen={isDropDownOpen}
        dropDownOpenHandler={dropDownOpenHandler}
      >
        {jobList.map((job) => (
          <DropDown.DropBoxOptionItem
            key={job.enum}
            onClick={() => {
              setSettingInterviewOption({ job_type: job.enum })
              selectedDropDownHandler(job.content)
              setIsDropDownOpen(false)
            }}
          >
            {job.content}
          </DropDown.DropBoxOptionItem>
        ))}
      </DropDown>
    </div>
  )
}
