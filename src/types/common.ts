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
