'use client'

import { Button, Label, Spacing } from '@/components/common'
import UrlField from '@/components/resume/info-form/UrlField'
import { GrayPlusIcon, HelpIcon } from '@/assets/svgComponents'
import { useResumeStore } from '@/store/resumeStore'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Tooltip from '@/components/common/Tooltip'

export default function UrlList() {
  const { t } = useTranslation(['modal', 'common'])
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const urls = useResumeStore((state) => state.createResume.urls)
  const addUrl = useResumeStore((state) => state.addUrl)

  return (
    <div>
      <div className="relative flex gap-x-2">
        <Label label={'URL'} type={'titleSm'} />
        <HelpIcon
          className="cursor-pointer"
          onClick={() => {
            setIsToolTipOpen(!isToolTipOpen)
          }}
          width={24}
          height={24}
        />
        {isToolTipOpen ? <Tooltip description={t('common:tooltip.url')} /> : null}
      </div>

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
        customClassName={'w-fit'}
        leftIcon={<GrayPlusIcon width={20} height={20} />}
        size={'sm'}
        variant={'outline'}
        onClick={addUrl} // 클릭 시 스토어에 빈 객체 추가
      >
        {t('modal:create_resume.body.info.url_field.button')}
      </Button>
    </div>
  )
}
