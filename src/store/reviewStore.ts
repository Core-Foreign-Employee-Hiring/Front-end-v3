import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ReviewType } from '@/types/review'

interface ReviewState {
  reviewData: ReviewType
  selectedReviewId: number | null
  selectedArchiveId: number | null

  // Actions
  setReviewData: (reviewData: ReviewType) => void
  updateReviewField: (field: keyof ReviewType, value: string | number) => void
  resetReviewData: () => void
  setSelectedReviewId: (id: number | null) => void
  setSelectedArchiveId: (id: number | null) => void
}

export const useReviewStore = create<ReviewState>()(
  devtools((set) => ({
    // 1. 초기 상태
    reviewData: { star: 0, content: '' },
    selectedReviewId: null,
    selectedArchiveId: null,

    // 2. 리뷰 데이터 전체 교체
    setReviewData: (reviewData) => set({ reviewData }, false, 'review/setReviewData'),

    // 3. 특정 필드(star, content 등)만 업데이트
    updateReviewField: (field, value) =>
      set(
        (state) => ({
          reviewData: {
            ...state.reviewData,
            [field]: value,
          },
        }),
        false,
        'review/updateReviewField'
      ),

    // 4. 어떤 리뷰를 볼지 ID 설정
    setSelectedReviewId: (id) => set({ selectedReviewId: id }, false, 'review/setSelectedReviewId'),

    // 5. 어떤 아카이브에 리뷰를 쓸지 ID 설정
    setSelectedArchiveId: (id) => set({ selectedArchiveId: id }, false, 'review/setSelectedArchiveId'),

    // 6. 모든 데이터 초기화 (모달 닫을 때나 페이지 이탈 시 사용)
    resetReviewData: () =>
      set(
        {
          reviewData: { star: 0, content: '' },
          selectedReviewId: null,
          selectedArchiveId: null,
        },
        false,
        'review/resetReviewData'
      ),
  }))
)
