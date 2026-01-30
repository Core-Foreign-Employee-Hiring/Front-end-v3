'use client'

import { Button, Loading } from '@/components/common'
import { usePathname, useRouter } from 'next/navigation'
import { modifyPW, postFindPWVerifyCode } from '@/lib/client/find-auth'
import { useFindAuthStore } from '@/store/findAuthStore'

interface PwBottomButtonProps {
  step: '1' | '2'
}
export default function PwBottomButton({ step }: PwBottomButtonProps) {
  const router = useRouter()
  const pathname = usePathname()

  const {
    isVerifyEmailCodeLoading,
    setIsVerifyEmailCodeLoading,
    isModifyPWLoading,
    setIsModifyPWLoading,

    pwVerifyCode,
    updateModifyPWData,
    setErrorMessage,
    modifyPWData,
    isPasswordMatch,
    isPasswordValid,
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
          leftIcon={isVerifyEmailCodeLoading ? <Loading size={'sm'} /> : null}
          state={pwVerifyCode?.length !== 6 ? 'disable' : 'default'}
          onClick={async () => {
            setIsVerifyEmailCodeLoading(true)
            updateModifyPWData('code', pwVerifyCode)
            if (modifyPWData.code.length !== 0) {
              const result = await postFindPWVerifyCode(pwVerifyCode)
              if (result.success) {
                setIsVerifyEmailCodeLoading(false)
                handleStepClick('2', 'pw')
              } else {
                setIsVerifyEmailCodeLoading(false)
                setErrorMessage(result.error)
              }
            }
          }}
          size={'lg'}
          variant={'primary'}
        >
          다음
        </Button>
      ) : (
        <Button
          leftIcon={isModifyPWLoading ? <Loading size={'sm'} /> : null}
          state={isPasswordMatch && isPasswordValid ? 'default' : 'disable'}
          onClick={async () => {
            setIsModifyPWLoading(true)
            const result = await modifyPW(modifyPWData)
            if (result.success) {
              setIsModifyPWLoading(false)
              onNavigate()
            } else {
              setIsModifyPWLoading(false)
              setErrorMessage(result.error)
            }
          }}
          size={'lg'}
          variant={'primary'}
        >
          비밀번호 변경
        </Button>
      )}
    </div>
  )
}
