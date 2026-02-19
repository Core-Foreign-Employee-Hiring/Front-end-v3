import { ContractEnumType } from '@/types/spec'
import { CarrerType } from '@/types/job-post'

export const convertEnumToKorContractTypeLabel = (category: ContractEnumType | CarrerType): string => {
  switch (category) {
    case 'INTERN':
      return 'filter:filter.contractTypeFilter.content.INTERN'
    case 'EXPERIENCED':
      return 'filter:filter.contractTypeFilter.content.EXPERIENCED'
    case 'CONTRACT':
      return 'filter:filter.contractTypeFilter.content.CONTRACT'
    case 'NEWCOMER':
      return 'filter:filter.contractTypeFilter.content.NEWCOMER'
    case 'REGULAR':
      return 'filter:filter.contractTypeFilter.content.REGULAR'
    default:
      return 'filter:filter.contractTypeFilter.content.REGULAR'
  }
}
