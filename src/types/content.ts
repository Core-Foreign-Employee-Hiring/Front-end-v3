export interface ContentType {
  passArchiveId: number
  thumbnailUrl: string
  title: string
  oneLineReview: string
  price: number
  star: number
  starCount: number
}
export interface ContentDetailType {
  title: string
  oneLineReview: string
  star: number
  starCount: number
  thumbnailUrl: string
  price: number
  description: string
  imageUrls: string[]
  authorNickname: string
  authorProfileImage: string
  writer: boolean
}
export interface ReviewType {
  archiveReviewId: number
  star: number
  content: string
  createdAt: string
}
