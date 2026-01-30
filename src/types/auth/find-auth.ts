export interface FindIdDataType {
  name: string
  phoneNumber: string
}
export interface FindIdVerifyCodeResponseType {
  userId: string
  createdAt: string
}

export interface FindPWDataType {
  userId: string
  name: string
  email: string
}

export interface ModifyPWDataType {
  code: string
  newPassword: string
}
