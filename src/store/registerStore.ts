import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RegisterType } from '@/types/auth/register'

// 1. 초기 상태(Initial State) 정의
const initialState = {
  registerData: {} as Partial<RegisterType>,

  // 아이디 관련
  verifyIdErrorMessage: '',
  verifySuccessMessage: '',
  verifyIdLoading: false,

  // 비밀번호 관련
  notValidPWErrorMessage: '',
  notMatchedPWErrorMessage: '',
  checkPassword: '',

  // 전화번호 관련
  verifyPhoneErrorMessage: '',
  verifyPhoneSuccessMessage: '',
  sendSMSCodeLoading: false,
  verifySMSCodeLoading: false,
  verifyPhoneNumberCode: '',
  isVerifyPhoneNumberFieldOpen: false,

  // 이메일 관련
  verifyEmailErrorMessage: '',
  verifyEmailSuccessMessage: '',
  sendEmailCodeLoading: false,
  verifyEmailCodeLoading: false,
  verifyEmailCode: '',
  isVerifyEmailFieldOpen: false,
}

// 2. 인터페이스 정의
interface RegisterState {
  // 상태 (InitialState 타입을 그대로 가져옴)
  registerData: Partial<RegisterType>
  verifyIdErrorMessage: string
  verifySuccessMessage: string
  verifyIdLoading: boolean
  notValidPWErrorMessage: string
  notMatchedPWErrorMessage: string
  checkPassword: string
  verifyPhoneErrorMessage: string
  verifyPhoneSuccessMessage: string
  sendSMSCodeLoading: boolean
  verifySMSCodeLoading: boolean
  verifyPhoneNumberCode: string
  isVerifyPhoneNumberFieldOpen: boolean
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

  setVerifyPhoneErrorMessage: (message: string | undefined) => void
  setVerifyPhoneSuccessMessage: (message: string) => void
  setSendSMSCodeLoading: (isLoading: boolean) => void
  setVerifySMSCodeLoading: (isLoading: boolean) => void
  setVerifyPhoneNumberCode: (code: string) => void
  setIsVerifyPhoneNumberFieldOpen: (isOpen: boolean) => void

  setVerifyEmailErrorMessage: (message: string | undefined) => void
  setVerifyEmailSuccessMessage: (message: string) => void
  setSendEmailCodeLoading: (isLoading: boolean) => void
  setVerifyEmailCodeLoading: (isLoading: boolean) => void
  setVerifyEmailCode: (code: string) => void
  setIsVerifyEmailFieldOpen: (isOpen: boolean) => void

  // 초기화 액션
  resetVerifyStatus: () => void
  resetAll: () => void // 전체 초기화 추가

  // 검증 로직
  isStep1FormValid: () => boolean
  isStep2FormValid: () => boolean
}

// 3. 스토어 생성
export const useRegisterStore = create<RegisterState>()(
  devtools((set, get) => ({
    ...initialState,

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
      set({ verifyIdErrorMessage: message || '' }, false, 'register/setVerifyIdErrorMessage'),
    setVerifyIdSuccessMessage: (message) =>
      set({ verifySuccessMessage: message }, false, 'register/setVerifyIdSuccessMessage'),
    setNotValidPWErrorMessage: (message) =>
      set({ notValidPWErrorMessage: message }, false, 'register/setNotValidPWErrorMessage'),
    setNotMatchedPWErrorMessage: (message) =>
      set({ notMatchedPWErrorMessage: message }, false, 'register/setNotMatchedPWErrorMessage'),
    setCheckPassword: (password) => set({ checkPassword: password }, false, 'register/setCheckPassword'),
    setVerifyIdLoading: (isLoading) => set({ verifyIdLoading: isLoading }, false, 'register/setVerifyIdLoading'),

    // 전화번호 관련 액션
    setVerifyPhoneErrorMessage: (message) =>
      set({ verifyPhoneErrorMessage: message || '' }, false, 'register/setVerifyPhoneErrorMessage'),
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

    // 이메일 관련 액션
    setVerifyEmailErrorMessage: (message) =>
      set({ verifyEmailErrorMessage: message || '' }, false, 'register/setVerifyEmailErrorMessage'),
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

    // ★ 모든 상태를 초기값으로 리셋
    resetAll: () => set(initialState, false, 'register/resetAll'),

    // 1차 버튼 검증
    isStep1FormValid: () => {
      const state = get()
      const { registerData } = state
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

      const isNoErrors =
        !state.verifyIdErrorMessage &&
        !state.notValidPWErrorMessage &&
        !state.notMatchedPWErrorMessage &&
        !state.verifyPhoneErrorMessage &&
        !state.verifyEmailErrorMessage

      return isFieldsFilled && isNoErrors
    },

    // 2차 버튼 검증
    isStep2FormValid: () => {
      const { registerData } = get()
      const isTermsAgreed =
        registerData.over15 && registerData.termsOfServiceAgreement && registerData.personalInfoAgreement
      const isBasicInfoFilled = !!registerData.nationality && !!registerData.visa && !!registerData.education
      const isJobRolesValid = Array.isArray(registerData.jobRoles) && registerData.jobRoles.length > 0

      return isTermsAgreed && isBasicInfoFilled && isJobRolesValid
    },
  }))
)
