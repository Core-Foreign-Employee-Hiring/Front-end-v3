'use client'

import { Button } from '@/components/common'
import { ApplicationMethodType } from '@/types/job-post'
import { useModalStore } from '@/store/modalStore'
import ApplicationMethodModal from '@/components/common/modal/ApplicationMethodModal'
import { useTranslation } from 'react-i18next'

interface ActionButtonsProps {
  applicationMethod: ApplicationMethodType
  directInputApplicationMethod: string
}

export default function ActionButtons({ applicationMethod, directInputApplicationMethod }: ActionButtonsProps) {
  const { t } = useTranslation(['jobPost', 'modal'])

  const { toggleModal, modals } = useModalStore((state) => state)

  return (
    <div>
      {modals.isApplicationMethodModalOpen && (
        <ApplicationMethodModal
          directInputApplicationMethod={directInputApplicationMethod}
          applicationMethod={applicationMethod}
        />
      )}
      <Button
        onClick={() => {
          toggleModal('isApplicationMethodModalOpen')
        }}
      >
        {t('jobPost:detail.actionButtons.applyButton')}
      </Button>
    </div>
  )
}
