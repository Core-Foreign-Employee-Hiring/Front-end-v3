import { Label, TextInput } from '@/components/common'
import { useReviewStore } from '@/store/reviewStore'

export default function ReviewInputField() {
  const { updateReviewField, reviewData } = useReviewStore((state) => state)
  return (
    <section className="flex flex-col gap-y-2">
      <Label label={'리뷰'} type={'subtitleMd'} />
      <TextInput
        value={reviewData.content}
        onChange={(e) => {
          updateReviewField('content', e.target.value)
        }}
        textType={'textArea'}
        placeholder={'리뷰를 남겨보세요.'}
      />
    </section>
  )
}
