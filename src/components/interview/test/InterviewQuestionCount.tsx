'use client'

import { DropDown, Label, Spacing } from '@/components/common'
import { useDropDown } from '@/hooks'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { useTranslation } from 'react-i18next'

export default function InterviewQuestionCount() {
  const { t } = useTranslation('modal')
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: t('ai_interview_test_setting.body.question_count.placeholder') })
  const { setSettingInterviewOption } = useInterviewStore((state) => state)
  const interviewQuestionCountList = [
    { content: t('ai_interview_test_setting.body.question_count.options.count_3'), enum: 3 },
    // { content: '5개', enum: 5 },
    // { content: '7개', enum: 7 },
  ]
  return (
    <div className="w-full">
      <Label label={t('ai_interview_test_setting.body.question_count.label')} type={'titleSm'} />
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
