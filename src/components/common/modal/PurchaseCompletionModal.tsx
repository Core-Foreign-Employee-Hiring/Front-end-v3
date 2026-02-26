'use client'

import { Button, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { PurchaseCompletionIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { Trans, useTranslation } from 'react-i18next'

export default function PurchaseCompletionModal() {
  const { t } = useTranslation('modal')
  const { toggleModal, modals } = useModalStore((state) => state)
  const router = useRouter()
  const onClose = () => {
    toggleModal('isPurchaseCompletionModalOpen')
  }
  return (
    <Modal isOpen={modals.isPurchaseCompletionModalOpen} mobileHidden={false}>
      <Modal.Header>
        <div className="flex w-full flex-col items-center gap-y-2">
          <h1 className="kr-title-md">
            <Trans
              i18nKey="purchase_completion.header.title"
              components={[<span key="0" className="text-main-500" />]}
            />
          </h1>
          <p className="text-gray5 kr-body-md">
            <Trans
              i18nKey="purchase_completion.header.description"
              components={[<span key="0" className="kr-subtitle-md" />]}
            />
          </p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex w-full items-center justify-center">
          <PurchaseCompletionIcon width={260} height={200} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button onClick={onClose} variant={'outline'}>
            {t('footer_buttons.close')}
          </Button>
          <Button
            onClick={() => {
              router.push('/mypage/content')
            }}
          >
            {t('purchase_completion.footer.go_to_history')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
