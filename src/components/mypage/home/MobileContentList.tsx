import { Label } from '@/components/common'
import ViewMoreButton from '@/components/mypage/home/ViewMoreButton'
import ChangeContentSwitchButton from '@/components/mypage/content/ChangeContentSwitchButton'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import SoldList from '@/components/mypage/content/SoldList'
import PurchaseList from '@/components/mypage/content/PurchaseList'
import WriteList from '@/components/mypage/content/WriteList'
import { fetchPurchasedArchiveList, fetchSoldArchiveList, fetchWriteArchiveList } from '@/lib/server/mypage'

type SearchType = 'sold' | 'purchase' | 'write'

export default async function MobileContentList({
  searchParams,
  params,
}: {
  params: Promise<{ lang: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lang } = await params
  const resolvedSearchParams = await searchParams
  const type = (resolvedSearchParams.type || 'sold') as SearchType
  const page = Number(resolvedSearchParams.page) || 1

  const queryClient = new QueryClient()

  // 서버에서 해당 타입의 첫 페이지 데이터를 프리페치합니다.
  if (type === 'sold') {
    await queryClient.prefetchQuery({
      queryKey: ['soldArchives', page],
      queryFn: () => fetchSoldArchiveList({ page: page - 1, size: 10 }),
    })
  } else if (type === 'purchase') {
    await queryClient.prefetchQuery({
      queryKey: ['purchasedArchives', page],
      queryFn: () => fetchPurchasedArchiveList({ page: page - 1, size: 10 }),
    })
  } else {
    await queryClient.prefetchQuery({
      queryKey: ['writeArchives', page],
      queryFn: () => fetchWriteArchiveList({ page: page - 1, size: 10 }),
    })
  }

  return (
    <div className="desktop:hidden flex flex-col gap-y-3">
      <Label type={'titleMd'} label={'콘텐츠 내역'} rightElement={<ViewMoreButton />} />
      <ChangeContentSwitchButton type={type} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        {type === 'sold' && <SoldList currentPage={page} />}
        {type === 'purchase' && <PurchaseList currentPage={page} />}
        {type === 'write' && <WriteList currentPage={page} />}
      </HydrationBoundary>
    </div>
  )
}
