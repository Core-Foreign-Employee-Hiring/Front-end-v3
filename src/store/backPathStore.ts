import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BackPathState {
  backPath: string | undefined
  setBackPath: (backPath: string | undefined) => void
}

export const useBackPathStore = create<BackPathState>()(
  devtools(
    persist(
      (set) => ({
        backPath: undefined,

        setBackPath: (backPath) => set({ backPath }),
      }),
      {
        name: 'back-path-storage', // 로컬 스토리지에 저장될 키 이름
      }
    )
  )
)
