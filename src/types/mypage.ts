export interface SoldArchiveType {
  paymentId: number
  archiveId: number
  title: string
  oneLineReview: string
  price: number
  soldAt: string
  isWithdrawn: boolean
  withdrawalAt: string
}

export interface PurchaseArchiveType {
  passArchiveId: number
  paymentId: number
  thumbnailUrl: string
  title: string
  oneLineReview: string
  price: number
  approvedAt: string
  isReviewed: boolean
  archiveReviewId: number
  star: number
}

export interface WriteArchiveType {
  archiveId: number
  thumbnailUrl: string
  title: string
  oneLineReview: string
  price: number
  salesCount: number
  star: number
  starCount: number
}

export interface ContentPaymentType {
  passArchiveId: number
  thumbnailUrl: string
  title: string
  merchantOrderId: string
  approvedAt: string
  paymentStatus: PaymentStatusType
  totalAmount: string
  downloaded: true
}
export type PaymentStatusType =
  | 'IN_PROGRESS'
  | 'DONE'
  | 'CANCELED'
  | 'ABORTED'
  | 'EXPIRED'
  | 'DONE_CANCELED'
  | 'TIMEOUT'
  | 'UNKNOWN'
