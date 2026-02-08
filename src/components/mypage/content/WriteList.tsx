'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchWriteArchiveList } from '@/lib/client/mypage'
import Loading from '../../common/Loading'
import Pagination from '@/components/common/Pagination'
import ContentCard from '@/components/content/ContentCard'

interface WriteListProps {
  currentPage: number
}
export default function WriteList({ currentPage }: WriteListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data, isLoading } = useQuery({
    queryKey: ['writeArchives', currentPage],
    queryFn: () => fetchWriteArchiveList({ page: currentPage - 1, size: 10 }),
    // 서버에서 이미 가져온 데이터가 있으므로 즉시 렌더링됨
  })

  const list = data?.data?.content || []
  const totalPages = data?.data?.totalPages || 0

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  if (isLoading && !data) return <Loading />

  return (
    <div>
      <div className="grid grid-cols-3 gap-[20px]">
        {list.map((item) => (
          <ContentCard
            key={item.archiveId}
            passArchiveId={item.archiveId}
            title={item.title}
            oneLineReview={item.oneLineReview}
            price={item.price}
            star={item.star}
            starCount={item.starCount}
            thumbnailUrl={item.thumbnailUrl}
          />
        ))}
        {list.length === 0 && <p className="text-gray3 py-20 text-center">내역이 없습니다.</p>}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
