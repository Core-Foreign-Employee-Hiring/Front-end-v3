interface LanguageSkillItemProps {
  title: string
  content: string
}
export default function LanguageSkillItem({ title, content }: LanguageSkillItemProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <p className="kr-title-md">{title}</p>
      <p className="kr-body-md">{content}</p>
    </div>
  )
}
