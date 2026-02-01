import { ContractEnumType } from '@/types/spec'
import { JobRoleType, LanguageType, RegionType, VisaType } from '@/types/auth/register'
import { ApiResponse, PageNation } from '@/types/common'
import { JobPostType } from '@/types/job-post'
import { apiFetchServer } from '@/lib/api.server'

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
