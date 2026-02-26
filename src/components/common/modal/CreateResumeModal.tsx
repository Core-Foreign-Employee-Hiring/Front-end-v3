'use client'

import { Button, Label, Modal, Spacing } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { ProgressBar } from '@/components/spec'
import { useState } from 'react'
import Info from '@/components/resume/Info'
import Template from '@/components/resume/Template'
import { useResumeStore } from '@/store/resumeStore'
import { postResume } from '@/lib/client/resume'
import { useTranslation } from 'react-i18next'

export default function CreateResumeModal() {
  const { t } = useTranslation('modal')
  const { modals, toggleModal } = useModalStore((state) => state)
  const { createResume, resumeProfileFile, selectedType, setCreateResumeResponse } = useResumeStore((state) => state)

  const [currentStep, setCurrentStep] = useState<'1' | '2'>('1')

  const onClose = () => {
    toggleModal('isCreateResumeModalOpen')
  }
  const steps = [
    { stepLabel: t('create_resume.body.steps.step_1'), stepNumber: '1' },
    { stepLabel: t('create_resume.body.steps.step_2'), stepNumber: '2' },
  ]

  return (
    <Modal
      customClassName={'desktop:w-[860px] tablet:w-[680px] w-[335px]'}
      isOpen={modals.isCreateResumeModalOpen}
      onClose={onClose}
    >
      <Modal.Header>
        <Label type={'titleMd'} label={t('create_resume.header.title')} />
      </Modal.Header>
      <Modal.Body>
        <div>
          <ProgressBar currentStep={currentStep} steps={steps} currentLabel={'1'} />
          <Spacing height={20} />
          {currentStep === '1' ? <Info /> : <Template />}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button
            onClick={() => {
              toggleModal('isCreateResumeModalOpen')
            }}
            variant={'outline'}
            size={'lg'}
            customClassName={'w-[200px]'}
          >
            {t('footer_buttons.close')}
          </Button>
          <Button
            onClick={async () => {
              if (currentStep === '2') {
                const result = await postResume(createResume, resumeProfileFile)
                if (result) {
                  onClose()
                  toggleModal('isInfoPickerModalOpen')
                  setCreateResumeResponse(result)
                }
              } else {
                setCurrentStep('2')
              }
            }}
            variant={'primary'}
            state={resumeProfileFile && createResume.resumeName ? 'default' : 'disable'}
            disabled={!(resumeProfileFile && createResume.resumeName)}
            size={'lg'}
          >
            {currentStep === '1' ? t('footer_buttons.next') : t('create_resume.footer.completed')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
