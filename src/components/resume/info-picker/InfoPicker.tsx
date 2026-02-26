'use client'

import InfoPickerItem from '@/components/resume/info-picker/InfoPickerItem'
import { CheckIcon, UncheckIcon } from '@/assets/svgComponents'
import { useResumeStore } from '@/store/resumeStore'
import { ResumeSelectionType } from '@/types/resume'
import { useTranslation } from 'react-i18next'

export default function InfoPicker() {
  const { t } = useTranslation('modal')
  const infoList: { key: keyof ResumeSelectionType; content: string }[] = [
    { key: 'includeIntroduction', content: t('info_picker.body.info_list.includeIntroduction') },
    { key: 'includeEducation', content: t('info_picker.body.info_list.includeEducation') },
    { key: 'includeCertificate', content: t('info_picker.body.info_list.includeCertificate') },
    { key: 'includeLanguage', content: t('info_picker.body.info_list.includeLanguage') },
    { key: 'includeCareer', content: t('info_picker.body.info_list.includeCareer') },
    { key: 'includeAward', content: t('info_picker.body.info_list.includeAward') },
    { key: 'includeActivity', content: t('info_picker.body.info_list.includeActivity') },
    { key: 'includeUrls', content: t('info_picker.body.info_list.includeUrls') },
  ]

  // Zustand 스토어 연결
  const resumeSelection = useResumeStore((state) => state.resumeSelection)
  const updateResumeSelection = useResumeStore((state) => state.updateResumeSelection)
  const setAllResumeSelection = useResumeStore((state) => state.setAllResumeSelection)

  // 모든 항목이 true인지 확인
  const isAllSelected = Object.values(resumeSelection).every((value) => value === true)

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    setAllResumeSelection(!isAllSelected)
  }

  return (
    <div className="flex flex-col gap-y-3">
      {/* 모두 선택 버튼 */}
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

      {/* 항목 그리드 */}
      <div className="tablet:grid-cols-3 desktop:grid-cols-3 grid grid-cols-2 gap-3">
        {infoList.map((info) => (
          <InfoPickerItem
            key={info.key}
            content={info.content}
            isSelected={resumeSelection[info.key]} // 스토어의 boolean 값 전달
            onClick={() => updateResumeSelection(info.key, !resumeSelection[info.key])} // 값 반전
          />
        ))}
      </div>
    </div>
  )
}
