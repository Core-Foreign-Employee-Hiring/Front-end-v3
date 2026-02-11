'use client'

import { Button, Label, Modal } from '@/components/common'
import { deleteNote } from '@/lib/client/interview'
import { useModalStore } from '@/store/modalStore'
import { useNoteStore } from '@/store/interview/noteStore'

export default function DeleteNoteModal() {
  const { isDeleteNoteModalOpen, setIsDeleteNoteModalOpen } = useModalStore((state) => state)

  const { selectedNoteId } = useNoteStore((state) => state)

  const toggleDeleteNoteState = () => {
    setIsDeleteNoteModalOpen(isDeleteNoteModalOpen)
  }

  return (
    <Modal
      mobileHidden={false}
      customClassName={'w-[508px]'}
      onClose={toggleDeleteNoteState}
      isOpen={isDeleteNoteModalOpen}
    >
      <Modal.Header>
        <Label label={'답변노트를 삭제하실껀가요?'} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <Label label={'삭제된 노트는 되돌릴 수 없습니다.'} type={'subtitleMd'} labelColor={'text-gray5'} />
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={toggleDeleteNoteState} variant={'outline'} size={'lg'} buttonType={'button'}>
            취소
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
            저장
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
