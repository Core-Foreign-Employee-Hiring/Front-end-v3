import { Badge } from '@/components/common'
import { Main500FireIcon } from '@/assets/svgComponents'

interface AchivementsVer2ItemProps {
  title: string
  date: string
  description: string
  beforeImprovementRate?: number
  afterImprovementRate?: number
}
export default function AchivementsVer2Item({
  title,
  date,
  description,
  beforeImprovementRate,
  afterImprovementRate,
}: AchivementsVer2ItemProps) {
  return (
    <div className="desktop:flex-row desktop:ml-[12px] border-main-500 desktop:pb-[32px] flex flex-col gap-x-[20px] gap-y-2 border-l-[2px] pb-[24px] pl-[20px]">
      <div className="flex w-[300px] shrink-0 flex-col gap-y-2">
        <p className="kr-title-md">{title}</p>
        <p className="desktop:text-black desktop:block kr-body-sm hidden">{date}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        {beforeImprovementRate && afterImprovementRate ? (
          <Badge
            leftIcon={<Main500FireIcon width={12} height={13} />}
          >{`개선률 ${beforeImprovementRate}% -> ${afterImprovementRate}%`}</Badge>
        ) : null}
        <p className="text-gray5 kr-body-sm desktop:hidden block">{date}</p>
        <p className="kr-body-md">{description}</p>
      </div>
    </div>
  )
}
