import { JobRoleType, NationalityType, VisaType } from '@/types/job-post'

export interface RegisterType {
  userId: string | undefined
  email: string
  password: string
  name: string
  phoneNumber: string
  zipcode: string
  address1: string
  address2: string | null
  birthDate: string | null
  gender: GenderType | null
  nationality: NationalityType | null
  education: string
  visa: VisaType
  jobRoles: JobRoleType[] | undefined
  termsOfServiceAgreement: boolean
  personalInfoAgreement: boolean
  adInfoAgreementSmsMms: boolean
  adInfoAgreementEmail: boolean
  over15: boolean
}

export type GenderType = 'FEMALE' | 'MALE' | 'NULL'
