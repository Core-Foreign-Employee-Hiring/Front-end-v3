'use client'

import { useRouter } from 'next/navigation'
import { useRegisterStore } from '@/store/registerStore'
import { Button } from '@/components/common'
import { postRegister } from '@/lib/client/register'
import { RegisterType } from '@/types/auth/register'
import { useState } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'

interface Step2BottomButtonProps {
  lang: string
}

export default function Step2BottomButton({ lang }: Step2BottomButtonProps) {
  const router = useRouter()

  const { registerData, isStep2FormValid } = useRegisterStore()

  const isValid = isStep2FormValid()

  const [errorMessage, setErrorMessage] = useState<string | undefined>('')

  const handleRegister = async () => {
    if (!isValid) return
    console.log('registerData', registerData)

    // 전송할 데이터 가공: 빈 값은 null로 명시적 변환
    const finalPayload = {
      ...registerData,
      birthDate: registerData.birthDate || null,
      gender: registerData.gender || null,
      // jobRoles는 이미 위에서 검증했으므로 보장됨
    }

    try {
      console.log('서버로 보낼 데이터:', finalPayload)
      const result = await postRegister(finalPayload as RegisterType)
      if (result.success) {
        router.push(`/${lang}/home`)
      } else {
        setErrorMessage(result.error)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Button state={isValid ? 'default' : 'disable'} onClick={handleRegister}>
        회원가입
      </Button>
    </div>
  )
}
