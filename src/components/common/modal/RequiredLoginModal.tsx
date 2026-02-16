import { Button, Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useRouter } from 'next/navigation'

interface RequiredLoginModalProps {
  lang: string
}

export default function RequiredLoginModal({ lang }: RequiredLoginModalProps) {
  const { modals, setModal } = useModalStore((state) => state)
  const router = useRouter()

  return (
    <Modal mobileHidden={false} isOpen={modals.isRequiredLoginModalOpen}>
      <Modal.Header>
        <Label label={'로그인이 필요한 서비스입니다.'} />
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
            로그인
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
