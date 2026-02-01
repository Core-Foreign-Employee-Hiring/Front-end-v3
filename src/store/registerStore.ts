import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RegisterType } from '@/types/auth/register'

interface RegisterState {
  // 상태(State)
  registerData: Partial<RegisterType>

  verifyIdErrorMessage: string
  verifySuccessMessage: string
  verifyIdLoading: boolean

  // 비밀번호 관련 상태
  notValidPWErrorMessage: string
  notMatchedPWErrorMessage: string
  checkPassword: string

  // 전화번호 관련 상태
  verifyPhoneErrorMessage: string
  verifyPhoneSuccessMessage: string
  sendSMSCodeLoading: boolean
  verifySMSCodeLoading: boolean
  verifyPhoneNumberCode: string
  isVerifyPhoneNumberFieldOpen: boolean

  // 이메일 관련 상태
  verifyEmailErrorMessage: string
  verifyEmailSuccessMessage: string
  sendEmailCodeLoading: boolean
  verifyEmailCodeLoading: boolean
  verifyEmailCode: string
  isVerifyEmailFieldOpen: boolean

  // 액션(Actions)
  updateRegister: <K extends keyof RegisterType>(field: K, value: RegisterType[K]) => void
  setVerifyIdErrorMessage: (message: string | undefined) => void
  setVerifyIdSuccessMessage: (message: string) => void
  setNotValidPWErrorMessage: (message: string) => void
  setNotMatchedPWErrorMessage: (message: string) => void
  setCheckPassword: (password: string) => void
  setVerifyIdLoading: (isLoading: boolean) => void

  // --- 전화번호 관련 액션 추가 ---
  setVerifyPhoneErrorMessage: (message: string | undefined) => void
  setVerifyPhoneSuccessMessage: (message: string) => void
  setSendSMSCodeLoading: (isLoading: boolean) => void
  setVerifySMSCodeLoading: (isLoading: boolean) => void
  setVerifyPhoneNumberCode: (code: string) => void
  setIsVerifyPhoneNumberFieldOpen: (isOpen: boolean) => void

  // --- 이메일 관련 액션 추가 ---
  setVerifyEmailErrorMessage: (message: string | undefined) => void
  setVerifyEmailSuccessMessage: (message: string) => void
  setSendEmailCodeLoading: (isLoading: boolean) => void
  setVerifyEmailCodeLoading: (isLoading: boolean) => void
  setVerifyEmailCode: (code: string) => void
  setIsVerifyEmailFieldOpen: (isOpen: boolean) => void

  resetVerifyStatus: () => void
  isStep1FormValid: () => boolean
  isStep2FormValid: () => boolean
}

export const useRegisterStore = create<RegisterState>()(
  devtools((set, get) => ({
    // 초기값 (Initial State)
    registerData: {},
    verifyIdErrorMessage: '',
    verifySuccessMessage: '',
    verifyIdLoading: false,
    notValidPWErrorMessage: '',
    notMatchedPWErrorMessage: '',
    checkPassword: '',

    // 전화번호 초기값
    verifyPhoneErrorMessage: '',
    verifyPhoneSuccessMessage: '',
    sendSMSCodeLoading: false,
    verifySMSCodeLoading: false,
    verifyPhoneNumberCode: '',
    isVerifyPhoneNumberFieldOpen: false,

    // 이메일 관련 상태
    verifyEmailErrorMessage: '',
    verifyEmailSuccessMessage: '',
    sendEmailCodeLoading: false,
    verifyEmailCodeLoading: false,
    verifyEmailCode: '',
    isVerifyEmailFieldOpen: false,

    // 회원가입 데이터 업데이트
    updateRegister: (field, value) =>
      set(
        (state) => ({
          registerData: { ...state.registerData, [field]: value },
        }),
        false,
        `register/update_${field}`
      ),

    // 아이디 & 비밀번호 액션
    setVerifyIdErrorMessage: (message) =>
      set({ verifyIdErrorMessage: message }, false, 'register/setVerifyIdErrorMessage'),
    setVerifyIdSuccessMessage: (message) =>
      set({ verifySuccessMessage: message }, false, 'register/setVerifyIdSuccessMessage'),
    setNotValidPWErrorMessage: (message) =>
      set({ notValidPWErrorMessage: message }, false, 'register/setNotValidPWErrorMessage'),
    setNotMatchedPWErrorMessage: (message) =>
      set({ notMatchedPWErrorMessage: message }, false, 'register/setNotMatchedPWErrorMessage'),
    setCheckPassword: (password) => set({ checkPassword: password }, false, 'register/setCheckPassword'),
    setVerifyIdLoading: (isLoading) => set({ verifyIdLoading: isLoading }, false, 'register/setVerifyIdLoading'),

    // --- 전화번호 관련 액션 구현 ---
    setVerifyPhoneErrorMessage: (message) =>
      set({ verifyPhoneErrorMessage: message }, false, 'register/setVerifyPhoneErrorMessage'),

    setVerifyPhoneSuccessMessage: (message) =>
      set({ verifyPhoneSuccessMessage: message }, false, 'register/setVerifyPhoneSuccessMessage'),

    setSendSMSCodeLoading: (isLoading) =>
      set({ sendSMSCodeLoading: isLoading }, false, 'register/setSendSMSCodeLoading'),

    setVerifySMSCodeLoading: (isLoading) =>
      set({ verifySMSCodeLoading: isLoading }, false, 'register/setVerifySMSCodeLoading'),

    setVerifyPhoneNumberCode: (code) =>
      set({ verifyPhoneNumberCode: code }, false, 'register/setVerifyPhoneNumberCode'),

    setIsVerifyPhoneNumberFieldOpen: (isOpen) =>
      set({ isVerifyPhoneNumberFieldOpen: isOpen }, false, 'register/setIsVerifyPhoneNumberFieldOpen'),

    // --- 이메일 관련 액션 구현 ---
    setVerifyEmailErrorMessage: (message) =>
      set({ verifyEmailErrorMessage: message }, false, 'register/setVerifyEmailErrorMessage'),

    setVerifyEmailSuccessMessage: (message) =>
      set({ verifyEmailSuccessMessage: message }, false, 'register/setVerifyEmailSuccessMessage'),

    setSendEmailCodeLoading: (isLoading) =>
      set({ sendEmailCodeLoading: isLoading }, false, 'register/setSendEmailCodeLoading'),

    setVerifyEmailCodeLoading: (isLoading) =>
      set({ verifyEmailCodeLoading: isLoading }, false, 'register/setVerifyEmailCodeLoading'),

    setVerifyEmailCode: (code) => set({ verifyEmailCode: code }, false, 'register/setVerifyEmailCode'),

    setIsVerifyEmailFieldOpen: (isOpen) =>
      set({ isVerifyEmailFieldOpen: isOpen }, false, 'register/setIsVerifyEmailFieldOpen'),

    // 상태 초기화
    resetVerifyStatus: () =>
      set(
        {
          verifyIdErrorMessage: '',
          verifyIdLoading: false,
          verifyPhoneErrorMessage: '',
          sendSMSCodeLoading: false,
          verifySMSCodeLoading: false,
        },
        false,
        'register/resetVerifyStatus'
      ),

    //1차 버튼 검증
    isStep1FormValid: () => {
      const state = get()
      const { registerData } = state

      // 1. 필수 입력 필드 검증 (값이 존재하고 길이가 0보다 커야 함)
      const requiredFields: (keyof RegisterType)[] = [
        'userId',
        'email',
        'password',
        'name',
        'phoneNumber',
        'zipcode',
        'address1',
      ]

      const isFieldsFilled = requiredFields.every((field) => {
        const value = registerData[field]
        return typeof value === 'string' && value.trim().length > 0
      })

      // 2. 에러 메시지 검증 (모든 에러 메시지가 비어 있어야 함)
      const isNoErrors =
        !state.verifyIdErrorMessage &&
        !state.notValidPWErrorMessage &&
        !state.notMatchedPWErrorMessage &&
        !state.verifyPhoneErrorMessage &&
        !state.verifyEmailErrorMessage

      return isFieldsFilled && isNoErrors
    },

    isStep2FormValid: () => {
      const { registerData } = get()

      // 1. 필수 약관 동의 검증 (모두 true여야 함)
      const isTermsAgreed =
        registerData.over15 && registerData.termsOfServiceAgreement && registerData.personalInfoAgreement

      // 2. 필수 선택값 검증 (값이 존재해야 함)
      const isBasicInfoFilled = !!registerData.nationality && !!registerData.visa && !!registerData.education

      // 3. 직무(jobRoles) 검증 (리스트이며 길이가 0보다 커야 함)
      const isJobRolesValid = Array.isArray(registerData.jobRoles) && registerData.jobRoles.length > 0

      // 모든 조건 충족 시 true 반환
      return isTermsAgreed && isBasicInfoFilled && isJobRolesValid
    },
  }))
)
