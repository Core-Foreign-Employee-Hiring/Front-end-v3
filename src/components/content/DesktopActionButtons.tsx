'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { getInquiryUrl } from '@/lib/client/content'
import InquiryModal from '@/components/common/modal/InquiryModal'
import { useGTM } from '@/hooks/common/useGTM'

interface DesktopActionButtonsProps {
  archiveId: string
}

const GTM_EVENT = {
  INQUIRY_CLICK: 'click_explore_content_inquiry',
  PURCHASE_CLICK: 'click_ready_content_purchase_checkout',
} as const

export default function DesktopActionButtons({ archiveId }: DesktopActionButtonsProps) {
  const router = useRouter()
  const { t } = useTranslation(['content'])
  const { pushEvent } = useGTM()

  const isInquiryModalOpen = useModalStore((state) => state.modals.isInquiryModalOpen)
  const toggleModal = useModalStore((state) => state.toggleModal)

  const [inquiry, setInquiry] = useState<string>('')

  const handleInquiry = useCallback(async () => {
    pushEvent(GTM_EVENT.INQUIRY_CLICK, {
      element_id: 'click_explore_content_inquiry',
      archive_id: archiveId,
    })

    const result = await getInquiryUrl(archiveId)
    if (result) {
      setInquiry(result)
      toggleModal('isInquiryModalOpen')
    }
  }, [pushEvent, archiveId, toggleModal])

  const handlePurchase = useCallback(() => {
    pushEvent(GTM_EVENT.PURCHASE_CLICK, {
      element_id: 'click_ready_content_purchase_checkout',
      archive_id: archiveId,
    })
    router.push(`/content/${archiveId}/payment`)
  }, [pushEvent, archiveId, router])

  return (
    <div className="desktop:flex hidden gap-x-[20px]">
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

      <Button id="click_ready_content_purchase_checkout" onClick={handlePurchase} customClassName="w-[313px]">
        {t('detail.contentSummary.actionButtons.purchaseButton')}
      </Button>
    </div>
  )
}
