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
  editLanguageSkills: SpecLanguageSkillType[]
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

  setEditLanguageSkills: (skills: SpecLanguageSkillType[]) => void
  addEditLanguageSkill: (skill: SpecLanguageSkillType) => void

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
  removeEditLanguageSkill: (index: number) => void
  removeCertification: (index: number) => void
  removeCareer: (index: number) => void
  removeAward: (index: number) => void
  removeExperience: (index: number) => void

  // --- Update Actions (Index 기준) ---
  updateLanguageSkill: (index: number, skill: SpecLanguageSkillType) => void
  updateEditLanguageSkill: (languageSkillId: number, updatedSkill: SpecLanguageSkillType) => void

  updateCertification: (index: number, cert: SpecCertificationType) => void
  updateCareer: (index: number, career: SpecCareerType) => void
  updateAward: (index: number, award: SpecAwardType) => void
  updateExperience: (index: number, exp: SpecExperienceType) => void

  resetAllSpecs: () => void
}
export const useSpecStore = create<SpecState>()(
  devtools((set) => ({
    // 초기 상태
    education: null,
    languageSkills: [],
    editLanguageSkills: [],
    certifications: [],
    careers: [],
    awards: [],
    experiences: [],

    // --- 기존 Education Actions ---
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
          } as SpecEducationType,
        }),
        false,
        'spec/updateEducation'
      ),

    // --- LanguageSkills Actions ---
    setLanguageSkills: (languageSkills) => set({ languageSkills }, false, 'spec/setLanguageSkills'),
    setEditLanguageSkills: (editLanguageSkills) => set({ editLanguageSkills }, false, 'spec/setEditLanguageSkills'),
    addLanguageSkill: (skill) =>
      set((state) => ({ languageSkills: [...state.languageSkills, skill] }), false, 'spec/addLanguageSkill'),
    addEditLanguageSkill: (skill) =>
      set(
        (state) => ({ editLanguageSkills: [...state.editLanguageSkills, skill] }),
        false,
        'spec/addEditLanguageSkill'
      ),
    // 인덱스 기준 수정
    updateLanguageSkill: (index, skill) =>
      set(
        (state) => {
          const next = [...state.languageSkills]
          // 해당 인덱스의 객체를 새 객체로 생성하여 교체 (불변성 보장)
          next[index] = { ...next[index], ...skill }
          return { languageSkills: next }
        },
        false,
        'spec/updateLanguageSkill'
      ),
    updateEditLanguageSkill: (languageSkillId, updatedSkill) =>
      set(
        (state) => ({
          editLanguageSkills: state.editLanguageSkills.map(
            (skill) =>
              skill.languageSkillId === languageSkillId
                ? { ...skill, ...updatedSkill } // ID가 같으면 교체 (기존 값 보존을 위해 스프레드 연산자 사용)
                : skill // 다르면 기존 값 유지
          ),
        }),
        false,
        'spec/updateEditLanguageSkill'
      ),

    // --- Certifications Actions ---
    setCertifications: (certifications) => set({ certifications }, false, 'spec/setCertifications'),
    addCertification: (cert) =>
      set((state) => ({ certifications: [...state.certifications, cert] }), false, 'spec/addCertification'),
    updateCertification: (index, cert) =>
      set(
        (state) => {
          const next = [...state.certifications]
          next[index] = cert
          return { certifications: next }
        },
        false,
        'spec/updateCertification'
      ),

    // --- Careers Actions ---
    setCareers: (careers) => set({ careers }, false, 'spec/setCareers'),
    addCareer: (career) => set((state) => ({ careers: [...state.careers, career] }), false, 'spec/addCareer'),
    updateCareer: (index, career) =>
      set(
        (state) => {
          const next = [...state.careers]
          next[index] = career
          return { careers: next }
        },
        false,
        'spec/updateCareer'
      ),

    // --- Awards Actions ---
    setAwards: (awards) => set({ awards }, false, 'spec/setAwards'),
    addAward: (award) => set((state) => ({ awards: [...state.awards, award] }), false, 'spec/addAward'),
    updateAward: (index, award) =>
      set(
        (state) => {
          const next = [...state.awards]
          next[index] = award
          return { awards: next }
        },
        false,
        'spec/updateAward'
      ),

    // --- Experiences Actions ---
    setExperiences: (experiences) => set({ experiences }, false, 'spec/setExperiences'),
    addExperience: (exp) => set((state) => ({ experiences: [...state.experiences, exp] }), false, 'spec/addExperience'),
    updateExperience: (index, exp) =>
      set(
        (state) => {
          const next = [...state.experiences]
          next[index] = exp
          return { experiences: next }
        },
        false,
        'spec/updateExperience'
      ),

    // --- 삭제 관련 Actions (기존 유지) ---
    removeEducation: () => set({ education: null }, false, 'spec/removeEducation'),
    removeLanguageSkill: (index) =>
      set(
        (state) => ({ languageSkills: state.languageSkills.filter((_, i) => i !== index) }),
        false,
        'spec/removeLanguageSkill'
      ),
    removeCertification: (index) =>
      set(
        (state) => ({ certifications: state.certifications.filter((_, i) => i !== index) }),
        false,
        'spec/removeCertification'
      ),
    removeCareer: (index) =>
      set((state) => ({ careers: state.careers.filter((_, i) => i !== index) }), false, 'spec/removeCareer'),
    removeAward: (index) =>
      set((state) => ({ awards: state.awards.filter((_, i) => i !== index) }), false, 'spec/removeAward'),
    removeExperience: (index) =>
      set(
        (state) => ({ experiences: state.experiences.filter((_, i) => i !== index) }),
        false,
        'spec/removeExperience'
      ),

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
