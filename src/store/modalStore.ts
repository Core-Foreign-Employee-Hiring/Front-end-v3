import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ModalState {
  isSaveAnswerNoteModalOpen: boolean
  isCreateNewAnswerNoteModalOpen: boolean
  isEditNoteTitleModalOpen: boolean
  isDeleteNoteModalOpen: boolean
  isCreateResumeModalOpen: boolean
  isInfoPickerModalOpen: boolean

  setIsSaveAnswerNoteModalOpen: (isSaveAnswerNoteModalOpen: boolean) => void
  setIsCreateNewAnswerNoteModalOpen: (isCreateNewAnswerNoteModalOpen: boolean) => void
  setIsEditNoteTitleModalOpen: (isEditNoteTitleModalOpen: boolean) => void
  setIsDeleteNoteModalOpen: (isDeleteNoteModalOpen: boolean) => void
  setIsCreateResumeModalOpen: (isCreateResumeModalOpen: boolean) => void
  setIsInfoPickerModalOpen: (isInfoPickerModalOpen: boolean) => void
}

export const useModalStore = create<ModalState>()(
  devtools((set) => ({
    isSaveAnswerNoteModalOpen: false,
    isCreateNewAnswerNoteModalOpen: false,
    isEditNoteTitleModalOpen: false,
    isDeleteNoteModalOpen: false,
    isCreateResumeModalOpen: false,
    isInfoPickerModalOpen: false,

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
  }))
)
