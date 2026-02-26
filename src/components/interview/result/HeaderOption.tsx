'use client'

import { useState } from 'react'
import { AIInterviewTestSettingModal, Button } from '@/components/common'
import { useTranslation } from 'react-i18next'

export default function HeaderOption() {
  const { t } = useTranslation('interview')
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      {isModalOpen && (
        <AIInterviewTestSettingModal
          onClose={() => {
            setIsModalOpen(false)
          }}
          isOpen={isModalOpen}
        />
      )}
      <Button
        onClick={() => {
          setIsModalOpen(true)
        }}
        customClassName={'w-fit'}
        size={'sm'}
        variant={'primary'}
      >
        {t('history.setDetail.headerOptionButton')}
      </Button>
    </div>
  )
}
