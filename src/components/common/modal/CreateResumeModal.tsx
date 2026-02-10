'use client'

import { Button, Label, Modal, Spacing } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { ProgressBar } from '@/components/spec'
import { useState } from 'react'
import Info from '@/components/resume/Info'
import Template from '@/components/resume/Template'
import { useResumeStore } from '@/store/resumeStore'
import { postResume } from '@/lib/client/resume'

export default function CreateResumeModal() {
  const { isCreateResumeModalOpen, setIsCreateResumeModalOpen, isInfoPickerModalOpen, setIsInfoPickerModalOpen } =
    useModalStore((state) => state)
  const { createResume, resumeProfileFile, selectedType, setCreateResumeResponse } = useResumeStore((state) => state)

  const [currentStep, setCurrentStep] = useState<'1' | '2'>('1')

  const onClose = () => {
    setIsCreateResumeModalOpen(isCreateResumeModalOpen)
  }
  const steps = [
    { stepLabel: '이력서 내용 입력', stepNumber: '1' },
    { stepLabel: '템플릿 선택', stepNumber: '2' },
  ]
  return (
    <Modal
      customClassName={'desktop:w-[860px] tablet:w-[680px] w-[335px]'}
      isOpen={isCreateResumeModalOpen}
      onClose={onClose}
    >
      <Modal.Header>
        <Label type={'titleMd'} label={'새 이력서'} />
      </Modal.Header>
      <Modal.Body>
        <div>
          <ProgressBar currentStep={currentStep} steps={steps} currentLabel={'1'}></ProgressBar>
          <Spacing height={20} />
          {currentStep === '1' ? <Info /> : <Template />}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button
            onClick={() => {
              setIsCreateResumeModalOpen(isCreateResumeModalOpen)
            }}
            variant={'outline'}
            size={'lg'}
            customClassName={'w-[200px]'}
          >
            닫기
          </Button>
          <Button
            onClick={async () => {
              if (currentStep === '2') {
                const result = await postResume(createResume, resumeProfileFile)
                if (result) {
                  onClose()
                  setIsInfoPickerModalOpen(isInfoPickerModalOpen)
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
            {currentStep === '1' ? '다음' : '작성완료'}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
