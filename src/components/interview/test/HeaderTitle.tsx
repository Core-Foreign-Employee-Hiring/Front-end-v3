interface HeaderTitleProps {
  title: string
  description: string
}
export default function HeaderTitle({ title, description }: HeaderTitleProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <h1 className="kr-subtitle-lg">{title}</h1>
      <p className="kr-badge-sm text-gray5">{description}</p>
    </div>
  )
}
