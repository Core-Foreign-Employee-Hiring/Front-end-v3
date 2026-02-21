'use client'

import { NoteItemBody, NoteItemHeader } from '@/components/interview'
import { OptionIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import Options from '@/components/common/Options'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import { useNoteStore } from '@/store/interview/noteStore'
import { useTranslation } from 'react-i18next'

interface NoteItemProps {
  noteId: string
  status: 'PENDING' | 'COMPLETED'
  title: string
  content: string
}

export default function NoteItem({ noteId, title, content, status }: NoteItemProps) {
  const { t } = useTranslation('interview')
  const [isOptionOpen, setIsOptionOpen] = useState(false)
  const router = useRouter()
  const onNavigation = () => {
    router.push(`/interview/note/${noteId}`)
  }

  const { toggleModal } = useModalStore((state) => state)
  const setSelectedNoteId = useNoteStore((state) => state.setSelectedNoteId)
  return (
    <div
      onClick={onNavigation}
      className="border-gray2 hover:border-gray3 flex cursor-pointer items-start justify-between rounded-[12px] border p-5 transition"
    >
      <div className="flex flex-col gap-y-2">
        <NoteItemHeader title={title} status={status} />
        <NoteItemBody content={content} />
      </div>
      <div className="relative">
        <OptionIcon
          onClick={(e) => {
            e.stopPropagation()
            setIsOptionOpen(!isOptionOpen)
          }}
          width={32}
          height={32}
        />

        {isOptionOpen ? (
          <Options customClassName={'absolute top-10'}>
            <Options.Item
              onClick={() => {
                setSelectedNoteId(noteId)
                toggleModal('isEditNoteTitleModalOpen')
              }}
              customClassName={'text-black'}
            >
              {t('note.buttons.edit_title')}
            </Options.Item>
            <Options.Item
              onClick={() => {
                setSelectedNoteId(noteId)
                toggleModal('isDeleteNoteModalOpen')
              }}
              customClassName={'text-error hover:text-error-light'}
            >
              {t('note.buttons.delete')}
            </Options.Item>
          </Options>
        ) : null}
      </div>
    </div>
  )
}
