import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OrderType } from '@/types/order'

// 스토어에서 관리할 추가 상태 타입
interface AdditionalState {
  agreedToTerms: boolean // 이용약관 동의 여부
}

interface OrderActions {
  setOrder: (order: OrderType) => void
  resetOrder: () => void
  updateContact: (contact: Pick<OrderType, 'name' | 'phoneNumber' | 'email'>) => void
  // 이용약관 동의 업데이트 함수
  setAgreedToTerms: (agreed: boolean) => void
  toggleAgreedToTerms: () => void
}

const initialState: OrderType & AdditionalState = {
  merchantOrderId: '',
  orderName: '',
  thumbnailUrl: '',
  title: '',
  oneLineReview: '',
  quantity: 0,
  amount: '0',
  name: '',
  phoneNumber: '',
  email: '',
  agreedToTerms: false, // 초기값은 미동의
}

export const useOrderStore = create<OrderType & AdditionalState & OrderActions>()(
  persist(
    (set) => ({
      ...initialState,

      setOrder: (order) => set(() => ({ ...order })),

      resetOrder: () => set(initialState),

      updateContact: (contact) => set((state) => ({ ...state, ...contact })),

      // 특정 값으로 설정 (예: 체크박스 직접 클릭)
      setAgreedToTerms: (agreed) => set(() => ({ agreedToTerms: agreed })),

      // 현재 값을 반전 (예: 라벨 클릭 시 토글)
      toggleAgreedToTerms: () => set((state) => ({ agreedToTerms: !state.agreedToTerms })),
    }),
    {
      name: 'order-storage',
    }
  )
)
