import { DropDown, Label, Spacing } from '@/components/common'
import { useDropDown } from '@/hooks'
import { JobType } from '@/types/interview'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { useTranslation } from 'react-i18next'

export default function InterviewJob() {
  const { t } = useTranslation('modal')
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: t('ai_interview_test_setting.body.interview_job.placeholder') })
  const { setSettingInterviewOption } = useInterviewStore((state) => state)
  const jobList: { content: string; enum: JobType }[] = [
    { content: t('ai_interview_test_setting.body.interview_job.list.marketing'), enum: 'marketing' },
    { content: t('ai_interview_test_setting.body.interview_job.list.it'), enum: 'it' },
  ]
  return (
    <div className="w-full">
      <Label isRequired={true} label={t('ai_interview_test_setting.body.interview_job.label')} />
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
