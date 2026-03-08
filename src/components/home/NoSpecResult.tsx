'use client'

import { useTranslation } from 'react-i18next'

export default function NoSpecResult() {
  const { t } = useTranslation(['spec'])
  return (
    <div className="flex flex-col gap-y-3 py-[90px]">
      <p className="kr-title-md text-center whitespace-pre-wrap">{t('spec:home.no_spec_result.title')}</p>
      <p className="kr-body-md text-gray5 text-center whitespace-pre-wrap">
        {t('spec:home.no_spec_result.description')}
      </p>
    </div>
  )
}
