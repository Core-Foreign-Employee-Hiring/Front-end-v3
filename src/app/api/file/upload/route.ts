import { apiCallServer } from '@/lib/api.server'

export async function POST(request: Request) {
  try {
    // 1. 클라이언트 요청에서 FormData 추출
    const incomingFormData = await request.formData()
    const file = incomingFormData.get('file')
    console.log('file', file)

    if (!file || !(file instanceof File)) {
      return Response.json({ error: 'File is required' }, { status: 400 })
    }

    // 2. 백엔드로 보낼 새로운 FormData 생성
    const formDataForBackend = new FormData()
    formDataForBackend.append('file', file)

    const endpoint = `/api/v1/file/upload`

    // 3. apiCallServer 호출
    // 위에서 apiFetchServer를 수정했으므로,
    // 여기서 별도의 headers를 추가하지 않고 body에 formData만 넘깁니다.
    const { data, error, success } = await apiCallServer(endpoint, {
      method: 'POST',
      body: formDataForBackend, // JSON.stringify 하지 마세요!
    })

    if (!success) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
