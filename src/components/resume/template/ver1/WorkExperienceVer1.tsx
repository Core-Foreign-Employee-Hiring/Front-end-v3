import WorkExperienceItem from '@/components/resume/template/ver1/WorkExperienceItem'

export default function WorkExperienceVer1() {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">업무 경험</div>
      <WorkExperienceItem />
    </div>
  )
}
