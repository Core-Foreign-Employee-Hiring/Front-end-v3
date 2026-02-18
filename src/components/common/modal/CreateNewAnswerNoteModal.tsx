import { Button, Label, Modal, TextInput } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useNoteStore } from '@/store/interview/noteStore'
import { postCreateNote } from '@/lib/client/interview'

export default function CreateNewAnswerNoteModal() {
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
        <Label label={'새 답변 노트'} type={'subtitleLg'} />
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-2">
          <Label label={'노트명'} type={'titleSm'} labelColor={'text-gray5'} />
          <TextInput
            placeholder={'예: 자기소개 모음'}
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
            취소
          </Button>
          <Button
            onClick={async () => {
              const result = await postCreateNote(createNoteData)
              if (result.data) {
                resetCreateNoteData()
                console.log('노트 추가 성공', result)
                toggleCreateNewAnswerNoteState()
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
