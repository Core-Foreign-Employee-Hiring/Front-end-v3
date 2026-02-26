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
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface SpecAwardProps {
  awardsData: SpecAwardType[] | null | undefined
}
export default function SpecAward({ awardsData }: SpecAwardProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()
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

            if (uploadUrl) {
              newAward.documentUrl = uploadUrl
            } else {
              newAward.documentUrl = null
              error(t('message:file_upload_error.title'), t('message:file_upload_error.description'))
            }
          }
          // 2. 만약 documentUrl이 File도 아니고, 문자열도 아닌 (빈 객체 {} 등) 경우
          else if (typeof newAward.documentUrl !== 'string') {
            newAward.documentUrl = null // API가 받을 수 있는 깨끗한 상태로 변경
          }

          return newAward
        })
      )

      const result = await postSpecAwards(updatedAwards)

      if (result.data) {
        if (result.success) {
          setAwards([]) // 추가용 임시 상태 초기화 (필요시)
          router.refresh()
          success(t('message:post_spec_awards.success.title'), t('message:post_spec_awards.success.description'))
        } else {
          setAwards([]) // 추가용 임시 상태 초기화 (필요시)
          router.refresh()
          error(t('message:post_spec_awards.error.title'), t('message:post_spec_awards.error.description'))
        }
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

  // 1. 단계 이동 로직
  const navigateToStep = (step: StepType) => {
    router.push(`${pathname}?tab=spec&step=${encodeURIComponent(step)}`)
  }

  const handlePrev = () => navigateToStep('4')
  const handleNext = () => navigateToStep('6')

  return (
    <div>
      <Label
        label={t('spec:award.title')}
        type={'titleMd'}
        rightElement={
          <div className="flex gap-x-2">
            <Button customClassName={'w-[72px]'} size={'md'} onClick={handleSave}>
              {t('spec:buttons.save')}
            </Button>
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
              {t('spec:buttons.add')}
            </Button>
          </div>
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

      <Spacing height={100} />
      <BottomButton handlePrev={handlePrev} isNextButtonActive={true} handleNext={handleNext} />
    </div>
  )
}
