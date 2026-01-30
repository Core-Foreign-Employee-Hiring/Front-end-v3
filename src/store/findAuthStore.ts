import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { FindIdDataType, FindIdVerifyCodeResponseType } from '@/types/auth/find-auth'

interface FindAuthState {
  findIdData: FindIdDataType
  isLoading: boolean
  findIdVerifyCodeResponseData: FindIdVerifyCodeResponseType

  updateFindIdData: (field: keyof FindIdDataType, value: string) => void
  setFindVerifyCodeResponseData: (response: FindIdVerifyCodeResponseType) => void
  setIsLoading: (isLoading: boolean) => void
}

const initFindIdData = {
  name: '',
  phoneNumber: '',
}

const initFindIdVerifyCodeResponseData = {
  userId: '',
  createdAt: '',
}

export const useFindAuthStore = create<FindAuthState>()(
  devtools((set) => ({
    findIdData: initFindIdData,
    isLoading: false,
    findIdVerifyCodeResponseData: initFindIdVerifyCodeResponseData,
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
    setFindVerifyCodeResponseData: (response) =>
      set({ findIdVerifyCodeResponseData: response }, false, 'auth/findId/setFindVerifyCodeResponseData'),
    setIsLoading: (isLoading) =>
      set(() => ({
        isLoading: isLoading,
      })),
  }))
)
