'use client'

import { Badge, Spacing } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface DetailedFeedbackMyAnswerProps {
  userAnswer: string
  followUpQuestion: string | null
  followUpAnswer: string | null
}

export default function DetailedFeedbackMyAnswer({
  userAnswer,
  followUpAnswer,
  followUpQuestion,
}: DetailedFeedbackMyAnswerProps) {
  const { t } = useTranslation('interview')
  return (
    <div className="bg-gray1 w-full rounded-[12px] p-4">
      <section>
        <Badge textColor={'text-white'} bgColor={'bg-main-300'}>
          {t('history.setDetail.detail_feedback_body.my_answer.my')}
        </Badge>
        <Spacing height={12} />

        <p className="kr-body-md">{userAnswer}</p>
      </section>
      <Spacing height={20} />

      {followUpQuestion && (
        <section className="rounded-[8px] bg-white p-[12px]">
          <Badge textColor={'text-error'} bgColor={'bg-error-light'}>
            {t('history.setDetail.detail_feedback_body.my_answer.follow_up_question')}
          </Badge>
          <Spacing height={12} />

          <p className="kr-body-md">{followUpQuestion}</p>
          <Spacing height={12} />

          <div className="border-gray5 border-l-[2px] pl-[12px]">{followUpAnswer}</div>
        </section>
      )}
    </div>
  )
}
