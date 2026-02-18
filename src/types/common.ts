export interface AIApiCallResult<T = never> {
  success: boolean
  data?: T | ErrorDetailType
  error?: string
  status?: number
}

export interface ApiCallResult<T = never> {
  success: boolean
  data?: T
  error?: string
  status?: number
}

export interface ApiResponse<T> {
  message: string
  status: number
  success: boolean
  data?: T
}

export interface PageNation<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}
export interface ErrorDetailType {
  detail: string
}
