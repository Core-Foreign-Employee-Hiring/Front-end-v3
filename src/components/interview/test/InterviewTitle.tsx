'use client'

import { Label, Spacing, TextInput } from '@/components/common'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { useTranslation } from 'react-i18next'

export default function InterviewTitle() {
  const { t } = useTranslation('modal')
  const { setSettingInterviewOption, settingInterviewOption } = useInterviewStore((state) => state)

  return (
    <div>
      <Label label={t('ai_interview_test_setting.body.interview_title.label')} type={'titleSm'} />
      <Spacing height={8} />
      <TextInput
        value={settingInterviewOption.title ?? ''}
        onChange={(e) => {
          setSettingInterviewOption({ title: e.target.value })
        }}
        status={'default'}
        placeholder={t('ai_interview_test_setting.body.interview_title.placeholder')}
      />
    </div>
  )
}
