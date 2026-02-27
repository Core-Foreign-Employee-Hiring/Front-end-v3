'use client'

import { SpecAwardType } from '@/types/spec'
import { useSpecStore } from '@/store/specStore'
import { useEffect } from 'react'
import { postSpecAwards } from '@/lib/client/spec/award'
import { Button, Label, Spacing } from '@/components/common'
import { Main5000PlusIcon } from '@/assets/svgComponents'
import { BottomButton } from '@/components/spec'
import EditAwardEntry from '@/components/spec/award/EditAwardEntry'
import AwardEntry from '@/components/spec/award/AwardEntry'
import { uploadFile } from '@/lib/client/common'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'
import { useRouter } from 'next/navigation'
import useSpecAward from '@/hooks/spec/useSpecAward'

interface SpecAwardProps {
  awardsData: SpecAwardType[] | null | undefined
}

export default function SpecAward({ awardsData }: SpecAwardProps) {
  const { t } = useTranslation(['spec', 'message'])
  const { success, error } = useToast()
  const router = useRouter()

  const { editAwards, setEditAwards, addAward, setAwards, awards } = useSpecStore((state) => state)

  // 분리한 훅 사용
  const { handleNext, handlePrev, isActive } = useSpecAward(awardsData)

  useEffect(() => {
    if (awardsData) {
      setEditAwards(awardsData)
    }
  }, [awardsData, setEditAwards])

  const handleSave = async () => {
    try {
      const updatedAwards = await Promise.all(
        awards.map(async (award) => {
          const newAward = { ...award }
          if (newAward.documentUrl instanceof File) {
            const uploadUrl = await uploadFile(newAward.documentUrl)
            if (uploadUrl) {
              newAward.documentUrl = uploadUrl
            } else {
              newAward.documentUrl = null
              error(t('message:file_upload_error.title'), t('message:file_upload_error.description'))
            }
          } else if (typeof newAward.documentUrl !== 'string') {
            newAward.documentUrl = null
          }
          return newAward
        })
      )

      const result = await postSpecAwards(updatedAwards as SpecAwardType[])

      if (result.data?.success) {
        // 성공 시 즉시 상태 동기화 (isChanged를 false로 만들기 위함)
        setEditAwards([...editAwards, ...(updatedAwards as SpecAwardType[])])
        setAwards([])
        router.refresh()

        success(t('message:post_spec_awards.success.title'), t('message:post_spec_awards.success.description'))
      } else {
        error(t('message:post_spec_awards.error.title'), t('message:post_spec_awards.error.description'))
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    }
  }

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
            key={editAward.awardId || editAward.awardName}
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
      <BottomButton
        handlePrev={handlePrev}
        isNextButtonActive={true} // 유효성 검사 결과에 따라 바꾸려면 isActive 사용 가능
        handleNext={handleNext}
      />
    </div>
  )
}
