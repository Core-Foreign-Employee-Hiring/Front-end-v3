'use client'

import { SpecLanguageSkillType } from '@/types/spec'
import { Button, Label } from '@/components/common'
import { deleteSpecLanguageSkills } from '@/lib/client/spec/language'
import { useRouter } from 'next/navigation'
import { DeleteIcon, EditIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface LanguageItemProps {
  languageSkill: SpecLanguageSkillType
  toggleState: () => void
}

export default function LanguageItem({ languageSkill, toggleState }: LanguageItemProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()
  const router = useRouter()
  return (
    <div className="border-gray2 flex items-start justify-between gap-x-[20px] rounded-[12px] border p-5">
      <section className="flex flex-col gap-y-2">
        <Label label={languageSkill.title} type={'subtitleLg'} />
        <p className="kr-body-md text-gray5">{languageSkill.score}</p>
      </section>

      <section className="desktop:flex tablet:flex hidden shrink-0 items-center gap-x-2 whitespace-nowrap">
        <Button onClick={toggleState} size={'sm'} variant={'outline'} customClassName="w-fit">
          {t('spec:buttons.edit')}
        </Button>
        <Button
          onClick={async () => {
            const result = await deleteSpecLanguageSkills(`${languageSkill.languageSkillId}`)
            if (result.success) {
              router.refresh()
              success(
                t('message:delete_spec_language_skills.success.title'),
                t('message:delete_spec_language_skills.success.description')
              )
            } else {
              error(
                t('message:delete_spec_language_skills.error.title'),
                t('message:delete_spec_language_skills.error.description')
              )
            }
          }}
          size={'sm'}
          variant={'outline'}
          customClassName="w-fit"
        >
          {t('spec:buttons.delete')}
        </Button>
      </section>

      <section className="desktop:hidden tablet:hidden flex shrink-0 items-center gap-x-2 whitespace-nowrap">
        <Button
          leftIcon={<EditIcon width={24} height={24} />}
          onClick={toggleState}
          size={'sm'}
          variant={'outline'}
          customClassName="w-[36px]"
        />
        <Button
          leftIcon={<DeleteIcon width={24} height={24} />}
          onClick={async () => {
            const result = await deleteSpecLanguageSkills(`${languageSkill.languageSkillId}`)
            if (result.success) {
              router.refresh()
              success(
                t('message:delete_spec_language_skills.success.title'),
                t('message:delete_spec_language_skills.success.description')
              )
            } else {
              error(
                t('message:delete_spec_language_skills.error.title'),
                t('message:delete_spec_language_skills.error.description')
              )
            }
          }}
          size={'sm'}
          variant={'outline'}
          customClassName="w-[36px]"
        />
      </section>
    </div>
  )
}
