import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { SpecCareerType, SpecCertificationType, SpecEducationType, SpecLanguageSkillType, SpecType } from '@/types/spec'

// 인터페이스 정의 (제공해주신 내용 포함)
// ... (위에서 정의한 SpecType, SpecEducationType 등 인터페이스들)

interface SpecState {
  spec: SpecType

  // 전체 초기화 또는 데이터 로드
  setSpec: (spec: SpecType) => void
  resetSpec: () => void

  // 단일 객체 업데이트
  setEducation: (education: SpecEducationType) => void
  setLanguageSkill: (languageSkill: SpecLanguageSkillType) => void

  // 배열 관리 (추가, 삭제, 수정)
  addCertification: (cert: SpecCertificationType) => void
  removeCertification: (index: number) => void
  updateCertification: (index: number, cert: SpecCertificationType) => void

  addCareer: (career: SpecCareerType) => void
  removeCareer: (index: number) => void

  // 나머지 awards, experiences 등도 유사한 패턴으로 추가 가능합니다.
}

const initialSpec: SpecType = {
  education: { schoolName: '', admissionDate: '', graduationDate: '', majors: [''], earnedScore: 0, maxScore: 0 },
  languageSkill: { klptScore: 0, englishSkills: [] },
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

    setLanguageSkill: (languageSkill) =>
      set((state) => ({
        spec: { ...state.spec, languageSkill },
      })),

    // 자격증 배열 관리 예시
    addCertification: (cert) =>
      set((state) => ({
        spec: {
          ...state.spec,
          certifications: [...state.spec.certifications, cert],
        },
      })),

    removeCertification: (index) =>
      set((state) => ({
        spec: {
          ...state.spec,
          certifications: state.spec.certifications.filter((_, i) => i !== index),
        },
      })),

    updateCertification: (index, cert) =>
      set((state) => ({
        spec: {
          ...state.spec,
          certifications: state.spec.certifications.map((item, i) => (i === index ? cert : item)),
        },
      })),

    // 경력 배열 관리 예시
    addCareer: (career) =>
      set((state) => ({
        spec: {
          ...state.spec,
          careers: [...state.spec.careers, career],
        },
      })),

    removeCareer: (index) =>
      set((state) => ({
        spec: {
          ...state.spec,
          careers: state.spec.careers.filter((_, i) => i !== index),
        },
      })),
  }))
)
