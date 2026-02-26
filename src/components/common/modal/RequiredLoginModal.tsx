'use client'
import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface RequiredLoginModalProps {
  lang: string
}

export default function RequiredLoginModal({ lang }: RequiredLoginModalProps) {
  const { t } = useTranslation('modal')
  const { modals, setModal } = useModalStore((state) => state)
  const router = useRouter()

  return (
    <Modal mobileHidden={false} isOpen={modals.isRequiredLoginModalOpen}>
      <Modal.Header>
        <Label label={t('required_login.header')} />
      </Modal.Header>
      <Modal.Footer>
        <>
          <Button
            onClick={() => {
              router.push(`/${lang}/login`)
              setModal('isRequiredLoginModalOpen', false)
            }}
            variant={'primary'}
          >
            {t('required_login.footer.login')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
