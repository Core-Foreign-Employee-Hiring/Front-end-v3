'use client'

import { DropDown } from '@/components/common'
import { useDropDown } from '@/hooks'
import { AnswerNoteType } from '@/types/interview/note'
import { useNoteStore } from '@/store/interview/noteStore'
import { useTranslation } from 'react-i18next'

interface NoteListDropDownProps {
  noteList: AnswerNoteType[] | undefined
}

export default function NoteListDropDown({ noteList }: NoteListDropDownProps) {
  const { t } = useTranslation('modal')
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: t('save_answer_note.body.note_list_drop_down.label') })

  const setSelectedNoteId = useNoteStore((state) => state.setSelectedNoteId)

  return (
    <DropDown
      selectedValue={selectedDropDownContent}
      defaultValue={initialValue}
      isDropDownOpen={isDropDownOpen}
      dropDownOpenHandler={dropDownOpenHandler}
    >
      {noteList?.map((note) => (
        <DropDown.DropBoxOptionItem
          key={note.title}
          onClick={() => {
            setSelectedNoteId(note.id)
            selectedDropDownHandler(note.title)
            setIsDropDownOpen(false)
          }}
        >
          {note.title}
        </DropDown.DropBoxOptionItem>
      ))}
    </DropDown>
  )
}
