import { JobRoleType, NationalityType, VisaType } from '@/types/job-post'
import { GenderType } from '@/types/auth/register'

export interface ModifyProfileType {
  name: string
  email: string
  phoneNumber: string
  zipcode: string
  address1: string
  address2: string
  birthDate: string
  nationality: NationalityType
  visa: VisaType
  education: string
  gender: GenderType | null
  jobRoles: JobRoleType[] | undefined
  termsOfServiceAgreement: boolean
  personalInfoAgreement: boolean
  adInfoAgreementSmsMms: boolean
  adInfoAgreementEmail: boolean
}
