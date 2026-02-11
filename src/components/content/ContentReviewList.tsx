'use client'

import ContentReviewItem from '@/components/content/ContentReviewItem'
import Pagination from '@/components/common/Pagination'
import { useState } from 'react'
import { Loading } from '@/components/common'
import { useQuery } from '@tanstack/react-query'
import { clientFetchAllContents } from '@/lib/client/content'

interface ContentReviewListProps {
  archiveId: string
}

export default function ContentReviewList({ archiveId }: ContentReviewListProps) {
  const pageSize = 5

  const [currentPage, setCurrentPage] = useState(1)
  // 4. React Query 데이터 패칭
  const { data, isLoading } = useQuery({
    queryKey: ['contents', currentPage],
    queryFn: () =>
      clientFetchAllContents({
        page: currentPage - 1,
        size: pageSize,
        archiveId: archiveId,
      }),
    placeholderData: (previousData) => previousData,
  })

  // ... 이하 데이터 처리 및 return 로직 동일
  const contents = data?.data?.content || []
  const totalPages = data?.data?.totalPages || 0

  if (isLoading && !data) return <Loading size={'lg'} />

  return (
    <div className="flex flex-col gap-y-[32px]">
      <div className="flex flex-col">
        {contents.map((content) => (
          <ContentReviewItem key={content.archiveReviewId} content={content} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page)
          window.scrollTo(0, 0)
        }}
        totalPages={totalPages}
        groupSize={5}
      />
    </div>
  )
}
