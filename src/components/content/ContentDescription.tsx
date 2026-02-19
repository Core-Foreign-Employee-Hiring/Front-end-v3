'use client'

import { Label } from '@/components/common'
import { useTranslation } from 'react-i18next'

interface ContentDescriptionProps {
  description: string
}

export default function ContentDescription({ description }: ContentDescriptionProps) {
  const { t } = useTranslation(['content'])

  return (
    <div className="tablet:px-[32px] desktop:px-[40px] flex flex-col gap-y-3 px-[20px]">
      <Label label={t('detail.contentDescription.title')} type={'subtitleLg'} />
      <p className="kr-body-md">{description}</p>
    </div>
  )
}
