import ProfileImageUploader from '@/components/resume/ProfileImageUploader'
import AdditionalInfoForm from '@/components/resume/AdditionalInfoForm'

export default function Info() {
  return (
    <section className="flex gap-x-[20px]">
      <ProfileImageUploader />
      <AdditionalInfoForm />
    </section>
  )
}
