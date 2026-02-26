'use client'

import { Button } from '@/components/common'
import { Dispatch, SetStateAction } from 'react'
import { useModalStore } from '@/store/modalStore'
import { useResumeStore } from '@/store/resumeStore'
import { postResume } from '@/lib/client/resume'
import { useTranslation } from 'react-i18next'

interface MobileBottomButtonProps {
  currentStep: '1' | '2'
  setCurrentStep: Dispatch<SetStateAction<'1' | '2'>>
  setCurrentLabel: Dispatch<SetStateAction<'이력서 내용 입력' | '템플릿 선택' | string>>
}

export default function MobileBottomButton({ currentStep, setCurrentStep, setCurrentLabel }: MobileBottomButtonProps) {
  const { modals, toggleModal } = useModalStore((state) => state)

  const { resumeProfileFile, createResume, setCreateResumeResponse } = useResumeStore((state) => state)

  const onClose = () => {
    toggleModal('isCreateResumeModalOpen')
  }

  const { t } = useTranslation('modal')

  return (
    <div className="fixed bottom-0 left-0 flex w-full gap-x-4 bg-white px-5 py-3">
      {currentStep === '1' ? (
        <Button
          state={resumeProfileFile && createResume.resumeName ? 'default' : 'disable'}
          disabled={!(resumeProfileFile && createResume.resumeName)}
          onClick={() => {
            setCurrentStep('2')
            setCurrentLabel(t('create_resume.body.steps.step_2'))
          }}
        >
          {t('footer_buttons.next')}
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              setCurrentStep('1')
              setCurrentLabel(t('create_resume.body.steps.step_1'))
            }}
            variant={'outline'}
          >
            {t('footer_buttons.prev')}
          </Button>
          <Button
            state={resumeProfileFile && createResume.resumeName ? 'default' : 'disable'}
            disabled={!(resumeProfileFile && createResume.resumeName)}
            onClick={async () => {
              const result = await postResume(createResume, resumeProfileFile)
              if (result) {
                onClose()
                toggleModal('isInfoPickerModalOpen')
                setCreateResumeResponse(result)
              }
            }}
          >
            {t('create_resume.footer.completed')}
          </Button>
        </>
      )}
    </div>
  )
}
