'use client'

import { Button, Label, Spacing } from '@/components/common'
import UrlField from '@/components/resume/info-form/UrlField'
import { GrayPlusIcon } from '@/assets/svgComponents'
import { useResumeStore } from '@/store/resumeStore'
import { useTranslation } from 'react-i18next'

export default function UrlList() {
  const { t } = useTranslation('modal')
  const urls = useResumeStore((state) => state.createResume.urls)
  const addUrl = useResumeStore((state) => state.addUrl)

  return (
    <div>
      <Label label={'URL'} type={'titleSm'} />
      <Spacing height={8} />

      {/* 1. 스토어의 urls 배열을 기반으로 필드 렌더링 */}
      {urls.map((url, index) => (
        <div key={index}>
          <UrlField index={index} urlTitle={url.urlTitle} urlLink={url.urlLink} />
          <Spacing height={8} />
        </div>
      ))}

      {/* 2. URL 추가 버튼 */}
      <Button
        customClassName={'w-[115px]'}
        leftIcon={<GrayPlusIcon width={20} height={20} />}
        size={'sm'}
        variant={'outline'}
        onClick={addUrl} // 클릭 시 스토어에 빈 객체 추가
      >
        {t('create_resume.body.info.url_field.button')}
      </Button>
    </div>
  )
}
