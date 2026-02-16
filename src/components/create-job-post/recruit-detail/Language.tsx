'use client'

import { Button, Label } from '@/components/common'
import { useModalStore } from '@/store/modalStore'
import { useState } from 'react'
import { LanguageType } from '@/types/job-post'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useTranslation } from 'react-i18next'
import { getLanguageLabel } from '@/utils/filterList'
import LanguageModal from '@/components/common/modal/LanguageModal'

export default function Language() {
  const { toggleModal, modals } = useModalStore((state) => state)
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageType[] | undefined>(undefined)
  const { updateCreateJobPost, createJobPost } = useCreateJobPostStore((state) => state)

  const { t } = useTranslation()

  const deleteLanguages = (selectedLanguage: LanguageType) => {
    setSelectedLanguages((prev) => prev?.filter((language) => language !== selectedLanguage))
  }

  const addLanguages = (selectedLanguage: LanguageType) => {
    setSelectedLanguages((prev) => {
      const current = prev || []

      if (current.includes(selectedLanguage)) {
        return current.filter((language) => language !== selectedLanguage)
      }

      return [...current, selectedLanguage]
    })
  }

  const onApply = () => {
    updateCreateJobPost('languageTypes', selectedLanguages)

    onClose()
  }

  const onReset = () => {
    setSelectedLanguages(undefined)
    updateCreateJobPost('languageTypes', undefined)
    onClose()
  }

  const onClose = () => {
    toggleModal('isLanguageModalOpen')
  }

  return (
    <div>
      {modals.isLanguageModalOpen && (
        <LanguageModal
          addLanguages={addLanguages}
          deleteLanguages={deleteLanguages}
          selectedLanguages={selectedLanguages}
          onApply={onApply}
          onReset={onReset}
        />
      )}
      <div className="flex flex-col gap-y-2">
        <Label label={'요구 언어 능력'} isOption={true} />
        <div className="flex flex-col gap-y-3">
          {createJobPost.languageTypes ? (
            <div className="flex gap-x-2">
              {createJobPost.languageTypes?.map((languageType) => (
                <button
                  type="button"
                  key={languageType}
                  className="border-gray3 bg-gray1 kr-badge-sm text-gray5 flex cursor-pointer items-center rounded-full border px-3 py-2 whitespace-nowrap"
                >
                  {t(getLanguageLabel(languageType))}
                </button>
              ))}
            </div>
          ) : null}
          <Button variant={'outline'} size={'md'} onClick={onClose} customClassName={'w-[156px]'} buttonType={'button'}>
            언어 선택
          </Button>
        </div>
      </div>
    </div>
  )
}
