'use client'

import { Button } from '@/components/common'
import { ApplicationMethodType } from '@/types/job-post'
import { useModalStore } from '@/store/modalStore'
import ApplicationMethodModal from '@/components/common/modal/ApplicationMethodModal'

interface ActionButtonsProps {
  applicationMethod: ApplicationMethodType
  directInputApplicationMethod: string
}

export default function ActionButtons({ applicationMethod, directInputApplicationMethod }: ActionButtonsProps) {
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
        지원하기
      </Button>
    </div>
  )
}
