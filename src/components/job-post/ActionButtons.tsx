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
  const { isApplicationMethodModalOpen, setIsApplicationMethodModalOpen } = useModalStore((state) => state)

  return (
    <div>
      {isApplicationMethodModalOpen && (
        <ApplicationMethodModal
          directInputApplicationMethod={directInputApplicationMethod}
          applicationMethod={applicationMethod}
        />
      )}
      <Button
        onClick={() => {
          setIsApplicationMethodModalOpen(isApplicationMethodModalOpen)
        }}
      >
        지원하기
      </Button>
    </div>
  )
}
