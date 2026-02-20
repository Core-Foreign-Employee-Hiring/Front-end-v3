'use client'

import { Button, Label, Spacing, TextInput } from '@/components/common'
import { SpecLanguageSkillType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { putSpecLanguageSkills } from '@/lib/client/spec/language'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface EditLangFormProps {
  languageSkill: SpecLanguageSkillType
  toggleState: () => void
  languageSkillsData: SpecLanguageSkillType[] | null | undefined
}
export default function EditLangForm({ languageSkill, toggleState, languageSkillsData }: EditLangFormProps) {
  const { t } = useTranslation(['spec'])
  const router = useRouter()
  const { updateEditLanguageSkill, setEditLanguageSkills } = useSpecStore((state) => state)

  const handleSave = async () => {
    const result = await putSpecLanguageSkills(`${languageSkill.languageSkillId}`, languageSkill)
    if (result.success) {
      router.refresh()
      toggleState()
    }
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Label
        label={t('language.form.title')}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              toggleState()
              if (languageSkillsData) {
                setEditLanguageSkills(languageSkillsData)
              }
            }}
            customClassName={'w-fit'}
            variant={'outline'}
            size={'md'}
          >
            {t('buttons.cancel')}
          </Button>
        }
      />
      <Spacing height={24} />

      <div className="flex gap-x-4">
        <TextInput
          onChange={(e) => {
            if (languageSkill.languageSkillId) {
              updateEditLanguageSkill(languageSkill.languageSkillId, {
                languageSkillId: languageSkill.languageSkillId,
                title: e.target.value,
                score: languageSkill.score,
              })
            }
          }}
          value={languageSkill.title}
          inputType={'text'}
          placeholder={t('language.form.titlePlaceHolder')}
        />
        <TextInput
          value={languageSkill.score}
          onChange={(e) => {
            if (languageSkill.languageSkillId) {
              updateEditLanguageSkill(languageSkill.languageSkillId, {
                languageSkillId: languageSkill.languageSkillId,
                title: languageSkill.title,
                score: e.target.value,
              })
            }
          }}
          inputType={'text'}
          placeholder={t('language.form.scorePlaceHolder')}
        />
      </div>
      <Spacing height={24} />
      <div className="flex w-full justify-end">
        <Button onClick={handleSave} size={'md'} customClassName={'w-[160px]'}>
          {t('buttons.edit')}
        </Button>
      </div>
    </div>
  )
}
