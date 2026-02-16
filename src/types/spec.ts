export interface SpecType {
  education: SpecEducationType | null
  languageSkills: SpecLanguageSkillType[] | null
  certifications: SpecCertificationType[] | null
  careers: SpecCareerType[] | null
  awards: SpecAwardType[] | null
  experiences: SpecExperienceType[] | null
}
export interface SpecEducationType {
  educationId: number
  schoolName: string
  majors: string[]
  admissionDate: string // 2025-03
  graduationDate: string
  earnedScore: number | string
  maxScore: number | string
}
export interface SpecLanguageSkillType {
  languageSkillId: number
  title: string
  score: string
}
export interface SpecCertificationType {
  certificationId: number
  certificationName: string
  acquiredDate: string
  documentUrl: string | null | File
}
export interface SpecCareerType {
  careerId: number
  companyName: string
  position: string
  startDate: string
  endDate: string | null
  contractType: ContractEnumType
  highlight: string
}
export type ContractEnumType = 'INTERN' | 'REGULAR' | 'CONTRACT' | 'ETC' | null

export interface SpecAwardType {
  awardId: number
  awardName: string
  host: string
  acquiredDate: string
  description: string
  documentUrl: string | null | File
}

export interface SpecExperienceType {
  experienceId: number
  experience: string
  beforeImprovementRate: number | string
  afterImprovementRate: number | string
  description: string
  startDate: string
  endDate: string | null
}

export interface SpecResultType {
  specEvaluationId: number
  experience: number
  certificate: number
  language: number
  career: number
  education: number
  topPercent: number
  analysis: string
}
