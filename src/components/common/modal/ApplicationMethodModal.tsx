'use client'

import { Button, Modal } from '@/components/common'
import { ApplicationMethodType } from '@/types/job-post'
import { useModalStore } from '@/store/modalStore'
import { Trans, useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface ApplicationMethodModalProps {
  applicationMethod: ApplicationMethodType
  directInputApplicationMethod: string
}
export default function ApplicationMethodModal({
  applicationMethod,
  directInputApplicationMethod,
}: ApplicationMethodModalProps) {
  const { t } = useTranslation(['modal'])
  const { success, error } = useToast()

  const { modals, toggleModal } = useModalStore((state) => state)
  const convertHeaderTitle = (method: ApplicationMethodType) => {
    return t(`modal:application_method.header.types.${method}`)
  }

  const onClose = () => {
    toggleModal('isApplicationMethodModalOpen')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(directInputApplicationMethod)
      success(t('modal:application_method.body.copy_success'))
      toggleModal('isApplicationMethodModalOpen')
    } catch (e) {
      error(t('modal:application_method.body.copy_fail'))
    }
  }

  return (
    <Modal isOpen={modals.isApplicationMethodModalOpen} mobileHidden={false} onClose={onClose}>
      <Modal.Header>
        <div className="flex w-full items-center justify-center">
          <h1 className="kr-subtitle-lg">
            <Trans
              ns="modal"
              i18nKey="application_method.header.title"
              values={{ method: convertHeaderTitle(applicationMethod) }}
              components={[<span key="0" className="text-main-500" />]}
            />
          </h1>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex w-full items-center justify-center">
          <p className="kr-body-md text-gray5">{directInputApplicationMethod}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} variant={'outline'}>
          {t('modal:footer_buttons.close')}
        </Button>
        <Button onClick={handleCopy}>{t('modal:application_method.footer.copy')}</Button>
      </Modal.Footer>
    </Modal>
  )
}
