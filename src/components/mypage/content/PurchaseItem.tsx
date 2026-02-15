'use client'

import { Badge, Button } from '@/components/common'
import { DownloadIcon } from 'lucide-react'
import { PurchaseArchiveType } from '@/types/mypage'
import Image from 'next/image'
import { getPassArchivesDownLoad } from '@/lib/client/pass-archives'
import { useModalStore } from '@/store/modalStore'
import WriteReviewModal from '@/components/common/modal/WriteReviewModal'
import ViewReviewModalOpen from '@/components/common/modal/ViewReviewModalOpen'
import { useReviewStore } from '@/store/reviewStore'

export default function PurchaseItem({
  archiveReviewId,
  passArchiveId,
  isReviewed,
  oneLineReview,
  price,
  star,
  paymentId,
  title,
  thumbnailUrl,
  approvedAt,
}: PurchaseArchiveType) {
  const { isWriteReviewModalOpen, setIsWriteReviewModalOpen, isViewReviewModalOpen, setIsViewReviewModalOpen } =
    useModalStore((state) => state)

  const { selectedReviewId, selectedArchiveId, setSelectedArchiveId, setSelectedReviewId } = useReviewStore(
    (state) => state
  )

  const handleReviewClick = () => {
    if (isReviewed) {
      // 1. 리뷰 보기 모드: 해당 리뷰의 ID를 스토어에 저장
      setSelectedReviewId(archiveReviewId)
      setIsViewReviewModalOpen(isViewReviewModalOpen) // 명시적으로 true 전달
    } else {
      // 2. 리뷰 작성 모드: 해당 아카이브의 ID를 스토어에 저장
      setSelectedArchiveId(passArchiveId)
      setIsWriteReviewModalOpen(isWriteReviewModalOpen) // 명시적으로 true 전달
    }
  }

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

  return (
    <div className="border-gray2 tablet:flex-row desktop:flex-row tablet:justify-between desktop:justify-between tablet:items-end desktop:items-end flex flex-col border-b-[1px] py-[20px]">
      {isWriteReviewModalOpen && selectedArchiveId === passArchiveId && (
        <WriteReviewModal
          archiveId={passArchiveId}
          title={title}
          price={price}
          thumbnailUrl={thumbnailUrl}
          approvedAt={approvedAt}
        />
      )}

      {isViewReviewModalOpen && selectedReviewId === archiveReviewId && (
        <ViewReviewModalOpen reviewId={archiveReviewId} />
      )}
      <div className="flex flex-col gap-y-3">
        {isReviewed ? null : <Badge>아직 리뷰를 작성하지 않았어요.</Badge>}
        <div className="flex items-center gap-x-3">
          <div className="relative h-[64px] w-[64px]">
            <Image src={thumbnailUrl} alt={'썸네일'} className="rounded-[8px] object-cover" fill />
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="kr-subtitle-lg">{title}</p>
            <p className="kr-body-sm">{price}원</p>
            <p className="kr-small text-gray4">{approvedAt} 결제완료</p>
          </div>
        </div>
      </div>

      <div className="tablet:w-fit desktop:w-fit flex w-full justify-end gap-x-3">
        <Button
          onClick={async () => {
            await downloadPassArchive(passArchiveId)
          }}
          leftIcon={<DownloadIcon width={16} height={16} />}
          size={'md'}
          variant={'outline'}
          customClassName={'w-[120px]'}
        >
          다운로드
        </Button>
        <Button onClick={handleReviewClick} size={'md'} customClassName={'desktop:w-[200px] w-[120px]'}>
          리뷰 {isReviewed ? '보기' : '작성하기'}
        </Button>
      </div>
    </div>
  )
}
