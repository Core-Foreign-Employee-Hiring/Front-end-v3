'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchPurchasedArchiveList } from '@/lib/client/mypage'
import Loading from '../../common/Loading'
import Pagination from '@/components/common/Pagination'
import PurchaseItem from '@/components/mypage/content/PurchaseItem'

interface PurchaseListProps {
  currentPage: number
}

export default function PurchaseList({ currentPage }: PurchaseListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data, isLoading } = useQuery({
    queryKey: ['purchaseArchives', currentPage],
    queryFn: () => fetchPurchasedArchiveList({ page: currentPage - 1, size: 10 }),
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
      <div className="flex flex-col gap-y-4">
        {list.map((item) => (
          <PurchaseItem key={item.passArchiveId} {...item} />
        ))}
        {list.length === 0 && <p className="text-gray3 py-20 text-center">내역이 없습니다.</p>}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
