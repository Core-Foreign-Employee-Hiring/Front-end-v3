'use client'

import { Button, Label, Modal } from '@/components/common'
import ReviewInputField from '@/components/mypage/content/ReviewInputField'
import Rating from '@/components/mypage/content/Rating'
import ReviewSummary from '@/components/mypage/content/ReviewSummary'
import { useModalStore } from '@/store/modalStore'
import { useReviewStore } from '@/store/reviewStore'
import { postReview } from '@/lib/client/pass-archives'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface WriteReviewModalProps {
  archiveId: number
  title: string
  price: number
  thumbnailUrl: string
  approvedAt: string
}

export default function WriteReviewModal({ archiveId, title, thumbnailUrl, approvedAt, price }: WriteReviewModalProps) {
  const { t } = useTranslation(['modal', 'message'])
  const { success, error } = useToast()
  const { modals, toggleModal } = useModalStore((state) => state)
  const { reviewData } = useReviewStore((state) => state)
  const router = useRouter()
  const onClose = () => {
    toggleModal('isWriteReviewModalOpen')
  }

  return (
    <Modal isOpen={modals.isWriteReviewModalOpen} mobileHidden={false}>
      <Modal.Header>
        <Label label={t('modal:write_review.header')} type={'titleMd'} />
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-col gap-y-[32px]">
          <ReviewSummary title={title} approvedAt={approvedAt} thumbnailUrl={thumbnailUrl} price={price} />
          <Rating />
          <ReviewInputField />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <>
          <Button onClick={onClose} variant={'outline'} customClassName="w-[200px]">
            {t('modal:footer_buttons.close')}
          </Button>
          <Button
            onClick={async () => {
              const result = await postReview(archiveId, reviewData)
              if (result.data?.data && result.success) {
                router.refresh()
                success(t('message:post_review.success.title'), t('message:post_review.success.description'))
              } else if (!result.success) {
                error(t('message:post_review.error.title'), t('message:post_review.error.description'))
              }
              onClose()
            }}
          >
            {t('modal:write_review.footer.write')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
