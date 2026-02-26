'use client'

import { Button, Label, Modal, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useNoteStore } from '@/store/interview/noteStore'
import { putNoteTitle } from '@/lib/client/interview'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

export default function EditNoteTitleModal() {
  const { t } = useTranslation(['modal', 'message'])
  const { success, error } = useToast()
  const router = useRouter()
  const { toggleModal, modals } = useModalStore((state) => state)

  const { setTitle, title, selectedNoteId } = useNoteStore((state) => state)

  const toggleEditNoteTitleState = () => {
    toggleModal('isEditNoteTitleModalOpen')
  }

  return (
    <Modal
      mobileHidden={false}
      customClassName={'w-[508px]'}
      onClose={toggleEditNoteTitleState}
      isOpen={modals.isEditNoteTitleModalOpen}
    >
      <Modal.Header>
        <Label label={t('modal:edit_note_title.header')} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-2">
          <Label
            label={t('modal:edit_note_title.body.note_title_field.label')}
            type={'titleSm'}
            labelColor={'text-gray5'}
          />
          <TextInput
            placeholder={t('modal:edit_note_title.body.note_title_field.placeholder')}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={toggleEditNoteTitleState} variant={'outline'} size={'lg'} buttonType={'button'}>
            {t('modal:footer_buttons.cancel')}
          </Button>
          <Button
            onClick={async () => {
              const result = await putNoteTitle(selectedNoteId, title)
              if (result.success) {
                success(t('message:put_note_title.success.title'), t('message:put_note_title.success.description'))
                toggleEditNoteTitleState()
                router.refresh()
              } else {
                error(t('message:put_note_title.error.title'), t('message:put_note_title.error.description'))
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
