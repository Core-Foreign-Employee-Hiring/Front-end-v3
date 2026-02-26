'use client'

import { Button, TextInput } from '@/components/common'
import { DeleteIcon } from '@/assets/svgComponents'
import { useResumeStore } from '@/store/resumeStore'
import { useTranslation } from 'react-i18next'

interface UrlFieldProps {
  index: number
  urlTitle: string
  urlLink: string
}

export default function UrlField({ index, urlTitle, urlLink }: UrlFieldProps) {
  const { t } = useTranslation('modal')
  const updateUrl = useResumeStore((state) => state.updateUrl)
  const removeUrl = useResumeStore((state) => state.removeUrl)

  return (
    <div className="flex items-center gap-x-3">
      {/* 제목 입력 */}
      <TextInput
        placeholder={t('create_resume.body.info.url_field.title_placeholder')}
        customClassName={'w-[153px] shrink-0'}
        value={urlTitle}
        onChange={(e) => updateUrl(index, 'urlTitle', e.target.value)}
      />

      {/* URL 입력 */}
      <TextInput
        placeholder={t('create_resume.body.info.url_field.url_placeholder')}
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
