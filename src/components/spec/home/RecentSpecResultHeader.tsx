'use client'

import { Badge, Button } from '@/components/common'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface RecentSpecResultHeaderProps {
  specName: string | undefined
  evaluatedDate: string | undefined
  specEvaluationId: string | undefined
}

export default function RecentSpecResultHeader({
  specName,
  evaluatedDate,
  specEvaluationId,
}: RecentSpecResultHeaderProps) {
  const router = useRouter()
  const { t } = useTranslation(['spec'])

  return (
    <div className="flex items-center justify-between">
      <section className="flex items-center gap-x-2">
        <Badge>{t('spec:home.recent_spec_result.header.current_diagnosis')}</Badge>
        <h1 className="kr-subtitle-lg">{specName}</h1>
      </section>

      <section className="flex items-center gap-x-3">
        <div className="kr-body-sm text-gray4 flex items-center gap-x-2">
          <p>{t('spec:home.recent_spec_result.header.last_modified')}</p>
          <p>|</p>
          <p>{evaluatedDate}</p>
        </div>
        <Button
          onClick={() => {
            router.push(`/career/${specEvaluationId}`)
          }}
          size={'sm'}
          variant={'outline'}
          customClassName={'w-fit'}
        >
          {t('spec:home.recent_spec_result.header.view_spec')}
        </Button>
      </section>
    </div>
  )
}
