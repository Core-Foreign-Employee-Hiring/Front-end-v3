'use client'

import { Button } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'

export default function AddResumeButton() {
  const { toggleModal } = useModalStore((state) => state)

  return (
    <Button
      onClick={() => {
        toggleModal('isCreateResumeModalOpen')
      }}
      variant={'secondary'}
      size={'md'}
      customClassName={'w-[86px]'}
      leftIcon={<Main5000PlusIcon width={20} height={20} />}
    >
      추가
    </Button>
  )
}
