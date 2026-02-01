import { Label, Spacing, TextInput } from '@/components/common'
import { useResumeStore } from '@/store/resumeStore'

export default function SelfIntroField() {
  const { updateCreateResumeField, createResume } = useResumeStore((state) => state)

  return (
    <div>
      <Label label={'자기소개'} type={'titleSm'} />
      <Spacing height={8} />
      <TextInput
        textType={'textArea'}
        value={createResume.introduction}
        onChange={(e) => {
          updateCreateResumeField('introduction', e.target.value)
        }}
        placeholder={'예. 00직무 이력서, 00회사 지원용 이력서'}
      />
      <Spacing height={8} />
      <ul className="kr-badge-md text-gray5 list-disc pl-5">
        <li>본인의 강점과 경험을 구체적으로 작성하면 좋아요.</li>
        <li>지원 직무와 관련된 역량을 강조하면 좋아요.</li>
        <li>성과는 수치로 표현하면 좋아요.</li>
      </ul>
    </div>
  )
}
