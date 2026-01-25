import { Label } from '@/components/common'

interface ResumeItemContentProps {
  title: string
  createdAt?: string
  modifiedAt?: string
}
export default function ResumeItemContent({ title, createdAt, modifiedAt }: ResumeItemContentProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label type={'subtitleLg'} label={title} />
      <div className="flex gap-x-2">
        {modifiedAt ? (
          <p className="kr-body-sm text-gray5">수정일자</p>
        ) : (
          <p className="kr-body-sm text-gray5">생성일자</p>
        )}
        <p className="kr-body-sm text-gray5">|</p>
        {modifiedAt ? (
          <p className="kr-body-sm text-gray5">{modifiedAt}</p>
        ) : (
          <p className="kr-body-sm text-gray5">{createdAt}</p>
        )}
      </div>
    </div>
  )
}
