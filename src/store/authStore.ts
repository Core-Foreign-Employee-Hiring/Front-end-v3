import { create } from 'zustand'
import { LoginType } from '@/types/auth' // SignupType이 있다고 가정
import { devtools } from 'zustand/middleware'

interface AuthState {
  // 상태 구조: login과 signup을 각각 분리해서 관리하는 것이 가장 깔끔합니다.
  login: LoginType
  // signup: SignupType

  setLogin: (payload: Partial<LoginType>) => void
  // setSignup: (payload: Partial<SignupType>) => void
}

const initialAuth = {
  login: { userId: '', password: '' },
  // signup: { userId: '', password: '', email: '', nickname: '' }, // 예시
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    // 1. 초기값 할당
    login: initialAuth.login,
    // signup: initialAuth.signup,

    // 2. Login 업데이트 로직
    setLogin: (payload) =>
      set((state) => ({
        // state.login의 기존 값을 유지하면서 payload(입력값)만 덮어씀
        login: { ...state.login, ...payload },
      })),

    // 3. Signup 업데이트 로직 (나중에 쓰실 것)
    // setSignup: (payload) =>
    //   set((state) => ({
    //     signup: { ...state.signup, ...payload },
    //   })),
  }))
)
