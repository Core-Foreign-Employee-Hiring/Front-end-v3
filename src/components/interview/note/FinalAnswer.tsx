'use client'

import { Badge, Button, TextInput } from '@/components/common'
import { useState } from 'react'
import { useNoteStore } from '@/store/interview/noteStore'
import { putNoteEntry } from '@/lib/client/interview'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'
import DeleteEntryButton from './DeleteEntryButton'
import { WhiteRightArrowIcon } from '@/assets/svgComponents' // 임포트 확인

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

  // 공통 저장 로직
  const handleSave = async () => {
    const result = await putNoteEntry(noteId, entryId, { final_answer: finalAnswerEntry.final_answer })
    if (result.success) {
      router.refresh()
      setFinalAnswerEntry({ final_answer: '', entryId: '' })
      setIsTextFieldOpen(false)
      success(t('message:put_note_entry.success.title'), t('message:put_note_entry.success.description'))
    } else {
      error(t('message:put_note_entry.error.title'), t('message:put_note_entry.error.description'))
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-gray1 flex w-full flex-col gap-y-3 rounded-[8px] p-4">
        <Badge bgColor={'bg-main-500'} textColor={'text-white'}>
          {t('interview:history.setDetail.detail_feedback_body.final_answer.badge')}
        </Badge>

        {isTextFieldOpen ? (
          <TextInput
            onClick={(e) => e.stopPropagation()}
            placeholder={t('interview:history.setDetail.detail_feedback_body.final_answer.placeholder')}
            value={finalAnswerEntry.final_answer ?? ''}
            onChange={(e) => setFinalAnswerEntry({ final_answer: e.target.value })}
          />
        ) : (
          <div className="py-2">
            {finalAnswer ? (
              <p className="kr-body-md text-gray-900">{finalAnswer}</p>
            ) : (
              <p className="kr-body-md text-gray-500">
                {t('interview:history.setDetail.detail_feedback_body.final_answer.status.empty')}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 버튼 영역: 왼쪽 삭제 / 오른쪽 액션 */}
      <div className="flex w-full items-center justify-end gap-x-2">
        <div className="tablet:hidden desktop:hidden block">
          <DeleteEntryButton noteId={noteId!} entryId={entryId!} />
        </div>

        {isTextFieldOpen ? (
          <Button onClick={handleSave} variant={'primary'} size={'sm'} customClassName="w-fit">
            {finalAnswer
              ? t('interview:history.setDetail.detail_feedback_body.final_answer.action.submit_edit')
              : t('interview:history.setDetail.detail_feedback_body.final_answer.action.submit_create')}
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              setFinalAnswerEntry({ entryId, noteId, final_answer: finalAnswer ?? '' })
              setIsTextFieldOpen(true)
            }}
            size={'sm'}
            rightIcon={
              <div className="tablet:block desktop:block hidden">
                <WhiteRightArrowIcon width={20} height={20} />
              </div>
            }
            variant={'primary'}
            customClassName="w-fit"
          >
            {finalAnswer
              ? t('interview:history.setDetail.detail_feedback_body.final_answer.action.edit')
              : t('interview:history.setDetail.detail_feedback_body.final_answer.action.create')}
          </Button>
        )}
      </div>
    </div>
  )
}
