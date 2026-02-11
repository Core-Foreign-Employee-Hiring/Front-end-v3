import { apiCallServer } from '@/lib/api.server'
import { NextResponse } from 'next/server'

// context 타입을 Promise를 포함하도록 설정합니다.
export async function GET(request: Request, context: { params: Promise<{ archiveId: string }> }) {
  try {
    // Next.js 15에서는 params를 반드시 await 해야 합니다.
    const { archiveId } = await context.params
    // 만약 resumeId 문자열 "undefined"로 넘어오는 경우를 대비한 방어 로직
    if (!archiveId || archiveId === 'undefined') {
      console.error('서버 에러: archiveId 누락되었습니다.')
      return NextResponse.json({ error: 'archiveId is required' }, { status: 400 })
    }

    const endpoint = `/api/v1/pass-archives/${archiveId}/inquiry-url`
    console.log('최종 호출 API 경로:', endpoint)

    const result = await apiCallServer<string>(endpoint, {
      method: 'GET',
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
