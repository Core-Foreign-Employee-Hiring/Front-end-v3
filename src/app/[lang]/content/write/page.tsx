import TitleField from '@/components/content/write/TitleField'
import OneLineReviewField from '@/components/content/write/OneLineReviewField'
import DescriptionField from '@/components/content/write/DescriptionField'
import ThumbnailField from '@/components/content/write/ThumbnailField'
import ImageUploadField from '@/components/content/write/ImageUploadField'
import ProductUploadField from '@/components/content/write/ProductUploadField'
import InquiryUrlField from '@/components/content/write/InquiryUrlField'
import PriceField from '@/components/content/write/PriceField'
import BottomButtons from '@/components/content/write/BottomButtons'

export default function WriteContentPage() {
  return (
    <main className="flex flex-col gap-y-[24px]">
      <TitleField />
      <OneLineReviewField />
      <DescriptionField />
      <ThumbnailField />
      <ImageUploadField />
      <ProductUploadField />
      <InquiryUrlField />
      <PriceField />
      <BottomButtons />
    </main>
  )
}
