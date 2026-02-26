'use client'

import { useEffect, useState } from 'react'
import { Label, TextInput } from '@/components/common'
import { GrayStarIcon, StarIcon } from '@/assets/svgComponents'
import { useReviewStore } from '@/store/reviewStore'
import { useTranslation } from 'react-i18next' // 스토어 경로를 확인하세요

export default function Rating() {
  const { t } = useTranslation('modal')
  const [integer, setInteger] = useState('')
  const [decimal, setDecimal] = useState('')

  // Zustand 스토어에서 업데이트 함수 가져오기
  const updateReviewField = useReviewStore((state) => state.updateReviewField)

  // 전체 평점 계산
  const totalRating = Number(integer || 0) + Number(`0.${decimal || 0}`)

  // 별 개수 계산 로직
  const yellowStarCount = totalRating >= 5 ? 5 : Math.floor(totalRating)
  const grayStarCount = 5 - yellowStarCount

  // integer나 decimal이 바뀔 때마다 Zustand 스토어의 star 필드 업데이트
  useEffect(() => {
    updateReviewField('star', totalRating)
  }, [totalRating, updateReviewField])

  return (
    <section className="flex flex-col gap-y-2">
      <Label label={t('write_review.body.rating.label')} type={'subtitleMd'} />

      <div className="flex items-center gap-x-2">
        {/* 정수 입력: 0~5까지만 허용 */}
        <TextInput
          placeholder="0"
          value={integer}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-5]/g, '').slice(0, 1)
            setInteger(val)
          }}
          customClassName="w-[50px]"
        />
        <div className="bg-gray4 h-[5px] w-[5px] rounded-full" />
        {/* 소수 입력: 0~9까지만 허용 */}
        <TextInput
          placeholder="0"
          value={decimal}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1)
            // 만약 정수가 5라면 소수는 0만 가능하도록 제어 (선택 사항)
            if (integer === '5') {
              setDecimal('0')
            } else {
              setDecimal(val)
            }
          }}
          customClassName="w-[50px]"
        />
      </div>

      {/* 별 아이콘 표시 영역 */}
      <div className="mt-2 flex">
        {Array.from({ length: yellowStarCount }).map((_, i) => (
          <StarIcon key={`yellow-${i}`} width={36} height={36} />
        ))}
        {Array.from({ length: grayStarCount }).map((_, i) => (
          <GrayStarIcon key={`gray-${i}`} width={36} height={36} />
        ))}
      </div>
    </section>
  )
}
