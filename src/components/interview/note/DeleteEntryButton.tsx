'use client'

import { Button } from '@/components/common'
import { deleteNoteEntryId } from '@/lib/client/interview'
import { useToast } from '@/components/common/toast/ToastContext'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface DeleteEntryButtonProps {
  icon?: ReactNode
  noteId: string
  entryId: string
}
export default function DeleteEntryButton({ icon, noteId, entryId }: DeleteEntryButtonProps) {
  const { t } = useTranslation(['interview', 'message'])
  const { success, error } = useToast()
  const router = useRouter()
  return (
    <Button
      onClick={async (e) => {
        e.stopPropagation()
        const result = await deleteNoteEntryId(noteId, entryId)
        if (result.success) {
          success(
            t('message:delete_interview_entry.success.title'),
            t('message:delete_interview_entry.success.description')
          )
          router.refresh()
        } else {
          error(t('message:delete_interview_entry.error.title'), t('message:delete_interview_entry.error.description'))
        }
      }}
      leftIcon={icon ? icon : null}
      size={'sm'}
      variant={'outline'}
      customClassName={'w-fit'}
    >
      {t('interview:note.buttons.entry_delete')}
    </Button>
  )
}
