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

export interface UserInfoType {
  email: string | undefined
  name: string | undefined
  role: string | undefined
  userId: string | undefined
}
