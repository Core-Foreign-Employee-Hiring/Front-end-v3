'use client'

import { Button, Label, Modal } from '@/components/common'
import { deleteNote } from '@/lib/client/interview'
import { useModalStore } from '@/store/modalStore'
import { useNoteStore } from '@/store/interview/noteStore'
import { useTranslation } from 'react-i18next'

export default function DeleteNoteModal() {
  const { t } = useTranslation('modal')
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
        <Label label={t('delete_note.header')} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <Label label={t('delete_note.body')} type={'subtitleMd'} labelColor={'text-gray5'} />
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={toggleDeleteNoteState} variant={'outline'} size={'lg'} buttonType={'button'}>
            {t('footer_buttons.cancel')}
          </Button>
          <Button
            onClick={async () => {
              const result = await deleteNote(selectedNoteId)
              console.log('노트 삭제', result.data)
            }}
            variant={'primary'}
            size={'lg'}
            buttonType={'button'}
          >
            {t('footer_buttons.save')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
