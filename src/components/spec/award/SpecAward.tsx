'use client'

import { SpecAwardType } from '@/types/spec'
import { usePathname, useRouter } from 'next/navigation'
import { useSpecStore } from '@/store/specStore'
import { useEffect } from 'react'
import { postSpecAwards } from '@/lib/client/spec/award'
import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { BottomButton } from '@/components/spec'
import EditAwardEntry from '@/components/spec/award/EditAwardEntry'
import AwardEntry from '@/components/spec/award/AwardEntry'
import { StepType } from '@/app/[lang]/carrer/page'
import { uploadFile } from '@/lib/client/common'

interface SpecAwardProps {
  awardsData: SpecAwardType[] | null | undefined
}
export default function SpecAward({ awardsData }: SpecAwardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { editAwards, setEditAwards, addAward, setAwards, awards } = useSpecStore((state) => state)

  useEffect(() => {
    if (awardsData) {
      setEditAwards(awardsData)
    }
  }, [awardsData])

  const handleSave = async () => {
    try {
      const updatedAwards = await Promise.all(
        awards.map(async (award) => {
          const newAward = { ...award }

          // 1. 실제로 '파일'이 들어있는 경우에만 업로드 실행
          if (newAward.documentUrl instanceof File) {
            const uploadUrl = await uploadFile(newAward.documentUrl)
            newAward.documentUrl = uploadUrl || null // 업로드 실패 시 null 혹은 빈 문자열
          }
          // 2. 만약 documentUrl이 File도 아니고, 문자열도 아닌 (빈 객체 {} 등) 경우
          else if (typeof newAward.documentUrl !== 'string') {
            newAward.documentUrl = null // API가 받을 수 있는 깨끗한 상태로 변경
          }

          return newAward
        })
      )

      // 전송 전 최종 데이터 확인 (디버깅용)
      console.log('정제된 데이터:', updatedAwards)

      const result = await postSpecAwards(updatedAwards)

      // 3. 성공 후 처리
      if (result.success) {
        setAwards([]) // 추가용 임시 상태 초기화 (필요시)
        router.refresh()
        alert('모든 수상 경험을 성공적으로 저장되었습니다.')
      }
    } catch (error) {
      console.error('저장 과정 중 오류 발생:', error)
      alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  // 1. 단계 이동 로직
  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?step=${encodeURIComponent(step)}`)
  }

  const handlePrev = () => navigateToStep('4')
  const handleNext = () => navigateToStep('6')

  return (
    <div>
      <Label
        label={'수상 경험'}
        type={'titleMd'}
        rightElement={
          <Button
            onClick={() => {
              addAward({
                awardName: '',
                host: '',
                acquiredDate: '',
                description: '',
                documentUrl: null,
              })
            }}
            variant={'secondary'}
            size={'md'}
            customClassName={'w-fit'}
            leftIcon={<Main5000PlusIcon width={20} height={20} />}
          >
            추가
          </Button>
        }
      />
      <Spacing height={16} />
      <div className="flex flex-col gap-y-[16px]">
        {editAwards.map((editAward) => (
          <EditAwardEntry
            key={editAward.awardId}
            awardsData={awardsData}
            initialFormOpenState={false}
            editAward={editAward}
          />
        ))}
      </div>

      <Spacing height={16} />

      <div className="flex flex-col gap-y-[16px]">
        {awards.map((award, index) => (
          <AwardEntry key={index} award={award} index={index} initialFormOpenState={true} />
        ))}
      </div>

      <Button onClick={handleSave}>저장</Button>

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={true} handleNext={handleNext} />
    </div>
  )
}
