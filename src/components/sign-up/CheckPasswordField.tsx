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

  // 사용자가 이 필드에 접근했는지 여부를 추적하는 상태
  const [isTouched, setIsTouched] = useState(false)

  const { registerData, checkPassword, setCheckPassword, setNotMatchedPWErrorMessage, notMatchedPWErrorMessage } =
    useRegisterStore((state) => state)

  // 비밀번호 일치 여부 확인 로직
  useEffect(() => {
    // 사용자가 한 번이라도 건드렸을(isTouched) 때만 에러 메시지 업데이트
    if (isTouched) {
      if (checkPassword !== registerData.password) {
        setNotMatchedPWErrorMessage(t('step1.checkPasswordField.messages.mismatch'))
      } else {
        setNotMatchedPWErrorMessage('')
      }
    }
  }, [checkPassword, registerData.password, isTouched, setNotMatchedPWErrorMessage, t])

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step1.checkPasswordField.label')} isRequired={true} type={'titleSm'} />
      <TextInput
        rightElement={
          show ? (
            <NonEyeIcon onClick={() => setShow(false)} width={24} height={24} />
          ) : (
            <EyeIcon onClick={() => setShow(true)} width={24} height={24} />
          )
        }
        inputType={show ? 'text' : 'password'}
        // 에러 상태도 사용자가 건드렸을 때만 활성화
        status={isTouched && notMatchedPWErrorMessage ? 'error' : 'default'}
        value={checkPassword}
        onChange={(e) => {
          setCheckPassword(e.target.value)
        }}
        // 다른 곳을 클릭하거나 포커스를 잃었을 때 실행
        onBlur={() => {
          setIsTouched(true)
        }}
        placeholder={t('step1.passwordField.placeholder')}
      />
      {/* 에러 메시지 역시 사용자가 건드린 이후에만 노출 */}
      {isTouched && notMatchedPWErrorMessage && <ErrorMessage>{notMatchedPWErrorMessage}</ErrorMessage>}
    </div>
  )
}
