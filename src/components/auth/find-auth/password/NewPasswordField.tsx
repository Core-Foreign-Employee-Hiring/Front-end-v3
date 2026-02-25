'use client'

import { Label, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { useEffect, useState } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

export default function NewPasswordField() {
  const { t } = useTranslation('findAuth')
  const [show, setShow] = useState(false)

  const {
    checkPassword,
    setCheckPassword,
    modifyPWData,
    setIsPasswordMatch,
    isPasswordMatch,
    notMatchPWErrorMessage,
    setNotMatchPWErrorMessage,
    errorMessage,
  } = useFindAuthStore((state) => state)

  //비밀번호 확인 문구
  useEffect(() => {
    if (modifyPWData.newPassword === undefined) {
      setIsPasswordMatch(undefined)
      return
    }
    if (checkPassword === modifyPWData.newPassword) {
      setIsPasswordMatch(true)
    } else {
      setIsPasswordMatch(false)
      setNotMatchPWErrorMessage(t('pw.result.new_password_field.error_message'))
    }
  }, [checkPassword])

  const showError = isPasswordMatch === false

  return (
    <div className="flex flex-col gap-y-2">
      <Label type={'titleSm'} label={t('pw.result.new_password_field.label')} />
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
        inputType={show ? 'text' : 'password'}
        placeholder={t('pw.result.new_password_field.placeholder')}
        onChange={(e) => {
          setCheckPassword(e.target.value)
        }}
        value={checkPassword}
        status={'default'}
      />
      {showError && <ErrorMessage>{notMatchPWErrorMessage}</ErrorMessage>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  )
}
