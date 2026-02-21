'use client'

import { Button } from '@/components/common'
import { deleteResume } from '@/lib/client/resume'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface ResumeButtonsProps {
  resumeId: number
}

export default function ResumeButtons({ resumeId }: ResumeButtonsProps) {
  const { t } = useTranslation('resume')
  const router = useRouter()
  return (
    <div className="flex gap-x-[7px]">
      {/*<Button customClassName="w-[60px]" variant={'outline'} size={'sm'}>*/}
      {/*  수정*/}
      {/*</Button>*/}
      <Button
        onClick={(e) => {
          e.stopPropagation()
          deleteResume(resumeId).then(() => {
            router.refresh()
          })
        }}
        customClassName="w-[60px]"
        variant={'outline'}
        size={'sm'}
      >
        {t('buttons.delete')}
      </Button>
    </div>
  )
}
