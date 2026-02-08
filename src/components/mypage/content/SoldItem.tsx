import { SoldArchiveType } from '@/types/mypage'

export default function SoldItem({
  soldAt,
  archiveId,
  oneLineReview,
  price,
  title,
  paymentId,
  withdrawalAt,
  isWithdrawn,
}: SoldArchiveType) {
  return (
    <div className="border-gray2 flex items-center justify-between gap-x-3 border-b-[1px] py-4">
      <div className="flex items-center gap-x-3">
        <div className="flex flex-col gap-y-1">
          {isWithdrawn ? <p className="kr-badge-sm text-main-500">인출 완료 {withdrawalAt}</p> : null}

          <p className={`${isWithdrawn ? 'text-gray4' : 'text-black'} kr-subtitle-lg`}>{title}</p>
          <p className="kr-body-sm text-gray4">{soldAt}</p>
        </div>
      </div>
      <p className={`${isWithdrawn ? 'text-gray4' : 'text-black'} kr-subtitle-lg`}>{price.toLocaleString()}원</p>
    </div>
  )
}
