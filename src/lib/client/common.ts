/**
 * 이미지/파일 업로드 (클라이언트 -> BFF)
 */
export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`/api/file/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
  return result.data
}
