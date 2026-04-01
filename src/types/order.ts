export interface OrderType {
  merchantOrderId: string
  orderName: string
  thumbnailUrl: string
  title: string
  oneLineReview: string
  quantity: number
  amount: string
  name: string
  phoneNumber: string
  email: string
}
export interface PaymentConfirmType {
  paymentKey: string
  merchantOrderId: string
  amount: string
  agreePaymentTerms: boolean
  agreePrivacyPolicy: boolean
  agreeRefundPolicy: boolean
}

export interface OrderPreviewDataType {
  thumbnailUrl: string
  title: string
  oneLineReview: string
  amount: string
  name: string
  phoneNumber: string
  email: string
}
export interface CashReceiptDataType {
  type: string
  customerIdentityNumber: string
}
