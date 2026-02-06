import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ModifyAuthState {
  newUserId: string
  newPassword: string
  newUserIdErrorMessage: string | undefined
  newPasswordErrorMessage: string | undefined

  setNewUserId: (newUserId: string) => void
  setNewPassword: (newPassword: string) => void
  setNewUserIdErrorMessage: (message: string | undefined) => void
  setNewPasswordErrorMessage: (message: string | undefined) => void
}

export const useModifyAuthStore = create<ModifyAuthState>()(
  devtools((set) => ({
    newUserId: '',
    newPassword: '',
    newUserIdErrorMessage: '',
    newPasswordErrorMessage: '',
    setNewUserId: (newUserId) => set({ newUserId: newUserId }, false, 'modifyAuth/setNewUserId'),
    setNewPassword: (newPassword) => set({ newPassword: newPassword }, false, 'modifyAuth/setNewPassword'),
    setNewUserIdErrorMessage: (message) =>
      set({ newUserIdErrorMessage: message }, false, 'modifyAuth/setNewUserIdErrorMessage'),
    setNewPasswordErrorMessage: (message) =>
      set({ newPasswordErrorMessage: message }, false, 'modifyAuth/setNewPasswordErrorMessage'),
  }))
)
