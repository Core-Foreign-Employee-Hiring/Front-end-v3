'use client'

import { Button, Label, Spacing, TextInput } from '@/components/common'
import { SpecLanguageSkillType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { useTranslation } from 'react-i18next'

interface AddLangFormProps {
  languageSkill: SpecLanguageSkillType
  toggleState: () => void
  index?: number // 새로 생성한다면 languageSkills의 index값을 찾기 위해
}
export default function AddLangForm({ languageSkill, toggleState, index }: AddLangFormProps) {
  const { t } = useTranslation('spec')
  const { updateLanguageSkill, removeLanguageSkill } = useSpecStore((state) => state)

  return (
    <div className="border-gray2 rounded-[12px] border p-5">
      <Label
        label={t('language.form.title')}
        type={'subtitleLg'}
        rightElement={
          <Button
            onClick={() => {
              if (typeof index === 'number') {
                removeLanguageSkill(index)
                toggleState()
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
            if (typeof index === 'number') {
              updateLanguageSkill(index, {
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
            if (typeof index === 'number') {
              updateLanguageSkill(index, {
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
    </div>
  )
}
