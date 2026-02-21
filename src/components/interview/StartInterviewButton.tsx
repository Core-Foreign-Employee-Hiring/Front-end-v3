'use client'

import { Button } from '@/components/common'
import AIInterviewTestSettingModal from '@/components/common/modal/AIInterviewTestSettingModal'
import { ArrowFowardGray3Icon } from '@/assets/svgComponents'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function StartInterviewButton() {
  const { t } = useTranslation(['interview'])
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div>
      {isModalOpen ? <AIInterviewTestSettingModal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} /> : null}
      <Button
        onClick={() => {
          setIsModalOpen(true)
        }}
        size={'md'}
        variant={'primary'}
        customClassName={'w-fit'}
        rightIcon={<ArrowFowardGray3Icon width={20} height={20} />}
      >
        {t('startButton')}
      </Button>
    </div>
  )
}
