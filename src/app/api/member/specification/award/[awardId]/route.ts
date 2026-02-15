import { NextRequest, NextResponse } from 'next/server'
import { apiCallServer } from '@/lib/api.server'
import { SpecAwardType } from '@/types/spec'

export async function PUT(request: NextRequest, context: { params: Promise<{ awardId: string }> }) {
  try {
    const { awardId } = await context.params

    const requestData: SpecAwardType = await request.json()

    if (!requestData) {
      return Response.json({ error: 'requestData is required' }, { status: 500 })
    }

    const endpoint = `/api/v2/member/specification/award/${awardId}`

    const { data, error } = await apiCallServer(endpoint, {
      method: 'PUT',
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
