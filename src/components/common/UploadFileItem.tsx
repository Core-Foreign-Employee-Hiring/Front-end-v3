// components/common/UploadFileItem.tsx
import Image from 'next/image'
import { DeleteIcon } from '@/assets/svgComponents'

interface UploadFileItemProps {
  file: File
  onRemove: () => void
}

export default function UploadFileItem({ file, onRemove }: UploadFileItemProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getImageUrl = (file: File): string => {
    return URL.createObjectURL(file)
  }

  // 이미지 파일인지 확인하는 함수
  const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/')
  }

  // 파일 확장자 추출
  const getFileExtension = (fileName: string): string => {
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
                alt={file.name}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="bg-gray2 flex h-full w-full items-center justify-center">
                <span className="text-gray5 text-xs font-medium">{getFileExtension(file.name)}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="body-md">{file.name}</p>
            <p className="small text-gray4">{formatFileSize(file.size)}</p>
          </div>
        </div>
        <button onClick={onRemove}>
          <DeleteIcon width={24} height={24} />
        </button>
      </div>
    </div>
  )
}
