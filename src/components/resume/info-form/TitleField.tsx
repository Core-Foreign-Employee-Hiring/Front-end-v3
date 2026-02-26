import { Label, Spacing, TextInput } from '@/components/common'
import { useResumeStore } from '@/store/resumeStore'
import { useTranslation } from 'react-i18next'

export default function TitleField() {
  const { t } = useTranslation('modal')
  const { updateCreateResumeField, createResume } = useResumeStore((state) => state)
  return (
    <div>
      <Label label={t('create_resume.body.info.title_field.label')} type={'titleSm'} isRequired={true} />
      <Spacing height={8} />
      <TextInput
        value={createResume.resumeName}
        onChange={(e) => {
          updateCreateResumeField('resumeName', e.target.value)
        }}
        placeholder={t('create_resume.body.info.title_field.placeholder')}
      />
    </div>
  )
}
