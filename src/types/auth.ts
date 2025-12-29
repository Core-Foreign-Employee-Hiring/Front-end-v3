export interface LoginType {
  userId?: string | undefined
  password?: string | undefined
}

export interface ResponseLoginType {
  name: string
  email: string
  userId: string
  accessToken: string
  refreshToken: string
  role: 'EMPLOYER' | 'EMPLOYEE'
}
