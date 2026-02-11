import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AnswerEntryType, CreateNoteDataType, FinalAnswerEntryType } from '@/types/interview/note'

interface NoteState {
  selectedNoteId: string
  title: string
  createNoteData: CreateNoteDataType
  answerEntry: AnswerEntryType
  finalAnswerEntry: FinalAnswerEntryType

  setSelectedNoteId: (id: string) => void
  setTitle: (title: string) => void
  setAnswerEntry: (update: Partial<AnswerEntryType> | null) => void
  setCreateNoteData: (update: Partial<CreateNoteDataType>) => void
  setFinalAnswerEntry: (update: Partial<FinalAnswerEntryType>) => void

  // 초기화 함수
  resetSelectedNoteId: (id: string) => void
  resetTitle: () => void
  resetAnswerEntry: () => void
  resetCreateNoteData: () => void
  resetFinalAnswerEntry: () => void
}

const initCreateNoteData = {
  title: '',
  entries: null,
}

const initAnswerEntry = {
  question: '',
  initial_answer: '',
  follow_up_question: '',
  follow_up_answer: '',
  feedback: '',
  improvements: '',
  final_answer: '',
}

export const useNoteStore = create<NoteState>()(
  devtools((set) => ({
    createNoteData: initCreateNoteData,
    answerEntry: initAnswerEntry,
    selectedNoteId: '',
    finalAnswer: '',
    title: '',

    // 선택된 ID를 업데이트하는 함수
    setSelectedNoteId: (id) => set({ selectedNoteId: id }, false, 'setSelectedNoteId'),
    setTitle: (title) => set({ title: title }, false, 'setTitle'),
    setAnswerEntry: (update) =>
      set(
        (state) => ({
          answerEntry: { ...state.answerEntry, ...update } as AnswerEntryType,
        }),
        false,
        'setAnswerEntry'
      ),

    setCreateNoteData: (update) =>
      set(
        (state) => ({
          createNoteData: {
            ...state.createNoteData,
            ...update,
          },
        }),
        false,
        'setCreateNoteData'
      ),
    setFinalAnswerEntry: (update) =>
      set(
        (state) => ({
          finalAnswerEntry: { ...state.finalAnswerEntry, ...update } as FinalAnswerEntryType,
        }),
        false,
        'setFinalAnswerEntry'
      ),

    resetSelectedNoteId: () => set({ selectedNoteId: '' }, false, 'resetSelectedNoteId'),
    resetTitle: () => set({ selectedNoteId: '' }, false, 'resetSelectedNoteId'),
    resetAnswerEntry: () => set({ answerEntry: initAnswerEntry }, false, 'resetAnswerEntry'),
    resetCreateNoteData: () => set({ createNoteData: initCreateNoteData }, false, 'resetCreateNoteData'),
    resetFinalAnswerEntry: () => set({ answerEntry: initAnswerEntry }, false, 'resetFinalAnswerEntry'),
  }))
)
