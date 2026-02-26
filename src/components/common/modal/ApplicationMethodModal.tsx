'use client'

import { Button, Modal } from '@/components/common'
import { ApplicationMethodType } from '@/types/job-post'
import { useModalStore } from '@/store/modalStore'
import { Trans, useTranslation } from 'react-i18next'

interface ApplicationMethodModalProps {
  applicationMethod: ApplicationMethodType
  directInputApplicationMethod: string
}

export default function ApplicationMethodModal({
  applicationMethod,
  directInputApplicationMethod,
}: ApplicationMethodModalProps) {
  const { t } = useTranslation('modal')
  const { modals, toggleModal } = useModalStore((state) => state)
  const convertHeaderTitle = (applicationMethod: ApplicationMethodType) => {
    switch (applicationMethod) {
      case 'EMAIL':
        return t('application_method.header.types.EMAIL')
      case 'WEBSITE':
        return t('application_method.header.types.WEBSITE')
      case 'PHONE_SMS':
        return t('application_method.header.types.PHONE_SMS')
    }
  }

  const onClose = () => {
    toggleModal('isApplicationMethodModalOpen')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(directInputApplicationMethod)
      alert(t('application_method.body.copy_success')) // 또는 Toast UI 사용 추천
    } catch (error) {
      console.error('복사 실패:', error)
      alert(t('application_method.body.copy_fail'))
    }
  }

  return (
    <Modal isOpen={modals.isApplicationMethodModalOpen} mobileHidden={false} onClose={onClose}>
      <Modal.Header>
        <div className="flex w-full items-center justify-center">
          <h1 className="kr-subtitle-lg">
            <Trans
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
        <>
          <Button onClick={onClose} variant={'outline'}>
            {t('application_method.footer.close')}
          </Button>
          <Button onClick={handleCopy}>{t('application_method.footer.copy')}</Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
