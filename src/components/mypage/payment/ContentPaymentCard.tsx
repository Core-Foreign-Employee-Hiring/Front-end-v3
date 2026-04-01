import Image from 'next/image'
import { Badge, Button } from '@/components/common'
import { ContentPaymentType } from '@/types/mypage'
import { formatDateTime } from '@/utils/common'
import { getPassArchivesDownLoad } from '@/lib/client/pass-archives'
import { useModalStore } from '@/store/modalStore'
import CashReceiptModal from '@/components/common/modal/CashReceiptModal'
import { useOrderStore } from '@/store/orderStore'
import { getCashReceipt } from '@/lib/client/order'
import { useToast } from '@/components/common/toast/ToastContext'

export default function ContentPaymentCard({
  downloaded,
  passArchiveId,
  paymentStatus,
  merchantOrderId,
  title,
  approvedAt,
  totalAmount,
  thumbnailUrl,
}: ContentPaymentType) {
  const setModal = useModalStore((state) => state.setModal)
  const updateMerchantOrderId = useOrderStore((state) => state.updateMerchantOrderId)
  const { success, error } = useToast()
  /**
   * 아카이브의 모든 파일을 로컬에 다운로드
   * @param passArchiveId - 아카이브 ID
   */
  const downloadPassArchive = async (passArchiveId: number): Promise<void> => {
    try {
      // 1. 파일 목록 가져오기
      const data = await getPassArchivesDownLoad(passArchiveId)
      console.log('response', data)

      if (!data || data.length === 0) {
        throw new Error('다운로드 가능한 파일이 없습니다')
      }

      // 2. 각 파일 순차적으로 다운로드
      for (const file of data) {
        if (!file?.fileUrl) {
          console.warn(`파일 URL을 받지 못했습니다: ${file?.originalFileName}`)
          continue
        }

        try {
          // 3. fileUrl에서 실제 파일 다운로드
          const fileResponse = await fetch(file.fileUrl)

          if (!fileResponse.ok) {
            throw new Error(`파일 다운로드 실패: ${fileResponse.statusText}`)
          }

          // 4. Blob으로 변환
          const blob = await fileResponse.blob()

          // 5. 임시 a 태그 생성해서 다운로드 트리거
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = file.originalFileName
          document.body.appendChild(link)
          link.click()

          // 6. 정리 (메모리 누수 방지)
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)

          // 브라우저 다운로드 대기열 관리를 위한 딜레이
          await new Promise((resolve) => setTimeout(resolve, 300))
        } catch (error) {
          console.error(`파일 다운로드 중 오류 (${file.originalFileName}):`, error)
        }
      }
    } catch (error) {
      console.error('아카이브 다운로드 중 오류:', error)
      throw error
    }
  }

  /**
   * 현금영수증 보기 핸들러
   * @param merchantOrderId - 주문번호
   */
  const handleViewReceipt = async (merchantOrderId: string) => {
    // 1. API 호출하여 데이터 가져오기
    const result = await getCashReceipt(merchantOrderId)

    if (result.success && result.data?.data?.receiptUrl) {
      // 2. 새로운 탭에서 영수증 URL 열기
      // result.data.data.receiptUrl 인 이유는 제공해주신 타입이 ApiCallResult가 중첩되어 있기 때문입니다.
      const url = result.data.data.receiptUrl

      // 보안상 noopener, noreferrer를 권장합니다.
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      setModal('isCashReceiptModalOpen', true)
      updateMerchantOrderId(merchantOrderId)
    }
  }

  return (
    <div className="rounded-[12px]">
      <CashReceiptModal />
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
          <p className="kr-subtitle-md mb-1">{title}</p>

          <div className="flex items-center justify-between">
            <div className="kr-button text-gray5 shrink-0">결제일시</div>
            <div className="kr-subtitle-sm">{formatDateTime(approvedAt)}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="kr-button text-gray5 shrink-0">결제수단</div>
            <div className="kr-subtitle-sm">토스페이</div>
          </div>

          {/* 주문번호 섹션: 공간이 좁을 땐 위아래, 넓을 땐 좌우로 유연하게 */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div className="kr-button text-gray5 shrink-0">주문번호</div>
            <div className="kr-subtitle-sm text-right break-words text-gray-800 sm:max-w-[70%]">{merchantOrderId}</div>
          </div>
        </section>

        <div className="border-gray2 border-b" />

        <p className="kr-subtitle-lg text-main-500">{totalAmount}원</p>
        <section className="flex gap-x-3">
          <Button onClick={() => handleViewReceipt(merchantOrderId)} size={'md'} variant={'outline'}>
            영수증 보기
          </Button>
          <Button
            onClick={async () => {
              await downloadPassArchive(passArchiveId)
            }}
            size={'md'}
            variant={'primary'}
          >
            다운로드
          </Button>
        </section>
      </section>
    </div>
  )
}
