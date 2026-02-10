import { ResumeCertificationType } from '@/types/resume'
import CertificationsVer2Item from '@/components/resume/template/ver2/CertificationsVer2Item'

interface CertificationsVer2Props {
  certifications: ResumeCertificationType[] | undefined
}

export default function CertificationsVer2({ certifications }: CertificationsVer2Props) {
  return (
    <div className="flex flex-col gap-y-[24px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-lg">자격증</div>

      <div className="flex w-full flex-col gap-y-[24px]">
        {certifications?.map((certification) => {
          return (
            <CertificationsVer2Item
              key={certification.id}
              title={certification.certificationName}
              date={certification.acquiredDate}
            />
          )
        })}
      </div>
    </div>
  )
}
