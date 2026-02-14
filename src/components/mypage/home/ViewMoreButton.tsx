import { Button } from '@/components/common'
import Link from 'next/link'

export default function ViewMoreButton() {
  return (
    <Link href="/mypage/content?type=sold&page=0" scroll={false}>
      <Button customClassName={'w-[70px]'} variant={'ghost'} size={'sm'}>
        더보기
      </Button>
    </Link>
  )
}
