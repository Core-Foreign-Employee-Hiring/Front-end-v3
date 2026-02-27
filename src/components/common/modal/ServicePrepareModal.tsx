'use client'

import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'

export default function ServicePrepareModal() {
  const { t } = useTranslation('modal')
  const { toggleModal, modals } = useModalStore((state) => state)
  const onClose = () => {
    toggleModal('isServicePrepareModalOpen')
  }
  return (
    <Modal mobileHidden={false} isOpen={modals.isServicePrepareModalOpen}>
      <Modal.Header>
        <div className="kr-subtitle-lg flex w-full flex-col items-center justify-center">
          <Label label={t('service_prepare.header')} type={'subtitleLg'} />
        </div>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onClose} size={'lg'} variant={'outline'}>
          {t('footer_buttons.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
