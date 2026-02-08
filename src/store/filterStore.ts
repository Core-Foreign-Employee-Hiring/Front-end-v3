import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CarrerType, JobRoleType, LanguageType, RegionType, VisaType } from '@/types/job-post'
import { ContractEnumType } from '@/types/spec'

interface FilterState {
  // 선택된 데이터 상태 (undefined 허용)
  selectedVisaFilterContentList: VisaType[] | undefined
  selectedJobRoleFilterContentList: JobRoleType[] | undefined
  selectedLanguageFilterContentList: LanguageType[] | undefined
  selectedRegionFilterContentList: RegionType[] | undefined
  selectedContractFilter: ContractEnumType | CarrerType | undefined

  // 데이터 변경 함수
  setSelectedVisaFilterList: (visas: VisaType[] | undefined) => void
  setSelectedJobRoleFilterList: (jobRoles: JobRoleType[] | undefined) => void
  setSelectedLanguageFilterList: (languages: LanguageType[] | undefined) => void
  setSelectedRegionFilterList: (regions: RegionType[] | undefined) => void
  setContractFilter: (contract: ContractEnumType | CarrerType | undefined) => void

  // 필터 초기화
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>()(
  devtools((set) => ({
    // 초기값 설정
    selectedVisaFilterContentList: [],
    selectedJobRoleFilterContentList: [],
    selectedLanguageFilterContentList: [],
    selectedRegionFilterContentList: [],
    selectedContractFilter: undefined,

    // 배열 상태 변경 로직 (Toggle)
    setSelectedVisaFilterList: (visas) => set({ selectedVisaFilterContentList: visas }),
    setSelectedJobRoleFilterList: (jobRoles) => set({ selectedJobRoleFilterContentList: jobRoles }),
    setSelectedLanguageFilterList: (languages) => set({ selectedLanguageFilterContentList: languages }),
    setSelectedRegionFilterList: (regions) => set({ selectedRegionFilterContentList: regions }),

    // 단일 선택 변경 로직
    setContractFilter: (contract) => set({ selectedContractFilter: contract }),

    // 전체 초기화
    resetFilters: () =>
      set({
        selectedVisaFilterContentList: [],
        selectedJobRoleFilterContentList: [],
        selectedLanguageFilterContentList: [],
        selectedRegionFilterContentList: [],
        selectedContractFilter: undefined,
      }),
  }))
)
