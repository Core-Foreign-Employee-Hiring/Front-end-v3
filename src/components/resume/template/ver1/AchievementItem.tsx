import { Badge } from '@/components/common'
import { Main500FireIcon } from '@/assets/svgComponents'

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
      <div className="tablet:justify-between desktop:flex-row tablet:flex-row desktop:justify-between flex flex-col items-start gap-y-2">
        <div className="tablet:flex-row desktop:flex-row flex flex-col items-center gap-x-2 gap-y-2">
          <p className="desktop:kr-title-md kr-subtitle-lg tablet:kr-title-md">{title}</p>
          {beforeImprovementRate && afterImprovementRate ? (
            <Badge
              leftIcon={<Main500FireIcon width={12} height={13} />}
            >{`개선률 ${beforeImprovementRate} -> ${afterImprovementRate}`}</Badge>
          ) : null}
        </div>
        <p className="tablet:kr-body-sm desktop:kr-body-sm kr-small text-gray5">{date}</p>
      </div>

      <p className="tablet:kr-body-md desktop:kr-body-md kr-body-sm">{description}</p>
    </div>
  )
}
