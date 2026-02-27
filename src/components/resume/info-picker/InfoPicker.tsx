'use client'

import { useEffect } from 'react' // useEffect 추가
import InfoPickerItem from '@/components/resume/info-picker/InfoPickerItem'
import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { useResumeStore } from '@/store/resumeStore'
import { ResumeSelectionType } from '@/types/resume'
import { useTranslation } from 'react-i18next'

export default function InfoPicker() {
  const { t } = useTranslation('modal')

  const { createResume, resumeSelection, updateResumeSelection, setAllResumeSelection } = useResumeStore(
    (state) => state
  )

  // 1. 초기 데이터 존재 여부에 따른 선택 상태 자동 설정
  useEffect(() => {
    // introduction 값이 있고, 실제 텍스트가 존재하는 경우에만 true
    const hasIntroduction = !!createResume.introduction?.trim()
    if (hasIntroduction) {
      updateResumeSelection('includeIntroduction', true)
    }

    // urls 배열이 있고, 최소 하나 이상의 객체가 비어있지 않은 실제 데이터를 가진 경우
    const hasValidUrl = createResume.urls?.some((item) => item.urlTitle.trim() !== '' || item.urlLink.trim() !== '')

    if (hasValidUrl) {
      updateResumeSelection('includeUrls', true)
    } else {
      // 기본값 {urlTitle: '', urlLink: ''}만 있다면 false 유지
      updateResumeSelection('includeUrls', false)
    }
  }, [createResume.introduction, createResume.urls, updateResumeSelection])

  console.log('createResume', createResume)

  const infoList: { key: keyof ResumeSelectionType; content: string }[] = [
    { key: 'includeIntroduction', content: t('info_picker.body.info_list.includeIntroduction') },
    { key: 'includeUrls', content: t('info_picker.body.info_list.includeUrls') },
    { key: 'includeEducation', content: t('info_picker.body.info_list.includeEducation') },
    { key: 'includeCertificate', content: t('info_picker.body.info_list.includeCertificate') },
    { key: 'includeLanguage', content: t('info_picker.body.info_list.includeLanguage') },
    { key: 'includeCareer', content: t('info_picker.body.info_list.includeCareer') },
    { key: 'includeAward', content: t('info_picker.body.info_list.includeAward') },
    { key: 'includeActivity', content: t('info_picker.body.info_list.includeActivity') },
  ]

  const isAllSelected = Object.values(resumeSelection).every((value) => value === true)

  const handleSelectAll = () => {
    setAllResumeSelection(!isAllSelected)
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex w-fit cursor-pointer items-center gap-x-2" onClick={handleSelectAll}>
        {isAllSelected ? (
          <CheckIcon width={20} height={20} className="text-main-500" />
        ) : (
          <UncheckIcon width={20} height={20} />
        )}
        <p className={`kr-subtitle-md ${isAllSelected ? 'text-main-500' : 'text-gray5'}`}>
          {t('info_picker.body.select_all')}
        </p>
      </div>

      <div className="tablet:grid-cols-3 desktop:grid-cols-3 grid grid-cols-2 gap-3">
        {infoList.map((info) => (
          <InfoPickerItem
            key={info.key}
            content={info.content}
            isSelected={resumeSelection[info.key]}
            onClick={() => updateResumeSelection(info.key, !resumeSelection[info.key])}
          />
        ))}
      </div>
    </div>
  )
}
