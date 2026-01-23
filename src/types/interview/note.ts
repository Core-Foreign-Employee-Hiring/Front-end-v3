export interface AnswerNoteType {
  id: string
  title: string
  entries_count: number
  created_at: string
  updated_at: string
}

//새로운 노트를 생성할 때
export interface CreateNoteDataType {
  title: string
  entries: CreateEntryType[] | null
}

export interface CreateEntryType {
  question_id: string
  initial_answer: string
  feedback: string | null
  improvements: string | null
  final_answer: string | null
}

export interface ResponseCreateNewNoteType {
  id: string
  title: string
  created_at: string
  updated_at: string
  entries: EntryType[]
}

export interface EntryType {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  note_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  question_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  initial_answer: 'string'
  feedback: 'string'
  improvements: 'string'
  final_answer: 'string'
  created_at: '2026-01-22T07:49:02.600Z'
  updated_at: '2026-01-22T07:49:02.600Z'
}

//기존 노트에 새로운 Entry 추가할 때 쓰는 Type
export interface AnswerEntryType {
  question_id: string
  initial_answer: string
  feedback: string | null
  improvements: string | null
  final_answer: string | null
}

export interface FinalAnswerEntryType {
  noteId: string
  entryId: string
  initialAnswer: string | null
  feedback: string | null
  improvements: string | null
  final_answer: string | null
}
