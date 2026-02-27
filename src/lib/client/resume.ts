import { CreateResumeResponseType, CreateResumeType, ResumeSelectionType } from '@/types/resume'
import { ApiCallResult } from '@/types/common'

/**
 * 이력서 생성하기
 */
export const postResume = async (
  resumeData: CreateResumeType,
  profileImage: File | null
): Promise<CreateResumeResponseType> => {
  const formData = new FormData()

  if (profileImage) {
    formData.append('profileImage', profileImage)
  }

  formData.append('request', JSON.stringify(resumeData))

  const response = await fetch(`/api/resumes`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
  return result.data
}

/**
 * 이력서에 담을 내용 수정
 */
export const patchResume = async (resumeId: number, resumeSelection: ResumeSelectionType) => {
  const response = await fetch(`/api/resumes/${resumeId}/selections`, {
    method: 'PATCH',
    body: JSON.stringify(resumeSelection),
  })

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
  return result.data
}

/**
 * 이력서 삭제
 */
export const deleteResume = async (resumeId: number): Promise<ApiCallResult<void>> => {
  try {
    const response = await fetch(`/api/resumes/${resumeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('API 응답 에러:', error)
      return { success: false, error: error.error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('이력서 삭제 데이터', data)
    return data
  } catch (error) {
    console.error('Fetch 에러:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
