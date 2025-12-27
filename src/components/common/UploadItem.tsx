import Image from 'next/image'
import { DeleteIcon } from '@/assets/svgComponents'

interface UploadItemProps {
  file: string | File | null
  onRemove: () => void
}

export default function UploadItem({ file, onRemove }: UploadItemProps) {
  // 1. file이 없는 경우(null) 처리
  if (!file) return null

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // 파일 객체인지 확인하는 타입 가드
  const isFileObject = (file: string | File): file is File => {
    return file instanceof File
  }

  // 이미지 여부 확인
  const isImageFile = (file: string | File): boolean => {
    if (isFileObject(file)) {
      return file.type.startsWith('image/')
    }
    // string인 경우 확장자로 판별 (필요에 따라 로직 수정 가능)
    return /\.(jpg|jpeg|png|gif|webp|svg|heif|heic)$/i.test(file)
  }

  // 이미지 URL 생성 또는 반환
  const getImageUrl = (file: string | File): string => {
    if (isFileObject(file)) {
      return URL.createObjectURL(file)
    }
    return file // string이면 이미 URL임
  }

  // 파일 이름 추출
  const getFileName = (file: string | File): string => {
    if (isFileObject(file)) return file.name
    return file.split('/').pop() || 'Unknown File' // URL에서 파일명 추출
  }

  // 확장자 추출
  const getFileExtension = (file: string | File): string => {
    const fileName = isFileObject(file) ? file.name : file
    return fileName.split('.').pop()?.toUpperCase() || 'FILE'
  }

  return (
    <div className="border-gray2 flex items-center rounded-[16px] border p-2">
      <div className="flex w-full items-center justify-between px-3 py-2">
        <div className="flex items-center gap-x-2">
          <div className="flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-[3px]">
            {isImageFile(file) ? (
              <Image
                src={getImageUrl(file)}
                alt={getFileName(file)}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="bg-gray2 flex h-full w-full items-center justify-center">
                <span className="text-gray5 text-xs font-medium">{getFileExtension(file)}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="body-md">{getFileName(file)}</p>
            {isFileObject(file) && <p className="small text-gray4">{formatFileSize(file.size)}</p>}
          </div>
        </div>
        <button className="cursor-pointer" onClick={onRemove} type="button">
          <DeleteIcon width={24} height={24} />
        </button>
      </div>
    </div>
  )
}
