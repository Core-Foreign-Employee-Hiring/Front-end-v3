import { ContractEnumType } from '@/types/spec'
import { CarrerType } from '@/types/job-post'

export const convertEnumToKorContractTypeLabel = (category: ContractEnumType | CarrerType): string => {
  switch (category) {
    case 'INTERN':
      return 'filter.contractTypeFilter.content.INTERN'
    case 'EXPERIENCED':
      return 'filter.contractTypeFilter.content.EXPERIENCED'
    case 'CONTRACT':
      return 'filter.contractTypeFilter.content.CONTRACT'
    case 'NEWCOMER':
      return 'filter.contractTypeFilter.content.NEWCOMER'
    case 'REGULAR':
      return 'filter.contractTypeFilter.content.REGULAR'
    default:
      return 'filter.contractTypeFilter.content.REGULAR'
  }
}
