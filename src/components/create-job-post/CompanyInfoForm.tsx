import CompanyName from '@/components/create-job-post/company-info/CompanyName'
import UploadCompanyLogoImage from '@/components/create-job-post/company-info/UploadCompanyLogoImage'
import CompanyAddress from '@/components/create-job-post/company-info/CompanyAddress'
import BusinessType from '@/components/create-job-post/company-info/BusinessType'
import WebSite from '@/components/create-job-post/company-info/WebSite'
import Introduce from '@/components/create-job-post/company-info/Introduce'

export default function CompanyInfoForm() {
  return (
    <div className="flex flex-col gap-y-[32px]">
      <CompanyName />
      <UploadCompanyLogoImage />
      <CompanyAddress />
      <Introduce />
      <BusinessType />
      <WebSite />
    </div>
  )
}
