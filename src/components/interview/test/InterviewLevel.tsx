'use client'

import { DropDown, Label, Spacing } from '@/components/common'
import { useDropDown } from '@/hooks'
import { LevelType } from '@/types/interview'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { useTranslation } from 'react-i18next'

export default function InterviewLevel() {
  const { t } = useTranslation('modal')
  const { setSettingInterviewOption } = useInterviewStore((state) => state)
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: t('ai_interview_test_setting.body.interview_level.placeholder') })
  const levelList: { content: string; enum: LevelType }[] = [
    { content: t('ai_interview_test_setting.body.interview_level.list.intern'), enum: 'intern' },
    { content: t('ai_interview_test_setting.body.interview_level.list.entry'), enum: 'entry' },
    { content: t('ai_interview_test_setting.body.interview_level.list.experienced'), enum: 'experienced' },
  ]
  return (
    <div className="w-full whitespace-nowrap">
      <Label isRequired={true} label={t('ai_interview_test_setting.body.interview_level.label')} />
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
