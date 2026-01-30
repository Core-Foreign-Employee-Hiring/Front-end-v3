import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { FindIdDataType, FindIdVerifyCodeResponseType, FindPWDataType, ModifyPWDataType } from '@/types/auth/find-auth'

interface FindAuthState {
  findIdData: FindIdDataType
  findIdVerifyCodeResponseData: FindIdVerifyCodeResponseType
  isIDVerifyCodeFieldOpen: boolean
  idVerifyCode: string

  findPWData: FindPWDataType
  isPWVerifyCodeFieldOpen: boolean
  pwVerifyCode: string

  modifyPWData: ModifyPWDataType
  isPasswordMatch: undefined | boolean
  isPasswordValid: undefined | boolean
  checkPassword: string

  setIsPasswordMatch: (status: boolean | undefined) => void
  setIsPasswordValid: (status: boolean | undefined) => void
  setCheckPassword: (password: string) => void

  isSendPhoneNumberCodeLoading: boolean
  isVerifyPhoneNumberCodeLoading: boolean
  isSendEmailCodeLoading: boolean
  isVerifyEmailCodeLoading: boolean
  isModifyPWLoading: boolean

  errorMessage: string | undefined
  notMatchPWErrorMessage: string | undefined
  notValidPWErrorMessage: string | undefined

  setIsPWVerifyCodeFieldOpen: (status: boolean) => void
  setIsIDVerifyCodeFieldOpen: (status: boolean) => void

  setIDVerifyCode: (code: string) => void
  setPWVerifyCode: (code: string) => void

  updateFindIdData: (field: keyof FindIdDataType, value: string) => void
  updateFindPWData: (field: keyof FindPWDataType, value: string) => void
  updateModifyPWData: (field: keyof ModifyPWDataType, value: string) => void

  setFindVerifyCodeResponseData: (response: FindIdVerifyCodeResponseType) => void

  setIsSendPhoneNumberCodeLoading: (isLoading: boolean) => void
  setIsVerifyPhoneNumberCodeLoading: (isLoading: boolean) => void
  setIsSendEmailCodeLoading: (isLoading: boolean) => void
  setIsVerifyEmailCodeLoading: (isLoading: boolean) => void
  setIsModifyPWLoading: (isLoading: boolean) => void

  setErrorMessage: (message: string | undefined) => void
  setNotMatchPWErrorMessage: (message: string | undefined) => void
  setNotValidPWErrorMessage: (message: string | undefined) => void
}

const initFindIdData = {
  name: '',
  phoneNumber: '',
}

const initFindIdVerifyCodeResponseData = {
  userId: '',
  createdAt: '',
}

const initFindPWData = {
  userId: '',
  name: '',
  email: '',
}

const initModifyPWData = {
  code: '',
  newPassword: '',
}

export const useFindAuthStore = create<FindAuthState>()(
  devtools((set) => ({
    isSendPhoneNumberCodeLoading: false,
    isVerifyPhoneNumberCodeLoading: false,
    isSendEmailCodeLoading: false,
    isVerifyEmailCodeLoading: false,
    isModifyPWLoading: false,

    errorMessage: undefined,
    notMatchPWErrorMessage: undefined,
    notValidPWErrorMessage: undefined,
    findIdData: initFindIdData,
    idVerifyCode: '',
    findIdVerifyCodeResponseData: initFindIdVerifyCodeResponseData,

    findPWData: initFindPWData,
    pwVerifyCode: '',
    isPWVerifyCodeFieldOpen: false,

    modifyPWData: initModifyPWData,
    isPasswordMatch: undefined,
    isPasswordValid: undefined,
    checkPassword: '',

    setIsPasswordMatch: (status) =>
      set(() => ({
        isPasswordMatch: status,
      })),

    setIsPasswordValid: (status) =>
      set(() => ({
        isPasswordValid: status,
      })),

    setCheckPassword: (password) =>
      set(() => ({
        checkPassword: password,
      })),

    setIsPWVerifyCodeFieldOpen: (status) =>
      set(() => ({
        isPWVerifyCodeFieldOpen: status,
      })),

    setIsIDVerifyCodeFieldOpen: (status) =>
      set(() => ({
        isIDVerifyCodeFieldOpen: status,
      })),

    setErrorMessage: (message) =>
      set(() => ({
        errorMessage: message,
      })),

    setNotMatchPWErrorMessage: (message) =>
      set(() => ({
        notMatchPWErrorMessage: message,
      })),

    setNotValidPWErrorMessage: (message) =>
      set(() => ({
        notValidPWErrorMessage: message,
      })),

    setIDVerifyCode: (code) =>
      set(() => ({
        idVerifyCode: code,
      })),

    setPWVerifyCode: (code) =>
      set(() => ({
        pwVerifyCode: code,
      })),

    updateFindIdData: (field, value) =>
      set(
        (state) => ({
          findIdData: {
            ...state.findIdData,
            [field]: value,
          },
        }),
        false,
        `auth/findId/update_${field}`
      ),
    updateModifyPWData: (field, value) =>
      set(
        (state) => ({
          modifyPWData: {
            ...state.modifyPWData,
            [field]: value,
          },
        }),
        false,
        `auth/modifyPWData//update_${field}`
      ),
    updateFindPWData: (field, value) =>
      set(
        (state) => ({
          findPWData: {
            ...state.findPWData,
            [field]: value,
          },
        }),
        false,
        `auth/findPW/update_${field}`
      ),
    setFindVerifyCodeResponseData: (response) =>
      set({ findIdVerifyCodeResponseData: response }, false, 'auth/findId/setFindVerifyCodeResponseData'),

    setIsSendPhoneNumberCodeLoading: (isLoading) =>
      set(() => ({
        isSendPhoneNumberCodeLoading: isLoading,
      })),

    setIsVerifyPhoneNumberCodeLoading: (isLoading) =>
      set(() => ({
        isVerifyPhoneNumberCodeLoading: isLoading,
      })),

    setIsSendEmailCodeLoading: (isLoading) =>
      set(() => ({
        isSendEmailCodeLoading: isLoading,
      })),

    setIsVerifyEmailCodeLoading: (isLoading) =>
      set(() => ({
        isVerifyEmailCodeLoading: isLoading,
      })),
    setIsModifyPWLoading: (isLoading) =>
      set(() => ({
        isModifyPWLoading: isLoading,
      })),
  }))
)
