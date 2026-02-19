'use client'

import { Button } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { getInquiryUrl, postPaymentContent } from '@/lib/client/content'
import PurchaseCompletionModal from '@/components/common/modal/PurchaseCompletionModal'
import InquiryModal from '@/components/common/modal/InquiryModal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface DesktopActionButtonsProps {
  archiveId: string
}

export default function DesktopActionButtons({ archiveId }: DesktopActionButtonsProps) {
  const { t } = useTranslation(['content'])
  const { toggleModal, modals } = useModalStore((state) => state)

  const [inquiry, setInquiry] = useState<string>('')

  return (
    <div className="desktop:flex hidden gap-x-[20px]">
      {modals.isPurchaseCompletionModalOpen && <PurchaseCompletionModal />}
      {modals.isInquiryModalOpen && <InquiryModal inquiry={inquiry} />}

      <Button
        onClick={async () => {
          const result = await getInquiryUrl(archiveId)
          if (result) {
            console.log('문의', result)
            setInquiry(result)
            toggleModal('isInquiryModalOpen')
          }
        }}
        customClassName={'w-[200px]'}
        size={'lg'}
        variant={'outline'}
      >
        {t('detail.contentSummary.actionButtons.inquiryButton')}
      </Button>
      <Button
        onClick={async () => {
          const result = await postPaymentContent(archiveId)
          console.log('구매하기', result)
          toggleModal('isPurchaseCompletionModalOpen')
        }}
        customClassName="w-[313px]"
      >
        {t('detail.contentSummary.actionButtons.purchaseButton')}
      </Button>
    </div>
  )
}
