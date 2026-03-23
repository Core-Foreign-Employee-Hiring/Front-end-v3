'use client'

import Button from '@/components/common/Button'
import { useTranslation } from 'react-i18next'

export default function PrepareService() {
  const { t } = useTranslation('program')
  return (
    <main className="flex min-h-[calc(80vh-60px)] flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 text-4xl">🚧</div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{t('prepare.title')}</h1>

        <p className="mt-4 text-base leading-7 whitespace-pre text-gray-600">{t('prepare.description')}</p>

        <div className="mt-10">
          <Button size={'md'} customClassName={'w-fit'} onClick={() => window.history.back()}>
            {t('prepare.button.back')}
          </Button>
        </div>
      </div>
    </main>
  )
}
