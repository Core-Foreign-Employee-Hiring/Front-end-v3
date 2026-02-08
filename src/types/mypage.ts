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
