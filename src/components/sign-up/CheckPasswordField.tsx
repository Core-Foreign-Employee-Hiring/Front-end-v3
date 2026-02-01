'use client'

import { Label, TextInput } from '@/components/common'
import { useEffect, useState } from 'react'
import { useRegisterStore } from '@/store/registerStore'
import ErrorMessage from '@/components/common/ErrorMessage'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'

export default function CheckPasswordField() {
  const [show, setShow] = useState(false)
  const { registerData, checkPassword, setCheckPassword, setNotMatchedPWErrorMessage, notMatchedPWErrorMessage } =
    useRegisterStore((state) => state)

  useEffect(() => {
    if (checkPassword !== registerData.password) {
      setNotMatchedPWErrorMessage('비밀번호가 일치하지 않습니다.')
    } else {
      setNotMatchedPWErrorMessage('')
    }
  }, [checkPassword])

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'비밀번호 중복확인'} isRequired={true} type={'titleSm'} />
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
        placeholder={'대소문자, 숫자, 기호 포함 8~15자'}
      />
      {notMatchedPWErrorMessage && <ErrorMessage>{notMatchedPWErrorMessage}</ErrorMessage>}
    </div>
  )
}
