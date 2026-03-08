'use client'

import { useTranslation } from 'react-i18next'

export default function ListHeader() {
  const { t } = useTranslation(['spec'])
  return (
    <div className="bg-gray1 flex h-[52px] items-center justify-between rounded-t-[20px] px-5 py-2">
      <div className="kr-body-sm text-gray5 flex w-[168px] shrink-0 items-center justify-center">
        {t('spec:home.spec_diagnostic_history_list.header.spec_name')}
      </div>
      <div className="kr-body-sm text-gray5 flex w-[84px] shrink-0 items-center justify-center">
        {t('spec:home.spec_diagnostic_history_list.header.evaluated_date')}
      </div>
      <div className="kr-body-sm text-gray5 flex w-[56px] shrink-0 items-center justify-center">
        {t('spec:home.spec_diagnostic_history_list.header.score')}
      </div>
      <div className="kr-body-sm text-gray5 flex w-[360px] shrink-0 items-center justify-center">
        {t('spec:home.spec_diagnostic_history_list.header.summary')}
      </div>
      <div className="w-[100px]" />
    </div>
  )
}
