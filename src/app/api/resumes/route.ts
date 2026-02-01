import { NextRequest } from 'next/server'
import { apiCallServer } from '@/lib/api.server'
import { CreateResumeResponseType } from '@/types/resume'

export async function POST(request: NextRequest) {
  try {
    const endpoint = `/api/v1/resumes`

    // 1. 클라이언트가 보낸 FormData 읽기
    const incomingFormData = await request.formData()
    const profileImage = incomingFormData.get('profileImage')
    const requestData = incomingFormData.get('request')

    // 2. 백엔드로 보낼 새로운 FormData 생성
    const backendFormData = new FormData()

    if (profileImage instanceof File) {
      backendFormData.append('profileImage', profileImage)
    }

    if (typeof requestData === 'string') {
      // 클라이언트에서 JSON.stringify해서 보낸 문자열 그대로 전달
      // 백엔드 사양에 따라 Blob으로 감싸서 보낼 수도 있습니다.
      backendFormData.append('request', requestData)
    }

    // 3. apiCallServer를 통해 백엔드 API 호출
    const { data, error } = await apiCallServer<CreateResumeResponseType>(endpoint, {
      method: 'POST',
      body: backendFormData, // FormData를 body에 직접 전달
      // 주의: apiCallServer 내부에서 fetch를 쓸 때,
      // FormData를 보낼 경우 'Content-Type' 헤더를 수동으로 설정하면 안 됩니다.
    })

    if (error) {
      return Response.json({ error }, { status: 400 })
    }

    return Response.json({ success: true, data })
  } catch (error) {
    console.error('BFF Error:', error)
    return Response.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}
