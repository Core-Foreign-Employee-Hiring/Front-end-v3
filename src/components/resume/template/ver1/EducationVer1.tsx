import EducationItem from '@/components/resume/template/ver1/EducationItem'

export default function EducationVer1() {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">학력</div>
      <EducationItem />
    </div>
  )
}
