import { create } from 'zustand'
import { LoginType } from '@/types/auth'
import { devtools } from 'zustand/middleware'

interface AuthState {
  login: LoginType

  setLogin: (login: LoginType) => void
}
const initialAuth = {
  login: { userId: '', password: '' },
}
export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    login: initialAuth,
    setLogin: (login: LoginType) =>
      set((state) => ({
        login: { ...state.login, login },
      })),
  }))
)
