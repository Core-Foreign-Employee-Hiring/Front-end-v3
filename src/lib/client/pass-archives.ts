/**
 * 이력서에 담을 내용 수정
 */
export const getPassArchivesDownLoad = async (archiveId: number) => {
  const response = await fetch(`/api/pass-archives/${archiveId}/download`, {
    method: 'GET',
  })

  if (!response.ok) throw new Error('Upload failed')

  const result = await response.json()
  return result.data
}
