'use client'

import { formatDate } from '@/utils/common'
import IdBottomButton from '@/components/auth/find-auth/id/IdBottomButton'
import { useFindAuthStore } from '@/store/findAuthStore'
import { useTranslation } from 'react-i18next'

interface IdResultProps {
  step: '1' | '2'
}

export default function IdResult({ step }: IdResultProps) {
  const { t } = useTranslation('findAuth')
  const { findIdVerifyCodeResponseData } = useFindAuthStore((state) => state)
  return (
    <div className="flex flex-col gap-y-[24px]">
      <div className="border-gray2 flex flex-col gap-y-3 rounded-[12px] border bg-white px-3 py-4">
        <p className="kr-button text-gray5">{t('id.result.label')}</p>
        <div className="flex items-center justify-between">
          <p className="kr-body-md">{findIdVerifyCodeResponseData.userId}</p>
          <p className="kr-small text-gray4">
            {t('id.result.created_at', { date: formatDate(findIdVerifyCodeResponseData.createdAt) })}
          </p>
        </div>
      </div>
      <IdBottomButton step={step} />
    </div>
  )
}
