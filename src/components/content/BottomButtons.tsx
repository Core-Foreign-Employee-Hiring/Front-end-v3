'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/common'
import { getInquiryUrl } from '@/lib/client/content'
import InquiryModal from '@/components/common/modal/InquiryModal'
import { useModalStore } from '@/store/modalStore'
import { useToast } from '@/components/common/toast/ToastContext'
import { useGTM } from '@/hooks/common/useGTM'

interface BottomButtonsProps {
  archiveId: string
}

const GTM_EVENT = {
  INQUIRY_CLICK: 'click_explore_content_inquiry',
  PURCHASE_CLICK: 'click_ready_content_purchase_checkout',
} as const

export default function BottomButtons({ archiveId }: BottomButtonsProps) {
  const router = useRouter()
  const { t } = useTranslation('content')
  const { error } = useToast()
  const { pushEvent } = useGTM()

  const isInquiryModalOpen = useModalStore((state) => state.modals.isInquiryModalOpen)
  const toggleModal = useModalStore((state) => state.toggleModal)

  const [inquiry, setInquiry] = useState<string>('')

  const handleInquiry = useCallback(async () => {
    pushEvent(GTM_EVENT.INQUIRY_CLICK, {
      element_id: 'click_explore_content_inquiry',
      archive_id: archiveId,
    })

    try {
      const result = await getInquiryUrl(archiveId)
      if (result) {
        setInquiry(result)
        toggleModal('isInquiryModalOpen')
      }
    } catch {
      error('오류 발생', '문의 정보를 불러오지 못했습니다.')
    }
  }, [pushEvent, archiveId, toggleModal, error])

  const handlePurchase = useCallback(() => {
    pushEvent(GTM_EVENT.PURCHASE_CLICK, {
      element_id: 'click_ready_content_purchase_checkout',
      archive_id: archiveId,
    })
    router.push(`/content/${archiveId}/payment`)
  }, [pushEvent, archiveId, router])

  return (
    <div className="desktop:hidden tablet:px-[32px] tablet:gap-x-4 fixed bottom-0 left-0 flex w-full gap-x-3 bg-white px-[20px] py-[20px]">
      {isInquiryModalOpen && <InquiryModal inquiry={inquiry} />}

      <Button
        id="click_explore_content_inquiry"
        onClick={handleInquiry}
        customClassName="w-[200px]"
        size="lg"
        variant="outline"
      >
        {t('detail.contentSummary.actionButtons.inquiryButton')}
      </Button>

      <Button id="click_ready_content_purchase_checkout" onClick={handlePurchase}>
        {t('detail.contentSummary.actionButtons.purchaseButton')}
      </Button>
    </div>
  )
}
