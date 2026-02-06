import {
  ApplicationMethodType,
  CompanyType,
  JobCategoryType,
  JobRoleType,
  LanguageType,
  SalaryEnumType,
  VisaType,
  WorkDaysType,
  WorkType,
} from '@/types/job-post'
import { ContractEnumType } from '@/types/spec'

export interface CreateJobPostType {
  title: string
  companyImageUrl: string
  companyName: string
  zipcode: string
  address1: string
  address2: string
  companyType: CompanyType
  representativeName: string
  establishedDate: string
  businessType: string
  jobRoles: JobRoleType[]
  languageTypes: LanguageType[]
  visas: VisaType[]
  isAlwaysRecruiting: true
  recruitStartDate: string
  recruitEndDate: string
  contractType: ContractEnumType
  directInputContractType: string
  jobCategories: JobCategoryType[]
  workType: WorkType
  directInputWorkType: string
  workDayType: WorkDaysType
  directInputWorkDayType: string
  workStartTime: string
  workEndTime: string
  directInputWorkTime: string
  salaryType: SalaryEnumType
  salary: number
  directInputSalaryType: string
  posterImageUrl: string
  mainTasks: string
  qualifications: string
  preferences: string
  others: string
  applicationMethod: ApplicationMethodType
  directInputApplicationMethod: string
  recruitPublishStatus: 'DRAFT' | 'PUBLISHED'
}
