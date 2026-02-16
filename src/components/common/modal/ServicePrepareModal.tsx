'use client'

import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'

export default function ServicePrepareModal() {
  const { toggleModal, modals } = useModalStore((state) => state)
  const onClose = () => {
    toggleModal('isServicePrepareModalOpen')
  }
  return (
    <Modal isOpen={modals.isServicePrepareModalOpen}>
      <Modal.Header>
        <div className="kr-subtitle-lg flex w-full flex-col items-center justify-center">
          <Label label={'현재 서비스 준비중입니다.'} type={'subtitleLg'} />
        </div>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onClose} size={'lg'} variant={'outline'}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
