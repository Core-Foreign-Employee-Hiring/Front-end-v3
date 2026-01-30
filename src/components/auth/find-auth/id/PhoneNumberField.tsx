'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { postFindId } from '@/lib/client/find-auth'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface PhoneNumberFieldProps {
  verifyCode: string
  setVerifyCode: Dispatch<SetStateAction<string>>
}

export default function PhoneNumberField({ verifyCode, setVerifyCode }: PhoneNumberFieldProps) {
  const { findIdData, updateFindIdData, isLoading, setIsLoading } = useFindAuthStore((state) => state)
  const [isVerifyCodeFieldOpen, setIsVerifyCodeFieldOpen] = useState(false)

  /**
   * 휴대폰 번호 변경 event handler
   */
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = e.target.value

    // 2. 스토어에 저장할 때는 숫자만 추출 ("010-1234-5678" -> "01012345678")
    const onlyNumbers = rawValue.replace(/[^\d]/g, '').slice(0, 11)

    updateFindIdData('phoneNumber', onlyNumbers)
    setVerifyCode('')
    setIsVerifyCodeFieldOpen(false)
  }

  const verifyCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVerifyCode(e.target.value)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'연락처'} />
      <div className="flex items-center gap-x-2">
        <TextInput
          value={findIdData.phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={'`-`없이 번호를 입력해주세요.'}
        />
        <Button
          state={findIdData.phoneNumber.length !== 11 ? 'disable' : 'default'}
          leftIcon={isLoading ? <Loading size={'sm'} /> : null}
          onClick={async () => {
            setIsLoading(true)
            const result = await postFindId(findIdData)
            console.log('result', result)
            if (result.success) {
              setIsVerifyCodeFieldOpen(true)
              setIsLoading(false)
            }
          }}
          size={'sm'}
          variant={'primary'}
          customClassName={`${isLoading ? 'w-[150px]' : 'w-[150px]'} h-[52px]`}
        >
          인증번호 전송
        </Button>
      </div>

      {isVerifyCodeFieldOpen ? (
        <div className="flex gap-x-2">
          <TextInput value={verifyCode} onChange={verifyCodeChange} placeholder={'인증번호 입력'} />
        </div>
      ) : null}
    </div>
  )
}
