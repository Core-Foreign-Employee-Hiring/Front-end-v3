import CertificationItem from '@/components/resume/template/ver1/CertificationItem'
import { ResumeCertificationType } from '@/types/resume'
import { Spacing } from '@/components/common'

interface CertificationsVer1Props {
  certifications: ResumeCertificationType[] | undefined
}

export default function CertificationsVer1({ certifications }: CertificationsVer1Props) {
  return (
    <div className="flex w-full gap-x-[20px] border-b-[2px] border-black py-[40px]">
      <div className="kr-title-md w-[200px] shrink-0 whitespace-nowrap">자격증</div>
      <div className="flex w-full flex-col gap-y-[24px]">
        {certifications?.map((certification, index) => {
          const isLastIndex = certifications?.length - 1 == index
          return (
            <div key={certification.id}>
              <CertificationItem title={certification.certificationName} date={certification.acquiredDate} />

              {isLastIndex ? null : (
                <div>
                  <Spacing height={24} />
                  <div className="border-gray2 border-b" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
