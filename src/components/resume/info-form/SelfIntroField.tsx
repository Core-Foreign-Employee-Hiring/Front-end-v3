import { Label, Spacing, TextInput } from '@/components/common'
import { useResumeStore } from '@/store/resumeStore'
import { useTranslation } from 'react-i18next'

export default function SelfIntroField() {
  const { t } = useTranslation('modal')
  const { updateCreateResumeField, createResume } = useResumeStore((state) => state)

  const tips = t('create_resume.body.info.self_intro_field.tips', { returnObjects: true }) as string[]

  return (
    <div>
      <Label label={t('create_resume.body.info.self_intro_field.label')} type={'titleSm'} />
      <Spacing height={8} />
      <TextInput
        textType={'textArea'}
        value={createResume.introduction}
        onChange={(e) => {
          updateCreateResumeField('introduction', e.target.value)
        }}
        placeholder={t('create_resume.body.info.self_intro_field.placeholder')}
      />
      <Spacing height={8} />
      <ul className="kr-badge-md text-gray5 list-disc pl-5">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  )
}
