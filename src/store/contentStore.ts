import { create } from 'zustand/index'
import { devtools } from 'zustand/middleware'
import { CreateContentType } from '@/types/content'

interface CreateContentState {
  createContent: Partial<CreateContentType>
  thumbnailFile: File | null
  imageFiles: File[] | null
  productFiles: File[] | null

  updateCreateContent: <K extends keyof CreateContentType>(field: K, value: CreateContentType[K]) => void
  setThumbnailFile: (thumbnailFile: File | null) => void
  setImageFiles: (files: File[] | null) => void
  setProductFiles: (files: File[] | null) => void

  resetCreateContent: () => void
}

const initCreateContentData: Partial<CreateContentType> = {
  title: '',
  oneLineReview: '',
  description: '',
  price: 0,
  inquiryUrl: '',
}

export const useCreateContentStore = create<CreateContentState>()(
  devtools((set, get) => ({
    // 초기값
    createContent: initCreateContentData,
    thumbnailFile: null,
    imageFiles: null,
    productFiles: null,
    // 공고 데이터 업데이트
    updateCreateContent: (field, value) =>
      set(
        (state) => ({
          createContent: { ...state.createContent, [field]: value },
        }),
        false,
        `createContent/update_${field}`
      ),
    setThumbnailFile: (thumbnailFile) => set({ thumbnailFile }, false, 'content/setThumbnailFile'),

    // imageFiles 수정 함수
    setImageFiles: (files) => set({ imageFiles: files }, false, 'content/setImageFiles'),

    // productFiles 수정 함수
    setProductFiles: (files) => set({ productFiles: files }, false, 'content/setProductFiles'),

    resetCreateContent: () =>
      set(
        {
          createContent: initCreateContentData,
          thumbnailFile: null,
          imageFiles: null,
          productFiles: null,
        },
        false,
        'createContent/reset'
      ),
  }))
)
