'use client'

import { useEffect, useState } from 'react'
import { CheckIcon, RightArrowIcon, UncheckIcon } from '@/assets/svgComponents' // ChevronRightIcon 추가 가정
import { useOrderStore } from '@/store/orderStore'
import Link from 'next/link'
import { Trans, useTranslation } from 'react-i18next'

interface PaySummaryProps {
  amount: string
}

export default function PaySummary({ amount }: PaySummaryProps) {
  const { t } = useTranslation('payment')
  const formattedAmount = new Intl.NumberFormat('ko-KR').format(Number(amount))

  return (
    <div className="flex flex-col gap-y-[24px]">
      <section className="border-gray2 rounded-[12px] border p-4">
        <section className="desktop:border-gray2 desktop:border-b desktop:pb-[20px] flex flex-col">
          <h2 className="kr-title-md">{t('payment:content.paySummary.title')}</h2>
          <section className="mt-[32px] flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="kr-subtitle-md text-gray5">{t('payment:content.paySummary.orderAmount')}</div>
              <p className="kr-title-sm">{t('payment:content.paySummary.amountValue', { amount: formattedAmount })}</p>
            </div>
          </section>

          <section className="mt-[20px] flex items-center justify-between">
            <p className="kr-subtitle-lg">{t('payment:content.paySummary.totalAmount')}</p>
            <div className="kr-subtitle-lg text-main-500">
              {t('payment:content.paySummary.amountValue', { amount: formattedAmount })}
            </div>
          </section>
        </section>

        {/* 데스크탑 버전 약관 */}
        <section className="desktop:flex mt-[20px] hidden flex-col">
          <TermsSection />
        </section>
      </section>

      {/* 모바일 버전 약관 */}
      <section className="desktop:hidden flex flex-col px-4">
        <TermsSection />
      </section>
    </div>
  )
}

function TermsSection() {
  const { t } = useTranslation('payment')

  // Zustand 스토어의 set함수나 상태가 단일 boolean이라면, 내부에서 개별 체크박스 상태를 관리합니다.
  const { setAgreedToTerms } = useOrderStore() // 스토어에 상태 저장 함수가 있다고 가정

  const [checks, setChecks] = useState({
    term1: false, // 서비스 이용 약관
    term2: false, // 개인(신용)정보 수집 및 이용 동의
    term3: false, // 개인(신용)정보 제 3자 제공 동의
  })

  // 모든 약관이 체크되었는지 확인
  const isAllChecked = checks.term1 && checks.term2 && checks.term3

  // 개별 체크 핸들러
  const handleCheck = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // 전체 동의 핸들러
  const handleAllCheck = () => {
    const newValue = !isAllChecked
    setChecks({ term1: newValue, term2: newValue, term3: newValue })
  }

  // 모든 체크 상태가 변할 때마다 스토어의 최종 동의 상태 업데이트
  useEffect(() => {
    setAgreedToTerms(isAllChecked)
  }, [isAllChecked, setAgreedToTerms])

  const subTerms = [
    {
      id: 'term1',
      label: t('payment:content.paySummary.terms.service'),
      url: 'https://pages.tosspayments.com/terms/user',
    },
    {
      id: 'term2',
      label: t('payment:content.paySummary.terms.privacyCollection'),
      url: 'https://pages.tosspayments.com/terms/v2/tables/291/records/1174337',
    },
    {
      id: 'term3',
      label: t('payment:content.paySummary.terms.privacyThirdParty'),
      url: 'https://pages.tosspayments.com/terms/v2/tables/291/records/1174339',
    },
  ]

  return (
    <div className="flex flex-col gap-y-4">
      {/* 전체 동의 섹션 */}
      <div className="flex cursor-pointer items-center gap-x-2 pb-2" onClick={handleAllCheck}>
        {isAllChecked ? (
          <CheckIcon width={24} height={24} className="text-main-500" />
        ) : (
          <UncheckIcon width={24} height={24} className="text-gray3" />
        )}
        <p className={`kr-subtitle-md ${isAllChecked ? 'text-gray9' : 'text-gray5'} font-bold`}>
          {t('payment:content.paySummary.terms.agreeAll')}
        </p>
      </div>

      {/* 개별 약관 리스트 */}
      <div className="flex flex-col gap-y-3 pl-1">
        {subTerms.map((term) => (
          <div key={term.id} className="flex items-center justify-between">
            <div
              className="flex cursor-pointer items-center gap-x-2"
              onClick={() => handleCheck(term.id as keyof typeof checks)}
            >
              {checks[term.id as keyof typeof checks] ? (
                <CheckIcon width={18} height={18} className="text-main-500" />
              ) : (
                <UncheckIcon width={18} height={18} className="text-gray3" />
              )}
              <span className="kr-body-sm text-gray6">{term.label}</span>
            </div>
            <Link href={term.url} target="_blank">
              <RightArrowIcon className="text-gray4 h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="kr-body-sm text-gray4 bg-gray1 mt-2 rounded-[8px] p-3">
        <Trans
          i18nKey="content.paySummary.terms.notice"
          ns="payment"
          components={[
            <Link
              key="refund"
              className="text-gray6 font-medium underline"
              href="https://fifth-soil-7ed.notion.site/335244b92af280b082edd35df86803d7?source=copy_link"
              target="_blank"
            >
              refund
            </Link>,
            <Link
              key="service"
              className="text-gray6 font-medium underline"
              href="https://fifth-soil-7ed.notion.site/335244b92af280a8a12bf8468d78ac68?source=copy_link"
              target="_blank"
            >
              service
            </Link>,
            <Link
              key="privacy"
              className="text-gray6 font-medium underline"
              href="https://fifth-soil-7ed.notion.site/335244b92af2808ab447c0f044da88cb?source=copy_link"
              target="_blank"
            >
              privacy
            </Link>,
          ]}
        />
      </div>
    </div>
  )
}
