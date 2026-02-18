import VisaFilter from '@/components/common/filter/VisaFilter'
import JobRoleFilter from '@/components/common/filter/JobRoleFilter'
import LanguageFilter from '@/components/common/filter/LanguageFilter'
import RegionFilter from '@/components/common/filter/RegionFilter'
import ContractFilter from '@/components/common/filter/ContractFilter'

export default function Filters() {
  return (
    <div className="flex gap-x-2 overflow-x-scroll">
      <VisaFilter />
      <JobRoleFilter />
      <LanguageFilter />
      <RegionFilter />
      <ContractFilter />
    </div>
  )
}
