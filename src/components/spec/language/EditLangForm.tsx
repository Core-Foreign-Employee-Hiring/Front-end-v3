'use client'

import { Button, Label, Spacing, TextInput } from '@/components/common'
import { SpecLanguageSkillType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { putSpecLanguageSkills } from '@/lib/client/spec/language'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface EditLangFormProps {
  languageSkill: SpecLanguageSkillType
  toggleState: () => void
  languageSkillsData: SpecLanguageSkillType[] | null | undefined
}
export default function EditLangForm({ languageSkill, toggleState, languageSkillsData }: EditLangFormProps) {
  const router = useRouter()
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()
  const { updateEditLanguageSkill, setEditLanguageSkills } = useSpecStore((state) => state)

  const handleSave = async () => {
    const result = await putSpecLanguageSkills(`${languageSkill.languageSkillId}`, languageSkill)
    if (result.data) {
      if (result.data.success) {
        console.log('fkgj', result.data)
        router.refresh()
        toggleState()
        success(
          t('message:put_spec_language_skills.success.title', 'message:put_spec_language_skills.success.description')
        )
      } else {
        router.refresh()
        toggleState()
        error(t('message:put_spec_language_skills.error.title', 'message:put_spec_language_skills.error.description'))
      }
    }
  }

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Label
        label={t('spec:language.form.title')}
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
            {t('spec:buttons.cancel')}
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
          placeholder={t('spec:language.form.titlePlaceHolder')}
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
          placeholder={t('spec:language.form.scorePlaceHolder')}
        />
      </div>
      <Spacing height={24} />
      <div className="flex w-full justify-end">
        <Button onClick={handleSave} size={'md'} customClassName={'w-[160px]'}>
          {t('spec:buttons.edit')}
        </Button>
      </div>
    </div>
  )
}
