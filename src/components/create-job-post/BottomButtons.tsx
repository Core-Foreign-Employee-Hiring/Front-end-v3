'use client'

import { Button } from '@/components/common'
import { CreateJobPostStepType } from '@/app/[lang]/create-job-post/page'
import { useRouter } from 'next/navigation'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { useState } from 'react'
import { postRecruit } from '@/lib/client/create-job-post'
import { uploadFile } from '@/lib/client/common'
import { CreateJobPostType } from '@/types/create-job-post'
import { useTranslation } from 'react-i18next'
import { useToast } from '@/components/common/toast/ToastContext'

interface BottomButtonsProps {
  currentStep: CreateJobPostStepType
  lang: string
}

export default function BottomButtons({ currentStep, lang }: BottomButtonsProps) {
  const { t } = useTranslation('message')
  const { success, error } = useToast()
  const router = useRouter()
  const { createJobPost, isStep1DataValid, isStep2DataValid, isStep3DataValid } = useCreateJobPostStore(
    (state) => state
  )
  const [isLoading, setIsLoading] = useState(false)

  // --- 추가된 유효성 체크 로직 ---
  const checkIsValid = () => {
    if (currentStep === '1') return isStep1DataValid()
    if (currentStep === '2') return isStep2DataValid()
    if (currentStep === '3') return isStep3DataValid()
    return false
  }

  const isCurrentStepValid = checkIsValid()
  // ---------------------------

  const handleSave = async () => {
    try {
      setIsLoading(true)
      const submitData = { ...createJobPost }

      /**
       * 이미지 업로드 처리 함수
       * - imageField가 File 객체인 경우에만 실제 서버 업로드(uploadFile) 수행
       * - 그 외(이미 URL인 string, 선택 안 된 null/undefined)는 그대로 반환
       */
      const processImage = async (imageField: string | File | null | undefined) => {
        // 1. File 객체인지 확인 (사용자가 새로 선택한 경우)
        if (imageField instanceof File) {
          // console.log('파일 업로드 시도:', imageField.name);
          const uploadedUrl = await uploadFile(imageField)
          return uploadedUrl // 업로드 후 반환된 URL
        }

        // 2. File이 아니면 (이미 string URL이거나 null/undefined인 경우) 요청 없이 그대로 반환
        return imageField
      }

      // 3. 병렬로 이미지 업로드 진행
      // 비어있어도 processImage 내부에서 체크하므로 안전합니다.
      const [posterUrl, companyUrl] = await Promise.all([
        processImage(submitData.posterImageUrl),
        processImage(submitData.companyImageUrl),
      ])

      // 4. 변환된(혹은 유지된) 값으로 데이터 세팅
      submitData.posterImageUrl = posterUrl
      submitData.companyImageUrl = companyUrl

      // 5. 최종 POST 요청
      const result = await postRecruit(submitData as CreateJobPostType)
      if (result.success) {
        success(t('message:post_recruit.success.title'), t('message:post_recruit.success.description'))
      } else {
        error(t('message:post_recruit.error.title'), t('message:post_recruit.error.description'))
      }
    } catch (e) {
      error(t('message:fetch_error.title'), t('message:fetch_error.description'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-[40px] py-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {currentStep !== '1' && (
        <Button
          disabled={isLoading}
          onClick={() => {
            if (currentStep === '2') {
              router.push(`/${lang}/create-job-post?step=1`)
            } else if (currentStep === '3') {
              router.push(`/${lang}/create-job-post?step=2`)
            }
          }}
          variant={'outline'}
          customClassName={'w-[377px]'}
        >
          이전
        </Button>
      )}

      <div className={`${currentStep === '1' ? 'w-full justify-end' : ''} flex gap-x-3`}>
        <Button
          // 유효하지 않거나 로딩 중일 때 비활성화
          disabled={!isCurrentStepValid || isLoading}
          // 유효할 때 primary, 아니면 스타일 가이드에 맞춰 조정 (필요 시 'disable'용 variant 추가)
          variant={isCurrentStepValid ? 'primary' : 'outline'}
          // 요청하신 state 처리
          state={isCurrentStepValid ? 'default' : 'disable'}
          onClick={() => {
            if (currentStep === '1') {
              router.push(`/${lang}/create-job-post?step=2`)
            } else if (currentStep === '2') {
              router.push(`/${lang}/create-job-post?step=3`)
            } else if (currentStep === '3') {
              handleSave()
            }
          }}
          customClassName={'w-[377px]'}
        >
          {isLoading ? '처리 중...' : currentStep === '3' ? '저장' : '다음'}
        </Button>
      </div>
    </div>
  )
}
