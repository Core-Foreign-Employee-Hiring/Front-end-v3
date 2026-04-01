'use client'

import ContentPaymentCard from '@/components/mypage/payment/ContentPaymentCard'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '@/components/common'
import { fetchContentPaymentList } from '@/lib/client/mypage'
import Pagination from '@/components/common/Pagination'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function ContentPaymentCards() {
  const { t } = useTranslation('payment')
  const pageSize = 6
  // 2. 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1)

  // 4. React Query 데이터 패칭
  const { data, isLoading } = useQuery({
    queryKey: ['payments', currentPage],
    queryFn: () =>
      fetchContentPaymentList({
        page: currentPage - 1,
        size: pageSize,
      }),
    placeholderData: (previousData) => previousData,
  })

  // ... 이하 데이터 처리 및 return 로직 동일
  const contentPayments = data?.data?.content || []
  const totalElements = data?.data?.totalElements || 0
  const totalPages = data?.data?.totalPages || 0

  if (isLoading && !data) return <Loading size={'lg'} />

  return (
    <div className="flex w-full flex-col gap-y-[32px]">
      <section className="flex flex-col items-start gap-y-[12px]">
        <h1 className="kr-title-md">결제 내역</h1>
        <div className="kr-subtitle-md text-gray5 whitespace-pre">
          구매 취소 및{' '}
          <Link className={'underline'} href={'https://fifth-soil-7ed.notion.site/335244b92af280b082edd35df86803d7'}>
            환불 문의
          </Link>
          는{' '}
          <Link className={'underline'} href={'https://pf.kakao.com/_xfxbmMX'}>
            카카오톡 상담하기
          </Link>
          {`를 이용해 주세요.아래 신청 내역에 표시된 금액은 실제 결제 금액과 다를 수 있습니다. \n‘영수증 보기’를 눌러 실제 결제 금액을 확인할 수 있습니다.`}
        </div>
      </section>
      <div className="desktop:grid-cols-3 tablet:grid-cols-2 grid grid-cols-1 items-center justify-center gap-x-[20px] gap-y-[32px]">
        {contentPayments.length > 0 ? (
          contentPayments.map((contentPayment) => (
            <ContentPaymentCard key={contentPayment.merchantOrderId} {...contentPayment} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400">{t('home.noResults')}</div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page)
          window.scrollTo(0, 0)
        }}
        groupSize={5}
      />
    </div>
  )
}
