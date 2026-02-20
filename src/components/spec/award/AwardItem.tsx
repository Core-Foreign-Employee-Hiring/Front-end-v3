'use client'

import { Button, Label } from '@/components/common'
import Image from 'next/image'
import { getFileNameFromUrl, getFileSizeFromUrl } from '@/utils/common'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SpecAwardType } from '@/types/spec'
import { deleteSpecAwards } from '@/lib/client/spec/award'
import { DeleteIcon, EditIcon } from '@/assets/svgComponents'
import { useTranslation } from 'react-i18next'

interface AwardItemProps {
  award: SpecAwardType
  toggleFormOpenState: () => void
}

export default function AwardItem({ award, toggleFormOpenState }: AwardItemProps) {
  const { t } = useTranslation(['spec'])
  const router = useRouter()
  const [fileSize, setFileSize] = useState<string>('Loading...')

  useEffect(() => {
    // 비동기 함수를 useEffect 안에서 실행
    const fetchSize = async () => {
      if (award.documentUrl && typeof award.documentUrl === 'string') {
        const size = await getFileSizeFromUrl(award.documentUrl)
        setFileSize(size)
      }
    }
    fetchSize()
  }, [award.documentUrl]) // URL이 바뀔 때마다 다시 계산

  return (
    <div className="border-gray2 flex flex-col gap-y-2 rounded-[12px] border p-5">
      <div className="flex items-start justify-between gap-x-[20px]">
        <section className="flex w-full flex-col gap-y-2">
          <Label label={award.awardName} type={'subtitleLg'} />
          <div className="kr-body-sm text-gray4 flex gap-x-1">
            <p>{award.acquiredDate}</p>
            <p>|</p>
            <p>{award.host}</p>
          </div>
        </section>

        <section className="desktop:flex tablet:flex hidden shrink-0 gap-x-2 whitespace-nowrap">
          <Button onClick={toggleFormOpenState} size={'sm'} variant={'outline'} customClassName="w-fit">
            {t('buttons.edit')}
          </Button>
          <Button
            onClick={async () => {
              const result = await deleteSpecAwards(`${award.awardId}`)
              if (result.success) {
                router.refresh()
              }
            }}
            size={'sm'}
            variant={'outline'}
            customClassName="w-fit"
          >
            {t('buttons.delete')}
          </Button>
        </section>

        <section className="desktop:hidden tablet:hidden flex shrink-0 gap-x-2 whitespace-nowrap">
          <Button
            leftIcon={<EditIcon width={24} height={24} />}
            onClick={toggleFormOpenState}
            size={'sm'}
            variant={'outline'}
            customClassName="w-[36px]"
          />
          <Button
            leftIcon={<DeleteIcon width={24} height={24} />}
            onClick={async () => {
              const result = await deleteSpecAwards(`${award.awardId}`)
              if (result.success) {
                router.refresh()
              }
            }}
            size={'sm'}
            variant={'outline'}
            customClassName="w-[36px]"
          />
        </section>
      </div>

      <p className="kr-body-md text-gray5">{award.description}</p>

      {award.documentUrl ? (
        <section className="border-gray2 flex gap-x-2 rounded-[10px] border p-3">
          <div className="relative h-[44px] w-[44px]">
            <Image alt={'이미지'} fill src={award.documentUrl as string} className="rounded-[3px] object-cover" />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="kr-body-md">{getFileNameFromUrl(award.documentUrl as string)}</p>
            <p className="kr-small text-gray4">{fileSize}</p>
          </div>
        </section>
      ) : null}
    </div>
  )
}
