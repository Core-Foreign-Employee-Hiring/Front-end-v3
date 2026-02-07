import {
  ApplicationMethodType,
  CarrerType,
  CompanyType,
  JobCategoryType,
  JobRoleType,
  LanguageType,
  SalaryEnumType,
  SubmissionDocumentType,
  VisaType,
  WorkDayPatternType,
  WorkingDaysType,
  WorkType,
} from '@/types/job-post'
import { ContractEnumType } from '@/types/spec'

export interface CreateJobPostType {
  title: string
  companyImageUrl: string | File | null
  companyName: string
  companyZipcode: string
  companyAddress1: string
  companyAddress2: string
  companyLatitude: number | undefined
  companyLongitude: number | undefined
  workZipcode: string
  workAddress1: string
  workAddress2: string
  workLatitude: number | undefined
  workLongitude: number | undefined
  companyType: CompanyType
  representativeName: string
  establishedDate: string
  businessType: string
  jobRoles: JobRoleType[]
  languageTypes: LanguageType[] | undefined
  visas: VisaType[] | undefined
  isAlwaysRecruiting: true
  recruitStartDate: string
  recruitEndDate: string
  directInputContractType: string
  contractType: ContractEnumType
  directInputRecruitDate: string | null
  jobCategories: JobCategoryType[]
  carrerType: CarrerType | null
  directInputCarrerType: string
  workType: WorkType | null
  directInputWorkType: string
  workDayPatternType: WorkDayPatternType
  workingDays: WorkingDaysType[]
  directInputWorkDayType: string
  workStartTime: string
  workEndTime: string
  directInputWorkTime: string
  salaryType: SalaryEnumType
  salary: number
  directInputSalaryType: string
  posterImageUrl: string | File | null
  mainTasks: string
  qualifications: string
  preferences: string
  others: string
  applicationMethod: ApplicationMethodType | null
  directInputApplicationMethod: string
  recruitPublishStatus: 'DRAFT' | 'PUBLISHED'
  websiteUrl: string
  companyIntroduction: string
  submissionDocuments: SubmissionDocumentType[]
  directInputSubmissionDocument: string
}
