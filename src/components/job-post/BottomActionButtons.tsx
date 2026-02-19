'use client'

import { Button } from '@/components/common'
import { ApplicationMethodType } from '@/types/job-post'
import { useModalStore } from '@/store/modalStore'
import ApplicationMethodModal from '@/components/common/modal/ApplicationMethodModal'
import { useTranslation } from 'react-i18next'

interface BottomActionsButtonsProps {
  applicationMethod: ApplicationMethodType
  directInputApplicationMethod: string
}

export default function BottomActionsButtons({
  applicationMethod,
  directInputApplicationMethod,
}: BottomActionsButtonsProps) {
  const { t } = useTranslation(['jobPost'])

  const { toggleModal, modals } = useModalStore((state) => state)
  return (
    <div>
      {modals.isApplicationMethodModalOpen && (
        <ApplicationMethodModal
          directInputApplicationMethod={directInputApplicationMethod}
          applicationMethod={applicationMethod}
        />
      )}
      <div className="desktop:hidden tablet:px-[32px] fixed bottom-0 left-0 w-full bg-white px-[20px] py-[20px]">
        <Button
          onClick={() => {
            toggleModal('isApplicationMethodModalOpen')
          }}
        >
          {t('jobPost:detail.actionButtons.applyButton')}
        </Button>
      </div>
    </div>
  )
}
