import MainTask from '@/components/create-job-post/recruit-detail/MainTask'
import Qualification from '@/components/create-job-post/recruit-detail/Qualification'
import Preference from '@/components/create-job-post/recruit-detail/Preference'
import Other from '@/components/create-job-post/recruit-detail/Other'
import ApplicationMethod from '@/components/create-job-post/recruit-detail/ApplicationMethod'
import UploadPosterImage from '@/components/create-job-post/recruit-detail/UploadPosterImage'
import Language from '@/components/create-job-post/recruit-detail/Language'
import Visa from '@/components/create-job-post/recruit-detail/Visa'
import ApplicationDocument from '@/components/create-job-post/recruit-detail/ApplicationDocument'

export default function RecruitDetailForm() {
  return (
    <div className="flex flex-col gap-y-[32px]">
      <MainTask />
      <Qualification />
      <Visa />
      <Language />
      <Preference />
      <Other />
      <ApplicationDocument />
      <UploadPosterImage />
      <ApplicationMethod />
    </div>
  )
}
