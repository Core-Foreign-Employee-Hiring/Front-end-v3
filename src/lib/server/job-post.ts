import { ContractEnumType } from '@/types/spec'
import { ApiCallResult, ApiResponse, PageNation } from '@/types/common'
import { JobPostDetailType, JobPostType, JobRoleType, LanguageType, RegionType, VisaType } from '@/types/job-post'
import { apiCallServer, apiFetchServer } from '@/lib/api.server'

/**
 * 공고 전체 보기
 */
export const serverFetchAllJobPosts = async (params: {
  page: number
  size: number
  searchValue?: string
  contract?: ContractEnumType
  jobRoles?: JobRoleType[]
  languages?: LanguageType[]
  regions?: RegionType[]
  visas?: VisaType[]
}): Promise<ApiResponse<PageNation<JobPostType>>> => {
  const { page = 0, size = 20, searchValue, contract, jobRoles, languages, regions, visas } = params

  const searchParams = new URLSearchParams()
  searchParams.append('page', page.toString())
  searchParams.append('size', size.toString())

  if (searchValue) {
    searchParams.append('keyword', searchValue)
  }

  if (visas && visas.length > 0) {
    visas.forEach((visa) => {
      searchParams.append('visas', visa)
    })
  }

  if (regions && regions.length > 0) {
    regions.forEach((region) => {
      searchParams.append('workRegions', region)
    })
  }

  if (languages && languages.length > 0) {
    languages.forEach((language) => {
      searchParams.append('languages', language)
    })
  }

  if (jobRoles && jobRoles.length > 0) {
    jobRoles.forEach((jobRole) => {
      searchParams.append('jobRoles', jobRole)
    })
  }

  if (contract) {
    searchParams.append('contractType', contract)
  }

  const response = await apiFetchServer(`/api/v2/recruit?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
}

/**
 * 이력서 상세 조회
 */
export const fetchJobPostDetail = async (recruitId: number): Promise<ApiCallResult<JobPostDetailType>> => {
  try {
    const { data, error } = await apiCallServer(`/api/v2/recruit/${recruitId}`, {
      method: 'GET',
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('이력서 상세 조회 불러오기 실패:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
