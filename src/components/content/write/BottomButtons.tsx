'use client'

import { Button, Loading } from '@/components/common'
import { useCreateContentStore } from '@/store/contentStore'
import { useToast } from '@/components/common/toast/ToastContext'
import { useMemo, useState } from 'react'
import { createContentAPI } from '@/lib/client/content'
import { useRouter } from 'next/navigation'

export default function BottomButtons() {
  const router = useRouter()

  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const { createContent, thumbnailFile, imageFiles, productFiles, resetCreateContent } =
    useCreateContentStore.getState()

  const isFormValid = useMemo(() => {
    if (!createContent) return false

    return !!(
      createContent.title?.trim() &&
      createContent.oneLineReview?.trim() &&
      createContent.description?.trim() &&
      createContent.price !== undefined &&
      createContent.price >= 0 &&
      createContent.inquiryUrl?.trim() &&
      thumbnailFile &&
      productFiles &&
      productFiles.length > 0
    )
  }, [createContent, thumbnailFile, productFiles])

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()

      // 1. 기본 데이터 추가
      formData.append('data', JSON.stringify(createContent))

      // 2. 썸네일 (null이 아닐 때만 추가)
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile)
      }

      /**
       * 3. 이미지 파일 배열 처리
       * 백엔드가 null을 못 받는다면, 데이터가 있을 때만 반복문을 돌려 append합니다.
       */
      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append('images', file)
        })
      }
      // 만약 백엔드에서 빈 배열이라도 명시적으로 전달받길 원한다면 (보통 파일은 필수가 아니면 append 안 함)
      // 전달하지 않는 것이 일반적입니다.

      /**
       * 4. 상품 파일 배열 처리
       */
      if (productFiles && productFiles.length > 0) {
        productFiles.forEach((file) => {
          formData.append('products', file)
        })
      }

      const result = await createContentAPI(formData)
      if (result.success) {
        success('콘텐츠 생성 성공', '콘텐츠를 생성했어요')
        router.push('/content')
        resetCreateContent()
      } else {
        error('콘텐츠 생성 실패', '콘텐츠를 생성하지 못했어요.')
      }
    } catch (e) {
      error('콘텐츠 생성 실패', '콘텐츠를 생성하는데 문제가 생겼어요.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white p-5">
      <Button
        customClassName={'w-[200px] desktop:block hidden'}
        variant={'outline'}
        onClick={() => {
          router.back()
        }}
      >
        이전
      </Button>
      <Button
        leftIcon={isLoading ? <Loading size={'sm'} /> : null}
        customClassName={'desktop:w-[200px] w-full'}
        onClick={handleSubmit}
      >
        생성하기
      </Button>
    </div>
  )
}
