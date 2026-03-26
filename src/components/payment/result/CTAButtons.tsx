import { Button } from '@/components/common'

export default function CTAButtons() {
  return (
    <div className="flex items-center gap-x-4">
      <Button variant={'secondary'}>결제 내역</Button>
      <Button variant={'primary'}>결제상품 바로 이용</Button>
    </div>
  )
}
