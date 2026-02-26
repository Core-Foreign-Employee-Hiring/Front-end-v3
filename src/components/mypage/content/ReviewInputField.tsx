'use client'

import { Label, TextInput } from '@/components/common'
import { useReviewStore } from '@/store/reviewStore'
import { useTranslation } from 'react-i18next'

export default function ReviewInputField() {
  const { t } = useTranslation('modal')
  const { updateReviewField, reviewData } = useReviewStore((state) => state)
  return (
    <section className="flex flex-col gap-y-2">
      <Label label={t('write_review.body.review_input_field.label')} type={'subtitleMd'} />
      <TextInput
        value={reviewData.content}
        onChange={(e) => {
          updateReviewField('content', e.target.value)
        }}
        textType={'textArea'}
        placeholder={t('write_review.body.review_input_field.placeholder')}
      />
    </section>
  )
}
