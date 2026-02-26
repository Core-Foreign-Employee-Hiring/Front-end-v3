'use client'

import { Label, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'
import { useEffect, useState } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useTranslation } from 'react-i18next'

export default function PasswordField() {
  const { t } = useTranslation('signup')
  const { registerData, updateRegister, setNotValidPWErrorMessage, notValidPWErrorMessage } = useRegisterStore(
    (state) => state
  )
  const [show, setShow] = useState(false)

  // 사용자가 입력 필드에 들어갔다 나왔는지 확인하는 상태
  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    const password = registerData.password

    // 사용자가 아직 필드를 건드리지 않았거나 값이 없으면 에러 메시지를 비움
    if (!isTouched || !password || password.length === 0) {
      setNotValidPWErrorMessage('')
      return
    }

    // 정규식 검사
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,15}$/

    if (!passwordRegex.test(password)) {
      setNotValidPWErrorMessage(t('step1.passwordField.messages.invalidFormat'))
    } else {
      setNotValidPWErrorMessage('')
    }
    // isTouched를 의존성에 추가하여 포커스를 잃은 시점에도 체크되게 함
  }, [registerData.password, isTouched, setNotValidPWErrorMessage, t])

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step1.passwordField.label')} isRequired={true} type={'titleSm'} />
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
        placeholder={t('step1.passwordField.placeholder')}
        onChange={(e) => updateRegister('password', e.target.value)}
        // 포커스를 잃었을 때 비로소 에러를 검증할 준비가 되었음을 알림
        onBlur={() => setIsTouched(true)}
        value={registerData.password ?? ''}
        // 사용자가 건드렸고(isTouched) 에러 메시지가 있을 때만 에러 스타일 적용
        status={isTouched && notValidPWErrorMessage ? 'error' : 'default'}
      />
      {/* 에러 메시지 노출 조건도 동일하게 설정 */}
      {isTouched && notValidPWErrorMessage && <ErrorMessage>{notValidPWErrorMessage}</ErrorMessage>}
    </div>
  )
}
