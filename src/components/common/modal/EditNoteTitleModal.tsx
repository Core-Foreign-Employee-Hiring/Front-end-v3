import { Button, Label, Modal, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useNoteStore } from '@/store/interview/noteStore'
import { putNoteTitle } from '@/lib/client/interview'
import { useRouter } from 'next/navigation'

export default function EditNoteTitleModal() {
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
        <Label label={'답변 노트 수정'} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-2">
          <Label label={'노트명'} type={'titleSm'} labelColor={'text-gray5'} />
          <TextInput
            placeholder={'예: 자기소개 모음'}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              console.log('title', title)
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={toggleEditNoteTitleState} variant={'outline'} size={'lg'} buttonType={'button'}>
            취소
          </Button>
          <Button
            onClick={async () => {
              const result = await putNoteTitle(selectedNoteId, title)
              console.log('제목 변경', result.data)
              toggleEditNoteTitleState()
              router.refresh()
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
