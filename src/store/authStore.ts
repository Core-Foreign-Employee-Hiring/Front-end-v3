import { create } from 'zustand'
import { LoginType } from '@/types/auth'
import { devtools } from 'zustand/middleware'

interface AuthState {
  login: LoginType
  loading: boolean
  isIdSaved: boolean
  error: string | null // 에러가 없을 땐 null, 있을 땐 에러 메시지(string)

  setLogin: (payload: Partial<LoginType>) => void
  setLoading: (isLoading: boolean) => void
  setIsIdSaved: (isSaved: boolean) => void
  setError: (errorMessage: string | null) => void
  resetAuthStatus: () => void // 로딩과 에러 상태를 초기화하는 편의 함수
}

const initialAuth = {
  login: { userId: '', password: '' },
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    // 초기값
    login: initialAuth.login,
    loading: false,
    error: null,
    isIdSaved: false,

    // 1. 로그인 정보 업데이트 (아이디/비번 입력 시)
    setLogin: (payload) =>
      set((state) => ({
        login: { ...state.login, ...payload },
      })),

    // 2. 로딩 상태 제어 (true/false)
    setLoading: (isLoading) =>
      set(() => ({
        loading: isLoading,
      })),

    setIsIdSaved: (isSaved) =>
      set(() => ({
        isIdSaved: isSaved,
      })),

    // 3. 에러 상태 제어 (메시지 입력 또는 null로 초기화)
    setError: (errorMessage) =>
      set(() => ({
        error: errorMessage,
      })),

    // 4. 상태 초기화 (로그인 시도 전이나 페이지 나갈 때 사용)
    resetAuthStatus: () =>
      set(() => ({
        loading: false,
        error: null,
      })),
  }))
)
