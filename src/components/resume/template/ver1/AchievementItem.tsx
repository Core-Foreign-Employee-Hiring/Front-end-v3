interface AchievementItemProps {
  title: string
  date: string
  description: string
  beforeImprovementRate?: number
  afterImprovementRate?: number
}
export default function AchievementItem({
  title,
  date,
  description,
  beforeImprovementRate,
  afterImprovementRate,
}: AchievementItemProps) {
  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="kr-title-md">{title}</p>
        <p className="kr-body-sm">{date}</p>
      </div>

      <p className="kr-body-md">{description}</p>
    </div>
  )
}
