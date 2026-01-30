'use client'

import { Label, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { useEffect, useState } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'

export default function NewPasswordField() {
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
      setNotMatchPWErrorMessage('비밀번호가 일치하지 않습니다.')
    }
  }, [checkPassword])

  const showError = isPasswordMatch === false

  return (
    <div className="flex flex-col gap-y-2">
      <Label type={'titleSm'} label={'새로운 비밀번호 확인'} />
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
