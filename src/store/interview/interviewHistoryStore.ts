import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface InterviewHistoryState {}

export const useInterviewHistoryStore = create<InterviewHistoryState>()(devtools((set) => ({})))
