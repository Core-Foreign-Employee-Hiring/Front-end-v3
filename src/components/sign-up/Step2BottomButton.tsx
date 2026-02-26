'use client'

import { useRouter } from 'next/navigation'
import { useRegisterStore } from '@/store/registerStore'
import { Button } from '@/components/common'
import { postRegister } from '@/lib/client/register'
import { RegisterType } from '@/types/auth/register'
import { useState } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface Step2BottomButtonProps {
  lang: string
}

export default function Step2BottomButton({ lang }: Step2BottomButtonProps) {
  const { t } = useTranslation(['signup', 'message'])
  const { success, error } = useToast()
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
        success(t('message:post_register.success.title'), t('message:post_register.success.description'))
        router.push(`/${lang}`)
      } else {
        error(t('message:post_register.error.title'), t('message:post_register.error.description'))
        setErrorMessage(result.error)
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Button state={isValid ? 'default' : 'disable'} onClick={handleRegister}>
        {t('signup:step2.buttons.sign_up')}
      </Button>
    </div>
  )
}
