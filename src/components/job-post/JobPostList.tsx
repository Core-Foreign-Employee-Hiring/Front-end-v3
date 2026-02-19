'use client'

import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { clientFetchAllPosts } from '@/lib/client/job-post'
import JobPostCard from '@/components/job-post/JobPostCard'
import Filters from '@/components/job-post/Filters'
import { Label, Loading, Spacing } from '@/components/common'
import Pagination from '@/components/common/Pagination'
import { JobPostType } from '@/types/job-post'
import { useFilterStore } from '@/store/filterStore'

export default function JobPostList() {
  const { t } = useTranslation(['jobPost'])
  const pageSize = 21

  // 1. Zustand 스토어에서 모든 필터 상태 가져오기
  const {
    selectedVisaFilterContentList,
    selectedJobRoleFilterContentList,
    selectedLanguageFilterContentList,
    selectedRegionFilterContentList,
    selectedContractFilter,
  } = useFilterStore()

  // [중요] 필터들을 하나로 합친 문자열을 만듭니다. (필터 변경 감지용)
  const filterKey = JSON.stringify({
    visa: selectedVisaFilterContentList,
    role: selectedJobRoleFilterContentList,
    lang: selectedLanguageFilterContentList,
    region: selectedRegionFilterContentList,
    contract: selectedContractFilter,
  })

  // 2. 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1)
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)

  // 3. 렌더링 도중 필터 변경 감지 (useEffect 없이 페이지 초기화)
  // 이전 필터와 현재 필터가 다르면 페이지를 1로 돌립니다.
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey)
    setCurrentPage(1)
  }

  // 4. React Query 데이터 패칭
  const { data, isLoading } = useQuery({
    queryKey: [
      'jobPosts',
      currentPage,
      filterKey, // 개별 상태 대신 직렬화된 키를 사용하면 더 깔끔합니다.
    ],
    queryFn: () =>
      clientFetchAllPosts({
        page: currentPage - 1,
        size: pageSize,
        visas: selectedVisaFilterContentList,
        jobRoles: selectedJobRoleFilterContentList,
        languages: selectedLanguageFilterContentList,
        regions: selectedRegionFilterContentList,
        contract: selectedContractFilter,
      }),
    placeholderData: (previousData) => previousData,
  })

  // ... 이하 데이터 처리 및 return 로직 동일
  const jobPosts = data?.data?.content || []
  const totalElements = data?.data?.totalElements || 0
  const totalPages = data?.data?.totalPages || 0

  if (isLoading && !data) return <Loading size={'lg'} />

  return (
    <div className="flex flex-col">
      <Label label={t('home.title')} type={'titleLg'} />
      <Spacing height={8} />
      <div className="desktop:flex-row tablet:flex-row desktop:items-center tablet:items-center flex flex-col justify-between gap-y-2">
        <div className="kr-subtitle-lg flex gap-x-1">
          <Trans
            i18nKey="jobPost:home.jobCount"
            values={{ count: totalElements }}
            components={[<span key="0" className="text-main-500" />]}
          />
        </div>
        <Filters />
      </div>
      <Spacing height={12} />
      <section className="tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-6">
        {jobPosts.length > 0 ? (
          jobPosts.map((job: JobPostType) => <JobPostCard key={job.recruitId} {...job} />)
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400">{t('home.noResults')}</div>
        )}
      </section>
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
