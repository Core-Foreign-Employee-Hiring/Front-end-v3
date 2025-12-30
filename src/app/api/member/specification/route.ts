import { apiCallServer } from '@/lib/api.server'
import { SpecType } from '@/types/spec'

export async function POST(request: Request) {
  try {
    const requestData: SpecType = await request.json()

    if (!requestData) {
      return Response.json({ error: 'requestData is required' }, { status: 500 })
    }

    const endpoint = `/api/v2/member/specification`

    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
