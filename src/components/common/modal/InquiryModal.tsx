'use client'

import { Button, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

interface InquiryModalProps {
  inquiry: string
}

export default function InquiryModal({ inquiry }: InquiryModalProps) {
  const { toggleModal, modals } = useModalStore((state) => state)
  const { t } = useTranslation('modal')
  const onClose = () => {
    toggleModal('isInquiryModalOpen')
  }

  if (!inquiry) return null

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
            {t('footer_buttons.close')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
