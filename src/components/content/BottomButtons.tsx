'use client'

import { Button } from '@/components/common'
import { getInquiryUrl } from '@/lib/client/content'
import InquiryModal from '@/components/common/modal/InquiryModal'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOrderStore } from '@/store/orderStore'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/common/toast/ToastContext'

interface BottomButtonsProps {
  archiveId: string
}

export default function BottomButtons({ archiveId }: BottomButtonsProps) {
  const router = useRouter()
  const { t } = useTranslation('content')
  const { error } = useToast()
  const { modals, toggleModal } = useModalStore((state) => state)
  const { setOrder } = useOrderStore((state) => state)

  const [inquiry, setInquiry] = useState<string>('')

  return (
    <div className="desktop:hidden tablet:px-[32px] tablet:gap-x-4 fixed bottom-0 left-0 flex w-full gap-x-3 bg-white px-[20px] py-[20px]">
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
          router.push(`/content/${archiveId}/payment`)
        }}
      >
        {t('detail.contentSummary.actionButtons.purchaseButton')}
      </Button>
    </div>
  )
}
