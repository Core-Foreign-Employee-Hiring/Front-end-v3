import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CreateResumeResponseType, CreateResumeType, ResumeSelectionType } from '@/types/resume'

interface ResumeState {
  createResume: CreateResumeType
  resumeProfileFile: File | null
  selectedType: 'ver1' | 'ver2'
  createResumeResponse: CreateResumeResponseType
  resumeSelection: ResumeSelectionType

  setSelectedType: (type: 'ver1' | 'ver2') => void
  updateCreateResumeField: (field: keyof Omit<CreateResumeType, 'urls'>, value: string) => void
  setCreateResumeResponse: (response: CreateResumeResponseType) => void
  updateResumeSelection: (field: keyof ResumeSelectionType, value: boolean) => void
  setProfileFile: (file: File | null) => void
  setAllResumeSelection: (value: boolean) => void // 전체 선택/해제용 액션 추가
  // URL 배열 관련 액션
  addUrl: () => void
  updateUrl: (index: number, field: 'urlTitle' | 'urlLink', value: string) => void
  removeUrl: (index: number) => void
}
const initialResumeData: CreateResumeType = {
  resumeName: '',
  introduction: '',
  template: 'ver1',
  urls: [{ urlTitle: '', urlLink: '' }], // 기본적으로 하나의 입력칸은 제공하는 편이 좋습니다.
}
const initialSelection: ResumeSelectionType = {
  includeIntroduction: true,
  includeEducation: false,
  includeCertificate: false,
  includeLanguage: false,
  includeCareer: false,
  includeAward: false,
  includeActivity: false,
  includeUrls: true,
}

export const useResumeStore = create<ResumeState>()(
  devtools((set) => ({
    createResume: initialResumeData,
    resumeSelection: initialSelection,
    resumeProfileFile: null,
    selectedType: 'ver1',

    setAllResumeSelection: (value) =>
      set(
        (state) => ({
          resumeSelection: {
            includeIntroduction: value,
            includeEducation: value,
            includeCertificate: value,
            includeLanguage: value,
            includeCareer: value,
            includeAward: value,
            includeActivity: value,
            includeUrls: value,
          },
        }),
        false,
        'resume/setAllSelection'
      ),
    updateResumeSelection: (field, value) =>
      set(
        (state) => ({
          resumeSelection: {
            ...state.resumeSelection,
            [field]: value,
          },
        }),
        false,
        `resume/updateSelection_${field}`
      ),
    setSelectedType: (type) => set({ selectedType: type }, false, 'resume/setSelectedType'),
    setCreateResumeResponse: (response) =>
      set({ createResumeResponse: response }, false, 'resume/setCreateResumeResponse'),
    setProfileFile: (file) =>
      set(
        (state) => ({
          // createResume 내부가 아니라, 루트의 resumeProfileFile을 업데이트
          resumeProfileFile: file,
        }),
        false,
        'resume/setProfileFile'
      ),
    // 이름(resumeName)이나 자기소개(introduction) 수정
    updateCreateResumeField: (field, value) =>
      set(
        (state) => ({
          createResume: {
            ...state.createResume,
            [field]: value,
          },
        }),
        false,
        `resume/update_${field}`
      ),
    addUrl: () =>
      set(
        (state) => ({
          createResume: {
            ...state.createResume,
            urls: [...state.createResume.urls, { urlTitle: '', urlLink: '' }],
          },
        }),
        false,
        'resume/addUrl'
      ),
    updateUrl: (index, field, value) =>
      set(
        (state) => {
          const newUrls = [...state.createResume.urls]
          newUrls[index] = { ...newUrls[index], [field]: value }
          return {
            createResume: {
              ...state.createResume,
              urls: newUrls,
            },
          }
        },
        false,
        'resume/updateUrl'
      ),
    removeUrl: (index) =>
      set(
        (state) => ({
          createResume: {
            ...state.createResume,
            urls: state.createResume.urls.filter((_, i) => i !== index),
          },
        }),
        false,
        'resume/removeUrl'
      ),
  }))
)
