'use client'

import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import InfoPicker from '@/components/resume/info-picker/InfoPicker'

export default function InfoPickerModal() {
  const { isInfoPickerModalOpen, setIsInfoPickerModalOpen } = useModalStore((state) => state)
  const onClose = () => {
    setIsInfoPickerModalOpen(isInfoPickerModalOpen)
  }
  return (
    <Modal
      customClassName={'desktop:w-[860px] tablet:w-[680px] w-[335px]'}
      onClose={onClose}
      isOpen={isInfoPickerModalOpen}
    >
      <Modal.Header>
        <div className="flex flex-col gap-y-2">
          <Label label={'지원 목적에 맞게 이력서에 포함할 정보를 선택하세요.'} type={'titleMd'} />
          <Label
            label={'나의 강점이 가장 잘 드러나는 맞춤형 PDF 이력서를 만들 수 있어요.'}
            type={'subtitleMd'}
            labelColor={'text-gray5'}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <InfoPicker />
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={onClose} variant={'outline'} size={'lg'} customClassName={'w-[200px]'}>
            닫기
          </Button>
          <Button variant={'primary'} size={'lg'}>
            내보내기
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
