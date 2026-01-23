// src/app/api/interview/sets/[setId]/complete/route.ts
import { apiCallServer } from '@/lib/api.server'
import { NextResponse } from 'next/server'
import { ApiCallResult } from '@/types/common'
import { AnswerEntryType, EntryType } from '@/types/interview/note'

// context 타입을 Promise를 포함하도록 설정합니다.
export async function POST(request: Request, context: { params: Promise<{ noteId: string }> }) {
  try {
    // Next.js 15에서는 params를 반드시 await 해야 합니다.
    const requestData: AnswerEntryType = await request.json()
    const { noteId } = await context.params

    // 만약 setId가 문자열 "undefined"로 넘어오는 경우를 대비한 방어 로직
    if (!noteId || noteId === 'undefined') {
      console.error('서버 에러: noteId가 누락되었습니다.')
      return NextResponse.json({ error: 'noteId is required' }, { status: 400 })
    }

    if (!requestData || Object.keys(requestData).length === 0) {
      return NextResponse.json({ error: 'requestData is required' }, { status: 400 })
    }

    const endpoint = `/answer-notes/${noteId}/entries`
    console.log('최종 호출 API 경로:', endpoint)

    const result = await apiCallServer<ApiCallResult<EntryType>>(
      endpoint,
      {
        method: 'POST',
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
