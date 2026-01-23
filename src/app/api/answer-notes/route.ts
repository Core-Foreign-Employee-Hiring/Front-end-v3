import { apiCallServer } from '@/lib/api.server'
import { NextResponse } from 'next/server'
import { AnswerNoteType, CreateNoteDataType, ResponseCreateNewNoteType } from '@/types/interview/note'

export async function GET(request: Request) {
  try {
    const endpoint = `/answer-notes`

    const result = await apiCallServer<AnswerNoteType[]>(
      endpoint,
      {
        method: 'GET',
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

export async function POST(request: Request) {
  try {
    const requestData: CreateNoteDataType = await request.json()
    const endpoint = `/answer-notes`

    console.log('requestData', requestData)

    if (!requestData || Object.keys(requestData).length === 0) {
      return NextResponse.json({ error: 'requestData is required' }, { status: 400 })
    }

    const result = await apiCallServer<ResponseCreateNewNoteType>(
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
