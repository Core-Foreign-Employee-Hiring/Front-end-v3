// src/app/api/interview/sets/[setId]/complete/route.ts
import { apiCallServer } from '@/lib/api.server'
import { NextResponse } from 'next/server'

// context 타입을 Promise를 포함하도록 설정합니다.
export async function DELETE(request: Request, context: { params: Promise<{ resumeId: string }> }) {
  try {
    // Next.js 15에서는 params를 반드시 await 해야 합니다.
    const { resumeId } = await context.params
    // 만약 resumeId 문자열 "undefined"로 넘어오는 경우를 대비한 방어 로직
    if (!resumeId || resumeId === 'undefined') {
      console.error('서버 에러: setId가 누락되었습니다.')
      return NextResponse.json({ error: 'setId is required' }, { status: 400 })
    }

    const endpoint = `/api/v1/resumes/${resumeId}`
    console.log('최종 호출 API 경로:', endpoint)

    const result = await apiCallServer(endpoint, {
      method: 'DELETE',
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Route Handler Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
