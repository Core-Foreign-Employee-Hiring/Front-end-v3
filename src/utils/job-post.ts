import { ContractEnumType } from '@/types/spec'
import { CarrerType, SubmissionDocumentType } from '@/types/job-post'

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
    case 'NOT_SPECIFIED':
      return 'filter:filter.contractTypeFilter.content.NOT_SPECIFIED'
    default:
      return 'filter:filter.contractTypeFilter.content.ETC'
  }
}

export const convertEnumToKorSubmissionDocumentLabel = (submissionDocument: SubmissionDocumentType): string => {
  switch (submissionDocument) {
    case 'RESUME':
      return 'jobPost:detail.jobDetail.submissionDocument.RESUME'
    case 'COVER_LETTER':
      return 'jobPost:detail.jobDetail.submissionDocument.COVER_LETTER'
    case 'PORTFOLIO':
      return 'jobPost:detail.jobDetail.submissionDocument.PORTFOLIO'
    case 'CAREER_DESCRIPTION':
      return 'jobPost:detail.jobDetail.submissionDocument.CAREER_DESCRIPTION'
    default:
      return 'jobPost:detail.jobDetail.submissionDocument.ETC'
  }
}
