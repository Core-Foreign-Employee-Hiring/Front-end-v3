import { CreateResumeResponseType, CreateResumeType, ResumeSelectionType } from '@/types/resume'

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
export const deleteResume = async (resumeId: number) => {
  const response = await fetch(`/api/resumes/${resumeId}`, {
    method: 'DELETE',
  })

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
  return result.data
}
