import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  SpecAwardType,
  SpecCareerType,
  SpecCertificationType,
  SpecEducationType,
  SpecExperienceType,
  SpecLanguageSkillType,
  SpecType,
} from '@/types/spec'

// 인터페이스 정의 (제공해주신 내용 포함)
// ... (위에서 정의한 SpecType, SpecEducationType 등 인터페이스들)

interface SpecState {
  spec: SpecType

  // 전체 초기화 또는 데이터 로드
  setSpec: (spec: SpecType) => void
  resetSpec: () => void

  // 단일 객체 업데이트
  setEducation: (education: SpecEducationType) => void

  // 언어 (추가, 삭제 수정)
  addLanguageSkills: (languageSkill: SpecLanguageSkillType) => void
  removeLanguageSkills: (index: number) => void
  updateLanguageSkills: (index: number, languageSkill: SpecLanguageSkillType) => void

  // 자격증 (추가, 삭제, 수정)
  addCertification: (cert: SpecCertificationType) => void
  removeCertification: (index: number) => void
  updateCertification: (index: number, cert: SpecCertificationType) => void

  addCareer: (career: SpecCareerType) => void
  removeCareer: (index: number) => void
  updateCareer: (index: number, updatedCareer: SpecCareerType) => void

  addAward: (award: SpecAwardType) => void
  removeAward: (index: number) => void
  updateAward: (index: number, updatedAward: SpecAwardType) => void

  addExperience: (experience: SpecExperienceType) => void
  removeExperience: (index: number) => void
  updateExperience: (index: number, updatedExperience: SpecExperienceType) => void
  // 나머지 awards, experiences 등도 유사한 패턴으로 추가 가능합니다.
}

const initialSpec: SpecType = {
  education: { schoolName: '', admissionDate: '', graduationDate: '', majors: [''], earnedScore: 0, maxScore: 0 },
  languageSkills: [],
  certifications: [],
  careers: [],
  awards: [],
  experiences: [],
}

export const useSpecStore = create<SpecState>()(
  devtools((set) => ({
    spec: initialSpec,

    setSpec: (spec) => set({ spec }),
    resetSpec: () => set({ spec: initialSpec }),

    setEducation: (education) =>
      set((state) => ({
        spec: { ...state.spec, education },
      })),

    // 언어
    addLanguageSkills: (languageSkill) =>
      set((state) => ({
        spec: {
          ...state.spec,
          languageSkills: [...(state.spec.languageSkills || []), languageSkill],
        },
      })),

    removeLanguageSkills: (index) =>
      set((state) => ({
        spec: {
          ...state.spec,
          languageSkills: (state.spec.languageSkills || []).filter((_, i) => i !== index),
        },
      })),

    updateLanguageSkills: (index, languageSkill) =>
      set((state) => ({
        spec: {
          ...state.spec,
          languageSkills: (state.spec.languageSkills || []).map((item, i) => (i === index ? languageSkill : item)),
        },
      })),

    // 자격증
    addCertification: (cert) =>
      set((state) => ({
        spec: {
          ...state.spec,
          certifications: [...(state.spec.certifications || []), cert],
        },
      })),

    removeCertification: (index) =>
      set((state) => ({
        spec: {
          ...state.spec,
          // 괄호로 감싸서 (기존배열 또는 빈배열)을 먼저 선택한 후 filter를 돌려야 합니다.
          certifications: (state.spec.certifications || []).filter((_, i) => i !== index),
        },
      })),

    updateCertification: (index, updatedCert) =>
      set((state) => ({
        spec: {
          ...state.spec,
          certifications:
            state.spec.certifications?.map((cert, i) => (i === index ? { ...cert, ...updatedCert } : cert)) || [],
        },
      })),

    // 경력 배열 관리
    addCareer: (career) =>
      set((state) => ({
        spec: {
          ...state.spec,
          careers: [...(state.spec.careers || []), career],
        },
      })),

    removeCareer: (index) =>
      set((state) => ({
        spec: {
          ...state.spec,
          careers: (state.spec.careers || []).filter((_, i) => i !== index),
        },
      })),

    updateCareer: (index: number, updatedCareer: SpecCareerType) =>
      set((state) => ({
        spec: {
          ...state.spec,
          careers:
            state.spec.careers?.map((career, i) => (i === index ? { ...career, ...updatedCareer } : career)) || [],
        },
      })),

    // 수상
    addAward: (award) =>
      set((state) => ({
        spec: {
          ...state.spec,
          awards: [...(state.spec.awards || []), award],
        },
      })),

    removeAward: (index) =>
      set((state) => ({
        spec: {
          ...state.spec,
          awards: (state.spec.awards || []).filter((_, i) => i !== index),
        },
      })),

    updateAward: (index: number, updatedAward: SpecAwardType) =>
      set((state) => ({
        spec: {
          ...state.spec,
          awards: state.spec.awards?.map((award, i) => (i === index ? { ...award, ...updatedAward } : award)) || [],
        },
      })),

    // 경험
    addExperience: (experience) =>
      set((state) => ({
        spec: {
          ...state.spec,
          experiences: [...(state.spec.experiences || []), experience],
        },
      })),

    removeExperience: (index) =>
      set((state) => ({
        spec: {
          ...state.spec,
          experiences: (state.spec.experiences || []).filter((_, i) => i !== index),
        },
      })),

    updateExperience: (index: number, updatedExperience: SpecExperienceType) =>
      set((state) => ({
        spec: {
          ...state.spec,
          experiences:
            state.spec.experiences?.map((experience, i) =>
              i === index ? { ...experience, ...updatedExperience } : experience
            ) || [],
        },
      })),
  }))
)
