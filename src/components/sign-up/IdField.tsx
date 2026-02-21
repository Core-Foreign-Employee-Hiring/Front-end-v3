'use client'

import { Button, Label, Loading, TextInput } from '@/components/common'
import { useRegisterStore } from '@/store/registerStore'
import { getVerifyUserId } from '@/lib/client/register'
import ErrorMessage from '@/components/common/ErrorMessage'
import SuccessMessage from '@/components/common/SuccessMessage'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('signup')
  return (
    <div className="flex flex-col gap-y-2">
      <Label label={t('step1.idField.label')} isRequired={true} type={'titleSm'} />
      <div className="flex items-center gap-x-2">
        <TextInput
          value={registerData.userId ?? ''}
          onChange={(e) => {
            updateRegister('userId', e.target.value)
            setVerifyIdLoading(false)
            setVerifyIdSuccessMessage('')
            setVerifyIdErrorMessage('')
          }}
          placeholder={t('step1.idField.placeholder')}
        />
        <Button
          onClick={async () => {
            const result = await getVerifyUserId(registerData.userId)
            setVerifyIdLoading(true)
            console.log('result', result)
            if (result.success) {
              setVerifyIdSuccessMessage(t('step1.idField.messages.success'))
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
          {t('step1.idField.button.verify')}
        </Button>
      </div>
      {verifySuccessMessage && <SuccessMessage>{verifySuccessMessage}</SuccessMessage>}
      {verifyIdErrorMessage && <ErrorMessage>{verifyIdErrorMessage}</ErrorMessage>}
    </div>
  )
}
