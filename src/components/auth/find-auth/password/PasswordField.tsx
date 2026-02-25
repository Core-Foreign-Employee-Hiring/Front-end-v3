'use client'

import { Label, TextInput } from '@/components/common'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useFindAuthStore } from '@/store/findAuthStore'
import { useEffect, useState } from 'react'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

export default function PasswordField() {
  const { t } = useTranslation('findAuth')
  const [show, setShow] = useState(false)

  const {
    modifyPWData,
    updateModifyPWData,
    isPasswordValid,
    setIsPasswordValid,
    setNotValidPWErrorMessage,
    notValidPWErrorMessage,
  } = useFindAuthStore((state) => state)

  useEffect(() => {
    const password = modifyPWData.newPassword

    // 1. 값이 없을 때 처리
    if (!password || password.length === 0) {
      setIsPasswordValid(undefined)
      setNotValidPWErrorMessage('')
      return
    }

    // 2. 정규식 검사 (~ 포함)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,15}$/

    if (!passwordRegex.test(password)) {
      // 검증 실패
      setIsPasswordValid(false)
      setNotValidPWErrorMessage(t('pw.result.password_field.error_message'))
    } else {
      // 검증 성공
      setIsPasswordValid(true)
      setNotValidPWErrorMessage('')
    }
  }, [modifyPWData.newPassword, setIsPasswordValid, setNotValidPWErrorMessage])

  // 명확하게 false일 때만 에러 표시
  const showError = isPasswordValid === false

  return (
    <div className="flex flex-col gap-y-2">
      <Label type={'titleSm'} label={t('pw.result.password_field.label')} />
      <TextInput
        rightElement={
          show ? (
            <NonEyeIcon
              onClick={() => {
                setShow(false)
              }}
              width={24}
              height={24}
            />
          ) : (
            <EyeIcon
              onClick={() => {
                setShow(true)
              }}
              width={24}
              height={24}
            />
          )
        }
        inputType={'password'}
        placeholder={t('pw.result.password_field.placeholder')}
        onChange={(e) => updateModifyPWData('newPassword', e.target.value)}
        value={modifyPWData.newPassword}
        status={showError ? 'error' : 'default'}
      />
      {showError && notValidPWErrorMessage && <ErrorMessage>{notValidPWErrorMessage}</ErrorMessage>}
    </div>
  )
}
