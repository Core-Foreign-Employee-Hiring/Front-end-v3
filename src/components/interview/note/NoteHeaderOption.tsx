'use client'

import { Button } from '@/components/common'
import { useNoteStore } from '@/store/interview/noteStore'
import { useModalStore } from '@/store/modalStore'
import EditNoteTitleModal from '@/components/common/modal/EditNoteTitleModal'
import DeleteNoteModal from '@/components/common/modal/DeleteNoteModal'

interface NoteHeaderOptionProps {
  noteId: string
}

export default function NoteHeaderOption({ noteId }: NoteHeaderOptionProps) {
  const { modals, toggleModal } = useModalStore((state) => state)
  const setSelectedNoteId = useNoteStore((state) => state.setSelectedNoteId)
  return (
    <div>
      {modals.isEditNoteTitleModalOpen && <EditNoteTitleModal />}
      {modals.isDeleteNoteModalOpen && <DeleteNoteModal />}

      <div className="flex gap-x-3">
        <Button
          customClassName={'w-[80px]'}
          buttonType={'button'}
          onClick={() => {
            setSelectedNoteId(noteId)
            toggleModal('isEditNoteTitleModalOpen')
          }}
          size={'sm'}
          variant={'outline'}
        >
          수정
        </Button>
        <Button
          customClassName={'w-[80px]'}
          buttonType={'button'}
          onClick={() => {
            setSelectedNoteId(noteId)
            toggleModal('isDeleteNoteModalOpen')
          }}
          size={'sm'}
          variant={'outline'}
        >
          삭제
        </Button>
      </div>
    </div>
  )
}
