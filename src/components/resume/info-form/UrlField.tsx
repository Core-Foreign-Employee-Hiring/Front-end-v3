'use client'

import { Button, TextInput } from '@/components/common'
import { DeleteIcon } from '@/assets/svgComponents'
import { useResumeStore } from '@/store/resumeStore'

interface UrlFieldProps {
  index: number
  urlTitle: string
  urlLink: string
}

export default function UrlField({ index, urlTitle, urlLink }: UrlFieldProps) {
  const updateUrl = useResumeStore((state) => state.updateUrl)
  const removeUrl = useResumeStore((state) => state.removeUrl)

  return (
    <div className="flex gap-x-3">
      {/* 제목 입력 */}
      <TextInput
        placeholder={'제목입력'}
        customClassName={'w-[153px] shrink-0'}
        value={urlTitle}
        onChange={(e) => updateUrl(index, 'urlTitle', e.target.value)}
      />

      {/* URL 입력 */}
      <TextInput
        placeholder={'URL 입력'}
        value={urlLink}
        onChange={(e) => updateUrl(index, 'urlLink', e.target.value)}
      />

      {/* 삭제 버튼 */}
      <Button variant={'outline'} customClassName={'w-[52px]'} size={'lg'} onClick={() => removeUrl(index)}>
        <DeleteIcon width={20} height={20} />
      </Button>
    </div>
  )
}
