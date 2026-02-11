'use client'

import { Button, Label, Modal } from '@/components/common'
import NoteListDropDown from '@/components/interview/note/NoteListDropDown'
import { PlusIcon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'
import { fetchClientAnswerNotes, postAnswerEntry } from '@/lib/client/interview'
import { useQuery } from '@tanstack/react-query'
import { useNoteStore } from '@/store/interview/noteStore'

export default function SaveAnswerNoteModal() {
  const {
    isSaveAnswerNoteModalOpen,
    isCreateNewAnswerNoteModalOpen,
    setIsSaveAnswerNoteModalOpen,
    setIsCreateNewAnswerNoteModalOpen,
  } = useModalStore((state) => state)

  const { selectedNoteId, answerEntry, resetAnswerEntry, resetSelectedNoteId, resetCreateNoteData } = useNoteStore(
    (state) => state
  )

  const { data: notes = [] } = useQuery({
    queryKey: ['answerNotes'],
    queryFn: async () => {
      const result = await fetchClientAnswerNotes()
      // API 구조에 맞춰 안전하게 데이터 반환
      return result.data?.data || []
    },
    // 모달이 열려있을 때만 데이터를 가져옵니다.
    enabled: isSaveAnswerNoteModalOpen,
  })

  const toggleSaveAnswerNoteState = () => {
    setIsSaveAnswerNoteModalOpen(isSaveAnswerNoteModalOpen)
  }

  const toggleCreateNewAnswerNoteState = () => {
    setIsCreateNewAnswerNoteModalOpen(isCreateNewAnswerNoteModalOpen)
    toggleSaveAnswerNoteState()
  }

  return (
    <Modal
      mobileHidden={false}
      customClassName={'w-[508px]'}
      onClose={toggleSaveAnswerNoteState}
      isOpen={isSaveAnswerNoteModalOpen}
    >
      <Modal.Header>
        <Label label={'답변 노트 저장'} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-2">
          <Label label={'노트명'} type={'titleSm'} labelColor={'text-gray5'} />
          {notes.length > 0 && <NoteListDropDown noteList={notes} />}
          <Button
            customClassName={'w-[140px]'}
            leftIcon={<PlusIcon width={20} height={20} />}
            variant={'secondary'}
            onClick={toggleCreateNewAnswerNoteState}
            size={'sm'}
            buttonType={'button'}
          >
            새 노트 만들기
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={toggleSaveAnswerNoteState} variant={'outline'} size={'lg'} buttonType={'button'}>
            닫기
          </Button>
          <Button
            onClick={async () => {
              const result = await postAnswerEntry(selectedNoteId, answerEntry)
              if (result.data) {
                console.log('기존 노트 답변 추가 성공', result)
                resetAnswerEntry()
                resetSelectedNoteId('')
                resetCreateNoteData()
                toggleSaveAnswerNoteState()
              }
            }}
            variant={'primary'}
            size={'lg'}
            buttonType={'button'}
          >
            저장
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
