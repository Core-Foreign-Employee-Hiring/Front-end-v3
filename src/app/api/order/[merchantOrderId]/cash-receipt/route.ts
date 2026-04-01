import { apiCallServer } from '@/lib/api.server'
import { NextRequest, NextResponse } from 'next/server'

// context 타입을 Promise를 포함하도록 설정합니다.
export async function GET(request: Request, context: { params: Promise<{ merchantOrderId: string }> }) {
  try {
    // Next.js 15에서는 params를 반드시 await 해야 합니다.
    const { merchantOrderId } = await context.params
    // 만약 resumeId 문자열 "undefined"로 넘어오는 경우를 대비한 방어 로직
    if (!merchantOrderId || merchantOrderId === 'undefined') {
      console.error('서버 에러: merchantOrderId 누락되었습니다.')
      return NextResponse.json({ error: 'merchantOrderId is required' }, { status: 400 })
    }

    const endpoint = `/api/v2/order/${merchantOrderId}/cash-receipt`
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

export async function POST(request: NextRequest, context: { params: Promise<{ merchantOrderId: string }> }) {
  try {
    const requestData: {
      type: string
      customerIdentityNumber: string
    } = await request.json()
    if (!requestData) {
      return Response.json({ error: 'requestData is required' }, { status: 500 })
    }
    // Next.js 15에서는 params를 반드시 await 해야 합니다.
    const { merchantOrderId } = await context.params
    // 만약 resumeId 문자열 "undefined"로 넘어오는 경우를 대비한 방어 로직
    if (!merchantOrderId || merchantOrderId === 'undefined') {
      console.error('서버 에러: merchantOrderId 누락되었습니다.')
      return NextResponse.json({ error: 'merchantOrderId is required' }, { status: 400 })
    }

    const endpoint = `/api/v2/order/${merchantOrderId}/cash-receipt`
    console.log('최종 호출 API 경로:', endpoint)

    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Route Handler Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
