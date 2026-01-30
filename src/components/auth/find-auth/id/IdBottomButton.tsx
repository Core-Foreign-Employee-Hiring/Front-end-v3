'use client'

import { Button } from '@/components/common'
import { usePathname, useRouter } from 'next/navigation'
import { postFindIdVerifyCode } from '@/lib/client/find-auth'
import { useFindAuthStore } from '@/store/findAuthStore'

interface IdBottomButtonProps {
  step: '1' | '2'
  verifyCode?: string
}
export default function IdBottomButton({ step, verifyCode }: IdBottomButtonProps) {
  const router = useRouter()
  const pathname = usePathname()

  const { setIsLoading, setFindVerifyCodeResponseData } = useFindAuthStore((state) => state)
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
          state={verifyCode?.length !== 6 ? 'disable' : 'default'}
          onClick={async () => {
            setIsLoading(true)
            const result = await postFindIdVerifyCode(verifyCode)
            if (result.success && result.data) {
              setIsLoading(false)
              handleStepClick('2', 'id')
              setFindVerifyCodeResponseData(result.data)
            }
          }}
          size={'lg'}
          variant={'primary'}
        >
          아이디 검색
        </Button>
      ) : (
        <div className="flex gap-x-3">
          <Button
            onClick={() => {
              handleStepClick('1', 'pw')
            }}
            size={'lg'}
            variant={'outline'}
          >
            비밀번호 찾기
          </Button>
          <Button onClick={onNavigate} size={'lg'} variant={'primary'}>
            로그인
          </Button>
        </div>
      )}
    </div>
  )
}
