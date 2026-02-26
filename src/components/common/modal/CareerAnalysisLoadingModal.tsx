'use client'

import { useEffect, useMemo, useState } from 'react'
import { Label, Modal } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { CareerAnalysisLoadingGraphic } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'

export default function CareerAnalysisLoadingModal() {
  const { t } = useTranslation('modal')
  const { modals } = useModalStore((state) => state)
  const isOpen = modals.isCareerAnalysisLoadingModalOpen

  return (
    <Modal isOpen={isOpen}>
      {/* isOpen을 key로 주어 모달이 열릴 때마다 내부 상태를 초기화합니다 */}
      {isOpen && <LoadingContent t={t} />}
    </Modal>
  )
}

function LoadingContent({ t }: { t: TFunction }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // t('...steps')가 객체일 경우 배열로 변환
  const steps = useMemo(() => {
    const stepsObj = t('career_analysis_loading.steps', { returnObjects: true })
    return Object.values(stepsObj) as string[]
  }, [t])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % steps.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <Modal.Body>
      <div className="flex flex-col items-center justify-center gap-y-[32px] py-[40px]">
        <div className="flex flex-col items-center gap-y-3 text-center">
          <Label label={t('career_analysis_loading.title')} type="titleMd" />

          <div className="h-[24px]">
            <p
              key={currentStepIndex}
              className="kr-body-md animate-in fade-in slide-in-from-bottom-1 text-gray-600 duration-500"
            >
              {steps[currentStepIndex]}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <CareerAnalysisLoadingGraphic width={245} height={193} />
        </div>

        <p className="kr-body-sm animate-pulse text-gray-400">{t('career_analysis_loading.sub_messages.0')}</p>
      </div>
    </Modal.Body>
  )
}
