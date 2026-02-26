'use client'

import { Badge, Button, TextInput } from '@/components/common'
import { WhiteRightArrowIcon } from '@/assets/svgComponents'
import { useState } from 'react'
import { useNoteStore } from '@/store/interview/noteStore'
import { putNoteEntry } from '@/lib/client/interview'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface FinalAnswerProps {
  finalAnswer?: string
  noteId?: string
  entryId?: string
}
export default function FinalAnswer({ finalAnswer, noteId, entryId }: FinalAnswerProps) {
  const { t } = useTranslation(['interview', 'message'])
  const { success, error } = useToast()
  const [isTextFieldOpen, setIsTextFieldOpen] = useState(false)
  const { setFinalAnswerEntry, finalAnswerEntry } = useNoteStore((state) => state)
  const router = useRouter()
  return (
    <div className="flex flex-col items-end gap-y-[20px]">
      <div className="bg-gray1 flex w-full flex-col gap-y-3 rounded-[8px] p-4">
        <Badge bgColor={'bg-main-500'} textColor={'text-white'}>
          {t('interview:history.setDetail.detail_feedback_body.final_answer.badge')}
        </Badge>
        {isTextFieldOpen ? (
          <div className="flex flex-col items-end gap-y-3">
            <TextInput
              onClick={(e) => {
                e.stopPropagation()
              }}
              placeholder={t('interview:history.setDetail.detail_feedback_body.final_answer.placeholder')}
              value={finalAnswerEntry.final_answer ?? ''}
              onChange={(e) => {
                setFinalAnswerEntry({ final_answer: e.target.value })
              }}
            />
            <Button
              onClick={async () => {
                const result = await putNoteEntry(noteId, entryId, { final_answer: finalAnswerEntry.final_answer })
                if (result.success) {
                  router.refresh()
                  setFinalAnswerEntry({ final_answer: '', entryId: '' })
                }
                console.log('답변 수정 성공', result)
              }}
              variant={'primary'}
              customClassName={'desktop:block tablet:block hidden w-fit'}
              size={'sm'}
            >
              {finalAnswer
                ? t('interview:history.setDetail.detail_feedback_body.final_answer.action.submit_edit')
                : t('interview:history.setDetail.detail_feedback_body.final_answer.action.submit_create')}
            </Button>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between">
            {finalAnswer ? (
              <p className="kr-body-md">{finalAnswer}</p>
            ) : (
              <p className="kr-body-md">
                {t('interview:history.setDetail.detail_feedback_body.final_answer.status.empty')}
              </p>
            )}

            {finalAnswer ? (
              <Button
                customClassName={'desktop:block tablet:block hidden w-fit'}
                onClick={(e) => {
                  e.stopPropagation()
                  setFinalAnswerEntry({ entryId: entryId, noteId: noteId, final_answer: finalAnswer })
                  setIsTextFieldOpen(true)
                }}
                size={'sm'}
                variant={'primary'}
                rightIcon={<WhiteRightArrowIcon width={20} height={20} />}
              >
                {t('interview:history.setDetail.detail_feedback_body.final_answer.action.edit')}
              </Button>
            ) : (
              <Button
                customClassName={'desktop:block tablet:block hidden w-fit'}
                onClick={(e) => {
                  e.stopPropagation()
                  setFinalAnswerEntry({ entryId: entryId, noteId: noteId })
                  setIsTextFieldOpen(true)
                }}
                size={'sm'}
                variant={'primary'}
                rightIcon={<WhiteRightArrowIcon width={20} height={20} />}
              >
                {t('interview:history.setDetail.detail_feedback_body.final_answer.action.create')}
              </Button>
            )}
          </div>
        )}
      </div>

      {isTextFieldOpen ? (
        <Button
          onClick={async () => {
            const result = await putNoteEntry(noteId, entryId, { final_answer: finalAnswerEntry.final_answer })
            if (result.success) {
              router.refresh()
              setFinalAnswerEntry({ final_answer: '', entryId: '' })
              success(t('message:put_note_entry.success.title'), t('message:put_note_entry.success.description'))
            } else {
              error(t('message:put_note_entry.error.title'), t('message:put_note_entry.error.description'))
            }
          }}
          variant={'primary'}
          customClassName={'desktop:hidden tablet:hidden block w-fit'}
          size={'sm'}
        >
          {finalAnswer
            ? t('interview:history.setDetail.detail_feedback_body.final_answer.action.submit_edit')
            : t('interview:history.setDetail.detail_feedback_body.final_answer.action.submit_create')}
        </Button>
      ) : finalAnswer ? (
        <Button
          customClassName={'desktop:hidden tablet:hidden block w-fit'}
          onClick={(e) => {
            e.stopPropagation()
            setFinalAnswerEntry({ entryId: entryId, noteId: noteId, final_answer: finalAnswer })
            setIsTextFieldOpen(true)
          }}
          size={'sm'}
          variant={'primary'}
          rightIcon={<WhiteRightArrowIcon width={20} height={20} />}
        >
          {t('interview:history.setDetail.detail_feedback_body.final_answer.action.edit')}
        </Button>
      ) : (
        <Button
          customClassName={'desktop:hidden tablet:hidden block w-fit'}
          onClick={(e) => {
            e.stopPropagation()
            setFinalAnswerEntry({ entryId: entryId, noteId: noteId })
            setIsTextFieldOpen(true)
          }}
          size={'sm'}
          variant={'primary'}
          rightIcon={<WhiteRightArrowIcon width={20} height={20} />}
        >
          {t('interview:history.setDetail.detail_feedback_body.final_answer.action.create')}
        </Button>
      )}
    </div>
  )
}
