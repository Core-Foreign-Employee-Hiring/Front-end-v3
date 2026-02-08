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
  }))
)
