import { Button, Label, Modal } from '@/components/common'
import { StarIcon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'
import { useEffect, useState } from 'react'
import { getReviewDetail } from '@/lib/client/pass-archives'
import { ReviewDetailType } from '@/types/review'
import { formatRelativeTime } from '@/utils/content'
import { useTranslation } from 'react-i18next'

interface ViewReviewModalOpenProps {
  reviewId: number
}

export default function ViewReviewModalOpen({ reviewId }: ViewReviewModalOpenProps) {
  const { t } = useTranslation('content')
  const { toggleModal, modals } = useModalStore((state) => state)
  const onClose = () => {
    toggleModal('isViewReviewModalOpen')
  }
  const [reviewDetail, setReviewDetail] = useState<ReviewDetailType>()

  useEffect(() => {
    getReviewDetail(reviewId).then((response) => {
      setReviewDetail(response.data)
    })
  }, [])

  return (
    <Modal isOpen={modals.isViewReviewModalOpen} mobileHidden={false}>
      <Modal.Header>
        <Label label={'리뷰'} type={'titleMd'} />
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-y-3">
          <section className="flex items-center justify-between">
            <div className="flex gap-x-1">
              <StarIcon width={24} height={24} />
              <p className="kr-subtitle-md">{reviewDetail?.star}</p>
            </div>
            <p className="kr-small text-gray4">{formatRelativeTime(reviewDetail?.createAt, t)}</p>
          </section>
          <p className="kr-body-md">{reviewDetail?.content}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <Button onClick={onClose} variant={'outline'}>
            닫기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
