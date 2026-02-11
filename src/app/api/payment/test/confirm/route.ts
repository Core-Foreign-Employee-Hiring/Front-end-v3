import { apiCallServer } from '@/lib/api.server'

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const backendParams = new URLSearchParams()

    const archiveId = searchParams.get('archiveId') || '0'

    backendParams.append('archiveId', archiveId)

    const endpoint = `/api/v2/payment/test/confirm?${backendParams.toString()}`

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
