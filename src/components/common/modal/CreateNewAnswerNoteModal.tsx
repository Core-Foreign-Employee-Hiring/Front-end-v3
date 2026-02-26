'use client'

import { Button, Label, Modal, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useNoteStore } from '@/store/interview/noteStore'
import { postCreateNote } from '@/lib/client/interview'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

export default function CreateNewAnswerNoteModal() {
  const { t } = useTranslation(['modal', 'message'])
  const { success, error } = useToast()
  const { modals, toggleModal } = useModalStore((state) => state)

  const { setCreateNoteData, createNoteData, resetCreateNoteData } = useNoteStore((state) => state)

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
      onClose={toggleCreateNewAnswerNoteState}
      isOpen={modals.isCreateNewAnswerNoteModalOpen}
    >
      <Modal.Header>
        <Label label={t('modal:create_new_answer_note.header.title')} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-2">
          <Label
            label={t('modal:create_new_answer_note.body.note_name.label')}
            type={'titleSm'}
            labelColor={'text-gray5'}
          />
          <TextInput
            placeholder={t('modal:create_new_answer_note.body.note_name.placeholder')}
            value={createNoteData.title}
            onChange={(e) => {
              setCreateNoteData({ title: e.target.value })
              console.log('createNoteData', createNoteData)
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={toggleCreateNewAnswerNoteState} variant={'outline'} size={'lg'} buttonType={'button'}>
            {t('modal:footer_buttons.cancel')}
          </Button>
          <Button
            onClick={async () => {
              const result = await postCreateNote(createNoteData)
              if (result.data && result.success) {
                resetCreateNoteData()
                success(t('message:post_create_note.success.title'), t('message:post_create_note.success.description'))
                toggleCreateNewAnswerNoteState()
              } else if (!result.success) {
                error(t('message:post_create_note.error.title'), t('message:post_create_note.error.description'))
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
