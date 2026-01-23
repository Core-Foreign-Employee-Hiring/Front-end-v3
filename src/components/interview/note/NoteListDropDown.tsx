'use client'

import { DropDown } from '@/components/common'
import { useDropDown } from '@/hooks'
import { AnswerNoteType } from '@/types/interview/note'
import { useNoteStore } from '@/store/interview/noteStore'

interface NoteListDropDownProps {
  noteList: AnswerNoteType[] | undefined
}

export default function NoteListDropDown({ noteList }: NoteListDropDownProps) {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: '예: 자기소개 모음' })

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
