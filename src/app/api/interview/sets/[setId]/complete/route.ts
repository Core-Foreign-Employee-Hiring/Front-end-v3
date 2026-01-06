// src/app/api/interview/sets/[setId]/complete/route.ts
import { apiCallServer } from '@/lib/api.server'
import { InterviewResultType } from '@/types/interview'
import { NextResponse } from 'next/server'

// context 타입을 Promise를 포함하도록 설정합니다.
export async function POST(request: Request, context: { params: Promise<{ setId: string }> }) {
  try {
    // Next.js 15에서는 params를 반드시 await 해야 합니다.
    const { setId } = await context.params

    // 만약 setId가 문자열 "undefined"로 넘어오는 경우를 대비한 방어 로직
    if (!setId || setId === 'undefined') {
      console.error('서버 에러: setId가 누락되었습니다.')
      return NextResponse.json({ error: 'setId is required' }, { status: 400 })
    }

    const endpoint = `/interview/sets/${setId}/complete`
    console.log('최종 호출 API 경로:', endpoint)

    const result = await apiCallServer<InterviewResultType>(
      endpoint,
      {
        method: 'POST',
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
