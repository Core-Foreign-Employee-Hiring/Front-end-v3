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
  specEvaluationId: number
  // --- States ---
  education: SpecEducationType | null
  languageSkills: SpecLanguageSkillType[]
  editLanguageSkills: SpecLanguageSkillType[]

  certifications: SpecCertificationType[]
  editCertifications: SpecCertificationType[]

  careers: SpecCareerType[]
  editCareers: SpecCareerType[]

  awards: SpecAwardType[]
  editAwards: SpecAwardType[]

  experiences: SpecExperienceType[]
  editExperiences: SpecExperienceType[]

  // --- Actions ---
  setSpecEvaluationId: (specEvaluationId: number) => void

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
  setEditCertifications: (certs: SpecCertificationType[]) => void
  addCertification: (cert: SpecCertificationType) => void

  // Careers
  setCareers: (careers: SpecCareerType[]) => void
  setEditCareers: (editCareers: SpecCareerType[]) => void
  addCareer: (career: SpecCareerType) => void

  // Awards
  setAwards: (awards: SpecAwardType[]) => void
  setEditAwards: (editAwards: SpecAwardType[]) => void
  addAward: (award: SpecAwardType) => void

  // Experiences
  setExperiences: (experiences: SpecExperienceType[]) => void
  setEditExperiences: (editExperiences: SpecExperienceType[]) => void
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
  updateEditCertification: (certificationId: number, updatedCert: SpecCertificationType) => void

  updateCareer: (index: number, career: SpecCareerType) => void
  updateEditCareer: (careerId: number, updatedCareer: SpecCareerType) => void

  updateAward: (index: number, award: SpecAwardType) => void
  updateEditAward: (awardId: number, updatedAward: SpecAwardType) => void

  updateExperience: (index: number, exp: SpecExperienceType) => void
  updateEditExperience: (experienceId: number, updatedExp: SpecExperienceType) => void

  resetAllSpecs: () => void
}
export const useSpecStore = create<SpecState>()(
  devtools((set) => ({
    // 초기 상태
    specEvaluationId: 0,
    education: null,
    languageSkills: [],
    editLanguageSkills: [],

    certifications: [],
    editCertifications: [],

    careers: [],
    editCareers: [],

    awards: [],
    editAwards: [],

    experiences: [],
    editExperiences: [],

    setSpecEvaluationId: (specEvaluationId) => set({ specEvaluationId }, false, 'spec/setSpecEvaluationId'),
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
    setEditCertifications: (editCertifications) => set({ editCertifications }, false, 'spec/setEditCertifications'),

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
    updateEditCertification: (certificationId, updatedCert) =>
      set(
        (state) => ({
          editCertifications: state.editCertifications.map(
            (certification) =>
              certification.certificationId === certificationId
                ? { ...certification, ...updatedCert } // ID가 같으면 교체 (기존 값 보존을 위해 스프레드 연산자 사용)
                : certification // 다르면 기존 값 유지
          ),
        }),
        false,
        'spec/updateEditEditCertification'
      ),

    // --- Careers Actions ---
    setCareers: (careers) => set({ careers }, false, 'spec/setCareers'),
    setEditCareers: (editCareers) => set({ editCareers }, false, 'spec/setEditCareers'),
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
    updateEditCareer: (careerId, updatedCareer) =>
      set(
        (state) => ({
          editCareers: state.editCareers.map(
            (editCareer) =>
              editCareer.careerId === careerId
                ? { ...editCareer, ...updatedCareer } // ID가 같으면 교체 (기존 값 보존을 위해 스프레드 연산자 사용)
                : editCareer // 다르면 기존 값 유지
          ),
        }),
        false,
        'spec/updateEditCareer'
      ),

    // --- Awards Actions ---
    setAwards: (awards) => set({ awards }, false, 'spec/setAwards'),
    setEditAwards: (editAwards) => set({ editAwards }, false, 'spec/setEditAwards'),
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
    updateEditAward: (awardId, updatedAward) =>
      set(
        (state) => ({
          editAwards: state.editAwards.map(
            (editAward) =>
              editAward.awardId === awardId
                ? { ...editAward, ...updatedAward } // ID가 같으면 교체 (기존 값 보존을 위해 스프레드 연산자 사용)
                : editAward // 다르면 기존 값 유지
          ),
        }),
        false,
        'spec/updateEditAward'
      ),

    // --- Experiences Actions ---
    setExperiences: (experiences) => set({ experiences }, false, 'spec/setExperiences'),
    setEditExperiences: (editExperiences) => set({ editExperiences }, false, 'spec/setEditExperiences'),

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
    updateEditExperience: (experienceId, updatedExp) =>
      set(
        (state) => ({
          editExperiences: state.editExperiences.map(
            (editExperience) =>
              editExperience.experienceId === experienceId
                ? { ...editExperience, ...updatedExp } // ID가 같으면 교체 (기존 값 보존을 위해 스프레드 연산자 사용)
                : editExperience // 다르면 기존 값 유지
          ),
        }),
        false,
        'spec/updateEditExperience'
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
