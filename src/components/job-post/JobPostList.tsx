'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { clientFetchAllPosts } from '@/lib/client/job-post' // 위에서 만든 함수
import JobPostCard from '@/components/job-post/JobPostCard'
import Filters from '@/components/job-post/Filters'
import { Loading, Spacing } from '@/components/common'
import Pagination from '@/components/common/Pagination'
import { JobPostType } from '@/types/job-post'

export default function JobPostList() {
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 (1부터 시작)
  const pageSize = 21
  const pageGroupSize = 5 // 5개씩 끊어서 보여줌

  // 1. React Query 데이터 패칭
  const { data, isLoading } = useQuery({
    queryKey: ['jobPosts', currentPage],
    queryFn: () => clientFetchAllPosts({ page: currentPage - 1, size: pageSize }),
    placeholderData: (previousData) => previousData, // 페이지 전환 시 부드럽게 유지
  })

  const jobPosts = data?.data?.content || []
  const totalElements = data?.data?.totalElements || 0
  const totalPages = data?.data?.totalPages || 0

  // 2. 페이지네이션 로직
  const currentGroup = Math.ceil(currentPage / pageGroupSize)
  const startPage = (currentGroup - 1) * pageGroupSize + 1
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages)

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (isLoading && !data) return <Loading size={'lg'} />

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="kr-subtitle-lg flex gap-x-1">
          <p className="text-main-500">{totalElements}</p> 건
        </div>
        <Filters />
      </div>

      <Spacing height={12} />

      {/* 카드 리스트 */}
      <section className="tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-6">
        {jobPosts.map((job: JobPostType) => (
          <JobPostCard key={job.recruitId} {...job} />
        ))}
      </section>

      <Spacing height={40} />

      {/* 페이지네이션 UI */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page)
          window.scrollTo(0, 0) // 페이지 이동 시 상단으로 스크롤
        }}
        groupSize={5}
      />
    </div>
  )
}
