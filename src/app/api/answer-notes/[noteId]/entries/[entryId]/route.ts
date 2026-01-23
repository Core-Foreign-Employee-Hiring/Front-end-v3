import { apiCallServer } from '@/lib/api.server'
import { NextResponse } from 'next/server'
import { ApiCallResult } from '@/types/common'
import { AnswerEntryType, EntryType } from '@/types/interview/note'

export async function PUT(request: Request, context: { params: Promise<{ noteId: string; entryId: string }> }) {
  try {
    const requestData: AnswerEntryType = await request.json()
    const { noteId, entryId } = await context.params

    if (!noteId || noteId === 'undefined') {
      console.error('서버 에러: noteId가 누락되었습니다.')
      return NextResponse.json({ error: 'noteId is required' }, { status: 400 })
    }

    if (!entryId || entryId === 'undefined') {
      console.error('서버 에러: entryId 누락되었습니다.')
      return NextResponse.json({ error: 'entryId is required' }, { status: 400 })
    }

    if (!requestData || Object.keys(requestData).length === 0) {
      return NextResponse.json({ error: 'requestData is required' }, { status: 400 })
    }

    const endpoint = `/answer-notes/${noteId}/entries/${entryId}`
    console.log('최종 호출 API 경로:', endpoint)

    const result = await apiCallServer<ApiCallResult<EntryType>>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(requestData),
      },
      'AI_INTERVIEW_BASE_URL'
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Route Handler Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
