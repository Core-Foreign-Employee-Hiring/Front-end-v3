'use client'

import { Badge, ResultContent, Spacing } from '@/components/common'
import DetailedFeedbackMyAnswer from '@/components/interview/result/DetailedFeedbackMyAnswer'
import FinalAnswer from '@/components/interview/note/FinalAnswer'
import SaveNoteButton from '@/components/interview/result/SaveNoteButton'
import { useTranslation } from 'react-i18next'

interface DetailedFeedbackBodyProps {
  userAnswer: string
  followUpQuestion: string | null
  followUpAnswer: string | null
  feedback: string
  noteId?: string
  entryId?: string
  finalAnswer?: string
  improvements: string
  isFinalElement?: boolean
  question: string
}

export default function DetailedFeedbackBody({
  question,
  userAnswer,
  followUpAnswer,
  followUpQuestion,
  feedback,
  noteId,
  entryId,
  finalAnswer,
  improvements,
  isFinalElement = false,
}: DetailedFeedbackBodyProps) {
  const { t } = useTranslation('interview')
  return (
    <div>
      <Spacing height={20} />
      <section className="desktop:flex-row tablet:flex-row desktop:gap-x-[20px] tablet:gap-x-[20px] flex flex-col gap-y-[16px]">
        <DetailedFeedbackMyAnswer
          followUpAnswer={followUpAnswer}
          userAnswer={userAnswer}
          followUpQuestion={followUpQuestion}
        />
        <ResultContent
          analysis={feedback}
          bottomElement={
            <div className="mt-[20px] flex flex-col gap-y-[12px]">
              <Badge bgColor={'bg-main-500'} textColor={'text-white'}>
                {t('history.setDetail.detail_feedback_body.badge')}
              </Badge>
              <p className="kr-body-md">{improvements}</p>
            </div>
          }
        />

        {/* 답변 노트에는 뜨지 않도록 */}
        {!noteId && (
          <div className="desktop:hidden tablet:hidden block flex justify-end">
            <SaveNoteButton
              feedback={feedback}
              improvements={improvements}
              question={question}
              userAnswer={userAnswer}
              followUpAnswer={followUpAnswer}
              followUpQuestion={followUpQuestion}
              customClassName={'w-fit'}
            />
          </div>
        )}
      </section>
      {isFinalElement ? (
        <>
          <Spacing height={20} />
          <FinalAnswer finalAnswer={finalAnswer} noteId={noteId} entryId={entryId} />
        </>
      ) : null}
    </div>
  )
}
