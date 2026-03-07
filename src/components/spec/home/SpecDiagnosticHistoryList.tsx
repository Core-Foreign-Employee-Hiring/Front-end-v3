'use client'

import ListItem from '@/components/spec/home/ListItem'
import ListHeader from '@/components/spec/home/ListHeader'
import { Spacing } from '@/components/common'
import Pagination from '@/components/common/Pagination'
import { SpecEvaluationType } from '@/types/spec'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction } from 'react'

interface SpecDiagnosticHistoryListProps {
  specResults: SpecEvaluationType[]
  totalPages: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function SpecDiagnosticHistoryList({
  specResults,
  totalPages,
  currentPage,
  setCurrentPage,
}: SpecDiagnosticHistoryListProps) {
  const { t } = useTranslation(['spec'])

  return (
    <div className="">
      <ListHeader />
      {specResults.length > 0 ? (
        specResults.map((result: SpecEvaluationType) => <ListItem key={result.specEvaluationId} {...result} />)
      ) : (
        <div className="col-span-full py-20 text-center text-gray-400">{t('spec:home.noResults')}</div>
      )}

      <Spacing height={40} />
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
