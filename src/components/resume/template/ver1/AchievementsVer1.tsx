import AchievementItem from '@/components/resume/template/ver1/AchievementItem'
import { ResumeAwardType, ResumeExperienceType } from '@/types/resume'
import { Spacing } from '@/components/common'

interface AchievementsVer1Props {
  awards: ResumeAwardType[] | undefined
  experiences: ResumeExperienceType[] | undefined
}

export default function AchievementsVer1({ awards, experiences }: AchievementsVer1Props) {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">수상 및 활동</div>
      <div className="flex w-full flex-col gap-y-[24px]">
        {awards?.map((award, index) => {
          const isLastIndex = awards?.length - 1 == index && experiences?.length === 0
          return (
            <div key={award.id}>
              <AchievementItem title={award.awardName} description={award.description} date={award.acquiredDate} />

              {isLastIndex ? null : (
                <div>
                  <Spacing height={24} />
                  <div className="border-gray3 border-b" />
                </div>
              )}
            </div>
          )
        })}

        {experiences?.map((experience, index) => {
          const isLastIndex = experiences?.length - 1 == index

          return (
            <div key={experience.id}>
              <AchievementItem
                beforeImprovementRate={experience.beforeImprovementRate}
                afterImprovementRate={experience.afterImprovementRate}
                title={experience.experience}
                description={experience.description}
                date={`${experience.startDate} - ${experience.endDate}`}
              />
              {isLastIndex ? null : (
                <div>
                  <Spacing height={24} />
                  <div className="border-gray3 border-b" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
