import Image from 'next/image'
import { Badge, Button } from '@/components/common'
import { ContentPaymentType } from '@/types/mypage'
import { formatDateTime } from '@/utils/common'

export default function ContentPaymentCard({
  downloaded,
  paymentStatus,
  merchantOrderId,
  title,
  approvedAt,
  totalAmount,
  thumbnailUrl,
}: ContentPaymentType) {
  return (
    <div className="rounded-[12px]">
      <section className="relative h-[185px] w-full overflow-hidden rounded-t-[12px]">
        {/* 1. 원본 이미지 */}
        <Image
          src={thumbnailUrl}
          alt="섬네일"
          className="object-cover"
          fill
          priority // 첫 화면에 노출될 확률이 높으므로 priority 속성 추가 권장
        />

        {/* 2. 그라데이션 오버레이 (위에서 아래로 갈수록 밝아짐/투명해짐) */}
        {/* bg-gradient-to-b 클래스와 black/80 -> transparent 조합 사용 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

        {/* 3. 배지 (우측 상단 배치) */}
        <div className="absolute top-3 left-3 z-10">
          <Badge bgColor={'bg-[#00B0A9]'} textColor={'text-white'}>
            {paymentStatus === 'DONE' ? '결제 완료' : '결제 대기'}
          </Badge>
        </div>
      </section>
      <section className="border-gray2 flex flex-col gap-y-3 rounded-b-[12px] border-x border-b p-4">
        <section className="flex flex-col gap-y-3">
          <p className="kr-subtitle-md">{title}</p>
          <div className="flex flex-col">
            <div className="kr-button text-gray5">주문번호</div>
            <div className="kr-subtitle-sm break-all">{merchantOrderId}</div>
          </div>

          <div className="flex justify-between">
            <div className="kr-button text-gray5">결제일시</div>
            <div className="kr-subtitle-sm break-all">{formatDateTime(approvedAt)}</div>
          </div>

          <div className="flex justify-between">
            <div className="kr-button text-gray5">결제수단</div>
            <div className="kr-subtitle-sm break-all">토스페이</div>
          </div>
        </section>

        <div className="border-gray2 border-b" />

        <p className="kr-subtitle-lg text-main-500">{totalAmount}원</p>
        <section className="flex gap-x-3">
          <Button size={'md'} variant={'outline'}>
            영수증 보기
          </Button>
          <Button size={'md'} variant={'primary'}>
            다운로드
          </Button>
        </section>
      </section>
    </div>
  )
}
