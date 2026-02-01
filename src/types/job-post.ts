import { JobCategoryType } from '@/types/auth/register'

export interface JobPostType {
  recruitId: number
  companyImageUrl: string
  companyName: string
  recruitEndDate: string
  title: string
  jobCategories: JobCategoryType[]
  salaryType: SalaryEnumType
  salary: number
  contractType: ContractEnumType
  zipcode: string
  address1: string
  address2: string
}
export type ContractEnumType = 'INTERN' | 'REGULAR' | 'NEWCOMER' | 'EXPERIENCED' | 'CONTRACT'
export type SalaryEnumType = 'ANNUAL' | 'MONTHLY' | 'WEEKLY' | 'DAILY' | 'HOURLY' | 'ETC'
