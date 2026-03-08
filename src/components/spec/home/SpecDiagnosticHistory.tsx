'use client'

import { Label, Loading } from '@/components/common'
import SpecDiagnosticHistoryList from '@/components/spec/home/SpecDiagnosticHistoryList'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { clientFetchAllSpecResult } from '@/lib/client/spec'
import { useTranslation } from 'react-i18next'

export default function SpecDiagnosticHistory() {
  const { t } = useTranslation(['spec'])
  const pageSize = 5
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['specResultList', currentPage],
    queryFn: () =>
      clientFetchAllSpecResult({
        page: currentPage - 1,
        size: pageSize,
      }),
    placeholderData: (previousData) => previousData,
  })

  const specResults = data?.data?.content || []
  const totalElements = data?.data?.totalElements || 0
  const totalPages = data?.data?.totalPages || 0

  // --- 수정된 부분 ---
  // 첫 번째 요소를 제외한 나머지 배열 생성
  const filteredSpecResults = specResults.slice(1)
  console.log('filteredSpecResults', filteredSpecResults)
  console.log('data', data)

  // ------------------

  if (isLoading && !data) return <Loading size={'lg'} />

  return (
    <div className="flex flex-col gap-y-3">
      <Label
        label={t('spec:home.spec_diagnostic_history.title')}
        type={'subtitleLg'}
        rightElement={
          <p className="kr-badge-sm text-gray5">
            {t('spec:home.spec_diagnostic_history.total_count', { count: totalElements })}
          </p>
        }
      />
      <SpecDiagnosticHistoryList
        // 원본 대신 필터링된 배열을 넘겨줍니다.
        specResults={filteredSpecResults}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
