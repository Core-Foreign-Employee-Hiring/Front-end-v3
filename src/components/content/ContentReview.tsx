import { Label } from '@/components/common'
import ContentReviewList from '@/components/content/ContentReviewList'
import Rating from '@/components/content/Rating'

interface ContentReviewProps {
  archiveId: number
  star: number
  starCount: number
}

export default function ContentReview({ archiveId, star, starCount }: ContentReviewProps) {
  return (
    <div className="tablet:px-[32px] desktop:px-[40px] flex flex-col gap-y-[32px] px-5">
      <div className="flex flex-col gap-y-3">
        <Label label={'리뷰'} type={'subtitleLg'} />
        <div className="flex items-center gap-x-[40px] px-[20px]">
          <div className="flex items-end gap-x-1">
            <Label label={`${starCount}`} type={'subtitleLg'} />
            <Label label={'/ 5'} type={'titleSm'} labelColor={'text-gray4'} />
          </div>
          <div className="border-gray2 h-[40px] border-r-[1px]" />
          <div className="flex flex-col items-center gap-y-2">
            <Rating star={1.2} />
            <p className="kr-badge-md text-gray5">{starCount}명의 후기</p>
          </div>
        </div>
      </div>
      <ContentReviewList archiveId={archiveId} />
    </div>
  )
}
