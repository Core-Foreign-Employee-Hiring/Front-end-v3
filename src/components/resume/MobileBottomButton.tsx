'use client'

import { Button } from '@/components/common'
import { Dispatch, SetStateAction } from 'react'
import { useModalStore } from '@/store/modalStore'
import { useResumeStore } from '@/store/resumeStore'
import { postResume } from '@/lib/client/resume'

interface MobileBottomButtonProps {
  currentStep: '1' | '2'
  setCurrentStep: Dispatch<SetStateAction<'1' | '2'>>
  setCurrentLabel: Dispatch<SetStateAction<'이력서 내용 입력' | '템플릿 선택'>>
}

export default function MobileBottomButton({ currentStep, setCurrentStep, setCurrentLabel }: MobileBottomButtonProps) {
  const { modals, toggleModal } = useModalStore((state) => state)

  const { resumeProfileFile, createResume, setCreateResumeResponse } = useResumeStore((state) => state)

  const onClose = () => {
    toggleModal('isCreateResumeModalOpen')
  }

  return (
    <div className="fixed bottom-0 left-0 flex w-full gap-x-4 bg-white px-5 py-3">
      {currentStep === '1' ? (
        <Button
          state={resumeProfileFile && createResume.resumeName ? 'default' : 'disable'}
          disabled={!(resumeProfileFile && createResume.resumeName)}
          onClick={() => {
            setCurrentStep('2')
            setCurrentLabel('템플릿 선택')
          }}
        >
          다음
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              setCurrentStep('1')
              setCurrentLabel('이력서 내용 입력')
            }}
            variant={'outline'}
          >
            이전
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
            완료하기
          </Button>
        </>
      )}
    </div>
  )
}
