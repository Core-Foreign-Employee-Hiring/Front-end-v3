'use client'

import { Button, Loading } from '@/components/common'
import { usePathname, useRouter } from 'next/navigation'
import { postFindIdVerifyCode } from '@/lib/client/find-auth'
import { useFindAuthStore } from '@/store/findAuthStore'

interface IdBottomButtonProps {
  step: '1' | '2'
}
export default function IdBottomButton({ step }: IdBottomButtonProps) {
  const router = useRouter()
  const pathname = usePathname()

  const {
    isVerifyPhoneNumberCodeLoading,
    setIsVerifyPhoneNumberCodeLoading,
    setFindVerifyCodeResponseData,
    idVerifyCode,
  } = useFindAuthStore((state) => state)
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
          leftIcon={isVerifyPhoneNumberCodeLoading ? <Loading /> : null}
          state={idVerifyCode?.length !== 6 ? 'disable' : 'default'}
          onClick={async () => {
            setIsVerifyPhoneNumberCodeLoading(true)
            const result = await postFindIdVerifyCode(idVerifyCode)
            if (result.success && result.data) {
              setIsVerifyPhoneNumberCodeLoading(false)
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
            leftIcon={isVerifyPhoneNumberCodeLoading ? <Loading /> : null}
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
