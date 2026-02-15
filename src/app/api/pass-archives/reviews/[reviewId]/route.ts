import { NextRequest, NextResponse } from 'next/server'
import { apiCallServer } from '@/lib/api.server'

export async function GET(request: NextRequest, context: { params: Promise<{ reviewId: string }> }) {
  try {
    const { reviewId } = await context.params

    const endpoint = `/api/v1/pass-archives/reviews/${reviewId}`

    console.log('Backend Request Endpoint:', endpoint) // 디버깅용 로그

    const { data, error } = await apiCallServer(endpoint, {
      method: 'GET',
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
