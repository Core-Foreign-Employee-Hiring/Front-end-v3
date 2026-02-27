'use client'
import { Button, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface NotUseResumeServiceModalProps {
  lang: string
}

export default function NotUseResumeServiceModal({ lang }: NotUseResumeServiceModalProps) {
  const { t } = useTranslation('modal')
  const { toggleModal, modals } = useModalStore((state) => state)
  const router = useRouter()

  return (
    <Modal mobileHidden={false} isOpen={modals.isNotUseResumeService}>
      <Modal.Header>
        <div className="flex w-full items-center justify-center">
          <p className="kr-subtitle-lg">{t('not_use_resume_service.header')}</p>
        </div>
      </Modal.Header>
      <Modal.Footer>
        <>
          <Button
            onClick={() => {
              router.back()
              toggleModal('isNotUseResumeService')
            }}
            variant={'outline'}
          >
            {t('footer_buttons.close')}
          </Button>
          <Button
            onClick={() => {
              router.push(`/${lang}/carrer?tab=spec`)
            }}
            variant={'primary'}
          >
            {t('not_use_resume_service.footer.spec')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
