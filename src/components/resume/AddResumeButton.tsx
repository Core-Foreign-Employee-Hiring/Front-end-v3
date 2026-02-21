'use client'

import { Button } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { useModalStore } from '@/store/modalStore'
import { useTranslation } from 'react-i18next'

export default function AddResumeButton() {
  const { t } = useTranslation('resume')
  const { toggleModal } = useModalStore((state) => state)

  return (
    <Button
      onClick={() => {
        toggleModal('isCreateResumeModalOpen')
      }}
      variant={'secondary'}
      size={'md'}
      customClassName={'w-fit'}
      leftIcon={<Main5000PlusIcon width={20} height={20} />}
    >
      {t('buttons.add')}
    </Button>
  )
}
