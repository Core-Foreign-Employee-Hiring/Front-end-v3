'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useFindAuthStore } from '@/store/findAuthStore'
import { postFindId } from '@/lib/client/find-auth'
import { ChangeEvent } from 'react'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useTranslation } from 'react-i18next'

export default function PhoneNumberField() {
  const { t } = useTranslation('findAuth')
  const {
    findIdData,
    updateFindIdData,
    isSendPhoneNumberCodeLoading,
    setIsSendPhoneNumberCodeLoading,
    setErrorMessage,
    errorMessage,
    isIDVerifyCodeFieldOpen,
    setIsIDVerifyCodeFieldOpen,
    idVerifyCode,
    setIDVerifyCode,
  } = useFindAuthStore((state) => state)

  /**
   * 휴대폰 번호 변경 event handler
   */
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = e.target.value

    // 2. 스토어에 저장할 때는 숫자만 추출 ("010-1234-5678" -> "01012345678")
    const onlyNumbers = rawValue.replace(/[^\d]/g, '').slice(0, 11)

    updateFindIdData('phoneNumber', onlyNumbers)
    setIDVerifyCode('')
    setIsIDVerifyCodeFieldOpen(false)
    setErrorMessage(undefined)
  }

  const verifyCodeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIDVerifyCode(e.target.value)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('id.process.phone_number.title')} />
      <div className="flex items-center gap-x-2">
        <TextInput
          status={errorMessage ? 'error' : 'default'}
          value={findIdData.phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={t('id.process.phone_number.placeholder')}
        />
        <Button
          state={findIdData.phoneNumber.length !== 11 ? 'disable' : 'default'}
          leftIcon={isSendPhoneNumberCodeLoading ? <Loading size={'sm'} /> : null}
          onClick={async () => {
            setIsSendPhoneNumberCodeLoading(true)
            setErrorMessage(undefined)
            const result = await postFindId(findIdData)
            console.log('result', result)
            if (result.success) {
              setIsIDVerifyCodeFieldOpen(true)
              setIsSendPhoneNumberCodeLoading(false)
            } else {
              setIsSendPhoneNumberCodeLoading(false)
              setErrorMessage(result.error)
            }
          }}
          size={'sm'}
          variant={'primary'}
          customClassName={`${isSendPhoneNumberCodeLoading ? 'w-[150px]' : 'w-[150px]'} h-[52px]`}
        >
          {t('id.process.phone_number.buttons.sendPhoneNumberCode')}
        </Button>
      </div>

      {isIDVerifyCodeFieldOpen ? (
        <TextInput
          status={errorMessage ? 'error' : 'default'}
          value={idVerifyCode}
          onChange={verifyCodeChange}
          placeholder={t('id.process.phone_number.buttons.sendIDVerifyCode')}
        />
      ) : null}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  )
}
