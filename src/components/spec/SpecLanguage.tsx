'use client'

import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { SpecLanguageSkillType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { useEffect } from 'react'
import LanguageEntry from '@/components/spec/language/LanguageEntry'
import { useSpecLanguage } from '@/hooks'
import BottomButton from '@/components/spec/BottomButton'
import EditLanguageEntry from '@/components/spec/language/EditLanguageEntry'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { postSpecLanguageSkills } from '@/lib/client/spec/language'
import { useToast } from '@/components/common/toast/ToastContext'

interface SpecLanguageProps {
  languageSkillsData: SpecLanguageSkillType[] | null | undefined
}

export default function SpecLanguage({ languageSkillsData }: SpecLanguageProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()
  const { languageSkills, addLanguageSkill, setEditLanguageSkills, editLanguageSkills, setLanguageSkills } =
    useSpecStore((state) => state)
  const { handlePrev, handleNext, isActive } = useSpecLanguage(languageSkillsData)
  const router = useRouter()
  useEffect(() => {
    // 기존에 저장된 값이 있다면 editData에 추가
    if (languageSkillsData) {
      setEditLanguageSkills(languageSkillsData)
    }
  }, [languageSkillsData])

  return (
    <div>
      <Label
        label={t('spec:language.title')}
        type={'titleMd'}
        rightElement={
          <div className="flex gap-x-2">
            <Button
              size={'md'}
              customClassName={'w-[72px]'}
              onClick={async () => {
                const result = await postSpecLanguageSkills(languageSkills)
                if (result.data) {
                  if (result.data.success) {
                    router.refresh()
                    setEditLanguageSkills([...editLanguageSkills, ...languageSkills])

                    setLanguageSkills([])

                    success(
                      t('message:post_spec_language_skills.success.title'),
                      t('message:post_spec_language_skills.success.description')
                    )
                  } else {
                    router.refresh()
                    setLanguageSkills([])
                    error(
                      t('message:post_spec_language_skills.error.title'),
                      t('message:post_spec_language_skills.error.description')
                    )
                  }
                }
              }}
            >
              {t('spec:buttons.save')}
            </Button>
            <Button
              onClick={() => {
                addLanguageSkill({ title: '', score: '' })
              }}
              variant={'secondary'}
              size={'md'}
              customClassName={'w-fit'}
              leftIcon={<Main5000PlusIcon width={20} height={20} />}
            >
              {t('spec:buttons.add')}
            </Button>
          </div>
        }
      />

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {editLanguageSkills.map((languageSkill) => {
          return (
            <EditLanguageEntry
              key={languageSkill.languageSkillId}
              languageSkill={languageSkill}
              initialFormOpenState={false}
              languageSkillsData={languageSkillsData}
            />
          )
        })}
      </div>

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {languageSkills.map((languageSkill, index) => {
          return <LanguageEntry key={index} index={index} initialFormOpenState={true} languageSkill={languageSkill} />
        })}
      </div>

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={true} handleNext={handleNext} />
    </div>
  )
}
