import { create } from 'zustand/index'
import { devtools } from 'zustand/middleware'
import { CreateJobPostType } from '@/types/create-job-post'

interface CreateJobPostState {
  createJobPost: Partial<CreateJobPostType>
  updateCreateJobPost: <K extends keyof CreateJobPostType>(field: K, value: CreateJobPostType[K]) => void
  isStep1DataValid: () => boolean
  isStep2DataValid: () => boolean
  isStep3DataValid: () => boolean
}

const initCreateJobPostData: Partial<CreateJobPostType> = {
  directInputContractType: '',
  title: '',
}

export const useCreateJobPostStore = create<CreateJobPostState>()(
  devtools((set, get) => ({
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

    isStep1DataValid: () => {
      const { createJobPost: data } = get()

      // 1. 일반 필수 필드 검증 (문자열인 경우 비어있지 않아야 함)
      const requiredFields: (keyof CreateJobPostType)[] = [
        'title',
        'recruitStartDate',
        'recruitEndDate',
        'carrerType',
        'contractType',
        'workType',
        'workStartTime',
        'workEndTime',
        'workZipcode',
        'workAddress1',
      ]

      const hasRequiredFields = requiredFields.every((field) => {
        const val = data[field]
        return val !== undefined && val !== null && val !== ''
      })

      // 2. 배열 필드 검증 (최소 한 개 이상 선택)
      const hasRoles = Array.isArray(data.jobRoles) && data.jobRoles.length > 0
      const hasCategories = Array.isArray(data.jobCategories) && data.jobCategories.length > 0

      // 3. 근무일 패턴 검증 (세 가지 중 최소 하나 존재)
      // workDayPatternType이 존재하거나, workingDays 배열이 있거나, directInputWorkDayType이 비어있지 않거나
      const hasWorkDayInfo =
        !!data.workDayPatternType ||
        (Array.isArray(data.workingDays) && data.workingDays.length > 0) ||
        (!!data.directInputWorkDayType && data.directInputWorkDayType.trim() !== '')

      // 최종 결과 반환
      return hasRequiredFields && hasRoles && hasCategories && hasWorkDayInfo
    },

    // 2단계: 상세 내용 및 지원 방법 검증
    isStep2DataValid: () => {
      const { createJobPost: data } = get()

      // mainTasks, qualifications는 문자열 검증
      const hasMainTasks = !!data.mainTasks && data.mainTasks.trim() !== ''
      const hasQualifications = !!data.qualifications && data.qualifications.trim() !== ''

      // applicationMethod는 Enum 또는 null이므로 존재 여부 확인
      const hasApplicationMethod = data.applicationMethod !== undefined && data.applicationMethod !== null

      return hasMainTasks && hasQualifications && hasApplicationMethod
    },

    isStep3DataValid: () => {
      const { createJobPost: data } = get()

      const step3RequiredFields: (keyof CreateJobPostType)[] = ['companyName', 'companyZipcode', 'companyAddress1']

      return step3RequiredFields.every((field) => {
        const val = data[field]
        // 값이 존재하고 빈 문자열이 아닌지 확인
        return val !== undefined && val !== null && String(val).trim() !== ''
      })
    },
  }))
)
