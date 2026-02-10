import { ResumeAwardType, ResumeExperienceType } from '@/types/resume'
import AchivementsVer2Item from '@/components/resume/template/ver2/AchivementsVer2Item'

interface AchievementsVer2Props {
  awards: ResumeAwardType[] | undefined
  experiences: ResumeExperienceType[] | undefined
}

export default function AchivementsVer2({ awards, experiences }: AchievementsVer2Props) {
  return (
    <div className="flex flex-col gap-y-[24px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-lg">수상 및 활동</div>

      {awards?.map((award, index) => {
        return (
          <div key={award.id}>
            <AchivementsVer2Item title={award.awardName} description={award.description} date={award.acquiredDate} />
          </div>
        )
      })}

      {experiences?.map((experience, index) => {
        return (
          <div key={experience.id}>
            <AchivementsVer2Item
              beforeImprovementRate={experience.beforeImprovementRate}
              afterImprovementRate={experience.afterImprovementRate}
              title={experience.experience}
              description={experience.description}
              date={`${experience.startDate} - ${experience.endDate}`}
            />
          </div>
        )
      })}
    </div>
  )
}
