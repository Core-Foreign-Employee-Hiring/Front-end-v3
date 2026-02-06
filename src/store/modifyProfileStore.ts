// @/store/useModifyProfileStore.ts (가칭)
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ModifyProfileType } from '@/types/auth/modify-profile'

interface ModifyProfileState {
  modifyProfileData: Partial<ModifyProfileType>
  updateProfile: <K extends keyof ModifyProfileType>(field: K, value: ModifyProfileType[K]) => void
  // 초기 데이터 설정을 위한 함수 추가
  setInitialData: (data: Partial<ModifyProfileType>) => void

  // --- 전화번호 관련 상태 추가 ---
  verifyPhoneNumberCode: string
  sendSMSCodeErrorMessage: string
  verifySMSCodeErrorMessage: string
  verifySMSCodeSuccessMessage: string
  sendSMSCodeLoading: boolean
  verifySMSCodeLoading: boolean
  isVerifyPhoneNumberFieldOpen: boolean

  // --- 이메일 관련 상태 추가 ---
  verifyEmailCode: string
  sendEmailCodeErrorMessage: string
  verifyEmailCodeErrorMessage: string
  verifyEmailCodeSuccessMessage: string
  sendEmailCodeLoading: boolean
  verifyEmailCodeLoading: boolean
  isVerifyEmailFieldOpen: boolean

  // --- 전화번호 관련 액션 추가 ---
  setVerifyPhoneNumberCode: (code: string) => void
  setSendSMSCodeErrorMessage: (message: string | undefined) => void
  setVerifySMSCodeErrorMessage: (message: string | undefined) => void
  setVerifySMSCodeSuccessMessage: (message: string | undefined) => void
  setSendSMSCodeLoading: (isLoading: boolean) => void
  setVerifySMSCodeLoading: (isLoading: boolean) => void
  setIsVerifyPhoneNumberFieldOpen: (isOpen: boolean) => void

  // --- 이메일 관련 액션 추가 ---
  setVerifyEmailCode: (code: string) => void
  setSendEmailCodeErrorMessage: (message: string | undefined) => void
  setVerifyEmailCodeErrorMessage: (message: string | undefined) => void
  setVerifyEmailCodeSuccessMessage: (message: string | undefined) => void
  setSendEmailCodeLoading: (isLoading: boolean) => void
  setVerifyEmailCodeLoading: (isLoading: boolean) => void
  setIsVerifyEmailFieldOpen: (isOpen: boolean) => void
}

export const useModifyProfileStore = create<ModifyProfileState>()(
  devtools((set) => ({
    modifyProfileData: {},
    // 전화번호 초기값
    verifyPhoneNumberCode: '',
    sendSMSCodeErrorMessage: '',
    verifySMSCodeErrorMessage: '',
    verifySMSCodeSuccessMessage: '',
    sendSMSCodeLoading: false,
    verifySMSCodeLoading: false,
    isVerifyPhoneNumberFieldOpen: false,

    // --- 이메일 관련 상태 초기값 ---
    verifyEmailCode: '',
    sendEmailCodeErrorMessage: '',
    verifyEmailCodeErrorMessage: '',
    verifyEmailCodeSuccessMessage: '',
    sendEmailCodeLoading: false,
    verifyEmailCodeLoading: false,
    isVerifyEmailFieldOpen: false,

    updateProfile: (field, value) =>
      set(
        (state) => ({
          modifyProfileData: { ...state.modifyProfileData, [field]: value },
        }),
        false,
        `modifyProfile/update_${field}`
      ),

    // 추가된 부분
    setInitialData: (data) => set({ modifyProfileData: data }, false, 'modifyProfile/setInitialData'),

    // --- 전화번호 관련 액션 구현 ---
    setVerifyPhoneNumberCode: (code) =>
      set({ verifyPhoneNumberCode: code }, false, 'modifyProfile/setVerifyPhoneNumberCode'),

    setSendSMSCodeErrorMessage: (message) =>
      set({ sendSMSCodeErrorMessage: message }, false, 'modifyProfile/setSendSMSCodeErrorMessage'),

    setVerifySMSCodeErrorMessage: (message) =>
      set({ verifySMSCodeErrorMessage: message }, false, 'modifyProfile/setVerifySMSCodeErrorMessage'),

    setVerifySMSCodeSuccessMessage: (message) =>
      set({ verifySMSCodeSuccessMessage: message }, false, 'modifyProfile/setVerifySMSCodeSuccessMessage'),

    setSendSMSCodeLoading: (isLoading) =>
      set({ sendSMSCodeLoading: isLoading }, false, 'modifyProfile/setSendSMSCodeLoading'),

    setVerifySMSCodeLoading: (isLoading) =>
      set({ verifySMSCodeLoading: isLoading }, false, 'modifyProfile/setVerifySMSCodeLoading'),

    setIsVerifyPhoneNumberFieldOpen: (isOpen) =>
      set({ isVerifyPhoneNumberFieldOpen: isOpen }, false, 'modifyProfile/setIsVerifyPhoneNumberFieldOpen'),

    // --- 이메일 관련 액션 구현 ---
    setVerifyEmailCode: (code) => set({ verifyEmailCode: code }, false, 'modifyProfile/setVerifyEmailCode'),

    setSendEmailCodeErrorMessage: (message) =>
      set({ sendEmailCodeErrorMessage: message }, false, 'modifyProfile/setSendEmailCodeErrorMessage'),

    setVerifyEmailCodeErrorMessage: (message) =>
      set({ verifyEmailCodeErrorMessage: message }, false, 'modifyProfile/setVerifyEmailCodeErrorMessage'),

    setVerifyEmailCodeSuccessMessage: (message) =>
      set({ verifyEmailCodeSuccessMessage: message }, false, 'modifyProfile/setVerifyEmailCodeSuccessMessage'),

    setSendEmailCodeLoading: (isLoading) =>
      set({ sendEmailCodeLoading: isLoading }, false, 'modifyProfile/setSendEmailCodeLoading'),

    setVerifyEmailCodeLoading: (isLoading) =>
      set({ verifyEmailCodeLoading: isLoading }, false, 'modifyProfile/setVerifyEmailCodeLoading'),

    setIsVerifyEmailFieldOpen: (isOpen) =>
      set({ isVerifyEmailFieldOpen: isOpen }, false, 'modifyProfile/setIsVerifyEmailFieldOpen'),
  }))
)
