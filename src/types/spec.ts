export interface SpecType {
  education: SpecEducationType | null
  languageSkills: SpecLanguageSkillType[] | null
  certifications: SpecCertificationType[] | null
  careers: SpecCareerType[] | null
  awards: SpecAwardType[] | null
  experiences: SpecExperienceType[] | null
}
export interface SpecEducationType {
  schoolName: string
  majors: string[]
  admissionDate: string // 2025-03
  graduationDate: string | null // 2025-03
  earnedScore: number
  maxScore: number
}
export interface SpecLanguageSkillType {
  title: string
  score: string
}
export interface SpecCertificationType {
  certificationName: string
  acquiredDate: string
  documentUrl: string | null | File
}
export interface SpecCareerType {
  companyName: string
  position: string
  startDate: string
  endDate: string | null
  contractType: ContractEnumType
  highlight: string
}
export type ContractEnumType = 'INTERN' | 'REGULAR' | 'NEWCOMER' | 'EXPERIENCED' | 'CONTRACT'

export interface SpecAwardType {
  awardName: string
  host: string
  acquiredDate: string
  description: string
  documentUrl: string
}

export interface SpecExperienceType {
  experience: string
  beforeImprovementRate: number
  afterImprovementRate: number
  description: string
  startDate: string
  endDate: string | null
}
