'use client'

import { Switch } from '@/components/ui/switch'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { useTranslation } from 'react-i18next'

export default function HeaderOption() {
  const { t } = useTranslation('interview')
  const { commonAnswer, setCommonAnswer } = useInterviewStore((state) => state)

  const handleToggle = (checked: boolean) => {
    // 스위치가 켜지면(true) enable_follow_up도 true
    // 스위치가 꺼지면(false) enable_follow_up도 false
    setCommonAnswer({
      ...commonAnswer, // 기존 값 유지
      enable_follow_up: checked,
    })
  }
  return (
    <div className="flex flex-shrink-0 items-center gap-x-6">
      <div className="flex flex-shrink-0 items-center gap-x-2">
        <label htmlFor="follow-up-mode">{t('test.chat.question.follow_up_question')}</label>
        <Switch
          id="follow-up-mode"
          checked={commonAnswer.enable_follow_up} // 상태에 따라 true/false 결정
          onCheckedChange={handleToggle} // 클릭 시 상태 반전 로직 실행
        />
      </div>
    </div>
  )
}
