'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { getVerifyUserId } from '@/lib/client/register'
import ErrorMessage from '@/components/common/ErrorMessage'
import SuccessMessage from '@/components/common/SuccessMessage'

export default function IdField() {
  const {
    registerData,
    updateRegister,
    verifyIdErrorMessage,
    verifyIdLoading,
    setVerifyIdLoading,
    setVerifyIdSuccessMessage,
    setVerifyIdErrorMessage,
    verifySuccessMessage,
  } = useRegisterStore((state) => state)
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'아이디'} isRequired={true} type={'titleSm'} />
      <div className="flex items-center gap-x-2">
        <TextInput
          value={registerData.userId ?? ''}
          onChange={(e) => {
            updateRegister('userId', e.target.value)
            setVerifyIdLoading(false)
            setVerifyIdSuccessMessage('')
            setVerifyIdErrorMessage('')
          }}
          placeholder={'아이디를 입력해주세요.'}
        />
        <Button
          onClick={async () => {
            const result = await getVerifyUserId(registerData.userId)
            setVerifyIdLoading(true)
            console.log('result', result)
            if (result.success) {
              setVerifyIdSuccessMessage('사용 가능한 아이디 입니다.')
              setVerifyIdLoading(false)
            } else {
              setVerifyIdErrorMessage(result.error)
              setVerifyIdLoading(false)
            }
          }}
          customClassName={'w-[130px]'}
          size={'lg'}
          variant={'primary'}
          leftIcon={verifyIdLoading ? <Loading size={'sm'} /> : null}
        >
          중복확인
        </Button>
      </div>
      {verifySuccessMessage && <SuccessMessage>{verifySuccessMessage}</SuccessMessage>}
      {verifyIdErrorMessage && <ErrorMessage>{verifyIdErrorMessage}</ErrorMessage>}
    </div>
  )
}
