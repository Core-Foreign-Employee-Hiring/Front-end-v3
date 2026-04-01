'use client'

import { Button } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { getInquiryUrl } from '@/lib/client/content'
import InquiryModal from '@/components/common/modal/InquiryModal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

interface DesktopActionButtonsProps {
  archiveId: string
}

export default function DesktopActionButtons({ archiveId }: DesktopActionButtonsProps) {
  const router = useRouter()
  const { t } = useTranslation(['content'])
  const { toggleModal, modals } = useModalStore((state) => state)

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
          router.push(`/content/${archiveId}/payment`)
        }}
        customClassName="w-[313px]"
      >
        {t('detail.contentSummary.actionButtons.purchaseButton')}
      </Button>
    </div>
  )
}
