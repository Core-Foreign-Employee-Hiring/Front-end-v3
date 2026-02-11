'use client'

import { Button, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { PurchaseCompletionIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'

export default function PurchaseCompletionModal() {
  const { isPurchaseCompletionModalOpen, setIsPurchaseCompletionModalOpen } = useModalStore((state) => state)
  const router = useRouter()
  const onClose = () => {
    setIsPurchaseCompletionModalOpen(isPurchaseCompletionModalOpen)
  }
  return (
    <Modal isOpen={isPurchaseCompletionModalOpen} mobileHidden={false}>
      <Modal.Header>
        <div className="flex w-full flex-col items-center gap-y-2">
          <h1 className="kr-title-md">
            <span className="text-main-500">구매</span>가 완료되었어요!
          </h1>
          <p className="text-gray5 kr-body-md">
            구매한 내역은 <span className="kr-subtitle-md">마이페이지 → 콘텐츠 내역</span> 에서 확인할 수 있어요.
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
            닫기
          </Button>
          <Button
            onClick={() => {
              router.push('/mypage/content')
            }}
          >
            콘텐츠 내역
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
