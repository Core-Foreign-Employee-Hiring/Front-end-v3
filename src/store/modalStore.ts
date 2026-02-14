import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ModalState {
  isSaveAnswerNoteModalOpen: boolean
  isCreateNewAnswerNoteModalOpen: boolean
  isEditNoteTitleModalOpen: boolean
  isDeleteNoteModalOpen: boolean
  isCreateResumeModalOpen: boolean
  isInfoPickerModalOpen: boolean
  isSearchAddressModalOpen: boolean
  isJobRoleModalOpen: boolean
  isVisaModalOpen: boolean
  isLanguageModalOpen: boolean
  isRegionModalOpen: boolean
  isContractModalOpen: boolean
  isMoreOptionsMenuOpen: boolean
  isNotUseResumeService: boolean
  isRequiredLoginModalOpen: boolean
  isServicePrepareModalOpen: boolean
  isPurchaseCompletionModalOpen: boolean
  isInquiryModalOpen: boolean
  isImageModalOpen: boolean
  isApplicationMethodModalOpen: boolean
  isResumePreviewModalOpen: boolean

  setIsSaveAnswerNoteModalOpen: (isSaveAnswerNoteModalOpen: boolean) => void
  setIsCreateNewAnswerNoteModalOpen: (isCreateNewAnswerNoteModalOpen: boolean) => void
  setIsEditNoteTitleModalOpen: (isEditNoteTitleModalOpen: boolean) => void
  setIsDeleteNoteModalOpen: (isDeleteNoteModalOpen: boolean) => void
  setIsCreateResumeModalOpen: (isCreateResumeModalOpen: boolean) => void
  setIsInfoPickerModalOpen: (isInfoPickerModalOpen: boolean) => void
  setIsSearchAddressModalOpen: (isSearchAddressModalOpen: boolean) => void
  setIsJobRoleModalOpen: (isJobRoleModalOpen: boolean) => void
  setIsVisaModalOpen: (isVisaModalOpen: boolean) => void
  setIsLanguageModalOpen: (isLanguageModalOpen: boolean) => void
  setIsRegionModalOpen: (isRegionModalOpen: boolean) => void
  setIsContractModalOpen: (isContractModalOpen: boolean) => void
  setIsMoreOptionsMenuOpen: (isMoreOptionsMenuOpen: boolean) => void
  setIsNotUseResumeService: (isNotUseResumeService: boolean) => void
  setIsRequiredLoginModalOpen: (isRequiredLoginModalOpen: boolean) => void
  setIsServicePrepareModalOpen: (isServicePrepareModalOpen: boolean) => void
  setIsPurchaseCompletionModalOpen: (isPurchaseCompletionModalOpen: boolean) => void
  setIsInquiryModalOpen: (isInquiryModalOpen: boolean) => void
  setIsImageModalOpen: (isImageModalOpen: boolean) => void
  setIsApplicationMethodModalOpen: (isApplicationMethodModalOpen: boolean) => void
  setIsResumePreviewModalOpen: (isResumePreviewModalOpen: boolean) => void
}

export const useModalStore = create<ModalState>()(
  devtools((set) => ({
    isSaveAnswerNoteModalOpen: false,
    isCreateNewAnswerNoteModalOpen: false,
    isEditNoteTitleModalOpen: false,
    isDeleteNoteModalOpen: false,
    isCreateResumeModalOpen: false,
    isInfoPickerModalOpen: false,
    isSearchAddressModalOpen: false,
    isJobRoleModalOpen: false,
    isMoreOptionsMenuOpen: false,
    isNotUseResumeService: false,
    isRequiredLoginModalOpen: false,
    isImageModalOpen: false,
    isApplicationMethodModalOpen: false,
    isResumePreviewModalOpen: false,

    setIsSaveAnswerNoteModalOpen: (isSaveAnswerNoteModalOpen) =>
      set(() => ({
        isSaveAnswerNoteModalOpen: !isSaveAnswerNoteModalOpen,
      })),

    setIsCreateNewAnswerNoteModalOpen: (isCreateNewAnswerNoteModalOpen) =>
      set(() => ({
        isCreateNewAnswerNoteModalOpen: !isCreateNewAnswerNoteModalOpen,
      })),

    setIsEditNoteTitleModalOpen: (isEditNoteTitleModalOpen) =>
      set(() => ({
        isEditNoteTitleModalOpen: !isEditNoteTitleModalOpen,
      })),
    setIsDeleteNoteModalOpen: (isDeleteNoteModalOpen) =>
      set(() => ({
        isDeleteNoteModalOpen: !isDeleteNoteModalOpen,
      })),
    setIsCreateResumeModalOpen: (isCreateResumeModalOpen) =>
      set(() => ({
        isCreateResumeModalOpen: !isCreateResumeModalOpen,
      })),
    setIsInfoPickerModalOpen: (isInfoPickerModalOpen) =>
      set(() => ({
        isInfoPickerModalOpen: !isInfoPickerModalOpen,
      })),
    setIsSearchAddressModalOpen: (isSearchAddressModalOpen) =>
      set(() => ({
        isSearchAddressModalOpen: !isSearchAddressModalOpen,
      })),
    setIsJobRoleModalOpen: (isJobRoleModalOpen) =>
      set(() => ({
        isJobRoleModalOpen: !isJobRoleModalOpen,
      })),

    setIsVisaModalOpen: (isVisaModalOpen) =>
      set(() => ({
        isVisaModalOpen: !isVisaModalOpen,
      })),
    setIsLanguageModalOpen: (isLanguageModalOpen) =>
      set(() => ({
        isLanguageModalOpen: !isLanguageModalOpen,
      })),

    setIsRegionModalOpen: (isRegionModalOpen) =>
      set(() => ({
        isRegionModalOpen: !isRegionModalOpen,
      })),
    setIsContractModalOpen: (isContractModalOpen) =>
      set(() => ({
        isContractModalOpen: !isContractModalOpen,
      })),
    setIsMoreOptionsMenuOpen: (isMoreOptionsMenuOpen) =>
      set(() => ({
        isMoreOptionsMenuOpen: !isMoreOptionsMenuOpen,
      })),
    setIsNotUseResumeService: (isNotUseResumeService) =>
      set(() => ({
        isNotUseResumeService: !isNotUseResumeService,
      })),
    setIsRequiredLoginModalOpen: (isRequiredLoginModalOpen) =>
      set(() => ({
        // !isRequiredLoginModalOpen 대신 매개변수를 그대로 사용하세요
        isRequiredLoginModalOpen: isRequiredLoginModalOpen,
      })),
    setIsServicePrepareModalOpen: (isServicePrepareModalOpen) =>
      set(() => ({
        isServicePrepareModalOpen: !isServicePrepareModalOpen,
      })),
    setIsPurchaseCompletionModalOpen: (isPurchaseCompletionModalOpen) =>
      set(() => ({
        isPurchaseCompletionModalOpen: !isPurchaseCompletionModalOpen,
      })),
    setIsInquiryModalOpen: (isInquiryModalOpen) =>
      set(() => ({
        isInquiryModalOpen: !isInquiryModalOpen,
      })),
    setIsImageModalOpen: (isImageModalOpen) =>
      set(() => ({
        isImageModalOpen: !isImageModalOpen,
      })),
    setIsApplicationMethodModalOpen: (isApplicationMethodModalOpen) =>
      set(() => ({
        isApplicationMethodModalOpen: !isApplicationMethodModalOpen,
      })),
    setIsResumePreviewModalOpen: (isResumePreviewModalOpen) =>
      set(() => ({
        isResumePreviewModalOpen: !isResumePreviewModalOpen,
      })),
  }))
)
