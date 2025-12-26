export interface SpecType {
  education: SpecEducationType
  languageSkill: SpecLanguageSkillType
  certifications: SpecCertificationType[]
  careers: SpecCareerType[]
  awards: SpecAwardType[]
  experiences: SpecExperienceType[]
}
export interface SpecEducationType {
  schoolName: string
  majors: string[]
  admissionDate: string // 2025-03
  graduationDate: string // 2025-03
  earnedScore: number
  maxScore: number
}
export interface SpecLanguageSkillType {
  klptScore: number
  englishSkills: {
    type: string
    score: string
  }[]
}
export interface SpecCertificationType {
  certificationName: string
  acquiredYear: number
  acquiredMonth: number
  documentUrl: string
}
export interface SpecCareerType {
  companyName: string
  position: string
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
  contractType: ContractEnumType
  highlight: string
}
export type ContractEnumType = 'INTERN' | 'REGULAR' | 'NEWCOMER' | 'EXPERIENCED' | 'CONTRACT'

export interface SpecAwardType {
  awardName: string
  host: string
  acquiredYear: number
  acquiredMonth: number
  description: string
  documentUrl: string
}

export interface SpecExperienceType {
  experience: string
  beforeImprovementRate: number
  afterImprovementRate: number
  description: string
  insight: string
}
