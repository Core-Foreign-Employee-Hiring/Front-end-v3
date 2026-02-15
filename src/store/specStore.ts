import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  SpecAwardType,
  SpecCareerType,
  SpecCertificationType,
  SpecEducationType,
  SpecExperienceType,
  SpecLanguageSkillType,
} from '@/types/spec'

interface SpecState {
  // --- States ---
  education: SpecEducationType | null
  languageSkills: SpecLanguageSkillType[]
  certifications: SpecCertificationType[]
  careers: SpecCareerType[]
  awards: SpecAwardType[]
  experiences: SpecExperienceType[]

  // --- Actions ---
  // Education
  setEducation: (data: SpecEducationType | null) => void
  updateEducation: <K extends keyof SpecEducationType>(field: K, value: SpecEducationType[K]) => void

  // LanguageSkills
  setLanguageSkills: (skills: SpecLanguageSkillType[]) => void
  addLanguageSkill: (skill: SpecLanguageSkillType) => void

  // Certifications
  setCertifications: (certs: SpecCertificationType[]) => void
  addCertification: (cert: SpecCertificationType) => void

  // Careers
  setCareers: (careers: SpecCareerType[]) => void
  addCareer: (career: SpecCareerType) => void

  // Awards
  setAwards: (awards: SpecAwardType[]) => void
  addAward: (award: SpecAwardType) => void

  // Experiences
  setExperiences: (experiences: SpecExperienceType[]) => void
  addExperience: (exp: SpecExperienceType) => void

  // Reset
  removeEducation: () => void
  removeLanguageSkill: (index: number) => void
  removeCertification: (index: number) => void
  removeCareer: (index: number) => void
  removeAward: (index: number) => void
  removeExperience: (index: number) => void

  resetAllSpecs: () => void
}

export const useSpecStore = create<SpecState>()(
  devtools((set) => ({
    // 초기 상태 (개별적으로 선언)
    education: null,
    languageSkills: [],
    certifications: [],
    careers: [],
    awards: [],
    experiences: [],

    // --- Education Actions ---
    setEducation: (education) => set({ education }, false, 'spec/setEducation'),
    updateEducation: <K extends keyof SpecEducationType>(field: K, value: SpecEducationType[K]) =>
      set(
        (state) => ({
          education: {
            ...(state.education || {
              schoolName: '',
              majors: [],
              admissionDate: '',
              graduationDate: '',
              earnedScore: '',
              maxScore: '',
            }),
            [field]: value,
          } as SpecEducationType, // 완성된 객체임을 보장
        }),
        false,
        'spec/updateEducation'
      ),

    // --- LanguageSkills Actions ---
    setLanguageSkills: (languageSkills) => set({ languageSkills }, false, 'spec/setLanguageSkills'),
    addLanguageSkill: (skill) =>
      set((state) => ({ languageSkills: [...state.languageSkills, skill] }), false, 'spec/addLanguageSkill'),

    // --- Certifications Actions ---
    setCertifications: (certifications) => set({ certifications }, false, 'spec/setCertifications'),
    addCertification: (cert) =>
      set((state) => ({ certifications: [...state.certifications, cert] }), false, 'spec/addCertification'),

    // --- Careers Actions ---
    setCareers: (careers) => set({ careers }, false, 'spec/setCareers'),
    addCareer: (career) => set((state) => ({ careers: [...state.careers, career] }), false, 'spec/addCareer'),

    // --- Awards Actions ---
    setAwards: (awards) => set({ awards }, false, 'spec/setAwards'),
    addAward: (award) => set((state) => ({ awards: [...state.awards, award] }), false, 'spec/addAward'),

    // --- Experiences Actions ---
    setExperiences: (experiences) => set({ experiences }, false, 'spec/setExperiences'),
    addExperience: (exp) => set((state) => ({ experiences: [...state.experiences, exp] }), false, 'spec/addExperience'),

    // --- Education 삭제 (null로 초기화) ---
    removeEducation: () => set({ education: null }, false, 'spec/removeEducation'),

    // --- 배열 항목 삭제 (Index 기준) ---
    removeLanguageSkill: (index) =>
      set(
        (state) => ({
          languageSkills: state.languageSkills.filter((_, i) => i !== index),
        }),
        false,
        'spec/removeLanguageSkill'
      ),

    removeCertification: (index) =>
      set(
        (state) => ({
          certifications: state.certifications.filter((_, i) => i !== index),
        }),
        false,
        'spec/removeCertification'
      ),

    removeCareer: (index) =>
      set(
        (state) => ({
          careers: state.careers.filter((_, i) => i !== index),
        }),
        false,
        'spec/removeCareer'
      ),

    removeAward: (index) =>
      set(
        (state) => ({
          awards: state.awards.filter((_, i) => i !== index),
        }),
        false,
        'spec/removeAward'
      ),

    removeExperience: (index) =>
      set(
        (state) => ({
          experiences: state.experiences.filter((_, i) => i !== index),
        }),
        false,
        'spec/removeExperience'
      ),

    // --- Reset All ---
    resetAllSpecs: () =>
      set(
        {
          education: null,
          languageSkills: [],
          certifications: [],
          careers: [],
          awards: [],
          experiences: [],
        },
        false,
        'spec/resetAllSpecs'
      ),
  }))
)
