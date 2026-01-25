import CertificationItem from '@/components/resume/template/ver1/CertificationItem'

export default function CertificationsVer1() {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">자격증</div>
      <div className="flex w-full flex-col gap-y-[24px]">
        <CertificationItem title={'정보처리기사'} date={'2025.01'} />
        <div className="border-gray2 border-b" />
        <CertificationItem title={'컴퓨터활용능력'} date={'2025. 09 - 2026. 01 | 졸업예정'} />
      </div>
    </div>
  )
}
