'use client'

import { Button, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import Link from 'next/link'

interface InquiryModalProps {
  inquiry: string
}

export default function InquiryModal({ inquiry }: InquiryModalProps) {
  const { toggleModal, modals } = useModalStore((state) => state)
  const onClose = () => {
    toggleModal('isInquiryModalOpen')
  }
  return (
    <Modal isOpen={modals.isInquiryModalOpen} mobileHidden={false}>
      <Modal.Header>
        <Link href={inquiry} className="flex w-full items-center justify-center underline">
          {inquiry}
        </Link>
      </Modal.Header>
      <Modal.Footer>
        <>
          <Button onClick={onClose} variant={'outline'}>
            닫기
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
