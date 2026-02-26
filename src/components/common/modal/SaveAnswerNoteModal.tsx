'use client'

import { Button, Label, Modal } from '@/components/common'
import NoteListDropDown from '@/components/interview/note/NoteListDropDown'
import { PlusIcon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'
import { fetchClientAnswerNotes, postAnswerEntry } from '@/lib/client/interview'
import { useQuery } from '@tanstack/react-query'
import { useNoteStore } from '@/store/interview/noteStore'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

export default function SaveAnswerNoteModal() {
  const { t } = useTranslation(['modal', 'message'])
  const { success, error } = useToast()
  const { modals, toggleModal } = useModalStore((state) => state)

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
    enabled: modals.isSaveAnswerNoteModalOpen,
  })

  const toggleSaveAnswerNoteState = () => {
    toggleModal('isSaveAnswerNoteModalOpen')
  }

  const toggleCreateNewAnswerNoteState = () => {
    toggleModal('isCreateNewAnswerNoteModalOpen')
    toggleSaveAnswerNoteState()
  }

  return (
    <Modal
      mobileHidden={false}
      customClassName={'w-[508px]'}
      onClose={toggleSaveAnswerNoteState}
      isOpen={modals.isSaveAnswerNoteModalOpen}
    >
      <Modal.Header>
        <Label label={t('modal:save_answer_note.header')} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-2">
          <Label label={t('modal:save_answer_note.body.label')} type={'titleSm'} labelColor={'text-gray5'} />
          {notes.length > 0 && <NoteListDropDown noteList={notes} />}
          <Button
            customClassName={'w-fit'}
            leftIcon={<PlusIcon width={20} height={20} />}
            variant={'secondary'}
            onClick={toggleCreateNewAnswerNoteState}
            size={'sm'}
            buttonType={'button'}
          >
            {t('modal:save_answer_note.body.button')}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={toggleSaveAnswerNoteState} variant={'outline'} size={'lg'} buttonType={'button'}>
            {t('modal:footer_buttons.close')}
          </Button>
          <Button
            onClick={async () => {
              const result = await postAnswerEntry(selectedNoteId, answerEntry)
              if (result.success && result.data) {
                success(
                  t('message:post_answer_entry.success.title'),
                  t('message:post_answer_entry.success.description')
                )
                resetAnswerEntry()
                resetSelectedNoteId('')
                resetCreateNoteData()
                toggleSaveAnswerNoteState()
              } else if (!result.success) {
                error(t('message:post_answer_entry.error.title'), t('message:post_answer_entry.error.description'))
              }
            }}
            variant={'primary'}
            size={'lg'}
            buttonType={'button'}
          >
            {t('modal:footer_buttons.save')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
