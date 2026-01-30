'use client'

import { Button } from '@/components/common'
import { usePathname, useRouter } from 'next/navigation'

interface PwBottomButtonProps {
  step: '1' | '2'
}
export default function PwBottomButton({ step }: PwBottomButtonProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleStepClick = (step: '1' | '2', tyoe: 'id' | 'pw') => {
    router.push(`${pathname}?type=${encodeURIComponent(tyoe)}&step=${encodeURIComponent(step)}`)
  }

  const onNavigate = () => {
    router.push('/login')
  }

  return (
    <div className="desktop:relative desktop:bottom-auto desktop:left-auto desktop:w-auto desktop:px-0 desktop:py-0 fixed bottom-0 left-0 w-full bg-white px-8 py-3">
      {step === '1' ? (
        <Button
          onClick={() => {
            handleStepClick('2', 'pw')
          }}
          size={'lg'}
          variant={'primary'}
        >
          다음
        </Button>
      ) : (
        <Button onClick={onNavigate} size={'lg'} variant={'primary'}>
          로그인
        </Button>
      )}
    </div>
  )
}
