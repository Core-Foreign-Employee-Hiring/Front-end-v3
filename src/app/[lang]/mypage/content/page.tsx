// src/app/[lang]/mypage/content/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Label, Spacing } from '@/components/common'
import ChangeContentSwitchButton from '@/components/mypage/content/ChangeContentSwitchButton'
import SoldList from '@/components/mypage/content/SoldList'
import PurchaseList from '@/components/mypage/content/PurchaseList'
import WriteList from '@/components/mypage/content/WriteList'
import { fetchPurchasedArchiveList, fetchSoldArchiveList, fetchWriteArchiveList } from '@/lib/server/mypage'

type SearchType = 'sold' | 'purchase' | 'write'

export default async function MyPageContent({
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
    <main className="w-full">
      <Label label={'콘텐츠 내역'} type={'titleMd'} />
      <Spacing height={12} />
      <ChangeContentSwitchButton type={type} />
      <Spacing height={12} />

      {/* HydrationBoundary로 감싸서 서버 데이터를 클라이언트로 전달 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {type === 'sold' && <SoldList currentPage={page} />}
        {type === 'purchase' && <PurchaseList currentPage={page} />}
        {type === 'write' && <WriteList currentPage={page} />}
      </HydrationBoundary>
    </main>
  )
}
