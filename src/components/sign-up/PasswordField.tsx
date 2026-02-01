'use client'

import { Label, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'
import { useEffect, useState } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'

export default function PasswordField() {
  const { registerData, updateRegister, setNotValidPWErrorMessage, notValidPWErrorMessage } = useRegisterStore(
    (state) => state
  )
  const [show, setShow] = useState(false)

  useEffect(() => {
    const password = registerData.password

    // 1. 값이 없을 때 처리
    if (!password || password.length === 0) {
      setNotValidPWErrorMessage('')
      return
    }

    // 2. 정규식 검사 (~ 포함)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,15}$/

    if (!passwordRegex.test(password)) {
      // 검증 실패
      setNotValidPWErrorMessage('비밀번호는 대소문자, 숫자, 기호(~ 포함) 8~15자를 만족해야 합니다.')
    } else {
      setNotValidPWErrorMessage('')
    }
  }, [registerData.password, setNotValidPWErrorMessage])

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'비밀번호'} isRequired={true} type={'titleSm'} />
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
        placeholder={'대소문자, 숫자, 기호 포함 8~15자'}
        onChange={(e) => updateRegister('password', e.target.value)}
        value={registerData.password ?? ''}
        status={notValidPWErrorMessage ? 'error' : 'default'}
      />
      {notValidPWErrorMessage && <ErrorMessage>{notValidPWErrorMessage}</ErrorMessage>}
    </div>
  )
}
