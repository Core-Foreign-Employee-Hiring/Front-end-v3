'use client'

import { Button } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { getInquiryUrl, postPaymentContent } from '@/lib/client/content'
import PurchaseCompletionModal from '@/components/common/modal/PurchaseCompletionModal'
import InquiryModal from '@/components/common/modal/InquiryModal'
import { useState } from 'react'

interface DesktopActionButtonsProps {
  archiveId: string
}

export default function DesktopActionButtons({ archiveId }: DesktopActionButtonsProps) {
  const { isInquiryModalOpen, setIsInquiryModalOpen, isPurchaseCompletionModalOpen, setIsPurchaseCompletionModalOpen } =
    useModalStore((state) => state)

  const [inquiry, setInquiry] = useState<string>('')

  return (
    <div className="desktop:flex hidden gap-x-[20px]">
      {isPurchaseCompletionModalOpen && <PurchaseCompletionModal />}
      {isInquiryModalOpen && <InquiryModal inquiry={inquiry} />}

      <Button
        onClick={async () => {
          const result = await getInquiryUrl(archiveId)
          if (result) {
            console.log('문의', result)
            setInquiry(result)
            setIsInquiryModalOpen(isInquiryModalOpen)
          }
        }}
        customClassName={'w-[200px]'}
        size={'lg'}
        variant={'outline'}
      >
        문의
      </Button>
      <Button
        onClick={async () => {
          const result = await postPaymentContent(archiveId)
          console.log('구매하기', result)
          setIsPurchaseCompletionModalOpen(isPurchaseCompletionModalOpen)
        }}
        customClassName="w-[313px]"
      >
        구매하기
      </Button>
    </div>
  )
}
