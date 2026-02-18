'use client'

import { useRouter } from 'next/navigation'
import { Button, Label } from '@/components/common'
import { SpecCertificationType } from '@/types/spec'
import Image from 'next/image'
import { deleteSpecCertifications } from '@/lib/client/spec/certification'
import { getFileNameFromUrl, getFileSizeFromUrl } from '@/utils/common'
import { useEffect, useState } from 'react'

interface CertificationItemProps {
  certification: SpecCertificationType
  toggleFormOpenState: () => void
}

export default function CertificationItem({ certification, toggleFormOpenState }: CertificationItemProps) {
  const router = useRouter()
  const [fileSize, setFileSize] = useState<string>('Loading...')

  useEffect(() => {
    // 비동기 함수를 useEffect 안에서 실행
    const fetchSize = async () => {
      if (certification.documentUrl && typeof certification.documentUrl === 'string') {
        const size = await getFileSizeFromUrl(certification.documentUrl)
        setFileSize(size)
      }
    }
    fetchSize()
  }, [certification.documentUrl]) // URL이 바뀔 때마다 다시 계산

  return (
    <div className="border-gray2 flex items-start justify-between gap-x-[20px] rounded-[12px] border p-5">
      <section className="flex w-full flex-col gap-y-2">
        <Label label={certification.certificationName} type={'subtitleLg'} />
        <p className="kr-body-md text-gray5">{certification.acquiredDate}</p>
        {certification.documentUrl ? (
          <section className="border-gray2 flex gap-x-2 rounded-[10px] border p-3">
            <div className="relative h-[44px] w-[44px]">
              <Image
                alt={'이미지'}
                fill
                src={certification.documentUrl as string}
                className="rounded-[3px] object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="kr-body-md">{getFileNameFromUrl(certification.documentUrl as string)}</p>
              <p className="kr-small text-gray4">{fileSize}</p>
            </div>
          </section>
        ) : null}
      </section>

      <section className="flex shrink-0 gap-x-2 whitespace-nowrap">
        <Button onClick={toggleFormOpenState} size={'sm'} variant={'outline'} customClassName="w-fit">
          수정
        </Button>
        <Button
          onClick={async () => {
            const result = await deleteSpecCertifications(`${certification.certificationId}`)
            if (result.success) {
              router.refresh()
            }
          }}
          size={'sm'}
          variant={'outline'}
          customClassName="w-fit"
        >
          삭제
        </Button>
      </section>
    </div>
  )
}
