import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  CommonAnswerType,
  FollowUpAnswerType,
  InterviewQuestionType,
  InterviewResultType,
  InterviewSettingOptionType,
} from '@/types/interview'

interface ChatMessageType {
  id: string | null
  type: 'COMMON_QUESTION' | 'FOLLOW_UP_QUESTION' | 'COMMON_ANSWER' | 'FOLLOW_UP_ANSWER'
  content: string
  order?: number
}

interface InterviewState {
  isFollowUpLoading: boolean
  isNextLoading: boolean
  isResultLoading: boolean

  setIsFollowUpLoading: (status: boolean) => void
  setIsNextLoading: (status: boolean) => void
  setIsResultLoading: (status: boolean) => void

  chatList: ChatMessageType[] // 일반 질문, 압박 질문, 답변이 다 있는 리스트
  clearChatList: () => void
  addChatMessage: (message: ChatMessageType) => void
  currentIndex: number

  setCurrentIndex: (index: number) => void

  interviewResult: InterviewResultType | null
  setInterviewResult: (data: InterviewResultType) => void

  // 설정 옵션
  settingInterviewOption: InterviewSettingOptionType
  setSettingInterviewOption: (newOption: Partial<InterviewSettingOptionType>) => void

  // 면접 질문 데이터
  interviewQuestion: InterviewQuestionType | null
  setInterviewQuestion: (question: InterviewQuestionType) => void

  // 면접 Answer post 데이터
  commonAnswer: CommonAnswerType
  setCommonAnswer: (answer: Partial<CommonAnswerType>) => void

  // 압박 면접 답변 데이터
  followUpAnswer: FollowUpAnswerType
  setFollowUpAnswer: (followUpAnswer: Partial<FollowUpAnswerType>) => void

  // 상태 초기화 (필요 시 사용)
  resetInterview: () => void
}

const initialSettingInterviewOption: InterviewSettingOptionType = {
  job_type: null,
  level: null,
  question_count: null,
  title: '',
}

const initialAnswer: CommonAnswerType = {
  set_id: null,
  question_id: null,
  question_order: null,
  user_answer: '',
  audio: null,
  enable_follow_up: true,
  ai_model: null,
}

const initialFollowUpAnswer: FollowUpAnswerType = {
  answer_id: '',
  follow_up_answer: '',
  audio: null,
}

export const useInterviewStore = create<InterviewState>()(
  devtools((set) => ({
    settingInterviewOption: initialSettingInterviewOption,
    interviewQuestion: null,
    interviewResult: null,
    commonAnswer: initialAnswer,
    followUpAnswer: initialFollowUpAnswer,
    chatList: [],
    currentIndex: 0,
    isNextLoading: false,
    isResultLoading: false,
    isFollowUpLoading: false,

    setIsFollowUpLoading: (status: boolean) =>
      set((state) => ({
        isFollowUpLoading: status,
      })),

    setIsNextLoading: (status: boolean) =>
      set((state) => ({
        isNextLoading: status,
      })),

    setIsResultLoading: (status: boolean) =>
      set((state) => ({
        isResultLoading: status,
      })),

    setCurrentIndex: (index: number) =>
      set((state) => ({
        currentIndex: index,
      })),

    addChatMessage: (message) =>
      set((state) => ({
        chatList: [...state.chatList, message],
      })),

    setSettingInterviewOption: (newOption) =>
      set((state) => ({
        settingInterviewOption: {
          ...state.settingInterviewOption,
          ...newOption,
        },
      })),

    setInterviewQuestion: (question) =>
      set(() => ({
        interviewQuestion: question,
      })),

    setInterviewResult: (result) =>
      set(() => ({
        interviewResult: result,
      })),

    resetInterview: () =>
      set(() => ({
        settingInterviewOption: initialSettingInterviewOption,
        interviewResult: null,
      })),

    clearChatList: () =>
      set((state) => ({
        chatList: [],
      })),

    setCommonAnswer: (answer) =>
      set((state) => ({
        commonAnswer: {
          ...state.commonAnswer,
          ...answer,
        },
      })),

    setFollowUpAnswer: (followUpAnswer) =>
      set((state) => ({
        followUpAnswer: {
          ...state.followUpAnswer,
          ...followUpAnswer,
        },
      })),
  }))
)
