export interface LoginType {
  userId?: string | undefined | null
  password?: string | undefined | null
}

export interface ResponseLoginType {
  name: string
  email: string
  userId: string
  accessToken: string
  refreshToken: string
  role: 'EMPLOYER' | 'EMPLOYEE'
}
