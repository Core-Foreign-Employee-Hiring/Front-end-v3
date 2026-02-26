import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

/**
 * 1. 모든 모달의 키값을 유니온 타입으로 정의합니다.
 * 여기에 새로운 모달 이름을 추가하기만 하면 자동 완성이 지원됩니다.
 */
export type ModalKey =
  | 'isSaveAnswerNoteModalOpen'
  | 'isCreateNewAnswerNoteModalOpen'
  | 'isEditNoteTitleModalOpen'
  | 'isDeleteNoteModalOpen'
  | 'isCreateResumeModalOpen'
  | 'isInfoPickerModalOpen'
  | 'isSearchAddressModalOpen'
  | 'isJobRoleModalOpen'
  | 'isVisaModalOpen'
  | 'isLanguageModalOpen'
  | 'isRegionModalOpen'
  | 'isContractModalOpen'
  | 'isMoreOptionsMenuOpen'
  | 'isNotUseResumeService'
  | 'isRequiredLoginModalOpen'
  | 'isServicePrepareModalOpen'
  | 'isPurchaseCompletionModalOpen'
  | 'isInquiryModalOpen'
  | 'isImageModalOpen'
  | 'isApplicationMethodModalOpen'
  | 'isResumePreviewModalOpen'
  | 'isWriteReviewModalOpen'
  | 'isViewReviewModalOpen'
  | 'isCareerAnalysisLoadingModalOpen'

interface ModalState {
  // 각 모달의 열림 상태를 저장하는 객체
  modals: Partial<Record<ModalKey, boolean>>

  // 모달 상태 변경 함수 (열기/닫기)
  setModal: (key: ModalKey, isOpen: boolean) => void

  // 상태 반전 함수 (토글)
  toggleModal: (key: ModalKey) => void

  // 모든 모달 닫기 (유용한 유틸리티)
  closeAllModals: () => void
}

export const useModalStore = create<ModalState>()(
  devtools((set) => ({
    // 초기 상태: 빈 객체 (기본적으로 undefined/false로 간주)
    modals: {},

    // 명시적으로 true/false 설정
    setModal: (key, isOpen) =>
      set(
        (state) => ({
          modals: { ...state.modals, [key]: isOpen },
        }),
        false,
        `setModal/${key}`
      ),

    // 현재 상태의 반대로 전환
    toggleModal: (key) =>
      set(
        (state) => ({
          modals: { ...state.modals, [key]: !state.modals[key] },
        }),
        false,
        `toggleModal/${key}`
      ),

    // 모든 모달을 한꺼번에 닫고 싶을 때
    closeAllModals: () => set(() => ({ modals: {} }), false, 'closeAllModals'),
  }))
)
