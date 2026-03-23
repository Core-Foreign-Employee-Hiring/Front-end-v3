'use client'

import { Button } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface BottomButtonProps {
  step?: '1' | '2' | '3' | '4' | '5' | '6'
  handlePrev?: () => void
  isPrevButtonActive?: boolean
  handleNext?: () => void
  isNextButtonActive?: boolean
}

export default function BottomButton({
  handlePrev,
  handleNext,
  isNextButtonActive,
  isPrevButtonActive = true,
  step = '1',
}: BottomButtonProps) {
  const { t } = useTranslation(['spec'])

  return (
    <div className="border-gray2 fixed bottom-0 left-0 flex w-full items-center justify-center gap-x-3 border-t bg-white px-5 py-5">
      <div className="flex w-full max-w-[1280px] justify-between">
        {handlePrev ? (
          <Button
            state={isPrevButtonActive ? 'default' : 'disable'}
            disabled={!isPrevButtonActive}
            onClick={handlePrev}
            customClassName={'w-[180px]'}
            variant={'outline'}
          >
            {t('buttons.prev')}
          </Button>
        ) : (
          <div className="w-[180px]" />
        )}
        {handleNext ? (
          <Button
            state={isNextButtonActive ? 'default' : 'disable'}
            disabled={!isNextButtonActive}
            onClick={handleNext}
            customClassName={'w-[180px]'}
            variant={'primary'}
          >
            {step === '6' ? t('buttons.submit') : t('buttons.next')}
          </Button>
        ) : (
          <div className="w-[180px]" />
        )}
      </div>
    </div>
  )
}
