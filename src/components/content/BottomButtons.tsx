'use client'

import { Button } from '@/components/common'
import { getInquiryUrl, postPaymentContent } from '@/lib/client/content'
import PurchaseCompletionModal from '@/components/common/modal/PurchaseCompletionModal'
import InquiryModal from '@/components/common/modal/InquiryModal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'

interface BottomButtonsProps {
  archiveId: string
}

export default function BottomButtons({ archiveId }: BottomButtonsProps) {
  const { isInquiryModalOpen, setIsInquiryModalOpen, isPurchaseCompletionModalOpen, setIsPurchaseCompletionModalOpen } =
    useModalStore((state) => state)

  const [inquiry, setInquiry] = useState<string>('')

  return (
    <div className="desktop:hidden tablet:px-[32px] tablet:gap-x-4 fixed bottom-0 left-0 flex w-full gap-x-3 bg-white px-[20px] py-[20px]">
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
      >
        구매하기
      </Button>
    </div>
  )
}
