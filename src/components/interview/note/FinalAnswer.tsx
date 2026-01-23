'use client'

import { Badge, Button, TextInput } from '@/components/common'
import { WhiteRightArrowIcon } from '@/assets/svgComponents'
import { useState } from 'react'
import { useNoteStore } from '@/store/interview/noteStore'
import { putNoteEntry } from '@/lib/client/interview'

interface FinalAnswerProps {
  finalAnswer?: string
  noteId?: string
  entryId?: string
}
export default function FinalAnswer({ finalAnswer, noteId, entryId }: FinalAnswerProps) {
  const [isTextFieldOpen, setIsTextFieldOpen] = useState(false)
  const { setFinalAnswerEntry, finalAnswerEntry } = useNoteStore((state) => state)

  return (
    <div className="bg-gray1 flex flex-col gap-y-3 rounded-[8px] p-4">
      <Badge bgColor={'bg-main-500'} textColor={'text-white'}>
        최종 답변
      </Badge>
      {isTextFieldOpen ? (
        <div className="flex flex-col items-end gap-y-3">
          <TextInput
            onClick={(e) => {
              e.stopPropagation()
            }}
            placeholder={'개선한 최종 답변을 작성해주세요.'}
            value={finalAnswerEntry.final_answer ?? ''}
            onChange={(e) => {
              setFinalAnswerEntry({ final_answer: e.target.value })
            }}
          />
          <Button
            onClick={async () => {
              const result = await putNoteEntry(noteId, entryId, { final_answer: finalAnswerEntry.final_answer })
              console.log('답변 수정 성공', result)
            }}
            variant={'primary'}
            customClassName={'w-[117px]'}
            size={'sm'}
          >
            {finalAnswer ? '답변 수정완료' : '답변 작성완료'}
          </Button>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          {finalAnswer ? (
            <p className="kr-body-md">{finalAnswer}</p>
          ) : (
            <p className="kr-body-md">아직 답변이 작성되지 않았습니다.</p>
          )}

          {finalAnswer ? (
            <Button
              customClassName={'w-[136px]'}
              onClick={(e) => {
                e.stopPropagation()
                setFinalAnswerEntry({ entryId: entryId, noteId: noteId, final_answer: finalAnswer })
                setIsTextFieldOpen(true)
              }}
              size={'sm'}
              variant={'primary'}
              rightIcon={<WhiteRightArrowIcon width={20} height={20} />}
            >
              답변 수정하기
            </Button>
          ) : (
            <Button
              customClassName={'w-[136px]'}
              onClick={(e) => {
                e.stopPropagation()
                setFinalAnswerEntry({ entryId: entryId, noteId: noteId })
                setIsTextFieldOpen(true)
              }}
              size={'sm'}
              variant={'primary'}
              rightIcon={<WhiteRightArrowIcon width={20} height={20} />}
            >
              답변 작성하기
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
