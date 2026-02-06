'use client'

import { Button } from '@/components/common'
import { CreateJobPostStepType } from '@/app/[lang]/create-job-post/page'
import { useRouter } from 'next/navigation'

interface BottomButtonsProps {
  currentStep: CreateJobPostStepType
  lang: string
}

export default function BottomButtons({ currentStep, lang }: BottomButtonsProps) {
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-[40px] py-[20px]">
      {currentStep !== '1' && (
        <Button
          onClick={() => {
            if (currentStep === '2') {
              router.push(`/${lang}/create-job-post?step=1`)
            } else if (currentStep === '3') {
              router.push(`/${lang}/create-job-post?step=2`)
            }
          }}
          variant={'outline'}
          customClassName={'w-[377px]'}
        >
          이전
        </Button>
      )}

      <div className={`${currentStep === '1' ? 'w-full justify-between' : ''} flex gap-x-3`}>
        <Button variant={'secondary'} customClassName={'w-[377px]'}>
          임시저장
        </Button>
        <Button
          onClick={() => {
            if (currentStep === '1') {
              router.push(`/${lang}/create-job-post?step=2`)
            } else if (currentStep === '2') {
              router.push(`/${lang}/create-job-post?step=3`)
            }
          }}
          variant={'primary'}
          customClassName={'w-[377px]'}
        >
          {currentStep === '3' ? '저장' : '다음'}
        </Button>
      </div>
    </div>
  )
}
