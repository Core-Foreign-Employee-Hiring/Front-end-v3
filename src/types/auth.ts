
export interface EmployeeLoginType {
  userId?: string
  password?: string
}

export interface ResponseLoginType {
  name: string
  email: string
  userId: string
  accessToken: string
  refreshToken: string
  role: 'EMPLOYER' | 'EMPLOYEE'
}
