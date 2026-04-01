'use client'

import { useTranslation } from 'react-i18next'

interface OrderInfoProps {
  name: string
  phoneNumber: string
  email: string
}
export default function OrderInfo({ name, phoneNumber, email }: OrderInfoProps) {
  const { t } = useTranslation('payment')

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="kr-subtitle-lg">{t('payment:content.orderInfo.title')}</h2>

      <section className="flex items-center justify-between">
        <div className="kr-subtitle-md text-gray5">{t('payment:content.orderInfo.name')}</div>
        <div className="kr-title-sm">{name}</div>
      </section>

      <section className="flex items-center justify-between">
        <div className="kr-subtitle-md text-gray5">{t('payment:content.orderInfo.phoneNumber')}</div>
        <div className="kr-title-sm">{phoneNumber}</div>
      </section>

      <section className="flex items-center justify-between">
        <div className="kr-subtitle-md text-gray5">{t('payment:content.orderInfo.email')}</div>
        <div className="kr-title-sm">{email}</div>
      </section>
    </div>
  )
}
