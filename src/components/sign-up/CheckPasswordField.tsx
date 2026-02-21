'use client'

import { Label, TextInput } from '@/components/common'
import { useEffect, useState } from 'react'
import { useRegisterStore } from '@/store/registerStore'
import ErrorMessage from '@/components/common/ErrorMessage'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

export default function CheckPasswordField() {
  const { t } = useTranslation('signup')
  const [show, setShow] = useState(false)
  const { registerData, checkPassword, setCheckPassword, setNotMatchedPWErrorMessage, notMatchedPWErrorMessage } =
    useRegisterStore((state) => state)

  useEffect(() => {
    if (checkPassword !== registerData.password) {
      setNotMatchedPWErrorMessage(t('step1.checkPasswordField.messages.mismatch'))
    } else {
      setNotMatchedPWErrorMessage('')
    }
  }, [checkPassword])

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step1.checkPasswordField.label')} isRequired={true} type={'titleSm'} />
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
        status={notMatchedPWErrorMessage ? 'error' : 'default'}
        value={checkPassword}
        onChange={(e) => {
          setCheckPassword(e.target.value)
        }}
        placeholder={t('step1.passwordField.placeholder')}
      />
      {notMatchedPWErrorMessage && <ErrorMessage>{notMatchedPWErrorMessage}</ErrorMessage>}
    </div>
  )
}
