import { create } from 'zustand/index'
import { devtools } from 'zustand/middleware'
import { CreateJobPostType } from '@/types/create-job-post'

interface CreateJobPostState {
  createJobPost: Partial<CreateJobPostType>
  updateCreateJobPost: <K extends keyof CreateJobPostType>(field: K, value: CreateJobPostType[K]) => void
}

const initCreateJobPostData: Partial<CreateJobPostType> = {
  directInputContractType: '',
  title: '',
}

export const useCreateJobPostStore = create<CreateJobPostState>()(
  devtools((set) => ({
    // 초기값
    createJobPost: initCreateJobPostData,
    // 공고 데이터 업데이트
    updateCreateJobPost: (field, value) =>
      set(
        (state) => ({
          createJobPost: { ...state.createJobPost, [field]: value },
        }),
        false,
        `createJobPost/update_${field}`
      ),
  }))
)
