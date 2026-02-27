'use client'

import { Button } from '@/components/common'
import { deleteResume } from '@/lib/client/resume'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'
import { useRouter } from 'next/navigation'

interface ResumeButtonsProps {
  resumeId: number
}

export default function ResumeButtons({ resumeId }: ResumeButtonsProps) {
  const { t } = useTranslation(['resume', 'message'])
  const { success, error } = useToast()
  const router = useRouter()
  return (
    <div className="flex gap-x-[7px]">
      <Button
        onClick={async (e) => {
          e.stopPropagation()
          const result = await deleteResume(resumeId)
          console.log(result)
          if (result.success) {
            success(t('message:delete_resume.success.title'), t('message:delete_resume.success.description'))
            router.refresh()
          } else {
            error(t('message:delete_resume.error.title'), t('message:delete_resume.error.description'))
            router.refresh()
          }
        }}
        customClassName="w-[60px]"
        variant={'outline'}
        size={'sm'}
      >
        {t('resume:buttons.delete')}
      </Button>
    </div>
  )
}
