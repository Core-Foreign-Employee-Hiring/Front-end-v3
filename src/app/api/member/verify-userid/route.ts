import { apiCallServer } from '@/lib/api.server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const userId = searchParams.get('userId')
    if (!userId) {
      return Response.json({ error: 'userId is required' }, { status: 400 })
    }

    const endpoint = `/api/v2/member/verify-userid?userId=${userId}`
    // 서버에서 백엔드 API 호출
    const { data, error } = await apiCallServer(endpoint, {
      method: 'GET',
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
