import { Label, Spacing, TextInput } from '@/components/common'
import { useResumeStore } from '@/store/resumeStore'

export default function TitleField() {
  const { updateCreateResumeField, createResume } = useResumeStore((state) => state)
  return (
    <div>
      <Label label={'이력서 이름'} type={'titleSm'} isRequired={true} />
      <Spacing height={8} />
      <TextInput
        value={createResume.resumeName}
        onChange={(e) => {
          updateCreateResumeField('resumeName', e.target.value)
        }}
        placeholder={'예. 00직무 이력서, 00회사 지원용 이력서'}
      />
    </div>
  )
}
