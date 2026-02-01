export interface CreateResumeType {
  resumeName: string
  introduction: string
  urls: UrlType[]
}

export interface UrlType {
  urlTitle: string
  urlLink: string
}

export interface CreateResumeResponseType {
  resumeId: number
  resumeName: string
}

export interface ResumeListType {
  resumeId: number
  resumeName: string
  createdAt: string
  updatedAt: string
}

export interface ResumeSelectionType {
  includeIntroduction: boolean
  includeEducation: boolean
  includeCertificate: boolean
  includeLanguage: boolean
  includeCareer: boolean
  includeAward: boolean
  includeActivity: boolean
  includeUrls: boolean
}
export interface ResumeType {
  resumeId: number
  resumeName: string
  profileImageUrl: string
  introduction: string
  memberBasicInfo: ResumeMemberBasicInfoType
  urls: UrlType[]
  educations: ResumeEducationType[]
  certifications: ResumeCertificationType[]
  languageSkills: ResumeLanguageSkillType[]
  careers: ResumeCareerType[]
  awards: ResumeAwardType[]
  experiences: ResumeExperienceType[]
  includeIntroduction: boolean
  includeEducation: boolean
  includeCertificate: boolean
  includeLanguage: boolean
  includeCareer: boolean
  includeAward: boolean
  includeActivity: boolean
  includeUrls: boolean
}

export interface ResumeExperienceType {
  id: number
  experience: string
  beforeImprovementRate: number
  afterImprovementRate: number
  description: string
  startDate: string
  endDate: string
}
export interface ResumeAwardType {
  id: number
  awardName: string
  host: string
  acquiredDate: string
  description: string
  documentUrl: string
}
export interface ResumeCareerType {
  id: number
  companyName: string
  position: string
  startDate: string
  endDate: string
  contractType: string
  highlight: string
}
export interface ResumeLanguageSkillType {
  id: number
  title: string
  score: string
}
export interface ResumeCertificationType {
  id: number
  certificationName: string
  acquiredDate: string
  documentUrl: string
}
export interface ResumeEducationType {
  id: number
  schoolName: string
  admissionDate: string
  graduationDate: string
  earnedScore: number
  maxScore: number
}
export interface ResumeMemberBasicInfoType {
  name: string
  jobRole: string
  phoneNumber: string
  email: string
  nationality: string
  visa: string
  birthday: string
}
