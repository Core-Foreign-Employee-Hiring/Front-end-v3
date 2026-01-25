import AchievementItem from '@/components/resume/template/ver1/AchievementItem'

export default function AchievementsVer1() {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">수상 및 활동</div>
      <div className="flex flex-col gap-y-[24px]">
        <AchievementItem />
        <div className="border-gray3 border-b" />
        <AchievementItem />
        <div className="border-gray3 border-b" />

        <AchievementItem />
        <div className="border-gray3 border-b" />

        <AchievementItem />
      </div>
    </div>
  )
}
