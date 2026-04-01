import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CashReceiptDataType, OrderType } from '@/types/order'

// 스토어에서 관리할 상태 타입 정의
interface AdditionalState {
  agreedToTerms: boolean // 이용약관 동의 여부
  cashReceipt: Partial<CashReceiptDataType> // 현금영수증 데이터
}

interface OrderActions {
  // ✅ 주문번호(merchantOrderId) 개별 업데이트 함수 추가
  updateMerchantOrderId: (id: string) => void

  updateCashReceipt: <K extends keyof CashReceiptDataType>(field: K, value: CashReceiptDataType[K]) => void
  resetCashReceipt: () => void

  setOrder: (order: OrderType) => void
  resetOrder: () => void
  updateContact: (contact: Pick<OrderType, 'name' | 'phoneNumber' | 'email'>) => void
  setAgreedToTerms: (agreed: boolean) => void
  toggleAgreedToTerms: () => void
}

const initCashReceiptData: Partial<CashReceiptDataType> = {
  type: '',
  customerIdentityNumber: '',
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
  agreedToTerms: false,
  cashReceipt: initCashReceiptData,
}

export const useOrderStore = create<OrderType & AdditionalState & OrderActions>()(
  persist(
    (set) => ({
      ...initialState,

      // ✅ 주문번호 개별 업데이트 구현
      updateMerchantOrderId: (id) => set(() => ({ merchantOrderId: id })),

      updateCashReceipt: (field, value) =>
        set((state) => ({
          cashReceipt: {
            ...state.cashReceipt,
            [field]: value,
          },
        })),

      resetCashReceipt: () => set({ cashReceipt: initCashReceiptData }),

      setOrder: (order) => set(() => ({ ...order })),

      resetOrder: () => set(initialState),

      updateContact: (contact) => set((state) => ({ ...state, ...contact })),

      setAgreedToTerms: (agreed) => set(() => ({ agreedToTerms: agreed })),

      toggleAgreedToTerms: () => set((state) => ({ agreedToTerms: !state.agreedToTerms })),
    }),
    {
      name: 'order-storage',
    }
  )
)
