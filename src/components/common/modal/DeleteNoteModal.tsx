'use client'

import { Button, Label, Modal } from '@/components/common'
import { deleteNote } from '@/lib/client/interview'
import { useModalStore } from '@/store/modalStore'
import { useNoteStore } from '@/store/interview/noteStore'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

export default function DeleteNoteModal() {
  const { t } = useTranslation(['modal', 'message'])
  const { success, error } = useToast()
  const { toggleModal, modals } = useModalStore((state) => state)

  const { selectedNoteId } = useNoteStore((state) => state)

  const toggleDeleteNoteState = () => {
    toggleModal('isDeleteNoteModalOpen')
  }

  return (
    <Modal
      mobileHidden={false}
      customClassName={'w-[508px]'}
      onClose={toggleDeleteNoteState}
      isOpen={modals.isDeleteNoteModalOpen}
    >
      <Modal.Header>
        <Label label={t('modal:delete_note.header')} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <Label label={t('modal:delete_note.body')} type={'subtitleMd'} labelColor={'text-gray5'} />
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={toggleDeleteNoteState} variant={'outline'} size={'lg'} buttonType={'button'}>
            {t('modal:footer_buttons.cancel')}
          </Button>
          <Button
            onClick={async () => {
              const result = await deleteNote(selectedNoteId)
              if (result.success) {
                success(t('message:delete_note.success.title'), t('message:delete_note.success.description'))
              } else {
                error(t('message:delete_note.error.title'), t('message:delete_note.error.description'))
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
