'use client'

import { Button } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { getInquiryUrl } from '@/lib/client/content'
import InquiryModal from '@/components/common/modal/InquiryModal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { postOrder } from '@/lib/client/order'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/store/orderStore'
import { useToast } from '@/components/common/toast/ToastContext'

interface DesktopActionButtonsProps {
  archiveId: string
}

export default function DesktopActionButtons({ archiveId }: DesktopActionButtonsProps) {
  const router = useRouter()
  const { t } = useTranslation(['content'])
  const { toggleModal, modals } = useModalStore((state) => state)
  const { error } = useToast()
  const { setOrder } = useOrderStore((state) => state)

  const [inquiry, setInquiry] = useState<string>('')

  return (
    <div className="desktop:flex hidden gap-x-[20px]">
      {modals.isInquiryModalOpen && <InquiryModal inquiry={inquiry} />}

      <Button
        onClick={async () => {
          const result = await getInquiryUrl(archiveId)
          if (result) {
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
          const result = await postOrder([parseInt(archiveId)])
          if (result.success && result.data?.data) {
            setOrder(result.data.data)
            router.push(`/payment/${result.data.data.merchantOrderId}`)
          } else if (!result.success) {
            error('콘텐츠 결제 실패', '콘텐츠 결제에 실패했어요.')
          }
        }}
        customClassName="w-[313px]"
      >
        {t('detail.contentSummary.actionButtons.purchaseButton')}
      </Button>
    </div>
  )
}
